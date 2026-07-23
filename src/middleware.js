import { NextResponse } from "next/server";
import { hasPediatricSessionFromRequest } from "@/features/pediatric-auth/session-cookie";

const AUTH_PATHS = [
  "/pediatric/login",
  "/pediatric/signup",
  "/pediatric/forgot-password",
  "/pediatric/reset-password",
];

const OPEN_PATHS = [...AUTH_PATHS, "/pediatric/session/clear"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ko", request.url));
  }

  if (pathname === "/pediatric" || pathname.startsWith("/pediatric/")) {
    const isAuthPage = AUTH_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
    const isOpenPath = OPEN_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
    const loggedIn = await hasPediatricSessionFromRequest(request);

    if (!isOpenPath && !loggedIn) {
      const loginUrl = new URL("/pediatric/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthPage && loggedIn) {
      return NextResponse.redirect(new URL("/pediatric", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
