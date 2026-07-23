import { cn } from "@/shared/lib/utils";
import Image from "next/image";

export function Thumbnail({ src, className, ...props }) {
  if (!src) {
    return (
      <div className={cn("flex aspect-video items-center justify-center bg-white", className)}>
        <img src="/images/common/logo-angel.svg" alt="" className={cn("w-1/2")} />
      </div>
    );
  }

  return (
    <Image src={src} alt="" className={cn("bg-[#f9f8f7] object-cover", className)} {...props} />
  );
}
