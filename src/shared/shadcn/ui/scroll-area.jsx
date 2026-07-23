"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/shared/shadcn/lib/utils";

const ScrollArea = React.forwardRef(
  (
    {
      className,
      children,
      orientation = "vertical",
      noShape = false,
      fullWidth = false,
      scrollbarType = "always",
      scrollbarThumbnailClassName = "",
      ...props
    },
    ref,
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      type={scrollbarType}
      className={cn(
        "scroll-area relative overflow-hidden",
        !noShape && "rounded-2xl border border-dd-gray-light/60",
        fullWidth && "mobile:calc(100%+30px) mobile:ml-[-15px] mobile:mr-[-15px]",
        className?.root,
      )}
      {...props}>
      <ScrollAreaPrimitive.Viewport
        className={cn(
          "h-full w-full rounded-[inherit]",
          orientation === "vertical" && "!pr-4",
          className?.viewport,
        )}>
        <div className={cn(className?.content, fullWidth && "mobile:px-[15px]")}>{children}</div>
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar
        className={cn(fullWidth && "px-[20px]", className?.scrollbar)}
        scrollbarThumbnailClassName={scrollbarThumbnailClassName}
        orientation={orientation}
        {...props}
      />
      <ScrollAreaPrimitive.Corner className={cn(className?.corner)} />
    </ScrollAreaPrimitive.Root>
  ),
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef(
  (
    { className, orientation = "vertical", type = "auto", scrollbarThumbnailClassName, ...props },
    ref,
  ) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      type={type}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" &&
          "mx-1 h-full w-4 border-l border-l-transparent px-[5px] py-[10px]",
        orientation === "horizontal" &&
          "h-4 flex-col border-t border-t-transparent p-[1px] py-[5px]",
        className,
      )}
      {...props}>
      <ScrollAreaPrimitive.ScrollAreaThumb
        className={cn(
          "relative flex-1 rounded-full bg-border",
          className?.thumb,
          scrollbarThumbnailClassName,
        )}
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  ),
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
