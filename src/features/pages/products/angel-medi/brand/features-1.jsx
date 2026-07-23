"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Container, Br } from "@/features/layout";
import {
  BrandSection,
  BrandSectionTitle,
  BrandSectionDescription,
} from "@/features/pages/products/layouts/brand-layouts";
import { motion } from "framer-motion";
import { useMediaQueryValue } from "@/shared/hooks/useMediaQuery";
import LogoWCP from "@/shared/components/logo-wcp";

export function Features1() {
  const { langContent } = useLang();

  return (
    <BrandSection className={cn("tablet:pb-20")}>
      <Container
        className={cn(
          "grid grid-cols-2 items-center",
          "tablet:grid-cols-[5fr_5fr]",
          "mobile:grid-cols-1 mobile:gap-8",
        )}>
        <div className={cn("relative mobile:text-center")}>
          <BrandSectionTitle theme="blue">
            {langContent({
              ko: (
                <>
                  <LogoWCP className={cn("mb-5", "mobile:-translate-x-1/2", "mobile:left-1/2")} />
                  제어 기술 기반의 <Br /> 지면 보행 훈련
                </>
              ),
              en: (
                <>
                  <LogoWCP className={cn("mb-5", "mobile:-translate-x-1/2", "mobile:left-1/2")} />
                  Overground <Br pc />
                  Gait Training Robot with Force Mode Control
                </>
              ),
            })}
          </BrandSectionTitle>
          <BrandSectionDescription theme="blue">
            {langContent({
              ko: (
                <>
                  <p>
                    엔젤로보틱스의 ANGEL MEDI에 적용된 로봇 보행 재활 솔루션은 <Br pc />
                    <b>독자적인 힘 제어 방식의 보조력 제공 및 실제 지면에서의 보행</b> 훈련으로{" "}
                    <Br pc />
                    보행 기능 회복 및 훈련 효과가 뛰어납니다.
                  </p>
                  <p>
                    관절에 부착된 센서를 통해 착용자의 보행 의도를 파악 후 <Br pc />
                    보행에 부족한 힘을 정밀하게 보조하는 <b>힘 제어 방식</b>이 적용되어 <Br pc />
                    환자 <b>주도적인 보행 훈련</b>이 가능합니다.
                  </p>
                  <p>
                    트레드밀 위에서 수동적으로 걷는 동작을 단순히 반복하는 고정형 로봇과 달리,{" "}
                    <Br pc />
                    <b>실제 지면에서 체중 이동을 하고 균형을 잡으면서</b> 보행 훈련이 진행됩니다.
                  </p>
                </>
              ),
              en: (
                <>
                  <p>
                    ANGEL MEDI's Robot-Assisted Gait Training solution provides{" "}
                    <b>precise force assistance only when needed (Assist as Needed-AAN)</b> combined
                    with overground gait training, achieving exceptional outcomes for gait recovery
                    and functional rehabilitation.
                  </p>
                  <p>
                    By detecting the user's walking intent through joint-mounted sensors, the robot
                    supports insufficient strength enabling <b>active and user-driven training</b>.
                    This <b>force control method</b> ensures optimal assistance.
                  </p>
                  <p>
                    Unlike stationary robots that guide passive walking on a fixed treadmill, ANGEL
                    MEDI's training takes place on actual ground, where users shift their body
                    weight and maintain balance as they move, creating a more realistic and
                    effective experience.
                  </p>
                  <p>
                    This approach enhances walking endurance by improving muscle strength and
                    cardiopulmonary function.
                  </p>
                </>
              ),
            })}
          </BrandSectionDescription>
        </div>
        <div
          className={cn("relative w-full", "mobile:rounded-2xl mobile:bg-white/[0.03] mobile:p-4")}>
          <div
            className={cn(
              "relative",
              "tablet:w-[calc(100%+100px)]",
              "mobile:mx-auto mobile:w-[300px]",
            )}>
            <Image
              src="/images/products/angel-medi/brand/feature-1-visual.png"
              alt=""
              width={700}
              height={682}
              className={cn("h-auto w-full")}
            />
            <Radial className={cn("bottom-[13%] left-[44.5%]")} />
            <Radial className={cn("bottom-[35.5%] left-[44%]")} />
            <Radial className={cn("bottom-[55.5%] left-[50.6%]")} />
          </div>
        </div>
      </Container>
    </BrandSection>
  );
}

function Radial({ className }) {
  const radialScale = useMediaQueryValue({ mobile: 10, tablet: 14, pc: 18 });
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
        {/* 퍼지는 원형 애니메이션 */}
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
