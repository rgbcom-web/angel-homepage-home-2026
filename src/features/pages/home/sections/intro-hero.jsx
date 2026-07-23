"use client";

import { cn } from "@/shared/lib/utils";
import { useLang } from "@/shared/context/lang-provider";
import { motion } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { Container } from "@/features/layout/container";
import { ArrowButton } from "@/features/global-ui";
import { WavyText } from "@/shared/motion/components/wavy-text";

import { useAppContext } from "@/shared/context/app.context";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import LogoWCP from "@/shared/components/logo-wcp";

export function IntroHero() {
  const { langContent } = useLang();
  const { homeCoverAnimationEnd } = useAppContext();
  const [swiper, setSwiper] = useState(null);
  const [paused, setPaused] = useState(false);

  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation, EffectFade],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    onSwiper: (swiper) => {
      setSwiper(swiper);
    },
  };

  useEffect(() => {
    if (swiper) {
      swiper.autoplay.stop();

      if (homeCoverAnimationEnd) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    }
  }, [homeCoverAnimationEnd]);

  return (
    <Swiper {...swiperOptions} className="h-screen w-full tablet:h-[100svh]">
      <SwiperSlide data-swiper-autoplay={7000}>
        {({ isActive }) => (
          <SlideContent
            isActive={isActive}
            video="/images/home/intro-hero-bg-1.mp4"
            mobileVideo="/images/home/intro-hero-bg-1-mobile.mp4"
            poster="/images/home/intro-hero-bg-1-poster.jpg"
            mobilePoster="/images/home/intro-hero-bg-1-mobile-poster.jpg"
            subtitle={langContent({
              ko: "일상 복귀를 위한 보행 훈련 로봇",
              en: "Returning to Daily Life",
            })}
            title="ANGEL SUIT H10"
            link="/products/angel-suit/h10"
            paused={paused}
          />
        )}
      </SwiperSlide>
      <SwiperSlide data-swiper-autoplay={11000}>
        {({ isActive }) => (
          <SlideContent
            isActive={isActive}
            video="/images/home/intro-hero-bg-2.mp4"
            mobileVideo="/images/home/intro-hero-bg-2-mobile.mp4?ver=2"
            poster="/images/home/intro-hero-bg-2-poster.jpg"
            mobilePoster="/images/home/intro-hero-bg-2-mobile-poster.jpg"
            subtitle={langContent({
              ko: "하지 불완전마비 환자를 위한 보행 훈련 로봇",
              en: "for Stepping Forward",
            })}
            title="ANGEL LEGS M20"
            link="/products/angel-medi/m20"
            className={{ video: cn("object-[60%]") }}
            paused={paused}
            hasWCPLogo
          />
        )}
      </SwiperSlide>
      {swiper && (
        <div
          className={cn(
            "absolute bottom-0 left-1/2 z-[50] mb-[70px] -translate-x-1/2",
            "mobile:hidden",
          )}>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={homeCoverAnimationEnd && { y: 0, opacity: 1 }}
            transition={{
              ease: easing.pop,
              duration: 1,
            }}
            className={cn("flex items-center justify-center gap-2 text-white")}>
            <button
              onClick={() => {
                if (swiper.isBeginning) {
                  swiper.slideTo(swiper.slides.length - 1);
                } else {
                  swiper.slidePrev();
                }
              }}>
              <ArrowPrev />
            </button>
            <CarouselPagination paused={paused} />
            <CarouselPlayButton paused={paused} setPaused={setPaused} />
            <button
              onClick={() => {
                if (swiper.isEnd) {
                  swiper.slideTo(0);
                } else {
                  swiper.slideNext();
                }
              }}>
              <ArrowNext />
            </button>
          </motion.div>
        </div>
      )}
    </Swiper>
  );
}

