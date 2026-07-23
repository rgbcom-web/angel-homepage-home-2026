"use client";

import { createContext, useState, useEffect, use } from "react";
import { usePathname } from "next/navigation";

const AppContext = createContext();

export function AppProvider({ children, lang }) {
  const pathname = usePathname();
  const isHome = pathname === `/${lang}`;
  const [homeCoverAnimationEnd, setHomeCoverAnimationEnd] = useState(!isHome ? true : false);

  useEffect(() => {
    if (!homeCoverAnimationEnd) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.paddingRight = "var(--scroll-bar-width)";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "relative";
      document.body.style.width = "100%";
      document.body.style.paddingRight = "0px";
    }
  }, [homeCoverAnimationEnd]);

  return (
    <AppContext
      value={{
        homeCoverAnimationEnd,
        setHomeCoverAnimationEnd,
        isHome,
      }}>
      {children}
    </AppContext>
  );
}

export function useAppContext() {
  return use(AppContext);
}
