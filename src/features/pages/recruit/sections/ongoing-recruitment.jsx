import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle } from "@/features/layout";
import Link from "next/link";

export function OngoingRecruitment() {
  return (
    <>
      <SectionHead>
        <SectionTitle>현재채용공고</SectionTitle>
      </SectionHead>
      <Link
        href="https://www.saramin.co.kr/zf_user/company-info/view?csn=WTMzenBOQ3NVaW5GdnJWOXpMVmFyUT09"
        target="_blank"
        rel="noopener noreferrer"
        className={cn("relative block overflow-hidden rounded-2xl")}>
        <img
          src="/images/recruit/recruit-ongoing-banner.jpg"
          alt=""
          className={cn("object-cover mobile:h-[150px] mobile:w-full")}
        />
        <div
          className={cn(
            "absolute right-10 top-1/2 flex -translate-y-1/2 items-center gap-6 text-white",
            "tablet:right-5 tablet:top-1/2 tablet:-translate-y-1/2 tablet:gap-4 tablet:text-base",
          )}>
          <span
            className={cn(
              "block text-right text-3xl/[1.2] font-bold",
              "tablet:text-2xl",
              "mobile:text-xl",
            )}>
            진행 중인 채용 정보 <br />
            확인하기
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className={cn("tablet:w-[50px]", "mobile:w-10")}>
            <rect width="72" height="72" rx="36" className={cn("fill-white")} />
            <path
              d="M13.012,2.7,1.506,14.236a1.012,1.012,0,0,1-.594.251A.74.74,0,0,1,.3,14.232.79.79,0,0,1,.284,13.01L12.836.458a1.674,1.674,0,0,1,.478-.342A1.322,1.322,0,0,1,13.874,0a1.3,1.3,0,0,1,.557.116A1.692,1.692,0,0,1,14.9.458L27.456,13.01a.872.872,0,0,1,.263.584.84.84,0,0,1-.263.638.889.889,0,0,1-.618.286.774.774,0,0,1-.582-.286L14.728,2.7V26.96a.858.858,0,1,1-1.716,0Z"
              transform="translate(49.686 21.822) rotate(90)"
            />
          </svg>
        </div>
      </Link>
    </>
  );
}
