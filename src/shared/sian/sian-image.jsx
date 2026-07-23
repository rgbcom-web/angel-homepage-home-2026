import { cn } from "@/shared/lib/utils";

export function SianImage({ src, className, ...props }) {
  return (
    <div className={cn("relative h-[100vh] w-full", className)} {...props}>
      <img src={src} alt="" className={cn("h-full w-full object-contain")} />
    </div>
  );
}
