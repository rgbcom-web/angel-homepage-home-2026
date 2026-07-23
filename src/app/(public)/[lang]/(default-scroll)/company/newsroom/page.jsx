import { SubpageWrapper, SubpageHead, SubpageBody, Container, Anchor } from "@/features/layout";
import {
  ListHeader,
  ListCounterNotification,
  ListCategories,
  Pagination,
} from "@/features/board/ui";
import { List, getList } from "@/features/board/newsroom";
import { langContent } from "@/shared/lib/utils";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "뉴스룸",
    },
    en: {
      title: "Newsroom",
    },
  };

  return metadata[lang];
}

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `newsroom_${lang}`,
    itemsPerPage: 10,
    pagesPerBlock: 5,
  };

  const { data, count, error } = await getList(
    configs.tableName,
    queryString,
    configs.itemsPerPage,
  );

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={langContent(lang, {
            ko: ["회사소개", "뉴스룸"],
            en: ["About Us", "Newsroom"],
          })}
          title="Newsroom"
          description={langContent(lang, {
            ko: "엔젤로보틱스의 주요 소식과 언론 보도를 확인하세요.",
            en: "Check out the latest news and press releases from Angel Robotics.",
          })}
        />
        <SubpageBody>
          <Anchor id="listHead" />
          <ListHeader>
            <ListCounterNotification count={count} />
            <ListCategories
              paramKey="category"
              items={[
                {
                  value: "news",
                  label: "NEWS",
                  theme: "blue",
                },
                {
                  value: "sns",
                  label: "SNS",
                  theme: "mint",
                },
              ]}
              useAll
            />
          </ListHeader>
          <List list={data} />
          <Pagination
            itemsPerPage={configs.itemsPerPage}
            pagesPerBlock={configs.pagesPerBlock}
            listCount={count}
          />
        </SubpageBody>
      </Container>
    </SubpageWrapper>
  );
}
