"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  Section,
  SectionHead,
  SectionTitle,
  SectionDescription,
  Container,
  Br,
} from "@/features/layout";
import Image from "next/image";

export function BusinessArea() {
  const { langContent, isEng, lang } = useLang();

  return (
    <Section className={cn("mt-[50px]", "tablet:mt-0")}>
      <Container width="narrow">
        <SectionHead className={cn("mb-[84px] space-y-6 text-center")}>
          <SectionTitle className={cn("text-5xl", "tablet:text-4xl", "mobile:text-2xl")}>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스의 <strong className={cn("text-dd-blue")}>사업영역</strong>
                </>
              ),
              en: (
                <>
                  <strong className={cn("text-dd-blue")}>Angel Robotics'</strong> Business Areas
                </>
              ),
            })}
          </SectionTitle>
          <SectionDescription className={cn("font-normal leading-[1.6] text-[#AEAEAE]")}>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스는 기술적 장벽이 가장 높은 헬스케어 시장을 주요 타겟으로 웨어러블 로봇
                  제품 상용화에 주력하고 있으며, <Br pc />
                  이후 해당 기술력을 바탕으로 산업 안전, 방산까지 전방위적으로 확장을 목표로 하고
                  있습니다. <Br />
                  또한 구동기 등 핵심 부품을 중심으로 내재화에도 지속적으로 힘쓰고 있습니다.
                </>
              ),
              en: (
                <>
                  Angel Robotics is committed to commercializing wearable robots for the healthcare
                  sector, a field that demands significant technical challenges. Building upon this
                  foundation, Angel Robotics aims to extend its reach into industrial safety, as
                  well as military and defense sectors. In addition, a commitment to internalizing
                  key components, such as actuators, drives sustainable growth and strengthens
                  control over technology.
                </>
              ),
            })}
          </SectionDescription>
        </SectionHead>
        <div className={cn("space-y-14", "tablet:space-y-10")}>
          <div className={cn("grid grid-cols-3 gap-4", "mobile:grid-cols-1", "mobile:gap-2")}>
            <Figure
              src="/images/company/overview/biz-1.jpg"
              moSrc="/images/company/overview/biz-1-h.jpg"
              alt=""
              caption={langContent({
                ko: "헬스케어",
                en: "Healthcare",
              })}
            />
            <Figure
              src="/images/company/overview/biz-2.jpg"
              moSrc="/images/company/overview/biz-2-h.jpg"
              alt=""
              caption={langContent({
                ko: "산업안전",
                en: "Industrial Safety",
              })}
            />
            <Figure
              src="/images/company/overview/biz-3.jpg"
              moSrc="/images/company/overview/biz-3-h.jpg"
              alt=""
              caption={langContent({
                ko: "방위산업",
                en: "Military & Defense",
              })}
            />
          </div>
          <p className={cn("text-center text-2xl", "tablet:text-lg")}>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스는 가까운 미래에 <b>웨어러블 로봇</b>을 <Br tablet />
                  누구나 사용하는 <b>필수 소비재</b>가 되도록 할 것입니다.
                </>
              ),
              en: (
                <>
                  Angel Robotics will shape a future where wearable robots become everyday
                  essentials for everyone.
                </>
              ),
            })}
          </p>
        </div>
      </Container>
    </Section>
  );
}

function Figure({ src, moSrc, alt, caption }) {
  return (
    <figure className={cn("relative overflow-hidden rounded-xl")}>
      <Image src={src} alt={alt} width={396} height={488} className={cn("w-full mobile:hidden")} />
      <Image
        src={moSrc}
        alt={alt}
        width={644}
        height={304}
        className={cn("hidden w-full mobile:block")}
      />
      <figcaption
        className={cn(
          "absolute bottom-[30px] left-1/2 flex min-w-[250px] -translate-x-1/2 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-black/100 px-[1em] py-[0.3em] text-center text-3xl font-bold backdrop-blur-sm",
          "tablet:bottom-[10px] tablet:min-w-[160px] tablet:text-xl",
          "mobile:bottom-[10px] mobile:w-[calc(100%-20px)] mobile:bg-black/100 mobile:text-base",
        )}>
        {caption}
      </figcaption>
    </figure>
  );
}
