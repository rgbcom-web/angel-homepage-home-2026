"use client";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/shadcn/ui/badge";
import { useFindMedicalCenter } from "./context";

export function FindMedicalCenterListItem({ item }) {
  const { selectedItem, setSelectedItem } = useFindMedicalCenter();
  const { sido, name, address, tel } = item;
  const isSelected = selectedItem?.id === item.id;

  const handleClick = () => {
    setSelectedItem(item);
  };

  return (
    <button
      className={cn(
        "grid w-full grid-cols-[70px_1fr] items-start justify-between gap-4 rounded-xl p-5",
        "tablet:grid-cols-[60px_1fr] tablet:border tablet:border-dd-gray-light tablet:p-4",
        "mobile:flex mobile:flex-col mobile:items-start mobile:gap-2",
        isSelected && "tablet:border-dd-lighter bg-dd-gray-lighter",
      )}
      onClick={handleClick}>
      <Badge
        className={cn(
          "justify-center text-center text-lg",
          "tablet:text-base/[1.1]",
          "mobile:text-xs/[1.1]",
        )}>
        {sido.slice(0, 2)}
      </Badge>
      <div className={cn("flex flex-col gap-1.5 pt-0.5 text-left", "tablet:pt-0", "mobile:gap-1")}>
        <span className={cn("text-2xl font-semibold", "tablet:text-lg", "mobile:text-base")}>
          {name}
        </span>
        <div className={cn("flex flex-col")}>
          <span className={cn("text-lg", "tablet:text-base", "mobile:text-base")}>{address}</span>
          <span className={cn("text-lg", "tablet:text-base", "mobile:text-base")}>
            <b>Tel.</b> {tel}
          </span>
        </div>
      </div>
    </button>
  );
}
