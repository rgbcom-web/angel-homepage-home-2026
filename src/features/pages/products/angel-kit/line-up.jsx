"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  ProductSection,
  ProductSectionHeader,
  ProductSectionTitle,
  ProductSectionDescription,
} from "../layouts/default-layouts";
import { Br } from "@/features/layout";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function LineUp() {
  const { langContent } = useLang();

  return (
    <ProductSection>
      <ProductSectionHeader className={cn("mb-[120px]", "tablet:mb-20", "mobile:mb-14")}>
        <ProductSectionTitle>
          {langContent({
            ko: (
              <>
                핵심 부품<span className={cn("text-[#BFBFBF]")}>과</span> 플랫폼
                <span className={cn("text-[#BFBFBF]")}>의</span> 내재화
              </>
            ),
            en: (
              <>
                Internalization <span className={cn("text-[#BFBFBF]")}>of</span> Core Components{" "}
                <span className={cn("text-[#BFBFBF]")}>and</span> Platforms
              </>
            ),
          })}
        </ProductSectionTitle>
        <ProductSectionDescription>
          <p>
            {langContent({
              ko: "ANGEL KIT는 로봇 기술에 특화된 부품과 모듈을 제공하는 전문 브랜드입니다.",
              en: (
                <>
                  <b>ANGEL KIT</b> is a specialized brand that provides components and modules
                  tailored for robotics technology.
                </>
              ),
            })}
          </p>
          <p>
            <b className={cn("text-white")}>
              {langContent({
                ko: (
                  <>
                    엔젤로보틱스는 수년간 웨어러블 로봇 연구와 개발 과정에서 축적된 경험과 기술력을{" "}
                    <Br pc />
                    기반으로, 핵심 부품부터 플랫폼까지 직접 개발하고 내재화하고 있습니다.
                  </>
                ),
                en: (
                  <>
                    Based on years of experience and expertise accumulated through the research and
                    development of wearable robots, <Br pc />
                    Angel Robotics develops and internalizes everything from core components to
                    platforms.
                  </>
                ),
              })}
            </b>
          </p>
        </ProductSectionDescription>
      </ProductSectionHeader>
      <div className={cn("space-y-[120px]", "tablet:space-y-20", "mobile:space-y-0")}>
        <LineUpItem
          title={langContent({
            ko: "로봇제어 실험 장치",
            en: (
              <>
                Robot Control <Br pc />
                Experiment Device
              </>
            ),
          })}
          thumbnail="/images/products/angel-kit/lineup-thumb-1.jpg">
          {langContent({
            ko: (
              <>
                <p>
                  웨어러블 로봇은 자연스러운 보조를 위해 정교한 힘 제어가 요구되는 <Br pc />
                  대표적인 힘 모드 제어 시스템입니다.
                </p>
                <p>
                  엔젤로보틱스는 이러한 힘 모드 제어와 최신 로봇 제어 기술을 학습하고 <Br pc />
                  실험할 수 있는 환경을 구축하고 있습니다.{" "}
                  <b>
                    힘 모드 제어 시스템과 인공지능 기반 제어기를 체험할 수 있는 제어 실험 장치를
                    보유하고 있습니다.
                  </b>
                </p>
              </>
            ),
            en: (
              <>
                <p className={cn("font-bold")}>
                  Wearable robots require precise force control to provide natural assistance,
                  making them a key example of force mode control systems.
                </p>
                <p>
                  Angel Robotics has built an environment for studying and experimenting with force
                  mode control and advanced robotics technologies. <Br pc />
                </p>
                <p>
                  <b>
                    We have developed control experiment devices that demonstrate <Br pc />
                    force mode control systems in action.
                  </b>
                </p>
              </>
            ),
          })}
        </LineUpItem>
        <LineUpItem
          title={langContent({ ko: "모터드라이버", en: "Motor Driver" })}
          thumbnail="/images/products/angel-kit/lineup-thumb-2.jpg">
          {langContent({
            ko: (
              <>
                <p>
                  모터드라이버와 중앙제어기를 별도로 구성하거나, 피드백 제어기를 <Br pc />
                  중앙제어기에서 구현하는 방식은 제어 성능의 한계를 초래할 수 있습니다.
                </p>
                <p>
                  제어기의 실시간성(Real-time-ness)을 확보하지 못하면 본연의 <Br pc />
                  제어 성능을 제대로 발휘하기 어렵습니다.
                </p>
                <p>
                  <b>
                    엔젤로보틱스는 이러한 한계를 극복하기 위해 최신 기술로 개발된 <Br pc />
                    모터드라이버 기술을 보유하고 있습니다.
                  </b>
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  A control architecture that separates the motor driver from the central controller{" "}
                  <Br pc />
                  or relies on the central controller for feedback control can impose fundamental{" "}
                  <Br pc />
                  limitations on control performance.
                </p>
                <p>
                  Without real-time responsiveness, the controller cannot fully deliver <Br pc />
                  its intended control capabilities.
                </p>
                <p>
                  <b>
                    To address these challenges, Angel Robotics has developed advanced <Br pc />
                    motor driver technology utilizing the latest innovations.
                  </b>
                </p>
              </>
            ),
          })}
        </LineUpItem>
        <LineUpItem
          title={langContent({ ko: "구동기", en: "Actuator" })}
          thumbnail="/images/products/angel-kit/lineup-thumb-3.jpg">
          {langContent({
            ko: (
              <>
                <p>
                  로봇 구동기는 모든 로봇에서 필수적으로 사용되며, 원하는 <Br pc />
                  구동력(힘, 토크)을 얼마나 정밀하게 구현하는지가 핵심입니다.
                </p>
                <p>
                  특히, 인공지능 기반 제어 시스템에서는 Sim2Real 성능이 중요한데, <Br pc />
                  이를 위해 백래쉬와 같은 비선형성을 최소화하고 높은 토크 정밀도를 <Br pc />
                  갖춘 구동기 모듈이 필수입니다.
                </p>
                <p>
                  <b>
                    엔젤로보틱스는 이러한 요구를 충족하는 고정밀 구동기 기술을 <Br pc />
                    내재화하였습니다.
                  </b>
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  Robot actuators are essential components in all robots, <Br pc />
                  and the key lies in how precisely they can generate the desired actuation{" "}
                  <Br pc />
                  force—whether force or torque.
                </p>
                <p>
                  In AI-driven control systems, Sim2Real performance is particularly critical.{" "}
                  <Br pc />
                  To achieve this, it is essential to minimize nonlinearities such as backlash{" "}
                  <Br pc />
                  and ensure high torque precision in actuator modules.
                </p>
                <p>
                  <b>
                    Angel Robotics has internalized high-precision actuator technology <Br pc />
                    that meets these demanding requirements.
                  </b>
                </p>
              </>
            ),
          })}
        </LineUpItem>
        <LineUpItem
          title={langContent({ ko: "스마트 구동기", en: "Smart Actuator" })}
          thumbnail="/images/products/angel-kit/lineup-thumb-4.jpg">
          {langContent({
            ko: (
              <>
                <p>
                  엔젤로보틱스는 모터, 감속기, 모터드라이버를 통합한 <Br pc />
                  스마트 구동기를 자체 개발하고 있습니다.
                </p>
                <p>
                  애플리케이션에 따라 적합한 구동기 모듈을 적용할 수 있으며, <Br pc />
                  최적화된 감속기 설계와 고정밀 모터드라이버 기술이 결합된 솔루션입니다.
                </p>
                <p>
                  <b>
                    높은 토크와 출력 밀도를 구현하는 엔젤로보틱스의 스마트 구동기 <Br pc />
                    기술을 보유하고 있습니다.
                  </b>
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  Angel Robotics develops proprietary smart actuators that integrate a motor,{" "}
                  <Br pc />
                  reducer, and motor driver into a single unit.
                </p>
                <p>
                  These actuators can be tailored to different applications, providing a solution
                  that combines an optimized reducer design with high-precision motor driver
                  technology.
                </p>
                <p>
                  <b>
                    Angel Robotics possesses smart actuator technology capable of <Br pc />
                    delivering high torque and power density.
                  </b>
                </p>
              </>
            ),
          })}
        </LineUpItem>
        <LineUpItem
          title={langContent({ ko: "관성측정 모듈", en: "Inertial Measurement Module" })}
          thumbnail="/images/products/angel-kit/lineup-thumb-5.jpg">
          {langContent({
            ko: (
              <>
                <p>엔젤로보틱스는 로봇 제어에 특화된 관성측정 모듈을 개발하였습니다.</p>
                <p>
                  고도화된 모션 추정 알고리즘의 우수성과 더불어, 사용자가 원하는 <Br pc />
                  센서나 외부 장치를 연결할 수 있어 높은 범용성과 사용성을 제공합니다.
                </p>
                <p>
                  <b>로봇 제어를 위한 최적의 솔루션을 갖춘 엔젤로보틱스의 관성측정 모듈입니다.</b>
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  Angel Robotics has developed an inertial measurement module <Br pc />
                  specialized for robot control.
                </p>
                <p>
                  In addition to its advanced motion estimation algorithm, it offers high
                  versatility and usability by allowing users to connect desired sensors or external
                  devices.
                </p>
                <p>
                  <b>
                    Angel Robotics' inertial measurement module provides an <Br pc />
                    optimal solution for robot control.
                  </b>
                </p>
              </>
            ),
          })}
        </LineUpItem>
      </div>
    </ProductSection>
  );
}

