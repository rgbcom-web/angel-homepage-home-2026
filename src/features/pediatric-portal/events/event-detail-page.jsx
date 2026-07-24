"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Lock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { PortalContentFrame } from "../portal-ui";
import {
  formatEventDateRange,
  formatCategory,
  isUpcomingEvent,
} from "./events-data";

export function EventDetailPage({ event }) {
  if (!event) {
    return (
      <PortalContentFrame className="py-16 text-center">
        <p className={cn("text-[#64748B]")}>행사를 찾을 수 없습니다.</p>
        <Link
          href="/pediatric/events"
          className={cn("mt-4 inline-block text-sm font-semibold text-[#2563EB] hover:underline")}>
          행사 목록으로
        </Link>
      </PortalContentFrame>
    );
  }

  const upcoming = isUpcomingEvent(event);
  const images = Array.isArray(event.images) ? event.images.filter((item) => item?.url) : [];

  return (
    <PortalContentFrame>
      <Link
        href="/pediatric/events"
        className={cn(
          "mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#2563EB]",
        )}>
        <ArrowLeft className={cn("h-4 w-4")} />
        행사
      </Link>

      <article
        className={cn(
          "rounded-2xl border bg-white p-8 shadow-sm",
          "mobile:p-5",
          upcoming ? "border-[#BFDBFE]" : "border-[#E2E8F0]",
        )}>
        <div className={cn("flex flex-wrap items-center gap-2")}>
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-xs font-semibold",
              upcoming ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-[#F1F5F9] text-[#64748B]",
            )}>
            {formatCategory(event.category)}
          </span>
          <span className={cn(upcoming ? "text-[#2563EB]" : "text-[#94A3B8]", "text-sm font-semibold")}>
            {event.year} · {formatEventDateRange(event)}
          </span>
        </div>

        <h1 className={cn("mt-4 text-3xl font-bold text-[#0F172A]", "mobile:text-2xl")}>
          {event.title}
        </h1>
        <p className={cn("mt-2 text-base text-[#64748B]")}>{event.subtitle}</p>

        <p className={cn("mt-4 flex items-center gap-1.5 text-sm text-[#475569]")}>
          <MapPin className={cn("h-4 w-4")} />
          {event.location}
        </p>

        {event.description && (
          <div
            className={cn(
              "mt-8 whitespace-pre-wrap border-t border-[#F1F5F9] pt-6 text-[15px] leading-relaxed text-[#334155]",
            )}>
            {event.description}
          </div>
        )}

        {images.length > 0 && (
          <div
            className={cn(
              "mt-8 flex flex-col gap-4",
              event.description ? "" : "border-t border-[#F1F5F9] pt-6",
            )}>
            {images.map((image, index) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${image.path || image.url}-${index}`}
                src={image.url}
                alt={image.name || `${event.title} 이미지 ${index + 1}`}
                className={cn(
                  "h-auto w-full rounded-xl border border-[#E2E8F0] object-contain",
                  "max-h-[720px] bg-[#F8FAFC]",
                )}
              />
            ))}
          </div>
        )}
      </article>

      <p className={cn("mt-6 flex items-center justify-center gap-2 text-sm text-[#94A3B8]")}>
        <Lock className={cn("h-4 w-4")} />
        보안 정책에 따라 자료의 다운로드, 복사, 화면 캡처가 제한되어 있습니다.
      </p>
    </PortalContentFrame>
  );
}
