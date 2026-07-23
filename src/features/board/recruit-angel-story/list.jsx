"use client";

import { usePathname } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Badge } from "@/shared/shadcn/ui/badge";
import { ListEmpty, Thumbnail } from "@/features/board/ui";
import { FixIcon } from "@/shared/svgs";

export function List({ list }) {
  return (
    <ul className={cn("divide-y divide-border border-y border-black")}>
      {list?.map((item) => (
        <li key={item.id} id={item.id} className="scroll-mt-[30vh]">
          <Item item={item} />
        </li>
      ))}
      {(!list || list.length === 0) && <ListEmpty>등록된 컨텐츠가 없습니다.</ListEmpty>}
    </ul>
  );
}

function Item({ item }) {
  const qs = useQueryString();
  const pathname = usePathname();
  const category = item.category;
  const tag = item.tag;
  const title = item.title;
  const thumbnail = item.thumbnail?.url;
  const fixed = item.fixed;

  return (
    <Link
      href={`${pathname}/${item.id}?${qs.toString()}`}
      className={cn(
        "group grid grid-cols-[1fr_432px] gap-x-20 px-[30px] py-[42px]",
        "hover:bg-[#F6F8FF]",
        "tablet:grid-cols-[1fr_220px] tablet:gap-x-8 tablet:!bg-white tablet:px-0 tablet:py-6",
        "mobile:grid-cols-[1fr_180px] mobile:gap-x-6 mobile:py-4",
        "mobile-sm:flex mobile-sm:flex-col-reverse mobile-sm:gap-4",
      )}>
      <div
        className={cn("flex flex-col gap-4", "tablet:gap-3", "mobile:gap-1.5", "mobile-sm:px-2")}>
        <div className={cn("space-x-1")}>
          <Badge variant={category.color} className={cn("text-lg/[1.3] tablet:text-xs")}>
            {category.name}
          </Badge>
        </div>
        <h3
          className={cn(
            "line-clamp-2 text-3xl/[1.4] font-semibold tablet:mb-4 tablet:text-xl",
            "mobile:text-lg",
          )}>
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-4">
          {tag && <p className={cn("line-clamp-1 text-xl text-dd-gray tablet:text-sm")}>{tag}</p>}
          {fixed && (
            <FixIcon className="ml-auto text-[34px] tablet:text-[28px] mobile:text-[24px]" />
          )}
        </div>
      </div>
      <div
        className={cn(
          "relative aspect-[432/230] overflow-hidden rounded border tablet:aspect-[4/3] mobile:aspect-video",
        )}>
        <Thumbnail
          src={thumbnail}
          alt={title}
          className={cn("h-full w-full object-cover")}
          width={430}
          height={230}
        />
      </div>
    </Link>
  );
}
