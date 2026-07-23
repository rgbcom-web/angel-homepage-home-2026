import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Thumbnail } from "@/features/board/ui";
import { ArrowButton } from "@/features/global-ui";

export default function CategoryList({ data }) {
  return (
    <ul className={cn("grid gap-10", "tablet:gap-8", "mobile:gap-6", "mobile-sm:gap-6")}>
      {data.map((item) => (
        <li key={item.id}>
          <Link
            href={`/private/download/${item.id}`}
            className={cn(
              "grid grid-cols-[350px_1fr] gap-10",
              "tablet:grid-cols-[250px_1fr] tablet:gap-8",
              "mobile:grid-cols-[200px_1fr] mobile:gap-6",
              "mobile-sm:grid-cols-1 mobile-sm:gap-0",
            )}>
            <Thumbnail
              src={item.thumbnail?.url}
              alt={item.title}
              width={350}
              height={168}
              className={cn(
                "aspect-video w-full rounded-xl border border-dd-gray-light object-cover",
              )}
            />
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-6 border-b border-dd-gray-light py-8 pr-10",
                "tablet:py-4 tablet:pr-4",
                "mobile:gap-4 mobile-sm:pr-0",
              )}>
              <span className={cn("block text-3xl font-bold", "tablet:text-2xl", "mobile:text-xl")}>
                {item.title}
              </span>
              <ArrowButton
                bgColor="blue"
                dimmerColor="mint"
                hoverTextColor="white"
                className={cn("ml-auto", "mobile:text-xs")}>
                View More
              </ArrowButton>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
