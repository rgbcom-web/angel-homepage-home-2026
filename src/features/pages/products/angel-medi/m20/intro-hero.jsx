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
import { Br } from "@/features/layout";
import { WavyText, SlideIn } from "@/shared/motion/components";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import LogoWCP from "@/shared/components/logo-wcp";

export function IntroHero() {
  const { langContent, isEng } = useLang();
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 최상위 레벨에서 Hook 호출
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setInView(value < 1);
  });

  return (
    <div ref={ref} className="-mb-[100vh] h-[200vh]">
      <motion.div
        style={{ y, opacity }}
        className={cn("sticky top-0", "tablet:!translate-y-0 tablet:overflow-hidden")}>
        <SpecialIntroHeroWrapper
          inView={inView}
          scrollIconRevealDelay={1.5}
          video="/images/home/intro-hero-bg-2.mp4?ver=3"
          mobileVideo="/images/home/intro-hero-bg-2-mobile.mp4?ver=3"
          poster="/images/home/intro-hero-bg-2-poster.jpg"
          mobilePoster="/images/home/intro-hero-bg-2-mobile-poster.jpg">
          <SpecialIntroHeroContent>
            <SpecialIntroHeroHeader className="relative">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-0 -translate-y-[110%] tablet:left-1/2 tablet:-translate-x-1/2">
                <LogoWCP />
              </motion.h2>
              <SpecialIntroHeroTitle>
                <WavyText
                  text="ANGEL LEGS M20"
                  trigger={inView}
                  splitParam=" "
                  initialDelay={0.3}
                  useInViewOption={false}
                />
              </SpecialIntroHeroTitle>
              <SpecialIntroHeroSubtitle className={cn("space-y-1.5")}>
                {!isEng && (
                  <>
                    <WavyText
                      text="로봇 보조 정형용 운동장치"
                      trigger={inView}
                      initialDelay={0.4}
                      splitParam=" "
                      useInViewOption={false}
                      className={cn("block")}
                    />
                    <WavyText
                      text="하지 불완전마비 환자를 위한 보행 훈련 로봇"
                      trigger={inView}
                      initialDelay={0.4}
                      splitParam=" "
                      useInViewOption={false}
                      className={cn("block text-dd-blue")}
                    />
                  </>
                )}
                {isEng && (
                  <>
                    <WavyText
                      text="Wearable overground gait training robot"
                      trigger={inView}
                      initialDelay={0.4}
                      splitParam=" "
                      useInViewOption={false}
                      className={cn("block text-dd-blue")}
                    />
                    <WavyText
                      text="for individuals with incomplete lower-limb paralysis"
                      trigger={inView}
                      initialDelay={0.4}
                      splitParam=" "
                      useInViewOption={false}
                      className={cn("block text-dd-blue")}
                    />
                  </>
                )}
              </SpecialIntroHeroSubtitle>
            </SpecialIntroHeroHeader>
            <SlideIn trigger={inView} initialDelay={0.6} distance="120%" useInViewOption={false}>
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
        </SpecialIntroHeroWrapper>
      </motion.div>
    </div>
  );
}
