"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { useRef, useState, createContext, useContext } from "react";
import { useScroll, motion, useInView, useMotionValueEvent, useTransform } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import Image from "next/image";

import { useMediaQueryValue } from "@/shared/hooks/useMediaQuery";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function FeaturesSceneUtils() {
  const { getValue } = useMediaQuery();
  const containerRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress: outtroProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const outtroOpacity = useTransform(outtroProgress, [0, 1], [1, 0]);
  const outtroY = useTransform(outtroProgress, [0, 1], ["0%", "50%"]);
  const outtroScale = useTransform(
    outtroProgress,
    [0, 1],
    getValue({ mobile: [1, 1], pc: [1, 0.5] }),
  );

  return (
    <SceneProvider value={{ containerRef, sectionRef }}>
      <div
        ref={containerRef}
        className={cn("h-[300vh] pt-[120px]", "tablet:pt-0", "mobile:h-[200vh]")}>
        <article ref={sectionRef} className={cn("sticky top-0 h-screen overflow-hidden")}>
          <motion.div
            style={{
              opacity: outtroOpacity,
              y: outtroY,
              scale: outtroScale,
            }}
            className={cn("h-full w-full")}>
            <Container
              fixed={false}
              className={cn(
                "flex h-full items-center",
                "tablet-only:portrait:relative tablet-only:portrait:flex-col tablet-only:portrait:justify-start tablet-only:portrait:pt-32",
                "mobile:flex-col mobile:items-start mobile:pt-24",
              )}>
              <Content />
              <div
                className={cn(
                  "relative h-full w-1/2",
                  "tablet:portrait:absolute tablet:portrait:bottom-0 tablet:portrait:right-0 tablet:portrait:w-full",
                  "mobile:absolute mobile:bottom-0 mobile:right-0 mobile:w-full",
                )}>
                <Visual />
              </div>
            </Container>
          </motion.div>
        </article>
      </div>
    </SceneProvider>
  );
}

const SceneContext = createContext();

function SceneProvider({ children, value }) {
  const { containerRef, sectionRef } = value;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sectionInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
    fallbackInView: true,
    rootMargin: "0px 0px 0px 0px",
  });

  const [sceneNum, setSceneNum] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setSceneNum(() => {
      if (latest <= 0) {
        return 0;
      } else if (latest < 0.5) {
        return 1;
      } else {
        return 2;
      }
    });
  });

  return (
    <SceneContext.Provider value={{ ...value, scrollYProgress, sectionInView, sceneNum }}>
      {children}
    </SceneContext.Provider>
  );
}

function useScene() {
  return useContext(SceneContext);
}

function Content() {
  const { langContent, isEng } = useLang();
  const { sceneNum } = useScene();
  const paragraphClassNames = cn(
    "origin-left transition-[opacity_transform] duration-300 ease-timing-pop opacity-40 scale-[0.8]",
  );
  const activeParagraphClassNames = cn("opacity-100 scale-100");

  return (
    <div
      className={cn(
        "relative z-10 w-1/2 pl-[90px]",
        "tablet:pl-0",
        "tablet-only:portrait:w-full",
        "mobile:w-full",
      )}>
      <h3
        className={cn(
          "mb-[0.8em] text-[48px]/[1.3] font-bold text-dd-blue",
          "tablet-only:text-4xl",
          "mobile:text-3xl",
        )}>
        {langContent({
          ko: "편의기능",
          en: "Convenience Features",
        })}
      </h3>
      <div
        className={cn(
          "relative space-y-[0.5em] pl-[1em] text-[36px]/[1.3] font-bold",
          "tablet:text-3xl",
          "tablet-only:text-3xl/[1.4]",
          "mobile:text-xl",
        )}>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[4px] overflow-hidden rounded-full bg-white/20",
          )}>
          <motion.span
            initial={{
              y: "0%",
            }}
            animate={{
              y: sceneNum === 0 ? "0%" : sceneNum === 1 ? "0%" : "100%",
            }}
            transition={{
              duration: 0.5,
              ease: easing.pop,
            }}
            className={cn("absolute left-0 top-0 h-1/2 w-full rounded-full bg-dd-blue")}
          />
        </div>
        <p
          className={cn(
            paragraphClassNames,
            (sceneNum === 0 || sceneNum === 1) && activeParagraphClassNames,
          )}>
          {langContent({
            ko: (
              <>
                태블릿을 백팩에 수납하여 <Br />
                훈련 중 모니터링 및 조작
              </>
            ),
            en: (
              <>
                A backpack for the tablet, <Br mobile />
                enabling real-time training <Br mobile />
                monitoring and robot control
              </>
            ),
          })}
        </p>
        <p className={cn(paragraphClassNames, sceneNum === 2 && activeParagraphClassNames)}>
          {langContent({
            ko: (
              <>
                보행 타이밍을 보조하는 <Br />
                가이드 버튼 기능
              </>
            ),
            en: (
              <>
                A guide button feature <Br />
                to assist gait timing
              </>
            ),
          })}
        </p>
      </div>
    </div>
  );
}

