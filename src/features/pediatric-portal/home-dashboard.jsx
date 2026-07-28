"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  FolderOpen,
  CalendarDays,
  ChevronRight,
  ChevronDown,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "./portal-context";
import { formatMemberDisplayName } from "./mock-data";
import { POST_TYPE_PATH } from "./menu";
import { isUpcomingEvent } from "./events/events-data";
import { PORTAL_CONTENT_MAX, PORTAL_PAD_LEFT } from "./portal-ui";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const GREETING_BANNER_SRC = "/images/pediatric/home/greeting-banner.jpg";

export function PortalHomeDashboard({ events = [] }) {
  const { member, notices } = usePediatricPortal();
  const displayName = formatMemberDisplayName(member);
  const [categoryFilter, setCategoryFilter] = useState("전체");

  const greetingDate = useMemo(() => formatKoreanDate(new Date()), []);

  const upcomingEvents = useMemo(() => {
    const list = (events || []).filter((event) => isUpcomingEvent(event));
    const filtered =
      categoryFilter === "전체"
        ? list
        : list.filter((event) => event.category === categoryFilter);
    return filtered
      .sort((a, b) => String(a.startDate).localeCompare(String(b.startDate)))
      .slice(0, 5);
  }, [events, categoryFilter]);

  const categories = useMemo(() => {
    const set = new Set((events || []).map((e) => e.category).filter(Boolean));
    return ["전체", ...Array.from(set)];
  }, [events]);

  return (
    <div
      className={cn(
        "w-full pb-10 pt-10",
        PORTAL_PAD_LEFT,
        "pr-10",
        "tablet:px-6 tablet:pt-8",
        "mobile:px-4 mobile:pt-6",
      )}>
      <div
        className={cn(
          "flex w-full min-w-0 flex-col gap-8",
          PORTAL_CONTENT_MAX,
          "tablet:gap-6",
        )}>
      <GreetingBanner dateLabel={greetingDate} displayName={displayName} />

      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_500px] items-start gap-8",
          "tablet:grid-cols-1 tablet:gap-6",
        )}>
        <div className={cn("flex flex-col gap-6")}>
          <NoticeSection notices={notices} />
          <QuickLinks />
        </div>
        <EventsSection
          events={upcomingEvents}
          categories={categories}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
        />
      </div>
      </div>
    </div>
  );
}

function GreetingBanner({ dateLabel, displayName }) {
  return (
    <section
      className={cn(
        "relative h-[290px] overflow-hidden rounded-[24px] text-white",
        "tablet:h-[240px] tablet:rounded-[20px]",
        "mobile:h-[200px] mobile:rounded-2xl",
      )}>
      <Image
        src={GREETING_BANNER_SRC}
        alt=""
        fill
        priority
        sizes="(max-width: 1340px) 100vw, 1340px"
        className={cn("object-cover object-[center_40%]")}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-[rgba(66,125,255,0.95)] to-[rgba(66,125,255,0)] mix-blend-multiply",
        )}
      />
      <div
        className={cn(
          "relative z-10 flex h-full flex-col justify-center gap-[60px] px-[54px]",
          "tablet:gap-10 tablet:px-8",
          "mobile:gap-6 mobile:px-5",
        )}>
        <p
          className={cn(
            "text-xl font-medium leading-none text-[#E2E8F0]",
            "tablet:text-lg",
            "mobile:text-base",
          )}>
          {dateLabel}
        </p>
        <h1
          className={cn(
            "text-[36px] leading-[1.36] text-white",
            "tablet:text-[32px]",
            "mobile:text-[26px]",
          )}>
          <span className={cn("font-normal")}>안녕하세요, </span>
          <br />
          <span className={cn("font-bold")}>{displayName}.</span>
        </h1>
      </div>
    </section>
  );
}

