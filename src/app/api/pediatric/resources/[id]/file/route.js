import { NextResponse } from "next/server";
import { createAdminClient } from "@/service/db/supabase/server";
import { getPediatricSession } from "@/features/pediatric-auth/session";
import { resolveSessionMember } from "@/features/pediatric-auth/members-store";
import { getResourceById } from "@/features/pediatric-portal/resources/resources-data";

/** 자문단 자료실 전용 private 버킷 */
const BUCKET_NAME =
  process.env.PEDIATRIC_SUPABASE_STORAGE_BUCKET ||
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;
const LEGACY_BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET;

function contentTypeFor(fileType, fileName = "") {
  const lower = (fileName || "").toLowerCase();
  if (fileType === "image" || /\.(png|jpe?g|gif|webp|svg)$/.test(lower)) {
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".gif")) return "image/gif";
    if (lower.endsWith(".webp")) return "image/webp";
    if (lower.endsWith(".svg")) return "image/svg+xml";
    return "image/jpeg";
  }
  if (fileType === "pdf" || lower.endsWith(".pdf")) return "application/pdf";
  return "application/octet-stream";
}

function inlineHeaders({ contentType, fileName }) {
  const safeName = (fileName || "resource").replace(/[^\w.\-()+ ]+/g, "_");
  return {
    "Content-Type": contentType,
    "Content-Disposition": `inline; filename="${safeName}"`,
    "Cache-Control": "private, no-store, max-age=0",
    "X-Content-Type-Options": "nosniff",
  };
}

function resolveFileType(name = "", type = "") {
  if (type === "image" || type === "pdf") return type;
  const lower = String(name || "").toLowerCase();
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(lower)) return "image";
  return "pdf";
}

function normalizeFiles(row) {
  let files = [];
  if (Array.isArray(row?.files) && row.files.length) {
    files = row.files.filter((f) => f?.path);
  } else if (typeof row?.files === "string") {
    try {
      const parsed = JSON.parse(row.files);
      if (Array.isArray(parsed)) files = parsed.filter((f) => f?.path);
    } catch {
      files = [];
    }
  }
  if (!files.length && row?.file_path) {
    files = [
      {
        path: row.file_path,
        name: row.file_name || "",
        type: row.file_type || "pdf",
        bucket: row.bucket,
      },
    ];
  }
  return files.map((file) => ({
    path: file.path,
    name: file.name || "",
    type: resolveFileType(file.name || file.path, file.type),
    bucket: file.bucket || BUCKET_NAME,
  }));
}

async function requireApprovedMember() {
  const session = await getPediatricSession();
  if (!session) return null;
  const member = await resolveSessionMember(session);
  if (!member || member.status !== "approved") return null;
  return member;
}

async function loadResourceMeta(id, index = 0) {
  try {
    const supa = await createAdminClient();
    let data = null;
    let error = null;

    ({ data, error } = await supa
      .from("advisory_resources")
      .select("id, file_path, file_name, file_type, files")
      .eq("id", id)
      .maybeSingle());

    // files 컬럼이 없거나 schema cache 이슈면 레거시 컬럼만으로 재시도
    if (error && /files|schema cache|column/i.test(String(error.message || ""))) {
      console.warn("[resource file] files column select failed, fallback:", error.message);
      ({ data, error } = await supa
        .from("advisory_resources")
        .select("id, file_path, file_name, file_type")
        .eq("id", id)
        .maybeSingle());
    }

    if (!error && data) {
      const files = normalizeFiles(data);
      const selected = files[index] || files[0];
      if (!selected) return null;
      return {
        id: data.id,
        filePath: selected.path || "",
        fileName: selected.name || "",
        fileType: selected.type || "pdf",
        bucket: selected.bucket || BUCKET_NAME,
        source: "supabase",
      };
    }

    if (error) {
      console.error("[resource file] meta query", error);
    }
  } catch (error) {
    console.error("[resource file] meta", error);
  }

  const mock = getResourceById(id);
  if (!mock) return null;

  const mockFiles =
    Array.isArray(mock.files) && mock.files.length
      ? mock.files
      : [
          {
            sourceUrl: mock.sourceUrl,
            name: mock.fileName,
            type: mock.fileType,
          },
        ];
  const selected = mockFiles[index] || mockFiles[0];
  if (!selected) return null;

  return {
    id: mock.id,
    filePath: selected.sourceUrl || selected.path || mock.sourceUrl || "",
    fileName: selected.name || selected.fileName || mock.fileName || "",
    fileType: selected.type || selected.fileType || mock.fileType || "pdf",
    bucket: BUCKET_NAME,
    source: "mock",
  };
}

export async function GET(request, { params }) {
  const member = await requireApprovedMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const index = Math.max(0, Number(searchParams.get("index") || 0) || 0);

  const meta = await loadResourceMeta(id, index);
  if (!meta?.filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const headers = inlineHeaders({
    contentType: contentTypeFor(meta.fileType, meta.fileName),
    fileName: meta.fileName,
  });

  try {
    // 외부 URL(목 데이터 등)은 서버에서만 가져와 프록시
    if (/^https?:\/\//i.test(meta.filePath)) {
      const upstream = await fetch(meta.filePath, { cache: "no-store" });
      if (!upstream.ok) {
        return NextResponse.json({ error: "Upstream fetch failed" }, { status: 502 });
      }
      const contentType =
        upstream.headers.get("content-type") ||
        contentTypeFor(meta.fileType, meta.fileName);
      const body = await upstream.arrayBuffer();
      return new NextResponse(body, {
        status: 200,
        headers: { ...headers, "Content-Type": contentType },
      });
    }

    if (!BUCKET_NAME) {
      return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
    }

    const preferBucket = meta.bucket || BUCKET_NAME;
    const supa = await createAdminClient();
    let data = null;
    let error = null;

    ({ data, error } = await supa.storage.from(preferBucket).download(meta.filePath));

    // 이전 public 버킷에 남아 있는 파일 호환
    if (
      (error || !data) &&
      LEGACY_BUCKET_NAME &&
      LEGACY_BUCKET_NAME !== preferBucket
    ) {
      ({ data, error } = await supa.storage
        .from(LEGACY_BUCKET_NAME)
        .download(meta.filePath));
    }

    if (error || !data) {
      console.error("[resource file]", error);
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const body = await data.arrayBuffer();
    return new NextResponse(body, { status: 200, headers });
  } catch (error) {
    console.error("[resource file]", error);
    return NextResponse.json({ error: "Failed to load file" }, { status: 500 });
  }
}
