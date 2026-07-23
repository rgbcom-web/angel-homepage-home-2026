/**
 * 설문 목 데이터
 * 구글폼 URL 연결 방식
 * status는 기간(endDate) 기준으로 계산: 종료일 지남 → 종료, 그 외 → 진행중
 */

export const MOCK_SURVEYS = [
  {
    id: "srv-1",
    title: "엔젤렉스 M20 교육 만족도 조사",
    startDate: "2026-07-01",
    endDate: "2026-07-31",
    description: "엔젤렉스 M20 교육 프로그램에 대한 만족도와 개선 의견을 수집하는 설문입니다.",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-m20/viewform",
    showInNotice: true,
  },
  {
    id: "srv-2",
    title: "소아 보행 재활 로봇 사용성 설문",
    startDate: "2026-06-15",
    endDate: "2026-08-15",
    description: "임상 현장에서의 사용성·편의성에 대한 의견을 부탁드립니다.",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-usability/viewform",
    showInNotice: true,
  },
  {
    id: "srv-3",
    title: "자문단 정기 미팅 일정 선호도 조사",
    startDate: "2026-07-10",
    endDate: "2026-07-25",
    description: "다음 분기 정기 미팅 일정 선호도 조사입니다.",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-meeting/viewform",
    showInNotice: false,
  },
  {
    id: "srv-4",
    title: "H10 임상 적용 경험 조사 (1분기)",
    startDate: "2026-01-05",
    endDate: "2026-02-28",
    description: "1분기 임상 적용 경험에 대한 설문입니다. (종료)",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-h10/viewform",
    showInNotice: false,
  },
  {
    id: "srv-5",
    title: "포털 서비스 개선을 위한 의견 수렴",
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    description: "Pediatric KOL Portal 이용 경험과 개선 요청 사항 설문입니다.",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-portal/viewform",
    showInNotice: false,
  },
  {
    id: "srv-6",
    title: "워크숍 사전 수요 조사",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    description: "소아 보행 재활 워크숍 사전 수요 조사입니다.",
    googleFormUrl: "https://docs.google.com/forms/d/e/example-workshop/viewform",
    showInNotice: false,
  },
];

export function getSurveyStatus(survey, now = new Date()) {
  if (!survey?.endDate && !survey?.startDate) return "ended";
  const end = new Date(`${survey.endDate || survey.startDate}T23:59:59`);
  return end >= now ? "ongoing" : "ended";
}

export function getSurveyStatusLabel(status) {
  return status === "ongoing" ? "진행중" : "종료";
}

export function formatSurveyPeriod(survey) {
  if (!survey?.startDate) return "";
  const end = survey.endDate || survey.startDate;
  return `${survey.startDate} ~ ${end}`;
}

export function getSurveyById(id) {
  return MOCK_SURVEYS.find((item) => item.id === id) || null;
}

/**
 * @param {typeof MOCK_SURVEYS} surveys
 * @param {{ query?: string, tab?: 'all' | 'ongoing' | 'ended' }} options
 */
export function getSurveyList(surveys = MOCK_SURVEYS, { query = "", tab = "all" } = {}) {
  const q = query.trim().toLowerCase();

  return [...surveys]
    .map((item) => ({
      ...item,
      status: getSurveyStatus(item),
    }))
    .filter((item) => {
      if (tab === "ongoing" && item.status !== "ongoing") return false;
      if (tab === "ended" && item.status !== "ended") return false;
      if (!q) return true;
      return item.title?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      return new Date(b.startDate) - new Date(a.startDate);
    });
}
