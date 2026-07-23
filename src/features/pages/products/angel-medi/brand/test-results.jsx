"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import {
  BrandSection,
  BrandSectionTitle,
  BrandSectionDescription,
} from "../../layouts/brand-layouts";
import Image from "next/image";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowLeft, ArrowRight } from "@/shared/svgs";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef } from "react";
import { ArrowButton } from "@/features/global-ui";

export function TestResults() {
  const { langContent } = useLang();

  return (
    <BrandSection className={cn("bg-[#2B2B2B]", "tablet:py-24", "mobile:py-20")}>
      <Container className={cn("space-y-[75px]", "tablet:space-y-14", "tablet:space-y-10")}>
        <div className={cn("text-center")}>
          <BrandSectionTitle>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스의 <Br mobile />
                  기술력 검증
                </>
              ),
              en: <>Clinical Test Results</>,
            })}
          </BrandSectionTitle>
          <BrandSectionDescription>
            {langContent({
              ko: (
                <>
                  당사의 웨어러블 로봇 기술력은 <b>여러 임상 논문을 통해 검증</b>이 되었으며,{" "}
                  <Br pc tablet />
                  전국적으로 상급종합병원을 포함한 다양한 의료기관에서 도입하여 활용하고 있습니다.
                </>
              ),
              en: (
                <>
                  Multiple clinical studies have{" "}
                  <b>demonstrated the outstanding clinical effectiveness</b> of ANGEL Robotics.{" "}
                  <Br pc />
                  Explore the research papers on its proven impact.
                </>
              ),
            })}
          </BrandSectionDescription>
        </div>
        <TestResultCarousel
          slides={[
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-7.jpg",
              title: (
                <>
                  The Effects of Over-Ground Robot-Assisted Gait Training for Children with Ataxic
                  Cerebral Palsy: A Case Report
                </>
              ),
              link: "https://www.mdpi.com/1377442",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-8.jpg",
              title: (
                <>
                  Effectiveness of Robotic Exoskeleton-Assisted Gait Training in Spinocerebellar
                  Ataxia: A Case Report
                </>
              ),
              link: "https://www.mdpi.com/1192094",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-9.jpg",
              title: <>Overground robot-assisted gait training for pediatric cerebral palsy</>,
              link: "https://www.mdpi.com/1036280",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-10.jpg",
              title: (
                <>
                  Assistance of a person with muscular weakness using a joint-torque-assisting
                  exoskeletal robot
                </>
              ),
              link: "https://www.mdpi.com/2076-3417/11/7/3114",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-11.jpg",
              title: (
                <>
                  Cardiopulmonary function after robotic exoskeleton-assisted over-ground walking
                  training of a patient with an incomplete spinal cord injury: Case report
                </>
              ),
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6922438/",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-12.jpg",
              title: (
                <>
                  Efficacy of Wearable Exoskeleton for Gait Recovery in Patients With Stroke: A Multicenter Randomized Controlled Trial | Stroke
                </>
              ),
              link: "https://www.ahajournals.org/doi/10.1161/STROKEAHA.125.052763",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-1.jpg",
              title: <>New protocol for early robot-assisted gait training after spinal surgery</>,
              link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11539955/",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-2.jpg",
              title: (
                <>
                  Overground Gait Training With a Wearable Robot in Children With Cerebral Palsy A
                  Randomized Clinical Trial
                </>
              ),
              link: "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2821278",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-3.jpg",
              title: (
                <>
                  Effects and Safety of Wearable Exoskeleton for Robot-Assisted Gait Training: A
                  Retrospective Preliminary Study
                </>
              ),
              link: "https://www.mdpi.com/2252002",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-4.jpg",
              title: (
                <>
                  Feasibility of Overground Gait Training Using an Exoskeletal Wearable Robot in
                  Older Patients with Brain Disorders : A Case Report
                </>
              ),
              link: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002926757",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-5.jpg",
              title: (
                <>
                  Feasibility of Overground Gait Training Using a Joint-Torque-Assisting Wearable
                  Exoskeletal Robot in Children with Static Brain Injury
                </>
              ),
              link: "https://www.mdpi.com/1639110",
            },
            {
              image: "/images/products/angel-medi/brand/test-result-thumb-6.jpg",
              title: (
                <>
                  Effectiveness of Robotic Exoskeleton-assisted Gait Training in a Patient with
                  Guillain-Barré Syndrome: A Case Report
                </>
              ),
              link: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002926755",
            },
          ]}
        />
      </Container>
    </BrandSection>
  );
}