function Visual() {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 flex w-[1154px] -translate-x-[60%] -translate-y-1/2 justify-center",
        "labtop:h-full labtop:w-auto",
        "tablet-only:portrait:bottom-0 tablet-only:portrait:top-auto tablet-only:portrait:h-auto tablet-only:portrait:w-[150%] tablet-only:portrait:-translate-x-1/2 tablet-only:portrait:translate-y-0",
        "mobile:bottom-0 mobile:top-auto mobile:h-auto mobile:w-[170%] mobile:translate-x-[-60%] mobile:translate-y-0",
      )}
      style={{
        perspective: "800px",
        transformOrigin: "center",
        transformStyle: "preserve-3d",
      }}>
      <ModelBody />
      <ModelBackpack />
      <ModelTablet />
    </div>
  );
}

function ModelBody() {
  return (
    <Image
      src="/images/products/angel-medi/m20/feature-utils-body.png"
      alt=""
      width={1154}
      height={1211}
      className={cn(
        "relative z-0",
        "labtop:h-full labtop:w-auto labtop:max-w-none",
        "tablet:portrait:h-auto tablet:portrait:w-full",
        "mobile:h-auto mobile:w-full",
      )}
    />
  );
}

function ModelBackpack() {
  const { scrollYProgress, sectionInView, sceneNum } = useScene();
  const openOpacity = useTransform(scrollYProgress, [0.55, 0.65], [1, 0]);
  const closeOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);

  return (
    <div className={cn("absolute bottom-[22.9%] right-[13.5%] w-[37.0883882149047%]")}>
      <motion.div
        style={{
          opacity: openOpacity,
        }}>
        <Image
          src={`/images/products/angel-medi/m20/feature-utils-backpack-opened.png`}
          alt=""
          width={428}
          height={476}
        />
      </motion.div>
      <motion.div
        style={{
          opacity: closeOpacity,
        }}
        className={cn("absolute left-0 top-0 w-full")}>
        <Image
          src={`/images/products/angel-medi/m20/feature-utils-backpack-closed.png`}
          alt=""
          width={428}
          height={476}
        />
      </motion.div>
      {sectionInView && (
        <>
          <Radial className={cn("absolute bottom-[35%] left-[30%]")} active={sceneNum === 2} />
          <Radial className={cn("absolute bottom-[40%] left-[90%]")} active={sceneNum === 2} />
        </>
      )}
    </div>
  );
}

function ModelTablet() {
  const { lang } = useLang();
  const { getValue } = useMediaQuery();
  const { scrollYProgress } = useScene();
  const x = useTransform(
    scrollYProgress,
    [0, 0.35],
    getValue({ mobile: ["40%", "145%"], pc: ["0%", "145%"] }),
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45, 0.6],
    getValue({ mobile: ["50%", "-72%", "-72%", "-50%"], pc: ["0%", "-72%", "-72%", "-50%"] }),
  );
  const scale = useTransform(scrollYProgress, [0, 0.35], [1, 0.65]);
  const rotateY = useTransform(scrollYProgress, [0, 0.35], [0, 15]);
  const z = useTransform(scrollYProgress, [0, 0.35], [10, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [1, 1, 0]);

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.35, 0.6], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        perspective: "800px",
        transformOrigin: "center",
        transformStyle: "preserve-3d",
        x,
        y,
        scale,
        rotateY,
        z,
      }}
      className={cn("absolute left-[28.2%] top-[41.2%] z-10 w-[20.4506065857886%]")}>
      <motion.div
        style={{
          opacity,
        }}
        className={cn("relative z-0 w-full")}>
        <Image
          src={`/images/products/angel-medi/m20/feature-utils-tablet-${lang}.png`}
          alt=""
          width={236}
          height={374}
          className={cn("w-full")}
        />
      </motion.div>
      <motion.div
        initial={{
          x: "-50%",
          y: "10%",
          z: 50,
        }}
        animate={{
          x: "-50%",
          y: "-30%",
          z: 50,
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className={cn("absolute bottom-0 left-1/2 z-20 -translate-x-1/2")}>
        <motion.div
          style={{
            opacity: arrowOpacity,
          }}
          className={cn("w-full")}>
          <Image
            src="/images/products/angel-medi/m20/feature-utils-arrow.svg"
            alt=""
            width={236}
            height={374}
            className={cn("w-full")}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Radial({ className, length = 4, active }) {
  const { getValue } = useMediaQuery();
  const radialScale = useMediaQueryValue({ mobile: 8, tablet: 10, pc: 10 });
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: active ? 1 : 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      className={cn("absolute h-0 w-0", className)}>
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
        <circle
          cx="0"
          cy="0"
          r={getValue({ mobile: 2, pc: 3 })}
          fill="white"
          style={{ zIndex: 1 }}
        />
      </svg>
    </motion.div>
  );
}
