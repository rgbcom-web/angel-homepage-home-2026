import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import { IntroHero, LineUp } from "@/features/pages/products/angel-kit";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL KIT",
    },
    en: {
      title: "ANGEL KIT",
    },
  };

  return metadata[lang];
}

export default function Page() {
  return (
    <ProductContentWrapper>
      <IntroHero />
      <LineUp />
    </ProductContentWrapper>
  );
}
