"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { PediatricPortalProvider } from "./portal-context";
import { PediatricSidebar } from "./sidebar";
import { PediatricTopBar } from "./top-bar";

const TABLET_MAX = 1399;

export function PediatricPortalShell({ member, notices = [], notifications = [], children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > TABLET_MAX) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sidebarOpen]);

  return (
    <PediatricPortalProvider
      member={member}
      notices={notices}
      initialNotifications={notifications}>
      <div className={cn("flex h-screen flex-col overflow-hidden bg-[#F4F7FC]")}>
        <PediatricTopBar
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen((v) => !v)}
        />

        <div className={cn("flex min-h-0 flex-1")}>
          <div className={cn("tablet:hidden")}>
            <PediatricSidebar />
          </div>

          {sidebarOpen && (
            <div
              className={cn(
                "fixed inset-0 top-[88px] z-40 hidden tablet:block",
                "mobile:top-16",
              )}>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className={cn("absolute inset-0 bg-black/40")}
                onClick={() => setSidebarOpen(false)}
              />
              <div
                className={cn(
                  "relative z-10 h-full w-[min(340px,85vw)] overflow-hidden shadow-xl",
                )}>
                <PediatricSidebar onNavigate={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          <div data-portal-main className={cn("min-w-0 flex-1 overflow-y-auto overflow-x-hidden")}>
            {children}
          </div>
        </div>
      </div>
    </PediatricPortalProvider>
  );
}
