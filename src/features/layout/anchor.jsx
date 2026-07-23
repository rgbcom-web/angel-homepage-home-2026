import { cn } from "@/shared/lib/utils";

export function Anchor({ id, children, className, ...props }) {
  return (
    <div id={id} className={cn("scroll-mt-14", className)} {...props}>
      {children}
    </div>
  );
}
