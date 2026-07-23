"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { PEDIATRIC_PORTAL_MENU } from "./menu";
import { ANGEL_ROBOTICS_HOMEPAGE_LABEL } from "./site";

const ICONS = {
  home: "/images/pediatric/nav/icon-home.svg",
  resources: "/images/pediatric/nav/icon-resources.svg",
  events: "/images/pediatric/nav/icon-events.svg",
  surveys: "/images/pediatric/nav/icon-surveys.svg",
  profile: "/images/pediatric/nav/icon-profile.svg",
};

function NavIcon({ src, active }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={24}
      height={24}
      aria-hidden
      className={cn("h-6 w-6 shrink-0", active && "brightness-0 invert")}
    />
  );
}

export function PediatricSidebar({ onNavigate }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[340px] shrink-0 flex-col border-r border-[#E2E8F0] bg-white",
        "tablet:w-full",
      )}>
      <nav className={cn("flex-1 space-y-1.5 overflow-y-auto px-4 py-10", "mobile:px-3 mobile:py-6")}>
        {PEDIATRIC_PORTAL_MENU.map((item) => {
          const iconSrc = ICONS[item.icon];
          const isActive =
            item.href === "/pediatric"
              ? pathname === "/pediatric"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3.5 rounded-lg px-6 py-[15px] text-[18px] transition-colors",
                "mobile:gap-3 mobile:px-4 mobile:py-3 mobile:text-base",
                isActive
                  ? "bg-[#427DFF] font-bold text-white"
                  : "font-medium text-[#80858F] hover:bg-[#F8FAFC] hover:text-[#0F172A]",
              )}>
              {iconSrc && <NavIcon src={iconSrc} active={isActive} />}
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className={cn("border-t border-[#E2E8F0] px-6 py-4")}>
        <Link
          href="/ko"
          className={cn(
            "inline-flex items-center text-[13px] font-medium text-[#475569] transition-colors hover:text-[#427DFF]",
          )}>
          {ANGEL_ROBOTICS_HOMEPAGE_LABEL} ↗
        </Link>
      </div>
    </aside>
  );
}
