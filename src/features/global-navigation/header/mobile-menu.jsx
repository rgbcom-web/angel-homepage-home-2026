"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/shared/shadcn/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/shared/shadcn/ui/accordion";
import { useEffect, useState } from "react";
import { useHeaderContext } from "./header.context";
import { X } from "lucide-react";
import { DDLink } from "@/shared/components/link";
import { useParams, usePathname } from "next/navigation";
import { MENU_TREE } from "./menu-tree";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent
        hideClose
        className={cn(
          "w-[700px] max-w-[100vw] border-none",
          "bg-black/70 text-white backdrop-blur-lg",
          "flex flex-col space-y-10 px-0",
          "mobile:space-y-6",
        )}>
        <SheetHeader
          className={cn(
            "flex flex-row items-center justify-between space-y-0 px-12",
            "mobile:px-8",
          )}>
          <SheetTitle className={cn("sr-only")}>Menu</SheetTitle>
          <LangNav />
          <CloseButton />
        </SheetHeader>
        <div
          className={cn(
            "flex flex-col gap-4 overflow-y-auto px-12 [scrollbar-width:none]",
            "mobile:px-8",
          )}>
          <MenuAccordion />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MenuIcon() {
  const { isDark, isWhite } = useHeaderContext();
  return (
    <div className={cn(isDark && "text-white", isWhite && "text-[#474747]", "text-4xl")}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3 12H21M3 6H21M3 18H21"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function CloseButton() {
  const { isDark } = useHeaderContext();

  return (
    <SheetClose
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full !ring-0 focus:outline-none disabled:pointer-events-none",
        "-mr-1",
        isDark && "text-white",
      )}>
      <X className="h-full w-full" strokeWidth={1} />
      <span className="sr-only">Close</span>
    </SheetClose>
  );
}

function LangNav() {
  const { lang } = useLang();

  return (
    <nav className={cn("flex flex-row gap-4 text-xl")}>
      <DDLink href="/ko" keepLang={false} className={cn(lang === "ko" && "font-bold")}>
        KR
      </DDLink>
      <DDLink href="/en" keepLang={false} className={cn(lang === "en" && "font-bold")}>
        EN
      </DDLink>
    </nav>
  );
}

function MenuAccordion() {
  const pathname = usePathname();
  const { lang, langContent } = useLang();
  const currentPath = pathname.split(lang)[1];

  const menuTree = langContent(MENU_TREE);

  return (
    <Accordion type="single" collapsible>
      {menuTree.map((item) => (
        <AccordionItem key={item.title} value={item.title} className={cn("border-b-white/10")}>
          <AccordionTrigger className={cn("text-3xl", "mobile:text-2xl")}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={cn("pl-0.5")}>
            <ul className={cn("text-2xl/[1.8] text-white/80", "mobile:text-xl/[1.8]")}>
              {item.childs.map((child) => (
                <li key={child.title}>
                  <DDLink
                    href={child.href}
                    className={cn(
                      "block",
                      child.childs && "font-bold",
                      currentPath.startsWith(child.href) && "text-white/100 underline",
                    )}>
                    {child.title}
                  </DDLink>
                  {child.childs?.length > 0 && (
                    <ul className={cn("pb-4")}>
                      {child.childs.map((grandChild) => (
                        <li key={grandChild.title}>
                          <DDLink
                            href={grandChild.href}
                            className={cn(
                              "block",
                              currentPath.startsWith(grandChild.href) && "text-white/100 underline",
                            )}>
                            {grandChild.title}
                          </DDLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
