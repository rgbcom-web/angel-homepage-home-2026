"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { MOCK_EVENTS } from "./events-data";

function mapEventRow(row) {
  return {
    id: row.id,
    year: row.year || Number(String(row.start_date || "").slice(0, 4)),
    startDate: row.start_date,
    endDate: row.end_date || row.start_date,
    category: row.category || "",
    title: row.title || "",
    subtitle: row.subtitle || "",
    location: row.location || "",
    description: row.description || "",
    showInNotice: Boolean(row.show_in_notice),
  };
}

export async function fetchEvents({ query = "" } = {}) {
  try {
    const supa = await createAdminClient();
    let dbQuery = supa.from("advisory_events").select("*").order("start_date", { ascending: false });

    if (query) {
      dbQuery = dbQuery.or(
        `title.ilike.%${query}%,subtitle.ilike.%${query}%,location.ilike.%${query}%,category.ilike.%${query}%`,
      );
    }

    const { data, error } = await dbQuery;
    if (error) throw error;

    return {
      events: (data || []).map(mapEventRow),
      source: "supabase",
      error: null,
    };
  } catch (error) {
    console.error("[fetchEvents]", error);
    // 테이블 미생성/연동 전: 목 데이터 fallback
    const q = query.trim().toLowerCase();
    const events = MOCK_EVENTS.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.category.includes(q)
      );
    }).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return {
      events,
      source: "mock",
      error: error.message || "Supabase 행사 조회 실패",
    };
  }
}

export async function fetchEventById(id) {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa.from("advisory_events").select("*").eq("id", id).single();
    if (error) throw error;

    const { recordAdvisoryMemberView } = await import("../member-view-log");
    await recordAdvisoryMemberView("event", id);

    return { event: mapEventRow(data), source: "supabase", error: null };
  } catch (error) {
    const fallback = MOCK_EVENTS.find((item) => item.id === id) || null;
    return {
      event: fallback,
      source: fallback ? "mock" : null,
      error: error.message || "Supabase 행사 상세 조회 실패",
    };
  }
}
