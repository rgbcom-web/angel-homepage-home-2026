import { redirect } from "next/navigation";
import { PediatricPortalShell } from "@/features/pediatric-portal/portal-shell";
import { getPediatricSession, toPublicMember } from "@/features/pediatric-auth/session";
import { resolveSessionMember } from "@/features/pediatric-auth/members-store";
import { fetchPortalNotices } from "@/features/pediatric-portal/notices-api";
import { fetchMemberNotifications } from "@/features/pediatric-portal/notifications-api";

export const dynamic = "force-dynamic";

export default async function PediatricPortalLayout({ children }) {
  const session = await getPediatricSession();

  if (!session) {
    redirect("/pediatric/login");
  }

  let stored = null;
  try {
    stored = await resolveSessionMember(session);
  } catch (error) {
    console.error("[PediatricPortalLayout]", error);
  }

  // 쿠키 수정은 Layout에서 불가 → Route Handler로 정리
  if (!stored || stored.status !== "approved") {
    redirect("/pediatric/session/clear");
  }

  const member = toPublicMember(stored);
  const [{ notices }, { notifications }] = await Promise.all([
    fetchPortalNotices(),
    fetchMemberNotifications(),
  ]);

  return (
    <PediatricPortalShell member={member} notices={notices} notifications={notifications}>
      {children}
    </PediatricPortalShell>
  );
}
