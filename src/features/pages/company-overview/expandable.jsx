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

export function Expandable() {
  const { langContent, isEng, lang } = useLang();

  return (
    <Section className={cn("mt-[50px]")}>
      <Container width="narrow">
        <SectionHead className={cn("mb-[84px] space-y-6 text-center")}>
          <SectionTitle className={cn("text-5xl/[1.3]", "tablet:text-4xl", "mobile:text-2xl")}>
            {langContent({
              ko: (
                <>
                  웨어러블 로봇의 <strong className={cn("text-dd-blue")}>확장성</strong>
                </>
              ),
              en: (
                <>
                  Step into the Future: <Br />
                  <strong className={cn("text-dd-blue")}>Transforming Lives</strong> with Wearable
                  Robots
                </>
              ),
            })}
          </SectionTitle>
          <SectionDescription className={cn("font-normal leading-[1.6] text-[#AEAEAE]")}>
            {langContent({
              ko: (
                <>
                  엔젤로보틱스는 세계 최고 수준의 웨어러블 로봇 기술력을 바탕으로 <Br pc tablet />
                  웨어러블 로봇의 적용 분야를 점진적으로 확장해 나가고 있습니다.
                </>
              ),
              en: (
                <>
                  Angel Robotics is continuously broadening the scope of wearable robot solutions{" "}
                  <Br pc tablet />
                  with cutting edge technology into new and evolving industries.
                </>
              ),
            })}
          </SectionDescription>
        </SectionHead>
        <div
          className={cn(
            "relative flex items-center justify-between gap-4",
            isEng && "grid grid-cols-2 gap-10",
            "tablet:grid tablet:grid-cols-2 tablet:items-start tablet:gap-8",
            "mobile:flex mobile:flex-col mobile:items-center mobile:gap-12",
          )}>
          <Image
            src={`/images/company/overview/expandable-diagram-${lang}.png`}
            alt=""
            className={cn("mobile:w-[400px]")}
            width={611}
            height={579}
          />
          <ul className={cn("space-y-12", "tablet:space-y-5")}>
            <ExpandableItem
              title={langContent({
                ko: <>의료 분야의 혁신</>,
                en: <>Innovating the Healthcare Field</>,
              })}
              description={langContent({
                ko: (
                  <>
                    웨어러블 로봇은 현재 보행 치료에서 활발하게 활용되고 있으며, <Br pc />
                    의료기관, 복지관, 재활센터 등에서 적극적으로 도입하고 있습니다.
                  </>
                ),
                en: (
                  <>
                    Wearable robots are being actively used in gait rehabilitation and widely
                    adopted across hospitals, welfare facilities, and rehab centers.
                  </>
                ),
              })}
            />
            <ExpandableItem
              title={langContent({
                ko: <>신체 보조에서 인간 능력 증강까지</>,
                en: <>Elevating Assistance to Enhancement</>,
              })}
              description={langContent({
                ko: (
                  <>
                    웨어러블 로봇은 의료를 넘어 노약자의 신체 보조 장치로, <Br pc />더 나아가 인간의
                    능력을 확장하는 혁신적인 도구로 발전할 것입니다.
                  </>
                ),
                en: (
                  <>
                    Wearable robots are evolving beyond assistive devices for the elderly, becoming
                    groundbreaking tools that enhance human potential.
                  </>
                ),
              })}
            />
            <ExpandableItem
              title={langContent({
                ko: <>산업 현장에서의 안전한 근무 환경 조성</>,
                en: <>Establishing a Safe Work Environment</>,
              })}
              description={langContent({
                ko: (
                  <>
                    웨어러블 로봇은 산업 현장에서 근로자의 근골격계를 보호하는 역할을 하며,{" "}
                    <Br pc />
                    안전한 작업 환경을 조성하는 데 기여하고 있습니다.
                  </>
                ),
                en: (
                  <>
                    Wearable robots help protect human musculoskeletal health in the workplace,
                    contributing to safer and more productive work environments.
                  </>
                ),
              })}
            />
            <ExpandableItem
              title={langContent({
                ko: <>미래를 향한 웨어러블 로봇</>,
                en: <>Empowering Future with Wearable Robots</>,
              })}
              description={langContent({
                ko: (
                  <>
                    웨어러블 로봇은 의료, 산업, 국방 분야를 넘어, 개인의 삶을 향상시키는 <Br pc />
                    필수 소비재로 자리 잡아 갈 것입니다.
                  </>
                ),
                en: (
                  <>
                    Wearable robots are poised to become essential tools across healthcare,
                    industry, and defense — ultimately enhancing everyday life for individuals.
                  </>
                ),
              })}
            />
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function ExpandableItem({ title, description }) {
  return (
    <li className={cn("space-y-2", "tablet:space-y-1")}>
      <h3 className={cn("text-2xl/[1.3] font-bold text-dd-blue", "tablet:text-lg")}>{title}</h3>
      <p className={cn("text-lg/[1.6]", "tablet:text-base")}>{description}</p>
    </li>
  );
}
