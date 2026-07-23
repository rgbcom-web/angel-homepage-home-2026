"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function FeaturesSolutionCarousel({ slides }) {
  const swiperOptions = {
    modules: [Pagination],
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
      clickable: true,
    },
    breakpoints: {
      1400: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
    },
  };

  return (
    <div className="relative">
      <Swiper
        {...swiperOptions}
        className={cn(
          "!overflow-visible !pb-10 after:absolute after:right-full after:top-0 after:z-50 after:h-full after:w-screen after:bg-dark-background",
          "tablet:after:hidden",
          "mobile:!pb-5",
        )}>
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <Image
              src={slide}
              alt=""
              width={840}
              height={972}
              className={cn("w-full rounded-2xl", "mobile:rounded-lg")}
              priority
            />
          </SwiperSlide>
        ))}
        <div
          className={cn(
            "swiper-pagination !bottom-0 !top-auto !bg-[#2B2B2B] [&_.swiper-pagination-progressbar-fill]:!bg-dd-mint",
          )}></div>
      </Swiper>
    </div>
  );
}
