"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { MOCK_SURVEYS } from "./surveys-data";

function mapSurveyRow(row) {
  return {
    id: row.id,
    title: row.title || "",
    description: row.description || "",
    startDate: row.start_date,
    endDate: row.end_date || row.start_date,
    googleFormUrl: row.google_form_url || "",
    showInNotice: Boolean(row.show_in_notice),
  };
}

export async function fetchSurveys() {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa
      .from("advisory_surveys")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) throw error;

    return {
      surveys: (data || []).map(mapSurveyRow),
      source: "supabase",
      error: null,
    };
  } catch (error) {
    console.error("[fetchSurveys]", error);
    return {
      surveys: MOCK_SURVEYS,
      source: "mock",
      error: error.message || "Supabase 설문 조회 실패",
    };
  }
}

export async function fetchSurveyById(id) {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa.from("advisory_surveys").select("*").eq("id", id).single();
    if (error) throw error;
    return { survey: mapSurveyRow(data), source: "supabase", error: null };
  } catch (error) {
    const fallback = MOCK_SURVEYS.find((item) => item.id === id) || null;
    return {
      survey: fallback,
      source: fallback ? "mock" : null,
      error: error.message || "Supabase 설문 상세 조회 실패",
    };
  }
}