function LineUpItem({ title, thumbnail, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <article
      ref={ref}
      className={cn(
        "group grid grid-cols-[660fr_700fr] gap-10 even:grid-cols-[700fr_660fr]",
        "tablet:grid-cols-2 tablet:gap-8",
        "mobile-sm:!grid-cols-1 mobile-sm:gap-0",
      )}>
      <div className={cn("group-even:order-2", "mobile-sm:!order-1")}>
        <motion.img
          src={thumbnail}
          alt={""}
          style={{ opacity }}
          className={cn("h-auto w-full rounded-xl")}
        />
      </div>
      <motion.div
        style={{ opacity }}
        className={cn(
          "flex items-center border-t border-[#707070] py-6 group-odd:pl-10 group-even:order-1",
          "tablet:!px-0",
          "mobile-sm:!order-2 mobile-sm:mb-12 mobile-sm:border-b mobile-sm:border-t-0 mobile-sm:!px-2 mobile-sm:pb-10 mobile-sm:pt-5 mobile-sm:group-last:mb-0",
        )}>
        <div className={cn("space-y-10", "tablet:space-y-6", "mobile:space-y-4")}>
          <h3
            className={cn(
              "text-[50px]/[1.3] font-bold text-[#BFBFBF]",
              "tablet:text-3xl",
              "mobile:text-2xl",
            )}>
            {title}
          </h3>
          <div
            className={cn("space-y-3 text-lg text-[#BFBFBF] [&_b]:text-white", "tablet:text-base")}>
            {children}
          </div>
        </div>
      </motion.div>
    </article>
  );
}
