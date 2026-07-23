"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";

export function ListEmpty({ children, className }) {
  const { langContent } = useLang();

  return (
    <div className={cn("py-4", className?.root)}>
      <div
        className={cn(
          "flex min-h-[250px] items-center justify-center bg-dd-gray-lighter/30 px-10 py-10 text-center text-xl font-semibold text-dd-gray/60",
          className?.content,
        )}>
        {children ||
          langContent({
            ko: "등록된 게시물이 없습니다.",
            en: "No registered posts.",
          })}
      </div>
    </div>
  );
}
