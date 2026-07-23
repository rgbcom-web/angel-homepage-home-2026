"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { submitSurveyResponseAction } from "./surveys-api";

const initialState = { success: false, message: "" };
const fieldClass = cn(
  "w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm outline-none",
  "placeholder:text-[#94A3B8] focus:border-[#2563EB]",
);

export function SurveyResponseForm({ survey, existingResponse = null }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(async (prev, formData) => {
    const result = await submitSurveyResponseAction(prev, formData);
    if (result.success) {
      router.refresh();
    }
    return result;
  }, initialState);

  if (!survey?.questions?.length) {
    return (
      <div
        className={cn(
          "mt-8 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-5 py-8 text-center text-sm text-[#64748B]",
        )}>
        등록된 설문 문항이 없습니다.
      </div>
    );
  }

  if (existingResponse) {
    return (
      <div className={cn("mt-8 space-y-4")}>
        <div
          className={cn(
            "rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm text-[#166534]",
          )}>
          이미 응답을 제출하셨습니다. ({new Date(existingResponse.created_at).toLocaleString("ko-KR")})
        </div>
        <AnswerSummary survey={survey} answers={existingResponse.answers || {}} />
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("mt-8 space-y-5")}>
      <input type="hidden" name="surveyId" value={survey.id} />

      {survey.questions.map((question, index) => (
        <div
          key={question.id}
          className={cn("rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4")}>
          <p className={cn("mb-3 text-sm font-semibold text-[#0F172A]")}>
            {index + 1}. {question.label}
            {question.required && <span className={cn("text-[#DC2626]")}> *</span>}
          </p>
          <QuestionField question={question} />
        </div>
      ))}

      {state?.message && (
        <p
          className={cn(
            "rounded-xl px-4 py-3 text-sm",
            state.success ? "bg-[#EFF6FF] text-[#1D4ED8]" : "bg-[#FEF2F2] text-[#DC2626]",
          )}>
          {state.message}
        </p>
      )}

      <div className={cn("flex justify-end")}>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60",
          )}>
          {pending ? "제출 중..." : "응답 제출"}
        </button>
      </div>
    </form>
  );
}

function QuestionField({ question }) {
  const name = `q_${question.id}`;

  if (question.type === "textarea") {
    return (
      <textarea
        name={name}
        rows={4}
        required={question.required}
        placeholder="의견을 입력해 주세요"
        className={fieldClass}
      />
    );
  }

  if (question.type === "single") {
    return (
      <div className={cn("space-y-2")}>
        {question.options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#334155]",
            )}>
            <input type="radio" name={name} value={opt} required={question.required} />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "multi") {
    return (
      <div className={cn("space-y-2")}>
        {question.options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#334155]",
            )}>
            <input type="checkbox" name={name} value={opt} />
            {opt}
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "rating") {
    return (
      <div className={cn("flex flex-wrap gap-2")}>
        {[1, 2, 3, 4, 5].map((score) => (
          <label
            key={score}
            className={cn(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-sm font-semibold text-[#334155] has-[:checked]:border-[#2563EB] has-[:checked]:bg-[#EFF6FF] has-[:checked]:text-[#2563EB]",
            )}>
            <input
              type="radio"
              name={name}
              value={String(score)}
              required={question.required}
              className={cn("sr-only")}
            />
            {score}
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      name={name}
      required={question.required}
      placeholder="답변을 입력해 주세요"
      className={cn(fieldClass, "h-11")}
    />
  );
}

function AnswerSummary({ survey, answers }) {
  return (
    <ul className={cn("space-y-3")}>
      {survey.questions.map((question, index) => {
        const raw = answers[question.id];
        const display = Array.isArray(raw) ? raw.join(", ") : String(raw || "-");
        return (
          <li key={question.id} className={cn("rounded-xl border border-[#E2E8F0] bg-white px-4 py-3")}>
            <p className={cn("text-sm font-semibold text-[#0F172A]")}>
              {index + 1}. {question.label}
            </p>
            <p className={cn("mt-1.5 text-sm text-[#475569]")}>{display || "-"}</p>
          </li>
        );
      })}
    </ul>
  );
}
