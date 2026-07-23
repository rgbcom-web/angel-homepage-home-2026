import { SubpageWrapper, SubpageHead, SubpageBody, Container } from "@/features/layout";
import { GraySection, Section, Br } from "@/features/layout";
import {
  RecruitImageHero,
  RecruitProcess,
  RecruitFaq,
  RecruitCoreValue,
} from "@/features/pages/recruit/sections";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "채용전형 소개",
    },
    en: {
      title: "Recruitment Information",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={["채용안내", "인재상 및 절차"]}
          title={
            <span className="tracking-[-0.03em]">
              You can{" "}
              <span className="text-dd-blue">
                recreate <Br mobile />
                human ability
              </span>{" "}
              <Br mobile />
              with <span className="text-dd-blue">technology</span> <Br pc mobile />
              at Angel Robotics
            </span>
          }
        />
      </Container>
      <RecruitImageHero
        src="/images/recruit/overview-image-hero.jpg"
        caption="* 위 이미지는 엔젤로보틱스 서울플래닛(본사) 회의실에서 촬영되었습니다."
      />
      <SubpageBody>
        <Section>
          <Container width="narrow">
            <RecruitCoreValue />
          </Container>
        </Section>
        <GraySection>
          <Container width="narrow">
            <RecruitProcess />
          </Container>
        </GraySection>
        <Section>
          <Container width="narrow">
            <RecruitFaq lang={lang} />
          </Container>
        </Section>
      </SubpageBody>
    </SubpageWrapper>
  );
}
