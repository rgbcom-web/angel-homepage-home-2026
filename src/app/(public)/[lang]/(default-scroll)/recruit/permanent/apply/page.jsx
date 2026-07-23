import { SubpageWrapper, SubpageHead, SubpageBody, Container } from "@/features/layout";
import { RecruitApplyForm } from "@/features/form/recruit-apply/form";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "상시 채용 지원하기",
    },
    en: {
      title: "Permanent Apply",
    },
  };

  return metadata[lang];
}

export default async function Page() {
  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead breadcrumb={["채용안내", "상시 채용 지원하기"]} title="상시 채용 지원하기" />
      </Container>
      <Container width="narrow">
        <SubpageBody>
          <RecruitApplyForm />
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
