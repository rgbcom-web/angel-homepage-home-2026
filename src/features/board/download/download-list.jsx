import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { DownloadItem } from "./download-item";

const themes = {
  medi: {
    overlay: "bg-dd-blue/60",
    overlayIcon: "text-dd-blue",
    tag: "text-dd-blue",
  },
  suit: {
    overlay: "bg-dd-mint/60",
    overlayIcon: "text-dd-mint",
    tag: "text-dd-mint",
  },
  gear: {
    overlay: "bg-dd-orange/60",
    overlayIcon: "text-dd-orange",
    tag: "text-dd-orange",
  },
  kit: {
    overlay: "bg-dd-gray/60",
    overlayIcon: "text-dd-gray",
    tag: "text-dd-gray",
  },
};

export function DownloadList({ title, list }) {
  if (!list || list.length === 0) return null;

  return (
    <section
      className={cn(
        "pb-[90px] pt-[60px] last:pb-0 odd:bg-dd-gray-lighter",
        "tablet:pb-[80px] tablet:pt-[50px]",
        "mobile-sm:pb-[60px] mobile-sm:pt-[40px]",
      )}>
      <Container width="narrow">
        <div className={cn("mb-8 border-b border-black pb-3 tablet:mb-6 tablet:pb-2")}>
          <h3
            className={cn(
              "text-[54px] font-bold uppercase leading-[1.3]",
              "tablet:text-[28px]",
              "mobile:text-[24px]",
            )}>
            {title}
          </h3>
        </div>
        <ul
          className={cn(
            "grid grid-cols-4 gap-8 gap-y-14",
            "tablet:grid-cols-3 tablet:gap-x-3 tablet:gap-y-10",
            "mobile-sm:grid-cols-2 mobile-sm:gap-x-2 mobile-sm:gap-y-8",
          )}>
          {list.map((item) => (
            <li key={item.id} className={cn("h-full")}>
              <DownloadItem item={item} title={title} themes={themes} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
