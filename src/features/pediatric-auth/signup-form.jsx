"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { signupAction, checkLoginIdAction } from "./actions";
import { PEDIATRIC_SITE_NAME } from "@/features/pediatric-portal/site";

const initialState = { success: false, message: "" };

const ICON = {
  eye: "/images/pediatric/login/icon-eye.svg",
  eyeOff: "/images/pediatric/login/icon-eye-off.svg",
};

function Icon({ src, size = 20 }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0 object-contain")}
      style={{ width: size, height: size }}
    />
  );
}

const inputClass = cn(
  "h-[52px] w-full rounded-lg border border-solid border-[#E2E8F0] bg-white px-4 text-[15px] text-[#0F172A] outline-none",
  "placeholder:text-[#94A3B8] focus:border-[#427DFF]",
);

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  if (state?.success) {
    return (
      <div className={cn("flex w-full flex-col items-center font-primary")}>
        <div
          className={cn(
            "w-full max-w-[610px] rounded-[24px] bg-white px-[72px] py-14 shadow-[0px_12px_48px_rgba(38,46,64,0.04)]",
            "mobile:px-6 mobile:py-10",
          )}>
          <h1 className={cn("text-2xl font-bold text-[#0F172A]")}>가입 신청 완료</h1>
          <p className={cn("mt-3 text-sm leading-relaxed text-[#475569]")}>{state.message}</p>
          <Link
            href="/pediatric/login"
            className={cn(
              "mt-8 flex h-[54px] w-full items-center justify-center rounded-full bg-[#427DFF] text-[18px] font-semibold text-white hover:opacity-90",
            )}>
            로그인 화면으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full flex-col items-center font-primary")}>
      <div
        className={cn(
          "w-full max-w-[610px] rounded-[24px] bg-white px-[72px] py-14 shadow-[0px_12px_48px_rgba(38,46,64,0.04)]",
          "mobile:px-6 mobile:py-10",
        )}>
        <div className={cn("mb-9 text-center")}>
          <p className={cn("text-[18px] font-bold leading-normal text-[#427DFF]")}>
            {PEDIATRIC_SITE_NAME}
          </p>
          <h1 className={cn("mt-3 text-2xl font-bold leading-normal text-[#0F172A]")}>
            회원가입
          </h1>
        </div>

        <form action={formAction} className={cn("flex flex-col gap-14")}>
          <SignupFormFields />

          {state?.message && !state.success && (
            <p className={cn("-mt-6 rounded-lg bg-[#FEF2F2] px-3 py-2 text-sm text-[#DC2626]")}>
              {state.message}
            </p>
          )}

          <div className={cn("flex flex-col gap-3")}>
            <button
              type="submit"
              disabled={pending}
              className={cn(
                "flex h-[54px] w-full items-center justify-center rounded-full bg-[#427DFF] text-[18px] font-semibold text-white",
                "transition-opacity hover:opacity-90 disabled:opacity-60",
              )}>
              {pending ? "신청 중..." : "가입하기"}
            </button>

            <p className={cn("text-center text-sm text-[#475569]")}>
              이미 계정이 있으신가요?{" "}
              <Link
                href="/pediatric/login"
                className={cn("font-semibold text-[#427DFF] hover:underline")}>
                로그인하러 가기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function SignupFormFields() {
  const [loginId, setLoginId] = useState("");
  const [loginIdChecked, setLoginIdChecked] = useState(false);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [idCheckOk, setIdCheckOk] = useState(false);
  const [isChecking, startCheck] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleIdCheck = () => {
    startCheck(async () => {
      const result = await checkLoginIdAction(loginId);
      setIdCheckMessage(result.message);
      setIdCheckOk(result.available);
      setLoginIdChecked(result.available);
    });
  };

  const handleLoginIdChange = (value) => {
    setLoginId(value);
    setLoginIdChecked(false);
    setIdCheckOk(false);
    setIdCheckMessage("");
  };

  return (
    <>
      <input type="hidden" name="loginIdChecked" value={loginIdChecked ? "true" : "false"} />

      <Section title="계정 정보">
        <Field label="아이디" required>
          <div className={cn("flex gap-2")}>
            <input
              name="loginId"
              value={loginId}
              onChange={(e) => handleLoginIdChange(e.target.value.toLowerCase())}
              required
              placeholder="아이디 또는 이메일 입력"
              className={cn(inputClass, "min-w-0 flex-1")}
            />
            <button
              type="button"
              onClick={handleIdCheck}
              disabled={isChecking || !loginId}
              className={cn(
                "h-[52px] shrink-0 rounded-lg border border-solid border-[#427DFF] bg-white px-4 text-sm font-semibold text-[#427DFF]",
                "hover:bg-[#F0F5FF] disabled:opacity-50",
              )}>
              {isChecking ? "확인 중..." : "중복 확인"}
            </button>
          </div>
          {idCheckMessage && (
            <p className={cn("mt-1.5 text-xs", idCheckOk ? "text-[#427DFF]" : "text-[#DC2626]")}>
              {idCheckMessage}
            </p>
          )}
        </Field>

        <Field label="비밀번호" required>
          <PasswordInput
            name="password"
            show={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            placeholder="영문, 숫자, 특수문자 조합 8~16자"
          />
        </Field>

        <Field label="비밀번호 확인" required>
          <PasswordInput
            name="passwordConfirm"
            show={showPasswordConfirm}
            onToggle={() => setShowPasswordConfirm((v) => !v)}
            placeholder="비밀번호를 한번 더 입력해주세요"
          />
        </Field>
      </Section>

      <Section title="기본 정보">
        <Field label="이름" required>
          <input name="name" required placeholder="이름을 입력해주세요" className={inputClass} />
        </Field>

        <Field label="이메일" required>
          <input
            name="email"
            type="email"
            required
            placeholder="이메일 주소를 입력해주세요"
            className={inputClass}
          />
        </Field>

        <Field label="연락처" required>
          <input
            name="phone"
            required
            inputMode="numeric"
            placeholder="'-' 제외하고 숫자만 입력"
            className={inputClass}
          />
        </Field>

        <Field label="출생연도" required>
          <input
            name="birthYear"
            required
            inputMode="numeric"
            maxLength={4}
            placeholder="출생연도 4자리를 입력해주세요"
            className={inputClass}
          />
        </Field>

        <Field label="소속" required>
          <input
            name="affiliation"
            required
            placeholder="병원 또는 소속 기관명 입력"
            className={inputClass}
          />
        </Field>

        <Field label="과" required>
          <input
            name="department"
            required
            placeholder="진료과 입력 (예: 소아청소년과)"
            className={inputClass}
          />
        </Field>

        <Field label="직급" required>
          <input name="title" required placeholder="직급을 입력해주세요" className={inputClass} />
        </Field>

        <Field label="주소">
          <input
            name="address"
            placeholder="주소를 입력해주세요 (선택사항)"
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="이용약관 동의">
        <div className={cn("flex items-center justify-between gap-3")}>
          <label className={cn("inline-flex w-fit cursor-pointer items-center gap-2")}>
            <input
              type="checkbox"
              name="privacyAgreed"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              required
              className={cn("peer sr-only")}
            />
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded border border-solid border-[#E2E8F0] bg-white",
                "peer-checked:border-[#427DFF] peer-checked:bg-[#427DFF]",
              )}
              aria-hidden>
              {privacyAgreed && (
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
            <span className={cn("text-sm font-medium text-[#475569]")}>
              개인정보 수집 및 이용약관에 동의합니다.
            </span>
          </label>
          <button
            type="button"
            onClick={() => setShowPrivacy((v) => !v)}
            className={cn("shrink-0 text-sm font-medium text-[#427DFF] hover:underline")}>
            보기
          </button>
        </div>

        {showPrivacy && (
          <div
            className={cn(
              "mt-3 max-h-40 overflow-y-auto rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs leading-relaxed text-[#64748B]",
            )}>
            <p>
              ㈜엔젤로보틱스(이하 &quot;회사&quot;)는 {PEDIATRIC_SITE_NAME} 서비스 제공을 위해 아래와
              같이 개인정보를 수집·이용합니다.
            </p>
            <ul className={cn("mt-2 list-disc space-y-1 pl-4")}>
              <li>
                수집 항목: 이름, 출생연도, 연락처, 이메일, 소속, 과, 직급, 아이디, 비밀번호,
                주소(선택)
              </li>
              <li>수집 목적: 회원 관리, 자문단 포털 서비스 제공</li>
              <li>보유 기간: 회원 탈퇴 시까지</li>
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section className={cn("flex flex-col gap-5")}>
      <h2 className={cn("text-base font-bold text-[#0F172A]")}>{title}</h2>
      <div className={cn("flex flex-col gap-5")}>{children}</div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <div className={cn("flex flex-col gap-2")}>
      <label className={cn("text-sm font-semibold leading-normal text-[#475569]")}>
        {label}
        {required && <span className={cn("ml-1 text-[#DC2626]")}>*</span>}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({ name, show, onToggle, placeholder }) {
  return (
    <div
      className={cn(
        "flex h-[52px] items-center gap-3 rounded-lg border border-solid border-[#E2E8F0] bg-white px-4",
        "focus-within:border-[#427DFF]",
      )}>
      <input
        name={name}
        type={show ? "text" : "password"}
        required
        placeholder={placeholder}
        className={cn(
          "h-full w-full bg-transparent text-[15px] text-[#0F172A] outline-none placeholder:text-[#94A3B8]",
        )}
      />
      <button
        type="button"
        onClick={onToggle}
        className={cn("shrink-0")}
        aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}>
        <Icon src={show ? ICON.eyeOff : ICON.eye} />
      </button>
    </div>
  );
}
