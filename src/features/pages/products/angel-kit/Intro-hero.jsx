"use client";

import { useLang } from "@/shared/context/lang-provider";
import { ProductIntroHero } from "../layouts/default-layouts";

export function IntroHero() {
  const { langContent } = useLang();

  return (
    <ProductIntroHero
      title={langContent({
        ko: "로봇에 특화된 부품과 모듈",
        en: "Components and Modules Specialized for Robotics",
      })}
      subtitle="ANGEL KIT"
      backgroundImage="/images/products/angel-kit/intro-hero.jpg"
    />
  );
}
