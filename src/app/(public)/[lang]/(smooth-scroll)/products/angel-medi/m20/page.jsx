import { cn } from "@/shared/lib/utils";
import { ProductContentWrapper } from "@/features/pages/products/layouts/default-layouts";
import {
  IntroHero,
  SummaryVideo,
  Features,
  Application,
  MotionAnalisys,
  Spec,
  Mw10LinkBanner,
  DonationBanner,
} from "@/features/pages/products/angel-medi/m20";
import { Anchor } from "@/features/layout";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "ANGEL LEGS M20",
    },
    en: {
      title: "ANGEL LEGS M20",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return (
    <ProductContentWrapper className={cn("!space-y-0 !pb-0")}>
      <Anchor id="intro">
        <IntroHero />
      </Anchor>
      <SummaryVideo />
      <Anchor id="feature">
        <Features />
      </Anchor>
      <Anchor id="application">
        <Application />
      </Anchor>
      <MotionAnalisys />
      <Anchor id="specification">
        <Spec />
      </Anchor>
      <Mw10LinkBanner />
      {lang === "ko" && <DonationBanner />}
    </ProductContentWrapper>
  );
}
