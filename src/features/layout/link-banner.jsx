import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { ArrowRight } from "@/shared/svgs";

export function LinkBanner({ backgroundImage, description, link, linkText }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-between overflow-hidden rounded-[20px] py-[37px] pl-[60px] pr-[30px] text-left text-white",
        "tablet:py-8 tablet:pl-8 tablet:pr-5",
        "mobile:flex-col mobile:items-center mobile:gap-6 mobile:py-10 mobile:text-center",
      )}>
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 -z-[1] size-full object-cover"
      />
      <p className={cn("text-2xl/[1.6] font-bold", "tablet:text-lg", "mobile:text-lg")}>
        {description}
      </p>
      <Button
        className={cn(
          "flex items-center gap-[1em] text-[27px] !no-underline",
          "tablet:rounded-full tablet:border",
        )}
        variant="link"
        asChild>
        <Link href={link}>
          {linkText}
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
