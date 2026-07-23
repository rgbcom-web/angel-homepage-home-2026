"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent, useInView } from "framer-motion";
import { useMediaQueryValue } from "@/shared/hooks/useMediaQuery";
import { WavyText, SlideIn } from "@/shared/motion/components";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function FeaturesSceneTech() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const inView = useInView(trackRef, {
    once: false,
    fallbackInView: true,
    rootMargin: "0px 0px 0px 0px",
  });

  return (
    <div ref={trackRef} className={cn("h-[400vh]")}>
      <FloatingVisual scrollYProgress={scrollYProgress} inView={inView} />
    </div>
  );
}

const scenes = [0, 0.2, 0.5, 0.7, 1];

function FloatingVisual({ scrollYProgress, inView }) {
  const { langContent, isEng } = useLang();
  const { getValue } = useMediaQuery();
  const [sceneNumber, setSceneNumber] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= scenes[0] && latest < scenes[1] - 0.1) {
      setSceneNumber(0);
    } else if (latest >= scenes[1] - 0.1 && latest < scenes[2]) {
      setSceneNumber(1);
    } else if (latest >= scenes[2] && latest < scenes[3] - 0.1) {
      setSceneNumber(2);
    } else if (latest >= scenes[3] - 0.1 && latest < scenes[4]) {
      setSceneNumber(3);
    }
  });

  const rootScale = useTransform(
    scrollYProgress,
    scenes,
    getValue({ mobile: [1, 1.7, 1.7, 1.6, 1.6], pc: [1, 1.3, 1.3, 1.5, 1.5] }),
  );
  const rootX = useTransform(
    scrollYProgress,
    scenes,
    getValue({ mobile: ["0%", "-10%", "-10%", "15%", "15%"], pc: [0, -300, -300, 200, 200] }),
  );
  const rootY = useTransform(
    scrollYProgress,
    scenes,
    getValue({
      mobile: ["0%", "30%", "25%", "5%", "0%"],
      tablet: [0, -150, -250, -350, -400],
      pc: [0, -250, -350, -450, -500],
    }),
  );
  const scene1VisualOpacity = useTransform(scrollYProgress, scenes, [1, 1, 1, 1, 1]);
  const scene2VisualOpacity = useTransform(scrollYProgress, scenes, [0, 1, 1, 1, 1]);
  const scene3VisualOpacity = useTransform(scrollYProgress, scenes, [0, 0, 0, 1, 1]);
  const radial1Opacity = useTransform(scrollYProgress, scenes, [0, 1, 1, 0, 0]);
  const radial2Opacity = useTransform(scrollYProgress, scenes, [0, 0, 0, 1, 1]);

  return (
    <div
      className={cn(
        "sticky top-0 h-screen overflow-hidden",
        "tablet:portrait:mt-[-19vh] tablet:landscape:mt-[-10vh]",
        "mobile:top-[15vh] mobile:mt-0 mobile:h-[70vh] mobile:overflow-visible",
      )}>
      <div
        className={cn(
          "absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center",
          "mobile:left-1/2 mobile:top-1/2 mobile:h-screen mobile:w-screen mobile:-translate-x-1/2 mobile:-translate-y-1/2 mobile:overflow-hidden",
        )}>
        <motion.div
          className={cn("relative origin-top", "mobile:order-2 mobile:origin-bottom")}
          style={{ scale: rootScale, x: rootX, y: rootY }}>
          <motion.img
            src="/images/products/angel-medi/m20/feature-visual-1.png"
            alt=""
            className={cn(
              "w-[883px] object-contain",
              "tablet:landscape:w-[clamp(600px,65vw,900px)]",
              "tablet:portrait:w-[clamp(700px,80vw,900px)]",
            )}
            style={{ opacity: scene1VisualOpacity }}
          />
          <motion.img
            src="/images/products/angel-medi/m20/feature-visual-2.png"
            alt=""
            className={cn("absolute inset-0 z-10 object-contain")}
            style={{ opacity: scene2VisualOpacity }}
          />
          <motion.img
            src="/images/products/angel-medi/m20/feature-visual-3.png"
            alt=""
            className={cn("absolute inset-0 z-20 object-contain")}
            style={{ opacity: scene3VisualOpacity }}
          />
          {inView && (
            <>
              <motion.div
                style={{ opacity: radial1Opacity }}
                className={cn("absolute inset-0 z-30")}>
                <Radial className={cn("bottom-[50%] left-[51.5%]")} />
                <Radial className={cn("bottom-[31.5%] left-[64.5%]")} />
              </motion.div>
              <motion.div
                style={{ opacity: radial2Opacity }}
                className={cn("absolute inset-0 z-30")}>
                <Radial className={cn("bottom-[18%] left-[26%] scale-[1.2]")} />
                <Radial className={cn("bottom-[12%] left-[63.5%] scale-[1.5]")} />
              </motion.div>
            </>
          )}
        </motion.div>
        <div
          className={cn("absolute inset-0 z-40", "mobile:relative mobile:order-1 mobile:w-full")}>
          <motion.article
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center",
              "mobile:relative mobile:block mobile:w-full",
            )}>
            <Container
              fixed={false}
              className={cn("tablet:w-[900px] tablet-only:portrait:w-[700px]", "mobile:w-full")}>
              <div
                className={cn(
                  "ml-auto w-1/3",
                  "tablet:w-[45%] tablet:translate-y-[-20%]",
                  "mobile:w-full mobile:translate-y-0",
                  isEng && "w-[40%] translate-y-[-20%] tablet:w-[390px]",
                )}>
                {langContent({
                  ko: (
                    <h3
                      className={cn(
                        "mb-[0.3em] text-[48px]/[1.3] font-bold",
                        "tablet:text-[clamp(32px,3.5vw,48px)]/[1.3]",
                        "tablet-only:portrait:text-[clamp(38px,5vw,46px)]/[1.3]",
                        "mobile:text-3xl/[1.3]",
                      )}>
                      <WavyText
                        trigger={sceneNumber === 1}
                        splitParam=" "
                        useInViewOption={false}
                        resetDuration>
                        <b className={cn("text-dd-blue")}>힘 제어</b> 방식의 <Br />
                        구동기 제어 기술
                      </WavyText>
                    </h3>
                  ),
                  en: (
                    <h3
                      className={cn(
                        "mb-[0.3em] text-[38px]/[1.3] font-bold",
                        "tablet:text-[28px]/[1.3]",
                        "mobile:text-xl/[1.3]",
                      )}>
                      <SlideIn
                        trigger={sceneNumber === 1}
                        useInViewOption={false}
                        className={cn("block")}
                        resetDuration={0.3}>
                        Precision Actuator Control <Br />
                        Technology based on <Br />
                        <b className={cn("text-dd-blue")}>Force-Controlled</b> Mechanism
                      </SlideIn>
                    </h3>
                  ),
                })}

                {langContent({
                  ko: (
                    <div
                      className={cn(
                        "text-2xl/[1.6]",
                        "tablet:text-[clamp(20px,1.9vw,24px)]/[1.6]",
                        "tablet-only:portrait:text-[clamp(20px,2.5vw,24px)]/[1.6]",
                        "mobile:text-xl/[1.3]",
                      )}>
                      <WavyText
                        trigger={sceneNumber === 1}
                        useInViewOption={false}
                        resetDuration
                        splitParam=" ">
                        부족한 힘을 보조하는 <Br pc tablet mobile />힘 제어 방식의{" "}
                        <Br tablet mobile />
                        정밀한 구동기 제어 기술
                      </WavyText>
                    </div>
                  ),
                  en: (
                    <div
                      className={cn(
                        "text-xl/[1.6]",
                        "tablet:text-lg/[1.6]",
                        "mobile:text-base/[1.3]",
                      )}>
                      <SlideIn
                        trigger={sceneNumber === 1}
                        useInViewOption={false}
                        initialDelay={0.2}
                        resetDuration={0.3}>
                        Delivering precise actuator control that <Br mobile />
                        compensates for <Br pc />
                        insufficient muscle <Br mobile />
                        strength, providing force assistance only <Br pc mobile />
                        when needed (Assist as Needed-AAN)
                      </SlideIn>
                    </div>
                  ),
                })}
              </div>
            </Container>
          </motion.article>
          <motion.article
            className={cn(
              "absolute inset-0 flex items-center",
              "mobile:bottom-auto mobile:left-0 mobile:top-0",
            )}>
            <Container
              fixed={false}
              className={cn(
                "tablet-only:!portrait:w-[700px] tablet:w-[900px] tablet-only:portrait:max-w-[calc(100%-150px)] tablet-only:landscape:max-w-[calc(100%-200px)]",
                "mobile:!w-full",
              )}>
              <div
                className={cn(
                  "w-1/3 translate-y-[-60%]",
                  "tablet:w-2/5",
                  "mobile:w-full mobile:translate-y-0",
                  isEng && "w-1/2 translate-y-[-20%] tablet:w-[390px]",
                )}>
                <h3
                  className={cn(
                    "mb-[0.3em] text-[48px]/[1.3] font-bold",
                    "tablet:text-[clamp(32px,3.5vw,48px)]/[1.3]",
                    "tablet-only:portrait:text-[clamp(38px,5vw,48px)]/[1.3]",
                    "mobile:text-3xl/[1.3]",
                    isEng && "tablet:!text-[36px]/[1.3] mobile:!text-3xl/[1.3]",
                  )}>
                  {langContent({
                    ko: (
                      <WavyText trigger={sceneNumber === 3} useInViewOption={false} resetDuration>
                        <b className={cn("text-dd-blue")}>보행 의도</b> 파악
                      </WavyText>
                    ),
                    en: (
                      <SlideIn
                        trigger={sceneNumber === 3}
                        useInViewOption={false}
                        resetDuration={0.3}>
                        <b className={cn("text-dd-blue")}>Motion Intent </b> <Br />
                        Recognition
                      </SlideIn>
                    ),
                  })}
                </h3>
                <div
                  className={cn(
                    "text-2xl/[1.6]",
                    "tablet:text-[clamp(20px,1.9vw,24px)]/[1.6]",
                    "tablet-only:portrait:text-[clamp(20px,2.4vw,24px)]/[1.6]",
                    "mobile:text-xl/[1.3]",
                  )}>
                  {langContent({
                    ko: (
                      <WavyText
                        trigger={sceneNumber === 3}
                        useInViewOption={false}
                        resetDuration
                        splitParam=" ">
                        각 관절에 장착된 센서를 통해 <Br />
                        착용자의 보행의도를 <Br tablet />
                        감지하는 <Br mobile />
                        의도파악 기술
                      </WavyText>
                    ),
                    en: (
                      <SlideIn
                        trigger={sceneNumber === 3}
                        useInViewOption={false}
                        initialDelay={0.2}
                        resetDuration={0.3}>
                        Detecting the patient’s motion <Br mobile />
                        intent <Br pc />
                        through ground contact <Br mobile />
                        and sensors in the robot
                      </SlideIn>
                    ),
                  })}
                </div>
              </div>
            </Container>
          </motion.article>
        </div>
      </div>
    </div>
  );
}

function Radial({ className, length = 4 }) {
  const radialScale = useMediaQueryValue({ mobile: 6, tablet: 10, pc: 10 });
  return (
    <div className={cn("absolute h-0 w-0", className)}>
      <svg
        viewBox="-10 -10 20 20"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        {/* 퍼지는 원형 애니메이션 */}
        {Array.from({ length }).map((_, i) => (
          <motion.circle
            key={i}
            cx="0"
            cy="0"
            r={1}
            fill="hsl(var(--blue))"
            initial={{
              scale: 1,
              opacity: 1,
            }}
            animate={{
              scale: [1, radialScale],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              times: [0, 1],
              ease: "linear",
            }}
          />
        ))}

        {/* 중앙 점 */}
        <circle cx="0" cy="0" r={0.8} fill="white" style={{ zIndex: 1 }} />
      </svg>
    </div>
  );
}
