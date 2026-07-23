import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, Br } from "@/features/layout";

export function PurchaseProcess() {
  return (
    <>
      <SectionHead className={cn("text-center")}>
        <SectionTitle>
          ANGEL MEDI, SUIT <Br mobile />
          제품 구매 절차
        </SectionTitle>
      </SectionHead>
      <div
        className={cn(
          "flex items-center justify-center",
          "tablet:items-stretch tablet:gap-1",
          "mobile:flex-col mobile:justify-normal",
        )}>
        <PurchaseProcessDiagramItem
          num="01"
          title="구매문의"
          description={
            <>
              전화, 이메일, 온라인 문의를 <Br pc />
              통한 상담접수
            </>
          }
          icon="/images/support/purchase-guide-diagram-icon-1.svg"
        />
        <PurchaseProcessDiagramItem
          num="02"
          title="고객상담"
          description={
            <>
              해당 지역 <Br pc />
              담당 영업 직원이 연락
            </>
          }
          icon="/images/support/purchase-guide-diagram-icon-2.svg"
        />
        <PurchaseProcessDiagramItem
          num="03"
          title="현장 방문 및 시연"
          description={
            <>
              담당 영업 직원이 <Br pc />
              현장에 방문하여 상담, <Br pc />
              시연, 데모 진행
            </>
          }
          icon="/images/support/purchase-guide-diagram-icon-3.svg"
        />
        <PurchaseProcessDiagramItem
          num="04"
          title="구매검토"
          description={
            <>
              담당 영업 직원과 <Br pc />
              2차 구매 상담
            </>
          }
          icon="/images/support/purchase-guide-diagram-icon-4.svg"
        />
      </div>
    </>
  );
}

function PurchaseProcessDiagramItem({ num, title, description, icon }) {
  return (
    <div
      className={cn(
        "flex aspect-square w-[290px] flex-col items-center justify-start gap-5 rounded-full border border-[#DCDCDC] p-[30px] pb-[15px] text-center",
        "tablet:aspect-auto tablet:w-full tablet:px-4",
        "mobile:flex-row mobile:items-center mobile:rounded-2xl mobile:py-[20px] mobile:text-left",
      )}>
      <span className={cn("text-xl font-bold text-dd-blue", "tablet:text-base")}>{num}</span>
      <div className={cn("flex flex-col gap-2", "tablet:gap-1", "mobile:gap-0")}>
        <span
          className={cn(
            "mb-[0.1em] text-[26px]/[1.3] font-bold",
            "tablet:text-xl",
            "mobile:text-base",
          )}>
          {title}
        </span>
        <span className={cn("text-[17px]/[1.5] text-dd-gray-dark", "tablet:text-sm")}>
          {description}
        </span>
      </div>
      <img
        src={icon}
        alt=""
        className={cn("mt-auto", "tablet:w-[40px]", "mobile:ml-auto mobile:mt-0 mobile:w-[34px]")}
      />
    </div>
  );
}
