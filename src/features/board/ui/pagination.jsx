"use client";

import { cn } from "@/shared/lib/utils";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { validatePageParam, setPaginationData } from "./pagination.utils";

import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

const buttonClassName = cn(
  "h-[50px] w-[50px] !rounded-full !p-0 text-black/60",
  "tablet:w-[40px] tablet:h-[40px]",
  "mobile:w-[30px] mobile:h-[30px]",
);
const disabledButtonClassName = cn("opacity-50 pointer-events-none");

export function Pagination({ itemsPerPage, pagesPerBlock, listCount }) {
  const qs = useQueryString();
  const pageParam = validatePageParam(qs.get("page"));
  const { currentPage, prevPage, nextPage, paging, isFirstPage, isLastPage, firstPage, lastPage } =
    setPaginationData({
      pageParam,
      listCount,
      itemsPerPage,
      pagesPerBlock,
    });

  const getPageHref = (page) => qs.getUpdatedFullURL({ page });

  return (
    <nav
      className={cn(
        "mt-[70px] flex items-center justify-center gap-[50px]",
        "tablet:mt-8 tablet:gap-6",
        "mobile:mt-6 mobile:gap-2",
      )}>
      <div className={cn("flex items-center gap-4", "tablet:gap-1")}>
        <Button
          asChild
          variant="gray-lighter"
          className={cn(buttonClassName, isFirstPage && disabledButtonClassName)}
          disabled={isFirstPage}>
          <Link href={getPageHref(firstPage)}>
            <DoubleArrowLeft />
          </Link>
        </Button>
        <Button
          asChild
          variant="gray-lighter"
          className={cn(buttonClassName, isFirstPage && disabledButtonClassName)}
          disabled={isFirstPage}>
          <Link href={getPageHref(prevPage)}>
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className={cn("flex items-center justify-center gap-1")}>
        {paging.map((page) => (
          <Button
            key={page}
            asChild
            className={cn(
              buttonClassName,
              "text-xl text-dd-gray",
              page === currentPage && "text-white",
            )}
            variant={page === currentPage ? "blue" : "ghost"}>
            <Link href={getPageHref(page)}>{page}</Link>
          </Button>
        ))}
      </div>
      <div className={cn("flex items-center gap-4", "tablet:gap-1")}>
        <Button
          asChild
          variant="gray-lighter"
          className={cn(buttonClassName, isLastPage && disabledButtonClassName)}
          disabled={isLastPage}>
          <Link href={getPageHref(nextPage)}>
            <ArrowRight />
          </Link>
        </Button>
        <Button
          asChild
          variant="gray-lighter"
          className={cn(buttonClassName, isLastPage && disabledButtonClassName)}
          disabled={isLastPage}>
          <Link href={getPageHref(lastPage)}>
            <DoubleArrowRight />
          </Link>
        </Button>
      </div>
    </nav>
  );
}

function DoubleArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.252"
      height="14.251"
      viewBox="0 0 14.252 14.251"
      className={cn("!h-1/3 !w-auto")}>
      <path
        d="M3305.212,4879l-5.712,5.711,5.712,5.711"
        transform="translate(-3292.374 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M3305.212,4879l-5.712,5.711,5.712,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function DoubleArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14.252"
      height="14.251"
      viewBox="0 0 14.252 14.251"
      className={cn("!h-1/3 !w-auto")}>
      <path
        d="M3299.5,4879l5.712,5.711-5.712,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M3299.5,4879l5.712,5.711-5.712,5.711"
        transform="translate(-3292.375 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.54"
      height="14.251"
      viewBox="0 0 8.54 14.251"
      className={cn("!h-1/3 !w-auto")}>
      <path
        d="M3305.212,4879l-5.712,5.711,5.712,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.54"
      height="14.251"
      viewBox="0 0 8.54 14.251"
      className={cn("!h-1/3 !w-auto")}>
      <path
        d="M3299.5,4879l5.712,5.711-5.712,5.711"
        transform="translate(-3298.086 -4877.586)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
