"use client";

import { useLang } from "@/shared/context/lang-provider";
import { useMediaQuery, useMediaQueryValue } from "@/shared/hooks/useMediaQuery";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout/container";
import { ArrowButton } from "@/features/global-ui";
import Image from "next/image";
import { Br } from "@/features/layout";
import { useRouter } from "next/navigation";

export function Technology() {
  return (
    <section className={cn("pointer-events-auto relative", "mobile:mb-20")}>
      <TypoContainer />
      <TechContainer />
    </section>
  );
}

function TypoContainer() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 1], [0, 1, 1, 0]);
  const stickyY = useTransform(scrollYProgress, [0, 1], ["-30%", "50%"]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, y: stickyY }}
      className={cn(
        "relative left-0 top-0 mt-[-30vh] flex h-screen w-full items-center justify-center",
      )}>
      <Container>
        <h2
          className={cn(
            "text-[168px] font-bold text-dd-blue",
            "text-center tablet:text-[70px]/[1.1]",
            "mobile:text-[50px]/[1.1]",
          )}>
          Core Technology
        </h2>
      </Container>
    </motion.div>
  );
}

function TechContainer() {
  const { isEng, langContent, lang } = useLang();
  const router = useRouter();
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("before");

  const { getValue } = useMediaQuery();

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start 10%", "end end"],
  });

  trackProgress.on("change", (latest) => {
    if (latest < 0.5 && latest > 0) {
      setCurrentScene(1);
    } else if (latest === 0) {
      setCurrentScene("before");
    } else if (latest === 1) {
      setCurrentScene("after");
    } else {
      setCurrentScene(2);
    }
  });

  const textVariants = {
    default: {
      opacity: 0.36,
      color: "#fff",
      fontSize: getValue({ mobile: "0.7em", pc: isEng ? "0.6em" : "0.5em" }),
    },
    active: { opacity: 1, color: "#fff", fontSize: "1em" },
  };

  const textTransition = {
    ease: easing.pop,
    duration: 0.5,
    delay: 0,
  };

  const visualWrapperVariants = {
    default: { opacity: 0 },
    active: { opacity: 1 },
  };

  const visualWrapperTransition = {
    ease: easing.pop,
    duration: 0.5,
    delay: 0,
  };

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative h-[250vh]",
        "labtop:h-[350vh]",
        "tablet:h-[250vh]",
        "mobile:h-[200vh]",
      )}>
      <div ref={stickyRef} className={cn("sticky left-0 top-0 h-screen overflow-hidden")}>
        <Container
          className={cn(
            "relative h-full",
            "tablet:w-[1200px] tablet:max-w-[calc(100%-100px)]",
            "tablet:portrait:flex tablet:portrait:w-[800px] tablet:portrait:flex-col-reverse tablet:portrait:py-[120px]",
            "mobile:!max-w-[calc(100%-30px)] mobile:!py-[60px]",
          )}>
          {/* 콘텐츠 */}
          <motion.div
            className={cn(
              "absolute right-0 top-0 z-10 flex h-full flex-col items-end justify-center gap-[100px] py-[120px]",
              "pr-[88px]",
              "labtop:right-[100px]",
              "tablet:right-5 tablet:pr-10",
              "tablet:portrait:static tablet:portrait:items-start tablet:portrait:pl-4 tablet:portrait:pr-0",
              "tablet:portrait:h-auto tablet:portrait:gap-[50px] tablet:portrait:pb-0 tablet:portrait:pt-10",
              "mobile:portrait:gap-[30px] mobile:portrait:!pl-6 mobile:portrait:!pt-5",
            )}>
            <h2
              className={cn("cursor-pointer text-right", "tablet:portrait:text-left")}
              onClick={() => router.push(`${lang}/company/technology`)}>
              <span
                className={cn(
                  "mb-[1em] block text-[25px] font-bold leading-[1] text-dd-blue",
                  "tablet:text-2xl",
                  "mobile:text-lg",
                )}>
                Core Technology
              </span>
              <div
                className={cn(
                  "relative flex flex-col gap-[0.2em] text-[50px]",
                  "labtop:text-[40px]/[1.4]",
                  "tablet:text-[34px]/[1.4]",
                  "tablet:portrait:gap-[0.5em]",
                  "mobile:text-2xl",
                  isEng && "gap-[0.5em] text-[38px]",
                )}>
                <motion.span
                  variants={textVariants}
                  initial="default"
                  animate={currentScene === 1 || currentScene === "before" ? "active" : "default"}
                  transition={textTransition}
                  className={cn(
                    "block text-[30px] font-semibold leading-[1.2] text-dd-gray-blue opacity-55",
                  )}>
                  {langContent({
                    ko: (
                      <>
                        행동 의도 파악 및 <br />
                        정밀 제어 기술
                      </>
                    ),
                    en: (
                      <>
                        Human Intent Recognition <br />
                        and Precision <br />
                        Control Technology
                      </>
                    ),
                  })}
                </motion.span>
                <motion.span
                  variants={textVariants}
                  initial="default"
                  animate={currentScene === 2 || currentScene === "after" ? "active" : "default"}
                  transition={textTransition}
                  className={cn(
                    "block text-[30px] font-semibold leading-[1.2] text-dd-gray-blue opacity-55",
                  )}>
                  {langContent({
                    ko: (
                      <>
                        지능형 동작 보조 알고리즘 <Br mobile />및 <Br pc tablet />
                        전문적인 데이터 분석
                      </>
                    ),
                    en: (
                      <>
                        Intelligent motion assistance <br />
                        algorithm and comprehensive <br />
                        motion analysis
                      </>
                    ),
                  })}
                </motion.span>
                <div
                  className={cn(
                    "absolute right-[-88px] top-0 h-full w-[4px] overflow-hidden rounded-full bg-white/20",
                    "tablet:-right-10",
                    "tablet:portrait:-left-6 tablet:portrait:right-auto",
                  )}>
                  <motion.div
                    animate={{
                      y: currentScene === 1 ? "0%" : "100%",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: easing.pop,
                    }}
                    className={cn("absolute left-0 top-0 h-1/2 w-full rounded-full bg-white")}
                  />
                </div>
              </div>
            </h2>
            <ArrowButton
              href="/company/technology"
              size="lg"
              bgColor="white"
              dimmerColor="blue"
              hoverTextColor="white"
              className={cn("pointer-events-auto text-black")}>
              {langContent({
                ko: "핵심기술 바로가기",
                en: "Explore Our Core Technology",
              })}
            </ArrowButton>
          </motion.div>
          {/* 비주얼 */}
          <div className={cn("relative h-full w-full")}>
            <AnimatePresence>
              {currentScene === 1 && (
                <motion.div
                  key="visual-1"
                  variants={visualWrapperVariants}
                  initial="default"
                  animate="active"
                  exit="default"
                  transition={visualWrapperTransition}
                  className={cn(
                    "absolute left-0 top-1/2 h-[80%] max-h-[822px] w-auto -translate-y-1/2",
                    "labtop:left-[15%]",
                    "origin-bottom-left tablet:left-[0%] tablet:scale-[90%]",
                    "tablet:portrait:left-0 tablet:portrait:top-0 tablet:portrait:h-full tablet:portrait:w-auto tablet:portrait:origin-top-left tablet:portrait:translate-y-0 tablet:portrait:scale-[110%]",
                    "mobile:portrait:left-1/2 mobile:portrait:top-0 mobile:portrait:h-full mobile:portrait:w-auto mobile:portrait:origin-bottom mobile:portrait:-translate-x-[50%] mobile:portrait:translate-y-0 mobile:portrait:scale-[100%]",
                  )}>
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: easing.pop, delay: 0.1 }}
                    className={cn("relative h-full w-auto")}>
                    <Image
                      src="/images/home/tech-1-visual-1.png"
                      alt=""
                      width={584}
                      height={822}
                      className={cn("h-full w-auto max-w-none", "mobile:-translate-x-[10%]")}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: getValue({ mobile: 0, pc: 100 }) }}
                    animate={{ opacity: 1, x: getValue({ mobile: 100, pc: 200 }) }}
                    transition={{ duration: 0.6, ease: easing.pop, delay: 0.3 }}
                    className={cn(
                      "absolute left-0 top-0 h-full w-auto",
                      "mobile:portrait:!translate-x-[50px]",
                    )}>
                    <Image
                      src="/images/home/tech-1-visual-2.png?ver=2"
                      alt=""
                      width={584}
                      height={822}
                      className={cn("relative h-full w-auto")}
                    />
                    <RadialMark className={cn("absolute left-[34%] top-[45.6%]")} />
                    <RadialMark className={cn("absolute left-[44.5%] top-[66%]")} />
                    <RadialMark className={cn("absolute bottom-[11.5%] left-[43.5%]")} />
                    <RadialMark className={cn("absolute left-[17.5%] top-[26.5%] scale-[1.5]")} />
                  </motion.div>
                </motion.div>
              )}
              {(currentScene === 2 || currentScene === "after") && (
                <motion.div
                  key="visual-2"
                  variants={visualWrapperVariants}
                  initial="default"
                  animate="active"
                  exit="default"
                  transition={visualWrapperTransition}
                  className={cn(
                    "absolute left-0 top-1/2 h-[70%] max-h-[781px] -translate-x-[20%] -translate-y-1/2",
                    "tablet:portrait:left-auto tablet:portrait:right-0 tablet:portrait:top-0 tablet:portrait:h-full tablet:portrait:w-full tablet:portrait:-translate-x-[0%] tablet:portrait:translate-y-0 tablet:portrait:scale-100",
                    "tablet:flex tablet:translate-x-0 tablet:justify-end tablet:landscape:w-2/3 tablet:landscape:max-w-[650px]",
                    "mobile:portrait:!left-auto mobile:portrait:!top-1/2 mobile:portrait:right-[-15px] mobile:portrait:!h-full mobile:portrait:!max-h-[470px] mobile:portrait:!w-full mobile:portrait:!-translate-y-1/2 mobile:portrait:!translate-x-0 mobile:portrait:!scale-[100%]",
                    "mobile:flex mobile:justify-end",
                  )}>
                  {/* 모델 */}
                  <motion.div
                    initial={{ x: -200 }}
                    animate={{ x: getValue({ mobile: 0, tablet: 0, pc: 480 }) }}
                    transition={{ duration: 0.6, ease: easing.pop, delay: 0.25 }}
                    className={cn("relative z-20 h-full w-auto")}>
                    <Image
                      src="/images/home/tech-2-visual.png"
                      alt=""
                      width={422}
                      height={781}
                      className={cn("h-full w-auto")}
                    />
                  </motion.div>
                  {/* 그래프 */}
                  <motion.div
                    initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                    animate={{ clipPath: "inset(0 0 0 0)" }}
                    transition={{ duration: 0.6, ease: easing.pop, delay: 0.25 }}
                    className={cn(
                      "absolute bottom-1/2 left-0 w-[646px] translate-y-2/3",
                      "tablet:landscape:left-auto tablet:landscape:right-[105px]",
                      "tablet:portrait:left-auto tablet:portrait:right-[125px] tablet:portrait:w-[100%]",
                      "mobile:!left-auto mobile:right-[75px] mobile:w-full",
                    )}>
                    <Image
                      src="/images/home/tech-2-visual-graph.png?ver=2"
                      alt=""
                      width={1292}
                      height={726}
                      className={cn("w-full")}
                    />
                  </motion.div>
                  {/* 카드 */}
                  <div
                    className={cn(
                      "absolute left-[20%] top-0 flex flex-col gap-4",
                      "tablet:left-0",
                      "mobile:left-[-20px] mobile:origin-top-left mobile:scale-[60%]",
                    )}>
                    <div className={cn("flex gap-4")}>
                      <KeyCard
                        delay={0.25}
                        head={<img src="/images/home/tech-2-visual-card-1-head.svg" alt="" />}
                        body={
                          <div>
                            <WalkingSpeedGraph />
                          </div>
                        }
                      />
                      <KeyCard
                        delay={0.45}
                        head={<img src="/images/home/tech-2-visual-card-2-head.svg" alt="" />}
                        body={
                          <div className={cn("mr-auto")}>
                            <CadenceGraph />
                          </div>
                        }
                      />
                    </div>
                    <div className={cn("flex translate-x-[20%] gap-4", "tablet:translate-x-0")}>
                      <KeyCard
                        delay={0.35}
                        head={<img src="/images/home/tech-2-visual-card-3-head.svg" alt="" />}
                        body={
                          <div>
                            <ROMGraph />
                          </div>
                        }
                      />
                      <KeyCard
                        delay={0.55}
                        head={<img src="/images/home/tech-2-visual-card-4-head.svg" alt="" />}
                        body={
                          <div>
                            <StepsGraph />
                          </div>
                        }
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}

function RadialMark({ className }) {
  const radialScale = useMediaQueryValue({ mobile: 10, tablet: 14, pc: 20 });
  return (
    <div className={cn("absolute h-0 w-0", className)}>
      <svg
        viewBox="-1 -1 2 2"
        style={{
          width: "100px",
          height: "100px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.circle
            key={i}
            cx="0"
            cy="0"
            r={0.05}
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
        <circle cx="0" cy="0" r="0.05" fill="white" style={{ zIndex: 1 }} />
      </svg>
    </div>
  );
}

const keyCardClassNames = {
  container: cn("relative w-[195px]"),
  card: cn("relative h-full rounded-xl bg-black/80 px-3 py-4 flex flex-col"),
  header: cn(
    "flex gap-1.5 border-b border-b-[#D1D2DB] pb-[0.6em] font-semibold text-dd-gray-blue relative",
  ),
  body: cn("pt-[12px] flex items-center h-full justify-center"),
};

function KeyCard({ head, body, delay }) {
  return (
    <div className={cn(keyCardClassNames.container)}>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: easing.pop, delay }}
        className={cn(keyCardClassNames.card)}>
        <div className={cn(keyCardClassNames.header)}>{head}</div>
        <div className={cn(keyCardClassNames.body)}>{body}</div>
      </motion.div>
    </div>
  );
}

const graphTransition = {
  duration: 1,
  ease: easing.pop,
  delay: 0.7,
};

function CadenceGraph() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="133.257"
      height="27.679"
      viewBox="0 0 133.257 27.679"
      initial="hidden"
      animate="visible">
      <motion.line
        x2="123.257"
        transform="translate(5 5)"
        fill="none"
        stroke="#427dff"
        strokeLinecap="round"
        strokeWidth="10"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: graphTransition,
          },
        }}
      />
      <motion.line
        x2="112.234"
        transform="translate(5 22.679)"
        fill="none"
        stroke="#0dd0d0"
        strokeLinecap="round"
        strokeWidth="10"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: graphTransition,
          },
        }}
      />
    </motion.svg>
  );
}

