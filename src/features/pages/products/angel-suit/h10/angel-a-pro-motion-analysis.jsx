"use client";

import { useLang } from "@/shared/context/lang-provider";
import { createContext, use, useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { AngelASectionHead, AngelASection } from "./angel-a-pro";

import { motion, useInView } from "framer-motion";

import { useRef } from "react";
import { ResponsiveImage } from "@/shared/components/image";
import { easing } from "@/shared/motion/variables";

export function AngelAProMotionAnalysis() {
  const { langContent } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    fallbackInView: true,
    rootMargin: "0px 0px 0px 0px",
  });

  return (
    <Context.Provider value={{ inView }}>
      <AngelASection
        ref={sectionRef}
        className={cn("bg-[#EDEBEC] tablet:min-h-0", "mobile:block mobile:pb-0")}
        trackClassName={cn("tablet:h-auto")}>
        <Container tabletFull className={cn("relative z-10")}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 40 }}
            transition={{ duration: 1, ease: easing.pop }}
            className={cn("space-y-10", "mobile:space-y-5")}>
            <AngelASectionHead
              tag="ANGEL SUIT H10"
              title={langContent({
                ko: "동작분석",
                en: "Motion Analysis",
              })}
              description={langContent({
                ko: (
                  <>
                  보행 분석 결과를 한눈에 확인할 수 있도록 <Br tablet /><Br mobile /><b>동작분석 결과지</b>를 제공합니다.
                    {/* 보행 평가를 통해{" "}
                    <b>
                      운동학적 지표, 보행 주기, <Br tablet />
                      시공간 지표
                    </b>{" "}
                    등을 상세히 분석하여 <Br pc />
                    개인 맞춤형 피드백과 <Br tablet />
                    목표 설정에 활용할 수 있습니다. <Br pc />
                    또한, 분석 결과를 한눈에 <Br tablet />
                    확인할 수 있도록 <b>동작 분석 결과지</b>를 제공합니다. */}
                  </>
                ),
                en: (
                  <>
                    The comprehensive motion analysis report indicates an <Br pc tablet />
                    analysis of kinematic indicators, gait cycle, <Br pc tablet />
                    and spatiotemporal metrics the objective evaluation of <Br pc tablet />a gait
                    condition and training progress.
                  </>
                ),
              })}
              className={cn("text-left")}
            />
            <ReportBook />
          </motion.div>
        </Container>
        <ResponsiveImage
          src="/images/products/angel-suit/h10/angel-a-motion-analysis-bg.jpg"
          mobileSrc="/images/products/angel-suit/h10/angel-a-motion-analysis-bg-mo.jpg"
          alt=""
          className={cn(
            "absolute inset-0 z-0 h-full w-full object-cover",
            "mobile:static mobile:h-auto",
          )}
        />
      </AngelASection>
    </Context.Provider>
  );
}

const Context = createContext();

const useContext = () => {
  return use(Context);
};

function ReportBook() {
  const { lang } = useLang();
  const imageLength = 8;
  const { inView } = useContext();

  return (
    <div className={cn("relative w-[240px]", "tablet:w-[200px]", "mobile:w-[150px]")}>
      {Array.from({ length: imageLength }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: "200%" }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? "0%" : "200%" }}
          transition={{
            duration: inView ? 1 : 0,
            delay: inView ? index * 0.15 + 0.5 : 0,
            ease: easing.pop,
          }}
          className={cn("absolute inset-0 w-full", index === 0 && "relative")}>
          <ResponsiveImage
            src={
              index === imageLength - 1
                ? `/images/products/angel-suit/h10/angel-a-motion-analysis-report-${imageLength - index}-${lang}.jpg`
                : `/images/products/angel-suit/h10/angel-a-motion-analysis-report-${imageLength - index}.jpg`
            }
            alt=""
            width="618"
            height="888"
            className={cn("w-full")}
          />
        </motion.div>
      ))}
    </div>
  );
}
