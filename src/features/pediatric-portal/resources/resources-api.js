import { createAdminClient } from "@/service/db/supabase/server";
import { MOCK_RESOURCES } from "./resources-data";

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function resolveFileType(name = "", type = "") {
  if (type === "image" || type === "pdf") return type;
  const lower = String(name || "").toLowerCase();
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(lower)) return "image";
  return "pdf";
}

/** 클라이언트에는 공개 Storage URL을 노출하지 않고 인증 프록시 경로만 반환 */
function resourceFileProxyUrl(id, index = 0) {
  const i = Number(index) || 0;
  return `/api/pediatric/resources/${id}/file?index=${i}`;
}

function normalizeFilesFromRow(row) {
  let files = [];
  if (Array.isArray(row?.files) && row.files.length) {
    files = row.files.filter((f) => f?.path || f?.sourceUrl);
  } else if (typeof row?.files === "string") {
    try {
      const parsed = JSON.parse(row.files);
      if (Array.isArray(parsed)) files = parsed.filter((f) => f?.path || f?.sourceUrl);
    } catch {
      files = [];
    }
  }

  if (!files.length && (row?.file_path || row?.sourceUrl)) {
    files = [
      {
        path: row.file_path || "",
        name: row.file_name || "",
        type: row.file_type || "pdf",
        sourceUrl: row.sourceUrl || "",
      },
    ];
  }

  return files.map((file, index) => {
    const name = file.name || file.fileName || `첨부 ${index + 1}`;
    const type = resolveFileType(name, file.type || file.fileType);
    return {
      name,
      type,
      fileUrl: resourceFileProxyUrl(row.id, index),
    };
  });
}

function mapResourceRow(row) {
  const files = normalizeFilesFromRow(row);
  const first = files[0] || null;

  return {
    id: row.id,
    title: row.title || "",
    description: row.description || "",
    date: formatDate(row.created_at),
    views: row.views ?? 0,
    isNotice: Boolean(row.is_notice),
    showInNotice: Boolean(row.show_in_notice),
    fileType: first?.type || row.file_type || "pdf",
    fileName: first?.name || row.file_name || "",
    fileUrl: first?.fileUrl || resourceFileProxyUrl(row.id, 0),
    files,
  };
}

function mapMockResource(item) {
  const files = normalizeFilesFromRow({
    id: item.id,
    files: item.files,
    file_path: item.sourceUrl ? "mock" : "",
    file_name: item.fileName,
    file_type: item.fileType,
    sourceUrl: item.sourceUrl,
  });

  // mock: preserve sourceUrl via API mock branch; proxy still used on client
  const first = files[0] || null;
  return {
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    date: item.date || "",
    views: item.views ?? 0,
    isNotice: Boolean(item.isNotice),
    showInNotice: Boolean(item.showInNotice),
    fileType: first?.type || item.fileType || "pdf",
    fileName: first?.name || item.fileName || "",
    fileUrl: first?.fileUrl || resourceFileProxyUrl(item.id, 0),
    files:
      files.length > 0
        ? files
        : [
            {
              name: item.fileName || "attachment",
              type: item.fileType || "pdf",
              fileUrl: resourceFileProxyUrl(item.id, 0),
            },
          ],
  };
}

export async function fetchResources() {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa
      .from("advisory_resources")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      resources: (data || []).map(mapResourceRow),
      source: "supabase",
      error: null,
    };
  } catch (error) {
    console.error("[fetchResources]", error);
    return {
      resources: MOCK_RESOURCES.map(mapMockResource),
      source: "mock",
      error: error.message || "Supabase 자료실 조회 실패",
    };
  }
}

export async function fetchResourceById(id, { bumpViews = false } = {}) {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa.from("advisory_resources").select("*").eq("id", id).single();
    if (error) throw error;

    let views = data.views || 0;
    if (bumpViews) {
      views += 1;
      await supa.from("advisory_resources").update({ views }).eq("id", id);
      const { recordAdvisoryMemberView } = await import("../member-view-log");
      await recordAdvisoryMemberView("resource", id);
    }

    return {
      resource: mapResourceRow({ ...data, views }),
      source: "supabase",
      error: null,
    };
  } catch (error) {
    const fallback = MOCK_RESOURCES.find((item) => item.id === id) || null;
    return {
      resource: fallback ? mapMockResource(fallback) : null,
      source: fallback ? "mock" : null,
      error: error.message || "Supabase 자료 상세 조회 실패",
    };
  }
}
