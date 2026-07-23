import { cn } from "@/shared/lib/utils";

export function Container({
  children,
  className,
  width = "default",
  fixed = true,
  tabletFull = false,
}) {
  const widthClass = {
    narrower: "w-container-narrower",
    narrow: "w-container-narrow",
    default: "w-container",
    wide: "w-container-wide",
    full: "w-container-full",
  };

  return (
    <div
      className={cn(
        "mx-auto min-w-[calc(320px-30px)] max-w-[calc(100%-60px)]",
        widthClass[width],
        fixed
          ? "tablet:w-[720px] tablet:max-w-[calc(100%-30px)]"
          : "tablet-only:max-w-[calc(100%-150px)] tablet-only:landscape:w-[1000px] tablet-only:portrait:w-[720px]",
        "mobile:!w-full mobile:max-w-[calc(100%-30px)]",
        tabletFull ? "tablet:w-[1000px] tablet:max-w-[calc(100%-100px)]" : "",
        className,
      )}>
      {children}
    </div>
  );
}
