import { cn } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container, Br } from "@/features/layout";
import { langContent } from "@/shared/lib/utils";
import { ContentCarousel } from "@/features/pages/company-technology";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "핵심기술",
    },
    en: {
      title: "Core Technology",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return (
    <SubpageWrapper className={cn("bg-dark-background !pb-0 text-white")}>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={langContent(lang, {
            ko: ["회사소개", "핵심기술"],
            en: ["About Us", "Core Technology"],
          })}
          title={langContent(lang, {
            ko: "엔젤로보틱스의 핵심기술",
            en: "Core Technology of Angel Robotics",
          })}
          description={
            <div className={cn("space-y-[1em] pt-[1em]")}>
              {langContent(lang, {
                ko: (
                  <>
                    <p>
                      웨어러블 로봇의 핵심 요소는 인간과 로봇이 <Br mobile />
                      자연스럽게 상호 작용하며 <Br pc tablet />
                      마치 한몸처럼 움직일 수 <Br mobile />
                      있는 <b className={cn("text-dd-blue")}>상호 연결성</b>을 구현하는데 있습니다.
                    </p>
                    <p>
                      엔젤로보틱스는 이를 위해 착용자의 행동 의도를 <Br mobile />
                      정확히 파악하고, <Br tablet />
                      정밀한 보조력을 제공하면서도 편안하고 자연스러운 움직임을 <Br pc tablet />
                      구현하는 독자적인 기술력을 바탕으로 제품을 개발하고 있으며, <Br tablet />
                      디지털 커넥티드 헬스케어 솔루션을 확장해 나가고 있습니다.
                    </p>
                  </>
                ),
                en: (
                  <>
                    <p>
                      The essence of wearable robots is to enable seamless interaction between human
                      and robot—moving in perfect harmony. <Br pc />
                      This is accomplished through{" "}
                      <b className={cn("text-dd-blue")}>mutual responsiveness</b> between the human
                      and the robot.
                    </p>
                    <p>
                      Angel Robotics develops proprietary technologies that accurately detect the
                      user's movement intent and provide precise assistance, ensuring natural and
                      comfortable motion. Building on unique technological advantages, Angel
                      Robotics is also expanding into digital connected healthcare solutions.
                    </p>
                  </>
                ),
              })}
            </div>
          }
          className={{ title: cn("text-white"), breadcrumb: cn("text-white") }}
        />
      </Container>
      <ContentCarousel />
    </SubpageWrapper>
  );
}
