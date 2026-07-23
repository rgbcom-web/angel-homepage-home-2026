"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import {
  PortalPage,
  PortalPageHeader,
  PortalFetchError,
  PortalSearchForm,
} from "../portal-ui";
import {
  getEventList,
  splitEventsBySchedule,
  getEventCategories,
  formatEventDateRange,
  formatCategory,
} from "./events-data";

const ICON = {
  calendar: "/images/pediatric/events/icon-calendar.svg",
  calendarMuted: "/images/pediatric/events/icon-calendar-muted.svg",
  mapPin: "/images/pediatric/events/icon-map-pin.svg",
  mapPinMuted: "/images/pediatric/events/icon-map-pin-muted.svg",
  arrow: "/images/pediatric/events/icon-arrow.svg",
  arrowMuted: "/images/pediatric/events/icon-arrow-muted.svg",
  chevron: "/images/pediatric/events/icon-chevron-down.svg",
};

const CARD_GAP = 24;

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

function getCarouselStep(scroller) {
  const firstCard = scroller?.querySelector("[data-event-card]");
  if (!firstCard) return 0;
  return firstCard.getBoundingClientRect().width + CARD_GAP;
}

export function EventsPage({ events = [], source = "mock", fetchError = null }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => getEventCategories(events), [events]);
  const filtered = useMemo(
    () => getEventList(events, { query: submittedQuery, category }),
    [events, submittedQuery, category],
  );
  const { upcoming, past } = useMemo(() => splitEventsBySchedule(filtered), [filtered]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(query.trim());
  };

  return (
    <PortalPage>
      <div className={cn("flex flex-col gap-8", "tablet:gap-6")}>
        <PortalPageHeader title="행사" description="행사 정보를 확인해보세요." />

        <div
          className={cn(
            "flex items-center justify-between gap-4",
            "tablet:flex-col tablet:items-stretch",
          )}>
          <label className={cn("relative inline-flex w-[200px] shrink-0", "tablet:w-full")}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-4 pr-10 text-[15px] text-[#0F172A] outline-none focus:border-[#427DFF]">
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

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E2E8F0] bg-white py-16 text-center text-sm text-[#94A3B8]">
          {events.length === 0
            ? "등록된 행사가 없습니다. 관리자에서 행사를 등록해 주세요."
            : "검색 결과가 없습니다."}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {upcoming.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="flex items-end gap-1 text-[22px] leading-none">
                <span className="font-semibold text-[#0F172A]">예정된 행사</span>
                <span className="font-medium text-[#0066FF]">({upcoming.length})</span>
              </h2>
              <UpcomingCarousel events={upcoming} />
            </section>
          )}

          {past.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="flex items-end gap-1 text-[22px] leading-none">
                <span className="font-bold text-[#64748B]">지난 행사</span>
                <span className="font-medium text-[#94A3B8]">({past.length})</span>
              </h2>
              <div className={cn("grid grid-cols-2 gap-6", "tablet:grid-cols-1")}>
                {past.map((event) => (
                  <EventCard key={event.id} event={event} variant="past" />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PortalPage>
  );
}

function UpcomingCarousel({ events }) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isCarousel = events.length > 1;

  useEffect(() => {
    setActiveIndex(0);
    scrollerRef.current?.scrollTo({ left: 0 });
  }, [events]);

  const updateActiveIndex = () => {
    const el = scrollerRef.current;
    const step = getCarouselStep(el);
    if (!el || step <= 0) return;
    const next = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(events.length - 1, next)));
  };

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    const step = getCarouselStep(el);
    if (!el || step <= 0) return;
    el.scrollTo({ left: step * index, behavior: "smooth" });
    setActiveIndex(index);
  };

  if (!isCarousel) {
    return (
      <div className="w-full max-w-[620px]">
        <EventCard event={events[0]} variant="upcoming" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={scrollerRef}
        onScroll={updateActiveIndex}
        className={cn(
          "w-full cursor-grab overflow-x-auto active:cursor-grabbing",
          "-mx-10 px-10",
          "tablet:-mx-6 tablet:px-6",
          "mobile:-mx-4 mobile:px-4",
          "snap-x snap-mandatory scroll-smooth",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
        style={{ WebkitOverflowScrolling: "touch" }}>
        <div className={cn("flex w-max gap-6 pr-10", "tablet:pr-6", "mobile:pr-4")}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} variant="upcoming" />
          ))}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="예정된 행사 페이지"
        className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 shadow-[0px_2px_8px_rgba(15,23,42,0.06)]">
        {events.map((event, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={event.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`${index + 1}번째 행사`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "rounded-full transition-all",
                isActive
                  ? "h-2 w-6 bg-[#427DFF]"
                  : "size-2 bg-[#CBD5E1] hover:bg-[#94A3B8]",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

function EventCard({ event, variant = "upcoming" }) {
  const isPast = variant === "past";
  const muted = isPast ? "text-[#94A3B8]" : "text-[#475569]";
  const titleColor = isPast ? "text-[#64748B]" : "text-[#0F172A]";

  return (
    <Link
      href={`/pediatric/events/${event.id}`}
      data-event-card={!isPast || undefined}
      className={cn(
        "flex overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(15,23,42,0.02)] transition-shadow hover:shadow-md",
        isPast
          ? "w-full min-w-0 bg-[#F8FAFC]"
          : "w-[620px] shrink-0 snap-start bg-white tablet:w-[min(620px,calc(100vw-3rem))] mobile:max-w-none mobile:w-[min(620px,calc(100vw-2rem))]",
      )}>
      <span
        aria-hidden
        className={cn("w-3 shrink-0 self-stretch", isPast ? "bg-[#E2E8F0]" : "bg-[#0066FF]")}
      />
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-4 p-6",
          "tablet:p-5",
          "mobile:gap-3 mobile:p-4",
        )}>
        <div className="flex flex-col gap-3">
          <span
            className={cn(
              "inline-flex w-fit items-center rounded-[5px] px-2.5 py-1 text-sm font-semibold leading-none",
              isPast
                ? "bg-[#F1F5F9] text-[#64748B]"
                : "bg-[rgba(255,154,23,0.12)] text-[#FF9A17]",
            )}>
            {formatCategory(event.category)}
          </span>
          <div className="min-w-0">
            <h3
              className={cn(
                "truncate text-xl font-semibold leading-[1.4]",
                "mobile:text-lg",
                titleColor,
              )}>
              {event.title}
            </h3>
            {event.subtitle && (
              <p className="mt-2 truncate text-[15px] leading-none text-[#475569]">
                {event.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-[#E2E8F0]" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <IconImg src={isPast ? ICON.calendarMuted : ICON.calendar} className="size-4" />
            <span className={cn("min-w-0 flex-1 truncate text-sm leading-none", muted)}>
              {formatEventDateRange(event)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <IconImg src={isPast ? ICON.mapPinMuted : ICON.mapPin} className="size-4" />
            <span className={cn("min-w-0 flex-1 truncate text-sm leading-none", muted)}>
              {event.location}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 pb-1 pt-3">
          <span
            className={cn(
              "text-[15px] font-semibold",
              isPast ? "text-[#94A3B8]" : "text-[#0066FF]",
            )}>
            자세히보기
          </span>
          <IconImg
            src={isPast ? ICON.arrowMuted : ICON.arrow}
            size={10}
            className="size-4"
          />
        </div>
      </div>
    </Link>
  );
}
