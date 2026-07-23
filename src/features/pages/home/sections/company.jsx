"use client";

import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { Container, Br } from "@/features/layout/";
import Image from "next/image";
import { SlideIn } from "@/shared/motion/components";
import { ArrowButton } from "@/features/global-ui";
import { useLang } from "@/shared/context/lang-provider";

export function Company() {
  const { langContent } = useLang();
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.3, fallbackInView: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <motion.section
      ref={containerRef}
      className={cn("relative h-[200vh]", "tablet:mb-0 tablet:h-auto")}>
      <motion.div
        ref={sectionRef}
        style={{ y: sectionY }}
        className={cn(
          "sticky top-0 flex h-screen w-full items-center overflow-hidden pt-10",
          "tablet:relative tablet:h-auto tablet:!translate-y-0 tablet:items-start tablet:py-32",
          "mobile:py-20",
        )}>
        <Container
          className={cn(
            "flex items-center justify-between",
            "tablet:flex-col tablet:items-center tablet:text-center",
            "mobile:gap-6",
          )}>
          <div className={cn("relative z-10 flex flex-col items-start", "tablet:items-center")}>
            <h2
              className={cn(
                "mb-[50px] text-[30px]/[1.3] font-semibold text-dd-blue",
                "labtop:text-2xl",
                "tablet:mb-[20px] tablet:text-xl",
                "mobile:mb-[10px] mobile:text-base",
              )}>
              <SlideIn trigger={inView}>
                Recreating Human Ability <br />
                with Technology
              </SlideIn>
            </h2>
            <div
              className={cn(
                "mb-[90px] text-[34px]/[1.3] text-[#BFBFBF]",
                "labtop:text-3xl/[1.3]",
                "tablet:mb-[40px] tablet:text-xl/[1.5]",
                "mobile:mb-0 mobile:text-sm/[1.8]",
              )}>
              <SlideIn trigger={inView}>
                {langContent({
                  ko: (
                    <>
                      막연한 가능성이 기술을 통해 <Br mobile />
                      실제의 능력이 될 수 있도록, <Br />
                      의지와 바람이 기술을 만나 한계를 넘을 수 있도록, <Br />
                      <span className={cn("mobile:mt-2 mobile:block mobile:text-[1.2em]/[1.3]")}>
                        로봇이 아닌 인간의 능력을 연구합니다.
                      </span>{" "}
                      <Br pc tablet />
                      <b className={cn("text-white", "tablet:text-[1.2em]")}>
                        우리는 기술로 사람의 능력을 재창조합니다.
                      </b>
                    </>
                  ),
                  en: (
                    <>
                      Turning vague possibilities into tangible <Br />
                      abilities through technology, where willpower <Br />
                      and determination, enhanced by technology, <Br />
                      transcend limitations.
                      <Br pc tablet mobile />
                      <b className={cn("text-white", "tablet:text-[1.2em]")}>
                        Our mission is to Recreate Human Abilities <Br pc tablet />
                        through Technology.
                      </b>
                    </>
                  ),
                })}
              </SlideIn>
            </div>
            <SlideIn trigger={inView}>
              <ArrowButton
                href="/company/overview"
                bgColor="white"
                hoverTextColor="white"
                dimmerColor="blue"
                size="lg"
                className={cn("text-black", "mobile:hidden")}>
                {langContent({
                  ko: "회사소개 바로가기",
                  en: "About us",
                })}
              </ArrowButton>
            </SlideIn>
          </div>
          <Visual inView={inView} />
          <SlideIn trigger={inView}>
            <ArrowButton
              href="/company/overview"
              bgColor="white"
              hoverTextColor="white"
              dimmerColor="blue"
              size="lg"
              className={cn("hidden text-black", "mobile:flex")}>
              {langContent({
                ko: "회사소개 바로가기",
                en: "About us",
              })}
            </ArrowButton>
          </SlideIn>
        </Container>
      </motion.div>
    </motion.section>
  );
}

function Visual({ inView }) {
  const width = 402;
  const height = 603;

  const transition = { duration: 0.5, ease: easing.pop, delay: inView ? 0.5 : 0 };

  return (
    <div className={cn("relative pt-10", "tablet:pt-20", "mobile:pt-0")}>
      <div
        className={cn(
          "relative -translate-x-1/3",
          "tablet:h-[450px] tablet:translate-x-0",
          "mobile:h-[300px]",
        )}>
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: inView ? "-40%" : "0%" }}
          transition={transition}
          className={cn("tablet:h-full")}>
          <Image
            src="/images/home/company-visual-bg.png"
            alt=""
            width={width}
            height={height}
            className={cn("tablet:h-full tablet:w-auto")}
          />
        </motion.div>
        <motion.div
          initial={{ x: "0%", opacity: 0 }}
          animate={{ x: inView ? "40%" : "0%", opacity: inView ? 1 : 0 }}
          transition={transition}
          className={cn("absolute inset-0")}>
          <Image src="/images/home/company-visual-body.png" alt="" width={width} height={height} />
          <div className={cn("absolute inset-0")}>
            <Image
              src="/images/home/company-visual-graphic.png"
              alt=""
              width={width}
              height={height}
              className={cn("w-full")}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
