"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import Image from "next/image";
import { useState, useMemo } from "react";
import { createContext, use, useRef, memo } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { BulletList } from "@/features/layout";

const SCENE_THRESHOLDS = [0.28, 0.42, 0.56, 0.84, 1];
const content_1_change = [0.14, 0.28];
const content_2_change = [0.7, 0.84];
const commonTransition = { duration: 0.5, ease: easing.easeOut };

export function ApplicationPC() {
  const containerRef = useRef(null);

  return (
    <SceneProvider containerRef={containerRef}>
      <div ref={containerRef} className={cn("h-[300vh] bg-white text-black")}>
        <section
          className={cn(
            "sticky top-0 flex h-screen items-center justify-center pb-[80px] pt-[80px]",
          )}>
          <Container
            className={cn("flex h-full flex-col justify-center gap-0 pb-[50px]", "tablet:gap-10")}>
            <Header />
            <div className={cn("relative flex h-full max-h-[500px] w-full items-center")}>
              <Visual />
              <Content_1 />
              <Content_2 />
            </div>
          </Container>
        </section>
      </div>
    </SceneProvider>
  );
}

const SceneContext = createContext();

function SceneProvider({ containerRef, children }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [scene, setScene] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newScene = SCENE_THRESHOLDS.findIndex((threshold) => latest < threshold) + 1;
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

  const labelColor = useTransform(scrollYProgress, [...content_1_change], ["#427DFF", "#646464"]);
  const titleColor = useTransform(scrollYProgress, [...content_1_change], ["#000", "#427DFF"]);
  const titleScale = useTransform(scrollYProgress, [...content_1_change], [1, 0.51]);
  const titleOut = useTransform(scrollYProgress, [0.7, 0.75], [1, 0]);

  return (
    <motion.div style={{ opacity: titleOut }} className={cn("space-y-4 text-center")}>
      <motion.span
        style={{ color: labelColor }}
        className={cn("block text-lg font-bold text-dd-blue")}>
        ANGEL LEGS M20
      </motion.span>
      <motion.h2
        style={{ color: titleColor, scale: titleScale }}
        className={cn("origin-top text-[70px]/[1.2] font-bold", "tablet:text-5xl")}>
        {langContent({
          ko: "ANGEL LEGS 어플리케이션",
          en: "ANGEL LEGS Application",
        })}
      </motion.h2>
    </motion.div>
  );
});

const Visual = memo(function Visual() {
  const { lang } = useLang();
  const { scrollYProgress, scene } = useScene();

  const frameX = useTransform(
    scrollYProgress,
    [...content_1_change, ...content_2_change],
    ["0%", "-105%", "-105%", "76%"],
  );
  const frameY = useTransform(
    scrollYProgress,
    [...content_1_change, ...content_2_change],
    ["10%", "0%", "0%", "-10%"],
  );
  const frameScale = useTransform(
    scrollYProgress,
    [...content_1_change, ...content_2_change],
    ["1.05", "1", "1", "1"],
  );
  const coverOpacity = useTransform(scrollYProgress, [...content_1_change], [1, 0]);

  const content_2_change_opacity = useTransform(scrollYProgress, [...content_2_change], [0, 1]);
  const content_2_change_opacity_reverse = useTransform(
    scrollYProgress,
    [...content_2_change],
    [1, 0],
  );

  return (
    <div className={cn("absolute left-1/2 top-1/2 z-10 h-full -translate-x-1/2 -translate-y-1/2")}>
      <motion.div
        style={{
          x: frameX,
          y: frameY,
          scale: frameScale,
        }}
        className={cn("h-full")}>
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full overflow-hidden rounded-[30px] bg-white p-[1px]",
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
              <motion.div
                style={{ opacity: content_2_change_opacity_reverse }}
                className={cn("h-full w-auto")}>
                <Image
                  src={`/images/products/angel-medi/m20/app-visual-4-${lang}.jpg`}
                  alt=""
                  width={326}
                  height={516}
                  className={cn("h-full w-auto")}
                />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ opacity: content_2_change_opacity }}
              className={cn("absolute left-0 top-0 h-full w-full")}>
              <Image
                src={`/images/products/angel-medi/m20/app-visual-5-${lang}.jpg`}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scene >= 5 ? 1 : 0 }}
          transition={commonTransition}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-10 max-w-none -translate-x-[50.5%] -translate-y-[49.5%]",
          )}>
          <Image
            src={`/images/products/angel-medi/m20/app-visual-5-2-${lang}.png`}
            alt=""
            width={902}
            height={630}
            className={cn("w-[902px] max-w-none")}
          />
        </motion.div>
      </motion.div>
    </div>
  );
});

