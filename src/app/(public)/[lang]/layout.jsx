import { LangProvider } from "@/shared/context/lang-provider";
import { AppProvider } from "@/shared/context/app.context";
import { Header } from "@/features/global-navigation/header/header";
import { Footer } from "@/features/global-navigation/footer/footer";
import { FloatingNavigation } from "@/features/global-navigation/floating-navigation/floating-navigation";
import { notFound } from "next/navigation";
import Script from "next/script";

const LANGS = ["ko", "en"];

// 언어별 메타데이터 설정
export async function generateMetadata({ params }) {
  const { lang } = await params;

  if (lang === "ko") {
    return {
      title: {
        default: "엔젤로보틱스",
        template: "%s | 엔젤로보틱스",
      },
      description:
        "막연한 가능성이 기술을 통해 실제의 능력이 될 수 있도록 의지와 바람이 만나 한계를 넘을 수 있도록 로봇이 아닌, 인간의 Ability를 연구합니다. 우리는 기술로 사람의 능력을 재창조합니다.",
    };
  } else {
    return {
      title: {
        default: "Angel Robotics",
        template: "%s | Angel Robotics",
      },
      description:
        "Recreating Human Ability with Technology | We research human ability, not robots, so that vague possibilities can become real abilities through technology, and will and hope can overcome limitations. We recreate human ability with technology.",
    };
  }
}

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Layout({ children, params }) {
  const { lang } = await params;

  if (!LANGS.includes(lang)) {
    notFound();
  }

  return (
    <LangProvider lang={lang}>
      <AppProvider lang={lang}>
        <Header />
        <FloatingNavigation />
        <main>{children}</main>
        <Footer />
      </AppProvider>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_API_KEY}&autoload=false&libraries=services`}
        strategy="beforeInteractive"
      />
    </LangProvider>
  );
}
