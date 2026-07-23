"use client";

import { MENU_TREE } from "./menu-tree";
import { DDLink } from "@/shared/components/link";
import { cn } from "@/shared/lib/utils";
import { SVG_Logo, SVG_YoutubeCircle, SVG_LinkedInCircle } from "@/shared/svgs";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppContext } from "@/shared/context/app.context";
import { HeaderProvider, useHeaderContext } from "./header.context";
import { MobileMenu } from "./mobile-menu";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useLang } from "@/shared/context/lang-provider";

import { YOUTUBE_CHANNEL_URL, LINKEDIN_URL } from "@/app/app-constants";

export function Header() {
  return (
    <HeaderProvider>
      <HeaderElement />
    </HeaderProvider>
  );
}

function HeaderElement() {
  const { device } = useMediaQuery();
  const headerRef = useRef(null);
  const { setHeaderHeight, hided, isDark, isWhite, gnbOpened, isScrolled } = useHeaderContext();

  useEffect(() => {
    setHeaderHeight(headerRef?.current?.offsetHeight);
  }, [headerRef, device]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "group/header",
        "fixed left-0 top-0 z-50 h-[83px] w-full",
        "labtop:h-[70px]",
        "tablet:h-[70px]",
        "mobile:h-[60px]",
        "transition-[transform,background-color,backdrop-filter] duration-500 ease-timing-pop",
        hided && "translate-y-[-100%]",
        isDark && isScrolled && "bg-black/70 backdrop-blur-sm",
        (isWhite || gnbOpened) && "bg-white",
      )}>
      <div className={cn("relative h-full w-full")}>
        <div
          className={cn(
            "relative z-[2] grid h-full grid-cols-[160px_1fr_160px] items-center gap-[20px] px-[42px]",
            "tablet:flex tablet:items-center tablet:justify-between tablet:gap-[10px] tablet:px-[20px]",
            "mobile:px-[15px]",
          )}>
          <DDLink href="/">
            <SVG_Logo
              theme={isDark ? "color-white" : "color"}
              className={{
                svg: cn("labtop:!h-[30px] labtop:!w-auto", "tablet:!h-[30px] tablet:!w-auto"),
              }}
            />
          </DDLink>
          <div className={cn("flex h-full justify-center", "tablet:hidden")}>
            <GNB />
          </div>
          <div className={cn("flex justify-end gap-5", "tablet:hidden")}>
            <LangNav />
            <SNSNav />
          </div>
          <div className={cn("hidden", "tablet:flex")}>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

function GNB_Dimmer() {
  const { gnbOpened } = useHeaderContext();

  return (
    <>
      <div
        className={cn(
          "z-[-2] bg-dd-gray-lighter",
          "absolute left-0 top-0 w-full",
          "transition-[opacity,transform] duration-500 ease-timing-pop",
          "-translate-y-full opacity-0",
          gnbOpened && "translate-y-0 opacity-100",
          "h-[431px]",
          "labtop:h-[388px]",
          "tablet:hidden",
        )}
      />
      <div
        className={cn(
          "z-[-1] bg-white",
          "absolute left-0 top-0 w-full",
          "transition-[opacity,transform] duration-500 ease-timing-pop",
          "opacity-0",
          gnbOpened && "opacity-100",
          "h-[83px]",
          "labtop:h-[70px]",
          "tablet:hidden",
        )}
      />
    </>
  );
}

