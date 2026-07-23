"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Breadcrumb, Br } from "@/features/layout";
import Image from "next/image";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function IntroHero() {
  const { langContent } = useLang();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className={cn("mb-[0vh] h-auto")}>
      <div className={cn("sticky top-0 overflow-hidden")}>
        <div
          className={cn(
            "absolute left-1/2 top-0 -translate-x-1/2",
            "w-[948px]",
            "tablet:w-[600px]",
            "mobile:w-[500px]",
          )}>
          <motion.div
            style={{ x: visualY, scale: visualScale, opacity: visualOpacity }}
            className={cn("relative w-full")}>
            <Image
              src="/images/company/overview/intro-hero.png?ver=2"
              alt=""
              width={948}
              height={1198}
              priority
              className={cn("w-full")}
            />
          </motion.div>
        </div>
        <div
          className={cn(
            "absolute bottom-0 left-0 z-10 h-full w-full bg-[linear-gradient(to_top,#171717,rgb(0,0,0,0)_50%)]",
          )}
        />
        <Container
          className={cn("relative z-10 pt-[61vh]", "tablet:pt-[400px]", "mobile:pt-[330px]")}>
          <div
            className={cn(
              "space-y-4 pb-[100px]",
              "tablet:pb-[60px]",
              "mobile:space-y-3 mobile:pb-[50px]",
            )}>
            <div className={cn("space-y-20 mobile:space-y-10")}>
              <Breadcrumb
                breadcrumb={langContent({
                  ko: ["회사소개", "개요"],
                  en: ["About Us", "Company Overview"],
                })}
                className={cn("text-xl")}
              />
              <div className={cn("space-y-10 text-center", "tablet:space-y-5", "mobile:space-y-4")}>
                <div className={cn("space-y-4")}>
                  <span
                    className={cn(
                      "block text-[30px]/[1.3] font-bold opacity-50",
                      "tablet:text-2xl",
                      "mobile:text-xl",
                    )}>
                    MISSION
                  </span>
                  <h1
                    className={cn(
                      "text-[64px]/[1.3] font-bold",
                      "tablet:text-5xl/[1.3]",
                      "mobile:text-3xl/[1.3]",
                    )}>
                    Recreating Human Ability <Br pc tablet />
                    with Technology
                  </h1>
                </div>
                <div
                  className={cn(
                    "space-y-5 text-2xl text-[#9C9C9C]",
                    "tablet:text-lg",
                    "mobile:text-base",
                  )}>
                  {langContent({
                    ko: (
                      <>
                        <p>
                          막연한 가능성이 기술을 통해 <Br mobile />
                          실제의 능력이 될 수 있도록 <Br />
                          의지와 바람이 만나 한계를 넘을 수 있도록
                        </p>
                        <p>
                          로봇이 아닌, 인간의 Ability를 연구합니다. <Br />
                          <b className={cn("text-white")}>
                            우리는 기술로 사람의 능력을 재창조합니다.
                          </b>
                        </p>
                      </>
                    ),
                    en: (
                      <>
                        <p>
                          Turning vague possibilities into <Br mobile />
                          tangible abilities through technology, <Br />
                          where will power and determination transcend limitations
                        </p>
                        <p>
                          We focus not on robots, but on human abilities. <Br />
                          <b className={cn("text-white")}>
                            Our mission is to Recreate Human Abilities through Technology.
                          </b>
                        </p>
                      </>
                    ),
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
