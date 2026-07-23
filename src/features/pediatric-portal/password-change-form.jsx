"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { changePasswordAction } from "@/features/pediatric-auth/actions";

const initialState = { success: false, message: "" };

export function PasswordChangeForm() {
  const router = useRouter();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [state, formAction, pending] = useActionState(async (prev, formData) => {
    const result = await changePasswordAction(prev, formData);
    if (result.success) {
      setTimeout(() => router.push("/pediatric/my-info"), 800);
    }
    return result;
  }, initialState);

  return (
    <div className={cn("mx-auto max-w-[560px] px-8 py-8", "tablet:px-6", "mobile:px-4")}>
      <header className={cn("mb-6")}>
        <h1 className={cn("text-2xl font-bold text-[#0F172A]", "mobile:text-xl")}>비밀번호 변경</h1>
        <p className={cn("mt-1 text-sm text-[#64748B]")}>
          현재 비밀번호 확인 후 새 비밀번호로 변경할 수 있습니다.
        </p>
      </header>

      <form
        action={formAction}
        className={cn("space-y-4 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm")}>
        <Field label="현재 비밀번호" required>
          <PasswordInput
            name="currentPassword"
            show={showCurrent}
            onToggle={() => setShowCurrent((v) => !v)}
            placeholder="현재 비밀번호"
          />
        </Field>
        <Field label="새 비밀번호" required>
          <PasswordInput
            name="newPassword"
            show={showNew}
            onToggle={() => setShowNew((v) => !v)}
            placeholder="영문, 숫자, 특수문자 조합 8~20자"
          />
        </Field>
        <Field label="새 비밀번호 확인" required>
          <PasswordInput
            name="newPasswordConfirm"
            show={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
            placeholder="새 비밀번호를 다시 입력해주세요"
          />
        </Field>

        {state?.message && (
          <p
            className={cn(
              "rounded-xl px-4 py-3 text-sm",
              state.success
                ? "bg-[#EFF6FF] text-[#1D4ED8]"
                : "bg-[#FEF2F2] text-[#DC2626]",
            )}>
            {state.message}
          </p>
        )}

        <div className={cn("flex justify-end gap-2 pt-2")}>
          <Link
            href="/pediatric/my-info"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-6 text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC]",
            )}>
            취소
          </Link>
          <button
            type="submit"
            disabled={pending}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60",
            )}>
            {pending ? "변경 중..." : "변경하기"}
          </button>
        </div>
      </form>

      <p className={cn("mt-6 flex items-center justify-center gap-2 text-sm text-[#94A3B8]")}>
        <Lock className={cn("h-4 w-4")} />
        보안 정책에 따라 자료의 다운로드, 복사, 화면 캡쳐가 제한되어 있습니다.
      </p>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className={cn("mb-1.5 block text-sm font-medium text-[#334155]")}>
        {label}
        {required && <span className={cn("text-[#DC2626]")}> *</span>}
      </label>
      {children}
    </div>
  );
}

function PasswordInput({ name, show, onToggle, placeholder }) {
  return (
    <div className={cn("relative")}>
      <input
        name={name}
        type={show ? "text" : "password"}
        required
        placeholder={placeholder}
        className={cn(
          "h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 pr-11 text-sm outline-none",
          "placeholder:text-[#94A3B8] focus:border-[#2563EB]",
        )}
      />
      <button
        type="button"
        onClick={onToggle}
        className={cn("absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]")}
        aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}>
        {show ? <EyeOff className={cn("h-4 w-4")} /> : <Eye className={cn("h-4 w-4")} />}
      </button>
    </div>
  );
}
