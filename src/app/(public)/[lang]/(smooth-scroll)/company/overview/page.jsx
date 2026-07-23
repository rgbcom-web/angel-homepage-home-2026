import { cn } from "@/shared/lib/utils";
import {
  IntroHero,
  Expandable,
  BusinessArea,
  History,
  Space,
} from "@/features/pages/company-overview";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "개요",
    },
    en: {
      title: "Company Overview",
    },
  };

  return metadata[lang];
}

export default async function Page() {
  return (
    <div className={cn("bg-dark-background text-white")}>
      <IntroHero />
      <Expandable />
      <BusinessArea />
      <History />
      <Space />
    </div>
  );
}
