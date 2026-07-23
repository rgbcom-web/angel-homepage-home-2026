import { cn } from "@/shared/lib/utils";

export function SubpageBody({ children, className, ...props }) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
