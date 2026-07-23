import { BrandIntroHero } from "@/features/pages/products/layouts/brand-layouts";
import { ArrowButton } from "@/features/global-ui";

export function IntroHero() {
  return (
    <BrandIntroHero
      title={["Connected Healthcare Solution", "for Returning to Daily Life"]}
      subtitle="ANGEL SUIT"
      backgroundImage="/images/products/angel-suit/brand/intro-hero.jpg"
      backgroundVideo={{
        desktopSrc: "/images/products/angel-suit/brand/intro-hero.mp4",
        mobileSrc: "/images/products/angel-suit/brand/intro-hero-mo.mp4",
      }}
      buttons={
        <ArrowButton
          size="lg"
          borderColor="transparent"
          hoverTextColor="mint"
          bgColor="mint"
          href="h10"
          keepLang={false}>
          ANGEL SUIT H10
        </ArrowButton>
      }
    />
  );
}
