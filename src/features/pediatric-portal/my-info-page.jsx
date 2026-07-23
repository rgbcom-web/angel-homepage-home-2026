"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRound } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { updateMyInfoAction } from "@/features/pediatric-auth/actions";
import { usePediatricPortal } from "./portal-context";
import { formatMemberDisplayName } from "./mock-data";
import { useDaumPostcode } from "./use-daum-postcode";
import { PortalPage, PortalPageHeader } from "./portal-ui";

const initialState = { success: false, message: "" };

function formatPhoneDisplay(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

function resolveBirthYear(member) {
  if (member.birthYear) return String(member.birthYear);
  if (member.birthDate) return String(member.birthDate).slice(0, 4);
  return "";
}

function getInitialForm(member) {
  return {
    birthYear: resolveBirthYear(member),
    phone: formatPhoneDisplay(member.phone),
    email: member.email || "",
    affiliation: member.affiliation || "",
    department: member.department || "",
    title: member.title || "",
    address: member.address || "",
    addressDetail: member.addressDetail || "",
    zipCode: member.zipCode || "",
  };
}

export function MyInfoPage() {
  const router = useRouter();
  const { member, logout } = usePediatricPortal();
  const { openPostcode } = useDaumPostcode();
  const snapshot = useMemo(() => getInitialForm(member), [member]);
  const [form, setForm] = useState(snapshot);

  useEffect(() => {
    setForm(snapshot);
  }, [snapshot]);

  const [state, formAction, pending] = useActionState(async (prev, formData) => {
    const result = await updateMyInfoAction(prev, formData);
    if (result.success) {
      router.refresh();
    }
    return result;
  }, initialState);

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setForm(snapshot);
  };

  const handleFindZip = () => {
    openPostcode(({ zipCode, address }) => {
      setForm((prev) => ({ ...prev, zipCode, address }));
    });
  };

  const displayName = formatMemberDisplayName(member);
  const affiliationLine = [member.affiliation, member.department]
    .filter(Boolean)
    .join(" · ");

  return (
    <PortalPage>
      <PortalPageHeader
        title="내 정보"
        description="내 프로필 정보를 확인하고 수정할 수 있습니다."
      />

      <div
        className={cn(
          "flex items-start gap-6",
          "tablet:flex-col tablet:items-stretch",
        )}>
        <aside
          className={cn(
            "flex w-[420px] shrink-0 flex-col items-center gap-4 rounded-2xl border border-[#E2E8F0] bg-white px-8 pb-10 pt-12 shadow-[0px_12px_24px_rgba(0,0,0,0.04)]",
            "tablet:w-full tablet:px-6 tablet:pb-8 tablet:pt-10",
            "mobile:px-4 mobile:pb-6 mobile:pt-8",
          )}>
          <div className="flex size-24 items-center justify-center rounded-full bg-[#F0F6FF] text-[#427DFF]">
            <UserRound className="h-11 w-11" strokeWidth={1.5} />
          </div>
          <p className="text-[22px] font-bold text-[#1F293B]">{displayName}</p>
          <p className="text-sm text-[#80858F]">{affiliationLine}</p>

          <div className="my-2 h-px w-full bg-[#E3E8F0]" />

          <div className="mt-auto flex w-full flex-col gap-3">
            <Link
              href="/pediatric/my-info/password"
              className="flex w-full items-center justify-center rounded-lg border border-[#E3E8F0] bg-white py-3 text-sm font-medium text-[#1F293B] hover:bg-[#F8FAFC]">
              비밀번호 변경
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center rounded-lg bg-[#A6A6A6] py-3 text-sm font-medium text-white hover:opacity-90">
              로그아웃
            </button>
          </div>
        </aside>

        <form
          action={formAction}
          className={cn(
            "min-w-0 flex-1 rounded-2xl border border-[#E2E8F0] bg-white px-10 py-8 shadow-[0px_12px_24px_rgba(0,0,0,0.04)]",
            "tablet:w-full tablet:px-6 tablet:py-7",
            "mobile:px-4 mobile:py-6",
          )}>
          <input type="hidden" name="birthDate" value={form.birthYear ? `${form.birthYear}-01-01` : ""} />

          <section className="space-y-6">
            <h2 className="text-lg font-semibold text-[#1F293B]">기본 정보</h2>

            <div className={cn("grid grid-cols-2 gap-4", "mobile:grid-cols-1")}>
              <Field label="이름">
                <input
                  value={member.name || ""}
                  readOnly
                  disabled
                  className={cn(inputClass, disabledClass)}
                />
              </Field>
              <Field label="출생연도">
                <input
                  name="birthYear"
                  required
                  inputMode="numeric"
                  maxLength={4}
                  value={form.birthYear}
                  onChange={(e) => setField("birthYear", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="1985"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className={cn("grid grid-cols-2 gap-4", "mobile:grid-cols-1")}>
              <Field label="전화번호">
                <input
                  name="phone"
                  required
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="010-1234-5678"
                  className={inputClass}
                />
              </Field>
              <Field label="이메일">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className={cn("grid grid-cols-3 gap-4", "tablet:grid-cols-1")}>
              <Field label="소속">
                <input
                  name="affiliation"
                  required
                  value={form.affiliation}
                  onChange={(e) => setField("affiliation", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="과">
                <input
                  name="department"
                  required
                  value={form.department}
                  onChange={(e) => setField("department", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="직급">
                <input
                  name="title"
                  required
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className={cn("grid grid-cols-3 gap-4", "tablet:grid-cols-1")}>
              <Field label="아이디">
                <input
                  value={member.loginId || ""}
                  readOnly
                  disabled
                  className={cn(inputClass, disabledClass)}
                />
              </Field>
              <Field label="비밀번호">
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  tabIndex={-1}
                  className={cn(inputClass, "cursor-default")}
                />
              </Field>
              <Field label="비밀번호 확인">
                <input
                  type="password"
                  value="••••••••"
                  readOnly
                  tabIndex={-1}
                  className={cn(inputClass, "cursor-default")}
                />
              </Field>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-[#1F293B]">추가 정보</h2>

            <Field label="주소">
              <div className={cn("flex gap-2", "mobile:flex-col")}>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="주소를 입력해주세요"
                  className={cn(inputClass, "min-w-0 flex-1", "mobile:w-full mobile:flex-none")}
                />
                <button
                  type="button"
                  onClick={handleFindZip}
                  className={cn(
                    "inline-flex h-[46px] shrink-0 items-center justify-center rounded-lg border border-[#E3E8F0] bg-white px-4 text-sm font-medium text-[#1F293B] hover:bg-[#F8FAFC]",
                    "mobile:w-full",
                  )}>
                  우편번호 찾기
                </button>
              </div>
            </Field>

            <div className={cn("grid grid-cols-2 gap-4", "mobile:grid-cols-1")}>
              <Field label="상세주소">
                <input
                  name="addressDetail"
                  value={form.addressDetail}
                  onChange={(e) => setField("addressDetail", e.target.value)}
                  placeholder="상세 주소를 입력해주세요"
                  className={inputClass}
                />
              </Field>
              <Field label="우편번호">
                <input
                  name="zipCode"
                  value={form.zipCode}
                  onChange={(e) => setField("zipCode", e.target.value)}
                  placeholder="우편번호"
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {state?.message && (
            <p
              className={cn(
                "mt-6 rounded-lg px-4 py-3 text-sm",
                state.success
                  ? "bg-[#EFF6FF] text-[#1D4ED8]"
                  : "bg-[#FEF2F2] text-[#DC2626]",
              )}>
              {state.message}
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center rounded-lg border border-[#E3E8F0] bg-white px-6 py-3 text-[15px] font-semibold text-[#80858F] hover:bg-[#F8FAFC]">
              취소
            </button>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center rounded-lg bg-[#427DFF] px-6 py-3 text-[15px] font-semibold text-white hover:opacity-90 disabled:opacity-60">
              {pending ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </PortalPage>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[#80858F]">{label}</label>
      {children}
    </div>
  );
}

const inputClass = cn(
  "h-[46px] w-full rounded-lg border border-[#E3E8F0] bg-white px-4 text-[15px] text-[#1F293B] outline-none",
  "placeholder:text-[#94A3B8] focus:border-[#427DFF]",
);

const disabledClass = cn("cursor-not-allowed bg-[#F5F5F5] text-[#80858F]");
