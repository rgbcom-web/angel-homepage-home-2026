"use client";

import { cn } from "@/shared/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";

import { DDLink as Link } from "@/shared/components/link";
import { useRef, useEffect } from "react";

import { ArrowRight, ArrowLeft } from "@/shared/svgs";
import { Thumbnail } from "@/features/board/ui";
import moment from "moment";
import { useLang } from "@/shared/context/lang-provider";

export function NewsSlider({ list }) {
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const paginationRef = useRef(null);

  const swiperOptions = {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: nextButtonRef.current,
      prevEl: prevButtonRef.current,
    },
    pagination: {
      type: "progressbar",
      el: paginationRef.current,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.3,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      1450: {
        slidesPerView: 3.7,
        spaceBetween: 20,
      },
    },
  };

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      swiperOptions.navigation.prevEl = prevButtonRef.current;
      swiperOptions.navigation.nextEl = nextButtonRef.current;
    }
  }, [prevButtonRef, nextButtonRef]);

  useEffect(() => {
    if (paginationRef.current) {
      swiperOptions.pagination.el = paginationRef.current;
    }
  }, [paginationRef]);

  return (
    <Swiper {...swiperOptions} className={cn("!overflow-visible")}>
      {list?.map((item) => (
        <SwiperSlide key={item.id}>
          <NewsCard item={item} />
        </SwiperSlide>
      ))}
      <nav
        slot="container-end"
        className={cn(
          "flex items-center justify-between gap-[32px] pt-[56px]",
          "labtop:pt-[40px]",
          "tablet:gap-[20px] tablet:pt-[30px]",
          "mobile:gap-2 mobile:pt-[20px]",
        )}>
        <NavButton ref={prevButtonRef} dir="left" className={cn("mobile:order-2")} />
        <div
          ref={paginationRef}
          className={cn(
            "!relative !h-[7px] !w-full !bg-white/15",
            "[&_.swiper-pagination-progressbar-fill]:!bg-white",
            "tablet:!h-[5px]",
            "mobile:order-1 mobile:mr-2",
          )}
        />
        <NavButton ref={nextButtonRef} dir="right" className={cn("mobile:order-3")} />
      </nav>
    </Swiper>
  );
}

function NewsCard({ item }) {
  const { langContent } = useLang();

  if (!item) return null;

  const tags = {
    news: {
      label: langContent({
        ko: "보도기사",
        en: "Press Release",
      }),
      theme: "text-dd-blue",
    },
    sns: {
      label: "SNS",
      theme: "text-dd-mint",
    },
  };

  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      keepLang={false}
      className={cn(
        "group/news-card flex flex-col rounded-xl bg-transparent",
        "transition-all duration-300 ease-timing-pop",
        "labtop-only:hover:translate-y-[-20px] labtop-only:hover:bg-white labtop-only:hover:shadow-[4px_4px_8px_rgba(0,0,0,0.15)]",
      )}>
      <div
        className={cn(
          "overflow-hidden rounded-xl",
          "transition-[border-radius] duration-300 ease-timing-pop",
          "labtop-only:group-hover/news-card:rounded-b-none",
          "aspect-[356/196]",
        )}>
        <Thumbnail
          src={item?.thumbnail?.url}
          alt={item.title}
          width={356}
          height={196}
          priority
          className={cn(
            "w-full transition-transform duration-300 ease-timing-pop",
            "bg-dd-gray-lighter labtop-only:group-hover/news-card:scale-[1.2]",
          )}
        />
      </div>
      <div className="flex flex-col items-start gap-2 px-3 py-5">
        <div className={cn("flex items-center gap-2 leading-[1]", "tablet:text-sm/[1.4]")}>
          <span className={cn("font-bold", tags[item.category].theme)}>
            {tags[item.category].label}
          </span>
          <i className={cn("h-[0.8em] w-[1px] translate-y-[-10%] bg-dd-gray")} />
          <span className={cn("font-bold text-dd-gray-dark")}>{item.tag}</span>
        </div>
        <h4
          className={cn(
            "mb-[0.5em] line-clamp-1 w-full text-[22px] font-bold leading-[1.3] text-white",
            "transition-colors duration-300 ease-timing-pop",
            "labtop-only:group-hover/news-card:text-black",
            "tablet:text-xl",
            "mobile:text-lg",
          )}>
          {item.title}
        </h4>
        <span className={cn("text-sm leading-[1.3] text-dd-gray")}>
          {moment(item.published_at).format("YYYY.MM.DD")}
        </span>
      </div>
    </Link>
  );
}

function NavButton({ ref, dir, className }) {
  return (
    <button
      ref={ref}
      className={cn(
        "flex-shrink-0",
        "disabled:pointer-events-none disabled:opacity-50",
        "flex aspect-square w-[75px] items-center justify-center rounded-full border border-[#B5B5B5]",
        "text-2xl text-white",
        "tablet:w-[50px] tablet:text-sm",
        "mobile:w-[50px] mobile:text-sm",
        className,
      )}>
      {dir === "left" ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}
