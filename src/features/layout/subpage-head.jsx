import { cn } from "@/shared/lib/utils";
import React from "react";
import { Breadcrumb } from "./breadcrumb";

export function SubpageHead({
  className,
  breadcrumb,
  title,
  description,
  horizontal = false,
  children,
}) {
  return (
    <div
      className={cn(
        "space-y-4 pb-[100px] text-black",
        "tablet:pb-[60px]",
        "mobile:space-y-3 mobile:pb-[50px]",
        className?.container,
      )}>
      <div
        className={cn(
          horizontal ? "flex items-start justify-between gap-4" : "space-y-4 mobile:space-y-3",
        )}>
        {breadcrumb && (
          <Breadcrumb
            className={cn(horizontal && "order-3 justify-end", className?.breadcrumb)}
            breadcrumb={breadcrumb}
          />
        )}
        <div
          className={cn(
            "space-y-6 text-center",
            "tablet:space-y-5",
            "mobile:space-y-4",
            horizontal && "order-1 text-left",
          )}>
          {title && (
            <h1
              className={cn(
                "text-[54px]/[1.3] font-bold",
                "tablet:text-4xl",
                "mobile:text-3xl",
                className?.title,
              )}>
              {title}
            </h1>
          )}
          {description && typeof description === "string" && (
            <p
              className={cn(
                "text-xl text-[#9C9C9C]",
                "tablet:text-lg",
                "mobile:text-base",
                className?.description,
              )}>
              {description}
            </p>
          )}
          {description && typeof description !== "string" && (
            <div
              className={cn(
                "text-xl text-[#9C9C9C]",
                "tablet:text-lg",
                "mobile:text-base",
                className?.description,
              )}>
              {description}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
