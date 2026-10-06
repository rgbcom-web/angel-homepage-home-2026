"use client";

import { Loader } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

export function FormSubmittingOverlay({
  message = "지원서를 접수 중입니다.",
  hint = "파일 용량에 따라 시간이 걸릴 수 있습니다. 창을 닫지 마세요.",
}) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  if (!isSubmitting) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm",
      )}
      role="alert"
      aria-live="assertive"
      aria-busy="true">
      <div
        className={cn(
          "flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white px-8 py-10 text-center shadow-lg",
        )}>
        <Loader className={cn("h-8 w-8 animate-spin text-dd-blue")} />
        <div className={cn("space-y-2")}>
          <p className={cn("text-lg font-semibold text-black")}>{message}</p>
          <p className={cn("text-sm text-dd-gray")}>{hint}</p>
        </div>
      </div>
    </div>
  );
}
