"use client";

import { useLang } from "@/shared/context/lang-provider";
import moment from "moment";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Badge } from "@/shared/shadcn/ui/badge";
import { ListEmpty, Thumbnail } from "@/features/board/ui";

export function List({ list }) {
  const { langContent } = useLang();

  return (
    <ul className={cn("divide-y divide-border border-y border-black")}>
      {list?.map((item) => (
        <li key={item.id}>
          <NewsroomItem item={item} />
        </li>
      ))}
      {(!list || list.length === 0) && (
        <ListEmpty>
          {langContent({
            ko: "등록된 뉴스가 없습니다.",
            en: "No news articles are registered.",
          })}
        </ListEmpty>
      )}
    </ul>
  );
}

const categories = {
  news: {
    label: "보도기사",
    labelEn: "Press Release",
    theme: "blue",
  },
  sns: {
    label: "SNS",
    labelEn: "SNS",
    theme: "mint",
  },
};

function NewsroomItem({ item }) {
  const { langContent } = useLang();
  const category = categories[item.category];
  const tag = item.tag;
  const title = item.title;
  const date = moment(item.published_at).format("YYYY.MM.DD");
  const thumbnail = item.thumbnail?.url;

  return (
    <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
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
          <Badge variant={category.theme} className={cn("text-lg/[1.3] tablet:text-xs")}>
            {langContent({
              ko: category.label,
              en: category.labelEn,
            })}
          </Badge>
          <Badge variant="outline" className={cn("text-lg/[1.3] tablet:text-xs")}>
            {tag}
          </Badge>
        </div>
        <h3
          className={cn(
            "line-clamp-2 text-3xl/[1.4] font-semibold tablet:mb-4 tablet:text-xl",
            "mobile:text-lg",
          )}>
          {title}
        </h3>
        <p className={cn("mt-auto text-base text-dd-gray tablet:text-sm")}>{date}</p>
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
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-full items-center justify-center bg-dd-blue/75",
            "opacity-0",
            "group-hover:opacity-100",
            "tablet:hidden",
          )}>
          <div className={cn("flex flex-col items-center gap-2 text-white")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="69.542"
              height="69.542"
              viewBox="0 0 69.542 69.542"
              className={cn("h-auto tablet:w-[40px]")}>
              <path
                d="M23.042,4.788,2.667,25.21a1.792,1.792,0,0,1-1.051.445A1.31,1.31,0,0,1,.523,25.2,1.4,1.4,0,0,1,.5,23.038L22.729.812a2.965,2.965,0,0,1,.846-.606A2.34,2.34,0,0,1,24.567,0a2.3,2.3,0,0,1,.986.206,3,3,0,0,1,.839.606L48.62,23.038a1.545,1.545,0,0,1,.465,1.034,1.487,1.487,0,0,1-.465,1.13,1.574,1.574,0,0,1-1.095.506,1.371,1.371,0,0,1-1.031-.506L26.08,4.788V47.742a1.52,1.52,0,1,1-3.038,0Z"
                transform="translate(34.833) rotate(45)"
                fill="currentColor"
              />
            </svg>
            <span className={cn("font-bold tablet:text-sm")}>
              {langContent({
                ko: "원문 바로가기",
                en: "View Article",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
