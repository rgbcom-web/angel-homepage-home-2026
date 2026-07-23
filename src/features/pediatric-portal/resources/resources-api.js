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

/** 클라이언트에는 공개 Storage URL을 노출하지 않고 인증 프록시 경로만 반환 */
function resourceFileProxyUrl(id) {
  return `/api/pediatric/resources/${id}/file`;
}

function mapResourceRow(row) {
  return {
    id: row.id,
    title: row.title || "",
    description: row.description || "",
    date: formatDate(row.created_at),
    views: row.views ?? 0,
    isNotice: Boolean(row.is_notice),
    showInNotice: Boolean(row.show_in_notice),
    fileType: row.file_type || "pdf",
    fileName: row.file_name || "",
    fileUrl: resourceFileProxyUrl(row.id),
  };
}

function mapMockResource(item) {
  return {
    id: item.id,
    title: item.title || "",
    description: item.description || "",
    date: item.date || "",
    views: item.views ?? 0,
    isNotice: Boolean(item.isNotice),
    showInNotice: Boolean(item.showInNotice),
    fileType: item.fileType || "pdf",
    fileName: item.fileName || "",
    fileUrl: resourceFileProxyUrl(item.id),
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
