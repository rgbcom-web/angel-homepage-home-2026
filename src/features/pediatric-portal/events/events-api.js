"use server";

import { createAdminClient } from "@/service/db/supabase/server";
import { MOCK_EVENTS } from "./events-data";

const EVENT_IMAGE_BUCKET_CANDIDATES = [
  ...new Set(
    [
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET,
      process.env.PEDIATRIC_SUPABASE_STORAGE_BUCKET,
    ].filter(Boolean),
  ),
];
const EVENT_IMAGE_SIGNED_TTL = 60 * 60; // 1h

function resolveAttachmentType(fileName = "", explicitType) {
  if (explicitType === "pdf" || explicitType === "image") return explicitType;
  const lower = String(fileName || "").toLowerCase();
  if (lower.endsWith(".pdf")) return "pdf";
  return "image";
}

function normalizeEventImages(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((item) => item?.url || item?.path);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.filter((item) => item?.url || item?.path) : [];
    } catch {
      return [];
    }
  }
  return [];
}

async function resolveEventImages(supa, images) {
  const list = normalizeEventImages(images);
  if (!list.length) return [];

  const resolved = [];
  for (const image of list) {
    const type = resolveAttachmentType(image.name || image.path, image.type);

    if (image.path) {
      const buckets = [
        ...new Set([image.bucket, ...EVENT_IMAGE_BUCKET_CANDIDATES].filter(Boolean)),
      ];
      let url = "";
      for (const bucket of buckets) {
        const { data, error } = await supa.storage
          .from(bucket)
          .createSignedUrl(image.path, EVENT_IMAGE_SIGNED_TTL);
        if (!error && data?.signedUrl) {
          url = data.signedUrl;
          break;
        }
      }
      if (!url && image.url) url = image.url;
      if (!url) continue;
      resolved.push({
        path: image.path,
        name: image.name || "file",
        type,
        url,
      });
      continue;
    }

    if (image.url) {
      resolved.push({
        path: image.path || undefined,
        name: image.name || "file",
        type,
        url: image.url,
      });
    }
  }

  return resolved;
}

function mapEventRowBase(row, images = []) {
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
    images,
    showInNotice: Boolean(row.show_in_notice),
  };
}

async function mapEventRow(row, { resolveImages = false, supa = null } = {}) {
  let images = normalizeEventImages(row.images);
  if (resolveImages && supa) {
    images = await resolveEventImages(supa, images);
  } else {
    images = images
      .filter((item) => item?.url)
      .map((item) => ({
        path: item.path || undefined,
        name: item.name || "file",
        type: resolveAttachmentType(item.name || item.path, item.type),
        url: item.url,
      }));
  }
  return mapEventRowBase(row, images);
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

    const events = await Promise.all(
      (data || []).map((row) => mapEventRow(row, { resolveImages: false, supa })),
    );

    return {
      events,
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

export async function fetchEventById(id, { recordView = false } = {}) {
  try {
    const supa = await createAdminClient();
    const { data, error } = await supa.from("advisory_events").select("*").eq("id", id).single();
    if (error) throw error;

    if (recordView) {
      const { recordAdvisoryMemberView } = await import("../member-view-log");
      await recordAdvisoryMemberView("event", id);
    }

    const event = await mapEventRow(data, { resolveImages: true, supa });
    return { event, source: "supabase", error: null };
  } catch (error) {
    const fallback = MOCK_EVENTS.find((item) => item.id === id) || null;
    return {
      event: fallback,
      source: fallback ? "mock" : null,
      error: error.message || "Supabase 행사 상세 조회 실패",
    };
  }
}
