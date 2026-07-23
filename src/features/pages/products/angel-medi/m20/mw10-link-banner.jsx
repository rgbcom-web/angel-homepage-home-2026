"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import Image from "next/image";
import { ArrowButton } from "@/features/global-ui";

export function Mw10LinkBanner() {
  const { langContent } = useLang();

  return (
    <section
      className={cn("bg-[#F5F5F5] py-[60px] text-black", "tablet:py-[30px]", "mobile:py-16")}>
      <Container>
        <div
          className={cn(
            "mx-auto flex max-w-[870px] items-center justify-between gap-4",
            "mobile:flex-col",
          )}>
          <div
            className={cn(
              "space-y-10",
              "mobile:space-y-5",
              "mobile:flex mobile:flex-col mobile:items-center mobile:text-center",
            )}>
            <div className={cn("space-y-3", "mobile:space-y-2")}>
              <span
                className={cn(
                  "block text-[32px]/[1] font-bold text-dd-gray-dark",
                  "tablet:text-3xl",
                  "mobile:text-2xl/[1]",
                )}>
                MW10
              </span>
              <h3
                className={cn("text-[40px]/[1.3] font-bold", "tablet:text-4xl", "mobile:text-2xl")}>
                {langContent({
                  ko: "수동식탈부하보행훈련기",
                  en: "Suspension Walker",
                })}
              </h3>
              <p className={cn("text-lg", "mobile:pt-1 mobile:text-base")}>
                {langContent({
                  ko: (
                    <>
                      착용자와 스트랩을 결합하여 보행 훈련 시 낙상 방지 <Br />
                      (수동식정형용운동장치 / 근육의 재건, 관절 운동의 회복 등에 사용하는 수동식
                      장치)
                    </>
                  ),
                  en: (
                    <>
                      MW10 is a suspension walker that utilizes straps <Br pc />
                      to support both the user and the wearable robot, <Br pc />
                      preventing falls and reducing weight load.
                    </>
                  ),
                })}
              </p>
            </div>
            <ArrowButton size="lg" bgColor="blue" dimmerColor="navy" href="mw10" keepLang={false}>
              {langContent({
                ko: "제품 보러가기",
                en: "For more information",
              })}
            </ArrowButton>
          </div>
          <Image
            src="/images/products/angel-medi/m20/mw10-banner-thumb.png"
            alt=""
            width={270}
            height={450}
            className={cn("mobile:w-[200px]")}
          />
        </div>
      </Container>
    </section>
  );
}
