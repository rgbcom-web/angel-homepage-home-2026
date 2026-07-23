import { cn } from "@/shared/lib/utils";
import { SubpageWrapper, SubpageHead, SubpageBody, Container, Anchor } from "@/features/layout";
import { ListHeader, SearchBar, Pagination } from "@/features/board/ui";
import { List, getList } from "@/features/board/ir-download";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const metadata = {
    ko: {
      title: "IR 자료",
    },
    en: {
      title: "IR Materials",
    },
  };

  return metadata[lang];
}

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `ir_material_${lang}`,
    itemsPerPage: 10,
    pagesPerBlock: 5,
  };

  const { data, count } = await getList(configs.tableName, queryString, configs.itemsPerPage);

  return (
    <SubpageWrapper>
      <Container width="narrow">
        <SubpageHead
          breadcrumb={["투자정보", "IR 자료"]}
          title="IR 자료"
          description="IR 자료를 확인해보세요."></SubpageHead>
        <SubpageBody>
          <Anchor id="listHead" />
          <ListHeader className={cn("justify-end")}>
            <SearchBar />
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
