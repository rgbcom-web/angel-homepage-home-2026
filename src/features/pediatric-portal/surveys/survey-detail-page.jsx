"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { PortalContentFrame } from "../portal-ui";
import {
  formatSurveyPeriod,
  getSurveyStatus,
  getSurveyStatusLabel,
} from "./surveys-data";

export function SurveyDetailPage({ survey }) {
  if (!survey) {
    return (
      <PortalContentFrame className="py-16 text-center">
        <p className={cn("text-[#64748B]")}>설문을 찾을 수 없습니다.</p>
        <Link
          href="/pediatric/surveys"
          className={cn("mt-4 inline-block text-sm font-semibold text-[#2563EB] hover:underline")}>
          설문 목록으로
        </Link>
      </PortalContentFrame>
    );
  }

  const status = getSurveyStatus(survey);
  const ongoing = status === "ongoing";
  const formUrl = String(survey.googleFormUrl || "").trim();

  return (
    <PortalContentFrame>
      <Link
        href="/pediatric/surveys"
        className={cn(
          "mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] hover:text-[#2563EB]",
        )}>
        <ArrowLeft className={cn("h-4 w-4")} />
        설문
      </Link>

      <article
        className={cn(
          "rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm",
          "mobile:p-5",
        )}>
        <div className={cn("flex flex-wrap items-center gap-2")}>
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
              ongoing
                ? "border border-[#93C5FD] bg-white text-[#2563EB]"
                : "bg-[#F1F5F9] text-[#64748B]",
            )}>
            {getSurveyStatusLabel(status)}
          </span>
          <span className={cn("text-sm text-[#64748B]")}>{formatSurveyPeriod(survey)}</span>
        </div>

        <h1 className={cn("mt-4 text-2xl font-bold text-[#0F172A]", "mobile:text-xl")}>
          {survey.title}
        </h1>

        {survey.description && (
          <p
            className={cn(
              "mt-6 border-t border-[#F1F5F9] pt-6 text-[15px] leading-relaxed text-[#334155]",
            )}>
            {survey.description}
          </p>
        )}

        <div className={cn("mt-8")}>
          {ongoing && formUrl ? (
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#427DFF] px-6 text-base font-semibold text-white hover:opacity-90",
              )}>
              구글폼으로 설문 참여
              <ExternalLink className={cn("h-4 w-4")} />
            </a>
          ) : ongoing && !formUrl ? (
            <div
              className={cn(
                "rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-6 text-center text-sm text-[#94A3B8]",
              )}>
              구글폼 링크가 등록되지 않았습니다.
            </div>
          ) : (
            <div
              className={cn(
                "rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-6 text-center text-sm text-[#94A3B8]",
              )}>
              종료된 설문입니다.
            </div>
          )}
        </div>
      </article>
    </PortalContentFrame>
  );
}
