export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "엔젤 스토리",
    },
    en: {
      title: "Angel Story",
    },
  };

  return metadata[lang];
}

export default function Layout({ children }) {
  return <>{children}</>;
}
