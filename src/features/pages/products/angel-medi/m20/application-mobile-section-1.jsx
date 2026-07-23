"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import Image from "next/image";
import { useState, useMemo } from "react";
import { createContext, use, useRef, memo } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function ApplicationMobileSection1() {
  const containerRef = useRef(null);

  return (
    <SceneProvider containerRef={containerRef}>
      <div ref={containerRef} className={cn("h-[300vh] bg-white text-black")}>
        <section
          className={cn(
            "sticky top-0 flex h-screen items-center justify-center pb-[80px] pt-[80px]",
            "mobile:block mobile:h-auto mobile:overflow-hidden mobile:py-0 mobile:pt-0",
          )}>
          <Container
            fixed={false}
            className={cn(
              "flex h-full flex-col justify-center gap-10 pb-[100px]",
              "mobile:h-screen mobile:justify-start mobile:gap-2 mobile:pb-[50px] mobile:pt-[30px]",
            )}>
            <Header />
            <div
              className={cn(
                "relative flex h-full max-h-[500px] w-full items-center",
                "mobile:h-[calc(100%-118px)] mobile:max-h-none mobile:flex-col-reverse mobile:justify-start mobile:gap-6",
              )}>
              <Visual />
              <Content />
            </div>
          </Container>
        </section>
      </div>
    </SceneProvider>
  );
}

const SCENE_THRESHOLDS = [0.25, 0.5, 0.75, 1];
const introThreshold = [0.14, 0.25];
const commonTransition = { duration: 0.5, ease: easing.easeOut };

const SceneContext = createContext();

function SceneProvider({ containerRef, children }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scene, setScene] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newScene = SCENE_THRESHOLDS.findIndex((threshold) => latest <= threshold) + 1;
    if (newScene !== scene) {
      setScene(newScene);
    }
  });

  const contextValue = useMemo(
    () => ({
      scrollYProgress,
      scene,
    }),
    [scrollYProgress, scene],
  );

  return <SceneContext value={contextValue}>{children}</SceneContext>;
}

function useScene() {
  return use(SceneContext);
}

const Header = memo(function Header() {
  const { langContent } = useLang();
  const { scrollYProgress } = useScene();

  const labelColor = useTransform(scrollYProgress, [...introThreshold], ["#427DFF", "#646464"]);
  const titleColor = useTransform(scrollYProgress, [...introThreshold], ["#000", "#427DFF"]);
  const titleScale = useTransform(scrollYProgress, [...introThreshold], [1, 0.7]);

  return (
    <div
      className={cn("space-y-2 text-center", "tablet-only:portrait:space-y-4", "mobile:space-y-1")}>
      <motion.span
        style={{ color: labelColor }}
        className={cn(
          "block text-lg font-bold text-dd-blue",
          "tablet-only:portrait:text-xl",
          "mobile:text-sm mobile:!text-[#646464]",
        )}>
        ANGEL LEGS M20
      </motion.span>
      <motion.h2
        style={{ color: titleColor, scale: titleScale }}
        className={cn(
          "origin-top text-4xl/[1.2] font-bold",
          "tablet-only:portrait:text-5xl",
          "mobile:!scale-100 mobile:text-xl mobile:!text-dd-blue",
        )}>
        {langContent({
          ko: "ANGEL LEGS 어플리케이션",
          en: "ANGEL LEGS Application",
        })}
      </motion.h2>
    </div>
  );
});

const Visual = memo(function Visual() {
  const { lang, isEng } = useLang();
  const { scrollYProgress, scene } = useScene();

  const frameX = useTransform(scrollYProgress, [...introThreshold], ["0%", "-70%"]);
  const frameY = useTransform(scrollYProgress, [...introThreshold], ["10%", "0%"]);
  const frameScale = useTransform(scrollYProgress, [...introThreshold], ["1.05", "1"]);
  const coverOpacity = useTransform(scrollYProgress, [...introThreshold], [1, 0]);

  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 z-10 h-full max-h-[450px] -translate-x-1/2 -translate-y-1/2",
        "tablet-only:portrait:max-h-[600px]",
        "mobile:relative mobile:left-0 mobile:top-0 mobile:h-[calc(100%-197px)] mobile:max-h-none mobile:!translate-x-0 mobile:!translate-y-0",
        isEng && "mobile:h-[calc(100%-255px)]",
      )}>
      <motion.div
        style={{
          x: frameX,
          y: frameY,
          scale: frameScale,
        }}
        className={cn("h-full", "mobile:!translate-x-0 mobile:!translate-y-0 mobile:!scale-100")}>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full overflow-hidden rounded-[30px] bg-white p-[1px]",
            "mobile:flex mobile:justify-center",
          )}>
          <div className={cn("relative h-full")}>
            <motion.div
              style={{ opacity: coverOpacity }}
              className={cn("relative z-10 h-full w-full")}>
              <Image
                src={`/images/products/angel-medi/m20/app-visual-1-${lang}.jpg`}
                alt=""
                width={326}
                height={516}
                className={cn("h-full w-auto")}
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene <= 2 ? 1 : 0 }}
              transition={commonTransition}
              className={cn("absolute left-0 top-0 h-full w-full")}>
              <Image
                src={`/images/products/angel-medi/m20/app-visual-2-${lang}.jpg`}
                alt=""
                width={326}
                height={516}
                className={cn("h-full w-auto")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene === 3 ? 1 : 0 }}
              transition={commonTransition}
              className={cn("absolute left-0 top-0 h-full w-full")}>
              <Image
                src={`/images/products/angel-medi/m20/app-visual-3-${lang}.jpg`}
                alt=""
                width={326}
                height={516}
                className={cn("h-full w-auto")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene >= 4 ? 1 : 0 }}
              transition={commonTransition}
              className={cn("absolute left-0 top-0 h-full w-full")}>
              <Image
                src={`/images/products/angel-medi/m20/app-visual-4-${lang}.jpg`}
                alt=""
                width={326}
                height={516}
                className={cn("h-full w-auto")}
              />
            </motion.div>
          </div>
        </div>
        <Image
          src="/images/products/angel-medi/m20/app-frame.png"
          alt=""
          width={326}
          height={516}
          className={cn("relative z-10 h-full w-auto")}
          priority
        />
      </motion.div>
    </div>
  );
});