const Content_1 = memo(function Content_1() {
  const { langContent, isEng } = useLang();
  const { scene, scrollYProgress } = useScene();
  const content_1_x = useTransform(scrollYProgress, [...content_1_change], ["-20%", "0%"]);
  const content_1_opacity = useTransform(
    scrollYProgress,
    [...content_1_change, 0.7, 0.75],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{
        x: content_1_x,
        opacity: content_1_opacity,
      }}
      className={cn("ml-auto w-[55%] space-y-14 pb-[50px]", "tablet:space-y-10 tablet:pb-0")}>
      <h3
        className={cn(
          "text-[48px]/[1.3]",
          "tablet:text-4xl",
          isEng && "text-[38px]/[1.3] tablet:text-3xl",
        )}>
        {langContent({
          ko: (
            <>
              전용 어플리케이션을 통한 <Br />
              <b>실시간 모니터링 및 보행 분석</b>
            </>
          ),
          en: (
            <>
              <b>Real-time Monitoring and Motion Analysis</b> <Br />
              through a dedicated application
            </>
          ),
        })}
      </h3>
      <ul className={cn("space-y-4")}>
        <ListItem active={scene <= 2}>
          {langContent({
            ko: "사용자별 정보 저장 및 조회",
            en: "To store and retrieve user-specific data",
          })}
        </ListItem>
        <ListItem active={scene === 3}>
          {langContent({
            ko: "실시간 모니터링",
            en: "Real-time monitoring",
          })}
        </ListItem>
        <ListItem active={scene >= 4}>
          {langContent({
            ko: "훈련 모드별/날짜별 기록 조회 및 분석",
            en: "To search and analyze data by date and training mode",
          })}
        </ListItem>
      </ul>
    </motion.div>
  );
});

const Content_2 = memo(function Content_2() {
  const { langContent, isEng } = useLang();
  const { scrollYProgress } = useScene();
  const content_2_x = useTransform(scrollYProgress, [0.75, 0.85], ["20%", "0%"]);
  const content_2_opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);

  return (
    <motion.div
      style={{
        x: content_2_x,
        opacity: content_2_opacity,
      }}
      className={cn("absolute left-0 w-[55%] pb-[150px]")}>
      <span className={cn("mb-[0.5em] block text-xl font-bold text-[#707070]")}>
        ANGEL LEGS M20
      </span>
      <h3
        className={cn(
          "mb-10 text-[48px]/[1.3] font-bold",
          isEng && "text-[38px]/[1.3] tablet:text-3xl",
        )}>
        {langContent({
          ko: (
            <>
              <b className={cn("text-dd-blue")}>7가지 훈련모드</b>와 <Br />
              세부 설정을 통한 <Br />
              단계별 재활 훈련 제공
            </>
          ),
          en: (
            <>
              Step-by-Step <Br />
              Rehabilitation with <Br />
              <b className={cn("text-dd-blue")}>7 Training Modes</b> <Br />
              and Detailed <Br />
              Customization
            </>
          ),
        })}
      </h3>
      <BulletList
        className={{ root: cn("text-xl") }}
        items={[
          langContent({
            ko: (
              <>
                일어서기, 앉기, 서있기, 평지보행, <Br />
                평지보행(스마트), 계단 오르기, 스쿼트
              </>
            ),
            en: (
              <>
                Sit-to-Stand, Sitting, Standing, Level Walking, <Br />
                Level Walking (Smart), Stair Climbing, and Squats
              </>
            ),
          }),
        ]}
      />
    </motion.div>
  );
});

const ListItem = memo(function ListItem({ children, active }) {
  return (
    <li
      className={cn(
        "relative pl-[1.5em] text-[22px]/[1.3] text-[#646464] transition-colors duration-300 ease-timing-pop",
      )}>
      <span
        className={cn(
          "absolute left-0 top-[0.65em] flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-transparent bg-white",
          "transition-colors duration-300 ease-timing-pop",
          active && "border-dd-blue",
        )}>
        <span
          className={cn(
            "block h-2.5 w-2.5 rounded-full bg-dd-gray-dark",
            "transition-all duration-300 ease-timing-pop",
            active && "scale-[1.2] bg-dd-blue",
          )}
        />
      </span>
      <span
        className={cn(
          "block origin-left font-normal leading-[1.3] transition-[color_font-weight_transform] duration-300 ease-timing-pop",
          active && "scale-[1.3] font-bold text-dd-blue",
        )}>
        {children}
      </span>
    </li>
  );
});
