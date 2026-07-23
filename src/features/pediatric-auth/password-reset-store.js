import { createHash, randomBytes } from "crypto";
import { createAdminClient } from "@/service/db/supabase/server";

const TABLE = "advisory_members";
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1시간

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function createResetTokenValue() {
  return randomBytes(32).toString("hex");
}

/**
 * 비밀번호 재설정 토큰을 advisory_members 에 저장
 * (컬럼: password_reset_token_hash, password_reset_expires_at)
 */
export async function issuePasswordResetToken(memberId) {
  const token = createResetTokenValue();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const supa = await createAdminClient();
  const { error } = await supa
    .from(TABLE)
    .update({
      password_reset_token_hash: tokenHash,
      password_reset_expires_at: expiresAt,
    })
    .eq("id", memberId);

  if (error) {
    if (String(error.message || "").includes("password_reset")) {
      throw new Error(
        "비밀번호 재설정 컬럼이 없습니다. sql/advisory_members_vercel.sql 을 실행해 주세요.",
      );
    }
    throw error;
  }

  return token;
}

export async function consumePasswordResetToken(token) {
  if (!token) return null;

  const tokenHash = hashToken(token);
  const supa = await createAdminClient();
  const { data, error } = await supa
    .from(TABLE)
    .select("id, password_reset_expires_at")
    .eq("password_reset_token_hash", tokenHash)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  await clearResetToken(supa, data.id);

  if (
    !data.password_reset_expires_at ||
    new Date(data.password_reset_expires_at).getTime() <= Date.now()
  ) {
    return null;
  }

  return data.id;
}

export async function peekPasswordResetToken(token) {
  if (!token) return null;

  const tokenHash = hashToken(token);
  const supa = await createAdminClient();
  const { data, error } = await supa
    .from(TABLE)
    .select("id, password_reset_expires_at")
    .eq("password_reset_token_hash", tokenHash)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  if (
    !data.password_reset_expires_at ||
    new Date(data.password_reset_expires_at).getTime() <= Date.now()
  ) {
    return null;
  }
  return data.id;
}

async function clearResetToken(supa, memberId) {
  await supa
    .from(TABLE)
    .update({
      password_reset_token_hash: null,
      password_reset_expires_at: null,
    })
    .eq("id", memberId);
}
