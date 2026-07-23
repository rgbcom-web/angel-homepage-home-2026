"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "./portal-context";
import { formatMemberDisplayName } from "./mock-data";

const ICON_AVATAR = "/images/pediatric/nav/icon-avatar.svg";
const ICON_CHEVRON = "/images/pediatric/nav/icon-chevron.svg";

function AvatarIcon({ className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON_AVATAR}
      alt=""
      width={24}
      height={24}
      aria-hidden
      className={cn("h-6 w-6", className)}
    />
  );
}

function ChevronIcon({ className, pointing = "down", animate = true }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={ICON_CHEVRON}
      alt=""
      width={20}
      height={20}
      aria-hidden
      className={cn(
        "size-5 shrink-0",
        animate && "transition-transform",
        pointing === "down" && "rotate-180",
        pointing === "right" && "rotate-90",
        className,
      )}
    />
  );
}

export function ProfileMenu() {
  const { member } = usePediatricPortal();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const displayName = formatMemberDisplayName(member);

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

  return (
    <div ref={rootRef} className={cn("relative")}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-12 items-center gap-4 overflow-hidden rounded-lg text-left transition-colors hover:bg-[#F8FAFC]",
          "tablet:gap-2",
          "mobile:h-10",
        )}>
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F0F6FF]",
            "mobile:size-10",
          )}>
          <AvatarIcon className={cn("mobile:h-5 mobile:w-5")} />
        </div>
        <div
          className={cn(
            "flex w-[160px] shrink-0 flex-col gap-1.5 overflow-hidden",
            "tablet:hidden",
          )}>
          <p className={cn("truncate text-lg font-semibold leading-none text-[#262633]")}>
            {displayName}
          </p>
          <p className={cn("truncate text-sm leading-none text-[#80858F]")}>
            {member.affiliation || ""}
          </p>
        </div>
        <ChevronIcon
          pointing={open ? "up" : "down"}
          className={cn("tablet:hidden")}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute left-[-20px] top-[calc(100%+21px)] z-50 w-[300px] overflow-hidden rounded-xl bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.12)]",
            "tablet:left-auto tablet:right-0 tablet:top-[calc(100%+12px)]",
            "mobile:fixed mobile:inset-x-4 mobile:top-[72px] mobile:w-auto",
          )}>
          <Link
            href="/pediatric/my-info"
            onClick={() => setOpen(false)}
            className={cn(
              "flex h-[95px] items-center justify-between gap-4 px-6 pb-4 pt-5 transition-colors hover:bg-[#F8FAFC]",
              "mobile:h-auto mobile:py-4",
            )}>
            <div className={cn("flex min-w-0 flex-1 items-center gap-4")}>
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full bg-[#F0F6FF]",
                )}>
                <AvatarIcon />
              </div>
              <div className={cn("flex min-w-0 flex-col gap-1.5")}>
                <p className={cn("truncate text-lg font-semibold leading-none text-[#262633]")}>
                  {displayName}
                </p>
                <p className={cn("truncate text-sm leading-none text-[#80858F]")}>
                  {member.affiliation || ""}
                </p>
              </div>
            </div>
            <ChevronIcon pointing="right" animate={false} />
          </Link>

          <div className={cn("h-px bg-[#EBEBF0]")} />

          <nav>
            <Link
              href="/pediatric/my-info"
              onClick={() => setOpen(false)}
              className={cn(
                "block border-b border-[#EBEBF0] px-6 py-5 text-[15px] text-[#333333] transition-colors hover:bg-[#F8FAFC]",
              )}>
              내 정보 수정
            </Link>
            <Link
              href="/pediatric/my-info/password"
              onClick={() => setOpen(false)}
              className={cn(
                "block px-6 py-5 text-[15px] text-[#333333] transition-colors hover:bg-[#F8FAFC]",
              )}>
              비밀번호 변경
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