function WalkingSpeedGraph() {
  const graphData = [
    { y2: 3.704, transform: "translate(423.5 477.31)" },
    { y2: 3.704, transform: "translate(432.5 477.31)" },
    { y2: 13.183, transform: "translate(442.5 467.831)" },
    { y2: 1.235, transform: "translate(452.5 479.779)" },
    { y2: 1.235, transform: "translate(462.5 479.779)" },
    { y2: 21.975, transform: "translate(472.5 459.038)" },
    { y2: 6.173, transform: "translate(482.5 474.841)" },
    { y2: 18.518, transform: "translate(492.5 462.495)" },
    { y2: 41.514, transform: "translate(502.5 439.5)" },
    { y2: 30.864, transform: "translate(511.5 450.15)" },
    { y2: 1.235, transform: "translate(521.5 479.779)" },
    { y2: 14.815, transform: "translate(531.5 466.199)" },
    { y2: 18.518, transform: "translate(541.5 462.495)" },
    { y2: 22.222, transform: "translate(551.5 458.792)" },
    { y2: 2.469, transform: "translate(561.5 478.544)" },
    { y2: 2.469, transform: "translate(571.5 478.544)" },
    { y2: 17.284, transform: "translate(581.5 463.73)" },
  ];
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="170"
      height="47"
      viewBox="0 0 170 47"
      initial="hidden"
      animate="visible">
      <defs>
        <clipPath id="clip-path">
          <rect
            width="170"
            height="47"
            transform="translate(417 435)"
            fill="#fff"
            stroke="#707070"
            strokeWidth="1"
          />
        </clipPath>
      </defs>
      <g transform="translate(-417 -435)" clipPath="url(#clip-path)">
        {graphData.map((data, index) => (
          <motion.line
            key={index}
            y1={data.y2}
            y2="0"
            transform={data.transform}
            fill="none"
            stroke="#ee7b3a"
            strokeLinecap="round"
            strokeWidth="5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.03 + graphTransition.delay,
              ease: easing.pop,
            }}
            style={{ originY: "100%" }}
          />
        ))}
      </g>
    </motion.svg>
  );
}

