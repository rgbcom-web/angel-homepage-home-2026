"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { SVG_Logo } from "@/shared/svgs";
import { NotificationBell } from "./notification-bell";
import { ProfileMenu } from "./profile-menu";
import { PEDIATRIC_SITE_NAME } from "./site";

export function PediatricTopBar({ onOpenSidebar, sidebarOpen }) {
  return (
    <header
      className={cn(
        "relative z-50 flex h-[114px] shrink-0 items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-10",
        "tablet:h-[88px] tablet:px-6",
        "mobile:h-16 mobile:px-4",
      )}>
      <div className={cn("flex min-w-0 items-center gap-3")}>
        <button
          type="button"
          aria-label={sidebarOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={onOpenSidebar}
          className={cn(
            "hidden size-10 shrink-0 items-center justify-center rounded-lg text-[#64748B] hover:bg-[#F1F5F9]",
            "tablet:flex",
          )}>
          {sidebarOpen ? <X className={cn("h-5 w-5")} /> : <Menu className={cn("h-5 w-5")} />}
        </button>

        <Link
          href="/pediatric"
          className={cn("flex min-w-0 items-center gap-6", "tablet:gap-4", "mobile:gap-3")}>
          <SVG_Logo
            theme="color"
            className={{
              svg: cn("h-auto w-[148px] shrink-0", "tablet:w-[130px]", "mobile:w-[112px]"),
            }}
          />
          <span
            className={cn("h-4 w-px shrink-0 bg-[#E2E8F0]", "tablet:hidden")}
            aria-hidden
          />
          <span
            className={cn(
              "truncate text-base font-semibold text-[#475569]",
              "tablet:hidden",
            )}>
            {PEDIATRIC_SITE_NAME}
          </span>
        </Link>
      </div>

      <div
        className={cn(
          "ml-auto flex h-12 shrink-0 items-center gap-6",
          "tablet:gap-3",
          "mobile:h-10 mobile:gap-2",
        )}>
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  );
}
