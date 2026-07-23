import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, SectionDescription, BulletList, Br } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

export function RecruitProcess() {
  return (
    <>
      <SectionHead>
        <SectionTitle>채용절차</SectionTitle>
        <SectionDescription>
          엔젤로보틱스의 기본 프로세스로, 공고 및 고용형태에 따라 채용 전형이 달라질 수 있습니다.
        </SectionDescription>
      </SectionHead>
      <div
        className={cn(
          "mb-[60px] grid grid-cols-4 gap-[25px]",
          "tablet:mb-10 tablet:grid-cols-2 tablet:gap-2",
          "mobile:grid-cols-1",
        )}>
        <RecruitProcessStep
          num="01"
          title="서류전형"
          icon="/images/recruit/recruit-process-step-icon-1.svg"
          contents={[
            "당사 홈페이지 채용 공고 및 채용사이트 공고 지원",
            "합격자에 한해 유선 연락 진행",
          ]}
        />
        <RecruitProcessStep
          num="02"
          title="면접전형"
          icon="/images/recruit/recruit-process-step-icon-2.svg"
          contents={[
            "직무수행능력과 인재상에 맞는 질의 응답 진행",
            "직무나 경력에 따라 1~2회 실시",
            "포트폴리오나 레퍼런스 체크가 추가될 수 있음",
          ]}
        />
        <RecruitProcessStep
          num="03"
          title="연봉 및 처우협의"
          icon="/images/recruit/recruit-process-step-icon-3.svg"
          contents={[
            "최종합격자에 한해 유선 연락 진행",
            <>
              연봉 및 처우산정에 필요한 <Br pc />
              자료 요청
            </>,
          ]}
        />
        <RecruitProcessStep
          num="04"
          title="최종입사 및 교육"
          icon="/images/recruit/recruit-process-step-icon-4.svg"
          contents={[
            <>
              <b>
                최종 입사확정 및 <Br />
                입사서류 안내 메일 진행
              </b>
            </>,
          ]}
        />
      </div>
      <RecruitArticle title="공통 지원자격 요건">
        <BulletList
          items={[
            "해외여행에 결격사유가 없는 분",
            "취업보호대상자(보훈 대상자 및 장애인)는 관계 법령에 따라 우대",
          ]}
        />
      </RecruitArticle>
      <hr className={cn("my-[40px]", "tablet:my-8")} />
      <RecruitArticle title="지원 전 참고 사항">
        <BulletList
          items={[
            <>
              해당 페이지의{" "}
              <Link href={`/ko/recruit/permanent`} className={cn("font-bold")}>
                인재 DB 등록
              </Link>
              에 지원하시는 경우, 적합 포지션 발생 시 해당 부서에서 연락을 드립니다.
            </>,
            <>
              현재 Open되어 있는 포지션은{" "}
              <Link href="/ko/recruit/notice" className={cn("font-bold")}>
                채용 중 공고
              </Link>
              에서 조회가 가능합니다.
            </>,
            "각 전형 결과는 합격자에 한하여 개별 유선 연락 드리며, 불합격자는 이메일로 안내하고 있습니다.",
            "포지션에 따라 채용 전형 중 PT 발표나 과제, 평판조회 등이 추가될 수 있습니다.",
            "입사지원 서류에 허위사실이 있는 경우에는 채용확정 이후라도 채용이 취소될 수 있습니다.",
          ]}
        />
        <br />
        <div className={cn("flex justify-start gap-2", "mobile:flex-col")}>
          <Button variant="gray" size="lg" asChild className={cn("w-[622px] max-w-full")}>
            <Link href="mailto:recruiting@angel-robotics.com">
              <b className={cn("font-bold")}>
                채용문의<span className={cn("mobile:hidden")}></span>
              </b>{" "}
              <span className={cn("mobile:hidden")}>:</span> recruiting@angel-robotics.com
            </Link>
          </Button>
        </div>
      </RecruitArticle>
    </>
  );
}

function RecruitProcessStep({ num, title, icon, contents }) {
  return (
    <div
      className={cn(
        "group relative rounded-xl bg-white px-[25px] py-[20px] pb-[30px]",
        "last:bg-dd-blue last:text-white",
        "tablet:px-6 tablet:py-4 tablet:pb-6",
      )}>
      <div className={cn("flex items-end justify-between gap-4")}>
        <div>
          <span
            className={cn(
              "block text-lg/[1.6] font-bold text-dd-blue",
              "group-last:text-white",
              "tablet:text-base/[1.3]",
            )}>
            {num}
          </span>
          <span
            className={cn(
              "block text-xl/[1.3] font-bold",
              "group-last:text-white",
              "tablet:text-lg",
            )}>
            {title}
          </span>
        </div>
        <img src={icon} alt={title} className={cn("tablet:w-[50px]")} />
      </div>
      <div
        className={cn(
          "relative my-4 ml-[-25px] h-[1px] w-[calc(100%+50px)]",
          "group-last:w-[calc(100%+20px)]",
          "tablet:ml-0 tablet:!w-full",
        )}>
        <div
          className={cn(
            "absolute left-[-1px] top-1/2 h-[40px] w-[19px] -translate-y-1/2 bg-dd-gray-lighter",
            "tablet:hidden",
          )}
          style={{
            clipPath: "polygon(0 0, 100% 50%, 100% 50%, 0 100%)",
          }}
        />
        <div
          className={cn(
            "absolute left-[20px] top-1/2 z-10 h-[2px] w-[calc(100%+15px)] -translate-y-1/2 bg-dd-blue",
            "group-last:w-full group-last:bg-white",
            "tablet:left-0 tablet:z-0 tablet:!w-full",
          )}>
          <span
            className={cn(
              "absolute right-1 top-1/2 h-[20px] w-[20px] -translate-y-1/2 rotate-45 border-r-[2px] border-t-[2px] border-dd-blue",
              "group-last:hidden",
              "tablet:hidden",
            )}
          />
        </div>
      </div>
      <div>
        <BulletList items={contents} />
      </div>
    </div>
  );
}

function RecruitArticle({ title, children }) {
  return (
    <article className={cn("grid grid-cols-4 gap-[25px]", "tablet:grid-cols-1 tablet:gap-[15px]")}>
      <h3 className={cn("text-3xl font-bold text-dd-navy", "tablet:text-xl")}>{title}</h3>
      <div className={cn("col-span-3", "tablet:col-span-1")}>{children}</div>
    </article>
  );
}
