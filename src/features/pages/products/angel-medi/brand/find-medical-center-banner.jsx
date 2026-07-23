"use client";

import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { BackgroundImage } from "@/shared/components/image";
import { DDLink } from "@/shared/components/link";
import { ArrowRight } from "@/shared/svgs";

export function FindMedicalCenterBanner() {
  return (
    <DDLink
      href="/support/find-medical-center"
      className={cn("relative flex min-h-[237px] items-center overflow-hidden")}>
      <BackgroundImage src="/images/products/angel-medi/brand/find-medical-center-banner.jpg" />
      <Container
        className={cn(
          "relative z-10 flex items-center justify-between text-white",
          "tablet:flex-col tablet:gap-6 tablet:py-14 tablet:text-center",
        )}>
        <span
          className={cn(
            "text-4xl/[1.3] text-white/80",
            "tablet:text-3xl/[1.3]",
            "mobile:text-2xl",
          )}>
          엔젤로보틱스의 웨어러블 로봇을 <Br />
          만나볼 수 있는 <b className={cn("text-white")}>병 의원을 찾아보세요.</b>
        </span>
        <span
          className={cn(
            "flex items-center gap-[1em] px-[1em] text-[28px] font-bold",
            "tablet:rounded-full tablet:bg-white/15 tablet:py-[0.3em] tablet:text-xl",
            "mobile:text-lg",
          )}>
          도입 병원 찾기 <ArrowRight />
        </span>
      </Container>
    </DDLink>
  );
}
