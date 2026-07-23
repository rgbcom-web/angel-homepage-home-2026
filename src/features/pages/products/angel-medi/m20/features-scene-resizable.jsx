"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { useRef, useState, createContext, use } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowButton } from "@/features/global-ui";
import Image from "next/image";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function FeaturesSceneResizable() {
  const { langContent, isEng } = useLang();
  const { getValue } = useMediaQuery();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const articleY = useTransform(
    scrollYProgress,
    [0, 1],
    getValue({ mobile: ["-15%", "0%"], pc: ["-30%", "0%"] }),
  );
  const articleOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <ContentProvider>
      <div className={cn("h-[150vh]", "tablet:h-auto")}>
        <article ref={containerRef} className={cn("sticky top-0", "tablet:relative")}>
          <motion.div style={{ y: articleY, opacity: articleOpacity }}>
            <Container
              fixed={false}
              className={cn(
                "flex h-screen flex-col justify-center gap-4 pb-[80px] pt-[120px]",
                "tablet:h-auto tablet:gap-[70px] tablet:pt-[80px]",
                "mobile:gap-10 mobile:pb-0",
              )}>
              <div className={cn("text-center")}>
                <h2
                  className={cn(
                    "mb-[0.5em] text-[48px]/[1.3] font-bold",
                    "tablet:text-5xl/[1.3]",
                    "mobile:text-3xl/[1.3]",
                    isEng &&
                      "text-[42px]/[1.3] labtop:text-[32px]/[1.3] tablet:text-[32px]/[1.3] mobile:text-2xl/[1.3]",
                  )}>
                  {langContent({
                    ko: (
                      <>
                        <span className={cn("text-dd-blue")}>조절 가능</span>한 사이즈
                      </>
                    ),
                    en: (
                      <>
                        <span className={cn("text-dd-blue")}>Customizable Fit</span> <Br />
                        for Various Body Types
                      </>
                    ),
                  })}
                </h2>
                <p className={cn("text-2xl/[1.5]", "mobile:text-xl/[1.5]")}>
                  {langContent({
                    ko: (
                      <>
                        골반 깊이/너비, 다리 길이, <Br mobile />
                        착용부 사이즈 조절 가능
                      </>
                    ),
                    en: (
                      <>
                        Adjustable pelvic width and depth, leg length, Wearing Straps Adjustment for
                        the comfort
                      </>
                    ),
                  })}
                </p>
              </div>
              <div
                className={cn(
                  "flex h-full max-h-[560px] w-full items-center justify-center gap-10",
                  "tablet:h-auto tablet:max-h-none",
                  "mobile:block mobile:space-y-4",
                  isEng && "mt-[20px]",
                )}>
                <div
                  className={cn(
                    "w-[234px] space-y-[100px]",
                    "tablet:w-[200px] tablet:space-y-[20px]",
                    "mobile:w-full",
                  )}>
                  <nav className={cn("flex w-full flex-col gap-3", "mobile:flex-row mobile:gap-1")}>
                    <TabButton value={1}>
                      {langContent({
                        ko: "골반 깊이 / 너비 조절",
                        en: "Pelvic width/depth",
                      })}
                    </TabButton>
                    <TabButton value={2}>
                      {langContent({
                        ko: "다리 길이 조절",
                        en: "Leg length",
                      })}
                    </TabButton>
                    <TabButton value={3}>
                      {langContent({
                        ko: "착용부 조절",
                        en: (
                          <small className={cn("leading-[1.1]")}>
                            Attachment Point <Br />
                            Adjustment
                          </small>
                        ),
                      })}
                    </TabButton>
                  </nav>
                  {!isEng && (
                    <div className={cn("relative w-full space-y-4", "mobile:hidden")}>
                      <img
                        src="/images/products/angel-medi/m20/feature-wearing-video-thumb.png"
                        alt=""
                        className={cn("w-full")}
                      />
                      <VideoButton />
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "h-full",
                    "tablet:h-auto",
                    "mobile:flex mobile:w-full mobile:flex-col mobile:items-center mobile:gap-y-8",
                  )}>
                  <TabContent />
                  {!isEng && <VideoButton className={cn("hidden", "mobile:flex")} />}
                </div>
              </div>
            </Container>
          </motion.div>
        </article>
      </div>
    </ContentProvider>
  );
}

const ContentContext = createContext(null);

function ContentProvider({ children }) {
  const [content, setContent] = useState(1);

  return <ContentContext value={{ content, setContent }}>{children}</ContentContext>;
}

function useContent() {
  return use(ContentContext);
}

function VideoButton({ className }) {
  return (
    <ArrowButton
      size="default"
      variant="blue"
      href="https://youtu.be/jpF1gckcvEw?si=O8LgFiF3zXuMiv0w"
      keepLang={false}
      target="_blank"
      rel="noopener noreferrer"
      bgColor="black"
      borderColor="white"
      hoverEffect={false}
      className={cn("!border-[1px] hover:opacity-60", "mobile:mx-auto", className)}>
      착용영상 보기
    </ArrowButton>
  );
}

