"use client";

import moment from "moment";
import { useParams, usePathname } from "next/navigation";
import { useQueryString } from "@/shared/hooks/useQueryString";

import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Container } from "@/features/layout";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowDownToLine, ChevronUp, ChevronDown, Loader } from "lucide-react";
import { DownloadFileButton } from "@/service/api/download-file-button";
import CKContent from "@/shared/components/ck-editor/ck-content";
import { Badge } from "@/shared/shadcn/ui/badge";
import { ApplyDialog } from "./apply-dialog";

export function RecruitNoticeView({ data, prevData, nextData, tableName }) {
  if (!data) return <BoardViewNotFound />;

  const { start_date, end_date } = data;

  const now = moment();
  const startMoment = start_date ? moment(start_date) : null;
  const endMoment = end_date ? moment(end_date).endOf("day") : null;

  const ongoing =
    (!start_date && !end_date) ||
    (!start_date && endMoment && endMoment.isAfter(now)) ||
    (!end_date && startMoment && startMoment.isBefore(now)) ||
    (startMoment && endMoment && startMoment.isBefore(now) && endMoment.isAfter(now));

  return (
    <Container width="narrower" className={cn("divide-y divide-dd-gray-light/50")}>
      <BoardViewHeader data={data} />
      <BoardViewContent data={data} />
      <BoardViewFileList data={data} />
      <div className={cn("flex justify-end gap-2 pt-8")}>
        {ongoing && (
          <ApplyDialog
            item={data}
            dialogTrigger={
              <Button
                type="button"
                size="lg"
                className={cn(
                  "flex items-center gap-4 py-4 leading-[1em]",
                  "labtop-only:hover:opacity-70",
                  "mobile:w-full",
                )}>
                지원하기
              </Button>
            }
          />
        )}

        <BoardViewListButton />
      </div>
    </Container>
  );
}

function BoardViewHeader({ data }) {
  const { title, views, business_place, department, start_date, end_date } = data;

  // 현재 날짜
  const now = moment();
  const startMoment = moment(start_date);
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
    <div
      className={cn(
        "space-y-4 pb-10 text-left",
        "tablet:space-y-4 tablet:pb-6",
        "mobile:space-y-3 mobile:pb-4",
      )}>
      <h1
        className={cn(
          "text-4xl/[1.3] font-bold",
          "tablet:text-3xl/[1.3]",
          "mobile:text-2xl/[1.3]",
        )}>
        <div
          className={cn("mb-[0.6em] flex items-center gap-[0.5em] text-[0.5em]/[1.3] font-bold")}>
          <span className={cn("text-dd-navy")}>{department}</span>
          <span className={cn("text-dd-gray-dark")}>|</span>
          <span className={cn("text-dd-gray-dark")}>{business_place}</span>
        </div>
        {title}
      </h1>
      <div
        className={cn(
          "flex items-center justify-start space-x-6 text-lg text-dd-gray",
          "tablet:text-base",
          "mobile:space-x-4 mobile:text-sm",
        )}>
        <div className={cn("flex items-center gap-2")}>
          <Badge variant={badgeVariants[status]}>{ddayText}</Badge>
          <span className={cn("")}>
            {start_date ? moment(start_date).format("YYYY.MM.DD") : ""} ~{" "}
            {end_date ? moment(end_date).format("YYYY.MM.DD") : ""}
          </span>
        </div>
        <span className={cn("block h-[0.9em] w-[1px] bg-dd-gray-light")} />
        <span>조회수 : {views}</span>
      </div>
    </div>
  );
}

function BoardViewContent({ data }) {
  return (
    <CKContent
      className={cn("break-words py-12 text-lg/[1.8]", "tablet:py-8 tablet:text-base/[1.8]")}
      content={data?.content}
    />
  );
}

