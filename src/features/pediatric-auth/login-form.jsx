"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { loginAction } from "./actions";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

const initialState = { success: false, message: "" };

const ICON = {
  user: "/images/pediatric/login/icon-user.svg",
  lock: "/images/pediatric/login/icon-lock.svg",
  eye: "/images/pediatric/login/icon-eye.svg",
  eyeOff: "/images/pediatric/login/icon-eye-off.svg",
  arrowRight: "/images/pediatric/login/icon-arrow-right.svg",
};

function Icon({ src, size = 20, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className={cn("flex w-full flex-col items-center font-primary")}>
      <div
        className={cn(
          "flex w-full max-w-[500px] flex-col items-center gap-9 rounded-[24px] bg-white px-12 py-14",
          "shadow-[0px_12px_48px_rgba(38,46,64,0.04)]",
          "mobile:px-6 mobile:py-10",
        )}>
        <div className={cn("w-full max-w-[354px] text-center")}>
          <p className={cn("text-[18px] font-bold leading-normal text-[#427DFF]")}>
            {PEDIATRIC_SITE_NAME}
          </p>
          <h1 className={cn("mt-3 text-2xl font-bold leading-normal text-[#0F172A]")}>
            로그인
          </h1>
        </div>

        <form action={formAction} className={cn("flex w-full max-w-[354px] flex-col gap-9")}>
          <div className={cn("flex flex-col gap-5")}>
            <div className={cn("flex flex-col gap-2")}>
              <label
                htmlFor="loginId"
                className={cn("text-sm font-semibold leading-normal text-[#475569]")}>
                아이디
              </label>
              <div
                className={cn(
                  "flex h-[52px] items-center gap-3 rounded-lg border border-solid border-[#E2E8F0] bg-white px-4",
                  "focus-within:border-[#427DFF]",
                )}>
                <Icon src={ICON.user} />
                <input
                  id="loginId"
                  name="loginId"
                  required
                  autoComplete="username"
                  placeholder="아이디 입력"
                  className={cn(
                    "h-full w-full bg-transparent text-[15px] font-normal leading-normal text-[#0F172A] outline-none placeholder:text-[#94A3B8]",
                  )}
                />
              </div>
            </div>

            <div className={cn("flex flex-col gap-2")}>
              <label
                htmlFor="password"
                className={cn("text-sm font-semibold leading-normal text-[#475569]")}>
                비밀번호
              </label>
              <div
                className={cn(
                  "flex h-[52px] items-center gap-3 rounded-lg border border-solid border-[#E2E8F0] bg-white px-4",
                  "focus-within:border-[#427DFF]",
                )}>
                <span className={cn("relative flex size-5 shrink-0 items-center justify-center overflow-hidden")}>
                  <Icon src={ICON.lock} size={16} />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="비밀번호 입력"
                  className={cn(
                    "h-full w-full bg-transparent text-[15px] font-normal leading-normal text-[#0F172A] outline-none placeholder:text-[#94A3B8]",
                  )}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  onClick={() => setShowPassword((v) => !v)}
                  className={cn("shrink-0")}>
                  <Icon src={showPassword ? ICON.eyeOff : ICON.eye} />
                </button>
              </div>
            </div>

            <label className={cn("inline-flex w-fit cursor-pointer items-center gap-2")}>
              <input
                type="checkbox"
                name="remember"
                value="1"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className={cn("peer sr-only")}
              />
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded border border-solid border-[#E2E8F0] bg-white",
                  "peer-checked:border-[#427DFF] peer-checked:bg-[#427DFF]",
                )}
                aria-hidden>
                {remember && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path
                      d="M2.5 6.2L4.8 8.5L9.5 3.5"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className={cn("text-[13px] font-medium leading-normal text-[#475569]")}>
                로그인 상태 유지
              </span>
            </label>
          </div>

          {state?.message && !state.success && (
            <p className={cn("-mt-4 rounded-lg bg-[#FEF2F2] px-3 py-2 text-sm text-[#DC2626]")}>
              {state.message}
            </p>
          )}

          <div className={cn("flex flex-col gap-[14px]")}>
            <button
              type="submit"
              disabled={pending}
              className={cn(
                "flex h-[54px] w-full items-center justify-center rounded-full bg-[#427DFF] text-[18px] font-semibold text-white",
                "transition-opacity hover:opacity-90 disabled:opacity-60",
              )}>
              {pending ? "로그인 중..." : "로그인"}
            </button>

            <Link
              href="/pediatric/signup"
              className={cn(
                "flex h-[54px] w-full items-center justify-center rounded-full border border-solid border-[#427DFF] bg-white text-[18px] font-semibold text-[#427DFF]",
                "transition-colors hover:bg-[#F4F7FC]",
              )}>
              회원가입
            </Link>

            <div className={cn("flex justify-center")}>
              <Link
                href="/pediatric/forgot-password"
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-medium text-[#427DFF] hover:underline",
                )}>
                아이디 찾기 · 비밀번호 변경
                <Icon src={ICON.arrowRight} size={16} />
              </Link>
            </div>
          </div>
        </form>
      </div>

      <div className={cn("mt-[30px] flex flex-col items-center gap-1 text-center text-[13px]")}>
        <p className={cn("font-normal text-[#475569]")}>로그인에 문제가 있으신가요?</p>
        <a
          href="mailto:contact@angel-robotics.com?subject=%5B%EC%86%8C%EC%95%84%20%EC%9E%90%EB%AC%B8%EB%8B%A8%5D%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%EB%AC%B8%EC%9D%98"
          className={cn("font-semibold text-[#427DFF] hover:underline")}>
          관리자에게 문의하기
        </a>
      </div>
    </div>
  );
}
