import { cn } from "@/shared/lib/utils";
import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import {
  IntroHero,
  SummaryVideo,
  Features,
  Applications,
  AngelAPro,
  Spec,
} from "@/features/pages/products/angel-suit/h10";
import { Anchor } from "@/features/layout";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL SUIT H10",
    },
    en: {
      title: "ANGEL SUIT H10",
    },
  };

  return metadata[lang];
}

export default function Page() {
  return (
    <ProductContentWrapper className={cn("!space-y-0 !pb-0")}>
      <Anchor id="intro">
        <IntroHero />
      </Anchor>
      <SummaryVideo />
      <Anchor id="feature">
        <Features />
        <Applications />
      </Anchor>
      <Anchor id="angel-a-pro">
        <AngelAPro />
      </Anchor>
      <Anchor id="specification">
        <Spec />
      </Anchor>
    </ProductContentWrapper>
  );
}
