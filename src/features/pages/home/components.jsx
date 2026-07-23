import { cn } from "@/shared/lib/utils";

export function SectionTitle({ children, className, ...props }) {
  return (
    <h2
      className={cn(
        "text-6xl font-bold leading-[1.3]",
        "labtop:text-5xl",
        "mobile:text-3xl",
        className,
      )}
      {...props}>
      {children}
    </h2>
  );
}

