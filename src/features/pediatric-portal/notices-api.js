import { createAdminClient } from "@/service/db/supabase/server";
import { MOCK_POSTS, getNoticePosts } from "./mock-data";

function formatNoticeDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value).slice(0, 10).replaceAll("-", ".");
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
}

/**
 * 홈 공지: 자료실/행사/설문 중 show_in_notice=true 항목만 집계
 * 노출 순서는 게시일(created_at) 최신순
 */
export async function fetchPortalNotices() {
  try {
    const supa = await createAdminClient();

    const [resources, events, surveys] = await Promise.all([
      supa
        .from("advisory_resources")
        .select("id,title,created_at,show_in_notice")
        .eq("show_in_notice", true),
      supa
        .from("advisory_events")
        .select("id,title,created_at,show_in_notice")
        .eq("show_in_notice", true),
      supa
        .from("advisory_surveys")
        .select("id,title,created_at,show_in_notice")
        .eq("show_in_notice", true),
    ]);

    const posts = [];

    for (const row of resources.data || []) {
      posts.push({
        id: row.id,
        type: "resources",
        title: row.title,
        date: formatNoticeDate(row.created_at),
        showInNotice: true,
        sortAt: row.created_at,
      });
    }
    for (const row of events.data || []) {
      posts.push({
        id: row.id,
        type: "events",
        title: row.title,
        date: formatNoticeDate(row.created_at),
        showInNotice: true,
        sortAt: row.created_at,
      });
    }
    for (const row of surveys.data || []) {
      posts.push({
        id: row.id,
        type: "surveys",
        title: row.title,
        date: formatNoticeDate(row.created_at),
        showInNotice: true,
        sortAt: row.created_at,
      });
    }

    const hardFail = resources.error && events.error && surveys.error;
    if (hardFail) {
      throw resources.error || events.error || surveys.error || new Error("notice fetch failed");
    }

    posts.sort((a, b) => new Date(b.sortAt || 0) - new Date(a.sortAt || 0));
    return {
      notices: posts.map(({ sortAt, ...rest }) => rest),
      source: "supabase",
    };
  } catch (error) {
    console.error("[fetchPortalNotices]", error);
    return {
      notices: getNoticePosts(MOCK_POSTS),
      source: "mock",
    };
  }
}
