"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ListTabButtons({ items }) {
  return (
    <div className={cn("flex flex-wrap gap-2", "tablet:gap-1.5", "mobile:justify-center")}>
      {items?.map((item) => (
        <TabButton key={item.href} item={item} />
      ))}
    </div>
  );
}

function TabButton({ item }) {
  const pathname = usePathname();
  const isActive = pathname.includes(item.href);
  const activeTheme = item.theme || "blue";

  return (
    <Button
      variant={isActive ? activeTheme : "gray-lighter"}
      className={cn("min-w-[100px] rounded-full", "tablet:min-w-0")}
      asChild>
      <Link href={item.href}>{item.label}</Link>
    </Button>
  );
}
