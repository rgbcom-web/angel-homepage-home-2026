import { PhysicalAIPlatform } from "@/features/pages/company-physical-ai";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "Physical AI Platform",
      description:
        "사람과 환경을 이해하고 지능적인 판단을 안전하고 정교한 움직임으로 연결하는 엔젤로보틱스의 Physical AI Platform을 소개합니다.",
    },
    en: {
      title: "Physical AI Platform",
      description:
        "Discover Angel Robotics’ Physical AI Platform, connecting intelligent decisions to safe and precise movement.",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;

  return <PhysicalAIPlatform lang={lang} />;
}
