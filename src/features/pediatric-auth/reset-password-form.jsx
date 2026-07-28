"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { resetPasswordAction } from "./password-reset-actions";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

const initialState = { success: false, message: "" };

export function ResetPasswordForm({ token, tokenValid }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  if (!tokenValid) {
    return (
      <div className={cn("w-full max-w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm")}>
        <h1 className={cn("text-2xl font-bold text-[#0F172A]")}>링크가 유효하지 않습니다</h1>
        <p className={cn("mt-3 text-sm leading-relaxed text-[#64748B]")}>
          재설정 링크가 만료되었거나 이미 사용되었습니다. 비밀번호 찾기를 다시 요청해 주세요.
        </p>
        <Link
          href="/pediatric/forgot-password"
          className={cn(
            "mt-8 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]",
          )}>
          비밀번호 찾기
        </Link>
      </div>
    );
  }

  if (state?.success) {
    return (
      <div className={cn("w-full max-w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm")}>
        <h1 className={cn("text-2xl font-bold text-[#0F172A]")}>비밀번호 변경 완료</h1>
        <p className={cn("mt-3 text-sm leading-relaxed text-[#64748B]")}>{state.message}</p>
        <Link
          href="/pediatric/login"
          className={cn(
            "mt-8 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white hover:bg-[#1D4ED8]",
          )}>
          로그인하기
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-[420px] rounded-2xl border border-[#E2E8F0] bg-white p-8 shadow-sm")}>
      <div className={cn("mb-8 text-center")}>
        <p className={cn("text-sm font-semibold text-[#2563EB]")}>{PEDIATRIC_SITE_NAME}</p>
        <h1 className={cn("mt-2 text-2xl font-bold text-[#0F172A]")}>새 비밀번호 설정</h1>
        <p className={cn("mt-2 text-sm text-[#64748B]")}>
          새 비밀번호를 입력해 주세요.
        </p>
      </div>

      <form action={formAction} className={cn("space-y-4")}>
        <input type="hidden" name="token" value={token} />

        <div>
          <label htmlFor="password" className={cn("mb-1.5 block text-sm font-medium text-[#334155]")}>
            새 비밀번호
          </label>
          <div className={cn("relative")}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              className={cn(
                "h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pr-11 text-sm outline-none focus:border-[#2563EB] focus:bg-white",
              )}
              placeholder="새 비밀번호"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]")}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="passwordConfirm"
            className={cn("mb-1.5 block text-sm font-medium text-[#334155]")}>
            새 비밀번호 확인
          </label>
          <div className={cn("relative")}>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type={showPasswordConfirm ? "text" : "password"}
              required
              autoComplete="new-password"
              className={cn(
                "h-11 w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 pr-11 text-sm outline-none focus:border-[#2563EB] focus:bg-white",
              )}
              placeholder="새 비밀번호 확인"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm((v) => !v)}
              className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]")}
              aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}>
              {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
          {pending ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </div>
  );
}
