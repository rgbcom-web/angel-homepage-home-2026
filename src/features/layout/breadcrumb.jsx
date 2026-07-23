import { cn } from "@/shared/lib/utils";
import React from "react";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ className, breadcrumb }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-base font-bold",
        "tablet:text-sm",
        "mobile:text-xs",
        className,
      )}>
      {breadcrumb.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index !== breadcrumb.length - 1 && (
            <span className="">
              <ChevronRight className="h-[1em] w-[1em]" />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
