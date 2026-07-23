"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { useState, createContext, use, useRef, useEffect } from "react";
import { ProductSection } from "@/features/pages/products/layouts/default-layouts";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { Br } from "@/features/layout";

export function Composition() {
  const { langContent } = useLang();

  return (
    <CompositionProvider>
      <ProductSection
        containerProps={{
          className: cn(
            "flex items-center",
            "tablet:grid tablet:grid-cols-2 tablet:items-start",
            "mobile:grid-cols-1 mobile:mt-[-50px]",
          ),
        }}
        className={cn("py-32", "mobile:pb-20 mobile:pt-10")}>
        <div
          className={cn(
            "sticky top-[100px] z-20 hidden bg-dark-background tablet:block",
            "mobile:top-0 mobile:pb-[20px] mobile:pt-[20px]",
          )}>
          <h2
            className={cn("text-3xl font-bold", "mobile:mb-2 mobile:text-center mobile:text-2xl")}>
            {langContent({
              ko: "제품 구조",
              en: "Product Composition",
            })}
          </h2>
          <Visual className={cn("mobile:max-w-[150px]")} />
        </div>
        <div
          className={cn(
            "relative flex w-full justify-between gap-10",
            "tablet:flex-col tablet:gap-2",
          )}>
          <div
            className={cn(
              "composition-left group relative z-10 flex w-[310px] flex-col justify-center gap-[72px]",
              "tablet:w-full tablet:gap-2",
            )}>
            <Card
              num={1}
              title={langContent({
                ko: "전용 스트랩",
                en: (
                  <>
                    Dedicated <Br pc />
                    Strap
                  </>
                ),
              })}
              description={langContent({
                ko: "보행훈련 시 낙상 방지를 위해 본체 프레임과 착용자를 연결하는 스트랩",
                en: "Straps that connect the user to the main frame for fall prevention during gait training",
              })}
              additionalContent={
                <div className={cn("space-y-2")}>
                  <Image
                    src="/images/products/angel-medi/mw10/composition-strap.png"
                    alt=""
                    width={201}
                    height={147}
                    className={cn("w-full rounded-lg border border-gray-500", "tablet:w-[200px]")}
                  />
                  <span className={cn("block text-sm text-[#9E9E9E]")}>
                    {langContent({
                      ko: "* 태블릿 거치대 포함",
                      en: "* Includes M20 tablet mount",
                    })}
                  </span>
                </div>
              }
            />
            <Card
              num={2}
              title={langContent({
                ko: "착용자 손잡이",
                en: "User Handles",
              })}
              description={langContent({
                ko: "착용자가 잡는 손잡이",
                en: (
                  <>
                    Grips for the user <Br pc />
                    to hold during training
                  </>
                ),
              })}
            />
            <Card
              num={3}
              title={langContent({
                ko: "프레임 베이스",
                en: "Frame Base",
              })}
              description={langContent({
                ko: "본체 프레임을 지지하고 캐스터 연결",
                en: "Supports the main frame and connects to the casters",
              })}
            />
          </div>
          <Visual className={cn("tablet:hidden")} />
          <div
            className={cn(
              "composition-right group relative z-10 flex w-[310px] flex-col justify-center gap-[72px]",
              "tablet:w-full tablet:gap-2",
            )}>
            <Card
              num={4}
              title={langContent({
                ko: "본체 프레임",
                en: "Main Frame",
              })}
              description={langContent({
                ko: "스트랩을 연결하여 착용자를 지지하는 메인 프레임",
                en: "Structure that connects to the straps and provides fall protection",
              })}
            />
            <Card
              num={5}
              title={langContent({
                ko: "치료사 손잡이",
                en: (
                  <>
                    Therapist <Br pc />
                    Handles
                  </>
                ),
              })}
              description={langContent({
                ko: "치료사가 보조를 위해 사용하는 손잡이",
                en: (
                  <>
                    Grips used by the therapist <Br pc />
                    to assist during training
                  </>
                ),
              })}
            />
            <Card
              num={6}
              title={langContent({
                ko: "캐스터",
                en: "Casters",
              })}
              description={langContent({
                ko: (
                  <>
                    제품의 이동을 위한 바퀴와
                    <Br pc />
                    <Br tablet />
                    고정을 위한 잠금 레버로 구성
                  </>
                ),
                en: (
                  <>
                    Wheels for moving the product, <Br pc />
                    with locking levers for stability
                  </>
                ),
              })}
            />
          </div>
        </div>
      </ProductSection>
    </CompositionProvider>
  );
}

const CompositionContext = createContext();

function CompositionProvider({ children }) {
  const [hoverNum, setHoverNum] = useState(null);

  return <CompositionContext value={{ hoverNum, setHoverNum }}>{children}</CompositionContext>;
}

function useComposition() {
  return use(CompositionContext);
}