function ROMGraph() {
  return (
    <motion.svg
      className={cn("mx-auto")}
      initial="hidden"
      animate="visible"
      xmlns="http://www.w3.org/2000/svg"
      width="160.254"
      height="64.574"
      viewBox="0 0 160.254 64.574">
      <motion.path
        d="M-1413.761-7919.607s7.966,10.763,13.941,10.763,10.049-3.94,15.526-17.095,4.129-31.031,14.051-31.015,9.006,24.384,17.378,31.015,12.309-3.658,21.148,6.332,6.912,25.042,18.357,25.226,10.651-19.437,24.7-25.226,32.232,10.763,32.232,10.763"
        transform="translate(1415.16 7957.953)"
        fill="none"
        stroke="#0dd0d0"
        strokeLinecap="round"
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: graphTransition,
          },
        }}
      />
      <motion.path
        d="M-1413.937-7925.84s8.718,11.581,14.693,11.581,10.049-3.118,15.526-13.531,2.854-29.827,13.271-29.433,9.708,15.965,18.091,22.831,10.178.264,19.292,6.6,8.98,18.787,19.178,19.646,11.544-16.771,25.595-21.349,31.754,15.234,31.754,15.234"
        transform="translate(1415.379 7964.222)"
        fill="none"
        stroke="#427dff"
        strokeLinecap="round"
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: graphTransition,
          },
        }}
      />
    </motion.svg>
  );
}

