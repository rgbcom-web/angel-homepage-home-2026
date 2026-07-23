"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { cn } from "@/shared/lib/utils";
import { useQueryString } from "@/shared/hooks/useQueryString";

export function ListCategories({ paramKey, items, useAll = false }) {
  const options = useAll ? [{ value: "", label: "All" }, ...items] : items;

  const { get } = useQueryString();

  let currentCategory = get(paramKey) || options[0].value;

  if (useAll && !currentCategory) {
    currentCategory = "";
  }

  return (
    <div className={cn("flex flex-wrap gap-2", "tablet:gap-1.5", "mobile:justify-center")}>
      {options?.map((item) => (
        <CategoryButton
          key={item.value}
          item={item}
          paramKey={paramKey}
          currentCategory={currentCategory}
        />
      ))}
    </div>
  );
}

function CategoryButton({ item, paramKey, currentCategory }) {
  const { set } = useQueryString();

  let isActive = currentCategory === String(item.value);

  const handleClick = () => {
    set({ [paramKey]: item.value, page: 1 }, "push", { scroll: false });
  };

  let activeTheme = item.theme || "blue";

  if (item.value === "") {
    activeTheme = "navy";
  }

  return (
    <Button
      variant={isActive ? activeTheme : "gray-lighter"}
      className={cn("min-w-[100px] rounded-full", "tablet:min-w-0")}
      onClick={handleClick}>
      {item.label}
    </Button>
  );
}
