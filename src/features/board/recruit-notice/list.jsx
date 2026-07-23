"use client";

import moment from "moment";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { ListEmpty } from "@/features/board/ui";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { Badge } from "@/shared/shadcn/ui/badge";

export function List({ list }) {
  return (
    <div className={cn("border-y border-black", "tablet:border-y")}>
      <ul>
        {list?.map((item) => (
          <Row key={item.id} item={item} />
        ))}
        {list.length === 0 && <ListEmpty>현재 진행중인 채용공고가 없습니다.</ListEmpty>}
      </ul>
    </div>
  );
}

function Row({ item }) {
  const qs = useQueryString();

  const { start_date, end_date, department, business_place, until_filled } = item;

  // 현재 날짜
  const now = moment();
  const startMoment = start_date ? moment(start_date) : null;
  const endMoment = end_date ? moment(end_date).endOf("day") : null;

  const ongoing =
    (!start_date && !end_date) ||
    (!start_date && endMoment && endMoment.isAfter(now)) ||
    (!end_date && startMoment && startMoment.isBefore(now)) ||
    (startMoment && endMoment && startMoment.isBefore(now) && endMoment.isAfter(now));
  const upcoming = startMoment && startMoment.isAfter(now);
  const expired = endMoment && endMoment.isBefore(now);

  let status;
  if (ongoing) {
    status = "ongoing";
  } else if (upcoming) {
    status = "upcoming";
  } else if (expired) {
    status = "expired";
  }

  let ddayText = "";

  if (!end_date && !upcoming) {
    ddayText = "D-00";
  } else if (upcoming) {
    ddayText = "예정";
  } else if (expired) {
    ddayText = "마감";
  } else {
    const daysLeft = endMoment.diff(now, "days");
    ddayText = `D-${daysLeft}`;
  }

  const badgeVariants = {
    ongoing: "blue",
    upcoming: "outline-blue",
    expired: "gray-light",
  };

  return (
    <li id={item.id} className={cn("scroll-mt-[30vh] border-b border-dd-gray-light/50")}>
      <Link
        href={`./notice/${item.id}?${qs.toString()}`}
        className={cn(
          "group grid grid-cols-[1fr] items-center gap-[20px] px-4 py-6 text-xl",
          "tablet:gap-[10px] tablet:px-2 tablet:py-4 tablet:text-base",
        )}>
        <div>
          <div
            className={cn("mb-[0.6em] flex items-center gap-[0.5em] text-[0.7em]/[1.3] font-bold")}>
            <span className={cn("text-dd-navy")}>{department}</span>
            <span className={cn("text-dd-gray-dark")}>|</span>
            <span className={cn("text-dd-gray-dark")}>{business_place}</span>
          </div>
          <span
            className={cn(
              "mb-[0.5em] line-clamp-1 text-[1.2em] font-semibold group-hover:text-dd-blue group-hover:underline",
            )}>
            {item.title}
          </span>
          {until_filled ? (
            <p className="font-bold text-dd-blue">채용 시 마감</p>
          ) : (
            <div className={cn("!mt-2 flex items-center gap-2")}>
              <Badge variant={badgeVariants[status]}>{ddayText}</Badge>
              <span className={cn("text-[0.8em] font-medium text-dd-gray-dark")}>
                {start_date ? moment(start_date).format("YYYY.MM.DD") : ""} ~{" "}
                {end_date ? moment(end_date).format("YYYY.MM.DD") : ""}
              </span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
}
