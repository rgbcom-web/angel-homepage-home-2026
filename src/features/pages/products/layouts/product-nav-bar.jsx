"use client";

import { cn } from "@/shared/lib/utils";
import { createContext, use, useEffect, useState, useRef } from "react";
import { usePathname, useParams } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { DDLink } from "@/shared/components/link";
import { Button as ShadButton } from "@/shared/shadcn/ui/button";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useLang } from "@/shared/context/lang-provider";

const PRODUCT_NAV_BAR_ITEMS = [
  {
    theme: "blue",
    href: "/products/angel-medi/brand",
    label: {
      ko: "MEDI",
      en: "MEDI",
    },
    subItems: [
      { href: "/products/angel-medi/brand", label: { ko: "ANGEL MEDI", en: "ANGEL MEDI" } },
      {
        href: "/products/angel-medi/m20",
        label: { ko: "엔젤렉스 M20", en: "ANGEL LEGS M20" },
        navLinks: [
          { href: "#intro", label: "INTRO" },
          { href: "#feature", label: "FEATURE" },
          { href: "#application", label: "APPLICATION" },
          { href: "#specification", label: "SPECIFICATION" },
        ],
      },
      {
        href: "/products/angel-medi/mw10",
        label: { ko: "MW10", en: "MW10" },
        navLinks: [
          { href: "#intro", label: "INTRO" },
          { href: "#feature", label: "FEATURE" },
          { href: "#specification", label: "SPECIFICATION" },
        ],
      },
    ],
  },
  {
    theme: "mint",
    href: "/products/angel-suit/brand",
    label: {
      ko: "SUIT",
      en: "SUIT",
    },
    subItems: [
      { href: "/products/angel-suit/brand", label: { ko: "ANGEL SUIT", en: "ANGEL SUIT" } },
      {
        href: "/products/angel-suit/h10",
        label: { ko: "엔젤슈트 H10", en: "ANGEL SUIT H10" },
        navLinks: [
          { href: "#intro", label: "INTRO" },
          { href: "#feature", label: "FEATURE" },
          { href: "#angel-a-pro", label: "angel' a PRO" },
          { href: "#specification", label: "SPECIFICATION" },
        ],
      },
    ],
  },
  {
    theme: "orange",
    href: "/products/angel-gear/brand",
    label: {
      ko: "GEAR",
      en: "GEAR",
    },
  },
  {
    theme: "gray",
    href: "/products/angel-kit/brand",
    label: {
      ko: "KIT",
      en: "KIT",
    },
  },
];

const ProductNavBarContext = createContext();

export function ProductNavBar() {
  const { lang, langContent } = useLang();
  const pathname = usePathname();
  const purePath = pathname.split(lang)[1];

  const currentItem = PRODUCT_NAV_BAR_ITEMS.find((item) => {
    const parentPath = item.href.split("/brand")[0];
    return purePath.startsWith(parentPath);
  });
  const { subItems, theme } = currentItem;
  const currentSubItem = subItems?.find((item) => purePath === item.href);
  const { navLinks } = currentSubItem || {};

  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.99) {
      setShow(false);
    }
  });

  return (
    <ProductNavBarContext value={{ pathname, purePath, currentItem, currentSubItem, theme }}>
      <motion.div
        initial={{
          y: "100%",
        }}
        animate={{
          y: show ? "0%" : "100%",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn("fixed bottom-0 left-0 z-50 w-full", "bg-black text-white")}>
        <ScrollProgress />
        <div
          className={cn(
            "grid h-auto w-full grid-cols-[400px_1fr_400px] items-center gap-[20px] px-[42px] py-[12px]",
            "tablet:flex tablet:px-[7px]",
          )}>
          <nav className={cn("flex gap-[10px]", "tablet:mr-auto")}>
            <Dropdown
              current={currentItem.label[lang]}
              list={PRODUCT_NAV_BAR_ITEMS}
              className={{ container: cn("min-w-[130px]", "tablet:min-w-0") }}
            />
            {currentSubItem && (
              <Dropdown
                current={currentSubItem.label[lang]}
                list={subItems}
                className={{ container: cn("min-w-[200px]", "tablet:min-w-0") }}
                exact
              />
            )}
          </nav>
          <nav>{<NavLinks items={navLinks} />}</nav>
          <nav className={cn("flex h-full justify-end", "tablet:hidden")}>
            <Button className={cn("px-[1.5em]")} asChild>
              <DDLink href="/support/contact">
                {langContent({
                  ko: "제품문의",
                  en: "PRODUCT INQUIRY",
                })}
              </DDLink>
            </Button>
          </nav>
        </div>
      </motion.div>
    </ProductNavBarContext>
  );
}

