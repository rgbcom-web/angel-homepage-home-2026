"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br, BulletList } from "@/features/layout";
import NextImage from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function Features() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end end"],
  });

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative z-10 h-[400vh]",
        "tablet:portrait:h-[500vh] tablet-only:portrait:mt-[-30vh]",
        "mobile:!h-[500vh] mobile:portrait:mt-[-50px]",
      )}>
      <div
        ref={wrapperRef}
        className={cn(
          "sticky top-0 flex h-screen items-center overflow-hidden pt-20",
          "tablet:pb-10 tablet:pt-10",
          "tablet:portrait:pb-0 tablet:portrait:pt-20",
          "mobile:portrait:pb-0 mobile:portrait:pt-5",
        )}>
        <div className={cn("relative w-full")}>
          <Feature_1 scrollYProgress={scrollYProgress} />
          <Feature_1_portrait scrollYProgress={scrollYProgress} />
          <Feature_2 scrollYProgress={scrollYProgress} />
          <Feature_2_portrait scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}

const contentClasses = {
  contentbox: cn(
    "absolute left-0 top-0 flex h-0 w-0 items-center justify-center",
    "tablet:portrait:relative tablet:portrait:items-start tablet:portrait:w-full tablet:portrait:h-auto tablet:portrait:text-center tablet:portrait:left-0 tablet:portrait:top-0 tablet:portrait:right-0 tablet:portrait:bottom-0",
  ),
  contentbox_inner: cn(
    "absolute top-1/2 h-[2px] -translate-y-1/2 whitespace-nowrap",
    "tablet:portrait:relative tablet:portrait:top-0 tablet:portrait:h-auto tablet:portrait:translate-y-0 tablet:portrait:!w-full",
    "mobile:whitespace-normal",
  ),
  contentbox_head: cn(
    "absolute bottom-full overflow-hidden w-full",
    "tablet:portrait:relative tablet:portrait:bottom-0 tablet:portrait:w-auto tablet:portrait:h-auto",
  ),
  contentbox_head_inner: cn("pb-3", "tablet:portrait:pb-0"),
  contentbox_title: cn(
    "block text-[40px]/[1.3] font-bold text-dd-mint",
    "tablet:text-2xl",
    "tablet-only:portrait:text-3xl",
    "tablet-only:portrait:text-center",
    "mobile:text-lg mobile:text-center",
  ),
  contentbox_title_en: cn("text-3xl/[1.3]", "tablet:text-xl/[1.3]", "mobile:text-lg/[1.3]"),
  contentbox_line: cn("h-full w-full bg-dd-mint", "tablet:portrait:hidden"),
  contentbox_content: cn(
    "overflow-hidden flex",
    "tablet:portrait:justify-center",
    "tablet:portrait:items-center",
    "tablet:portrait:!text-center",
  ),
  contentbox_content_inner: cn("pt-5", "tablet:portrait:pt-2"),
  contentbox_text: cn(
    "text-[22px]/[1.5] [&_b]:text-dd-mint",
    "tablet:text-base/[1.5]",
    "tablet-only:portrait:text-lg",
    "mobile:text-sm",
  ),
  contentbox_text_en: cn("text-xl/[1.5]", "mobile:text-sm/[1.5]"),
};

