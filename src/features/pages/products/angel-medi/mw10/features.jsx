"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Br, BulletList } from "@/features/layout";
import { ProductSection } from "@/features/pages/products/layouts/default-layouts";
import Image from "next/image";

export function Features() {
  const { langContent, isEng } = useLang();

  return (
    <ProductSection
      containerProps={{
        className: cn(
          "flex items-center !space-y-0 ",
          "tablet:grid tablet:grid-cols-2",
          "mobile-sm:grid-cols-1",
        ),
      }}
      className={cn("py-20", "tablet:pt-0", "tablet:mt-40")}>
      <div className={cn("space-y-10", "tablet:space-y-6", "mobile:space-y-4")}>
        <h2
          className={cn(
            "text-[38px]/[1.5] font-bold",
            "tablet:break-normal tablet:text-3xl",
            "mobile:text-xl mobile-sm:text-center",
          )}>
          {langContent({
            ko: (
              <>
                MW10는 사용자가 <Br tablet />
                넘어지지 않도록 <Br pc />
                스트랩을 <Br tablet />
                이용해 사용자와 로봇의 <Br pc />
                <Br tablet />
                무게를 지탱하는 이동형 <Br tablet />
                안전장치입니다.
              </>
            ),
            en: (
              <>
                The MW10 is a suspension walker that utilizes straps to support both the user and
                the wearable robot, <b>preventing falls and reducing weight load.</b>
              </>
            ),
          })}
        </h2>
        <BulletList
          items={langContent({
            ko: ["착용자 낙상 방지", "착용자 지지 및 체중 부하 경감"],
            en: [
              "To prevent falls",
              <>
                To reduce the weight burden on <Br pc />
                both the patient and the wearable robot
              </>,
            ],
          })}
          className={{
            root: cn("text-[28px] text-[#BFBFBF]", "tablet:text-xl", "mobile:text-base"),
            item: cn(
              "mobile:rounded-full mobile:bg-white/10 mobile:py-1.5 mobile:pl-0 mobile:text-center mobile:text-white/70",
              isEng && "mobile:rounded-lg",
            ),
            bullet: cn("mobile:hidden"),
          }}
        />
        <p className={cn("text-[#BFBFBF]", "mobile:text-sm", "mobile-sm:text-center")}>
          {langContent({
            ko: "이 제품은 의료기기이며, '사용상의 주의사항'과 '사용방법'을 잘 읽고 사용하십시오.",
            en: "To expand ANGEL LEGS M20’s applicable patient range: Enables gait training for patients with weakened lower limb or core muscles, combined with the ANGEL LEGS M20 and MW10",
          })}
        </p>
      </div>
      <Image
        src="/images/products/angel-medi/mw10/feature-visual.png"
        alt="MW10"
        width={750}
        height={750}
        className={cn("mx-auto", "mobile-sm:max-w-[320px]")}
      />
    </ProductSection>
  );
}