function SlideContent({
  isActive,
  video,
  mobileVideo,
  poster,
  mobilePoster,
  subtitle,
  title,
  link,
  className,
  paused,
  hasWCPLogo = false,
}) {
  const { langContent, isEng } = useLang();
  const { homeCoverAnimationEnd } = useAppContext();
  const { device, isPortrait } = useMediaQuery();
  const isMobileVideoDisplay = device === "mobile" || (isPortrait && device === "tablet");
  const timeoutRef = useRef(null);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    const mobileVideo = mobileVideoRef?.current;

    clearTimeout(timeoutRef.current);

    if (isMobileVideoDisplay) {
      if (mobileVideo && isActive && homeCoverAnimationEnd) {
        mobileVideo.play();
      } else {
        timeoutRef.current = setTimeout(() => {
          mobileVideo.pause();
          mobileVideo.currentTime = 0;
        }, 600);
      }
    } else {
      if (video && isActive && homeCoverAnimationEnd) {
        video.play();
      } else {
        timeoutRef.current = setTimeout(() => {
          video.pause();
          video.currentTime = 0;
        }, 600);
      }
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [videoRef, mobileVideoRef, isActive, device, isPortrait, homeCoverAnimationEnd, paused]);

  useEffect(() => {
    if ((isPortrait && device === "tablet") || device === "mobile") {
      videoRef.current.pause();
    } else {
      mobileVideoRef.current.pause();
    }
  }, [isPortrait, device]);

  useEffect(() => {
    if (!homeCoverAnimationEnd) return;
    if (paused) {
      isMobileVideoDisplay ? mobileVideoRef.current.pause() : videoRef.current.pause();
    } else {
      isMobileVideoDisplay ? mobileVideoRef.current.play() : videoRef.current.play();
    }
  }, [paused, homeCoverAnimationEnd]);

  return (
    <div className={cn("h-full w-full bg-black", "tablet:portrait:flex tablet:portrait:flex-col")}>
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-full",
          "bg-black after:absolute after:inset-0 after:h-full after:w-full after:bg-black/0 after:mix-blend-overlay after:content-['']",
        )}>
        <video
          ref={videoRef}
          className={cn(
            "absolute left-0 top-0 h-full w-full object-cover",
            mobileVideo && "tablet:portrait:hidden",
            className?.video,
          )}
          muted
          loop
          playsInline
          poster={poster}>
          <source src={video} type="video/mp4" />
        </video>
        {mobileVideo && (
          <video
            ref={mobileVideoRef}
            className={cn(
              "hidden object-cover",
              "mx-auto h-full w-full",
              "tablet:portrait:block",
              className?.mobileVideo,
            )}
            muted
            loop
            playsInline
            poster={mobilePoster}>
            <source src={mobileVideo} type="video/mp4" />
          </video>
        )}
      </div>
      <Container
        className={cn(
          "relative z-30 flex h-full items-center",
          "tablet:w-[calc(100%-100px)] tablet:max-w-[1024px]",
          "tablet:portrait:items-end tablet:portrait:justify-center tablet:portrait:pb-[150px] tablet:portrait:text-center",
          "mobile:!pb-[50px]",
        )}>
        <div className={cn("space-y-20", "tablet:portrait:space-y-10")}>
          <h2
            className={cn(
              "relative text-[84px] font-bold leading-[1.3] text-white",
              "labtop:text-[70px]",
              "tablet:text-[60px]",
              "mobile:whitespace-nowrap mobile:text-[clamp(30px,10vw,60px)]",
            )}>
            {hasWCPLogo && isActive && homeCoverAnimationEnd && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-0 -translate-y-[125%] tablet:left-1/2 tablet:-translate-x-1/2">
                <LogoWCP />
              </motion.h2>
            )}
            {langContent({
              ko: (
                <>
                  <WavyText
                    className="block text-[0.3em] font-semibold text-dd-blue tablet:text-[0.4em]"
                    text={subtitle}
                    trigger={isActive && homeCoverAnimationEnd}
                    delayAcc={0.01}
                    useInViewOption={false}
                    initialDelay={isActive ? 0 : 0.5}
                    resetDuration
                  />
                  <WavyText
                    className="block"
                    text={title}
                    trigger={isActive && homeCoverAnimationEnd}
                    useInViewOption={false}
                    initialDelay={isActive ? 0 : 0.5}
                    resetDuration
                  />
                </>
              ),
              en: (
                <>
                  <WavyText
                    className="block"
                    text={title}
                    trigger={isActive && homeCoverAnimationEnd}
                    useInViewOption={false}
                    initialDelay={isActive ? 0 : 0.5}
                    resetDuration
                  />
                  <WavyText
                    className="block text-[0.3em] font-semibold text-dd-blue tablet:text-[0.4em]"
                    text={subtitle}
                    trigger={isActive && homeCoverAnimationEnd}
                    delayAcc={0.01}
                    useInViewOption={false}
                    initialDelay={isActive ? 0 : 0.5}
                    resetDuration
                  />
                </>
              ),
            })}
          </h2>
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 100 }}
              animate={isActive && homeCoverAnimationEnd ? { y: 0 } : { y: 100 }}
              transition={{
                ease: easing.pop,
                duration: 1,
                delay: isActive ? 0 : 0.5,
              }}>
              <ArrowButton
                href={link}
                bgColor="blue"
                dimmerColor="white"
                hoverTextColor="blue"
                size="lg">
                {langContent({ ko: "제품정보", en: "For more information" })}
              </ArrowButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function CarouselPagination({ paused }) {
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(swiper.realIndex);
  const [duration, setDuration] = useState(swiper.params.autoplay.delay);

  swiper.on("slideChangeTransitionStart", (swiper) => {
    setActiveIndex(swiper.realIndex);
    setDuration(swiper.params.autoplay.delay);
  });

  return (
    <div className={cn("flex items-center gap-3")}>
      {swiper.slides.map((slide, index) => (
        <CarouselPaginationItem
          key={index}
          num={index + 1}
          isActive={activeIndex === index}
          duration={slide.dataset.swiperAutoplay || duration}
          paused={paused}
        />
      ))}
    </div>
  );
}

