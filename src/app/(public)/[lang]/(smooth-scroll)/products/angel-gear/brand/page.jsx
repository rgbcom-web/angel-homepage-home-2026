import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import { IntroHero, Solutions, Technology } from "@/features/pages/products/angel-gear";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL GEAR",
    },
    en: {
      title: "ANGEL GEAR",
    },
  };

  return metadata[lang];
}

export default function Page() {
  return (
    <ProductContentWrapper>
      <IntroHero />
      <Solutions />
      <Technology />
    </ProductContentWrapper>
  );
}
