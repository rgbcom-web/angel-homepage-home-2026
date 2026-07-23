import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { SectionHead, SectionTitle, SectionDescription, Br } from "@/features/layout";

export function RecruitCoreValue({ lang }) {
  return (
    <>
      <SectionHead>
        <SectionTitle>인재상</SectionTitle>
        <SectionDescription>
          엔젤로보틱스가 함께 일할 분들을 선택하는 기준입니다.
        </SectionDescription>
      </SectionHead>
      <ol className={cn("grid grid-cols-3 gap-5", "tablet:grid-cols-1", "mobile:gap-8")}>
        <li>
          <CoreValueItem
            img="overview-core-value-1.jpg"
            num="01"
            title="성과지향"
            subtitle={
              <>
                <span className="text-dd-blue">P</span>erformance-oriented
              </>
            }
            description={
              <>
                엔젤러는 스스로 도전적인 목표를 부여하고 <Br pc />
                이를 달성하기 위한 강한 의지와 실행력을 갖춥니다. <Br pc />
                목표 달성에 저항이나 장애가 있더라도 <Br pc />
                포기하지 않고 대안을 찾아냅니다.
              </>
            }
          />
        </li>
        <li>
          <CoreValueItem
            img="overview-core-value-2.jpg"
            num="02"
            title="전문성"
            subtitle={
              <>
                <span className="text-dd-blue">P</span>rofessional
              </>
            }
            description={
              <>
                엔젤러는 남다른 호기심을 바탕으로 맡은 분야에서 <Br pc />
                최고 전문가가 될 수 있도록 부단히 노력합니다. <Br pc />
                본인만의 지식과 능력을 바탕으로 성공을 쟁취합니다.
              </>
            }
          />
        </li>
        <li>
          <CoreValueItem
            img="overview-core-value-3.jpg"
            num="03"
            title="책임감"
            subtitle={
              <>
                res<span className="text-dd-blue">P</span>onsibility
              </>
            }
            description={
              <>
                엔젤러는 주어진 업무가 완수될 때까지 <Br pc />
                주인 의식을 가지고 최선을 다하며, 회사의 비전과 조직의 <Br pc />
                목표를 달성하기 위해 끝까지 도전합니다.
              </>
            }
          />
        </li>
      </ol>
    </>
  );
}

function CoreValueItem({ img, num, title, subtitle, description }) {
  return (
    <figure
      className={cn(
        "tablet:grid tablet:grid-cols-[1fr_2fr] tablet:gap-6",
        "mobile:grid-cols-1 mobile:gap-4",
      )}>
      {img && (
        <Image
          src={`/images/recruit/${img}`}
          alt=""
          width={387}
          height={314}
          className={cn(
            "w-full rounded-[15px] object-cover",
            "tablet:rounded-2",
            "mobile:aspect-video",
          )}
        />
      )}
      <figcaption
        className={cn(
          "mt-[33px] text-center",
          "tablet:mt-0 tablet:py-2 tablet:text-left",
          "mobile:py-0 mobile:pl-2",
        )}>
        <h3 className={cn("align-center flex flex-col", "tablet:block")}>
          <span
            className={cn(
              "text-xl font-semibold text-[#656565]",
              "tablet:mr-2 tablet:text-2xl",
              "mobile:text-2xl",
            )}>
            {num}
          </span>
          <span
            className={cn(
              "mb-1.5 text-4xl font-bold leading-[1.3] text-black",
              "tablet:text-2xl",
              "mobile:text-2xl",
            )}>
            {title}
          </span>
          <span
            className={cn(
              "text-xl font-bold tracking-[-0.04em] text-[#656565]",
              "tablet:mt-2 tablet:block tablet:text-lg",
              "mobile:mt-1.5",
            )}>
            {subtitle}
          </span>
        </h3>
        <p className={cn("mt-6 tracking-[-0.05em] text-dd-gray-dark", "tablet:mt-3")}>
          {description}
        </p>
      </figcaption>
    </figure>
  );
}
