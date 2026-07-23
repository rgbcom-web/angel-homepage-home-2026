"use client";

import { useLang } from "@/shared/context/lang-provider";
import { createContext, use, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { AngelASectionHead, AngelASection } from "./angel-a-pro";

import { motion, useInView } from "framer-motion";
import { easing } from "@/shared/motion/variables";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { CarouselNavigation, CarouselPagination, CarouselButton } from "@/features/global-ui";

export function AngelAProConnected() {
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
      <AngelASection ref={sectionRef} trackClassName={cn("mobile:h-[200vh]")}>
        <Container className={cn("space-y-12", "mobile:space-y-8")} tabletFull>
          <div className={cn("overflow-hidden")}>
            <AngelASectionHead
              initial={{ opacity: 0 }}
              animate={init ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easing.pop }}
              tag="ANGEL SUIT H10"
              title="Connected Healthcare"
              description={langContent({
                ko: (
                  <>
                    <>
                      angel&apos;a PRO는 모바일 태블릿을 이용해 훈련과 실시간 분석을 동시에{" "}
                      <Br pc tablet />
                      진행 가능한 ANGEL SUIT H10의 전용 어플리케이션입니다.
                    </>
                  </>
                ),
                en: (
                  <>
                    Introducing angel&apos;a PRO: The application for the ANGEL SUIT H10 that
                    enables <Br pc tablet />
                    simultaneous training and real-time monitoring with mobile device.
                  </>
                ),
              })}
              className={cn("text-center")}
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
      image: `angel-a-connected-1-${lang}.jpg`,
      title: langContent({
        ko: "훈련 모드 및 세부 설정",
        en: "Training Plug-in Setting",
      }),
    },
    {
      image: `angel-a-connected-2-${lang}.jpg`,
      title: langContent({
        ko: "훈련 세션 모니터링",
        en: "Training Session Monitoring",
      }),
    },
    {
      image: `angel-a-connected-3-${lang}.jpg`,
      title: langContent({
        ko: "세션 기록 / 분석",
        en: "Training Data Management",
      }),
    },
    {
      image: `angel-a-connected-4-${lang}.jpg`,
      title: langContent({
        ko: "동작분석",
        en: "Motion Analysis",
      }),
    },
  ];

  const { getValue, isPortrait } = useMediaQuery();
  const { init } = useContext();

  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const paginationRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 40,
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
  };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;

      if (init) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
        swiper.slideTo(0, 300);
      }
    }
  }, [init]);

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
        "relative mx-auto w-[620px]",
        "tablet-only:landscape:w-[40vw]",
        "tablet-only:portrait:w-[70%]",
        "mobile:w-[100%]",
      )}>
      <motion.div
        initial={{ opacity: 0, x: "50%", y: "-50%" }}
        animate={init ? { opacity: 1, x: "0%", y: "-50%" } : { opacity: 0, x: "50%", y: "-50%" }}
        transition={{ duration: 0.5, delay: 0.3, ease: easing.pop }}
        className={cn(
          "absolute right-full top-1/2 z-10 w-[455px] -translate-y-1/2 pr-1",
          "tablet:landscape:w-[25vw]",
          "tablet:portrait:static tablet:portrait:mx-auto tablet:portrait:w-[50%] tablet:portrait:!translate-y-0 tablet:portrait:pb-2 tablet:portrait:pr-0",
          "mobile:!w-[70%]",
        )}>
        <Image
          src="/images/products/angel-suit/h10/angel-a-connected-product.png"
          alt=""
          width={455}
          height={487}
          className={cn("w-full mobile:hidden tablet:portrait:hidden")}
        />
        <Image
          src="/images/products/angel-suit/h10/angel-a-connected-product-mo.png"
          alt=""
          width={638}
          height={590}
          className={cn("hidden w-full mobile:block tablet:portrait:block")}
        />
      </motion.div>
      <div className={cn("relative w-full")}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={init ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: easing.pop }}
          className={cn("relative w-full")}>
          <Swiper
            ref={swiperRef}
            {...swiperOptions}
            className={cn(
              "!overflow-visible [&_.swiper-slide-active]:!opacity-100 [&_.swiper-slide]:opacity-50 [&_.swiper-slide]:transition-opacity [&_.swiper-slide]:duration-300",
              "transition-opacity duration-300 ease-timing-pop",
              "[&_.swiper-wrapper]:!z-[-1]",
              init ? "opacity-100" : "opacity-0",
            )}>
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={`/images/products/angel-suit/h10/${slide.image}`}
                  alt=""
                  width={932}
                  height={578}
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
              initial={{ opacity: 0, y: -100 }}
              animate={init ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easing.pop }}
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
          initial={{
            x: "-50%",
            y: getValue({ pc: "-50%", tablet: isPortrait ? "-100%" : "-70%", mobile: "-150%" }),
            scale: getValue({ pc: 1.2, mobile: 1 }),
          }}
          animate={
            init
              ? { x: "-50%", y: "-50%", scale: 1 }
              : {
                  x: "-50%",
                  y: getValue({
                    pc: "-50%",
                    tablet: isPortrait ? "-100%" : "-70%",
                    mobile: "-150%",
                  }),
                  scale: getValue({ pc: 1.2, mobile: 1 }),
                }
          }
          transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 z-20 w-[645px] -translate-x-1/2 -translate-y-1/2",
            "tablet:w-[105%]",
          )}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={init ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0, ease: easing.pop }}
            className={cn(
              "absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[10%] bg-white",
              "pointer-events-none",
            )}>
            <AngelLogoVideo className={cn("w-[18%]")} />
            <Image
              src="/images/products/angel-suit/h10/ag-logo-typo.png"
              alt=""
              width={241}
              height={35}
              className={cn("w-[30%]")}
            />
          </motion.div>
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

function AngelLogoVideo({ className, ...props }) {
  const { setInit, inView } = useContext();
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (inView) {
      video?.play();
    } else {
      setInit(false);
      video?.pause();
      video.currentTime = 0;
    }
  }, [inView]);

  useEffect(() => {
    const video = ref.current;
    const handleVideoEnded = () => {
      setInit(true);
    };
    video?.addEventListener("ended", handleVideoEnded);
    return () => {
      video?.removeEventListener("ended", handleVideoEnded);
    };
  }, [setInit]);

  return (
    <video
      ref={ref}
      src="/images/products/angel-suit/h10/ag-logo.mp4"
      muted
      playsInline
      className={cn("", className)}
      {...props}
    />
  );
}
