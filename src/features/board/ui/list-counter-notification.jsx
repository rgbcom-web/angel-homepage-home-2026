"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";

export function ListCounterNotification({ className, count, children }) {
  const { langContent } = useLang();

  return (
    <span
      className={cn(
        "block text-2xl font-semibold text-black",
        "tablet:text-base",
        "mobile:text-base",
        className,
      )}>
      {children
        ? children
        : langContent({
            ko: (
              <>
                총 <strong className={cn("font-semibold text-dd-blue")}>{count}</strong>건의
                게시물이 있습니다.
              </>
            ),
            en: (
              <>
                <strong className={cn("font-semibold text-dd-blue")}>{count}</strong> articles are
                available.
              </>
            ),
          })}
    </span>
  );
}