function TabButton({ children, value, className }) {
  const { content, setContent } = useContent();

  const handleClick = () => {
    setContent(value);
  };

  const isActive = content === value;

  return (
    <Button
      size="lg"
      onClick={handleClick}
      variant={isActive ? "blue" : "gray-darker"}
      className={cn(
        "justify-between px-[1.2em] text-left leading-[1.3]",
        "tablet:pl-[1em] tablet:pr-[0.7em]",
        "mobile:flex-1 mobile:justify-center mobile:px-[0.5em] mobile:text-center mobile:text-xs",
        !isActive && "text-dd-gray-dark",
        className,
      )}>
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className={cn("opacity-50", "mobile:hidden")}>
        <line
          x2="14"
          transform="translate(0 7)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x2="14"
          transform="translate(7) rotate(90)"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    </Button>
  );
}

function TabContent() {
  const { content } = useContent();

  const contentItem = {
    1: <TabContentItem_1 />,
    2: <TabContentItem_2 />,
    3: <TabContentItem_3 />,
  };

  return (
    <div
      className={cn(
        "relative h-full",
        "tablet:h-auto",
        "mobile:w-full mobile:rounded-2xl mobile:bg-black/30 mobile:py-6",
      )}>
      <div className={cn("relative h-full w-full", "tablet:h-auto")}>
        <Image
          src={`/images/products/angel-medi/m20/feature-size-model.png`}
          alt=""
          width={654}
          height={722}
          className={cn(
            "h-full w-auto",
            "tablet:h-auto tablet-only:portrait:w-[550px] tablet-only:landscape:w-[600px]",
            "mobile:mx-auto mobile:w-full",
          )}
        />
        {contentItem[content]}
      </div>
    </div>
  );
}

function TabContentItem_1() {
  return (
    <div className={cn("absolute inset-0")}>
      <SizeArrow className={cn("left-[32%] top-[42%]")} direction="right" />
      <SizeArrow className={cn("left-[61%] top-[42.5%]")} direction="left" />
      <SizeArrow className={cn("right-[19.5%] top-[42.5%]")} direction="right" />
    </div>
  );
}

function TabContentItem_2() {
  return (
    <div className={cn("absolute inset-0")}>
      <SizeArrow className={cn("left-[24.8%] top-[68%]")} direction="bottom" />
      <SizeArrow className={cn("left-[24.8%] top-[85%]")} direction="bottom" />
      <SizeArrow className={cn("left-[51.8%] top-[68%]")} direction="bottom" />
      <SizeArrow className={cn("left-[51.8%] top-[85%]")} direction="bottom" />
      <SizeArrow className={cn("left-[81.2%] top-[68%]")} direction="bottom" />
      <SizeArrow className={cn("left-[81.2%] top-[85%]")} direction="bottom" />
    </div>
  );
}

function TabContentItem_3() {
  return (
    <div className={cn("absolute inset-0")}>
      <SizeArrow
        className={cn("left-[19.0%] top-[88%] rotate-[60deg]")}
        direction="left"
        animateDistance="30%"
      />
      <SizeArrow
        className={cn("left-[22.0%] top-[93%] rotate-[60deg]")}
        direction="right"
        animateDistance="30%"
      />
      <SizeArrow className={cn("left-[56.0%] top-[56%]")} direction="left" animateDistance="30%" />
      <SizeArrow className={cn("left-[64.0%] top-[56%]")} direction="right" animateDistance="30%" />
      <SizeArrow
        className={cn("left-[56.0%] top-[64.5%]")}
        direction="left"
        animateDistance="30%"
      />
      <SizeArrow
        className={cn("left-[64.0%] top-[64.5%]")}
        direction="right"
        animateDistance="30%"
      />
      <SizeArrow className={cn("left-[56.0%] top-[78%]")} direction="left" animateDistance="30%" />
      <SizeArrow className={cn("left-[64.0%] top-[78%]")} direction="right" animateDistance="30%" />
    </div>
  );
}

function SizeArrow({ className, svgClassName, direction, animateDistance = "50%" }) {
  const directionClass = {
    left: "rotate-0",
    right: "rotate-180",
    top: "rotate-90",
    bottom: "-rotate-90",
  };
  return (
    <div className={cn("absolute h-0 w-[8.5626911314985%]", className)}>
      <div
        className={cn(
          "absolute left-0 top-1/2 h-auto w-full -translate-y-1/2",
          directionClass[direction],
        )}>
        <motion.svg
          animate={{
            x: ["0%", animateDistance],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="56.085"
          height="44"
          viewBox="0 0 56.085 44"
          className={cn("h-auto w-full", "origin-left", svgClassName)}>
          <defs>
            <linearGradient
              id="size-arrow-gradient"
              x1="0.836"
              y1="0.154"
              x2="0"
              y2="0.288"
              gradientUnits="objectBoundingBox">
              <stop offset="0" stopColor="#427dff" />
              <stop offset="1" stopColor="#00b6ef" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M70.744,31.6H36.659v-20H70.744V0l22,22-22,22Z"
            transform="translate(92.744 44) rotate(180)"
            fill="url(#size-arrow-gradient)"
          />
        </motion.svg>
      </div>
    </div>
  );
}
