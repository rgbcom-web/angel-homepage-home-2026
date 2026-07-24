"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "./portal-context";
import { POST_TYPE_PATH } from "./menu";
import { PortalContentFrame } from "./portal-ui";

const TYPE_LABEL = {
  resources: "자료실",
  events: "행사",
  surveys: "설문",
};

export function BoardListPage({ type, title, description }) {
  const { posts } = usePediatricPortal();
  const list = posts.filter((p) => p.type === type);
  const base = POST_TYPE_PATH[type];

  return (
    <PortalContentFrame>
      <h1 className={cn("text-2xl font-bold text-[#0F172A]", "mobile:text-xl")}>{title}</h1>
      {description && <p className={cn("mt-2 text-sm text-[#64748B]")}>{description}</p>}

      <ul className={cn("mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white")}>
        {list.length === 0 ? (
          <li className={cn("px-5 py-10 text-center text-sm text-[#94A3B8]")}>
            등록된 게시글이 없습니다.
          </li>
        ) : (
          list.map((post) => (
            <li key={post.id} className={cn("border-b border-[#F1F5F9] last:border-b-0")}>
              <Link
                href={`${base}/${post.id}`}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#F8FAFC]",
                )}>
                <div className={cn("min-w-0")}>
                  <div className={cn("mb-1 flex items-center gap-2")}>
                    <span className={cn("text-xs font-medium text-[#64748B]")}>
                      {TYPE_LABEL[post.type]}
                    </span>
                    {post.showInNotice && (
                      <span
                        className={cn(
                          "rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-semibold text-[#2563EB]",
                        )}>
                        공지 노출
                      </span>
                    )}
                  </div>
                  <p className={cn("truncate font-medium text-[#0F172A]")}>{post.title}</p>
                </div>
                <span className={cn("flex shrink-0 items-center gap-2 text-sm text-[#94A3B8]")}>
                  {post.date}
                  <ChevronRight className={cn("h-4 w-4")} />
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </PortalContentFrame>
  );
}
