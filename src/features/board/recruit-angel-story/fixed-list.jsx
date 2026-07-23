"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { FixIcon } from "@/shared/svgs";
import { Badge } from "@/shared/shadcn/ui/badge";
import { Container } from "@/features/layout";
import { Thumbnail } from "@/features/board/ui";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export function FixedList({ list = [] }) {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#fixed-")) return;

    const targetId = hash.replace("#fixed-", "");
    const targetIndex = list.findIndex((item) => String(item.id) === targetId);

    if (targetIndex !== -1 && swiperRef.current) {
      swiperRef.current.slideTo(targetIndex, 0, false);
      containerRef.current?.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, [list]);

  if (!list || list.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative mb-[84px] overflow-hidden pb-[110px] tablet:mb-[60px] tablet:pb-[80px] mobile:mb-[50px] mobile:pb-[50px]",
      )}>
      <div className="absolute bottom-0 left-0 h-3/4 w-full bg-[#F8F8F8]" />
      <Container width="narrow" className="mobile:max-w-full">
        <Swiper
          onSwiper={handleSwiper}
          observer
          observeParents
          spaceBetween={23}
          slidesPerView={3}
          centeredSlides={false}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 8, centeredSlides: true },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1450: { slidesPerView: 3, spaceBetween: 23 },
          }}
          className="fixed-list-swiper !overflow-visible !py-4 mobile:!px-6">
          {list.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <Item item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}

function Item({ item }) {
  const pathname = usePathname();
  const qs = useQueryString();

  const category = item.category;
  const title = item.title;
  const tag = item.tag;
  const thumbnail = item.thumbnail?.url;

  const href = qs.toString() ? `${pathname}/${item.id}?${qs.toString()}` : `${pathname}/${item.id}`;

  return (
    <Link
      href={href}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[5px] bg-white",
        "transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
        "tablet:!translate-y-0 tablet:!shadow-none",
      )}>
      <Thumbnail
        src={thumbnail}
        alt={title}
        className="aspect-[16/9] rounded-b-[5px] bg-[#f9f8f8] object-cover"
        width={400}
        height={225}
      />
      <div className="flex flex-1 flex-col items-center px-[18px] pb-[20px] pt-[30px] text-center">
        {category && (
          <Badge variant={category.color} className="mb-4 text-base tablet:text-sm">
            {category.name}
          </Badge>
        )}
        <h3
          className={cn(
            "mb-auto line-clamp-2 text-2xl font-bold leading-[1.3]",
            "tablet:text-xl",
            "mobile:text-lg",
          )}>
          {title}
        </h3>
        <div className="my-7 h-0.5 w-full bg-[#DCDCDC] tablet:my-5 mobile:my-4" />
        <div className="flex w-full items-center justify-between gap-4">
          <span
            className={cn(
              "truncate text-xl font-medium text-dd-gray",
              "tablet:text-lg",
              "mobile:text-base",
            )}>
            {tag}
          </span>
          <FixIcon className="flex-shrink-0 text-[34px] tablet:text-[28px] mobile:text-[24px]" />
        </div>
      </div>
    </Link>
  );
}
