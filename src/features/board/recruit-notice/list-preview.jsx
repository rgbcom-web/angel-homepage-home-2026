import { cn } from "@/shared/lib/utils";
import { List, getList } from "./";
import { ArrowButton } from "@/features/global-ui";
import { ListHeader, ListCounterNotification } from "../ui";
import { langContent } from "@/shared/lib/utils";

export async function ListPreview({ params }) {
  const { lang } = params;

  const configs = {
    tableName: `recruit_notice_${lang}`,
    itemsPerPage: 5,
  };

  const { data, count } = await getList(configs.tableName, {}, configs.itemsPerPage);

  return (
    <div className={cn("space-y-8")}>
      <div>
        <ListHeader className={cn("mobile:items-start mobile:text-left")}>
          <ListCounterNotification>
            {langContent(lang, {
              ko: (
                <>
                  총 <strong className={cn("font-semibold text-dd-blue")}>{count}</strong>건의
                  공고가 진행중입니다.
                </>
              ),
            })}
          </ListCounterNotification>
        </ListHeader>
        <List list={data} />
      </div>
      <div className={cn("text-center")}>
        <ArrowButton bgColor="navy" dimmerColor="blue" size="lg" href="./recruit/notice">
          채용공고 더보기
        </ArrowButton>
      </div>
    </div>
  );
}
