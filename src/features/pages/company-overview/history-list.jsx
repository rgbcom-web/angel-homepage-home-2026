"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { useRef, useState, useEffect } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus, Minus } from "lucide-react";
import { numberPad } from "@/shared/lib/utils";

export function HistoryList({ list = [] }) {
  const [openedItem, setOpenedItem] = useState(list[0].year);
  const openedItemIndex = list.findIndex((yearBlock) => yearBlock.year === openedItem);

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={list[0].year}
      onValueChange={setOpenedItem}>
      <div className={cn("relative pt-[94px]", "tablet:pt-[0px]")}>
        <div
          className={cn(
            "absolute left-0 top-0 h-[12px] w-full bg-white/[0.07]",
            "tablet:h-[6px]",
            "mobile:h-2",
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-0 z-10 block h-full w-0 border-l border-dotted border-[#CCC8C8]/20",
          )}
        />
        <ul className={cn("mobile:pt-4")}>
          {list.map((yearBlock, yearIndex) => (
            <li key={yearBlock.year} className={cn("group/year-wrapper")}>
              <HistoryItem
                yearBlock={yearBlock}
                item={yearBlock}
                openedItem={openedItem}
                openedItemIndex={openedItemIndex}
                yearIndex={yearIndex}
              />
            </li>
          ))}
        </ul>
      </div>
    </AccordionPrimitive.Root>
  );
}

function HistoryItem({
  yearBlock,
  className,
  item,
  ref,
  openedItem,
  openedItemIndex,
  yearIndex,
  ...props
}) {
  const { langContent, isEng } = useLang();
  const [interacted, setInteracted] = useState(false);
  const itemRef = useRef(null);
  const { year, items } = yearBlock;
  const isOpen = openedItem === year;
  const isPreviousItem = openedItemIndex > yearIndex;

  useEffect(() => {
    if (isOpen && interacted) {
      const timer = setTimeout(() => {
        if (itemRef.current) {
          itemRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen, interacted]);

  return (
    <AccordionPrimitive.Item
      ref={itemRef}
      className={cn("scroll-m-10", "mobile:scroll-m-20", className)}
      value={year}
      {...props}>
      <AccordionPrimitive.Header className={cn("relative flex border-b border-[#CCC8C8]/20")}>
        <div
          className={cn(
            "absolute bottom-0 left-[-1px] hidden h-full w-[3px] bg-dd-blue",
            "group-first/year-wrapper:h-[calc(100%+94px)]",
            "tablet:group-first/year-wrapper:h-[calc(100%)]",
            "mobile:group-first/year-wrapper:hidden",
            (isOpen || isPreviousItem) && "block",
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 z-10 block h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-[3px] border-[#9c9c9c]",
            "mobile:border-3 mobile:h-3 mobile:w-3",
            isPreviousItem && "border-dd-blue",
            isOpen &&
              "h-5 w-5 border-[4px] border-dd-blue/60 mobile:h-4 mobile:w-4 mobile:border-2",
          )}>
          <span
            className={cn(
              "block h-full w-full rounded-full bg-[#9C9C9C]",
              isOpen && "bg-dd-blue",
              isPreviousItem && "bg-white",
            )}
          />
        </span>

        <AccordionPrimitive.Trigger
          className={cn(
            "group/trigger flex w-full items-center justify-between gap-4 pb-1 pl-[34px] pt-[44px]",
            "mobile:py-2 mobile:pl-[20px] mobile:pr-[10px]",
          )}
          onClick={() => setInteracted(true)}>
          <span
            className={cn(
              "text-[54px] font-bold leading-[1.1] text-[#545454]",
              "tablet:text-[34px]",
              "mobile:text-[22px]",
              isOpen && "text-dd-blue",
            )}>
            {year}
          </span>
          <span
            className={cn(
              "flex items-center gap-2 font-bold text-[#a4a4a4] opacity-60",
              "mobile:text-xs",
              isOpen && "text-white opacity-100",
            )}>
            {isOpen ? (
              <span>{langContent({ ko: "닫기", en: "Close" })}</span>
            ) : (
              <span>{langContent({ ko: "자세히 보기", en: "View Details" })}</span>
            )}
            {isOpen ? (
              <Minus className={cn("h-[1.5em] w-[1.5em]")} strokeWidth={2} />
            ) : (
              <Plus className={cn("h-[1.5em] w-[1.5em]")} strokeWidth={2} />
            )}
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        className={cn(
          "py-6 pl-[142px]",
          "tablet:pl-[40px]",
          "mobile:pl-[25px]",
          // "] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        )}>
        <ul className={cn("space-y-4")}>
          {items.map((monthBlock, index) => (
            <li
              key={index}
              className={cn("flex gap-6 text-lg/[1.8]", "tablet:text-base", "mobile:gap-2")}>
              <span
                className={cn(
                  "min-w-[1.5em] flex-shrink-0 font-bold text-dd-blue",
                  isEng && "min-w-[2em]",
                )}>
                {numberPad(monthBlock.month)}
              </span>
              <ul className={cn("space-y-1")}>
                {monthBlock.contents.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
