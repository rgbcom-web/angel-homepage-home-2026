import { cn } from "@/shared/lib/utils";
import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import {
  IntroHero,
  Features,
  Composition,
  Spec,
  SummaryVideo,
} from "@/features/pages/products/angel-medi/mw10";
import { Anchor } from "@/features/layout";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "MW10",
    },
    en: {
      title: "MW10",
    },
  };

  return metadata[lang];
}

export default function Page() {
  return (
    <ProductContentWrapper className={cn("!space-y-0")}>
      <Anchor id="intro">
        <IntroHero />
      </Anchor>
      <SummaryVideo />
      <Anchor id="feature">
        <Features />
        <Composition />
      </Anchor>
      <Anchor id="specification">
        <Spec />
      </Anchor>
    </ProductContentWrapper>
  );
}
