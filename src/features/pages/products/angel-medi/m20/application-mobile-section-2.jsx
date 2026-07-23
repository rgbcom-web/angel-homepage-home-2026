"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import Image from "next/image";

export function ApplicationMobileSection2() {
  return (
    <section
      className={cn(
        "relative bg-white pb-[80px] text-black",
        "tablet-only:portrait:mt-[-15vh] tablet-only:landscape:mt-[-10vh]",
        "mobile:!mt-0 mobile:pb-20 mobile:pt-0",
      )}>
      <Container className={cn("")}>
        <Content />
      </Container>
    </section>
  );
}

function Content() {
  const { langContent, lang } = useLang();

  return (
    <div className={cn("text-center")}>
      <span className={cn("mb-[0.5em] block text-xl font-bold text-[#707070]", "mobile:text-sm")}>
        ANGEL LEGS M20
      </span>
      <h3 className={cn("mb-10 text-3xl/[1.3] font-bold", "mobile:text-2xl/[1.3]")}>
        {langContent({
          ko: (
            <>
              <b className={cn("text-dd-blue")}>7가지 훈련모드</b>와 <Br />
              세부 설정을 통한 <Br />
              단계별 재활 훈련 제공
            </>
          ),
          en: (
            <>
              Step-by-Step Rehabilitation with <Br tablet />
              <b className={cn("text-dd-blue")}>7 Training Modes</b> and Detailed Customization
            </>
          ),
        })}
      </h3>
      <div className={cn("space-y-2 text-lg", "mobile:text-base")}>
        {langContent({
          ko: (
            <p>
              <span>#일어서기</span>, <span>#앉기</span>, <span>#서있기</span>,{" "}
              <span>#평지보행</span>, <Br />
              <span>#평지보행(스마트)</span>, <span>#계단 오르기</span>, <span>#스쿼트</span>
            </p>
          ),
          en: (
            <p className={cn("[&_span]:inline-block")}>
              <span>#Sit-to-Stand</span>, <span>#Sitting</span>, <span>#Standing</span>,{" "}
              <span>#Level Walking</span>, <Br tablet />
              <span>#Level Walking (Smart)</span>, <span>#Stair Climbing</span>,{" "}
              <span>#Squats</span>
            </p>
          ),
        })}
      </div>
      <Image
        src={`/images/products/angel-medi/m20/app-visual-5-2-mo-${lang}.png`}
        alt=""
        width={1288}
        height={1422}
        className={cn("mx-auto mt-4 w-[600px] max-w-none", "mobile:mt-10 mobile:max-w-full")}
      />
    </div>
  );
}
