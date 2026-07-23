"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container as GlobalContainer, Br } from "@/features/layout";
import Image from "next/image";
import { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useMediaQueryValue } from "@/shared/hooks/useMediaQuery";

export function ContentCarousel() {
  return <Carousel />;
}

function Carousel() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const swiperRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [current, setCurrent] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const slideIndex = Math.min(Math.floor(latest * 4), 3);

    if (swiper && slideIndex + 1 !== current) {
      swiper.slideTo(slideIndex);
      setCurrent(slideIndex + 1);
    }
  });

  const swiperOptions = {
    modules: [Pagination, EffectFade],
    pagination: {
      type: "progressbar",
      el: ".content-carousel-pagination",
    },
    touchRatio: 0,
    onSwiper: (swiperInstance) => {
      setSwiper(swiperInstance);
    },
    onSlideChange: (swiperInstance) => {
      setCurrent(swiperInstance.activeIndex + 1);
    },
  };

  return (
    <div className={cn("h-[400vh]")} ref={containerRef}>
      <div className={cn("sticky top-0 w-full")}>
        <Swiper ref={swiperRef} className={cn("h-screen")} {...swiperOptions}>
          <SwiperSlide className={cn("overflow-hidden")}>
            {({ isActive }) => <Content1 active={isActive} />}
          </SwiperSlide>
          <SwiperSlide className={cn("overflow-hidden")}>
            {({ isActive }) => <Content2 active={isActive} />}
          </SwiperSlide>
          <SwiperSlide className={cn("overflow-hidden")}>
            {({ isActive }) => <Content3 active={isActive} />}
          </SwiperSlide>
          <SwiperSlide className={cn("overflow-hidden")}>
            {({ isActive }) => <Content4 active={isActive} />}
          </SwiperSlide>
          <nav className={cn("absolute bottom-0 left-0 z-10 w-full")}>
            <GlobalContainer
              className={cn("flex items-center gap-4 py-20", "tablet:portrait:py-10")}>
              <div
                className={cn(
                  "content-carousel-pagination",
                  "!relative",
                  "!h-1 !w-full !bg-white/10",
                  "[&_.swiper-pagination-progressbar-fill]:!bg-white",
                  "[&_.swiper-pagination-progressbar-fill]:!w-full",
                  "[&_.swiper-pagination-progressbar-fill]:!h-full",
                  "[&_.swiper-pagination-progressbar-fill]:!block",
                  "[&_.swiper-pagination-progressbar-fill]:!origin-left",
                )}
              />
              <div className={cn("flex items-center gap-1 font-bold")}>
                <span className={cn("text-white")}>0{current}</span>/
                <span className={cn("text-white/40")}>04</span>
              </div>
            </GlobalContainer>
          </nav>
        </Swiper>
      </div>
    </div>
  );
}