function NoticeSection({ notices }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[#E2E8F0] bg-white px-8 py-9 shadow-[0px_4px_6px_rgba(15,23,42,0.02)]",
        "tablet:px-6 tablet:py-7",
        "mobile:px-4 mobile:py-5",
      )}>
        <div
          className={cn(
            "mb-6 flex items-center justify-between gap-4",
            "tablet:mb-5",
            "mobile:mb-4 mobile:flex-col mobile:items-start",
          )}>
        <div className={cn("flex min-w-0 items-center gap-3")}>
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#1E293B]",
              "mobile:size-10",
            )}>
            <ClipboardList className={cn("h-5 w-5")} strokeWidth={1.75} />
          </div>
          <div className={cn("min-w-0")}>
            <h2 className={cn("text-lg font-semibold text-[#0F172A]")}>공지사항</h2>
            <p className={cn("mt-2 text-sm text-[#475569]", "mobile:mt-1 mobile:text-xs")}>
              Pediatric KOL Portal의 주요 사항을 안내 드립니다.
            </p>
          </div>
        </div>
        <Link
          href="/pediatric/resources"
          className={cn("shrink-0 text-base font-medium text-[#0066FF] hover:opacity-80")}>
          View All
        </Link>
      </div>

      {notices.length === 0 ? (
        <p className={cn("py-8 text-center text-sm text-[#94A3B8]")}>
          등록된 공지사항이 없습니다.
        </p>
      ) : (
        <ul>
          {notices.slice(0, 4).map((post, index, list) => {
            const base = POST_TYPE_PATH[post.type] || "/pediatric";
            const isLast = index === Math.min(list.length, 4) - 1;
            return (
              <li key={`${post.type}-${post.id}`}>
                <Link
                  href={`${base}/${post.id}`}
                  className={cn(
                    "flex items-center justify-between gap-4 py-4 transition-colors hover:text-[#427DFF]",
                    !isLast && "border-b border-dashed border-[#E2E8F0]",
                  )}>
                  <span className={cn("min-w-0 truncate text-base text-[#1E293B]")}>
                    {post.title}
                  </span>
                  <span className={cn("shrink-0 text-sm text-[#94A3B8]")}>
                    {formatNoticeDate(post.date)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function QuickLinks() {
  const links = [
    {
      title: "자료실",
      description: "다양한 자료를 확인해주세요.",
      href: "/pediatric/resources",
      icon: FolderOpen,
      card: "bg-[#427DFF]",
    },
    {
      title: "설문",
      description: "진행중인 설문에 참여해주세요.",
      href: "/pediatric/surveys",
      icon: ClipboardList,
      card: "bg-[#00BDD2]",
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-4", "mobile:grid-cols-1")}>
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex min-h-[120px] items-start justify-between gap-3 rounded-2xl p-6 text-white shadow-[0px_4px_6px_rgba(15,23,42,0.02)] transition-opacity hover:opacity-95",
            "tablet:flex-col tablet:items-start tablet:gap-4 tablet:p-5",
            "mobile:min-h-0 mobile:p-5",
            item.card,
          )}>
          <div className={cn("flex min-w-0 flex-col gap-3")}>
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-full border border-[#B9D5FF] bg-transparent",
              )}>
              <item.icon className={cn("h-5 w-5 text-white")} strokeWidth={1.75} />
            </div>
            <div>
              <h3 className={cn("text-lg font-semibold text-white")}>{item.title}</h3>
              <p className={cn("mt-2 text-sm text-[#F0F6FF]")}>{item.description}</p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-1 rounded-[20px] px-4 text-[13px] font-semibold leading-none text-white",
              "bg-[rgba(255,255,255,0.13)]",
            )}>
            바로가기
            <ArrowUpRight className={cn("h-3.5 w-3.5")} strokeWidth={2.5} />
          </span>
        </Link>
      ))}
    </div>
  );
}

