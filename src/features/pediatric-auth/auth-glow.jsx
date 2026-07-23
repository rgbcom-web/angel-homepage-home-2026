"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

/** 로그인 화면에만 피그마 글로우 배경 표시 */
export function AuthGlow() {
  const pathname = usePathname();
  const showGlow = pathname?.startsWith("/pediatric/login");

  if (!showGlow) return null;

  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-[19%] top-[13%] size-[612px] -translate-x-1/4 rotate-[75deg]",
          "mobile:left-1/2 mobile:top-[20%] mobile:size-[420px] mobile:-translate-x-1/2",
        )}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pediatric/login/glow-blue.svg"
          alt=""
          className={cn("size-full max-w-none")}
        />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-[8%] right-[29%] size-[400px]",
          "mobile:bottom-[12%] mobile:right-[-10%] mobile:size-[280px]",
        )}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pediatric/login/glow-indigo.svg"
          alt=""
          className={cn("size-full max-w-none")}
        />
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-[13%] right-[24%] size-[490px] -rotate-[105deg]",
          "mobile:hidden",
        )}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pediatric/login/glow-indigo-2.svg"
          alt=""
          className={cn("size-full max-w-none")}
        />
      </div>
    </>
  );
}
