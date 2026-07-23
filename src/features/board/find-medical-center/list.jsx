"use client";

import { cn } from "@/shared/lib/utils";
import { FindMedicalCenterListItem } from "./item";
import { ListCounterNotification } from "@/features/board/ui";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";

export function FindMedicalCenterList({ list }) {
  return (
    <div className={cn("flex h-full flex-col gap-4")}>
      <ListCounterNotification
        count={list.length}
        render={(count) => (
          <span>
            총 <strong className={cn("font-semibold text-dd-blue")}>{count}</strong>개의 병원이
            조회되었습니다.
          </span>
        )}
      />
      {list && list.length > 0 ? (
        <ScrollArea
          className={{
            root: cn(
              "h-full rounded-none border-x-0 border-b-0 border-t border-black py-0 pl-0 pr-4",
            ),
            scrollbar: cn("mr-0 py-3"),
          }}>
          <ul
            className={cn(
              "divide-y divide-dd-gray-light/50 overflow-y-auto pt-3",
              "tablet:space-y-2 tablet:divide-y-0",
            )}>
            {list.map((item) => (
              <li key={item.id} className={cn("py-2 first:pt-0 last:pb-0", "tablet:p-0")}>
                <FindMedicalCenterListItem item={item} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <div
          className={cn("flex h-full items-center justify-center rounded-2xl bg-dd-gray-light/15")}>
          <span className={cn("text-xl text-dd-gray-light", "tablet:text-lg", "mobile:text-base")}>
            검색 결과가 없습니다.
          </span>
        </div>
      )}
    </div>
  );
}
