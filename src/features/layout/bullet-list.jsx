import { cn } from "@/shared/lib/utils";

export function BulletList({ items = [], className }) {
  return (
    <ul className={cn("space-y-1.5 !leading-[1.5]", "mobile:space-y-1", className?.root)}>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className={cn("relative pl-[1em]", className?.item, items.length === 1 && "pl-0")}>
          <span
            className={cn(
              "absolute left-0 top-[0.75em] aspect-square w-[0.375em] -translate-y-1/2 rounded-full bg-dd-gray",
              className?.bullet,
              items.length === 1 && "hidden",
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
