import { createAdminClient } from "@/service/db/supabase/server";

/**
 * 로그인 성공 시 last_login_at 갱신 + advisory_login_logs 기록
 */
export async function recordPediatricLogin(member) {
  if (!member?.id && !member?.loginId) {
    return { success: false, message: "회원 정보 없음" };
  }

  try {
    const supa = await createAdminClient();
    const now = new Date().toISOString();
    let memberId = member.id || null;

    if (!memberId && member.loginId) {
      const { data, error } = await supa
        .from("advisory_members")
        .select("id")
        .eq("login_id", String(member.loginId).trim().toLowerCase())
        .maybeSingle();
      if (error) throw error;
      memberId = data?.id || null;
    }

    if (!memberId) {
      return { success: false, message: "회원 ID 없음" };
    }

    await supa.from("advisory_members").update({ last_login_at: now }).eq("id", memberId);

    const { error: logError } = await supa.from("advisory_login_logs").insert({
      member_id: memberId,
      logged_in_at: now,
    });
    if (logError) throw logError;

    return { success: true, memberId };
  } catch (error) {
    console.error("[recordPediatricLogin]", error);
    return { success: false, message: error.message || "접속 로그 기록 실패" };
  }
}