function Feature_1({ scrollYProgress }) {
  const { langContent, isEng } = useLang();
  const [active, setActive] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(latest >= 0 && latest < 0.5);
  });

  const delays = active ? [0, 0.3] : [0.3, 0];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
      className={cn("w-full mobile:hidden tablet:portrait:hidden")}>
      <Container className={cn("relative flex flex-col items-center")}>
        <Header>
          <Title>
            {langContent({
              ko: "동작 분석 기반 보행 훈련 보조",
              en: (
                <>
                  Detecting Motion Intent and <Br tablet />
                  Providing Adaptive Assistance
                </>
              ),
            })}
          </Title>
          <Description>
            {langContent({
              ko: (
                <>
                  실시간 동작 분석을 통해 사용자의 상태를 반영하고, 개별 보조력 설정으로 <Br />
                  엉덩 관절의 굽힘(Flexion)과 폄(Extension)의 보조를 지원합니다.
                </>
              ),
              en: (
                <>
                  To detect human motion in real time and provide personalized flexion <Br tablet />
                  and extension assistance for the hip joint.
                </>
              ),
            })}
          </Description>
        </Header>
        <div className={cn("relative")}>
          <div className={cn("relative")}>
            <ProductImage src="feature-1-product.png" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
              className={cn(
                "absolute left-[13.3550488599349%] top-[23.2857142857143%] w-[7.0032573289902%]",
              )}>
              <Image
                src="feature-1-part-left.svg"
                width={43}
                height={150}
                className={cn("w-full")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
              className={cn(
                "absolute right-[11.400651465798%] top-[22.8571428571429%] w-[8.4690553745928%]",
              )}>
              <Image
                src="feature-1-part-right.svg"
                width={52}
                height={153}
                className={cn("w-full")}
              />
            </motion.div>
            {/* Guage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
              className={cn(
                "absolute right-[4.400651465798%] top-[22.8571428571429%]",
                "w-[5.5374592833876%]",
              )}>
              <GuageAnimation active={active} />
            </motion.div>
          </div>
          {/* Content left */}
          <div className={cn(contentClasses.contentbox, "left-[14%] top-[27%]")}>
            <CircleMark
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            />
            <div
              className={cn(
                contentClasses.contentbox_inner,
                "right-0 w-[480px]",
                "tablet:landscape:w-[280px]",
              )}>
              <div className={cn(contentClasses.contentbox_head)}>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: active ? "0%" : "100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_head_inner)}>
                  <span
                    className={cn(
                      contentClasses.contentbox_title,
                      isEng && contentClasses.contentbox_title_en,
                    )}>
                    {langContent({
                      ko: "행동 의도 파악",
                      en: "Motion Intent Recognition",
                    })}
                  </span>
                </motion.h3>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
                className={cn(contentClasses.contentbox_line, "origin-right")}
              />
              <div className={cn(contentClasses.contentbox_content)}>
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: active ? "0%" : "-100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_content_inner, "space-y-6")}>
                  <p
                    className={cn(
                      contentClasses.contentbox_text,
                      isEng && contentClasses.contentbox_text_en,
                    )}>
                    {langContent({
                      ko: (
                        <>
                          실시간으로 <b>동작 상태를 인지</b>하고 <Br tablet />
                          분석하는 <Br pc />
                          알고리즘을 통한 자연스러운 <Br tablet />
                          보행 보조 경험 제공
                        </>
                      ),
                      en: (
                        <>
                          Providing a natural walking assistance <Br pc tablet />
                          experience through algorithms that <Br pc tablet />
                          <b>recognize and analyze</b> movement <Br pc tablet />
                          patterns in real-time
                        </>
                      ),
                    })}
                  </p>
                  <WalkingAnimation active={active} />
                </motion.div>
              </div>
            </div>
          </div>
          {/* Content right */}
          <div className={cn(contentClasses.contentbox, "left-[83%] top-[43%]")}>
            <CircleMark
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            />
            <div
              className={cn(
                contentClasses.contentbox_inner,
                "left-0 w-[470px] text-right",
                "tablet:w-[260px]",
              )}>
              <div className={cn(contentClasses.contentbox_head)}>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: active ? "0%" : "100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_head_inner)}>
                  <span
                    className={cn(
                      contentClasses.contentbox_title,
                      isEng && contentClasses.contentbox_title_en,
                    )}>
                    {langContent({
                      ko: "최대 보조력",
                      en: (
                        <>
                          Maximum <Br tablet />
                          Assistive Torque
                        </>
                      ),
                    })}
                  </span>
                </motion.h3>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
                className={cn(contentClasses.contentbox_line, "origin-left")}
              />
              <div className={cn(contentClasses.contentbox_content, "justify-end text-left")}>
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: active ? "0%" : "-100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_content_inner)}>
                  <div
                    className={cn("mb-2 ml-[-0.05em] text-[78px]/[1]", "tablet:text-[54px]/[1]")}>
                    <strong className={cn("font-bold text-white")}>15</strong>
                    <small className={cn("text-[0.5em]/[1] font-bold text-dd-gray-dark")}>Nm</small>
                  </div>
                  <p
                    className={cn(
                      contentClasses.contentbox_text,
                      isEng && contentClasses.contentbox_text_en,
                    )}>
                    {langContent({
                      ko: (
                        <>
                          좌/우 및 굽힘근/폄근 <Br />
                          보조력 개별 조정
                        </>
                      ),
                      en: (
                        <>
                          Independently adjustable for <Br />
                          the flexion and extension <Br />
                          assistance levels of <Br />
                          each side (left and right)
                        </>
                      ),
                    })}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
          <span className={cn("noti block text-center text-white/40")}>
            * 사용 목적: 근육의 재건, 관절 운동의 회복 등에 사용하는 전동식 기구
          </span>
        </div>
      </Container>
    </motion.section>
  );
}

