"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { getPediatricSession } from "@/features/pediatric-auth/session";
import { isUuid, resolveSessionMember } from "@/features/pediatric-auth/members-store";
import { MOCK_NOTIFICATIONS } from "./mock-data";

const BOARD_META = {
  resources: {
    table: "advisory_resources",
    dateCol: "created_at",
    href: (id) => `/pediatric/resources/${id}`,
    label: (title) => `자료실에 「${title}」이(가) 등록되었습니다`,
  },
  events: {
    table: "advisory_events",
    dateCol: "created_at",
    fallbackDateCol: "start_date",
    href: (id) => `/pediatric/events/${id}`,
    label: (title) => `행사 「${title}」이(가) 등록되었습니다`,
  },
  surveys: {
    table: "advisory_surveys",
    dateCol: "created_at",
    fallbackDateCol: "start_date",
    href: (id) => `/pediatric/surveys/${id}`,
    label: (title) => `설문 「${title}」 참여 요청이 있습니다`,
  },
};

function itemKey(type, id) {
  return `${type}:${id}`;
}

async function getSessionMemberId() {
  const session = await getPediatricSession();
  if (!session) return null;
  const member = await resolveSessionMember(session);
  if (!member?.id || !isUuid(member.id)) return null;
  return member.id;
}

/**
 * 자료실/행사/설문 최신 글 → 알림 목록 + 회원별 읽음 상태
 */
export async function fetchMemberNotifications({ limit = 40 } = {}) {
  try {
    const memberId = await getSessionMemberId();
    const supa = await createAdminClient();

    const [resources, events, surveys] = await Promise.all([
      supa
        .from("advisory_resources")
        .select("id, title, created_at")
        .order("created_at", { ascending: false })
        .limit(limit),
      fetchBoardRows(supa, "advisory_events", limit),
      fetchBoardRows(supa, "advisory_surveys", limit),
    ]);

    if (resources.error && events.error && surveys.error) {
      throw resources.error || events.error || surveys.error;
    }

    const items = [];

    for (const row of resources.data || []) {
      items.push(mapBoardRow("resources", row));
    }
    for (const row of events.data || []) {
      items.push(mapBoardRow("events", row));
    }
    for (const row of surveys.data || []) {
      items.push(mapBoardRow("surveys", row));
    }

    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const sliced = items.slice(0, limit);

    let readKeys = new Set();
    if (memberId && sliced.length > 0) {
      const keys = sliced.map((n) => n.itemKey);
      const { data: reads, error: readError } = await supa
        .from("advisory_notification_reads")
        .select("item_key")
        .eq("member_id", memberId)
        .in("item_key", keys);

      if (!readError) {
        readKeys = new Set((reads || []).map((r) => r.item_key));
      }
      // 테이블 없으면 전부 읽지 않음으로 표시
    }

    const notifications = sliced
      .map((n) => ({
        id: n.itemKey,
        title: n.title,
        createdAt: n.createdAt,
        href: n.href,
        boardType: n.boardType,
        unread: !readKeys.has(n.itemKey),
      }))
      .filter((n) => n.unread);

    return { notifications, source: "supabase", memberId };
  } catch (error) {
    console.error("[fetchMemberNotifications]", error);
    return {
      notifications: MOCK_NOTIFICATIONS.filter((n) => n.unread),
      source: "mock",
      memberId: null,
    };
  }
}

function mapBoardRow(type, row) {
  const meta = BOARD_META[type];
  const createdAt =
    row[meta.dateCol] || (meta.fallbackDateCol ? row[meta.fallbackDateCol] : null) || new Date().toISOString();

  return {
    itemKey: itemKey(type, row.id),
    boardType: type,
    title: meta.label(row.title || "새 게시글"),
    createdAt,
    href: meta.href(row.id),
  };
}

async function fetchBoardRows(supa, tableName, limit) {
  const withCreated = await supa
    .from(tableName)
    .select("id, title, created_at, start_date")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!withCreated.error) return withCreated;

  const withStart = await supa
    .from(tableName)
    .select("id, title, start_date")
    .order("start_date", { ascending: false })
    .limit(limit);

  return withStart;
}

export async function markNotificationReadAction(itemKey) {
  const memberId = await getSessionMemberId();
  if (!memberId || !itemKey) {
    return { success: false };
  }

  try {
    const supa = await createAdminClient();
    const { error } = await supa.from("advisory_notification_reads").upsert(
      {
        member_id: memberId,
        item_key: itemKey,
        read_at: new Date().toISOString(),
      },
      { onConflict: "member_id,item_key" },
    );
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("[markNotificationReadAction]", error);
    return { success: false, message: error.message };
  }
}

export async function markAllNotificationsReadAction(itemKeys = []) {
  const memberId = await getSessionMemberId();
  if (!memberId) {
    return { success: false };
  }

  const keys = Array.isArray(itemKeys) ? itemKeys.filter(Boolean) : [];
  if (keys.length === 0) {
    return { success: true };
  }

  try {
    const now = new Date().toISOString();
    const rows = keys.map((item_key) => ({
      member_id: memberId,
      item_key,
      read_at: now,
    }));

    const supa = await createAdminClient();
    const { error } = await supa
      .from("advisory_notification_reads")
      .upsert(rows, { onConflict: "member_id,item_key" });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("[markAllNotificationsReadAction]", error);
    return { success: false, message: error.message };
  }
}
