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

async function requireApprovedMember() {
  const session = await getPediatricSession();
  if (!session) return null;
  const member = await resolveSessionMember(session);
  if (!member || member.status !== "approved") return null;
  return member;
}

async function loadResourceMeta(id) {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa
      .from("advisory_resources")
      .select("id, file_path, file_name, file_type")
      .eq("id", id)
      .maybeSingle();
    if (!error && data) {
      return {
        id: data.id,
        filePath: data.file_path || "",
        fileName: data.file_name || "",
        fileType: data.file_type || "pdf",
        source: "supabase",
      };
    }
  } catch {
    // fall through to mock
  }

  const mock = getResourceById(id);
  if (!mock) return null;
  return {
    id: mock.id,
    filePath: mock.sourceUrl || "",
    fileName: mock.fileName || "",
    fileType: mock.fileType || "pdf",
    source: "mock",
  };
}

export async function GET(_request, { params }) {
  const member = await requireApprovedMember();
  if (!member) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const meta = await loadResourceMeta(id);
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

    const supa = await createAdminClient();
    let data = null;
    let error = null;

    ({ data, error } = await supa.storage.from(BUCKET_NAME).download(meta.filePath));

    // 이전 public 버킷에 남아 있는 파일 호환
    if ((error || !data) && LEGACY_BUCKET_NAME && LEGACY_BUCKET_NAME !== BUCKET_NAME) {
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
