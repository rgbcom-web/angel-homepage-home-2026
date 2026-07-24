import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { SVG_Logo } from "@/shared/svgs";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

export default function AuthLayout({ children }) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-[#F4F7FC] font-primary")}>
      <header
        className={cn(
          "relative z-10 flex h-[114px] items-center border-b border-[#E2E8F0] bg-white px-10",
          "tablet:h-[88px] tablet:px-6",
          "mobile:h-[72px] mobile:px-4",
        )}>
        <Link href="/ko" className={cn("flex min-w-0 items-center gap-6", "tablet:gap-4")}>
          <SVG_Logo
            theme="color"
            className={{
              svg: cn("h-auto w-[148px] shrink-0", "tablet:w-[130px]", "mobile:w-[120px]"),
            }}
          />
          <span className={cn("h-4 w-px shrink-0 bg-[#E2E8F0]", "tablet:hidden")} aria-hidden />
          <span
            className={cn(
              "truncate text-base font-semibold leading-[1.2] text-[#475569]",
              "tablet:hidden",
            )}>
            {PEDIATRIC_SITE_NAME}
          </span>
        </Link>
      </header>

      <main
        className={cn(
          "relative z-10 mx-auto flex justify-center px-4 pb-12 pt-[66px]",
          "mobile:pt-8",
        )}>
        {children}
      </main>
    </div>
  );
}
