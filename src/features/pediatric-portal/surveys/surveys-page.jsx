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
import {
  getSurveyList,
  formatSurveyPeriod,
  getSurveyStatusLabel,
} from "./surveys-data";

const PAGE_SIZE = 6;

const TABLE_GRID = cn(
  "grid grid-cols-[80px_minmax(0,1fr)_240px_140px]",
  "tablet:grid-cols-[56px_minmax(0,1fr)_110px]",
  "mobile:grid-cols-[36px_minmax(0,1fr)_72px]",
);

const CELL = cn("px-4 text-[15px]", "mobile:px-2 mobile:text-sm");
const CELL_CENTER = cn(CELL, "text-center");

export function SurveysPage({ surveys = [], source = "mock", fetchError = null }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => getSurveyList(surveys, { query: submittedQuery, tab: "all" }),
    [surveys, submittedQuery],
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
      <PortalPageHeader title="설문" description="설문 참여 및 결과를 확인하세요." />

      {source === "mock" && fetchError && (
        <PortalFetchError>설문 데이터를 불러오지 못해 임시 목록을 표시합니다.</PortalFetchError>
      )}

      <div className="flex flex-col gap-4">
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
            "overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0px_4px_12px_rgba(15,23,42,0.02),0px_12px_24px_rgba(0,0,0,0.04)]",
            "tablet:p-4",
            "mobile:p-3",
          )}>
          <div className={cn(TABLE_GRID, "rounded-lg bg-[#F1F5F9]")}>
            <div className={cn(CELL_CENTER, "py-3 font-semibold text-[#475569]")}>번호</div>
            <div className={cn(CELL, "py-3 font-semibold text-[#475569]")}>제목</div>
            <div className={cn(CELL_CENTER, "py-3 font-semibold text-[#475569]", "tablet:hidden")}>
              기간
            </div>
            <div className={cn(CELL_CENTER, "py-3 font-semibold text-[#475569]")}>상태</div>
          </div>

          {pageItems.length === 0 ? (
            <p className="py-12 text-center text-sm text-[#94A3B8]">
              {surveys.length === 0
                ? "등록된 설문이 없습니다."
                : "검색 결과가 없습니다."}
            </p>
          ) : (
            <ul>
              {pageItems.map((item, index) => {
                const ongoing = item.status === "ongoing";
                const number = filtered.length - ((currentPage - 1) * PAGE_SIZE + index);
                const formUrl = String(item.googleFormUrl || "").trim();
                const canOpenForm = ongoing && Boolean(formUrl);
                const muted = ongoing ? "text-[#475569]" : "text-[#94A3B8]";
                const rowClass = cn(
                  TABLE_GRID,
                  "h-[66px] items-center border-b border-[#E2E8F0] last:border-b-0",
                  ongoing ? "bg-white" : "bg-[#F8FAFC]",
                  "mobile:h-[58px]",
                  canOpenForm && "cursor-pointer transition-colors hover:bg-[#F8FAFC]",
                );

                const rowContent = (
                  <>
                    <span className={cn(CELL_CENTER, muted)}>{number}</span>
                    <span
                      className={cn(
                        "truncate px-4 text-base font-medium",
                        "mobile:px-2 mobile:text-sm",
                        ongoing ? "text-[#1E293B]" : "text-[#94A3B8]",
                      )}>
                      {item.title}
                    </span>
                    <span className={cn(CELL_CENTER, muted, "tablet:hidden")}>
                      {formatSurveyPeriod(item)}
                    </span>
                    <span className={cn("flex justify-center px-4", "mobile:px-1")}>
                      <span
                        className={cn(
                          "rounded-md px-3.5 py-1.5 text-sm font-bold",
                          "mobile:px-2 mobile:py-1 mobile:text-xs",
                          ongoing
                            ? "bg-[#EFF6FF] text-[#0066FF]"
                            : "bg-[#F1F5F9] text-[#94A3B8]",
                        )}>
                        {getSurveyStatusLabel(item.status)}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={item.id}>
                    {canOpenForm ? (
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={rowClass}>
                        {rowContent}
                      </a>
                    ) : (
                      <Link href={`/pediatric/surveys/${item.id}`} className={rowClass}>
                        {rowContent}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {filtered.length > 0 && (
          <PortalPagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        )}
      </div>
    </PortalPage>
  );
}
