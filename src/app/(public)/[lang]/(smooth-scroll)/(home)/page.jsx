import { cn } from "@/shared/lib/utils";
import { PopupList } from "@/features/board/popups/popup-list";
import { IntroCover } from "@/features/pages/home/sections/intro-cover";
import { IntroHero } from "@/features/pages/home/sections/intro-hero";
import { Company } from "@/features/pages/home/sections/company";
import { BrandLineup } from "@/features/pages/home/sections/brand-lineup";
import { Technology } from "@/features/pages/home/sections/technology";
import { LatestNews } from "@/features/pages/home/sections/latest-news";
import { ContactUsBanner } from "@/features/pages/home/sections/contact-us-banner";

export default async function HomePage({ params }) {
  const { lang } = await params;

  return (
    <>
      <PopupList tableName={`popup_${lang}`} />
      <div className={cn("bg-dark-background text-white")}>
        <h1 className="sr-only">엔젤로보틱스 홈페이지</h1>
        <IntroCover />
        <div className={cn("relative z-[0] bg-dark-background")}>
          <IntroHero />
        </div>
        <div className={cn("relative z-[1] bg-dark-background")}>
          <Company />
        </div>
        <div className={cn("relative z-[2] bg-dark-background mobile:z-[4]")}>
          <BrandLineup />
        </div>
        <div className={cn("pointer-events-none relative z-[3]")}>
          <Technology />
        </div>
        <LatestNews lang={lang} />
        <ContactUsBanner />
      </div>
    </>
  );
}
