"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { SecureFileViewer } from "./secure-file-viewer";

export function ResourceDetailPage({ resource }) {
  if (!resource) {
    return (
      <div className={cn("mx-auto max-w-[900px] px-8 py-16 text-center")}>
        <p className={cn("text-[#64748B]")}>자료를 찾을 수 없습니다.</p>
        <Link
          href="/pediatric/resources"
          className={cn("mt-4 inline-block text-sm font-semibold text-[#2563EB] hover:underline")}>
          자료실로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto max-w-[1100px] px-8 py-8", "tablet:px-6", "mobile:px-4")}>
      <Link
        href="/pediatric/resources"
        className={cn(
          "mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#2563EB]",
        )}>
        <ArrowLeft className={cn("h-4 w-4")} />
        자료실
      </Link>

      <div className={cn("mb-6")}>
        <div className={cn("mb-2 flex flex-wrap items-center gap-2")}>
          {resource.isNotice && (
            <span className={cn("rounded-md bg-[#2563EB] px-2 py-1 text-xs font-bold text-white")}>
              공지
            </span>
          )}
          <span className={cn("text-sm text-[#94A3B8]")}>{resource.date}</span>
          <span className={cn("text-sm text-[#94A3B8]")}>조회 {resource.views}</span>
        </div>
        <h1 className={cn("text-2xl font-bold text-[#0F172A]", "mobile:text-xl")}>
          {resource.title}
        </h1>
        {resource.description && (
          <p className={cn("mt-2 text-sm text-[#64748B]")}>{resource.description}</p>
        )}
      </div>

      <div
        className={cn(
          "mb-4 flex items-center gap-2 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-sm text-[#92400E]",
        )}>
        <Lock className={cn("h-4 w-4 shrink-0")} />
        보안 정책에 따라 다운로드·인쇄가 불가하며, 열람 화면에 이용자 워터마크가 표시됩니다.
      </div>

      <SecureFileViewer resource={resource} />
    </div>
  );
}