function Feature_1_portrait({ scrollYProgress }) {
  const { langContent, isEng } = useLang();
  const { getValue } = useMediaQuery();
  const [active, setActive] = useState(true);
  const [scene, setScene] = useState(0);

  const sceneProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useMotionValueEvent(sceneProgress, "change", (latest) => {
    setActive(latest >= 0 && latest < 1);
    setScene(latest > 0.5 && latest <= 1 ? 1 : 0);
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
      className={cn("hidden w-full", "mobile:block tablet:portrait:block")}>
      <Container className={cn("relative flex flex-col items-center")}>
        <Header>
          <Title>
            {langContent({
              ko: "동작 분석 기반 보행 훈련 보조",
              en: (
                <>
                  Detecting Motion Intent and <Br />
                  Providing Adaptive Assistance
                </>
              ),
            })}
          </Title>
          <Description>
            {langContent({
              ko: (
                <>
                  실시간 동작 분석을 통해 사용자의 상태를 반영하고, <Br mobile />
                  개별 보조력 설정으로 <Br pc tablet />
                  엉덩 관절의 굽힘(Flexion)과 <Br mobile />
                  폄(Extension)의 보조를 지원합니다.
                  <small className={cn("noti block text-center mt-2 text-white/40", "mobile:text-[12px]")}>
                    * 사용 목적: 근육의 재건, 관절 운동의 회복 등에 사용하는 전동식 기구
                  </small>
                </>
              ),
              en: (
                <>
                  Detecting human motion in real time and providing personalized flexion{" "}
                  <Br tablet />
                  and extension assistance for the hip joint.
                </>
              ),
            })}
          </Description>
        </Header>
        <div className={cn("relative flex flex-col items-center")}>
          <motion.div
            animate={{
              scale: scene === 0 ? 1 : 1.2,
              x: scene === 0 ? 0 : "-50%",
              marginBottom: scene === 0 ? "0vh" : "-10vh",
            }}
            transition={{ duration: 0.5, ease: easing.pop }}
            className={cn("relative origin-top")}>
            <motion.div
              animate={{
                height:
                  scene === 0
                    ? getValue({ tablet: "35vh", mobile: "30vh" })
                    : getValue({ tablet: "55vh", mobile: "45vh" }),
              }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn("h-full")}>
              <ProductImage src="feature-1-product.png" />
              <div
                className={cn(
                  "absolute left-[13.3550488599349%] top-[23.2857142857143%] w-[7.0032573289902%]",
                )}>
                <Image
                  src="feature-1-part-left.svg"
                  width={43}
                  height={150}
                  className={cn("w-full")}
                />
              </div>
              <div
                className={cn(
                  "absolute right-[11.400651465798%] top-[22.8571428571429%] w-[8.4690553745928%]",
                )}>
                <Image
                  src="feature-1-part-right.svg"
                  width={52}
                  height={153}
                  className={cn("w-full")}
                />
              </div>
              {/* Guage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scene === 1 ? 1 : 0 }}
                transition={{ duration: 0.5, ease: easing.pop }}
                className={cn(
                  "absolute right-[4.400651465798%] top-[22.8571428571429%]",
                  "w-[5.5374592833876%]",
                )}>
                <GuageAnimation active={scene === 1} />
              </motion.div>
            </motion.div>
          </motion.div>
          <div className={cn("tablet:portrait:relative")}>
            {/* Content 1 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene === 0 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(contentClasses.contentbox)}>
              <div className={cn(contentClasses.contentbox_inner)}>
                <div className={cn(contentClasses.contentbox_head)}>
                  <h3 className={cn(contentClasses.contentbox_head_inner)}>
                    <span
                      className={cn(
                        contentClasses.contentbox_title,
                        isEng && contentClasses.contentbox_title_en,
                      )}>
                      {langContent({
                        ko: "행동 의도 파악",
                        en: "Motion Intent Recognition",
                      })}
                    </span>
                  </h3>
                </div>
                <div className={cn(contentClasses.contentbox_line)} />
                <div className={cn(contentClasses.contentbox_content)}>
                  <div className={cn(contentClasses.contentbox_content_inner, "space-y-6")}>
                    <p
                      className={cn(
                        contentClasses.contentbox_text,
                        isEng && contentClasses.contentbox_text_en,
                      )}>
                      {langContent({
                        ko: (
                          <>
                            실시간으로 <b>동작 상태를 인지</b>하고 <Br tablet />
                            분석하는 <Br pc mobile />
                            알고리즘을 통한 자연스러운 <Br tablet />
                            보행 보조 경험 제공
                          </>
                        ),
                        en: (
                          <>
                            Recognizing and analyzing human motion in real time <Br tablet />
                            and providing a natural walking assistance experience <Br tablet />
                            through algorithms.
                          </>
                        ),
                      })}
                    </p>
                    <WalkingAnimation active={scene === 0} />
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Content 2 */}
            <motion.div
              initial={{ opacity: 0, y: "30%" }}
              animate={{ opacity: scene === 1 ? 1 : 0, y: scene === 1 ? 0 : "30%" }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(
                contentClasses.contentbox,
                "!absolute !left-2/3 !top-[-100%] !items-start !text-left",
                "mobile:!left-[60%] mobile:!top-[-50%]",
                isEng && "mobile:!left-[60%] mobile:!top-[-70%]",
              )}>
              <div className={cn(contentClasses.contentbox_inner)}>
                <div className={cn(contentClasses.contentbox_head)}>
                  <h3 className={cn(contentClasses.contentbox_head_inner)}>
                    <span
                      className={cn(
                        contentClasses.contentbox_title,
                        "!text-left",
                        isEng && contentClasses.contentbox_title_en,
                      )}>
                      {langContent({
                        ko: "최대 보조력",
                        en: (
                          <>
                            Maximum <Br />
                            Assistive <Br />
                            Torque
                          </>
                        ),
                      })}
                    </span>
                  </h3>
                </div>
                <div className={cn(contentClasses.contentbox_content, "!justify-start text-left")}>
                  <div className={cn(contentClasses.contentbox_content_inner, "!text-left")}>
                    <div
                      className={cn("mb-2 ml-[-0.05em] text-[78px]/[1]", "tablet:text-[54px]/[1]")}>
                      <strong className={cn("font-bold text-white")}>15</strong>
                      <small className={cn("text-[0.5em]/[1] font-bold text-dd-gray-dark")}>
                        Nm
                      </small>
                    </div>
                    <p
                      className={cn(
                        contentClasses.contentbox_text,
                        isEng && contentClasses.contentbox_text_en,
                      )}>
                      {langContent({
                        ko: (
                          <>
                            좌/우 및 굽힘근/폄근 <Br />
                            보조력 개별 조정
                          </>
                        ),
                        en: (
                          <>
                            Independently <Br />
                            adjustable for <Br />
                            assistance levels of <Br />
                            each side <Br />
                            (left and right)
                          </>
                        ),
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

function Feature_2({ scrollYProgress }) {
  const { langContent, isEng } = useLang();
  const [active, setActive] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActive(latest > 0.5 && latest <= 1);
  });

  const delays = active ? [0.3, 0.6] : [0.6, 0.3];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
      className={cn("absolute left-0 top-0 w-full", "mobile:hidden tablet:portrait:hidden")}>
      <Container className={cn("relative flex flex-col items-center")}>
        <Header>
          <Title>
            {langContent({
              ko: "사용 편의성을 높인 디자인",
              en: "Design for Enhanced Usability",
            })}
          </Title>
          <Description>
            {langContent({
              ko: (
                <>
                  단관절 보조 설계를 통해 간편하고 효율적인 사용이 가능하며, 다양한 환경에서 훈련이
                  가능합니다. <Br />
                  손쉬운 배터리 교체와 경량 디자인으로 사용 편의성을 더했습니다.
                </>
              ),
              en: (
                <>
                  The streamlined assistive structure allows for easy and efficient use, making it
                  suitable for training in various environments. <Br pc />
                  Convenient battery replacement and light weight design ensure user comfort.
                </>
              ),
            })}
          </Description>
        </Header>
        <div className={cn("relative")}>
          <ProductImage src="feature-2-product.png" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            className={cn("absolute left-[9.9348534201954%] top-[36%] w-[28.5016286644951%]")}>
            <Image
              src="feature-2-part-left.svg"
              width={175}
              height={160}
              className={cn("w-full")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "20%" }}
            animate={{ opacity: active ? 1 : 0, x: active ? 0 : "20%" }}
            transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            className={cn(
              "absolute right-[24.4299674267101%] top-[35.8571428571429%] w-[35.6677524429967%]",
            )}>
            <Image
              src="feature-2-part-arrow-1.svg"
              width={219}
              height={99}
              className={cn("w-full")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "20%" }}
            animate={{ opacity: active ? 1 : 0, x: active ? 0 : "20%" }}
            transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            className={cn(
              "absolute left-[21.8241042345277%] top-[13.1428571428571%] w-[28.1758957654723%]",
            )}>
            <Image
              src="feature-2-part-arrow-2.svg"
              width={173}
              height={84}
              className={cn("w-full")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: "-20%" }}
            animate={{ opacity: active ? 1 : 0, x: active ? 0 : "-20%" }}
            transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            className={cn(
              "absolute right-[24.4299674267101%] top-[13.1428571428571%] w-[28.1758957654723%]",
            )}>
            <Image
              src="feature-2-part-arrow-2.svg"
              width={173}
              height={84}
              className={cn("w-full rotate-180")}
            />
          </motion.div>
          {/* Content left */}
          <div className={cn(contentClasses.contentbox, "left-[20%] top-[38%]")}>
            <CircleMark
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            />
            <div
              className={cn(
                contentClasses.contentbox_inner,
                "right-[60px] top-[-35px] w-[380px]",
                "tablet:landscape:w-[250px]",
              )}>
              <div className={cn(contentClasses.contentbox_head)}>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: active ? "0%" : "100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_head_inner)}>
                  <span
                    className={cn(
                      contentClasses.contentbox_title,
                      isEng && contentClasses.contentbox_title_en,
                    )}>
                    {langContent({
                      ko: "편리함",
                      en: (
                        <>
                          Convenient <Br />
                          Battery Management
                        </>
                      ),
                    })}
                  </span>
                </motion.h3>
              </div>
              <div className={cn(contentClasses.contentbox_line, "bg-transparent")}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: active ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: active ? delays[0] + 0.2 : delays[0],
                    ease: easing.pop,
                  }}
                  className={cn(contentClasses.contentbox_line, "origin-right")}
                />
                <div
                  className={cn(
                    "absolute left-full top-0 h-full w-[70px] origin-left rotate-[30deg]",
                  )}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.2, delay: delays[0], ease: easing.pop }}
                    className={cn(contentClasses.contentbox_line, "origin-right")}
                  />
                </div>
              </div>
              <div className={cn(contentClasses.contentbox_content)}>
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: active ? "0%" : "-100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_content_inner, "space-y-3")}>
                  <p
                    className={cn(
                      contentClasses.contentbox_text,
                      isEng && contentClasses.contentbox_text_en,
                    )}>
                    {langContent({
                      ko: "간편한 배터리 교체와 잔량 확인 LED",
                      en: (
                        <>
                          Easy battery replacement and <Br />
                          LED battery level indicator
                        </>
                      ),
                    })}
                  </p>
                  <BulletList
                    items={langContent({
                      ko: [
                        // <>
                        //   배터리 사용 시간은 약 120분이며 <Br tablet />
                        //   (보조력 중간) <Br pc />
                        //   사용 환경에 따라 <Br tablet />
                        //   달라 질 수 있습니다.
                        // </>,
                        // <>배터리 완충 시간은 약 90분입니다.</>,
                      ],
                      en: [
                        <>
                          The operating time is approximately <Br tablet />
                          120 minutes <Br pc />
                          under moderate <Br tablet />
                          assistance and may vary depending <Br pc tablet />
                          on usage conditions.
                        </>,
                        <>
                          Full charging time is approximately <Br tablet />
                          90 minutes.
                        </>,
                      ],
                    })}
                    className={{ root: cn("text-dd-gray", "tablet:landscape:text-sm") }}
                  />
                  <Image
                    src="feature-2-battery-thumb.png"
                    width={440}
                    height={200}
                    className={cn("w-[220px]", "tablet:landscape:w-[180px]")}
                  />
                </motion.div>
              </div>
            </div>
          </div>
          {/* Content right */}
          <div className={cn(contentClasses.contentbox, "left-[60%] top-[43%]")}>
            <CircleMark
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0 }}
              transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
            />
            <div
              className={cn(
                contentClasses.contentbox_inner,
                "left-0 w-[530px] text-right",
                "tablet:landscape:w-[350px]",
              )}>
              <div className={cn(contentClasses.contentbox_head)}>
                <motion.h3
                  initial={{ y: "100%" }}
                  animate={{ y: active ? "0%" : "100%" }}
                  transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                  className={cn(contentClasses.contentbox_head_inner)}>
                  <span
                    className={cn(
                      contentClasses.contentbox_title,
                      isEng && contentClasses.contentbox_title_en,
                    )}>
                    {langContent({
                      ko: "조절 가능한 사이즈",
                      en: "Customizable Fit",
                    })}
                  </span>
                </motion.h3>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration: 0.5, delay: delays[0], ease: easing.pop }}
                className={cn(contentClasses.contentbox_line, "origin-left")}
              />
              {!isEng && (
                <div className={cn(contentClasses.contentbox_content, "justify-end text-left")}>
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: active ? "0%" : "-100%" }}
                    transition={{ duration: 0.5, delay: delays[1], ease: easing.pop }}
                    className={cn(contentClasses.contentbox_content_inner)}>
                    <p className={cn(contentClasses.contentbox_text)}>허리둘레 : 24~40 inch</p>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
          <span className={cn("noti block text-center text-white/40")}>
            * 사용 목적: 근육의 재건, 관절 운동의 회복 등에 사용하는 전동식 기구
          </span>
        </div>
      </Container>
    </motion.section>
  );
}

