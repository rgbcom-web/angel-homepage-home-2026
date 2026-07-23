import { createAdminClient } from "@/service/db/supabase/server";
import { hashPassword, verifyPassword } from "./session";

const TABLE = "advisory_members";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUuid(value) {
  return UUID_RE.test(String(value || ""));
}

function mapRow(row) {
  if (!row) return null;
  const birthYear = row.birth_year || "";
  return {
    id: row.id,
    loginId: row.login_id,
    email: row.email || "",
    passwordHash: row.password_hash || "",
    name: row.name || "",
    birthYear,
    birthDate: row.birth_date || (birthYear ? `${birthYear}-01-01` : ""),
    phone: row.phone || "",
    title: row.title || "",
    affiliation: row.affiliation || "",
    department: row.department || "",
    address: row.address || "",
    addressDetail: row.address_detail || "",
    zipCode: row.zip_code || "",
    status: row.status || "pending",
    createdAt: row.created_at || null,
    lastLoginAt: row.last_login_at || null,
  };
}

function toDbProfile(data) {
  const birthDate = data.birthDate?.trim() || "";
  const birthYear = data.birthYear?.trim() || birthDate.slice(0, 4) || "";

  return {
    login_id: data.loginId,
    email: data.email,
    name: data.name,
    birth_year: birthYear,
    birth_date: birthDate || (birthYear ? `${birthYear}-01-01` : null),
    phone: data.phone || "",
    affiliation: data.affiliation || "",
    department: data.department || "",
    title: data.title || "",
    address: data.address || "",
    address_detail: data.addressDetail || "",
    zip_code: data.zipCode || "",
  };
}

async function insertWithOptionalColumns(supa, payload) {
  let { data, error } = await supa.from(TABLE).insert(payload).select("*").single();

  if (
    error &&
    (String(error.message || "").includes("birth_date") ||
      String(error.message || "").includes("address_detail") ||
      String(error.message || "").includes("zip_code"))
  ) {
    const {
      birth_date: _bd,
      address_detail: _ad,
      zip_code: _zc,
      ...core
    } = payload;
    ({ data, error } = await supa.from(TABLE).insert(core).select("*").single());
  }

  return { data, error };
}

async function updateWithOptionalColumns(supa, id, payload) {
  if (!isUuid(id)) {
    return { data: null, error: { message: "유효하지 않은 회원 ID입니다." } };
  }

  let { data, error } = await supa.from(TABLE).update(payload).eq("id", id).select("*").single();

  if (
    error &&
    (String(error.message || "").includes("birth_date") ||
      String(error.message || "").includes("address_detail") ||
      String(error.message || "").includes("zip_code"))
  ) {
    const {
      birth_date: _bd,
      address_detail: _ad,
      zip_code: _zc,
      ...core
    } = payload;
    ({ data, error } = await supa.from(TABLE).update(core).eq("id", id).select("*").single());
  }

  return { data, error };
}

export async function findMemberByLoginId(loginId) {
  const normalized = String(loginId || "")
    .trim()
    .toLowerCase();
  if (!normalized) return null;

  const supa = await createAdminClient();
  const { data, error } = await supa.from(TABLE).select("*").eq("login_id", normalized).maybeSingle();
  if (error) throw error;
  return mapRow(data);
}

export async function findMemberByEmail(email) {
  const normalized = String(email || "")
    .trim()
    .toLowerCase();
  if (!normalized) return null;

  const supa = await createAdminClient();
  const { data, error } = await supa.from(TABLE).select("*").eq("email", normalized).maybeSingle();
  if (error) throw error;
  return mapRow(data);
}

export async function findMemberById(id) {
  if (!isUuid(id)) return null;
  const supa = await createAdminClient();
  const { data, error } = await supa.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return mapRow(data);
}

/** 세션(쿠키) → 실제 Supabase 회원. 예전 로컬 id(member-seed-1 등)도 loginId로 복구 */
export async function resolveSessionMember(session) {
  if (!session) return null;

  if (isUuid(session.id)) {
    const byId = await findMemberById(session.id);
    if (byId) return byId;
  }

  if (session.loginId) {
    return findMemberByLoginId(session.loginId);
  }

  return null;
}

export async function isLoginIdAvailable(loginId) {
  const member = await findMemberByLoginId(loginId);
  return !member;
}

export async function createMemberApplication(data) {
  const loginId = data.loginId.trim().toLowerCase();
  const email = data.email.trim().toLowerCase();

  if (!(await isLoginIdAvailable(loginId))) {
    throw new Error("이미 사용 중인 아이디입니다.");
  }

  const existingEmail = await findMemberByEmail(email);
  if (existingEmail) {
    throw new Error("이미 등록된 이메일입니다.");
  }

  const payload = {
    ...toDbProfile({
      loginId,
      email,
      name: data.name.trim(),
      birthYear: data.birthYear.trim(),
      birthDate: data.birthDate?.trim() || `${data.birthYear.trim()}-01-01`,
      phone: data.phone.trim(),
      title: data.title.trim(),
      affiliation: data.affiliation.trim(),
      department: data.department.trim(),
      address: (data.address || "").trim(),
      addressDetail: (data.addressDetail || "").trim(),
      zipCode: (data.zipCode || "").trim(),
    }),
    password_hash: hashPassword(data.password),
    status: "pending",
  };

  const supa = await createAdminClient();
  const { data: inserted, error } = await insertWithOptionalColumns(supa, payload);
  if (error) throw error;
  return mapRow(inserted);
}

export async function updateMemberProfile(memberId, data) {
  const email = data.email.trim().toLowerCase();
  const existingEmail = await findMemberByEmail(email);
  if (existingEmail && existingEmail.id !== memberId) {
    throw new Error("이미 등록된 이메일입니다.");
  }

  const birthDate = data.birthDate.trim();
  const payload = {
    email,
    birth_year: birthDate.slice(0, 4),
    birth_date: birthDate,
    phone: data.phone.trim(),
    affiliation: data.affiliation.trim(),
    department: data.department.trim(),
    title: data.title.trim(),
    address: (data.address || "").trim(),
    address_detail: (data.addressDetail || "").trim(),
    zip_code: (data.zipCode || "").trim(),
  };

  const supa = await createAdminClient();
  const { data: updated, error } = await updateWithOptionalColumns(supa, memberId, payload);
  if (error) throw error;
  return mapRow(updated);
}

export async function updateMemberPassword(memberId, { currentPassword, newPassword }) {
  if (!isUuid(memberId)) {
    throw new Error("회원 정보를 찾을 수 없습니다.");
  }

  const member = await findMemberById(memberId);
  if (!member) {
    throw new Error("회원 정보를 찾을 수 없습니다.");
  }

  if (!verifyPassword(currentPassword, member.passwordHash)) {
    throw new Error("현재 비밀번호가 올바르지 않습니다.");
  }

  const supa = await createAdminClient();
  const { data, error } = await supa
    .from(TABLE)
    .update({ password_hash: hashPassword(newPassword) })
    .eq("id", memberId)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function resetMemberPassword(memberId, newPassword) {
  if (!isUuid(memberId)) {
    throw new Error("회원 정보를 찾을 수 없습니다.");
  }

  const supa = await createAdminClient();
  const { data, error } = await supa
    .from(TABLE)
    .update({ password_hash: hashPassword(newPassword) })
    .eq("id", memberId)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data);
}
