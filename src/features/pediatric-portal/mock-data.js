/**
 * 자문단 포털 목 데이터
 * 이후 Supabase 테이블로 교체:
 * - advisory_members
 * - advisory_resources / advisory_events / advisory_surveys (show_in_notice 컬럼)
 * - advisory_notifications
 */

/** 알림 (unread: true 인 것만 배지 카운트) */
export const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    title: "새로운 설문이 등록되었습니다.",
    description: "보행 패턴 분석 설문 참여를 요청합니다.",
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    unread: true,
    href: "/pediatric/surveys",
  },
  {
    id: "n2",
    title: "자료실에 새 자료가 업로드 되었습니다.",
    description: "임상 데이터 분석 보고서 v2.1",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    unread: true,
    href: "/pediatric/resources",
  },
  {
    id: "n3",
    title: "시스템 공지",
    description: "서버 점검 안내 - 02:00~04:00",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    unread: false,
    href: "/pediatric/resources",
  },
  {
    id: "n4",
    title: "Q1 자문단 워크숍 일정이 확정되었습니다",
    description: "행사 일정을 확인해 주세요.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    unread: false,
    href: "/pediatric/events",
  },
];

/**
 * 자료실 / 행사 / 설문 게시글
 * showInNotice: true 인 항목만 홈 공지사항에 노출
 */
export const MOCK_POSTS = [
  {
    id: "res-notice-1",
    type: "resources",
    title: "연구자 모집 관련 공지사항 안내",
    date: "2024.05.20",
    showInNotice: true,
  },
  {
    id: "res-3",
    type: "resources",
    title: "소아 보행 재활 로봇 기술 백서",
    date: "2024.05.10",
    showInNotice: true,
  },
  {
    id: "evt-1",
    type: "events",
    title: "WCNR 2026",
    date: "2026.10.14",
    showInNotice: true,
  },
  {
    id: "evt-2",
    type: "events",
    title: "소아 보행 재활 워크숍",
    date: "2026.03.20",
    showInNotice: false,
  },
  {
    id: "srv-1",
    type: "surveys",
    title: "엔젤렉스 M20 교육 만족도 조사",
    date: "2026.07.01",
    showInNotice: true,
  },
  {
    id: "srv-2",
    type: "surveys",
    title: "소아 보행 재활 로봇 사용성 설문",
    date: "2026.06.15",
    showInNotice: true,
  },
  {
    id: "e2",
    type: "events",
    title: "KOL 자문단 정기 미팅",
    date: "2025.06.12",
    showInNotice: false,
  },
];

/** 공지사항: showInNotice === true 인 게시글만, 최신순 */
export function getNoticePosts(posts = MOCK_POSTS) {
  return posts
    .filter((post) => post.showInNotice)
    .sort((a, b) => new Date(b.date.replace(/\./g, "-")) - new Date(a.date.replace(/\./g, "-")));
}

export function formatMemberDisplayName(member) {
  return `${member.name} ${member.title}님`;
}

export function formatRelativeTime(isoString) {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "어제";
  return `${days}일 전`;
}
