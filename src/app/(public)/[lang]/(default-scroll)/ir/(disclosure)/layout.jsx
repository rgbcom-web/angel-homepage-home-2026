import { cn } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container, Anchor } from "@/features/layout";
import { ListHeader, SearchBar, ListTabButtons } from "@/features/board/ui";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "공시 및 공고사항",
    },
    en: {
      title: "Notice and Announcement",
    },
  };

  return metadata[lang];
}

export default async function Layout({ children }) {
  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={["투자정보", "공시 및 공고사항"]}
          title="공시 및 공고사항"
          description="공시 및 공고사항을 확인해보세요."></SubpageHead>
        <SubpageBody>
          <Anchor id="listHead" />
          <ListHeader className={cn("mobile:gap-y-6")}>
            <ListTabButtons
              items={[
                {
                  href: "notice",
                  label: "공고사항",
                },
                {
                  href: "disclosure-info",
                  label: "공시정보",
                },
                {
                  href: "business-report",
                  label: "사업보고서",
                },
              ]}
            />
            <SearchBar />
          </ListHeader>
          {children}
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
