import { sendAlimMail } from "@/features/form/send-alim-mail";

/** 알림메일 수신자 설정의 table_id (관리자 → 알림메일 수신자) */
export const ADVISORY_SIGNUP_ALIM_TABLE_ID = "advisory_members";

const ADMIN_MEMBERS_URL = process.env.NEXT_PUBLIC_ADMIN_SITE_URL
  ? `${process.env.NEXT_PUBLIC_ADMIN_SITE_URL.replace(/\/$/, "")}/pediatric/members?status=pending`
  : "https://admin.angel-robotics.com/pediatric/members?status=pending";

/**
 * 가입 신청 후 관리자 알림메일 (회원은 이미 Supabase에 저장됨)
 */
export async function notifyPediatricSignup(member) {
  const mailResult = await sendSignupAlimMail(member);
  return { mailResult };
}

async function sendSignupAlimMail(member) {
  try {
    await sendAlimMail({
      tableName: ADVISORY_SIGNUP_ALIM_TABLE_ID,
      mailSubject: `[자문단 가입신청] ${member.name}님의 승인이 필요합니다.`,
      mailBody: getSignupMailBody(member),
    });
    return { success: true };
  } catch (error) {
    console.error("[sendSignupAlimMail]", error);
    return { success: false, message: error.message || "알림메일 발송 실패" };
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSignupMailBody(member) {
  const rows = [
    ["아이디", member.loginId],
    ["이름", member.name],
    ["이메일", member.email],
    ["연락처", member.phone],
    ["생년", member.birthYear],
    ["소속", member.affiliation],
    ["과(부서)", member.department],
    ["직급", member.title],
    ["주소", member.address || "-"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 90px; vertical-align: top; border-bottom: 1px solid #e2e8f0;">${escapeHtml(label)}</td>
          <td style="padding: 8px 0; font-weight: 500; border-bottom: 1px solid #e2e8f0;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>자문단 가입 신청 알림</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif; color: #333333; line-height: 1.5;">
  <div style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <div style="background-color: #f1f5f9; padding: 25px 30px;">
      <img src="https://angel-robotics.com/images/common/logo-angel.png" alt="엔젤로보틱스 로고" style="height: 24px; display: block;">
    </div>
    <div style="padding: 25px 30px 5px; border-bottom: 1px solid #e2e8f0;">
      <h1 style="margin: 0; color: #1e293b; font-size: 22px; font-weight: 700;">자문단 가입 신청이 접수되었습니다</h1>
      <p style="margin: 8px 0 0; color: #64748b; font-size: 14px;">관리자 승인이 필요합니다.</p>
    </div>
    <div style="padding: 20px 30px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        ${tableRows}
      </table>
      <div style="margin-top: 25px;">
        <a href="${ADMIN_MEMBERS_URL}" style="display: inline-block; background-color: #2563eb; color: white; font-weight: 600; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-size: 14px; text-align: center;">
          승인 대기 회원 보기
        </a>
      </div>
    </div>
    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
      <p style="margin: 0;">© ANGEL ROBOTICS. 이 메일은 자동으로 발송되었습니다.</p>
    </div>
  </div>
</body>
</html>
  `;
}
