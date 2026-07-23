import { createHash, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { PEDIATRIC_SESSION_COOKIE } from "./session-cookie";
import {
  signPediatricSessionPayload,
  verifyPediatricSessionToken,
} from "./session-token";

export { PEDIATRIC_SESSION_COOKIE, hasPediatricSessionFromRequest } from "./session-cookie";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = createHash("sha256").update(`${salt}:${password}`).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(next));
  } catch {
    return false;
  }
}

export function toPublicMember(member) {
  if (!member) return null;
  const birthYear = member.birthYear || "";
  const birthDate =
    member.birthDate || (birthYear ? `${birthYear}-01-01` : "");
  return {
    id: member.id,
    loginId: member.loginId,
    email: member.email,
    name: member.name,
    birthYear,
    birthDate,
    phone: member.phone || "",
    title: member.title,
    affiliation: member.affiliation,
    department: member.department || "",
    address: member.address || "",
    addressDetail: member.addressDetail || "",
    zipCode: member.zipCode || "",
    status: member.status,
  };
}

export async function getPediatricSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PEDIATRIC_SESSION_COOKIE)?.value;
  if (!raw) return null;

  const verified = await verifyPediatricSessionToken(raw);
  if (!verified) return null;

  const { iat: _iat, exp: _exp, ...member } = verified;
  return member;
}

export async function setPediatricSession(member, { remember = false } = {}) {
  const cookieStore = await cookies();
  const maxAge = remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  const now = Date.now();
  const token = await signPediatricSessionPayload({
    ...toPublicMember(member),
    iat: now,
    exp: now + maxAge * 1000,
  });

  cookieStore.set(PEDIATRIC_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
}

export async function clearPediatricSession() {
  const cookieStore = await cookies();
  cookieStore.delete(PEDIATRIC_SESSION_COOKIE);
}
