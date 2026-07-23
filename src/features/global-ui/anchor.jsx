import { cn } from "@/shared/lib/utils";

export function Anchor({ id, ...props }) {
  return <span id={id} className={cn("scroll-m-[150px]", props.className)} {...props} />;
}
