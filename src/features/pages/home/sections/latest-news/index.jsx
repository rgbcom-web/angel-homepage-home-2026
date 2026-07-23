import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout/container";
import { SectionTitle } from "../../components";
import { NewsSlider } from "./latest-news-list";
import { getList } from "./get";
import { Suspense } from "react";

export async function LatestNews({ lang }) {
  const tableName = `newsroom_${lang}`;
  const { data, error } = await getList(tableName);

  if (!data) return null;

  return (
    <section className={cn("overflow-hidden pb-[120px]")}>
      <Container>
        <div
          className={cn(
            "mb-[72px] flex items-end justify-between gap-[50px]",
            "labtop:mb-[56px]",
            "tablet:mb-[40px] tablet:justify-center tablet:text-center",
            "mobile:mb-[30px]",
          )}>
          <SectionTitle>Latest Updates</SectionTitle>
        </div>
        <Suspense>
          <NewsSlider list={data} />
        </Suspense>
      </Container>
    </section>
  );
}
