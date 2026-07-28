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
  getOrderedEventList,
  getEventCategories,
  formatEventDateRange,
  formatCategory,
  isUpcomingEvent,
} from "./events-data";

const PAGE_SIZE = 10;

const ICON = {
  calendar: "/images/pediatric/events/icon-calendar.svg",
  calendarMuted: "/images/pediatric/events/icon-calendar-muted.svg",
  mapPin: "/images/pediatric/events/icon-map-pin.svg",
  mapPinMuted: "/images/pediatric/events/icon-map-pin-muted.svg",
  arrow: "/images/pediatric/events/icon-arrow.svg",
  arrowMuted: "/images/pediatric/events/icon-arrow-muted.svg",
  chevron: "/images/pediatric/events/icon-chevron-down.svg",
};

function IconImg({ src, size = 16, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn("shrink-0", className)}
    />
  );
}

export function EventsPage({ events = [], source = "mock", fetchError = null }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => getEventCategories(events), [events]);
  const ordered = useMemo(
    () => getOrderedEventList(events, { query: submittedQuery, category }),
    [events, submittedQuery, category],
  );

  const totalPages = Math.max(1, Math.ceil(ordered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = ordered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  return (
    // 피그마 main-content: top ↔ list 간격 16px
    <PortalPage className="gap-4 tablet:gap-4 mobile:gap-6">
      {/* 피그마 top-section: title ↔ controls 32px */}
      <div className="flex flex-col gap-8 mobile:gap-6">
        <PortalPageHeader title="행사" description="행사 정보를 확인해보세요." />

        <div
          className={cn(
            "flex items-center justify-between gap-2",
            "tablet:flex-col tablet:items-stretch tablet:gap-3",
            "mobile:gap-4",
          )}>
          <label
            className={cn(
              "relative inline-flex h-12 w-[200px] shrink-0",
              "tablet:w-full",
            )}>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-4 pr-10 text-[15px] leading-normal text-[#0F172A] outline-none focus:border-[#427DFF]">
              <option value="all">전체 행사</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <IconImg
              src={ICON.chevron}
              className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2"
            />
          </label>

          <PortalSearchForm
            query={query}
            onQueryChange={setQuery}
            onSubmit={handleSearch}
            placeholder="행사를 검색하세요"
          />
        </div>
      </div>

      {source === "mock" && fetchError && (
        <PortalFetchError>행사 데이터를 불러오지 못해 임시 목록을 표시합니다.</PortalFetchError>
      )}

      {ordered.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white py-16 text-center text-sm text-[#94A3B8]">
          {events.length === 0
            ? "등록된 행사가 없습니다. 관리자에서 행사를 등록해 주세요."
            : "검색 결과가 없습니다."}
        </div>
      ) : (
        // 피그마 events-list: 행 간격 16px, list ↔ pagination 26px
        <div className="flex min-w-0 flex-col gap-[26px] mobile:gap-8">
          <ul className="flex flex-col gap-4 mobile:gap-8">
            {pageItems.map((event) => (
              <li key={event.id}>
                <EventRow event={event} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <PortalPagination
              page={currentPage}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </div>
      )}
    </PortalPage>
  );
}

/**
 * 피그마 행 구조
 * - accent(12) + gap(24) + content, 오른쪽 pr(16)
 * - 축소 우선순위: 장소 → 제목 (날짜·CTA 고정)
 */
function EventRow({ event }) {
  const isPast = !isUpcomingEvent(event);

  return (
    <Link
      href={`/pediatric/events/${event.id}`}
      className={cn(
        "flex min-h-[82px] min-w-0 items-stretch gap-6 overflow-hidden rounded-2xl border border-[#E2E8F0] pr-4",
        "shadow-[0px_4px_12px_rgba(15,23,42,0.02)] transition-shadow hover:shadow-md",
        isPast ? "bg-[#F8FAFC]" : "bg-white",
        "mobile:gap-4 mobile:pr-4",
      )}>
      <span
        aria-hidden
        className={cn("w-3 shrink-0 self-stretch", isPast ? "bg-[#E2E8F0]" : "bg-[#0066FF]")}
      />

      <div
        className={cn(
          "flex min-w-0 flex-1 items-center gap-6 py-4",
          "mobile:flex-col mobile:items-stretch mobile:gap-5 mobile:py-5",
        )}>
        {/* 제목 */}
        <div
          className={cn(
            "min-w-[200px] flex-[1_1_0%]",
            "mobile:min-w-0 mobile:w-full mobile:flex-none",
          )}>
          <div
            className={cn(
              "flex min-w-0 items-center gap-[14px]",
              "mobile:flex-wrap mobile:gap-2",
            )}>
            <h3
              className={cn(
                "min-w-0 truncate text-[18px] font-semibold leading-[1.4]",
                "mobile:text-base",
                isPast ? "text-[#64748B]" : "text-[#0F172A]",
              )}>
              {event.title}
            </h3>
            <span
              className={cn(
                "inline-flex shrink-0 items-center rounded-[5px] px-2.5 py-1 text-[14px] font-semibold leading-none",
                "mobile:text-[13px]",
                isPast
                  ? "bg-[#F1F5F9] text-[#64748B]"
                  : "bg-[rgba(255,154,23,0.12)] text-[#FF9A17]",
              )}>
              {formatCategory(event.category)}
            </span>
          </div>
          {event.subtitle ? (
            <p
              className={cn(
                "mt-1 truncate text-[15px] leading-[1.4]",
                "mobile:mt-2 mobile:whitespace-normal mobile:text-sm mobile:leading-relaxed",
                isPast ? "text-[#94A3B8]" : "text-[#475569]",
              )}>
              {event.subtitle}
            </p>
          ) : null}
        </div>

        {/* 날짜 */}
        <div
          className={cn(
            "flex w-[220px] shrink-0 flex-col gap-1.5",
            "mobile:w-full mobile:gap-2",
          )}>
          <div className="flex items-center gap-1.5">
            <IconImg src={isPast ? ICON.calendarMuted : ICON.calendar} className="size-4" />
            <span className="text-[14px] leading-none text-[#94A3B8]">날짜</span>
          </div>
          <p
            className={cn(
              "truncate text-[14px] font-semibold leading-none",
              "mobile:whitespace-normal mobile:leading-snug",
              isPast ? "text-[#94A3B8]" : "text-[#0F172A]",
            )}>
            {formatEventDateRange(event)}
          </p>
        </div>

        {/* 장소 */}
        <div
          className={cn(
            "flex min-w-[120px] max-w-[280px] flex-[0_2_280px] flex-col gap-1.5",
            "mobile:w-full mobile:max-w-none mobile:min-w-0 mobile:flex-none mobile:gap-2",
          )}>
          <div className="flex items-center gap-1.5">
            <IconImg src={isPast ? ICON.mapPinMuted : ICON.mapPin} className="size-4" />
            <span className="text-[14px] leading-none text-[#94A3B8]">장소</span>
          </div>
          <p
            className={cn(
              "truncate text-[14px] font-normal leading-none",
              "mobile:whitespace-normal mobile:leading-snug",
              isPast ? "text-[#94A3B8]" : "text-[#475569]",
            )}>
            {event.location}
          </p>
        </div>

        {/* CTA: 모바일에서는 오른쪽·작게 */}
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E2E8F0] px-6 py-2.5 text-[14px] font-semibold leading-normal",
            "mobile:self-end mobile:gap-1 mobile:px-3.5 mobile:py-1.5 mobile:text-[12px]",
            isPast
              ? "bg-[#F1F5F9] text-[#94A3B8]"
              : "bg-white text-[#0066FF] shadow-[0px_4px_6px_rgba(0,0,0,0.06)]",
          )}>
          자세히보기
          <span
            className={cn(
              "relative inline-flex size-4 items-center justify-center",
              "mobile:size-3.5",
            )}>
            <IconImg
              src={isPast ? ICON.arrowMuted : ICON.arrow}
              size={10}
              className={cn("size-[9.6px]", "mobile:size-2")}
            />
          </span>
        </span>
      </div>
    </Link>
  );
}