function CarouselPaginationItem({ num, isActive, duration, paused }) {
  const { homeCoverAnimationEnd } = useAppContext();
  return (
    <div
      className={cn("flex items-center gap-0 transition-[gap] duration-300", isActive && "gap-2")}>
      <span className={cn("font-bold leading-[1]", isActive && "text-dd-blue")}>0{num}</span>
      <motion.div
        initial={{ width: 0 }}
        animate={isActive ? { width: 115 } : { width: 0 }}
        transition={{
          ease: easing.pop,
          duration: 0.4,
        }}
        className={cn("h-[3px] w-[115px] bg-white/30")}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={paused ? { scaleX: 0 } : isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            ease: "linear",
            duration: paused ? 0.3 : isActive ? duration / 1000 : 0,
            delay: isActive ? 0 : 0.4,
          }}
          className={cn("h-full w-full origin-left bg-dd-blue")}
        />
      </motion.div>
    </div>
  );
}

function CarouselPlayButton({ paused, setPaused }) {
  const swiper = useSwiper();

  const handleClick = () => {
    if (paused) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
    setPaused(!paused);
  };

  return (
    <button className={cn("px-1")} onClick={handleClick}>
      {paused ? <Play /> : <Pause />}
    </button>
  );
}

function Pause() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10.5" viewBox="0 0 9 10.5">
      <line
        y2="7.5"
        transform="translate(7.5 1.5)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
      <line
        y2="7.5"
        transform="translate(1.5 1.5)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
    </svg>
  );
}

function Play() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11">
      <path d="M5.5,0,11,9H0Z" transform="translate(9) rotate(90)" fill="currentColor" />
    </svg>
  );
}

function ArrowPrev() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8.54" height="14.251" viewBox="0 0 8.54 14.251">
      <path
        d="M3305.212,4879l-5.711,5.711,5.711,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowNext() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8.54" height="14.251" viewBox="0 0 8.54 14.251">
      <path
        d="M3299.5,4879l5.711,5.711-5.711,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
