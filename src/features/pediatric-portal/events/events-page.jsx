"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        <div className="flex min-w-0 flex-col gap-10">
          {upcoming.length > 0 && (
            <UpcomingCarousel events={upcoming} />
          )}

          {past.length > 0 && (
            <section className="flex min-w-0 flex-col gap-6">
              <h2 className="flex items-end gap-1 text-[20px] leading-normal">
                <span className="font-semibold text-[#64748B]">지난 행사</span>
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

function CarouselNavButton({ direction, disabled, onClick }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "이전 행사" : "다음 행사"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-full border-2 border-[#427DFF] bg-transparent text-[#427DFF] transition-opacity",
        "hover:bg-[#427DFF]/10",
        "disabled:cursor-default disabled:border-[#CBD5E1] disabled:text-[#CBD5E1] disabled:hover:bg-transparent",
      )}>
      <Icon className="size-5" strokeWidth={2} />
    </button>
  );
}

function UpcomingCarousel({ events }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const dragRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    delta: 0,
    dragging: false,
    moved: false,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState({ cardWidth: 0, viewportWidth: 0 });
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isCarousel = events.length > 1;
  const step = layout.cardWidth > 0 ? layout.cardWidth + CARD_GAP : 0;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < events.length - 1;
  const maxIndex = Math.max(0, events.length - 1);

  useEffect(() => {
    setActiveIndex(0);
    setDragDelta(0);
    setIsDragging(false);
  }, [events]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const update = () => {
      const contentWidth = wrap.getBoundingClientRect().width;
      if (contentWidth <= 0) return;

      const isNarrow = window.matchMedia("(max-width: 1399px)").matches;
      const cardWidth = isNarrow
        ? contentWidth
        : Math.max(0, (contentWidth - CARD_GAP) / 2);

      const main = wrap.closest("[data-portal-main]");
      const mainRight = main
        ? main.getBoundingClientRect().right
        : window.innerWidth;
      const wrapLeft = wrap.getBoundingClientRect().left;
      const viewportWidth = isNarrow
        ? contentWidth
        : Math.max(contentWidth, mainRight - wrapLeft);

      setLayout({ cardWidth, viewportWidth });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTo = (index) => {
    setActiveIndex(Math.max(0, Math.min(maxIndex, index)));
    setDragDelta(0);
    setIsDragging(false);
  };

  const endDrag = (delta) => {
    const threshold = Math.max(40, step * 0.18);
    if (delta <= -threshold && activeIndex < maxIndex) {
      goTo(activeIndex + 1);
    } else if (delta >= threshold && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else {
      setDragDelta(0);
      setIsDragging(false);
    }
  };

  const resetDrag = (blockClick = false) => {
    dragRef.current = {
      pointerId: null,
      startX: 0,
      startY: 0,
      delta: 0,
      dragging: false,
      moved: blockClick,
    };
  };

  const onPointerDown = (e) => {
    if (!isCarousel || step <= 0) return;
    // 마우스 왼쪽 / 터치 / 펜만
    if (e.pointerType === "mouse" && e.button !== 0) return;

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      delta: 0,
      dragging: false,
      moved: false,
    };
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.dragging) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      // 세로 스크롤이면 드래그 포기
      if (Math.abs(dy) > Math.abs(dx)) {
        resetDrag(false);
        return;
      }
      drag.dragging = true;
      drag.moved = true;
      setIsDragging(true);
      try {
        trackRef.current?.setPointerCapture?.(e.pointerId);
      } catch {
        /* ignore */
      }
    }

    e.preventDefault();

    let nextDelta = dx;
    if (activeIndex === 0 && nextDelta > 0) nextDelta *= 0.35;
    if (activeIndex === maxIndex && nextDelta < 0) nextDelta *= 0.35;

    drag.delta = nextDelta;
    setDragDelta(nextDelta);
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const wasDragging = drag.dragging;
    const delta = drag.delta;
    const shouldBlockClick = drag.moved;

    if (wasDragging) {
      try {
        trackRef.current?.releasePointerCapture?.(e.pointerId);
      } catch {
        /* already released */
      }
      endDrag(delta);
    }

    // 짧은 탭은 Link 클릭 유지, 드래그면 클릭 차단
    resetDrag(shouldBlockClick);
  };

  const onLostPointerCapture = (e) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (drag.dragging) endDrag(drag.delta);
    else resetDrag(drag.moved);
  };

  const onClickCapture = (e) => {
    if (!dragRef.current.moved) return;
    e.preventDefault();
    e.stopPropagation();
    dragRef.current.moved = false;
  };

  // PC에서 링크/이미지 네이티브 드래그로 캐러셀이 먹히는 것 방지
  const onNativeDragStart = (e) => {
    e.preventDefault();
  };

  const cardStyle =
    layout.cardWidth > 0
      ? { width: layout.cardWidth, flex: "0 0 auto" }
      : undefined;

  const translateX =
    step > 0 ? -(activeIndex * step) + dragDelta : dragDelta;

  return (
    <section className="flex min-w-0 flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-end gap-1 text-[20px] leading-normal">
          <span className="font-semibold text-[#0F172A]">예정된 행사</span>
          <span className="font-medium text-[#0066FF]">({events.length})</span>
        </h2>

        {isCarousel && (
          <div className="flex shrink-0 items-center gap-2">
            <CarouselNavButton
              direction="prev"
              disabled={!canPrev}
              onClick={() => goTo(activeIndex - 1)}
            />
            <CarouselNavButton
              direction="next"
              disabled={!canNext}
              onClick={() => goTo(activeIndex + 1)}
            />
          </div>
        )}
      </div>

      <div ref={wrapRef} className="w-full min-w-0">
        {!isCarousel ? (
          <EventCard
            event={events[0]}
            variant="upcoming"
            style={cardStyle}
            className={layout.cardWidth <= 0 ? "w-[calc(50%-12px)] tablet:w-full" : undefined}
          />
        ) : (
          <div className="flex min-w-0 flex-col gap-6">
            <div
              ref={trackRef}
              className={cn(
                "overflow-hidden select-none",
                isDragging ? "cursor-grabbing" : "cursor-grab",
              )}
              style={{
                width: layout.viewportWidth > 0 ? layout.viewportWidth : "100%",
                touchAction: "pan-y",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onLostPointerCapture={onLostPointerCapture}
              onDragStart={onNativeDragStart}
              onClickCapture={onClickCapture}>
              <div
                className={cn(
                  "flex gap-6 will-change-transform",
                  !isDragging && "transition-transform duration-300 ease-out",
                )}
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                }}>
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant="upcoming"
                    style={cardStyle}
                    draggable={false}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full justify-center">
              <div
                role="tablist"
                aria-label="예정된 행사 페이지"
                className="flex h-8 items-center gap-1.5 rounded-full bg-white px-5 shadow-[0px_2px_8px_rgba(15,23,42,0.06)]">
                {events.map((event, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={event.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`${index + 1}번째 행사`}
                      onClick={() => goTo(index)}
                      className={cn(
                        "rounded-full transition-all",
                        isActive
                          ? "h-2 w-6 bg-[#427DFF]"
                          : "size-2 bg-[#D3DCE9] hover:bg-[#94A3B8]",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function EventCard({ event, variant = "upcoming", style, className, draggable }) {
  const isPast = variant === "past";
  const muted = isPast ? "text-[#94A3B8]" : "text-[#475569]";
  const titleColor = isPast ? "text-[#64748B]" : "text-[#0F172A]";

  return (
    <Link
      href={`/pediatric/events/${event.id}`}
      data-event-card={!isPast || undefined}
      draggable={draggable}
      onDragStart={draggable === false ? (e) => e.preventDefault() : undefined}
      style={isPast ? undefined : style}
      className={cn(
        "flex overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-[0px_4px_12px_rgba(15,23,42,0.02)] transition-shadow hover:shadow-md",
        isPast
          ? "w-full min-w-0 bg-[#F8FAFC]"
          : "shrink-0 bg-white",
        className,
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
          {/* 피그마: 16px 프레임 안 9.6px 화살표 (inset 20%) */}
          <span className="relative inline-flex size-4 shrink-0 items-center justify-center">
            <IconImg
              src={isPast ? ICON.arrowMuted : ICON.arrow}
              size={10}
              className="size-[9.6px]"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
