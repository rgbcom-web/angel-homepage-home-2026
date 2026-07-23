"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, Container, Br } from "@/features/layout";
import { createContext, useState, use } from "react";
import { Button } from "@/shared/shadcn/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useEffect } from "react";
import { CarouselNavigation, CarouselPagination, CarouselButton } from "@/features/global-ui";

const TabContext = createContext();

export function Space() {
  const { langContent, isEng } = useLang();
  const [selectedSpace, setSelectedSpace] = useState(0);

  const tabs = [
    {
      name: langContent({
        ko: "서울 플래닛",
        en: "Planet Seoul",
      }),
      subName: langContent({
        ko: "(본사)",
        en: "(HQ)",
      }),
      address: langContent({
        ko: (
          <>
            서울 광진구 광나루로56길 85 <Br pc />
            (구의동, 테크노마트) 12층 1호
          </>
        ),
        en: (
          <>
            12th floor, Room #1, 85 Gwangnaru-ro56-gil, Gwangjin-gu, <Br pc />
            Seoul (Guui-dong, Techno Mart)
          </>
        ),
      }),
      images: ["space-1-1.jpg", "space-1-2.jpg"],
      activeTheme: "blue",
    },
    {
      name: langContent({
        ko: "대전 플래닛",
        en: "Planet Daejeon",
      }),
      subName: langContent({
        ko: "(선행연구센터)",
        en: "(Advanced research institute)",
      }),
      address: langContent({
        ko: (
          <>
            대전 대덕구 신일서로125번길 <Br tablet />
            78 2동
          </>
        ),
        en: (
          <>
            78, 2nd building, 125beongil, Sinilseo-ro, <Br pc />
            Daedeok-gu, Daejeon
          </>
        ),
      }),
      images: ["space-2-1.jpg", "space-2-2.jpg"],
      activeTheme: "mint",
    },
    {
      name: langContent({
        ko: "하남 플래닛",
        en: "Planet Hanam",
      }),
      subName: langContent({
        ko: "(생산기지)",
        en: "(Production facility)",
      }),
      address: langContent({
        ko: <>경기 하남시 조정대로 150 아이테코 655호</>,
        en: <>655, I-TECO, 150 Jojeong-daero, Hanam-si, Gyeonggi-do</>,
      }),
      images: ["space-3-1.jpg", "space-3-2.jpg"],
      activeTheme: "orange",
    },
  ];

  return (
    <TabContext value={{ selectedSpace, setSelectedSpace }}>
      <section
        className={cn(
          "mt-[100px] bg-[#2B2B2B] !pb-[155px] pt-[250px]",
          "tablet:!py-[100px]",
          "mobile:mt-[40px] mobile:!py-[80px]",
        )}>
        <Container>
          <SectionHead
            className={cn(
              "mb-[84px] flex items-start justify-between gap-4 space-y-0",
              "tablet:flex-col tablet:items-center tablet:gap-10",
              "mobile:gap-4",
              isEng && "mb-[50px] flex-col gap-12",
            )}>
            <SectionTitle className={cn("text-5xl", "tablet:text-4xl", "mobile:text-2xl")}>
              {langContent({
                ko: "사업장",
                en: "Business Site",
              })}
            </SectionTitle>
            <div className={cn("mobile:hidden mobile:w-full")}>
              <TabButtons tabs={tabs} />
            </div>
          </SectionHead>
          <div className={cn("relative")}>
            <Carousel tabs={tabs} />
            <div className={cn("hidden w-full mobile:block")}>
              <TabButtons tabs={tabs} />
            </div>
          </div>
        </Container>
      </section>
    </TabContext>
  );
}

function TabButtons({ tabs }) {
  const { isEng } = useLang();

  return (
    <nav
      className={cn(
        "flex-start flex gap-4",
        "tablet:gap-2",
        "mobile:w-full mobile:flex-col mobile:gap-1",
        isEng && "grid grid-cols-3 mobile:grid-cols-1",
      )}>
      {tabs.map((tab, index) => (
        <TabButton key={tab.name} tab={tab} index={index} />
      ))}
    </nav>
  );
}

