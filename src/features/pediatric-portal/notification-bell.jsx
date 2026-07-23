"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "./portal-context";
import { formatRelativeTime } from "./mock-data";

const ICON_BELL = "/images/pediatric/nav/icon-bell.svg";

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead, markAsRead } = usePediatricPortal();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const recent = notifications.slice(0, 5);

  return (
    <div ref={rootRef} className={cn("relative")}>
      <button
        type="button"
        aria-label="알림"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex size-12 items-center justify-center rounded-full text-[#80858F] transition-colors hover:bg-[#F8FAFC]",
          "mobile:size-10",
        )}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ICON_BELL}
          alt=""
          width={24}
          height={24}
          aria-hidden
          className={cn("h-6 w-6", "mobile:h-5 mobile:w-5")}
        />
        {unreadCount > 0 && (
          <span
            aria-hidden
            className={cn(
              "absolute right-[11px] top-[11px] size-2.5 rounded-full bg-[#2EC44A] ring-2 ring-white",
              "mobile:right-2 mobile:top-2",
            )}
          />
        )}
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-[-8px] top-[calc(100%+21px)] z-50 w-[360px] overflow-hidden rounded-xl bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.12)]",
            "tablet:left-auto tablet:right-0 tablet:top-[calc(100%+12px)] tablet:w-[min(360px,calc(100vw-2rem))]",
            "mobile:fixed mobile:inset-x-4 mobile:left-4 mobile:right-4 mobile:top-[72px] mobile:w-auto",
          )}>
          <div className={cn("flex h-[59px] items-center justify-between px-6 pb-4 pt-5")}>
            <h2 className={cn("text-lg font-bold text-[#1A1A1A]")}>알림</h2>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className={cn(
                  "rounded-md bg-[#F0F0F5] px-3 py-1.5 text-[13px] font-medium text-[#595966] hover:bg-[#E8E8ED]",
                )}>
                모두 읽음
              </button>
            )}
          </div>

          <div className={cn("h-px bg-[#EBEBF0]")} />

          <ul className={cn("max-h-[258px] overflow-y-auto")}>
            {recent.length === 0 ? (
              <li className={cn("px-6 py-10 text-center text-sm text-[#9999A6]")}>
                알림이 없습니다.
              </li>
            ) : (
              recent.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      markAsRead(item.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex items-start gap-[10px] border-b border-[#EBEBF0] px-6 py-3 transition-colors hover:bg-[#F8FAFC]",
                      item.unread ? "bg-[#F0F7FF]" : "bg-white",
                    )}>
                    <span
                      className={cn(
                        "mt-1.5 size-2 shrink-0 rounded-full",
                        item.unread ? "bg-[#427DFF]" : "bg-transparent",
                      )}
                    />
                    <div className={cn("min-w-0 flex-1 space-y-3")}>
                      <div className={cn("space-y-1")}>
                        <p
                          className={cn(
                            "text-sm leading-snug",
                            item.unread
                              ? "font-medium text-[#1A1A1F]"
                              : "font-medium text-[#80858F]",
                          )}>
                          {item.title}
                        </p>
                        {item.description && (
                          <p className={cn("text-xs leading-snug text-[#80808C]")}>
                            {item.description}
                          </p>
                        )}
                      </div>
                      <p className={cn("text-[11px] text-[#9999A6]")}>
                        {formatRelativeTime(item.createdAt)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>

          <Link
            href="/pediatric/notifications"
            onClick={() => setOpen(false)}
            className={cn(
              "flex h-[45px] items-center justify-center gap-1.5 text-sm font-medium text-[#3873F2] hover:bg-[#F8FAFC]",
            )}>
            모든 알림 확인
            <ChevronRight className={cn("h-2.5 w-2.5")} strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </div>
  );
}
