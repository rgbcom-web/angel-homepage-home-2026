import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { getList } from "./components/api/get";
import { DownloadList } from "./components/list";

export default async function DownloadPage({ params }) {
  const { categoryId } = await params;

  const configs = {
    tableName: `private_download_ko`,
    categoryTableName: `private_download_category_ko`,
  };

  const { data, category } = await getList(
    configs.tableName,
    configs.categoryTableName,
    categoryId,
  );

  return (
    <Container className={cn("space-y-20", "tablet:space-y-10")}>
      <div className={cn("text-center")}>
        <h1 className={cn("text-6xl font-bold", "tablet:text-4xl", "mobile:text-3xl")}>
          {category.title}
        </h1>
      </div>
      <div className={cn("grid gap-20")}>
        <DownloadList data={data} />
      </div>
    </Container>
  );
}
