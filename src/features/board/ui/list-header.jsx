import { cn } from "@/shared/lib/utils";

export function ListHeader({ className, children }) {
  return (
    <div
      id="listHead"
      className={cn(
        "mb-7 flex items-end justify-between gap-x-10 gap-y-4",
        "tablet:mb-5 tablet:gap-x-4 tablet:gap-y-2",
        "mobile:mb-5 mobile:flex-col mobile:items-center mobile:gap-4 mobile:text-center",
        className,
      )}>
      {children}
    </div>
  );
}
