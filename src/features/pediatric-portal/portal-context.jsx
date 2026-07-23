"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { logoutAction } from "@/features/pediatric-auth/actions";
import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "./notifications-api";

const PediatricPortalContext = createContext(null);

function readStorageKey(member) {
  const id = member?.id || member?.loginId || "guest";
  return `pediatric-notification-reads:${id}`;
}

function loadReadIds(member) {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(readStorageKey(member));
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list : []);
  } catch {
    return new Set();
  }
}

function saveReadIds(member, ids) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(readStorageKey(member), JSON.stringify([...ids]));
  } catch {
    // ignore quota / private mode
  }
}

function applyReadState(list, readIds) {
  return (list || [])
    .map((item) => (readIds.has(item.id) ? { ...item, unread: false } : item))
    .filter((item) => item.unread);
}

export function PediatricPortalProvider({
  member,
  notices = [],
  initialNotifications = [],
  children,
}) {
  const [notifications, setNotifications] = useState(() =>
    (initialNotifications || []).filter((item) => item.unread),
  );
  const [, startTransition] = useTransition();

  const initialKey = useMemo(
    () => (initialNotifications || []).map((item) => `${item.id}:${item.unread ? 1 : 0}`).join("|"),
    [initialNotifications],
  );

  useEffect(() => {
    const readIds = loadReadIds(member);
    setNotifications(applyReadState(initialNotifications, readIds));
  }, [member, initialKey, initialNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.unread).length,
    [notifications],
  );

  const persistReads = useCallback(
    (ids) => {
      if (!ids?.length) return;
      const next = loadReadIds(member);
      ids.forEach((id) => next.add(id));
      saveReadIds(member, next);
    },
    [member],
  );

  const markAllRead = useCallback(() => {
    const keys = notifications.filter((n) => n.unread).map((n) => n.id);
    setNotifications([]);
    persistReads(keys);
    if (keys.length === 0) return;

    startTransition(async () => {
      await markAllNotificationsReadAction(keys);
    });
  }, [notifications, persistReads, startTransition]);

  const markAsRead = useCallback(
    (id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      persistReads([id]);
      startTransition(async () => {
        await markNotificationReadAction(id);
      });
    },
    [persistReads, startTransition],
  );

  const logout = useCallback(() => {
    startTransition(() => {
      logoutAction();
    });
  }, [startTransition]);

  const value = {
    member,
    notifications,
    unreadCount,
    notices,
    markAllRead,
    markAsRead,
    logout,
  };

  return (
    <PediatricPortalContext value={value}>{children}</PediatricPortalContext>
  );
}

export function usePediatricPortal() {
  const ctx = use(PediatricPortalContext);
  if (!ctx) {
    throw new Error("usePediatricPortal must be used within PediatricPortalProvider");
  }
  return ctx;
}