function TabButton({ tab, index }) {
  const { isEng } = useLang();
  const { selectedSpace, setSelectedSpace } = use(TabContext);
  const isSelected = selectedSpace === index;

  const activeThemes = {
    blue: {
      bg: "!bg-dd-blue",
      icon: "text-dd-blue",
      hoverIconColor: "group-hover/tab-button:text-dd-blue",
    },
    mint: {
      bg: "!bg-dd-mint",
      icon: "text-dd-mint",
      hoverIconColor: "group-hover/tab-button:text-dd-mint",
    },
    orange: {
      bg: "!bg-dd-orange",
      icon: "text-dd-orange",
      hoverIconColor: "group-hover/tab-button:text-dd-orange",
    },
  };

  const handleClick = () => {
    setSelectedSpace(index);
  };

  return (
    <div className={cn("flex flex-col gap-4 tablet:w-full", "w-full mobile:gap-2")}>
      <Button
        onClick={handleClick}
        variant="gray-lighter"
        size="lg"
        className={cn(
          "group/tab-button min-w-[303px] items-center justify-between gap-[1.5em] bg-black text-left text-[22px] text-[#727272]",
          "pl-[1em] pr-[10px]",
          "hover:bg-black hover:text-white hover:opacity-100",
          isSelected && "pointer-events-none !text-white",
          isSelected && activeThemes[tab.activeTheme].bg,
          "tablet:min-w-0 tablet:pr-2",
          "mobile:h-8 mobile:pr-1.5 mobile:text-sm",
          isEng && "tablet:!h-auto tablet:rounded-lg tablet:!py-[0.3em]",
        )}
        disabled={tab.disabled}>
        <span className={cn("font-bold")}>
          {tab.name}{" "}
          <span
            className={cn(
              "font-normal",
              isEng && "text-[0.7em] tablet:block tablet:leading-[1.3] mobile:inline",
            )}>
            {tab.subName}
          </span>
        </span>
        <span
          className={cn(
            "flex aspect-square w-[30px] items-center justify-center rounded-full bg-[#363636] text-[#A4A4A4]",
            "group-hover/tab-button:bg-white",
            activeThemes[tab.activeTheme].hoverIconColor,
            "transition-all duration-300",
            isSelected && "pointer-events-none bg-white text-dd-blue",
            isSelected && activeThemes[tab.activeTheme].icon,
            "tablet:w-6",
            "mobile:w-5",
          )}>
          <Plus className={cn("mobile:h-4 mobile:w-4")} />
        </span>
      </Button>
      <div className={cn("pl-6 leading-[1.5]", "tablet:px-2 tablet:text-center", "mobile:hidden")}>
        <span
          className={cn(
            "text-white/25 transition-all duration-300",
            isEng && "tablet:text-sm",
            isSelected && "text-white",
            !isSelected && "mobile:hidden",
          )}>
          {tab.address}
        </span>
      </div>
    </div>
  );
}

function Carousel({ tabs }) {
  const { selectedSpace } = use(TabContext);
  const { images, name, address } = tabs[selectedSpace];

  const swiperRef = useRef(null);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const paginationRef = useRef(null);

  const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 4000,
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
  };

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      swiperOptions.navigation.prevEl = prevButtonRef.current;
      swiperOptions.navigation.nextEl = nextButtonRef.current;
    }
    if (paginationRef.current) {
      swiperOptions.pagination.el = paginationRef.current;
    }
  }, [prevButtonRef, nextButtonRef, paginationRef]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.slideTo(0);
      swiper.autoplay.start();
    }
  }, [selectedSpace]);

  return (
    <div className={cn("relative")}>
      <div className={cn("hidden", "mobile:block mobile:pb-3 mobile:text-left mobile:text-sm")}>
        <b className={cn("mb-[0.2em] block")}>{name}</b>
        <span className={cn("opacity-80")}>{address}</span>
      </div>
      <Swiper ref={swiperRef} {...swiperOptions} className={cn("rounded-2xl", "mobile:rounded-lg")}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              src={`/images/company/overview/${img}`}
              alt=""
              width={1400}
              height={698}
              className={cn("w-full")}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <CarouselNavigation
        className={cn(
          "absolute bottom-0 left-0 z-10 w-full p-10",
          "tablet:p-5",
          "mobile:relative mobile:px-2",
        )}>
        <CarouselButton ref={prevButtonRef} direction="prev" size="lg" theme="white" />
        <CarouselPagination ref={paginationRef} theme="white" />
        <CarouselButton ref={nextButtonRef} direction="next" size="lg" theme="white" />
      </CarouselNavigation>
    </div>
  );
}
