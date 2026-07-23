"use client";

import { useLang } from "@/shared/context/lang-provider";
import { createContext, use, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { AngelASectionHead, AngelASection } from "./angel-a-pro";

import { motion, useInView } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { CarouselNavigation, CarouselPagination, CarouselButton } from "@/features/global-ui";

export function AngelAProSessionAnalysis() {
  const { langContent } = useLang();
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
        className={cn("bg-white tablet:min-h-0")}
        trackClassName={cn("tablet:h-auto")}>
        <Container
          className={cn("flex items-start justify-between", "tablet:block tablet:space-y-8")}
          tabletFull>
          <div className={cn("relative z-20 overflow-hidden")}>
            <AngelASectionHead
              tag="ANGEL SUIT H10"
              title={langContent({
                ko: "세션 기록 / 분석",
                en: "Training Record / Analysis",
              })}
              description={langContent({
                ko: (
                  <>
                    훈련 데이터는 기록·분석되어 저장됩니다. <Br />
                    이를 참고하여 개인별 훈련 계획을 수립하고, <Br />
                    지속적인 변화를 객관적으로 평가하는 데 <Br />
                    활용할 수 있습니다.
                  </>
                ),
                en: (
                  <>
                    Training data is recorded and stored to develop <Br pc tablet />
                    personalized training plan and evaluate training progress
                  </>
                ),
              })}
              className={cn("relative text-left", "tablet:text-center")}
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
      image: `angel-a-session-analysis-1-${lang}.jpg`,
      title: langContent({
        ko: "세션 기록",
        en: "Session Records",
      }),
    },
    {
      image: `angel-a-session-analysis-2-${lang}.jpg`,
      title: langContent({
        ko: "세션 분석",
        en: "Session Analysis",
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
          "absolute right-full top-[50%] z-10 w-[624px] pr-1",
          "tablet:landscape:top-1/2 tablet:landscape:w-[22vw] tablet:landscape:-translate-y-1/2",
          "tablet:portrait:static tablet:portrait:mx-auto tablet:portrait:mb-[-30px] tablet:portrait:w-[60%] tablet:portrait:!translate-y-0 tablet:portrait:pb-2 tablet:portrait:pr-0",
          "mobile:!mb-[-10px] mobile:!w-[60%]",
        )}>
        <Image
          src="/images/products/angel-suit/h10/angel-a-session-analysis-model.png"
          alt=""
          width={724}
          height={567}
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
                "absolute right-full top-0 z-20 h-full w-screen bg-white",
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