function Feature_2_portrait({ scrollYProgress }) {
  const { langContent, isEng } = useLang();
  const { getValue } = useMediaQuery();
  const [active, setActive] = useState(false);
  const [scene, setScene] = useState(0);

  const sceneProgress = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  useMotionValueEvent(sceneProgress, "change", (latest) => {
    setActive(latest > 0 && latest <= 1);
    setScene(latest > 0.5 && latest <= 1 ? 1 : 0);
  });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
      className={cn("absolute left-0 top-0 hidden w-full", "mobile:block tablet:portrait:block")}>
      <Container className={cn("relative flex flex-col items-center")}>
        <Header>
          <Title>
            {langContent({
              ko: "사용 편의성을 높인 디자인",
              en: "Design for Enhanced Usability",
            })}
          </Title>
          <Description>
            {langContent({
              ko: (
                <>
                  단관절 보조 설계를 통해 간편하고 효율적인 사용이 가능하며, 다양한 환경에서 훈련이
                  가능합니다. <Br pc tablet />
                  손쉬운 배터리 교체와 경량 디자인으로 사용 편의성을 더했습니다.
                  <small className={cn("noti block text-center mt-2 text-white/40", "mobile:text-[12px]")}>
                    * 사용 목적: 근육의 재건, 관절 운동의 회복 등에 사용하는 전동식 기구
                  </small>
                </>
              ),
              en: (
                <>
                  The streamlined assistive structure allows for easy and efficient use, making it
                  suitable for training in various environments. Convenient battery replacement and
                  light weight design ensure user comfort.
                </>
              ),
            })}
          </Description>
        </Header>
        <div className={cn("relative flex flex-col items-center")}>
          <motion.div
            animate={{
              height:
                scene === 0
                  ? getValue({ tablet: "40vh", mobile: "30vh" })
                  : getValue({ tablet: "60vh", mobile: "50vh" }),
            }}
            transition={{ duration: 0.5, ease: easing.pop }}
            className={cn("relative")}>
            <ProductImage src="feature-2-product.png" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene === 0 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn("absolute left-[9.9348534201954%] top-[36%] w-[28.5016286644951%]")}>
              <Image
                src="feature-2-part-left.svg"
                width={175}
                height={160}
                className={cn("w-full")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: "20%" }}
              animate={{ opacity: scene === 1 ? 1 : 0, x: scene === 1 ? 0 : "20%" }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(
                "absolute right-[24.4299674267101%] top-[35.8571428571429%] w-[35.6677524429967%]",
              )}>
              <Image
                src="feature-2-part-arrow-1.svg"
                width={219}
                height={99}
                className={cn("w-full")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: "20%" }}
              animate={{ opacity: scene === 1 ? 1 : 0, x: scene === 1 ? 0 : "20%" }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(
                "absolute left-[21.8241042345277%] top-[13.1428571428571%] w-[28.1758957654723%]",
              )}>
              <Image
                src="feature-2-part-arrow-2.svg"
                width={173}
                height={84}
                className={cn("w-full")}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: "-20%" }}
              animate={{ opacity: scene === 1 ? 1 : 0, x: scene === 1 ? 0 : "-20%" }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(
                "absolute right-[24.4299674267101%] top-[13.1428571428571%] w-[28.1758957654723%]",
              )}>
              <Image
                src="feature-2-part-arrow-2.svg"
                width={173}
                height={84}
                className={cn("w-full rotate-180")}
              />
            </motion.div>
          </motion.div>
          <div className={cn("relative")}>
            {/* Content left */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene === 0 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(contentClasses.contentbox)}>
              <div className={cn(contentClasses.contentbox_inner)}>
                <div className={cn(contentClasses.contentbox_head)}>
                  <h3 className={cn(contentClasses.contentbox_head_inner)}>
                    <span
                      className={cn(
                        contentClasses.contentbox_title,
                        isEng && contentClasses.contentbox_title_en,
                      )}>
                      {langContent({
                        ko: "편리함",
                        en: "Convenient",
                      })}
                    </span>
                  </h3>
                </div>
                <div className={cn(contentClasses.contentbox_content)}>
                  <div
                    className={cn(
                      contentClasses.contentbox_content_inner,
                      "space-y-3",
                      "mobile:space-y-2",
                    )}>
                    <p
                      className={cn(
                        contentClasses.contentbox_text,
                        isEng && contentClasses.contentbox_text_en,
                      )}>
                      {langContent({
                        ko: "간편한 배터리 교체와 잔량 확인 LED",
                        en: "Easy battery replacement and LED battery level indicator",
                      })}
                    </p>
                    <BulletList
                      items={langContent({
                        ko: [
                          // <>
                          //   배터리 사용 시간은 약 120분이며 (보조력 중간) <Br />
                          //   사용 환경에 따라 달라 질 수 있습니다.
                          // </>,
                          // <>배터리 완충 시간은 약 90분입니다.</>,
                        ],
                        en: [
                          <>
                            The operating time is approximately <Br tablet />
                            120 minutes <Br pc />
                            under moderate <Br tablet />
                            assistance and may vary depending <Br pc tablet />
                            on usage conditions.
                          </>,
                          <>
                            Full charging time is approximately <Br tablet />
                            90 minutes.
                          </>,
                        ],
                      })}
                      className={{
                        root: cn("text-dd-gray", "mobile:text-xs"),
                        item: cn("pl-0"),
                        bullet: cn("hidden"),
                      }}
                    />
                    <Image
                      src="feature-2-battery-thumb.png"
                      width={440}
                      height={200}
                      className={cn("mx-auto w-[220px]", "mobile:w-[200px]")}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Content right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: scene === 1 ? 1 : 0 }}
              transition={{ duration: 0.5, ease: easing.pop }}
              className={cn(contentClasses.contentbox, "!absolute !left-0 !top-0")}>
              <div className={cn(contentClasses.contentbox_inner)}>
                <div className={cn(contentClasses.contentbox_head)}>
                  <h3 className={cn(contentClasses.contentbox_head_inner)}>
                    <span className={cn(contentClasses.contentbox_title)}>조절 가능한 사이즈</span>
                  </h3>
                </div>
                <div className={cn(contentClasses.contentbox_content)}>
                  <div className={cn(contentClasses.contentbox_content_inner)}>
                    <p className={cn(contentClasses.contentbox_text)}>허리둘레 : 24~40 inch</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </motion.section>
  );
}

