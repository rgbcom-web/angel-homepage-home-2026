"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import {
  PortalPage,
  PortalPageHeader,
  PortalFetchError,
  PortalSearchForm,
  PortalPagination,
} from "../portal-ui";
import { getResourceList, getResourceNotices } from "./resources-data";

const PAGE_SIZE = 6;
const ICON_MEGAPHONE = "/images/pediatric/resources/icon-megaphone.svg";
const ICON_LOCK = "/images/pediatric/resources/icon-lock.svg";

const TABLE_GRID = cn(
  "grid grid-cols-[60px_minmax(0,1fr)_140px_140px]",
  "tablet:grid-cols-[48px_minmax(0,1fr)_100px]",
  "mobile:grid-cols-[36px_minmax(0,1fr)_72px]",
);

const CELL = cn("px-4 text-[15px] text-[#475569]", "mobile:px-2 mobile:text-sm");
const CELL_CENTER = cn(CELL, "text-center");

function formatResourceDate(dateStr) {
  if (!dateStr) return "";
  const normalized = String(dateStr).replace(/\./g, "-").replace(/\s/g, "");
  const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return dateStr;
  return `${match[1]}. ${match[2].padStart(2, "0")}. ${match[3].padStart(2, "0")}`;
}

export function ResourcesPage({ resources = [], source = "mock", fetchError = null }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);

  const notices = useMemo(() => getResourceNotices(resources), [resources]);
  const filtered = useMemo(
    () => getResourceList(resources, { query: submittedQuery }),
    [resources, submittedQuery],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
    setPage(1);
  };

  return (
    <PortalPage>
      <PortalPageHeader title="자료실" description="다양한 자료를 확인해주세요." />

      {source === "mock" && fetchError && (
        <PortalFetchError>자료실 데이터를 불러오지 못해 임시 목록을 표시합니다.</PortalFetchError>
      )}

      <div className="flex flex-col gap-6">
        <div
          className={cn(
            "flex items-end justify-between gap-4",
            "tablet:flex-col tablet:items-stretch",
          )}>
          <p className="text-base text-[#475569]">
            총 <span className="font-bold text-[#0066FF]">{filtered.length}</span>건
          </p>
          <PortalSearchForm
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0px_4px_12px_rgba(15,23,42,0.02),0px_12px_24px_rgba(0,0,0,0.04)]",
            "tablet:p-4",
            "mobile:p-3",
          )}>
          {notices.length > 0 && (
            <div className="space-y-2">
              {notices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/pediatric/resources/${notice.id}`}
                  className={cn(
                    "flex items-center gap-6 rounded-lg border border-[#BFDBFE] bg-[#F0F6FF] px-5 py-6 transition-colors hover:bg-[#E8F1FF]",
                    "tablet:gap-4 tablet:px-4 tablet:py-5",
                    "mobile:flex-col mobile:items-start mobile:gap-3 mobile:px-4 mobile:py-4",
                  )}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ICON_MEGAPHONE}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-6 w-6 shrink-0"
                  />
                  <div
                    className={cn(
                      "flex min-w-0 flex-1 items-center justify-between gap-4",
                      "mobile:w-full mobile:flex-col mobile:items-start",
                    )}>
                    <p className="truncate text-[17px] font-semibold text-[#1F293B]">
                      {notice.title}
                    </p>
                    <span className={cn("shrink-0 text-[15px] text-[#475569]", "mobile:text-sm")}>
                      {formatResourceDate(notice.date)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div>
            <div className={cn(TABLE_GRID, "rounded-lg bg-[#F1F5F9]")}>
              <div className={cn(CELL_CENTER, "py-3 font-semibold")}>번호</div>
              <div className={cn(CELL, "py-3 font-semibold")}>제목</div>
              <div className={cn(CELL_CENTER, "py-3 font-semibold")}>등록일</div>
              <div className={cn(CELL_CENTER, "py-3 font-semibold", "tablet:hidden")}>조회수</div>
            </div>

            {pageItems.length === 0 ? (
              <p className="py-12 text-center text-sm text-[#94A3B8]">
                {resources.length === 0
                  ? "등록된 자료가 없습니다."
                  : "검색 결과가 없습니다."}
              </p>
            ) : (
              <ul>
                {pageItems.map((item, index) => {
                  const number = filtered.length - ((currentPage - 1) * PAGE_SIZE + index);
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/pediatric/resources/${item.id}`}
                        className={cn(
                          TABLE_GRID,
                          "h-[58px] items-center border-b border-[#E2E8F0] bg-white transition-colors last:border-b-0 hover:bg-[#F8FAFC]",
                          "mobile:h-[52px]",
                        )}>
                        <span className={CELL_CENTER}>{number}</span>
                        <span
                          className={cn(
                            "truncate px-4 text-base font-medium text-[#1E293B]",
                            "mobile:px-2 mobile:text-sm",
                          )}>
                          {item.title}
                        </span>
                        <span className={cn(CELL_CENTER, "whitespace-nowrap mobile:px-1 mobile:text-[11px]")}>
                          {formatResourceDate(item.date)}
                        </span>
                        <span className={cn(CELL_CENTER, "tablet:hidden")}>
                          {item.views ?? 0}회
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <p
          className={cn(
            "flex items-start gap-2 px-6 text-[14px] leading-snug text-[#80858F]",
            "mobile:px-3 mobile:text-[13px]",
          )}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ICON_LOCK}
            alt=""
            width={16}
            height={16}
            aria-hidden
            className="mt-0.5 size-4 shrink-0"
          />
          <span className="min-w-0">
            보안 정책에 따라 자료의 다운로드, 복사, 화면 캡쳐가 제한되어 있습니다.
          </span>
        </p>

        {filtered.length > 0 && (
          <PortalPagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        )}
      </div>
    </PortalPage>
  );
}
