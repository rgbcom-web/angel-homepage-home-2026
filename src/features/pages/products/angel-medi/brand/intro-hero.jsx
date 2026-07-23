import { BrandIntroHero } from "@/features/pages/products/layouts/brand-layouts";
import { ArrowButton } from "@/features/global-ui";

export function IntroHero() {
  return (
    <BrandIntroHero
      title={["Connected Healthcare Solution", "for Stepping Forward"]}
      subtitle="ANGEL MEDI"
      backgroundImage="/images/products/angel-medi/brand/intro-hero.jpg"
      backgroundVideo={{
        desktopSrc: "/images/products/angel-medi/brand/intro-hero.mp4",
        desktopPoster: "/images/products/angel-medi/brand/intro-hero-poster.jpg",
      }}
      buttons={
        <>
          <ArrowButton
            size="lg"
            dimmerColor="white"
            bgColor="blue"
            hoverTextColor="blue"
            href="m20"
            keepLang={false}>
            ANGEL LEGS
          </ArrowButton>
          <ArrowButton
            size="lg"
            dimmerColor="white"
            bgColor="blue"
            hoverTextColor="blue"
            href="mw10"
            keepLang={false}>
            MW10
          </ArrowButton>
        </>
      }
    />
  );
}