function Header({ children, className }) {
  return <div className={cn("space-y-4 text-center", className)}>{children}</div>;
}

function Title({ children, className }) {
  const { isEng } = useLang();
  return (
    <h2
      className={cn(
        "text-4xl/[1.3] font-bold",
        "tablet:text-3xl",
        "mobile:text-2xl",
        isEng && "tablet:text-2xl",
        isEng && "mobile:text-xl",
        className,
      )}>
      {children}
    </h2>
  );
}

function Description({ children, className }) {
  const { isEng } = useLang();
  return (
    <p
      className={cn(
        "text-lg/[1.5]",
        "tablet:text-base/[1.5]",
        "mobile:text-base/[1.5]",
        isEng && "mobile:text-sm/[1.5]",
        className,
      )}>
      {children}
    </p>
  );
}

function CircleMark({ className, ...props }) {
  return (
    <motion.div
      className={cn(
        "absolute z-10 aspect-square w-[30px] overflow-hidden",
        "tablet:portrait:hidden",
        className,
      )}
      {...props}>
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center",
        )}>
        <span className={cn("block aspect-square w-full rounded-full bg-dd-mint opacity-30")} />
      </div>
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center",
        )}>
        <span className={cn("block aspect-square w-3/5 rounded-full bg-dd-mint opacity-100")} />
      </div>
    </motion.div>
  );
}

