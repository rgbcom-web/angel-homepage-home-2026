import { SubpageWrapper, SubpageHead, SubpageBody, Container, Anchor } from "@/features/layout";
import { ListHeader, ListCounterNotification, Pagination } from "@/features/board/ui";
import { FixedList, List, getList, getFixedList } from "@/features/board/recruit-angel-story";

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `recruit_angel_story_${lang}`,
    itemsPerPage: 10,
    pagesPerBlock: 5,
  };

  const [{ data, count }, { data: fixedData }] = await Promise.all([
    getList(configs.tableName, queryString, configs.itemsPerPage),
    getFixedList(configs.tableName),
  ]);

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead breadcrumb={["채용안내", "엔젤 스토리"]} title={"엔젤 스토리"} />
      </Container>
      <SubpageBody>
        <FixedList list={fixedData} />
        <Anchor id="listHead" />
        <Container width="narrow">
          <ListHeader>
            <ListCounterNotification count={count} />
          </ListHeader>
          <List list={data} />
          <Pagination
            itemsPerPage={configs.itemsPerPage}
            pagesPerBlock={configs.pagesPerBlock}
            listCount={count}
          />
        </Container>
      </SubpageBody>
    </SubpageWrapper>
  );
}