function EventsSection({ events, categories, categoryFilter, onCategoryChange }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[#E2E8F0] bg-white px-8 py-9 shadow-[0px_4px_6px_rgba(15,23,42,0.02)]",
        "tablet:px-6 tablet:py-7",
        "mobile:px-4 mobile:py-5",
      )}>
      <div
        className={cn(
          "mb-[26px] flex items-center justify-between gap-3",
          "mobile:mb-5 mobile:flex-col mobile:items-stretch",
        )}>
        <div className={cn("flex min-w-0 flex-1 items-center gap-3")}>
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full border border-[#D9D9D9] bg-white text-[#1E293B]",
              "mobile:size-10",
            )}>
            <CalendarDays className={cn("h-5 w-5")} strokeWidth={1.75} />
          </div>
          <div className={cn("min-w-0")}>
            <h2 className={cn("text-lg font-semibold leading-none text-[#1E293B]")}>행사 일정</h2>
            <p className={cn("mt-2 text-sm leading-none text-[#475569]")}>
              행사 정보를 확인해보세요.
            </p>
          </div>
        </div>

        <label className={cn("relative shrink-0 self-center", "mobile:self-stretch")}>
          <span className={cn("sr-only")}>카테고리 필터</span>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={cn(
              "h-[31px] min-w-[91px] appearance-none rounded border border-[#E2E8F0] bg-white py-1.5 pl-3 pr-7 text-base font-medium leading-none text-[#94A3B8] outline-none",
              "mobile:h-10 mobile:w-full",
            )}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "전체" ? "전체" : category}
              </option>
            ))}
          </select>
          <ChevronDown
            className={cn(
              "pointer-events-none absolute right-2 top-1/2 size-5 -translate-y-1/2 text-[#94A3B8]",
            )}
            strokeWidth={2}
          />
        </label>
      </div>

      {events.length === 0 ? (
        <p className={cn("py-10 text-center text-sm text-[#94A3B8]")}>
          예정된 행사가 없습니다.
        </p>
      ) : (
        <div className={cn("space-y-5")}>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      <Link
        href="/pediatric/events"
        className={cn(
          "mt-6 flex items-center justify-center gap-1 text-sm font-medium text-[#427DFF] hover:underline",
        )}>
        전체 행사 보기
        <ChevronRight className={cn("h-4 w-4")} />
      </Link>
    </section>
  );
}

function EventCard({ event }) {
  return (
    <Link
      href={`/pediatric/events/${event.id}`}
      className={cn(
        "block overflow-hidden rounded-xl border border-[#FF9A17] bg-white transition-shadow hover:shadow-md",
      )}>
      <div
        className={cn(
          "flex items-center justify-between bg-[#FF9A17] px-[30px] py-[13px] text-base font-bold text-white",
          "mobile:px-4 mobile:text-sm",
        )}>
        <span className={cn("min-w-0 truncate")}>{formatEventHeaderDate(event)}</span>
        <ChevronRight className={cn("h-5 w-5 shrink-0 opacity-80")} />
      </div>
      <div className={cn("space-y-5 px-[30px] pb-5 pt-5", "mobile:space-y-4 mobile:px-4")}>
        <div className={cn("space-y-3")}>
          <div className={cn("flex flex-wrap items-center gap-2.5")}>
            <h3 className={cn("text-lg font-medium text-[#1E293B]")}>{event.title}</h3>
            {event.category && (
              <span
                className={cn(
                  "rounded-[5px] bg-[rgba(255,154,23,0.12)] px-2.5 py-1 text-sm font-semibold text-[#FF9A17]",
                )}>
                {event.category}
              </span>
            )}
          </div>
          {event.subtitle && (
            <p className={cn("truncate text-[15px] text-[#475569]")}>{event.subtitle}</p>
          )}
        </div>
        {event.location && (
          <div className={cn("border-t border-[#E2E8F0] pt-3")}>
            <div className={cn("flex items-center gap-1.5 text-sm text-[#94A3B8]")}>
              <MapPin className={cn("h-4 w-4 shrink-0")} strokeWidth={1.75} />
              {event.location}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

function formatKoreanDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}년 ${m}월 ${d}일`;
}

function formatNoticeDate(dateStr) {
  if (!dateStr) return "";
  const normalized = String(dateStr).replace(/\./g, "-").replace(/\s/g, "");
  const match = normalized.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (!match) return dateStr;
  return `${match[1]}. ${match[2].padStart(2, "0")}. ${match[3].padStart(2, "0")}`;
}

function formatEventHeaderDate(event) {
  if (!event?.startDate) return "";
  const start = new Date(`${event.startDate}T00:00:00`);
  const end = new Date(`${(event.endDate || event.startDate)}T00:00:00`);
  if (Number.isNaN(start.getTime())) return event.startDate;

  const startLabel = `${start.getFullYear()}. ${String(start.getMonth() + 1).padStart(2, "0")}. ${String(start.getDate()).padStart(2, "0")}(${WEEKDAYS[start.getDay()]})`;
  if (!event.endDate || event.endDate === event.startDate) return startLabel;

  const endLabel = `${String(end.getMonth() + 1).padStart(2, "0")}. ${String(end.getDate()).padStart(2, "0")}(${WEEKDAYS[end.getDay()]})`;
  return `${startLabel} - ${endLabel}`;
}
