import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import { IntroHero, Features, AngelAApp } from "@/features/pages/products/angel-suit/brand";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL SUIT",
    },
    en: {
      title: "ANGEL SUIT",
    },
  };

  return metadata[lang];
}

export default function Page() {
  return (
    <ProductContentWrapper>
      <IntroHero />
      <Features />
      <AngelAApp />
    </ProductContentWrapper>
  );
}
