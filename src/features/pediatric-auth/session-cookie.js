import { verifyPediatricSessionToken } from "./session-token";

export const PEDIATRIC_SESSION_COOKIE = "pediatric_session";

/** middleware용: 서명된 세션 쿠키 유효 여부 */
export async function hasPediatricSessionFromRequest(request) {
  const raw = request.cookies.get(PEDIATRIC_SESSION_COOKIE)?.value;
  if (!raw) return false;
  const verified = await verifyPediatricSessionToken(raw);
  return Boolean(verified?.id && verified?.loginId);
}