function TestResultCarousel({ slides = [] }) {
  const { langContent } = useLang();

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const swiperOptions = {
    modules: [Navigation],
    loop: true,
    initialSlide: 5,
    loopAdditionalSlides: 3,
    navigation: {
      nextEl: nextButtonRef.current,
      prevEl: prevButtonRef.current,
    },
    centeredSlides: true,
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      1400: {
        slidesPerView: 1,
        spaceBetween: 38,
      },
    },
  };

  useEffect(() => {
    if (prevButtonRef.current && nextButtonRef.current) {
      swiperOptions.navigation.prevEl = prevButtonRef.current;
      swiperOptions.navigation.nextEl = nextButtonRef.current;
    }
  }, [prevButtonRef, nextButtonRef]);

  return (
    <div className={cn("mx-auto w-[312px] space-y-3 pb-32", "tablet:w-[280px] tablet:pb-[120px]")}>
      <h3 className={cn("text-center text-xl font-bold")}>Clinical Test Results</h3>
      <Swiper {...swiperOptions} className={cn("!overflow-visible")}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div>
                <div
                  className={cn(
                    "opacity-20 transition-opacity duration-300 ease-timing-pop",
                    isActive && "opacity-100",
                  )}>
                  <Image src={slide.image} alt="" width={312} height={453} />
                </div>
                <div
                  className={cn(
                    "absolute left-0 top-full flex w-full flex-col items-center gap-4 px-4 pt-4 text-center",
                    "tablet:px-0",
                  )}>
                  <span
                    className={cn(
                      "block text-sm text-white/60",
                      "translate-y-1/2 opacity-0",
                      isActive &&
                        "translate-y-0 opacity-100 transition-[transform_opacity] delay-200 duration-300 ease-timing-pop",
                    )}>
                    {slide.title}
                  </span>
                  <Link href={slide.link} target="_blank" rel="noopener noreferrer">
                    <ArrowButton
                      size="sm"
                      bgColor="black"
                      dimmerColor="blue"
                      className={cn(
                        "border-0 text-sm hover:text-white",
                        "translate-y-1/2 opacity-0",
                        isActive &&
                          "translate-y-0 opacity-100 transition-[transform_opacity] delay-300 duration-300 ease-timing-pop",
                      )}
                      dimmerClassName={cn("bg-dd-blue")}>
                      {langContent({
                        ko: "자세히보기",
                        en: "View Details",
                      })}
                    </ArrowButton>
                  </Link>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
        <nav
          className={cn(
            "absolute left-1/2 top-1/2 z-20 flex w-[calc(100%+130px)] -translate-x-1/2 -translate-y-1/2 justify-between",
            "pointer-events-none",
            "tablet:w-[calc(100%+100px)]",
            "mobile:w-[calc(100%+0px)]",
          )}>
          <TestResultCarouselButton ref={prevButtonRef}>
            <ArrowLeft />
          </TestResultCarouselButton>
          <TestResultCarouselButton ref={nextButtonRef}>
            <ArrowRight />
          </TestResultCarouselButton>
        </nav>
      </Swiper>
    </div>
  );
}

function TestResultCarouselButton({ ref, ...props }) {
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn("!h-15 !w-15 pointer-events-auto border-0 bg-black text-white")}
      {...props}
    />
  );
}