function BoardViewFileList({ data }) {
  if (!data?.attachments || data?.attachments.length === 0) return null;

  const attachments = data?.attachments;

  return (
    <ul className={cn("space-y-2 py-6")}>
      {attachments.map((attachment, index) => (
        <li key={index}>
          <DownloadFileButton
            file={attachment}
            className={cn("group flex items-center justify-start gap-4")}>
            {({ pending }) => (
              <>
                <Button asChild variant="outline" size="icon" rounded={false}>
                  <span
                    className={cn(
                      "pointer-events-none flex-shrink-0 !transition-none group-hover:border-dd-blue group-hover:text-dd-blue",
                    )}>
                    {pending ? (
                      <Loader className={cn("animate-spin tablet:h-4 tablet:w-4")} />
                    ) : (
                      <ArrowDownToLine className={cn("tablet:h-4 tablet:w-4")} />
                    )}
                  </span>
                </Button>
                <span
                  className={cn(
                    "line-clamp-1 text-lg leading-[1em] group-hover:text-dd-blue group-hover:underline",
                    "tablet:text-base",
                  )}>
                  {attachment.originalName}
                </span>
              </>
            )}
          </DownloadFileButton>
        </li>
      ))}
    </ul>
  );
}

function BoardViewPaging({ previous, next }) {
  return (
    <div className={cn("divide-y divide-dd-gray-light/30")}>
      <BoardViewPagingItem direction="next" data={next} />
      <BoardViewPagingItem direction="prev" data={previous} />
    </div>
  );
}

function BoardViewPagingItem({ direction, data }) {
  const { title, id } = data || {};
  const isDisabled = !id;
  const disabledText = {
    prev: "첫 번째 게시글입니다.",
    next: "마지막 게시글입니다.",
  };
  const qs = useQueryString();
  const href = `${id}?${qs.toString()}`;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 py-4 leading-[1em]",
        "hover:opacity-70",
        "mobile:gap-2.5",
        isDisabled && "pointer-events-none opacity-50",
      )}>
      <span className={cn("flex items-center gap-2 font-medium text-dd-blue")}>
        {direction === "prev" ? <ChevronDown /> : <ChevronUp />}
        <span className={cn("mobile:hidden")}>{direction === "prev" ? "이전글" : "다음글"}</span>
      </span>
      <span className={cn("block h-[0.9em] w-[1px] bg-dd-gray-light", "mobile:hidden")} />
      <span className={cn("line-clamp-1 leading-[1em]")}>
        {isDisabled ? disabledText[direction] : title}
      </span>
    </Link>
  );
}

function BoardViewListButton() {
  const qs = useQueryString();
  const { id } = useParams();
  const pathname = usePathname();
  const parentPath = pathname.split("/").slice(0, -1).join("/");

  let href = parentPath;

  if (qs.toString()) {
    href += `?${qs.toString()}`;
  }

  if (id) {
    href += `#${id}`;
  }

  return (
    <Button
      type="button"
      variant="gray-darker"
      size="lg"
      asChild
      className={cn(
        "flex items-center gap-4 py-4 leading-[1em]",
        "labtop-only:hover:opacity-70",
        "mobile:w-full",
      )}>
      <Link href={href}>목록보기</Link>
    </Button>
  );
}

function BoardViewNotFound() {
  const qs = useQueryString();
  const pathname = usePathname();
  const parentPath = pathname.split("/").slice(0, -1).join("/");
  const href = `${parentPath}?${qs.toString()}`;

  return (
    <Container width="narrower">
      <div
        className={cn(
          "flex min-h-[400px] items-center justify-center rounded-3xl bg-dd-gray-lighter/40",
        )}>
        <div className={cn("flex flex-col items-center justify-center gap-12 text-center")}>
          <div className={cn("flex flex-col items-center justify-center gap-4 text-2xl")}>
            <span className={cn("block font-bold text-dd-blue")}>Oops! 404 Not Found</span>
            <p className={cn("text-lg font-medium text-dd-gray")}>존재하지 않는 게시글입니다.</p>
          </div>
          <Button variant="gray-darker">
            <Link href={href}>목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
