import { createAdminClient } from "@/service/db/supabase/server";
import { getPediatricSession } from "@/features/pediatric-auth/session";

/**
 * 자료실/행사 열람 → advisory_member_views (관리자 활동 통계용)
 */
export async function recordAdvisoryMemberView(contentType, contentId) {
  if (!["resource", "event"].includes(contentType) || !contentId) return;

  try {
    const session = await getPediatricSession();
    if (!session?.loginId) return;

    const supa = await createAdminClient();
    const { data: member, error: memberError } = await supa
      .from("advisory_members")
      .select("id")
      .eq("login_id", String(session.loginId).trim().toLowerCase())
      .maybeSingle();

    if (memberError || !member?.id) return;

    await supa.from("advisory_member_views").insert({
      member_id: member.id,
      content_type: contentType,
      content_id: contentId,
      viewed_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[recordAdvisoryMemberView]", error);
  }
}
