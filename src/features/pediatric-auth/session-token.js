/**
 * pediatric_session 쿠키 서명/검증 (HMAC-SHA256, Web Crypto)
 * Edge middleware · Node 서버 공통
 *
 * 포맷: v1.<base64url(json)>.<base64url(sig)>
 */

const SESSION_VERSION = "v1";

function getSessionSecret() {
  const secret =
    process.env.PEDIATRIC_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) {
    throw new Error(
      "PEDIATRIC_SESSION_SECRET 또는 SUPABASE_SERVICE_ROLE_KEY 가 필요합니다.",
    );
  }
  return secret;
}

function bytesToBase64Url(bytes) {
  let binary = "";
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i += 1) {
    binary += String.fromCharCode(arr[i]);
  }
  const b64 =
    typeof btoa === "function"
      ? btoa(binary)
      : Buffer.from(arr).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4));
  const padded = b64 + pad;
  if (typeof atob === "function") {
    const binary = atob(padded);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(padded, "base64"));
}

function timingSafeEqualBytes(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function signPayloadPart(payloadPart) {
  const key = await importHmacKey(getSessionSecret());
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payloadPart),
  );
  return bytesToBase64Url(signature);
}

export async function signPediatricSessionPayload(payload) {
  const payloadPart = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  const signaturePart = await signPayloadPart(payloadPart);
  return `${SESSION_VERSION}.${payloadPart}.${signaturePart}`;
}

export async function verifyPediatricSessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== SESSION_VERSION) return null;

  const [, payloadPart, signaturePart] = parts;
  if (!payloadPart || !signaturePart) return null;

  let expected;
  try {
    expected = await signPayloadPart(payloadPart);
  } catch {
    return null;
  }

  const a = base64UrlToBytes(signaturePart);
  const b = base64UrlToBytes(expected);
  if (!timingSafeEqualBytes(a, b)) return null;

  try {
    const json = new TextDecoder().decode(base64UrlToBytes(payloadPart));
    const parsed = JSON.parse(json);
    if (!parsed?.id || !parsed?.loginId) return null;
    if (parsed.exp && Date.now() > Number(parsed.exp)) return null;
    return parsed;
  } catch {
    return null;
  }
}
