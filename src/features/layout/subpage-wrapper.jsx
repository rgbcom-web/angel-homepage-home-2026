import { cn } from "@/shared/lib/utils";

export function SubpageWrapper({ children, className }) {
  return (
    <div
      className={cn(
        "pb-[180px] pt-[180px]",
        "tablet:pb-[140px] tablet:pt-[140px]",
        "mobile:pb-[100px] mobile:pt-[100px]",
        className,
      )}>
      {children}
    </div>
  );
}
