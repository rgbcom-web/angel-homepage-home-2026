import { cn } from "@/shared/lib/utils";

export function Br({ className, pc, tablet, mobile }) {
  const responsiveClassName = cn(
    "hidden",
    !pc && !tablet && !mobile && "block",
    pc && "block tablet:hidden",
    tablet && "tablet:block mobile:hidden",
    mobile && "mobile:block",
  );

  return <br className={cn(className, responsiveClassName)} />;
}