function NavLinks({ items }) {
  const [activeSection, setActiveSection] = useState("");
  const observersRef = useRef([]);

  useEffect(() => {
    if (!items || items.length === 0) return;

    observersRef.current.forEach(({ observer, element }) => {
      if (element) observer.unobserve(element);
    });
    observersRef.current = [];

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0.1,
    };

    items.forEach((item) => {
      const targetId = item.href.startsWith("#") ? item.href.substring(1) : item.href;
      const targetElement = document.getElementById(targetId) || document.querySelector(item.href);

      if (!targetElement) {
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(`Setting active section to: ${item.href}`);
            setActiveSection(item.href);
          }
        });
      }, observerOptions);

      observer.observe(targetElement);
      observersRef.current.push({ observer, element: targetElement });
    });

    // Clean up
    return () => {
      observersRef.current.forEach(({ observer, element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [items]);

  if (!items) return null;

  return (
    <>
      <NavLink_PC items={items} activeSection={activeSection} />
      <NavLink_Mobile items={items} activeSection={activeSection} />
    </>
  );
}

function NavLinkItem({ item, className, onClick }) {
  return (
    <DDLink
      href={item.href}
      scroll={false}
      onClick={(e) => {
        e.preventDefault();
        const targetElement = document.querySelector(item.href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
        onClick?.(e);
      }}
      className={cn(className)}>
      {item.label}
    </DDLink>
  );
}

function NavLink_PC({ items, activeSection }) {
  return (
    <div className={cn("flex w-full justify-center gap-[20px]", "labtop:gap-0", "tablet:hidden")}>
      {items.map((item, i) => (
        <NavLinkItem
          key={i}
          item={item}
          className={cn(
            "px-[1em] text-xl text-[#9C9C9C] hover:text-white",
            "labtop:text-base",
            activeSection === item.href ? "text-white" : "",
          )}
        />
      ))}
    </div>
  );
}

function NavLink_Mobile({ items, activeSection }) {
  const ref = useRef(null);
  const { theme } = use(ProductNavBarContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!items) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "group relative hidden",
        "tablet:block tablet:w-[200px]",
        "mobile:static mobile:w-auto",
      )}>
      <Button
        onClick={handleClick}
        className={cn(
          "relative z-10 w-full justify-between gap-[1.5em] whitespace-nowrap px-[1.5em]",
          "mobile:bg-transparent",
        )}>
        <span>{items.find((item) => item.href === activeSection)?.label}</span>
        <DropdownArrow />
      </Button>
      <div
        className={cn(
          "pointer-events-none absolute bottom-[11px] left-[-10px] w-[calc(100%+20px)] overflow-hidden rounded-lg px-[10px] pb-[10px]",
          "mobile:bottom-full mobile:left-0 mobile:w-full mobile:rounded-none mobile:p-0",
        )}>
        <div className={cn("w-full overflow-hidden")}>
          <ul
            className={cn(
              "pointer-events-auto w-full overflow-hidden rounded-2xl bg-[#343434] px-[15px] pb-[32px] pt-[10px] text-dd-gray shadow-[3px_3px_6px_rgba(0,0,0,0.15)]",
              "transition-transform duration-500 ease-timing-pop",
              isOpen ? "translate-y-0" : "translate-y-[100%]",
              "mobile:rounded-b-none mobile:bg-black mobile:py-4",
            )}>
            {items.map((item, i) => (
              <li key={i} className={cn("")}>
                <NavLinkItem
                  item={item}
                  className={cn(
                    "block px-[0.3em] py-[0.5em] font-medium leading-[1]",
                    "hover:text-white",
                    activeSection === item.href &&
                      `pointer-events-none font-semibold ${activeTextColor[theme]}`,
                  )}
                  onClick={() => setIsOpen(false)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const hoverBackgroundColor = {
  blue: "hover:!bg-dd-blue",
  mint: "hover:!bg-dd-mint",
  orange: "hover:!bg-dd-orange",
  gray: "hover:!bg-dd-gray",
};

const activeTextColor = {
  blue: "text-dd-blue",
  mint: "text-dd-mint",
  orange: "text-dd-orange",
  gray: "text-dd-gray",
};

const activeBackgroundColor = {
  blue: "!bg-dd-blue",
  mint: "!bg-dd-mint",
  orange: "!bg-dd-orange",
  gray: "!bg-dd-gray",
};

function Button({ children, className, ...props }) {
  const { theme } = use(ProductNavBarContext);

  return (
    <ShadButton
      size="lg"
      className={cn(
        "bg-[#1e1e1e] text-base font-bold text-white",
        "transition-colors duration-300 ease-timing-pop",
        "labtop:h-10 labtop:px-[1.2em]",
        "tablet:h-10 tablet:px-[1em]",
        "mobile:h-8 mobile:gap-[1em] mobile:px-[0.7em] mobile:text-xs",
        hoverBackgroundColor[theme],
        className,
      )}
      {...props}>
      {children}
    </ShadButton>
  );
}

function Dropdown({ list, className, current, exact = false, ...props }) {
  const ref = useRef(null);
  const { lang } = useLang();
  const { device } = useMediaQuery();
  const { purePath, theme } = use(ProductNavBarContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    if (device !== "pc") return;
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (device !== "pc") return;
    setIsOpen(false);
  };

  const handleClick = () => {
    if (device === "pc") return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [purePath]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={ref}
      className={cn("group relative", "mobile:static", className?.container)}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <Button
        className={cn(
          "relative z-10 w-full justify-between gap-[1.5em] whitespace-nowrap px-[1.5em]",
          isOpen && activeBackgroundColor[theme],
        )}
        onClick={handleClick}>
        <span>{current}</span>
        <DropdownArrow />
      </Button>
      <div
        className={cn(
          "pointer-events-none absolute bottom-[11px] left-[-10px] w-[calc(100%+20px)] overflow-hidden rounded-lg px-[10px] pb-[10px]",
          "mobile:bottom-full mobile:left-0 mobile:w-full mobile:rounded-none mobile:p-0",
        )}>
        <div className={cn("w-full overflow-hidden")}>
          <ul
            className={cn(
              "pointer-events-auto w-full overflow-hidden rounded-2xl bg-[#343434] px-[15px] pb-[32px] pt-[10px] text-dd-gray shadow-[3px_3px_6px_rgba(0,0,0,0.15)]",
              "transition-transform duration-500 ease-timing-pop",
              isOpen ? "translate-y-0" : "translate-y-[100%]",
              "mobile:rounded-b-none mobile:bg-black mobile:py-4",
            )}>
            {list.map((item, i) => (
              <li key={i} className={cn("")}>
                <DDLink
                  href={item.href}
                  className={cn(
                    "block px-[0.3em] py-[0.5em] font-medium leading-[1]",
                    "hover:text-white",
                    ((exact && purePath === item.href) ||
                      (!exact && purePath.startsWith(item.href))) &&
                      `pointer-events-none font-semibold ${activeTextColor[theme]}`,
                  )}>
                  {item.label[lang]}
                </DDLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DropdownArrow({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1em"
      viewBox="0 0 18.567 10.698"
      className={cn(
        "flex-shrink-0 transition-transform duration-500 ease-timing-pop mobile:!text-[8px]",
        className,
      )}
      {...props}>
      <path
        d="M0,15.738,7.869,7.87,0,0"
        transform="translate(1.414 9.283) rotate(-90)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ScrollProgress() {
  const { theme } = use(ProductNavBarContext);
  const { scrollYProgress } = useScroll();

  return (
    <div
      className={cn(
        "custom-scroll-progressbar h-[4px] w-full bg-dd-gray-lighter/20",
        "mobile:h-[2px]",
      )}>
      <motion.div
        className={cn("h-full w-full origin-left", activeBackgroundColor[theme])}
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
