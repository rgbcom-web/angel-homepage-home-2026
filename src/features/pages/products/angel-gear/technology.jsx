"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { ProductSection, ProductSectionTitle } from "../layouts/default-layouts";
import { Br } from "@/features/layout";
import Image from "next/image";

export function Technology() {
  const { langContent, isEng } = useLang();

  return (
    <ProductSection containerProps={{ className: cn("px-[100px]", "tablet:px-0") }}>
      <ProductSectionTitle className={cn("mobile:mb-6 mobile:text-center")}>
        {langContent({
          ko: "기술 및 혁신",
          en: "Technology & Innovation",
        })}
      </ProductSectionTitle>

      <div className={cn("grid grid-cols-5 gap-2", "tablet:grid-cols-3", "mobile:grid-cols-1")}>
        <TechCard
          num="01"
          title={langContent({
            ko: "보조력 구현",
            en: "Assistive Force Technology",
          })}
          description={langContent({
            ko: (
              <>
                신체 부위에 맞는 최적의 <Br pc />
                보조원과 가장 효율적인 <Br pc />
                보조 강도를 설정하여 작업자를 <Br pc />
                보다 편리하고 안전하게 합니다.
              </>
            ),
            en: (
              <>
                Optimized assistive elements and the most efficient support intensity are tailored
                to specific body parts, ensuring enhanced convenience and safety for workers.
              </>
            ),
          })}
          icon="/images/products/angel-gear/tech-card-icon-1.svg"
          className={isEng && { root: cn("tablet:col-span-2", "mobile:col-span-1") }}
        />
        <TechCard
          num="02"
          title={langContent({
            ko: "효율성 향상",
            en: "Enhanced Efficiency",
          })}
          description={langContent({
            ko: (
              <>
                작업 피로도가 높은 신체의 보조를 통해 작업 부담을 줄여주어 정확도와 생산성이
                향상됩니다.
              </>
            ),
            en: (
              <>
                By reducing the strain on high-fatigue body areas, the device alleviates workload,
                improving accuracy and productivity.
              </>
            ),
          })}
          icon="/images/products/angel-gear/tech-card-icon-2.svg"
        />
        <TechCard
          num="03"
          title={langContent({
            ko: "안전 개선",
            en: (
              <>
                Improved <Br pc tablet />
                Safety
              </>
            ),
          })}
          description={langContent({
            ko: (
              <>
                무게, 불안정한 자세, 급격한 움직임이나 충격으로부터 흔히 발생할 수 있는 통증과 만성
                질환의 위험을 감소시킵니다.
              </>
            ),
            en: (
              <>
                Minimizes the risk of pain and chronic conditions caused by weight, unstable
                postures, sudden movements, or impact.
              </>
            ),
          })}
          icon="/images/products/angel-gear/tech-card-icon-3.svg"
        />
        <TechCard
          num="04"
          title={langContent({
            ko: "신체 적합성",
            en: "Ergonomic Adaptability",
          })}
          description={langContent({
            ko: (
              <>
                신체의 구조적 특징을 이해하고 다양한 <Br tablet />
                체형에 맞는 부품과 소재를 사용하여 <Br tablet />
                편안함을 최대화합니다.
              </>
            ),
            en: (
              <>
                Designed with an in-depth understanding of body structure, utilizing adaptable
                components and materials to maximize comfort across various body types.
              </>
            ),
          })}
          icon="/images/products/angel-gear/tech-card-icon-4.svg"
          className={!isEng && { root: cn("tablet:col-span-2", "mobile:col-span-1") }}
        />
        <TechCard
          num="05"
          title={langContent({
            ko: "자유로운 움직임",
            en: "Unrestricted Mobility",
          })}
          description={langContent({
            ko: (
              <>
                사용자의 자연스러운 <Br pc />
                신체 움직임을 방해하지 않고 움직임을 보조하는 <Br pc />
                메커니즘을 포함합니다.
              </>
            ),
            en: (
              <>
                Incorporates a mechanism that enhances movement without restricting the user’s
                natural range of motion.
              </>
            ),
          })}
          icon="/images/products/angel-gear/tech-card-icon-5.svg"
        />
      </div>
      <div className={cn("grid grid-cols-3 gap-5", "tablet:gap-2", "mobile:grid-cols-1")}>
        <Image
          src="/images/products/angel-gear/tech-thumb-1.png"
          width={387}
          height={0}
          alt=""
          className={cn("rounded-2xl", "tablet:rounded-xl", "mobile:rounded-lg")}
        />
        <Image
          src="/images/products/angel-gear/tech-thumb-2.png"
          width={387}
          height={0}
          alt=""
          className={cn("rounded-2xl", "tablet:rounded-xl", "mobile:rounded-lg")}
        />
        <Image
          src="/images/products/angel-gear/tech-thumb-3.png"
          width={387}
          height={0}
          alt=""
          className={cn("rounded-2xl", "tablet:rounded-xl", "mobile:rounded-lg")}
        />
      </div>
    </ProductSection>
  );
}

function TechCard({ num, title, description, icon, className }) {
  const { isEng } = useLang();

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-[#2D2D2D] bg-black px-2",
        className?.root,
      )}>
      <div
        className={cn("flex flex-col border-b border-[#4B4B4B] px-2.5 pb-2.5 pt-5", "tablet:pt-4")}>
        <span
          className={cn(
            "ml-auto mr-2 text-xl font-bold leading-[1] text-[#707070]",
            "tablet:text-base",
          )}>
          {num}
        </span>
        <span
          className={cn(
            "text-[26px]/[1.3] font-bold tracking-[-0.04em] text-dd-orange",
            "tablet:text-2xl",
            "mobile:text-xl",
            isEng && "text-2xl/[1.3]",
          )}>
          {title}
        </span>
      </div>
      <div
        className={cn(
          "flex h-full flex-col px-2.5 py-6",
          "tablet:gap-2 tablet:py-4",
          "mobile:py-3",
          isEng && "text-base/[1.5]",
        )}>
        <p className={cn("text-[#C1C1C1]")}>{description}</p>
        <Image
          src={icon}
          alt=""
          width={110}
          height={0}
          className={cn("ml-auto mt-auto h-auto w-[110px]", "tablet:w-20")}
        />
      </div>
    </div>
  );
}
