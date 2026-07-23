import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import {
  IntroHero,
  Features1,
  Features2,
  TestResults,
  FindMedicalCenterBanner,
} from "@/features/pages/products/angel-medi/brand";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL MEDI",
    },
    en: {
      title: "ANGEL MEDI",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return (
    <ProductContentWrapper>
      <IntroHero />
      <div>
        <Features1 />
        <Features2 />
        <TestResults />
        {lang === "ko" && <FindMedicalCenterBanner />}
      </div>
      <span className="wrapper-no-padding-bottom" />
    </ProductContentWrapper>
  );
}
