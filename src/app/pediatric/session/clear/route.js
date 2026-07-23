import { NextResponse } from "next/server";
import { PEDIATRIC_SESSION_COOKIE } from "@/features/pediatric-auth/session-cookie";

/** Layout에서 쿠키 삭제가 불가하므로, 무효 세션은 여기로 리다이렉트 */
export async function GET(request) {
  const loginUrl = new URL("/pediatric/login", request.url);
  const response = NextResponse.redirect(loginUrl);

  response.cookies.set(PEDIATRIC_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
