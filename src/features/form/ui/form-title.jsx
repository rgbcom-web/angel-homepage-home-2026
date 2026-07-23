import { cn } from "@/shared/lib/utils";

export function FormTitle({ children, className, ...props }) {
  return (
    <span
      className={cn(
        "mb-8 block text-2xl font-bold",
        "tablet:mb-4 tablet:text-xl",
        "mobile:mb-4 mobile:text-center mobile:text-lg",
        className,
      )}
      {...props}>
      {children}
    </span>
  );
}
