import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { getList } from "./components/api/get";
import CategoryList from "./components/list";

export default async function DownloadCategoryPage() {
  const configs = {
    tableName: `private_download_category_ko`,
  };

  const { data } = await getList(configs.tableName);

  return (
    <Container className={cn("space-y-20", "tablet:space-y-10")} width="narrower">
      <div className={cn("text-center")}>
        <h1 className={cn("text-6xl font-bold", "tablet:text-4xl", "mobile:text-3xl")}>
          다운로드 (Download)
        </h1>
      </div>
      <CategoryList data={data} />
    </Container>
  );
}
