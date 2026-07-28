/**
 * 행사 목 데이터
 * 이후 Supabase advisory_events 테이블로 교체
 * category: 최대 3글자 (학회, 워크샵, 행사 등)
 */

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export const MOCK_EVENTS = [
  {
    id: "evt-1",
    year: 2026,
    startDate: "2026-10-14",
    endDate: "2026-10-17",
    category: "학회",
    title: "WCNR 2026",
    subtitle: "World Congress for NeuroRehabilitation 2026",
    location: "대구 EXCO",
    description:
      "세계 신경재활학회 학술대회입니다. 소아 보행 재활 로봇 관련 세션이 포함되어 있습니다.",
    showInNotice: true,
  },
  {
    id: "evt-2",
    year: 2026,
    startDate: "2026-09-14",
    endDate: "2026-09-16",
    category: "학회",
    title: "ICNR 2026",
    subtitle: "International Conference on NeuroRehabilitation 2026",
    location: "서울 COEX",
    description: "국제 신경재활 학회입니다.",
    showInNotice: false,
  },
  {
    id: "evt-3",
    year: 2026,
    startDate: "2026-08-20",
    endDate: "2026-08-22",
    category: "학회",
    title: "ICKHS 2026",
    subtitle: "International Congress of Korean Hip Society 2026",
    location: "부산 롯데호텔",
    description: "대한고관절학회 국제학술대회입니다.",
    showInNotice: false,
  },
  {
    id: "evt-4",
    year: 2026,
    startDate: "2026-11-05",
    endDate: "2026-11-05",
    category: "워크샵",
    title: "소아 보행 재활 워크숍",
    subtitle: "Pediatric Gait Rehabilitation Workshop",
    location: "서울대학교병원",
    description: "임상 적용 사례와 로봇 보행 훈련 실습 워크숍입니다.",
    showInNotice: false,
  },
  {
    id: "evt-5",
    year: 2026,
    startDate: "2026-05-14",
    endDate: "2026-05-16",
    category: "학회",
    title: "ICKHS Spring 2026",
    subtitle: "International Congress of Korean Hip Society 2026",
    location: "부산 롯데호텔",
    description: "대한고관절학회 춘계 학술대회입니다.",
    showInNotice: false,
  },
  {
    id: "evt-6",
    year: 2026,
    startDate: "2026-02-12",
    endDate: "2026-02-14",
    category: "학회",
    title: "KRoC 2026",
    subtitle: "대한재활로봇학회 국제학술대회",
    location: "서울 COEX",
    description: "재활로봇 분야 국제학술대회입니다.",
    showInNotice: false,
  },
];

export function getEventById(id) {
  return MOCK_EVENTS.find((item) => item.id === id) || null;
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatDayPart(date, { withYear = true } = {}) {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  const w = WEEKDAYS_KO[date.getDay()];
  if (withYear) return `${y}. ${m}. ${d} (${w})`;
  return `${m}. ${d} (${w})`;
}

/** 피그마 형식: 2026. 10. 14 (수) - 10. 17 (금) */
export function formatEventDateRange(event) {
  if (!event?.startDate) return "";
  const start = new Date(`${event.startDate}T00:00:00`);
  if (Number.isNaN(start.getTime())) return event.startDate;

  const endDateStr = event.endDate || event.startDate;
  const end = new Date(`${endDateStr}T00:00:00`);
  if (Number.isNaN(end.getTime()) || event.startDate === endDateStr) {
    return formatDayPart(start, { withYear: true });
  }

  return `${formatDayPart(start, { withYear: true })} - ${formatDayPart(end, { withYear: false })}`;
}

export function isUpcomingEvent(event, now = new Date()) {
  if (!event?.endDate && !event?.startDate) return false;
  const end = new Date(`${event.endDate || event.startDate}T23:59:59`);
  return end >= now;
}

export function getEventList(events = MOCK_EVENTS, { query = "", category = "all" } = {}) {
  const q = query.trim().toLowerCase();
  return [...events]
    .filter((item) => {
      if (category && category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return (
        item.title?.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.category?.includes(q)
      );
    })
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
}

export function splitEventsBySchedule(events = []) {
  const upcoming = [];
  const past = [];
  for (const event of events) {
    if (isUpcomingEvent(event)) upcoming.push(event);
    else past.push(event);
  }
  // 진행중/예정: 가장 가까운 행사부터 (시작일 오름차순)
  upcoming.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  // 종료: 최근 종료된 행사부터 (종료일 내림차순)
  past.sort(
    (a, b) =>
      new Date(b.endDate || b.startDate) - new Date(a.endDate || a.startDate),
  );
  return { upcoming, past };
}

/** 진행중 행사 → 종료된 행사 순으로 합친 목록 */
export function getOrderedEventList(events = [], filters = {}) {
  const filtered = getEventList(events, filters);
  const { upcoming, past } = splitEventsBySchedule(filtered);
  return [...upcoming, ...past];
}

export function getEventCategories(events = MOCK_EVENTS) {
  const set = new Set(events.map((e) => e.category).filter(Boolean));
  return Array.from(set);
}

/** 카테고리 표시용 (최대 3글자) */
export function formatCategory(category) {
  return String(category || "").slice(0, 3);
}
