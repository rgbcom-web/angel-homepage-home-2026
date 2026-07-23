"use server";

import { redirect } from "next/navigation";
import {
  createMemberApplication,
  findMemberByLoginId,
  isLoginIdAvailable,
  resolveSessionMember,
  updateMemberPassword,
  updateMemberProfile,
} from "./members-store";
import {
  clearPediatricSession,
  getPediatricSession,
  setPediatricSession,
  verifyPassword,
} from "./session";
import { recordPediatricLogin } from "./login-log";
import { notifyPediatricSignup } from "./signup-notify";
import {
  normalizePhone,
  validateBirthDate,
  validateBirthYear,
  validateEmail,
  validateLoginId,
  validatePassword,
  validatePhone,
} from "./validation";

export async function checkLoginIdAction(loginId) {
  const normalized = String(loginId || "").trim().toLowerCase();
  const formatError = validateLoginId(normalized);
  if (formatError) {
    return { available: false, message: formatError };
  }

  const available = await isLoginIdAvailable(normalized);
  return {
    available,
    message: available ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.",
  };
}

export async function loginAction(prevState, formData) {
  const loginId = String(formData.get("loginId") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const remember = formData.get("remember") === "1";

  if (!loginId || !password) {
    return { success: false, message: "아이디와 비밀번호를 입력해 주세요." };
  }

  const member = await findMemberByLoginId(loginId);
  if (!member || !verifyPassword(password, member.passwordHash)) {
    return { success: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  if (member.status === "pending") {
    return {
      success: false,
      message: "관리자 승인 대기 중입니다. 승인 후 로그인해 주세요.",
    };
  }

  if (member.status === "rejected") {
    return { success: false, message: "가입이 거절된 계정입니다." };
  }

  if (member.status === "inactive") {
    return { success: false, message: "비활성화된 계정입니다. 관리자에게 문의해 주세요." };
  }

  await recordPediatricLogin(member);
  await setPediatricSession(member, { remember });
  redirect("/pediatric");
}

export async function signupAction(prevState, formData) {
  const loginId = String(formData.get("loginId") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const passwordConfirm = String(formData.get("passwordConfirm") || "");
  const name = String(formData.get("name") || "").trim();
  const birthYear = String(formData.get("birthYear") || "").trim();
  const birthDate = String(formData.get("birthDate") || "").trim();
  const phone = normalizePhone(formData.get("phone"));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const affiliation = String(formData.get("affiliation") || "").trim();
  const department = String(formData.get("department") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const privacyAgreed = formData.get("privacyAgreed") === "on";
  const loginIdChecked = formData.get("loginIdChecked") === "true";

  const errors = [
    validateLoginId(loginId),
    validatePassword(password),
    password !== passwordConfirm ? "비밀번호 확인이 일치하지 않습니다." : null,
    !name ? "이름을 입력해 주세요." : null,
    birthDate ? validateBirthDate(birthDate) : validateBirthYear(birthYear),
    validatePhone(phone),
    validateEmail(email),
    !affiliation ? "소속을 입력해 주세요." : null,
    !department ? "과(부서)를 입력해 주세요." : null,
    !title ? "직급을 입력해 주세요." : null,
    !privacyAgreed ? "개인정보 수집 및 이용에 동의해 주세요." : null,
    !loginIdChecked ? "아이디 중복 확인을 해주세요." : null,
  ].filter(Boolean);

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  const available = await isLoginIdAvailable(loginId);
  if (!available) {
    return { success: false, message: "이미 사용 중인 아이디입니다." };
  }

  const resolvedBirthYear = birthYear || birthDate.slice(0, 4);
  const resolvedBirthDate = birthDate || `${resolvedBirthYear}-01-01`;

  try {
    const member = await createMemberApplication({
      loginId,
      password,
      name,
      birthYear: resolvedBirthYear,
      birthDate: resolvedBirthDate,
      phone,
      email,
      affiliation,
      department,
      title,
      address,
    });

    // 관리자 목록 동기화 + 승인 요청 알림메일 (실패해도 가입은 유지)
    await notifyPediatricSignup(member);
  } catch (error) {
    return { success: false, message: error.message || "가입 신청에 실패했습니다." };
  }

  return {
    success: true,
    message: "가입 신청이 완료되었습니다. 관리자 승인 후 로그인해 주세요.",
  };
}

export async function logoutAction() {
  await clearPediatricSession();
  redirect("/pediatric/login");
}

export async function updateMyInfoAction(prevState, formData) {
  const session = await getPediatricSession();
  const member = session ? await resolveSessionMember(session) : null;
  if (!member?.id) {
    return { success: false, message: "로그인이 필요합니다." };
  }

  const birthYear = String(formData.get("birthYear") || "").trim();
  const birthDateRaw = String(formData.get("birthDate") || "").trim();
  const birthDate = birthDateRaw || (birthYear ? `${birthYear}-01-01` : "");
  const phone = normalizePhone(formData.get("phone"));
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const affiliation = String(formData.get("affiliation") || "").trim();
  const department = String(formData.get("department") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const addressDetail = String(formData.get("addressDetail") || "").trim();
  const zipCode = String(formData.get("zipCode") || "").trim();

  const errors = [
    birthDateRaw ? validateBirthDate(birthDateRaw) : validateBirthYear(birthYear),
    validatePhone(phone),
    validateEmail(email),
    !affiliation ? "소속을 입력해 주세요." : null,
    !department ? "과(부서)를 입력해 주세요." : null,
    !title ? "직급을 입력해 주세요." : null,
  ].filter(Boolean);

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  try {
    const updated = await updateMemberProfile(member.id, {
      birthDate,
      phone,
      email,
      affiliation,
      department,
      title,
      address,
      addressDetail,
      zipCode,
    });
    await setPediatricSession(updated);
    return { success: true, message: "회원 정보가 저장되었습니다." };
  } catch (error) {
    return { success: false, message: error.message || "저장에 실패했습니다." };
  }
}

export async function changePasswordAction(prevState, formData) {
  const session = await getPediatricSession();
  const member = session ? await resolveSessionMember(session) : null;
  if (!member?.id) {
    return { success: false, message: "로그인이 필요합니다." };
  }

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const newPasswordConfirm = String(formData.get("newPasswordConfirm") || "");

  const errors = [
    !currentPassword ? "현재 비밀번호를 입력해 주세요." : null,
    validatePassword(newPassword),
    newPassword !== newPasswordConfirm ? "새 비밀번호 확인이 일치하지 않습니다." : null,
    currentPassword && newPassword === currentPassword
      ? "현재 비밀번호와 다른 비밀번호를 입력해 주세요."
      : null,
  ].filter(Boolean);

  if (errors.length > 0) {
    return { success: false, message: errors[0] };
  }

  try {
    await updateMemberPassword(member.id, { currentPassword, newPassword });
    return { success: true, message: "비밀번호가 변경되었습니다." };
  } catch (error) {
    return { success: false, message: error.message || "비밀번호 변경에 실패했습니다." };
  }
}
