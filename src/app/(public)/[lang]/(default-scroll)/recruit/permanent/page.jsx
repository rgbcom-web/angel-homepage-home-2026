import { SubpageWrapper, SubpageHead, SubpageBody, Container } from "@/features/layout";
import { GraySection, Section, SectionHead, SectionTitle, Br } from "@/features/layout";
import {
  RecruitImageHero,
  RecruitProcess,
  PermanentRecruitment,
  RecruitFaq,
} from "@/features/pages/recruit/sections";
import { ListPreview } from "@/features/board/recruit-notice";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "인재 DB 등록",
    },
    en: {
      title: "Permanent Recruitment Information",
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
          breadcrumb={["채용안내", "인재 DB 등록"]}
          title="인재 DB 등록"
          description="인재 DB 등록을 통해 더 넓은 가능성을 만나보세요."
        />
      </Container>
      <RecruitImageHero
        src="/images/recruit/permanent-image-hero.jpg"
        width={1920}
        height={609}
        alt=""
      />
      <SubpageBody>
        <Section>
          <Container width="narrow">
            <PermanentRecruitment />
          </Container>
        </Section>
      </SubpageBody>
    </SubpageWrapper>
  );
}
