"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function PortalPage({ children, className }) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[1340px] flex-col gap-8 px-10 pb-10 pt-[60px]",
        "tablet:gap-6 tablet:px-6 tablet:pt-10",
        "mobile:px-4 mobile:pt-8",
        className,
      )}>
      {children}
    </div>
  );
}

export function PortalPageHeader({ title, description }) {
  return (
    <div>
      <h1
        className={cn(
          "text-[40px] font-bold leading-none text-[#1E293B]",
          "tablet:text-[32px]",
          "mobile:text-[28px]",
        )}>
        {title}
      </h1>
      {description && (
        <p className={cn("mt-4 text-base text-[#475569]", "mobile:mt-3 mobile:text-sm")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function PortalFetchError({ children }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      {children}
    </div>
  );
}

export function PortalSearchForm({
  query,
  onQueryChange,
  onSubmit,
  placeholder = "검색어를 입력하세요",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex items-center gap-2", "tablet:w-full")}>
      <input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 w-[320px] rounded-full border border-[#E2E8F0] bg-white px-4 text-[15px] outline-none placeholder:text-[#94A3B8] focus:border-[#427DFF]",
          "tablet:w-auto tablet:min-w-0 tablet:flex-1",
        )}
      />
      <button
        type="submit"
        className="h-12 w-[90px] shrink-0 rounded-full bg-[#427DFF] text-base font-bold text-white hover:opacity-90">
        검색
      </button>
    </form>
  );
}

export function PortalPagination({ page, totalPages, onChange }) {
  if (totalPages <= 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-1.5", "mobile:gap-1")}>
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={page <= 1}
        onClick={() => onChange(Math.max(1, page - 1))}
        className="rounded-lg p-2 text-[#475569] disabled:opacity-40">
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          type="button"
          onClick={() => onChange(num)}
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-[15px]",
            "mobile:size-8 mobile:text-sm",
            num === page
              ? "bg-[#427DFF] font-bold text-white"
              : "font-medium text-[#475569] hover:bg-[#F1F5F9]",
          )}>
          {num}
        </button>
      ))}
      <button
        type="button"
        aria-label="다음 페이지"
        disabled={page >= totalPages}
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        className="rounded-lg p-2 text-[#475569] disabled:opacity-40">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
