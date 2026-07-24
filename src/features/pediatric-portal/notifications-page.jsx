"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "./portal-context";
import { formatRelativeTime } from "./mock-data";
import { PortalContentFrame } from "./portal-ui";

export function NotificationsPage() {
  const { notifications, markAllRead, markAsRead, unreadCount } = usePediatricPortal();

  return (
    <PortalContentFrame>
      <div className={cn("mb-6 flex items-center justify-between")}>
        <h1 className={cn("text-2xl font-bold text-[#0F172A]", "mobile:text-xl")}>알림</h1>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllRead}
            className={cn("text-sm font-medium text-[#2563EB] hover:underline")}>
            모두 읽음
          </button>
        )}
      </div>

      <ul className={cn("overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white")}>
        {notifications.length === 0 ? (
          <li className={cn("px-5 py-12 text-center text-sm text-[#94A3B8]")}>알림이 없습니다.</li>
        ) : (
          notifications.map((item) => (
            <li key={item.id} className={cn("border-b border-[#F1F5F9] last:border-b-0")}>
              <Link
                href={item.href}
                onClick={() => markAsRead(item.id)}
                className={cn(
                  "block px-5 py-4 hover:bg-[#F8FAFC]",
                  item.unread && "bg-[#EFF6FF]/50",
                )}>
                <p className={cn("text-[15px] text-[#0F172A]", item.unread && "font-semibold")}>
                  {item.title}
                </p>
                <p className={cn("mt-1 text-xs text-[#94A3B8]")}>
                  {formatRelativeTime(item.createdAt)}
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </PortalContentFrame>
  );
}
