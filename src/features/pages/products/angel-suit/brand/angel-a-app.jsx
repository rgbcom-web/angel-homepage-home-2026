"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { BrandSectionTitle, BrandSectionDescription } from "../../layouts/brand-layouts";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export function AngelAApp() {
  const { langContent, lang } = useLang();

  return (
    <section className={cn("overflow-hidden")}>
      <Container>
        <BrandSectionTitle className={cn("text-center")} theme="mint">
          {langContent({
            ko: (
              <>
                angel&apos;a 앱을 통한 <Br />
                <b>디지털 헬스케어로의 확장</b>
              </>
            ),
            en: (
              <>
                angel’a App : <b>Expanding into Digital Healthcare</b>
              </>
            ),
          })}
        </BrandSectionTitle>
        <Carousel
          slides={[
            `/images/products/angel-suit/brand/angel-a-slide-1-${lang}.jpg`,
            `/images/products/angel-suit/brand/angel-a-slide-2-${lang}.jpg`,
            `/images/products/angel-suit/brand/angel-a-slide-3-${lang}.jpg`,
            `/images/products/angel-suit/brand/angel-a-slide-1-${lang}.jpg`,
            `/images/products/angel-suit/brand/angel-a-slide-2-${lang}.jpg`,
            `/images/products/angel-suit/brand/angel-a-slide-3-${lang}.jpg`,
          ]}
        />
        <BrandSectionDescription className={cn("text-center")} theme="mint">
          {langContent({
            ko: (
              <>
                <p>
                  엔젤슈트는 angel&apos;a 앱을 통해 연결됩니다. <Br />
                  angel&apos;a 앱은 훈련 정보 관리, 훈련 플러그인 및 프리셋 설정, <Br tablet />
                  실시간 세션 모니터링 뿐 아니라 <Br pc />
                  동작 분석 리포트 기능을 제공합니다.
                </p>
                <p>
                  착용자의 상태 및 훈련 전후 개선 효과를 정량적 측정하여 <Br tablet />
                  개인 맞춤형 훈련 프로토콜 수립이 가능합니다. <Br />
                  angel&apos;a 앱은 지속적인 업데이트와 온라인 활성화를 통해 <Br tablet />
                  디지털 헬스케어로 확장하는 핵심 플랫폼이 될 예정입니다.
                </p>
              </>
            ),
            en: (
              <>
                <p>
                  The Angel&apos;a app connects seamlessly with the Angel Suit, <Br pc />
                  managing training plug-ins and presets while providing real-time monitoring{" "}
                  <Br pc />
                  and comprehensive motion analysis reports.
                </p>
                <p>
                  Personalized training protocols can be set up through <Br tablet />
                  the quantitative assessment of training data and progress. <Br />
                  Angel&apos;a app will be positioned as a digital healthcare platform <Br tablet />
                  with cloud-based accessibility in the next phase.
                </p>
              </>
            ),
          })}
        </BrandSectionDescription>
      </Container>
    </section>
  );
}

function Carousel({ slides }) {
  const swiperOptions = {
    modules: [Autoplay],
    loop: true,
    loopAdditionalSlides: 1,
    speed: 800,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1400: {
        spaceBetween: 60,
      },
      768: {
        spaceBetween: 30,
      },
      0: {
        spaceBetween: 20,
      },
    },
  };

  return (
    <div
      className={cn(
        "relative z-0 mx-auto my-20 w-[805px] px-6",
        "tablet:my-10 tablet:w-full",
        "mobile:w-[calc(100%-40px)] mobile:px-2",
      )}>
      <Swiper {...swiperOptions} className={cn("!overflow-visible")}>
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={cn("group")}>
            <Image
              src={slide}
              alt=""
              width={1167}
              height={724}
              className={cn(
                "w-full scale-100 rounded-2xl opacity-50 transition-[transform_opacity] duration-300",
                "group-[.swiper-slide-active]:scale-100 group-[.swiper-slide-active]:opacity-100",
                "mobile:rounded-lg",
              )}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Image
        src="/images/products/angel-suit/brand/angel-a-tablet.png"
        alt=""
        width={805}
        height={506}
        priority
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
        )}
      />
    </div>
  );
}
