"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  SpecialIntroHeroWrapper,
  SpecialIntroHeroContent,
  SpecialIntroHeroHeader,
  SpecialIntroHeroTitle,
  SpecialIntroHeroSubtitle,
} from "@/features/pages/products/layouts/special-intro-hero";
import { ArrowButton } from "@/features/global-ui";
import Image from "next/image";
import { WavyText, SlideIn } from "@/shared/motion/components";
import { motion } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { ResponsiveSwitch, useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { Br } from "@/features/layout";

export function IntroHero() {
  const { langContent, isEng } = useLang();
  const { device } = useMediaQuery();

  return (
    <SpecialIntroHeroWrapper>
      <SpecialIntroHeroContent>
        <SpecialIntroHeroHeader>
          <SpecialIntroHeroTitle>
            <WavyText text="MW10" trigger initialDelay={0.2} useInViewOption={false} />
          </SpecialIntroHeroTitle>
          <SpecialIntroHeroSubtitle>
            <WavyText
              text={langContent({
                ko: "수동식탈부하보행훈련기",
                en: "Suspension Walker",
              })}
              trigger
              initialDelay={0.3}
              useInViewOption={false}
              splitParam={isEng ? " " : ""}
            />
            {!isEng && (
              <WavyText
                splitParam=" "
                trigger
                initialDelay={0.3}
                useInViewOption={false}
                className={cn("block text-dd-blue")}>
                근육의 재건, 관절 운동의 회복 등에 <Br mobile /> 사용하는 수동식 장치
              </WavyText>
            )}
          </SpecialIntroHeroSubtitle>
        </SpecialIntroHeroHeader>
        <SlideIn key={device} trigger initialDelay={0.5} distance="120%" useInViewOption={false}>
          <ArrowButton
            href={`/support/contact`}
            size="lg"
            dimmerColor="blue"
            borderColor="transparent"
            bgColor="white"
            hoverTextColor="white"
            className={cn("text-black")}>
            {langContent({
              ko: "제품문의 / 데모신청",
              en: "Product Inquiry",
            })}
          </ArrowButton>
        </SlideIn>
      </SpecialIntroHeroContent>
      <ResponsiveSwitch
        tablet={
          <motion.div
            key={device}
            initial={{ x: "0%", y: "40%", scale: 1.5 }}
            animate={{ x: "0%", y: "0%", scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: easing.pop }}
            className={cn("tablet:w-full tablet-only:portrait:w-[400px]", "mobile:w-[250px]")}>
            <Image
              src="/images/products/angel-medi/mw10/intro-hero-visual.png"
              alt="MW10"
              width={759}
              height={694}
              priority
            />
          </motion.div>
        }
        pc={
          <motion.div
            key={device}
            initial={{ x: "-45%", y: "20%", scale: 1.5 }}
            animate={{ x: "0%", y: "0%", scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: easing.pop }}>
            <Image
              src="/images/products/angel-medi/mw10/intro-hero-visual.png"
              alt="MW10"
              width={759}
              height={694}
              priority
            />
          </motion.div>
        }
      />
    </SpecialIntroHeroWrapper>
  );
}