function StepsGraph() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="78.598"
      height="80.642"
      viewBox="0 0 78.598 80.642"
      className={cn("mx-auto")}
      initial="hidden"
      animate="visible">
      <g transform="translate(-22332 1717.779)">
        <circle
          cx="36.95"
          cy="36.95"
          r="36.95"
          transform="translate(22334 -1714.445)"
          fill="none"
          stroke="#888"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="4"
          opacity="0.08"
        />
        <motion.path
          data-name="circle-path"
          d="M35.806.5A37.321,37.321,0,1,1,8.758,63.536"
          transform="translate(22334.471 -1715.279)"
          fill="none"
          stroke="#ee7b3a"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="6"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: graphTransition,
            },
          }}
        />
      </g>
      <g transform="translate(-22332 1717.779)">
        <path
          d="M1738.914,674.517c0,4.351-2.739,6.133-3.545,9.1-.4,1.472-.34,1.74.463,3.681.406.979,4.014,10.249-2.761,10.775-8.677.674-6.51-9.852-6.287-11.645.427-3.413-1.853-5.354-1.181-10.909.827-6.827,4.593-8.7,7.468-8.7S1738.914,670.026,1738.914,674.517Z"
          transform="translate(20628.498 -2361.089)"
          fill="rgba(238,123,58,0.61)"
          stroke="#ee7b3a"
          strokeWidth="1"
          opacity="0.52"
        />
        <path
          d="M1820.4,674.517c0,4.351,2.739,6.133,3.547,9.1.4,1.472.338,1.74-.463,3.681-.406.979-4.014,10.249,2.76,10.775,8.677.674,6.511-9.852,6.286-11.645-.425-3.413,1.853-5.354,1.181-10.909-.827-6.827-4.591-8.7-7.467-8.7S1820.4,670.026,1820.4,674.517Z"
          transform="translate(20551.824 -2361.089)"
          fill="rgba(238,123,58,0.61)"
          stroke="#ee7b3a"
          strokeWidth="1"
        />
      </g>
    </motion.svg>
  );
}
