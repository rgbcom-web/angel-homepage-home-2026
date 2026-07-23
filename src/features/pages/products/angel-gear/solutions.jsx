"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitle,
  ProductSectionDescription,
} from "../layouts/default-layouts";
import { Br } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import Image from "next/image";

import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

import { GEAR_STORE_LINKS } from "@/app/app-constants";

export function Solutions() {
  const { langContent, isEng } = useLang();

  return (
    <ProductSection containerProps={{ className: cn("px-[100px]", "tablet:px-0") }}>
      <ProductSectionHeader>
        <ProductSectionTitle>
          {langContent({
            ko: (
              <>
                <span className={cn("text-dd-orange")}>산업 안전</span> 웨어러블 솔루션
              </>
            ),
            en: (
              <>
                Wearable Solutions for{" "}
                <span className={cn("text-dd-orange")}>Industrial Safety</span>
              </>
            ),
          })}
        </ProductSectionTitle>
        <ProductSectionDescription>
          {langContent({
            ko: (
              <>
                <p>ANGEL GEAR의 제품군은 현장의 실제 요구를 반영하여 시작된 제품입니다.</p>
                <p>
                  각 작업 환경의 특성을 고려하여 인간중심 기술을 바탕으로 설계되고 있으며, 안전과
                  효율성을 중점으로 <Br pc />
                  가장 적합한 솔루션을 제공하기 위해 끊임없이 노력하고 있습니다.
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  The ANGEL GEAR product line was developed in response to real-world demands in the
                  field.
                </p>
                <p>
                  Designed with a human-centered approach, each solution is tailored to the specific
                  characteristics of various work environments. Angel Robotics continuously strives
                  to provide the most suitable solutions, prioritizing safety and efficiency.
                </p>
              </>
            ),
          })}
        </ProductSectionDescription>
      </ProductSectionHeader>
      <div className={cn("space-y-8", "tablet:space-y-6", "mobile:space-y-4")}>
        <SolutionCard
          label={langContent({
            ko: "허리 보조 웨어러블 슈트",
            en: "Wearable Suit for Back Support",
          })}
          title="ANGEL X"
          link={!isEng && GEAR_STORE_LINKS.angel_x}
          thumbnail="/images/products/angel-gear/solution-thumb-angel-x.png"
        />
        <SolutionCard
          label={langContent({
            ko: "허리 보조 웨어러블 슈트",
            en: "Wearable Suit for Back Support",
          })}
          title="ANGEL GEAR soft B10"
          link={!isEng && GEAR_STORE_LINKS.angel_gear_soft_b10}
          thumbnail="/images/products/angel-gear/solution-thumb-soft-b10.png"
        />
        <SolutionCard
          label={langContent({
            ko: "공기 주입형 손목 보호대",
            en: "Wearable Suit for Wrist Support",
          })}
          title="ANGEL GEAR soft W10"
          link={!isEng && GEAR_STORE_LINKS.angel_gear_soft_w10}
          thumbnail="/images/products/angel-gear/solution-thumb-soft-w10.png"
        />
        <SolutionCard
          label={langContent({
            ko: "공기 주입형 손목 보호대",
            en: "Wearable Suit for Wrist Support",
          })}
          title="ANGEL GEAR soft W11"
          link={!isEng && GEAR_STORE_LINKS.angel_gear_soft_w11}
          thumbnail="/images/products/angel-gear/solution-thumb-soft-w11.png"
        />
      </div>
    </ProductSection>
  );
}

function SolutionCard({ label, title, link = "", thumbnail }) {
  const { isEng } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);
  const transitionClassNames = "transition-[colors_transform_width] duration-300";

  return (
    <div ref={ref}>
      <motion.div
        style={{ opacity, scale }}
        className={cn(
          "group relative px-[83px] py-[43px]",
          "tablet:px-10 tablet:py-10",
          "mobile:px-4 mobile:py-8",
        )}>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 left-1/2 z-0 w-[calc(100%+0px)] -translate-x-1/2 rounded-xl bg-white",
            transitionClassNames,
            "labtop-only:group-hover:w-[calc(100%+60px)] labtop-only:group-hover:bg-dd-orange",
            "tablet:!w-full",
          )}
        />
        <div
          className={cn(
            "relative z-10 flex justify-between gap-4",
            "mobile:flex-col mobile:justify-start mobile:gap-6",
          )}>
          <div
            className={cn(
              "flex flex-col items-start justify-start gap-4 py-[50px]",
              "tablet:py-6",
              "mobile:items-center mobile:py-0 mobile:text-center",
              isEng && "justify-center",
            )}>
            <div>
              <span
                className={cn(
                  "block text-[24px]/[1.3] font-bold text-dd-orange",
                  "tablet:text-lg",
                  "mobile:text-base",
                  transitionClassNames,
                  "labtop-only:group-hover:text-white",
                )}>
                {label}
              </span>
              <h3
                className={cn(
                  "text-[56px]/[1.3] font-bold text-black",
                  "tablet:text-4xl",
                  "mobile:text-3xl",
                  transitionClassNames,
                  "labtop-only:group-hover:text-white",
                )}>
                {title}
              </h3>
            </div>
            {link && (
              <Button
                asChild
                className={cn(
                  "mt-auto !bg-black text-white",
                  transitionClassNames,
                  "labtop-only:group-hover:!bg-white labtop-only:group-hover:text-dd-orange",
                )}
                size="lg">
                <Link href={link} target="_blank" rel="noopener noreferrer">
                  스토어 바로가기
                </Link>
              </Button>
            )}
          </div>
          <div
            className={cn(
              "aspect-square w-[410px] overflow-hidden rounded-full bg-[#F3F3F3]",
              "tablet:w-[240px]",
              "mobile:mx-auto mobile:w-[180px]",
            )}>
            <Image
              src={thumbnail}
              alt={title}
              width={500}
              height={500}
              className={cn("h-full w-full object-cover")}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
