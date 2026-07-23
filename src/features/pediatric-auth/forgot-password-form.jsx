"use client";

import { useActionState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { requestPasswordResetAction } from "./password-reset-actions";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

const initialState = { success: false, message: "" };

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordResetAction,
    initialState,
  );

  if (state?.success) {
    return (
      <div className={cn("w-full max-w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm")}>
        <p className={cn("text-sm font-semibold text-[#2563EB]")}>{PEDIATRIC_SITE_NAME}</p>
        <h1 className={cn("mt-2 text-2xl font-bold text-[#0F172A]")}>메일 발송 안내</h1>
        <p className={cn("mt-3 text-sm leading-relaxed text-[#64748B]")}>{state.message}</p>
        <Link
          href="/pediatric/login"
          className={cn(
            "mt-8 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]",
          )}>
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm")}>
      <div className={cn("mb-8 text-center")}>
        <p className={cn("text-sm font-semibold text-[#2563EB]")}>{PEDIATRIC_SITE_NAME}</p>
        <h1 className={cn("mt-2 text-2xl font-bold text-[#0F172A]")}>비밀번호 찾기</h1>
        <p className={cn("mt-2 text-sm text-[#64748B]")}>
          가입 시 등록한 아이디와 이메일을 입력해 주세요.
        </p>
      </div>

      <form action={formAction} className={cn("space-y-4")}>
        <div>
          <label htmlFor="loginId" className={cn("mb-1.5 block text-sm font-medium text-[#334155]")}>
            아이디
          </label>
          <input
            id="loginId"
            name="loginId"
            required
            autoComplete="username"
            className={cn(
              "h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:bg-white",
            )}
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="email" className={cn("mb-1.5 block text-sm font-medium text-[#334155]")}>
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(
              "h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 text-sm outline-none focus:border-[#2563EB] focus:bg-white",
            )}
            placeholder="가입 시 등록한 이메일"
          />
        </div>

        {state?.message && !state.success && (
          <p className={cn("rounded-lg bg-[#FEF2F2] px-3 py-2 text-sm text-[#DC2626]")}>
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className={cn(
            "flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60",
          )}>
          {pending ? "처리 중..." : "재설정 메일 받기"}
        </button>
      </form>

      <p className={cn("mt-6 text-center text-sm text-[#64748B]")}>
        <Link href="/pediatric/login" className={cn("font-semibold text-[#2563EB] hover:underline")}>
          로그인으로 돌아가기
        </Link>
      </p>
    </div>
  );
}
