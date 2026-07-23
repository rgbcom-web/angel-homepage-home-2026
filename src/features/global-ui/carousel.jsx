import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowRight, ArrowLeft } from "@/shared/svgs";

export function CarouselNavigation({ ref, className, ...props }) {
  return (
    <div ref={ref} className={cn("flex items-center justify-between", className)} {...props} />
  );
}

export function CarouselPagination({ ref, className, theme, ...props }) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-5",
        "tablet:gap-3",
        "[&_.swiper-pagination-bullet]:!m-0",
        "[&_.swiper-pagination-bullet]:border",
        "[&_.swiper-pagination-bullet]:flex",
        "[&_.swiper-pagination-bullet]:h-4",
        "[&_.swiper-pagination-bullet]:w-4",
        "[&_.swiper-pagination-bullet]:items-center",
        "[&_.swiper-pagination-bullet]:justify-center",
        "[&_.swiper-pagination-bullet]:rounded-full",
        "[&_.swiper-pagination-bullet]:border-transparent",
        "[&_.swiper-pagination-bullet]:opacity-100",
        "[&_.swiper-pagination-bullet]:bg-transparent",
        "[&_.swiper-pagination-bullet]:after:w-2.5",
        "[&_.swiper-pagination-bullet]:after:h-2.5",
        "[&_.swiper-pagination-bullet]:after:rounded-full",
        "[&_.swiper-pagination-bullet]:after:bg-dd-gray-light",
        "[&_.swiper-pagination-bullet-active]:after:!bg-dd-mint",
        "[&_.swiper-pagination-bullet-active]:!border-dd-mint",
        "tablet:[&_.swiper-pagination-bullet]:!w-3",
        "tablet:[&_.swiper-pagination-bullet]:!h-3",
        theme === "white" &&
          cn(
            "[&_.swiper-pagination-bullet]:after:hidden",
            "[&_.swiper-pagination-bullet]:border-0",
            "[&_.swiper-pagination-bullet]:bg-white",
            "[&_.swiper-pagination-bullet]:opacity-40",
            "[&_.swiper-pagination-bullet-active]:!opacity-100",
          ),
        className,
      )}
      {...props}
    />
  );
}

const carouselButtonTheme = {
  default: {
    white: "border-white text-white",
  },
  hover: {
    mint: "hover:border-dd-mint hover:text-dd-mint",
  },
};

export function CarouselButton({
  ref,
  direction,
  className,
  size = "sm",
  theme,
  hoverTheme,
  ...props
}) {
  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        "flex-shrink-0 gap-2 border border-dd-gray",
        "tablet:h-10 tablet:w-10 tablet:text-base",
        "mobile:h-10 mobile:w-10 mobile:text-sm",
        size === "lg" && cn("h-[75px] w-[75px] text-[30px]"),
        carouselButtonTheme.default[theme],
        carouselButtonTheme.hover[hoverTheme],
        className,
      )}
      ref={ref}
      {...props}>
      {direction === "next" ? <ArrowRight /> : <ArrowLeft />}
    </Button>
  );
}
