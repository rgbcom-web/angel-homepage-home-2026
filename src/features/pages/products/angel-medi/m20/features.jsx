"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { FeaturesSceneTech } from "./features-scene-tech";
import { FeaturesSceneResizable } from "./features-scene-resizable";
import { FeaturesSceneUtils } from "./features-scene-utils";

export function Features() {
  const { langContent } = useLang();

  return (
    <section
      className={cn("tablet:portrait:mt-[-25vh] tablet:landscape:mt-[-10vh]", "mobile:!mt-0")}>
      <Container className={cn("py-20 text-center", "mobile:py-10")}>
        <h2
          className={cn(
            "mb-[0.5em] text-[48px]/[1.3] font-bold",
            "tablet:text-5xl",
            "mobile:mb-4 mobile:text-xl mobile:text-white/50",
          )}>
          {langContent({
            ko: "제품 특징",
            en: "Product Features",
          })}
        </h2>
        <p
          className={cn(
            "text-2xl/[1.5]",
            "tablet:text-2xl/[1.5]",
            "mobile:text-2xl mobile:font-semibold",
          )}>
          {langContent({
            ko: (
              <>
                하지 전체를 보조하여 <Br mobile />
                보행 재활을 통한 <Br pc tablet />
                하지 근육의 재건, <Br mobile />
                관절 운동의 회복을 돕는 로봇
              </>
            ),
            en: (
              <>
                A gait rehabilitation robot that supports the entire lower limb, <Br pc tablet />
                promoting muscle recovery and joint mobility through gait training.
              </>
            ),
          })}
        </p>
      </Container>
      <FeaturesSceneTech />
      <FeaturesSceneResizable />
      <FeaturesSceneUtils />
    </section>
  );
}