function Image({ src, className, fromRoot = false, ...props }) {
  const _src = !fromRoot ? `/images/products/angel-suit/h10/${src}` : src;
  return <NextImage src={_src} alt="" className={cn(className)} {...props} />;
}

function ProductImage({ src, className }) {
  return (
    <Image
      src={src}
      alt=""
      width="1228"
      height="1400"
      className={cn(
        "h-[70vh] max-h-[650px] w-auto",
        "tablet-only:landscape:h-[50vh]",
        "tablet-only:portrait:h-full tablet-only:portrait:max-h-none tablet-only:portrait:max-w-none",
        "mobile:portrait:h-full mobile:portrait:max-h-none mobile:portrait:max-w-none",
        className,
      )}
    />
  );
}

function WalkingAnimation({ active }) {
  const delay = 500;
  const interval = 400;
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  const images = [
    { src: "feature-1-walking-1.svg", width: 72, height: 93, className: "-mr-6" },
    { src: "feature-1-walking-2.svg", width: 99, height: 136, className: "mr-3" },
    { src: "feature-1-walking-3.svg", width: 51, height: 135, className: "mr-2" },
    { src: "feature-1-walking-4.svg", width: 50, height: 135, className: "mr-4" },
    { src: "feature-1-walking-5.svg", width: 56, height: 136, className: "mr-2" },
    { src: "feature-1-walking-6.svg", width: 47, height: 136, className: "mr-0" },
  ];

  useEffect(() => {
    const initAnimation = () => {
      if (active) {
        intervalRef.current = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % images.length);
        }, interval);
      } else {
        clearInterval(intervalRef.current);
        setActiveIndex(0);
      }
    };

    setTimeout(initAnimation, delay);

    return () => clearInterval(intervalRef.current);
  }, [images.length, interval, active]);

  return (
    <div
      className={cn(
        "relative flex origin-top-left items-end",
        "tablet:scale-75",
        "tablet:portrait:origin-top tablet:portrait:translate-x-[-5%]",
      )}>
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: index === 0 ? 1 : 0.3 }}
          animate={{
            opacity: activeIndex === index ? 1 : 0.3,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(image.className)}>
          <Image src={image.src} width={image.width} height={image.height} />
        </motion.div>
      ))}
    </div>
  );
}

function GuageAnimation({ active }) {
  return (
    <div className={cn("relative w-full bg-dd-gray-dark", "mask-image-guage")}>
      <Image
        src="feature-1-guage.svg"
        width={34}
        height={116}
        className={cn("relative z-10 w-full opacity-0")}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 2, ease: easing.pop, repeat: Infinity, repeatType: "loop" }}
        className={cn("absolute top-0 h-full w-full origin-bottom bg-dd-mint")}
      />
    </div>
  );
}
