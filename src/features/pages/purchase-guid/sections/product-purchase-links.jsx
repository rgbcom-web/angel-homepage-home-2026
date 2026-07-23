"use client";

import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, Br } from "@/features/layout";
import Link from "next/link";
import { ArrowButton } from "@/features/global-ui";
import { GEAR_STORE_LINKS } from "@/app/app-constants";

export function ProductPurchaseLinks() {
  return (
    <>
      <SectionHead className={cn("text-center")}>
        <SectionTitle>ANGEL GEAR 제품 구매</SectionTitle>
      </SectionHead>
      <div
        className={cn(
          "flex items-center justify-center gap-5",
          "tablet:items-stretch tablet:gap-2",
          "mobile:grid mobile:grid-cols-2 mobile:gap-2",
        )}>
        <PurchaseCard
          href={GEAR_STORE_LINKS.angel_x}
          title="ANGEL X"
          image="/images/support/purchase-guide-angel-x.png"
        />
        <PurchaseCard
          href={GEAR_STORE_LINKS.angel_gear_soft_b10}
          title={
            <>
              ANGEL GEAR <Br tablet mobile />
              soft B10
            </>
          }
          image="/images/support/purchase-guide-angel-gear-soft-b10.png"
        />
        <PurchaseCard
          href={GEAR_STORE_LINKS.angel_gear_soft_w10}
          title={
            <>
              ANGEL GEAR <Br tablet mobile />
              soft W10
            </>
          }
          image="/images/support/purchase-guide-angel-gear-soft-w10.png"
        />
        <PurchaseCard
          href={GEAR_STORE_LINKS.angel_gear_soft_w11}
          title={
            <>
              ANGEL GEAR <Br tablet mobile />
              soft W11
            </>
          }
          image="/images/support/purchase-guide-angel-gear-soft-w11.png"
        />
      </div>
    </>
  );
}

function PurchaseCard({ href, image, title }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group",
        "relative block overflow-hidden rounded-2xl bg-dd-gray-light/30",
        "tablet:flex tablet:flex-col",
        "mobile:rounded-lg",
      )}
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
          e.stopPropagation();
          window.alert("출시 준비중입니다.");
        }
      }}>
      <img src={image} alt="" className={cn("mx-auto w-full", "mobile:w-[150px]")} />
      <span className={cn("absolute right-[20px] top-1/2 -translate-y-1/2", "tablet:hidden")}>
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-white text-dd-gray-dark",
            "[&_svg]:h-2/3 [&_svg]:w-2/3",
            "transition duration-300 group-hover:scale-0 group-hover:opacity-0",
          )}>
          <PurchaseCardArrow />
        </span>
      </span>
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-full bg-black/50 opacity-0 mix-blend-multiply",
          "transition duration-300 group-hover:opacity-100",
          "tablet:hidden",
        )}
      />
      <div
        className={cn(
          "absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center px-[10px] text-center text-white",
          "tablet:relative tablet:h-full tablet:justify-end tablet:rounded-2xl tablet:bg-white tablet:px-2 tablet:py-4 tablet:shadow-lg",
          "mobile:rounded-lg mobile:px-4",
        )}>
        <h3
          className={cn(
            "mb-2 w-full text-[40px]/[1.1] font-bold",
            "translate-y-[20px] opacity-0",
            "transition duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            "tablet:my-auto tablet:translate-y-0 tablet:text-lg/[1.2] tablet:text-black tablet:opacity-100",
            "mobile:text-lg/[1.3]",
          )}>
          {title}
        </h3>
        <div className={cn("mt-2")}>
          <ArrowButton
            bgColor="orange"
            hoverEffect={false}
            className={cn(
              "hover:bg-dd-orange",
              "-translate-y-[20px] opacity-0",
              "transition duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              "tablet:mb-0 tablet:translate-y-0 tablet:text-sm tablet:opacity-100",
              "mobile:text-xs/[1.3]",
            )}>
            스토어 바로가기
          </ArrowButton>
        </div>
      </div>
    </Link>
  );
}

function PurchaseCardArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.33"
      height="18.265"
      viewBox="0 0 18.33 18.265">
      <path
        d="M14.574,9.782l-7.582,7.6a.667.667,0,0,1-.391.166.487.487,0,0,1-.407-.168.52.52,0,0,1-.007-.805L14.458,8.3a1.1,1.1,0,0,1,.315-.226A.871.871,0,0,1,15.142,8a.857.857,0,0,1,.367.077,1.115,1.115,0,0,1,.312.226l8.271,8.271a.575.575,0,0,1,.173.385.553.553,0,0,1-.173.42.586.586,0,0,1-.407.188.51.51,0,0,1-.383-.188l-7.6-7.6V25.765a.565.565,0,1,1-1.131,0Z"
        transform="translate(26.33 -6) rotate(90)"
        fill="currentColor"
      />
    </svg>
  );
}
