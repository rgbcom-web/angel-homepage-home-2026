import { cn } from "@/shared/lib/utils";
import { SectionHead, SectionTitle, SectionDescription, BulletList, Br } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";
import { ArrowButton } from "@/features/global-ui";

export function PermanentRecruitment() {
  return (
    <>
      <SectionHead>
        <SectionTitle>상시 채용 공고 (인재 DB 등록)</SectionTitle>
        <SectionDescription>
          엔젤로보틱스는 열정과 잠재력을 가진 인재를 항상 환영합니다.
        </SectionDescription>
      </SectionHead>
      <PermanentRecruitmentTabs />
    </>
  );
}

function PermanentRecruitmentTabs() {
  const tabs = [
    "R&D",
    "Production",
    "Marketing",
    "Sales",
    "Design",
    "Business Admin",
    "Business Strategy",
  ];

  return (
    <Tabs className={cn("w-full")} defaultValue="R&D">
      <TabsList
        className={cn(
          "mb-[50px] w-full gap-2 rounded-none border-b border-b-[#606060]",
          "tablet:flex-wrap tablet:justify-start",
          "mobile:mb-[30px] mobile:flex-wrap mobile:gap-1 mobile:pb-[20px]",
        )}>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            asChild
            className={cn("w-auto flex-auto", "tablet:w-auto")}>
            <Button
              variant="gray-lighter"
              size="lg"
              className={cn(
                "px-[1em]",
                "!rounded-full px-[2em] text-lg font-bold text-dd-gray-dark",
                "labtop-only:hover:bg-dd-gray-lighter labtop-only:hover:text-dd-blue",
                "data-[state=active]:!bg-dd-blue data-[state=active]:!text-white data-[state=active]:!shadow-none",
                "tablet:text-sm",
                "mobile:px-4",
              )}>
              {tab}
            </Button>
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="R&D">
        <PermanentRecruitmentTabContent
          title="연구개발"
          titleSub="Research & Development"
          description="세계 최고의 웨어러블 로봇 설계를 목표로, 최고 수준의 기술력을 바탕으로 고품질의 HW, FW, SW, 기구설계를 합니다. 웨어러블 로봇은 인체와 직접 맞닿는 기술로, 착용자의 안전성과 신뢰성을 최우선으로 고려합니다. 빠르게 변화하는 기술 트렌드에 발맞춰, 설계 및 개발하고 있습니다."
          work={[
            "로봇 하드웨어 설계, 아날로그 및 디지털 센서 신호처리, 로봇관련 사용자 웹/안드로이드 앱 개발 및 데이터 관리, 로봇제어를 위한 알고리즘 개발, 인간동작보조를 위한 실시간 제어 등 ",
          ]}
          qualification={["기계공학, 전기/전자, 컴퓨터 공학 등 관련 전공인 분"]}
          advantage={[
            "SW 설계 및 구현 경험",
            "회로 해석 및 오실로스코프 사용에 능숙하신 분",
            "팀 단위에서 Git 사용 경험 보유하신 분",
          ]}
        />
      </TabsContent>
      <TabsContent value="Production">
        <PermanentRecruitmentTabContent
          title="생산&품질"
          titleSub="Production & Quality"
          description="생산, 품질 관리, 구매 및 자재 관리는 안정적이고 효율적인 생산 운영과 고품질 제품 공급을 목표로 긴밀히 협력합니다. 각 부서의 전문성을 결합하여 고객 만족도를 높이고 회사의 경쟁력을 강화하며, 지속적인 개선을 통해 효율성과 품질을 극대화합니다."
          work={[
            <>
              로봇 조립 및 설계, 제조현장 품질관리 및 개선관리 업무, 구매 계약 관리 및 원가 절감,{" "}
              <Br pc />
              자재 입출고 관리, 가공계획 및 시제품 제작, 양산체계 구축
            </>,
          ]}
          qualification={["메카트로닉스, 기계, 전자, 로봇공학 전공인 분"]}
          advantage={[
            "MS Office 활용이 능숙한 분",
            "유연한 커뮤니케이션 스킬 및 문제해결 능력을 갖춘 분",
          ]}
        />
      </TabsContent>
      <TabsContent value="Marketing">
        <PermanentRecruitmentTabContent
          title="마케팅"
          titleSub="Marketing"
          description="웨어러블 로봇 시장을 효과적으로 창출하고, 시장에서 엔젤로보틱스가 단순히 로봇 개발/제조 회사가 아닌 사람의 능력을 연구 개발하는 회사로서 아이덴티티를 가질 수 있도록 홍보와 마케팅 전략을 기획하고 실행하며, 판매 제품에 대한 잠재고객을 발굴하기 위한 세일즈 리드 창출 활동을 지속적으로 실행합니다."
          work={[
            "마케팅 기획 및 운영, 기업 및 제품 언론 홍보, 신제품 런칭 및 전략 수립, 이커머스 플랫폼 기획 및 운영, 마케팅 캠페인 기획",
          ]}
          qualification={["비즈니스 영어 가능자", "경영학 및 직무 관련 전공자"]}
          advantage={["의료기기 헬스케어 마케팅 경력자"]}
        />
      </TabsContent>
      <TabsContent value="Sales">
        <PermanentRecruitmentTabContent
          title="영업"
          titleSub="Sales"
          description="새로운 고객을 발굴하고 판매가 증진될 수 있게 하는 중요 역할을 수행하며, 고객이 처한 상황에 맞는 최선의 솔루션과 제품 및 서비스를 제공합니다. 당사 및 경쟁사 제품의 특장점에 대한 광범위한 이해를 바탕으로 고객의 니즈를 정확하게 파악해 판매 실적을 달성합니다."
          work={[
            "신규 고객사 발굴 및 잠재고객 대상 영업활동 기획, 국내외 헬스케어 및 의료기기 전시회 참가를 통한 기회발굴 및 시장개발, 지속적인 시장동향 파악 및 판매전략 수립, 해외 시장 확대를 위한 시장조사",
          ]}
          qualification={["전문학사 이상"]}
          advantage={[
            "의료기기 유관경력 또는 병원 근무 경력 우대",
            "비즈니스 영어 가능자",
            "수출입 관리 및 무역일반 지식 보유자 우대",
            <>
              <b>보건의료면허 소지자 우대</b>
            </>,
          ]}
        />
      </TabsContent>
      <TabsContent value="Design">
        <PermanentRecruitmentTabContent
          title="디자인"
          titleSub="Design"
          description="웨어러블 로봇의 미래 표준을 정의하고, 사용자 경험 중심의 디자인을 통해 기능성과 감성적 만족을 모두 충족시키는 혁신적인 제품과 서비스를 창조합니다. 사용자 연구와 디자인 트렌드를 기반으로 완벽하게 조화된 디자인 솔루션을 제공하며, 기술과 인간의 접점을 재정의합니다."
          work={[
            <>
              웨어러블 로봇 외관에 대한 제품디자인 및 하드웨어 디자인, 어패럴 파트 디자인기획 및
              작업지시서 및 샘플 개발, <Br pc />
              자사 브랜드 및 로고 디자인 관리, 사용자 경험
            </>,
          ]}
          qualification={[
            "3D Tool, Photoshop, Illustrator, Powerpoint – 고급수준",
            "3년 이상의 디자인 관련 업무 경험자 (패션, 제품, UX/UI 등)",
            "포토폴리오 제출 필수",
          ]}
          advantage={["웨어러블 로봇 제품에 대한 관심과 이해도가 높은 분"]}
        />
      </TabsContent>
      <TabsContent value="Business Admin">
        <PermanentRecruitmentTabContent
          title="경영지원"
          titleSub="Business Admin"
          description="회사의 지속 가능한 성장과 투명하고 효율적인 운영을 통해 사업 성과를 극대화하고, 글로벌 수준의 경쟁력을 갖춘 조직 환경을 구축하는 데 기여합니다."
          work={[
            "연구소 행정 업무 및 대외 업무",
            "예산 비용관리, 세무관리, 원가관리, IR공시 등",
            "인사, 노무 관리 및 채용 평가보상제도 운영",
          ]}
          advantage={[
            "상경계열 전공",
            "MS Office 활용이 능숙한 분",
            "유연한 커뮤니케이션 스킬 및 문제해결 능력을 갖춘 분",
          ]}
        />
      </TabsContent>
      <TabsContent value="Business Strategy">
        <PermanentRecruitmentTabContent
          title="사업기획"
          titleSub="Business Strategy"
          description="웨어러블 로봇 시장을 이해하고, 시장이 원하는 제품을 만들어 고객에게 전달하기까지의 전반적인 기획 업무를 담당합니다. 기술적인 선행 연구, 디자인에 관한 연구, 새로운 영업 전략과 시장확장 전략 등 엔젤로보틱스의 미래를 계획하는 업무를 담당합니다."
          work={[
            <>
              사업계획서 작성 및 시장기회 및 신사업 발굴, 기업비전 및 사업목표 명료화, <Br pc />
              사업기획 실행 및 성장에 따른 모니터링, 사업실적에 대한 평가 및 개선방안
            </>,
          ]}
          qualification={["경영학 및 직무관련 전공자", "비즈니스 영어 가능자"]}
          advantage={[
            "MBA 등 경영, 사업기획, 마케팅 관련 경험 전공자",
            "서비스 산업 사업기획 경험 보유한 분",
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}

function PermanentRecruitmentTabContent({
  title,
  titleSub,
  description,
  work,
  qualification,
  advantage,
}) {
  return (
    <div className={cn("grid grid-cols-4 gap-[25px]", "tablet:grid-cols-1")}>
      <div
        className={cn(
          "flex flex-col items-start justify-between gap-4",
          "tablet:flex-row tablet:items-start",
        )}>
        <h3
          className={cn(
            "space-y-1 text-3xl font-bold text-dd-navy",
            "tablet:text-2xl",
            "mobile:space-y-0.5 mobile:text-xl",
          )}>
          <span>{title}</span>
          <small className={cn("block text-lg font-normal", "tablet:text-base", "mobile:text-sm")}>
            {titleSub}
          </small>
        </h3>
        <Link href="./permanent/apply">
          <ArrowButton bgColor="navy" dimmerColor="blue" size="lg">
            지원하기
          </ArrowButton>
        </Link>
      </div>
      <div className={cn("col-span-3", "tablet:col-span-1")}>
        <p className={cn("text-xl/[1.8] font-bold", "tablet:text-base/[1.8]")}>{description}</p>
        <br />
        <ul className={cn("flex flex-col gap-4", "mobile:gap-2")}>
          {work && (
            <RecruitmentListItem
              iconSrc="/images/recruit/recruit-permenent-icon-1.svg"
              title="담당업무"
              items={work}
            />
          )}
          {qualification && (
            <RecruitmentListItem
              iconSrc="/images/recruit/recruit-permenent-icon-2.svg"
              title="자격요건"
              items={qualification}
            />
          )}
          {advantage && (
            <RecruitmentListItem
              iconSrc="/images/recruit/recruit-permenent-icon-3.svg"
              title="우대사항"
              items={advantage}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

function RecruitmentListItem({ iconSrc, title, items }) {
  return (
    <li
      className={cn(
        "flex items-start gap-7 rounded-xl bg-dd-gray-lighter/70 p-6",
        "tablet:p-4",
        "mobile:justify-between mobile:gap-4",
      )}>
      <img src={iconSrc} alt="" className={cn("tablet:w-[50px]", "mobile:order-1 mobile:w-10")} />
      <div className={cn("space-y-2", "tablet:space-y-1 tablet:text-base", "mobile:text-base")}>
        <span
          className={cn(
            "block text-xl font-bold text-dd-navy",
            "tablet:text-lg",
            "mobile:text-lg",
          )}>
          {title}
        </span>
        <BulletList items={items} />
      </div>
    </li>
  );
}
