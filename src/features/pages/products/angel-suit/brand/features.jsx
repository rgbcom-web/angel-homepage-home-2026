"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Br, Container } from "@/features/layout";
import Image from "next/image";

import {
  BrandSection,
  BrandSectionTitle,
  BrandSectionDescription,
} from "../../layouts/brand-layouts";
import { FeaturesSolutionCarousel } from "./features-solution-carousel";

export function Features() {
  const { langContent, isEng, lang } = useLang();

  return (
    <div>
      <Row
        visual={
          <FeaturesSolutionCarousel
            slides={[
              "/images/products/angel-suit/brand/feature-1-thumb-1.jpg?ver=2",
              "/images/products/angel-suit/brand/feature-1-thumb-2.jpg?ver=2",
              "/images/products/angel-suit/brand/feature-1-thumb-3.jpg?ver=2",
            ]}
          />
        }>
        <Image
          src="/images/products/angel-suit/brand/design-award-mark.jpg"
          alt="Design Award 2025"
          width={116}
          height={60}
          className={cn("mb-5", "tablet:w-20")}
        />
        <BrandSectionTitle theme="mint">
          {langContent({
            ko: (
              <>
                일상으로의 복귀를 위한 <Br />
                <b>로봇 보행 솔루션</b>
              </>
            ),
            en: (
              <>
                A wearable assistive robot solution <b>for Returning to Daily Life</b>
              </>
            ),
          })}
        </BrandSectionTitle>
        <BrandSectionDescription theme="mint">
          {langContent({
            ko: (
              <>
                <p>
                  엔젤슈트는 일상으로의 복귀를 위한 보행 보조 웨어러블 로봇으로   <Br pc />
                  기존 재활 로봇의 크기와 무게를 극복하고 간편한 구조로 <Br pc />
                  착용감과 사용성을 개선하여 치료실 뿐 아니라 계단, 경사로, 실외 등 <Br pc tablet />
                  <b>다양한 환경에서 훈련</b>을 할 수 있습니다.
                </p>
                <p>
                  보행 기능 활성화 뿐 아니라 기능 증강 훈련, 수술 후 안전한 훈련까지  <Br pc />
                  일상으로 복귀를 위한 <Br tablet />
                  <b>각종 훈련 플러그인</b>이 제공되며 <Br pc />
                  착용자의 상태에 따라{" "}
                  <b>
                    다양한 보조력을 프리셋으로 저장해두어 <Br pc tablet />
                    맞춤형 훈련이 가능합니다.
                  </b>
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  Angel Suit is a wearable gait-assist robot designed <Br pc />
                  <b>for returning to daily life</b>. Its compact design overcomes the size and
                  weight limitations of conventional rehabilitation robots, improving comfort and
                  usability. This device is suitable for use in various environments, including
                  therapy rooms, stairs, slopes, and even outdoors.
                </p>
                <p>
                  From gait activation and strength enhancement to safe post-surgical
                  rehabilitation, a range of training plug-ins supports daily recovery and training
                  can be customized with various support levels that can be saved as presets based
                  on the user&apos;s condition .
                </p>
              </>
            ),
          })}
        </BrandSectionDescription>
      </Row>
      <Row
        visual={
          <video
            src={`/images/products/angel-suit/brand/feature-2-thumb-${lang}.mp4`}
            autoPlay
            muted
            loop
            playsInline
            className={cn("w-full rounded-xl")}
            priority
          />
        }>
        <BrandSectionTitle theme="mint">
          {langContent({
            ko: (
              <>
                AI 기반 <Br />
                <b>힘 제어 기술</b>
              </>
            ),
            en: (
              <>
                <b>Force Control with</b> <Br />
                AI Technology
              </>
            ),
          })}
        </BrandSectionTitle>
        <BrandSectionDescription theme="mint">
          {langContent({
            ko: (
              <>
                <p>
                  엔젤슈트는 간결해 보이지만 엔젤로보틱스의 혁신적인 행동 의도 파악 및 <Br tablet />
                  힘 제어 기술이 적용된 웨어러블 로봇입니다.
                </p>
                <p>
                  내장된 센서가 실시간으로 사용자의 상태를 감지하면, <Br pc />
                  <b>
                    AI를 활용한 가상의 인체 모델링과 행동 의도 및 <Br pc />
                    동작을 추정
                  </b>
                  하여, 동작별 최적의 힘 보조를 제공합니다.
                </p>
                <p>
                  엔젤슈트 구동기에는 운동 속도 최적화, 속도 감응형 제어, <Br pc />
                  정상 동작 궤적 유도 등 로봇 착용 무게감 및 저항감은 줄이고 <Br pc />
                  훈련 효과를 높일 수 있는 여러 <b>보상 및 제어 기술이 내재화</b> 되어 있습니다.
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  Angel Suit is equipped with innovative AI-driven motion intent detection and force
                  control technologies, despite its simple design.
                </p>
                <p>
                  Built-in sensors and AI model human motion to detect movement intent,{" "}
                  enabling the robot to provide optimal assistive force for each phase of movement.
                </p>
                <p>
                  Angel Suit&apos;s actuators feature intelligent control to optimize movement speed
                  and responsiveness, reducing the perceived weight and resistance of the robot
                  while maintaining natural gait patterns, thereby enhancing both training outcomes
                  and comfort.
                </p>
              </>
            ),
          })}
        </BrandSectionDescription>
      </Row>
    </div>
  );
}

function Row({ children, visual, className }) {
  return (
    <BrandSection className={cn(className?.root)}>
      <Container
        className={cn(
          "grid grid-cols-2 gap-[70px]",
          "tablet:grid-cols-1 tablet:gap-10",
          "mobile:tablet:gap-5",
          className?.container,
        )}>
        <div className={cn("relative z-10 group-even:order-2", "tablet:!order-1")}>{children}</div>
        <div className={cn("group-even:order-1", "tablet:!order-2")}>{visual}</div>
      </Container>
    </BrandSection>
  );
}
