import { Pagination } from "@/features/board/ui";
import { List, getList } from "@/features/board/ir-default";

export default async function Page({ params, searchParams }) {
  const { lang } = await params;
  const queryString = await searchParams;

  const configs = {
    tableName: `ir_notice_${lang}`,
    itemsPerPage: 10,
    pagesPerBlock: 5,
  };

  const { data, count } = await getList(configs.tableName, queryString, configs.itemsPerPage);

  return (
    <>
      <List list={data} />
      <Pagination
        itemsPerPage={configs.itemsPerPage}
        pagesPerBlock={configs.pagesPerBlock}
        listCount={count}
      />
    </>
  );
}
