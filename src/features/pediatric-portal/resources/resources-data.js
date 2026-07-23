/**
 * 자료실 목 데이터
 * 이후 Supabase advisory_resources 테이블로 교체
 * - isNotice: 자료실 상단 공지 영역 노출
 * - showInNotice: 홈 대시보드 공지 집계용
 */

export const MOCK_RESOURCES = [
  {
    id: "res-notice-1",
    title: "연구자 모집 관련 공지사항 안내",
    date: "2024-05-20",
    views: 128,
    isNotice: true,
    showInNotice: true,
    fileType: "pdf",
    fileName: "researcher-recruit-notice.pdf",
    // 데모용 upstream — 클라이언트에는 /api/pediatric/resources/:id/file 만 노출
    sourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "연구자 모집 관련 공지입니다. 열람만 가능하며 다운로드·인쇄가 제한됩니다.",
  },
  {
    id: "res-1",
    title: "ANGEL SUIT H10 Product Brochure (v2.1)",
    date: "2024-05-18",
    views: 86,
    isNotice: false,
    showInNotice: false,
    fileType: "pdf",
    fileName: "angel-suit-h10-brochure-v2.1.pdf",
    sourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "엔젤슈트 H10 제품 브로슈어입니다.",
  },
  {
    id: "res-2",
    title: "H10 Clinical Evidence Summary",
    date: "2024-05-15",
    views: 64,
    isNotice: false,
    showInNotice: false,
    fileType: "pdf",
    fileName: "h10-clinical-evidence-summary.pdf",
    sourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "H10 임상 근거 요약 자료입니다.",
  },
  {
    id: "res-3",
    title: "소아 보행 재활 로봇 기술 백서",
    date: "2024-05-10",
    views: 52,
    isNotice: false,
    showInNotice: true,
    fileType: "pdf",
    fileName: "pediatric-gait-whitepaper.pdf",
    sourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "소아 보행 재활 로봇 기술 백서입니다.",
  },
  {
    id: "res-4",
    title: "임상 가이드라인 v1.2",
    date: "2024-04-28",
    views: 41,
    isNotice: false,
    showInNotice: false,
    fileType: "image",
    fileName: "clinical-guideline-cover.png",
    sourceUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    description: "임상 가이드라인 표지 이미지입니다.",
  },
  {
    id: "res-5",
    title: "KOL 포털 이용 안내서",
    date: "2024-04-20",
    views: 95,
    isNotice: false,
    showInNotice: false,
    fileType: "pdf",
    fileName: "kol-portal-guide.pdf",
    sourceUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    description: "KOL 포털 이용 안내서입니다.",
  },
];

export function getResourceById(id) {
  return MOCK_RESOURCES.find((item) => item.id === id) || null;
}

export function getResourceNotices(resources = MOCK_RESOURCES) {
  return resources
    .filter((item) => item.isNotice)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getResourceList(resources = MOCK_RESOURCES, { query = "" } = {}) {
  const q = query.trim().toLowerCase();
  return resources
    .filter((item) => !item.isNotice)
    .filter((item) => !q || item.title?.toLowerCase().includes(q))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
