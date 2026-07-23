"use client";

import { useLang } from "@/shared/context/lang-provider";
import { ProductIntroHero } from "../layouts/default-layouts";

export function IntroHero() {
  const { langContent } = useLang();

  return (
    <ProductIntroHero
      title={langContent({
        ko: "산업 안전을 위한 웨어러블 슈트",
        en: "Wearable Suit for Industrial Safety",
      })}
      subtitle="ANGEL GEAR"
      backgroundImage="/images/products/angel-gear/intro-hero.jpg"
    />
  );
}
