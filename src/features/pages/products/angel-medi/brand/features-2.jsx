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
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function Features2() {
  const { langContent } = useLang();
  const visualRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: visualRef, offset: ["start 120%", "end end"] });

  const visualClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(100% 100% 0% 100% round 100px 100px 100px 100px)",
      "inset(0% 0% 0% 0% round 15px 15px 15px 15px)",
    ],
  );

  return (
    <BrandSection ref={visualRef} className={cn("tablet:pb-32", "mobile:pb-20")}>
      <Container className={cn("space-y-16")}>
        <div className={cn("text-center")}>
          <BrandSectionTitle theme="blue">
            {langContent({
              ko: (
                <>
                  훈련 데이터 및 <Br mobile />
                  모니터링 제공
                </>
              ),
              en: (
                <>
                  Real-Time Training Monitoring and <Br pc tablet />
                  Comprehensive Motion Analysis
                </>
              ),
            })}
          </BrandSectionTitle>
          <BrandSectionDescription theme="blue">
            {langContent({
              ko: (
                <>
                  <p>
                    <b>전용 태블릿 및 애플리케이션</b>을 통해 체계적인 훈련 관리와 실시간 모니터링을
                    제공합니다. <Br pc tablet />
                    이를 통해 착용자의 상태를 분석하고, 전후 평가를 통해 개선 효과를 추적할 수
                    있습니다.
                  </p>
                  <p>이를 통해 착용자가 목표를 향해 꾸준히 나아갈 수 있도록 지원합니다.</p>
                </>
              ),
              en: (
                <>
                  <p>
                    Real-time monitoring data and training records are accessible through a{" "}
                    <b>dedicated tablet and application</b>. <Br pc />
                    Doctors and clinicians can analyze the user&apos;s condition, assess
                    performance, and track progress throughout the rehabilitation process.
                  </p>
                  <p>
                    The system provides data-driven feedback and guidance to help users stay on
                    track toward their goals.
                  </p>
                </>
              ),
            })}
          </BrandSectionDescription>
        </div>
        <motion.div className={cn("relative")} style={{ clipPath: visualClipPath }}>
          <Image
            src="/images/products/angel-medi/brand/feature-2-visual.jpg"
            alt=""
            width={1400}
            height={596}
            className={cn("h-auto w-full object-cover", "mobile:aspect-[4/3]")}
          />
        </motion.div>
      </Container>
    </BrandSection>
  );
}
