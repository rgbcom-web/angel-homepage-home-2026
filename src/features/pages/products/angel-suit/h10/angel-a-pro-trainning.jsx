"use client";

import { useLang } from "@/shared/context/lang-provider";
import { createContext, use, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Container, Br, BulletList } from "@/features/layout";
import { AngelASectionHead, AngelASection } from "./angel-a-pro";

import { motion, useInView } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { CarouselNavigation, CarouselPagination, CarouselButton } from "@/features/global-ui";

export function AngelAProTrainning() {
  const { langContent, lang } = useLang();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    fallbackInView: true,
    rootMargin: "0px 0px 0px 0px",
  });
  const [init, setInit] = useState(false);

  return (
    <Context.Provider value={{ inView, init, setInit }}>
      <AngelASection
        ref={sectionRef}
        className={cn("bg-[#F4F4F4] tablet:min-h-0")}
        trackClassName={cn("tablet:h-auto")}>
        <Container
          className={cn("flex items-start justify-between", "tablet:block tablet:space-y-8")}
          tabletFull>
          <div className={cn("relative z-10 overflow-hidden")}>
            <AngelASectionHead
              tag="ANGEL SUIT H10"
              title={langContent({
                ko: "훈련 플러그인",
                en: "Training Plug-in",
              })}
              description={langContent({
                ko: (
                  <>
                    5가지의 다양한 훈련이 가능하며, <Br pc mobile />
                    각 플러그인 별 세부 조정 기능인 <Br tablet mobile />
                    프리셋 설정을 <Br pc />
                    통해 사용자 상태에 맞는 <Br mobile />
                    훈련이 가능합니다.
                  </>
                ),
                en: (
                  <BulletList
                    items={[
                      <>
                        To provide functional activation training, <Br pc tablet />
                        along with functional enhancement and safe <Br pc tablet />
                        rehabilitation after joint surgery
                      </>,
                      <>
                        Each plug-in includes detailed customization <Br pc tablet />
                        settings(preset) for personalized <Br pc tablet />
                        training programs
                      </>,
                    ]}
                    className={{ bullet: "tablet:hidden" }}
                  />
                ),
              })}
              className={cn("text-left", "tablet:text-center")}
            />
          </div>
          <div className={cn("pb-32", "tablet:pb-24")}>
            <AngelACarousel />
          </div>
        </Container>
      </AngelASection>
    </Context.Provider>
  );
}

const Context = createContext();

const useContext = () => {
  return use(Context);
};

function AngelACarousel() {
  const { langContent, lang } = useLang();
  const slides = [
    {
      image: `angel-a-tranning-1-${lang}.jpg`,
      title: langContent({
        ko: "보행 보조",
        en: "Gait Assistance",
      }),
    },
    {
      image: `angel-a-tranning-2-${lang}.jpg`,
      title: langContent({
        ko: "저항 훈련",
        en: "Aqua Mode (Resistance Training)",
      }),
    },
    {
      image: `angel-a-tranning-3-${lang}.jpg`,
      title: langContent({
        ko: "부하 조절",
        en: "Space Mode (Support & Resistance Training)",
      }),
    },
    {
      image: `angel-a-tranning-4-${lang}.jpg`,
      title: langContent({
        ko: "관절 운동 제한",
        en: "Joint Mobility",
      }),
    },
    {
      image: `angel-a-tranning-5-${lang}.jpg`,
      title: langContent({
        ko: "앉기 서기 보조",
        en: "Sit-To-Stand Support",
      }),
    },
    {
      image: `angel-a-tranning-6-${lang}.jpg`,
      title: langContent({
        ko: "훈련 모니터링",
        en: "Training Session Monitoring",
      }),
    },
  ];

  const { inView } = useContext();

  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 1,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: nextButtonRef.current,
      prevEl: prevButtonRef.current,
    },
    pagination: {
      el: paginationRef.current,
      clickable: true,
    },
    onSlideChange: (swiper) => {
      setActiveIndex(swiper.activeIndex);
    },
    breakpoints: {
      0: {
        spaceBetween: 0,
      },
      768: {
        spaceBetween: 40,
      },
      1400: {
        spaceBetween: 40,
      },
    },
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      if (inView) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
        swiper.slideTo(0, 300);
      }
    }
  }, [inView]);

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      swiperOptions.navigation.prevEl = prevButtonRef.current;
      swiperOptions.navigation.nextEl = nextButtonRef.current;
    }
    if (paginationRef.current) {
      swiperOptions.pagination.el = paginationRef.current;
    }
  }, [prevButtonRef, nextButtonRef, paginationRef]);

  return (
    <div
      className={cn(
        "relative mx-auto w-[777px]",
        "tablet-only:landscape:w-[40vw]",
        "tablet-only:portrait:w-[70%]",
        "mobile:w-[100%]",
      )}>
      <motion.div
        className={cn(
          "absolute right-full top-[15%] z-10 w-[357px] pr-1",
          "tablet:landscape:top-1/2 tablet:landscape:w-[22vw] tablet:landscape:-translate-y-1/2",
          "tablet:portrait:static tablet:portrait:mx-auto tablet:portrait:mb-[-80px] tablet:portrait:w-[40%] tablet:portrait:!translate-y-0 tablet:portrait:pb-2 tablet:portrait:pr-0",
          "mobile:!w-[50%]",
        )}>
        <Image
          src="/images/products/angel-suit/h10/angel-a-trainning-model.png"
          alt=""
          width={367}
          height={548}
          className={cn("w-full")}
        />
      </motion.div>
      <div className={cn("relative w-full")}>
        <motion.div className={cn("relative w-full")}>
          <Swiper
            ref={swiperRef}
            {...swiperOptions}
            className={cn(
              "!overflow-visible [&_.swiper-slide-active]:!opacity-100 [&_.swiper-slide]:opacity-50 [&_.swiper-slide]:transition-opacity [&_.swiper-slide]:duration-300",
              "transition-opacity duration-300 ease-timing-pop",
              "tablet:[&_.swiper-slide]:opacity-100",
              "[&_.swiper-wrapper]:!z-[-1]",
            )}>
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className={cn("bg-white")}>
                <Image
                  src={`/images/products/angel-suit/h10/${slide.image}`}
                  alt=""
                  width={1166}
                  height={723}
                  className={cn("w-full")}
                />
              </SwiperSlide>
            ))}
            <div
              slot="container-end"
              className={cn(
                "absolute right-full top-0 z-20 h-full w-screen bg-[#F4F4F4]",
                "tablet:portrait:hidden",
              )}
            />
            <motion.div
              slot="container-end"
              className={cn(
                "absolute left-0 top-full w-full space-y-2 pt-10",
                "tablet:space-y-0 tablet:py-6",
              )}>
              <div className={cn("w-full text-center")}>
                <span className={cn("text-xl font-bold", "tablet:text-base")}>
                  {slides[activeIndex].title}
                </span>
              </div>
              <CarouselNavigation>
                <CarouselButton direction="prev" ref={prevButtonRef} hoverTheme="mint" />
                <CarouselPagination ref={paginationRef} />
                <CarouselButton direction="next" ref={nextButtonRef} hoverTheme="mint" />
              </CarouselNavigation>
            </motion.div>
          </Swiper>
        </motion.div>
        <motion.div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-20 w-[105%] -translate-x-1/2 -translate-y-1/2",
          )}>
          <Image
            src="/images/products/angel-suit/h10/angel-a-tablet.png"
            alt=""
            width={893}
            height={562}
            className={cn("relative z-10 w-full")}
          />
        </motion.div>
      </div>
    </div>
  );
}
