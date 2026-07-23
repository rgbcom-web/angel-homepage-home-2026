import { langContent } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container } from "@/features/layout";
import { DownloadList, getList } from "@/features/board/download";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "다운로드",
    },
    en: {
      title: "Download",
    },
  };

  return metadata[lang];
}

export default async function Page({ params }) {
  const { lang } = await params;
  const tableName = `download_${lang}`;
  const { data } = await getList(tableName);

  const mediList = data.filter((item) => item.category === "medi");
  const suitList = data.filter((item) => item.category === "suit");
  const gearList = data.filter((item) => item.category === "gear");
  const kitList = data.filter((item) => item.category === "kit");

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={langContent(lang, {
            ko: ["고객지원", "다운로드"],
            en: ["Customer Support", "Download"],
          })}
          title={langContent(lang, {
            ko: "제품 브로슈어 / 매뉴얼",
            en: "Product Brochure and Leaflet",
          })}
        />
      </Container>
      <SubpageBody>
        <div>
          <DownloadList title="medi" list={mediList} />
          <DownloadList title="suit" list={suitList} />
          <DownloadList title="gear" list={gearList} />
          <DownloadList title="kit" list={kitList} />
        </div>
      </SubpageBody>
    </SubpageWrapper>
  );
}
