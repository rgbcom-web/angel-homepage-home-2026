"use client";

import moment from "moment";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListEmpty } from "@/features/board/ui";
import { useQueryString } from "@/shared/hooks/useQueryString";

export function List({ list }) {
  const qs = useQueryString();
  const pathname = usePathname();

  return (
    <div className={cn("border-y border-black", "tablet:border-y")}>
      <ul>
        {list?.map((item) => (
          <li key={item.id} className={cn("border-b border-dd-gray-light/50")}>
            <Link
              href={`${pathname}/${item.id}?${qs.toString()}`}
              className={cn(
                "group grid grid-cols-[80px_1fr_150px] items-center gap-[20px] py-6 text-xl",
                "tablet:grid-cols-[60px_1fr_120px] tablet:gap-[10px] tablet:py-4 tablet:text-base",
                "mobile:grid-cols-[1fr_100px] mobile:gap-2",
              )}>
              <span
                className={cn(
                  "line-clamp-1 px-1 text-center font-semibold text-dd-gray",
                  "tablet:text-sm",
                  "mobile:hidden",
                )}>
                {item.no}
              </span>
              <span
                className={cn(
                  "line-clamp-1 font-semibold group-hover:text-dd-blue group-hover:underline",
                )}>
                {item.title}
              </span>
              <span className={cn("text-right text-dd-gray", "tablet:text-sm")}>
                {moment(item.published_at || item.created_at).format("YYYY.MM.DD")}
              </span>
            </Link>
          </li>
        ))}
        {list.length === 0 && <ListEmpty />}
      </ul>
    </div>
  );
}
