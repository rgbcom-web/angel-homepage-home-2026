"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import {
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitle,
  ProductSectionDescription,
} from "../../layouts/default-layouts";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";
import Image from "next/image";

export function MotionAnalisys() {
  const { langContent } = useLang();

  return (
    <ProductSection
      className={cn("bg-[#F2F2F2] py-[120px] text-black", "tablet:py-20")}
      containerProps={{
        className: cn("w-[1255px]"),
      }}>
      <ProductSectionHeader className={cn("space-y-4 text-center")}>
        <ProductSectionTitle>
          {langContent({
            ko: "동작 분석",
            en: "Motion Analysis",
          })}
        </ProductSectionTitle>
        <ProductSectionDescription className={cn("font-semibold text-black")}>
          {langContent({
            ko: (
              <>
                동작 분석 모드를 통해 상세한 보행 분석 <Br mobile />및 <Br pc tablet />
                훈련 전후 정량적 평가
              </>
            ),
            en: (
              <>
                Comprehensive gait analysis and pre/post-training assessments through motion
                analysis report
              </>
            ),
          })}
          <Br pc tablet />
          <Br pc tablet />
          <span className={cn("font-medium text-dd-gray-dark", "mobile:mt-2 mobile:block")}>
            Gait Phase, Spatial-Temporal index, <Br mobile />
            Joint Kinematic, Gait Index
          </span>
        </ProductSectionDescription>
      </ProductSectionHeader>
      <div className={cn("space-y-[75px]", "tablet:space-y-8")}>
        <BrochurePages />
        <Thumbs />
      </div>
    </ProductSection>
  );
}

function BrochurePages() {
  const { lang } = useLang();

  return (
    <ScrollArea
      orientation="horizontal"
      noShape
      fullWidth
      scrollbarThumbnailClassName="bg-dd-blue/50">
      <div
        className={cn(
          "grid grid-cols-10 justify-between gap-2.5",
          "tablet:grid-cols-5",
          "mobile:min-w-[1400px] mobile:grid-cols-10 mobile:gap-1",
        )}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Image
            key={index}
            src={`/images/products/angel-medi/m20/annalysis-brochure-${index + 1}-${lang}.jpg`}
            alt=""
            width={349}
            height={494}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

function Thumbs() {
  return (
    <div className={cn("")}>
      <div
        className={cn(
          "grid grid-cols-3 justify-between gap-[25px]",
          "tablet:gap-2.5",
          "mobile-sm:grid-cols-1",
        )}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Image
            key={index}
            src={`/images/products/angel-medi/m20/annalysis-thumb-${index + 1}.jpg`}
            alt=""
            width={603}
            height={507}
            className={cn("rounded-2xl", "tablet:rounded-xl")}
          />
        ))}
      </div>
    </div>
  );
}