function GNB() {
  const { lang, langContent, isEng } = useLang();
  const { isDark, isWhite, submenuHeight, hided, setGnbOpened, gnbOpened } = useHeaderContext();

  const handleMouseEnter = () => {
    setGnbOpened(true);
  };

  const handleMouseLeave = () => {
    setGnbOpened(false);
  };

  const menuTree = langContent(MENU_TREE);

  return (
    <div
      className={cn(
        "gnb group/gnb h-full w-full",
        hided && "!pointer-events-none *:!pointer-events-none",
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <ul
        className={cn(
          "flex h-full justify-center text-center",
          isDark && "text-white",
          isWhite && "text-foreground",
        )}>
        {menuTree.map((menu, i) => (
          <li
            key={menu.title}
            className={cn(
              "group relative w-[190px]",
              "labtop:w-[140px]",
              isEng && "labtop:w-[190px]",
            )}>
            <DDLink
              href={menu.href}
              onMouseEnter={handleMouseEnter}
              className={cn(
                "relative flex h-full items-center justify-center text-xl font-semibold group-hover:text-dd-blue",
                "duration-400 transition-colors",
                "labtop:text-lg",
              )}>
              {menu.title}
            </DDLink>
            {menu.childs.length > 0 && (
              <div
                className={cn(
                  "pointer-events-none absolute left-0 top-full w-full overflow-hidden",
                )}>
                <ul
                  className={cn(
                    !hided && "pointer-events-auto",
                    "border-r border-[#707070] border-opacity-20 pb-[30px] pt-[20px]",
                    "transition-[transform,opacity] duration-500 ease-timing-pop",
                    "-translate-y-full opacity-0",
                    gnbOpened && "-translate-y-0 opacity-100",
                    "labtop:text-base",
                  )}
                  style={{
                    height: `${submenuHeight}px`,
                  }}>
                  {menu.childs.map((child) => (
                    <li key={child.title} className={cn("group/submenu")}>
                      <DDLink
                        href={child.href}
                        className={cn(
                          "block py-[0.4em] leading-[1.3] text-[#aaa]",
                          child.childs && "font-bold text-foreground",
                          "group-hover/submenu:text-black",
                        )}>
                        {child.title}
                      </DDLink>
                      {child.childs && (
                        <ul className={cn("pb-2")}>
                          {child.childs.map((grandChild) => (
                            <li key={grandChild.title}>
                              <DDLink
                                href={grandChild.href}
                                className={cn(
                                  "block py-[0.4em] leading-[1.3] text-[#aaa]",
                                  "hover:text-black",
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
              </div>
            )}
          </li>
        ))}
      </ul>
      <GNB_Dimmer />
    </div>
  );
}

function LangNav() {
  const { setMainpageInit } = useAppContext();
  const { lang } = useParams();
  const { theme, gnbHover } = useHeaderContext();

  const classNames = {
    container: cn("flex items-center"),
    divider: cn(
      "w-[1px] h-[18px] mx-[4px] bg-[#E5E5E5]",
      "transition-opacity duration-500",
      theme === "white" || gnbHover ? "opacity-100" : "opacity-[0.32]",
    ),
    button: cn(
      "text-lg px-[10px] py-[5px] opacity-[0.32] font-semibold",
      "transition-all duration-500 text-white",
      "hover:opacity-100",
      (theme !== "transparent" && theme !== "dark") || gnbHover ? "text-foreground" : "text-white",
    ),
    activeButton: cn(
      "opacity-100 pointer-events-none",
      (theme === "white" || gnbHover) && "text-dd-blue",
    ),
  };

  return (
    <nav className={cn(classNames.container)}>
      <DDLink
        href="/en"
        keepLang={false}
        className={cn(classNames.button, lang === "en" && classNames.activeButton)}
        onClick={() => setMainpageInit(true)}>
        EN
      </DDLink>
      <span className={cn(classNames.divider)} />
      <DDLink
        href="/ko"
        keepLang={false}
        className={cn(classNames.button, lang === "ko" && classNames.activeButton)}
        onClick={() => setMainpageInit(true)}>
        KR
      </DDLink>
    </nav>
  );
}

function SNSNav() {
  const Button = ({ href, children, className }) => (
    <DDLink
      href={href}
      target="_blank"
      keepLang={false}
      rel="noopener noreferrer"
      className={cn("text-[#989898]", className)}>
      {children}
    </DDLink>
  );

  return (
    <nav className={cn("flex items-center gap-3")}>
      <Button href={YOUTUBE_CHANNEL_URL} className="text-[#FF0000]">
        <SVG_YoutubeCircle />
      </Button>
      <Button href={LINKEDIN_URL} className="text-[#3968D5]">
        <SVG_LinkedInCircle />
      </Button>
    </nav>
  );
}
