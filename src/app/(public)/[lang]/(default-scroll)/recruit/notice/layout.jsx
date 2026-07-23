export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "채용 중 공고",
    },
    en: {
      title: "Recruitment Notice",
    },
  };

  return metadata[lang];
}

export default function Layout({ children }) {
  return <>{children}</>;
}