function Content1({ active }) {
  const { langContent } = useLang();

  return (
    <Wrapper>
      <motion.div
        animate={{ scale: 1.2 }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className={cn("absolute left-0 top-0 z-[-1] h-full w-full")}>
        <Image
          src="/images/company/technology/visual-1-bg.jpg?ver=2"
          alt=""
          fill
          priority
          className={cn(
            "-z-[1] h-full w-full object-cover",
            "mobile:hidden tablet:portrait:hidden",
          )}
        />
        <Image
          src="/images/company/technology/visual-1-bg-mo.jpg?ver=3"
          alt=""
          width={721}
          height={1406}
          priority
          className={cn(
            "-z-[1] hidden h-full w-full object-cover",
            "mobile:block tablet:portrait:block",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 hidden h-full w-full bg-[linear-gradient(to_right,rgb(0,0,0,0.6),rgb(0,0,0,0))] tablet:block",
            "tablet:portrait:bg-[linear-gradient(to_bottom,rgb(0,0,0,0.6),rgb(0,0,0,0))]",
          )}
        />
      </motion.div>
      <Container>
        <Content>
          <Title num="01">
            {langContent({
              ko: "정교한 의도 파악 기술",
              en: "Motion Intent Recognition Technology",
            })}
          </Title>
          <Subtitle>
            {langContent({
              ko: (
                <>
                  신체에 부착하는 생체 센서 없이도 <Br />
                  착용자의 보행 의도를 파악
                </>
              ),
              en: (
                <>
                  To detect the user’s motion intent <Br pc />
                  without any attached biosensors
                </>
              ),
            })}
          </Subtitle>
          <Description>
            {langContent({
              ko: (
                <>
                  로봇에 내장된 온디바이스 AI, 생체역학 기반의 알고리즘, 고정밀 센서 등 <Br pc />
                  독자적인 기술을 통해 생체에 부착하는 센서 없이도 <Br pc />
                  보행 의도와 동작 상태를 실시간으로 분석하고 파악합니다.
                </>
              ),
              en: (
                <>
                  Angel Robotics' unique technologies, including On-Device AI, motion analysis
                  algorithms, and integrated sensors, detect the user's motion intent and movement
                  status in real-time, without the need for any biosensors attached to the body.
                </>
              ),
            })}
          </Description>
        </Content>
      </Container>
    </Wrapper>
  );
}

function Content2({ active }) {
  const { langContent } = useLang();

  return (
    <Wrapper>
      <motion.div
        animate={{ scale: 1.5 }}
        transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className={cn("absolute left-0 top-0 z-[-1] h-full w-full")}>
        <Image
          src="/images/company/technology/visual-2-bg.jpg?ver=2"
          alt=""
          fill
          priority
          className={cn(
            "-z-[1] h-full w-full object-cover",
            "mobile:hidden tablet:portrait:hidden",
          )}
        />
        <Image
          src="/images/company/technology/visual-2-bg-mo.jpg?ver=3"
          alt=""
          width={721}
          height={1406}
          priority
          className={cn(
            "-z-[1] hidden h-full w-full object-cover",
            "mobile:block tablet:portrait:block",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 hidden h-full w-full bg-[linear-gradient(to_right,rgb(0,0,0,0.6),rgb(0,0,0,0))] tablet:block",
            "tablet:portrait:bg-[linear-gradient(to_bottom,rgb(0,0,0,0.6),rgb(0,0,0,0))]",
          )}
        />
      </motion.div>
      <Container>
        <Content>
          <Title num="02">
            {langContent({
              ko: (
                <>
                  착용자 중심의 <Br tablet />
                  정밀 제어 기술
                </>
              ),
              en: (
                <>
                  User-Oriented <Br />
                  Precision Control
                </>
              ),
            })}
          </Title>
          <Subtitle>
            {langContent({
              ko: "편한 착용감과 움직임",
              en: "Comfortable fit and natural movement",
            })}
          </Subtitle>
          <Description>
            {langContent({
              ko: (
                <>
                  고정밀 구동기와 각종 제어 기술들을 통해 <Br pc tablet mobile />
                  로봇 착용 시 무게감이나 저항감을 크게 느끼지 <Br mobile />
                  않도록 하며 <Br pc tablet />
                  세밀하고 정교한 보조력을 제공합니다.
                </>
              ),
              en: (
                <>
                  Cutting-edge actuators and advanced control technologies provide <Br pc />
                  smooth and precise assistance, allowing users to experience minimal <Br pc />
                  weight and low resistance while wearing the robot.
                </>
              ),
            })}
          </Description>
        </Content>
      </Container>
    </Wrapper>
  );
}

function Content3({ active }) {
  const { langContent, lang } = useLang();

  return (
    <Wrapper>
      <Image
        src="/images/company/technology/visual-3-bg.jpg"
        alt=""
        fill
        priority
        className={cn("-z-[1] h-full w-full object-cover", "tablet:portrait:hidden")}
      />
      <Image
        src="/images/company/technology/visual-3-bg-mo.jpg"
        alt=""
        fill
        priority
        className={cn("-z-[1] hidden h-full w-full object-cover", "tablet:portrait:block")}
      />
      <Container>
        <Content>
          <Title num="03">
            {langContent({
              ko: "지능형 동작 보조 알고리즘",
              en: (
                <>
                  Intelligent Motion <Br />
                  Assistance Algorithm
                </>
              ),
            })}
          </Title>
          <Subtitle>
            {langContent({
              ko: (
                <>
                  착용자의 보행 상황에 따른 <Br />
                  최적화된 보조 제공
                </>
              ),
              en: (
                <>
                  Optimized assistive support <Br />
                  based on the user’s walking status
                </>
              ),
            })}
          </Subtitle>
          <div className={cn("space-y-3")}>
            <Description>
              {langContent({
                ko: (
                  <>
                    착용자와 로봇간 실시간 상호작용을 통해 보행, 앉기/서기, 계단 오르기 등 <Br pc />
                    실시간 보행 동작과 보행 환경에 최적화된 보조를 제공합니다. <Br />
                    또한 착용자의 상태에 따라 다양한 보조력 설정 및 저장이 가능합니다.
                  </>
                ),
                en: (
                  <>
                    Optimal assistance for various postures, including walking, sitting/standing,{" "}
                    <Br pc />
                    and stair climbing, is provided through real-time interaction between the robot{" "}
                    <Br pc />
                    and the user. Additionally, the customized training programs can be set up with
                    adjustable assistance levels.
                  </>
                ),
              })}
            </Description>
          </div>
        </Content>
        <div className={cn("relative h-full w-full", "mobile:h-full")}>
          <div
            className={cn(
              "absolute left-1/2 top-1/2 mt-[30px] -translate-x-1/2 -translate-y-1/2",
              "tablet:mt-0 tablet:portrait:h-full",
              "mobile:max-h-[450px]",
            )}>
            <div className={cn("relative z-10", "tablet:portrait:h-full")}>
              <Image
                src="/images/company/technology/visual-3-body.png"
                alt=""
                width={395}
                height={743}
                className={cn(
                  "w-full",
                  "tablet:max-w-none tablet:portrait:h-full tablet:portrait:w-auto",
                )}
              />
              <RadialMark className={cn("absolute bottom-[40%] left-[50%] scale-[1]")} />
              <RadialMark className={cn("absolute bottom-[52%] left-[32%] scale-[1]")} />
              <div
                className={cn(
                  "absolute left-full top-0 flex w-[50%] flex-col gap-4",
                  "mobile:bottom-0 mobile:left-0 mobile:top-auto mobile:grid mobile:w-full mobile:grid-cols-2 mobile:gap-1",
                )}>
                <Image
                  src={`/images/company/technology/visual-3-tag-1-${lang}.png`}
                  alt=""
                  width={205}
                  height={72}
                  className={cn("w-full -translate-x-1/4", "mobile:translate-x-0")}
                />
                <Image
                  src={`/images/company/technology/visual-3-tag-2-${lang}.png`}
                  alt=""
                  width={205}
                  height={72}
                  className={cn("w-full")}
                />
                <Image
                  src={`/images/company/technology/visual-3-tag-3-${lang}.png`}
                  alt=""
                  width={205}
                  height={72}
                  className={cn("w-full")}
                />
                <Image
                  src={`/images/company/technology/visual-3-tag-4-${lang}.png`}
                  alt=""
                  width={205}
                  height={72}
                  className={cn("w-full")}
                />
              </div>
            </div>
            <div
              className={cn(
                "absolute bottom-0 left-1/2 z-0 w-[170%] -translate-x-1/2 translate-y-1/4",
              )}>
              <Image
                src="/images/company/technology/visual-3-radial.svg"
                alt=""
                width={807}
                height={294}
                className={cn("w-full")}
              />
            </div>
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

function Content4({ active }) {
  const { langContent } = useLang();

  return (
    <Wrapper>
      <Image
        src="/images/company/technology/visual-4-bg.jpg?ver=2"
        alt=""
        fill
        priority
        className={cn("-z-[1] h-full w-full object-cover")}
      />
      <Container>
        <Content>
          <Title num="04">
            {langContent({
              ko: (
                <>
                  전문적인 데이터 <Br tablet />
                  모니터링 및 분석
                </>
              ),
              en: (
                <>
                  Advanced <Br />
                  Data Monitoring & Analysis
                </>
              ),
            })}
          </Title>
          <Subtitle>
            {langContent({
              ko: "디지털 헬스케어로의 확장",
              en: "Expanding into digital healthcare solution",
            })}
          </Subtitle>
          <Description>
            {langContent({
              ko: (
                <>
                  전용 애플리케이션을 통해 착용자의 동작 데이터를 실시간으로 모니터링합니다.{" "}
                  <Br pc />
                  분석 리포트를 통해 보행 주기, 관절 각도, 보행 지표 등 다양한 정보를 확인 가능하며,{" "}
                  <Br pc />
                  축적된 데이터를 활용하여 착용자의 보행 변화를 확인하고 <Br pc />
                  보다 효율적인 목표를 설정할 수 있습니다.
                </>
              ),
              en: (
                <>
                  User motion data is monitored in real-time through a dedicated application.{" "}
                  <Br pc />A comprehensive motion analysis report is generated, providing insights
                  into gait cycles, joint angles, walking speed, and more, enabling the tracking of
                  changes over time and the setting of more effective training goals.
                </>
              ),
            })}
          </Description>
        </Content>
        <div className={cn("relative h-full w-full", "mobile:h-full")}>
          <div
            className={cn(
              "absolute right-0 top-1/2 h-full max-h-[793px] -translate-y-1/2",
              "tablet:origin-bottom-right tablet:landscape:translate-x-[10%] tablet:landscape:scale-[90%]",
              "mobile:translate-x-[10%]",
            )}>
            <motion.div
              initial={{ opacity: 0, x: "-50%" }}
              animate={active ? { opacity: 1, x: "0%" } : { opacity: 0, x: "-50%" }}
              transition={{ duration: 1.2, ease: easing.pop }}
              className={cn("relative z-10 h-full w-full")}>
              <Image
                src="/images/company/technology/visual-4-body.png"
                alt=""
                width={1191}
                height={793}
                className={cn("h-full w-auto max-w-none")}
              />
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={
                active ? { clipPath: "inset(0 0 0 0)" } : { clipPath: "inset(0% 100% 0% 0%)" }
              }
              transition={{ duration: 1.2, ease: easing.pop }}
              className={cn("absolute left-0 top-0 z-0 h-full w-full")}>
              <Image
                src="/images/company/technology/visual-4-graph.png"
                alt=""
                width={1191}
                height={793}
                className={cn("h-full w-auto max-w-none")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: easing.pop }}
              className={cn("absolute left-0 top-0 z-0 h-full w-full")}>
              <Image
                src="/images/company/technology/visual-4-radial.svg"
                alt=""
                width={1191}
                height={793}
                className={cn("h-full w-auto max-w-none")}
              />
            </motion.div>
            {active && (
              <div
                className={cn(
                  "absolute right-[35%] top-0 flex flex-col gap-4",
                  "tablet:landscape:right-[25%] tablet:landscape:origin-top-right tablet:landscape:scale-[90%]",
                  "mobile:!right-[15%]",
                  "mobile:!scale-[60%]",
                  "mobile:!origin-top",
                )}>
                <div className={cn("flex gap-4")}>
                  <KeyCard
                    delay={0.7}
                    head={<img src="/images/home/tech-2-visual-card-1-head.svg" alt="" />}
                    body={
                      <div>
                        <WalkingSpeedGraph />
                      </div>
                    }
                  />
                  <KeyCard
                    delay={0.7}
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
                    delay={0.7}
                    head={<img src="/images/home/tech-2-visual-card-3-head.svg" alt="" />}
                    body={
                      <div>
                        <ROMGraph />
                      </div>
                    }
                  />
                  <KeyCard
                    delay={0.7}
                    head={<img src="/images/home/tech-2-visual-card-4-head.svg" alt="" />}
                    body={
                      <div>
                        <StepsGraph />
                      </div>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
}

function RadialMark({ className, scales = { mobile: 10, tablet: 14, pc: 20 } }) {
  const radialScale = useMediaQueryValue(scales);
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

function Wrapper({ children, className, ...props }) {
  return (
    <div className={cn("flex h-full w-full items-center text-[#9C9C9C]", className)} {...props}>
      {children}
    </div>
  );
}

function Container({ children, className, ...props }) {
  return (
    <GlobalContainer
      className={cn(
        "flex h-full items-center justify-between py-[100px]",
        "tablet:landscape:w-[1000px] tablet:landscape:max-w-[calc(100%-200px)] tablet:landscape:py-[80px]",
        "tablet:portrait:flex-col tablet:portrait:gap-[40px]",
        "mobile:justify-start mobile:!gap-[30px] mobile:pb-[100px] mobile:pt-[70px]",
        className,
      )}
      {...props}>
      {children}
    </GlobalContainer>
  );
}

function Content({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "relative z-10 w-1/2 flex-shrink-0",
        "tablet:portrait:w-full tablet:portrait:text-center",
        "mobile:w-full mobile:!text-left",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function Title({ children, num, className, ...props }) {
  return (
    <h2
      className={cn(
        "mb-[0.8em] text-5xl/[1.1] font-bold text-dd-blue",
        "tablet:text-4xl/[1.3]",
        "mobile:mb-[0.4em] mobile:text-xl/[1.3]",
        className,
      )}
      {...props}>
      <span className={cn("block")}>{num}.</span>
      {children}
    </h2>
  );
}

function Subtitle({ children, className, ...props }) {
  return (
    <h2
      className={cn(
        "mb-[0.5em] text-3xl/[1.3] font-bold text-white",
        "tablet:text-2xl/[1.5]",
        "mobile:text-base/[1.6]",
        className,
      )}
      {...props}>
      {children}
    </h2>
  );
}

function Description({ children, className, ...props }) {
  return (
    <p className={cn("text-lg/[1.6] text-white/80", "mobile:text-sm/[1.6]", className)} {...props}>
      {children}
    </p>
  );
}
