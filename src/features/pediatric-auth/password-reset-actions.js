"use server";

import { headers } from "next/headers";
import { sendmail } from "@/service/api/mailer";
import { findMemberByLoginId, resetMemberPassword } from "./members-store";
import {
  consumePasswordResetToken,
  issuePasswordResetToken,
  peekPasswordResetToken,
} from "./password-reset-store";
import { validateEmail, validateLoginId, validatePassword } from "./validation";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

const GENERIC_REQUEST_MESSAGE =
  "입력하신 정보와 일치하는 계정이 있으면, 등록된 이메일로 비밀번호 재설정 안내를 보냈습니다.";

async function getSiteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") || headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") || "http";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getResetMailBody({ name, loginId, resetUrl }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>비밀번호 재설정</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif; color: #333333; line-height: 1.5;">
  <div style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
    <div style="background-color: #f1f5f9; padding: 25px 30px;">
      <img src="https://angel-robotics.com/images/common/logo-angel.png" alt="엔젤로보틱스 로고" style="height: 24px; display: block;">
    </div>
    <div style="padding: 25px 30px 5px; border-bottom: 1px solid #e2e8f0;">
      <h1 style="margin: 0; color: #1e293b; font-size: 22px; font-weight: 700;">비밀번호 재설정 안내</h1>
      <p style="margin: 8px 0 0; color: #64748b; font-size: 14px;">${escapeHtml(PEDIATRIC_SITE_NAME)}</p>
    </div>
    <div style="padding: 20px 30px;">
      <p style="margin: 0 0 16px; font-size: 15px; color: #334155;">
        ${escapeHtml(name)}님, 비밀번호 재설정을 요청하셨습니다습니다.<br>
        아이디 <strong>${escapeHtml(loginId)}</strong> 계정의 새 비밀번호를 설정하려면 아래 버튼을 눌러 주세요.
      </p>
      <p style="margin: 0 0 20px; font-size: 13px; color: #64748b;">
        링크는 발송 후 1시간 동안만 유효합니다. 본인이 요청하지 않았다면 이 메일을 무시해 주세요.
      </p>
      <a href="${escapeHtml(resetUrl)}" style="display: inline-block; background-color: #2563eb; color: white; font-weight: 600; text-decoration: none; padding: 12px 16px; border-radius: 6px; font-size: 14px;">
        비밀번호 재설정
      </a>
    </div>
    <div style="background-color: #f1f5f9; padding: 20px; text-align: center; color: #64748b; font-size: 13px;">
      <p style="margin: 0;">© ANGEL ROBOTICS. 이 메일은 자동으로 발송되었습니다.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function requestPasswordResetAction(prevState, formData) {
  const loginId = String(formData.get("loginId") || "").trim().toLowerCase();
  const email = String(formData.get("email") || "").trim().toLowerCase();

  const loginIdError = validateLoginId(loginId);
  const emailError = validateEmail(email);
  if (loginIdError || emailError) {
    return { success: false, message: loginIdError || emailError };
  }

  try {
    const member = await findMemberByLoginId(loginId);
    const matched =
      member &&
      member.email?.toLowerCase() === email &&
      member.status !== "rejected" &&
      member.status !== "inactive";

    if (matched) {
      const token = await issuePasswordResetToken(member.id);
      const origin = await getSiteOrigin();
      const resetUrl = `${origin}/pediatric/reset-password?token=${token}`;

      const mailResult = await sendmail(
        member.email,
        `[${PEDIATRIC_SITE_NAME}] 비밀번호 재설정 안내`,
        getResetMailBody({
          name: member.name,
          loginId: member.loginId,
          resetUrl,
        }),
      );

      if (!mailResult?.success) {
        console.error("[requestPasswordResetAction] mail failed", mailResult);
      }
    }
  } catch (error) {
    console.error("[requestPasswordResetAction]", error);
  }

  // 계정 존재 여부를 노출하지 않음
  return { success: true, message: GENERIC_REQUEST_MESSAGE };
}

export async function validateResetTokenAction(token) {
  const memberId = await peekPasswordResetToken(token);
  return { valid: Boolean(memberId) };
}

export async function resetPasswordAction(prevState, formData) {
  const token = String(formData.get("token") || "").trim();
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");

  if (!token) {
    return { success: false, message: "유효하지 않은 재설정 링크입니다." };
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return { success: false, message: passwordError };
  }

  if (password !== passwordConfirm) {
    return { success: false, message: "비밀번호 확인이 일치하지 않습니다." };
  }

  const memberId = await consumePasswordResetToken(token);
  if (!memberId) {
    return {
      success: false,
      message: "재설정 링크가 만료되었거나 이미 사용되었습니다. 다시 요청해 주세요.",
    };
  }

  try {
    await resetMemberPassword(memberId, password);
    return {
      success: true,
      message: "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해 주세요.",
    };
  } catch (error) {
    return { success: false, message: error.message || "비밀번호 변경에 실패했습니다." };
  }
}
