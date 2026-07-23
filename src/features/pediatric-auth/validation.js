export const LOGIN_ID_REGEX = /^[a-z0-9]{6,20}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;
export const BIRTH_YEAR_REGEX = /^(19|20)\d{2}$/;
export const PHONE_REGEX = /^\d{9,11}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginId(loginId) {
  if (!loginId) return "아이디를 입력해 주세요.";
  if (!LOGIN_ID_REGEX.test(loginId)) {
    return "아이디는 영문 소문자, 숫자 조합 6~20자여야 합니다.";
  }
  return null;
}

export function validatePassword(password) {
  if (!password) return "비밀번호를 입력해 주세요.";
  if (!PASSWORD_REGEX.test(password)) {
    return "비밀번호는 영문, 숫자, 특수문자 조합 8~20자여야 합니다.";
  }
  return null;
}

export function validateBirthYear(birthYear) {
  if (!birthYear) return "생년을 입력해 주세요.";
  if (!BIRTH_YEAR_REGEX.test(birthYear)) {
    return "생년은 YYYY 형식(예: 1985)으로 입력해 주세요.";
  }
  return null;
}

export function validateBirthDate(birthDate) {
  if (!birthDate) return "생년월일을 입력해 주세요.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    return "생년월일 형식이 올바르지 않습니다.";
  }
  const date = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return "올바른 생년월일을 입력해 주세요.";
  }
  const year = birthDate.slice(0, 4);
  return validateBirthYear(year);
}

/** 하이픈 포함 입력을 숫자만으로 정규화 */
export function normalizePhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

export function validatePhone(phone) {
  if (!phone) return "전화번호를 입력해 주세요.";
  if (!PHONE_REGEX.test(phone)) {
    return "전화번호는 - 없이 숫자만 입력해 주세요.";
  }
  return null;
}

export function validateEmail(email) {
  if (!email) return "이메일을 입력해 주세요.";
  if (!EMAIL_REGEX.test(email)) {
    return "올바른 이메일 형식이 아닙니다.";
  }
  return null;
}