function Card({ num, title, description, additionalContent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const [isActive, setIsActive] = useState(false);

  const { device } = useMediaQuery();
  const isDesktop = device === "pc";
  const isTablet = device === "tablet";
  const isMobile = device === "mobile";

  const { setHoverNum } = useComposition();
  const [hover, setHover] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0 && latest < 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const handleMouseEnter = () => {
    setHover(true);
    setHoverNum(num);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setHoverNum(null);
  };

  useEffect(() => {
    if (!isDesktop) {
      setHoverNum(num);
    }
  }, [isActive, device]);

  return (
    <div ref={ref} className={cn("relative h-[150px] w-full", "tablet:h-auto")}>
      <motion.div
        initial={isDesktop && { height: 150, backgroundColor: "#3A3A3A", color: "#fff" }}
        animate={
          isDesktop
            ? {
                height: hover ? 210 : 150,
                backgroundColor: hover ? "#ffffff" : "#3A3A3A",
                color: hover ? "#000" : "#fff",
              }
            : {
                backgroundColor: isActive ? "#fff" : "#3a3a3a",
                color: isActive ? "#000" : "#fff",
              }
        }
        transition={isDesktop && { duration: 0.5, ease: easing.pop }}
        className={cn(
          "group/card absolute left-0 top-1/2 w-full -translate-y-1/2",
          !isDesktop && isActive && "active",
          "flex items-center justify-between gap-2 rounded-xl bg-[#3A3A3A] py-3",
          "group-[.composition-right]:justify-end group-[.composition-right]:pl-[20px] group-[.composition-right]:pr-[28px] group-[.composition-right]:text-right",
          "group-[.composition-left]:pl-[28px] group-[.composition-left]:pr-[20px]",
          "tablet:relative tablet:top-0 tablet:!h-auto tablet:translate-y-0 tablet:!items-start tablet:!justify-start tablet:!px-6 tablet:py-5 tablet:!text-left",
          "tablet:flex-col tablet:gap-6",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div
          className={cn(
            "space-y-2 group-[.composition-left]:order-1 group-[.composition-right]:order-2",
            "tablet:!order-1",
          )}>
          <div className={cn("tablet:space-y-1")}>
            <span
              className={cn(
                "mb-[0.3em] block text-lg font-medium text-[#9C9C9C]",
                "transition-colors duration-300 ease-timing-pop",
                isDesktop && "group-hover/card:text-dd-blue",
                !isDesktop && "group-[.active]/card:text-dd-blue",
                "tablet:text-sm",
              )}>
              Component 0{num}
            </span>
            <span
              className={cn(
                "block text-[30px]/[1.2] font-bold",
                "tablet:text-2xl/[1.2]",
                "mobile:text-xl/[1.2]",
              )}>
              {title}
            </span>
          </div>
          <motion.p
            className={cn(
              "block overflow-hidden text-base/[1.5]",
              "tablet:!h-auto tablet:!opacity-100",
            )}
            initial={isDesktop && { opacity: 0, height: 0 }}
            animate={isDesktop && { opacity: hover ? 1 : 0, height: hover ? "auto" : 0 }}
            transition={isDesktop && { duration: 0.5, ease: easing.pop }}>
            {description}
          </motion.p>
        </div>
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "group-[.composition-left]:right-5 group-[.composition-right]:left-5",
            "tablet:hidden",
          )}>
          <motion.span
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: hover ? 0.5 : 1, opacity: hover ? 0 : 1 }}
            transition={{ duration: 0.5, ease: easing.pop }}
            className={cn(
              "flex aspect-square w-[40px] flex-shrink-0 items-center justify-center rounded-full bg-black text-white",
            )}>
            <Plus />
          </motion.span>
        </div>
        {additionalContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.5, ease: easing.pop }}
            className={cn(
              "absolute left-full top-0 ml-4 h-full w-[214px] overflow-hidden rounded-xl bg-white",
              "px-[14px] py-[18px]",
              "tablet:relative tablet:left-0 tablet:top-0 tablet:order-2 tablet:ml-0 tablet:h-auto tablet:w-full",
              "tablet:rounded-none tablet:bg-transparent tablet:p-0 tablet:!opacity-100",
            )}>
            {additionalContent}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function Visual({ className }) {
  const ref = useRef(null);
  const [areaWidth, setAreaWidth] = useState(0);

  useEffect(() => {
    const areaWidthHandler = () => {
      if (ref.current) {
        setAreaWidth(ref.current.clientWidth);
      }
    };

    areaWidthHandler();

    window.addEventListener("resize", areaWidthHandler);

    return () => {
      window.removeEventListener("resize", areaWidthHandler);
    };
  }, [ref]);

  return (
    <div className={cn("relative mx-auto", className)}>
      <Image
        src="/images/products/angel-medi/mw10/composition-visual.png"
        alt="MW10"
        width={610}
        height={800}
        className={cn("relative z-10")}
      />
      <div ref={ref} className={cn("absolute inset-0 z-0")}>
        <VisualMarker
          num={1}
          className={{ position: "right-[40%] top-[27%]" }}
          markerWidth={areaWidth * 0.46}
        />
        <VisualMarker
          num={2}
          className={{ position: "left-[29%] top-[40%]" }}
          markerWidth={areaWidth * 0.18}
        />
        <VisualMarker
          num={3}
          className={{ position: "bottom-[25.5%] left-[50%]" }}
          markerWidth={areaWidth * 0.36}
        />
        <VisualMarker
          num={4}
          className={{ position: "right-[28%] top-[19%]" }}
          markerWidth={areaWidth * 0.19}
        />
        <VisualMarker
          num={5}
          className={{ position: "right-[25%] top-[41%]" }}
          markerWidth={areaWidth * 0.26}
        />
        <VisualMarker
          num={6}
          className={{ position: "bottom-[24%] right-[20%]" }}
          markerWidth={areaWidth * 0.19}
        />
      </div>
    </div>
  );
}

function VisualMarker({ num, className, markerWidth }) {
  const { hoverNum } = useComposition();

  return (
    <div className={cn("absolute h-0 w-0", className.position)}>
      <div className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")}>
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hoverNum === num ? 1 : 0, opacity: hoverNum === num ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easing.pop }}
          className={cn("block aspect-square w-[100px] rounded-full bg-dd-blue", className.marker)}
          style={{ width: `${markerWidth}px` }}
        />
      </div>
    </div>
  );
}