const Content = memo(function Content() {
  const { langContent } = useLang();
  const { getValue } = useMediaQuery();
  const { scene, scrollYProgress } = useScene();
  const x = useTransform(scrollYProgress, [...introThreshold], ["-20%", "0%"]);
  const opacity = useTransform(scrollYProgress, [...introThreshold], [0, 1]);

  return (
    <motion.div
      style={{ x, opacity }}
      className={cn(
        "ml-auto w-1/2 space-y-10 pb-[50px]",
        "tablet-only:portrait:w-[55%]",
        "mobile:w-full mobile:!translate-x-0 mobile:space-y-8 mobile:pb-0 mobile:text-center mobile:!opacity-100",
      )}>
      <h3 className={cn("text-[48px]/[1.3]", "tablet:text-3xl", "mobile:text-2xl/[1.3]")}>
        {langContent({
          ko: (
            <>
              전용 어플리케이션을 통한 <Br />
              <b>실시간 모니터링 및 보행 분석</b>
            </>
          ),
          en: (
            <>
              <b>
                Real-time Monitoring <Br tablet />
                and Motion Analysis
              </b>{" "}
              through a dedicated application
            </>
          ),
        })}
      </h3>
      <ul
        className={cn(
          "space-y-4",
          "mobile:flex mobile:flex-col mobile:items-center mobile:gap-y-2 mobile:space-y-0",
        )}>
        <ListItem active={getValue({ mobile: scene == 2, pc: scene <= 2 })}>
          {langContent({
            ko: "사용자별 정보 저장 및 조회",
            en: "To store and retrieve user-specific dat",
          })}
        </ListItem>
        <ListItem active={getValue({ mobile: scene == 3, pc: scene === 3 })}>
          {langContent({
            ko: "실시간 모니터링",
            en: "Real-time monitoring",
          })}
        </ListItem>
        <ListItem active={getValue({ mobile: scene == 4, pc: scene >= 4 })}>
          {langContent({
            ko: "훈련 모드별/날짜별 기록 조회 및 분석",
            en: (
              <>
                To search and analyze data by date <Br />
                and training mode
              </>
            ),
          })}
        </ListItem>
      </ul>
    </motion.div>
  );
});

const ListItem = memo(function ListItem({ children, active }) {
  return (
    <li
      className={cn(
        "relative pl-8 text-lg/[1.3] text-[#646464] transition-colors duration-300 ease-timing-pop",
        "mobile:pl-0 mobile:text-base/[1.3]",
      )}>
      <span
        className={cn(
          "absolute left-0 top-[0.65em] flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-transparent bg-white",
          "transition-colors duration-300 ease-timing-pop",
          active && "border-dd-blue",
          "mobile:left-1/2 mobile:top-1/2 mobile:h-[calc(100%+10px)] mobile:w-[calc(100%+20px)] mobile:-translate-x-1/2 mobile:!border-none mobile:bg-dd-gray-lighter",
          active ? "mobile:opacity-100" : "mobile:opacity-0",
        )}>
        <span
          className={cn(
            "block h-2.5 w-2.5 rounded-full bg-dd-gray-dark",
            "transition-all duration-300 ease-timing-pop",
            active && "bg-dd-blue",
            "mobile:hidden",
          )}
        />
      </span>
      <span
        className={cn(
          "block origin-left font-normal leading-[1.3] transition-[color_font-weight_transform] duration-300 ease-timing-pop",
          active && "scale-[1.2] font-bold text-dd-blue",
          "z-10 mobile:relative",
          active && "mobile:scale-100",
        )}>
        {children}
      </span>
    </li>
  );
});
