"use client";

import { useLang } from "@/shared/context/lang-provider";
import { useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { motion, useTransform, useScroll } from "framer-motion";
import { Container, Br } from "@/features/layout";
import Image from "next/image";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function Applications() {
  const { langContent, isEng } = useLang();
  const containerRef = useRef(null);
  const { getValue } = useMediaQuery();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textY = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], ["100%", "0%", "0%", "0%"]);

  const cardYValue = ["40%", "0%", "0%", "0%"];
  const cardY = [
    useTransform(scrollYProgress, [0, 0.2, 0.75, 1], cardYValue),
    useTransform(scrollYProgress, [0.05, 0.25, 0.7, 1], cardYValue),
    useTransform(scrollYProgress, [0.1, 0.3, 0.65, 1], cardYValue),
    useTransform(scrollYProgress, [0.15, 0.35, 0.6, 1], cardYValue),
  ];
  const cardOpacityValue = [0, 1, 1, 1];
  const cardOpacity = [
    useTransform(scrollYProgress, [0, 0.3, 0.5, 1], cardOpacityValue),
    useTransform(scrollYProgress, [0.05, 0.35, 0.55, 1], cardOpacityValue),
    useTransform(scrollYProgress, [0.1, 0.4, 0.6, 1], cardOpacityValue),
    useTransform(scrollYProgress, [0.15, 0.45, 0.65, 1], cardOpacityValue),
  ];
  const cardScaleValue = [0.9, 1, 1, 1];
  const cardScale = [
    useTransform(scrollYProgress, [0, 0.2, 0.75, 1], cardScaleValue),
    useTransform(scrollYProgress, [0.05, 0.25, 0.7, 1], cardScaleValue),
    useTransform(scrollYProgress, [0.1, 0.3, 0.65, 1], cardScaleValue),
    useTransform(scrollYProgress, [0.15, 0.35, 0.6, 1], cardScaleValue),
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[200vh]",
        "tablet-only:portrait:mt-[-30vh] tablet-only:landscape:mt-[-20vh]",
      )}>
      <motion.section
        style={{ y: sectionY }}
        className={cn(
          "sticky top-0 flex min-h-screen flex-col justify-center rounded-t-[50px] pb-[120px] pt-[210px]",
          "tablet:py-[100px]",
          "mobile:py-[80px]",
        )}>
        <Container className={cn("space-y-12", "mobile:space-y-8")} tabletFull>
          <div className={cn("overflow-hidden")}>
            <motion.h2
              style={{ y: textY }}
              className={cn(
                "text-center text-[38px]/[1.3]",
                "tablet:text-3xl/[1.3]",
                "mobile:text-xl/[1.3]",
              )}>
              {langContent({
                ko: (
                  <>
                    엔젤슈트 H10은 일상에서 <Br mobile />
                    마주할 수 있는 <Br pc tablet />
                    <b className={cn("text-dd-mint")}>
                      다양한 환경에서 <Br mobile />
                      사용 가능
                    </b>
                    합니다.
                  </>
                ),
                en: (
                  <>
                    <b className={cn("text-dd-mint")}>
                      Suitable for training in various environment
                    </b>{" "}
                    <Br pc />
                    including indoor and outdoor.
                  </>
                ),
              })}
            </motion.h2>
          </div>
          <ul
            className={cn(
              "mx-auto grid grid-cols-4 gap-[40px]",
              "tablet:gap-3",
              "mobile:max-w-[300px] mobile:grid-cols-2",
            )}>
            {Array.from({ length: 4 }, (_, index) => index + 1).map((num, index) => (
              <LineupCard
                key={num}
                style={getValue({
                  pc: {
                    y: cardY[index],
                    opacity: cardOpacity[index],
                  },
                  mobile: {
                    opacity: cardOpacity[index],
                    scale: cardScale[index],
                  },
                })}
                image={`application-${num}.jpg`}
              />
            ))}
          </ul>
          {!isEng && (
            <div className={cn("overflow-hidden")}>
              <motion.p
                style={{ y: textY }}
                className={cn("text-center text-white/40", "mobile:text-sm")}>
                * 본 제품은 의사, 치료사 등 <Br mobile />
                의료전문가의 지도하에 사용하십시오.
              </motion.p>
            </div>
          )}
        </Container>
      </motion.section>
    </div>
  );
}

function LineupCard({ style, image }) {
  const src = `/images/products/angel-suit/h10/${image}`;

  return (
    <motion.li style={style} className={cn("relative block overflow-hidden rounded-[10px]")}>
      <Image src={src} alt="" width={320} height={431} className={cn("w-full")} />
    </motion.li>
  );
}
