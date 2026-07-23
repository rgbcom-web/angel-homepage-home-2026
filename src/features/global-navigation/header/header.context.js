"use client";

import { useAppContext } from "@/shared/context/app.context";
import { useParams, usePathname } from "next/navigation";
import { createContext, use, useState, useEffect } from "react";

const HeaderContext = createContext();

const mainThemePath = {
  dark: [
    {
      path: "",
      exact: true,
    },
    {
      path: "/company/overview",
      exact: true,
    },
    {
      path: "/company/technology",
      exact: true,
    },
    {
      path: "/products",
      exact: false,
    },
  ],
};

export function HeaderProvider({ children }) {
  const { homeCoverAnimationEnd } = useAppContext();
  const pathname = usePathname();
  const { lang } = useParams();

  const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
  const [currentScroll, setCurrentScroll] = useState(scrollY);
  const [isScrolled, setIsScrolled] = useState(scrollY > 100);
  const [lastToggleScroll, setLastToggleScroll] = useState(scrollY);
  const [hided, setHided] = useState(!homeCoverAnimationEnd);
  const [gnbOpened, setGnbOpened] = useState(false);

  const [mainTheme, setMainTheme] = useState("dark");
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const isWhite = theme === "white";

  const [headerHeight, setHeaderHeight] = useState(null);
  const [submenuHeight, setSubmenuHeight] = useState(318);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(() => {
        const scrolled = window.scrollY > 100;

        if (!gnbOpened) {
          setTheme(mainTheme);
        }

        return scrolled;
      });

      setCurrentScroll((prevScroll) => {
        const cur = window.scrollY;

        if (cur < 100) {
          setHided(false);
          return cur;
        }

        const diff = Math.abs(cur - lastToggleScroll);

        if (diff > 50) {
          setHided(prevScroll < cur);
          setLastToggleScroll(cur);
        }

        return cur;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastToggleScroll, gnbOpened, mainTheme]);

  useEffect(() => {
    if (gnbOpened) {
      setTheme("white");
    } else {
      setTheme(mainTheme);
    }
  }, [gnbOpened, isScrolled, mainTheme]);

  useEffect(() => {
    setGnbOpened(false);
    setMainTheme(() => {
      const isDark = mainThemePath.dark.some(({ path, exact }) => {
        if (exact) {
          return `/${lang}${path}` === pathname;
        }

        return pathname.startsWith(`/${lang}${path}`);
      });

      setTheme(isDark ? "dark" : "white");

      return isDark ? "dark" : "white";
    });
  }, [pathname, lang]);

  useEffect(() => {
    setTheme(mainTheme);
  }, [mainTheme]);

  useEffect(() => {
    setHided(!homeCoverAnimationEnd);
  }, [homeCoverAnimationEnd]);

  return (
    <HeaderContext
      value={{
        isScrolled,
        hided,
        mainTheme,
        theme,
        setTheme,
        isDark,
        isWhite,
        headerHeight,
        setHeaderHeight,
        submenuHeight,
        setSubmenuHeight,
        gnbOpened,
        setGnbOpened,
      }}>
      {children}
    </HeaderContext>
  );
}

export const useHeaderContext = () => {
  return use(HeaderContext);
};
