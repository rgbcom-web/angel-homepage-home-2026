"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";

import { createContext, use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/ui/dialog";
import { Button } from "@/shared/shadcn/ui/button";

const FormResultDialogContext = createContext();

export function useFormResultDialog() {
  return use(FormResultDialogContext);
}

export function FormResultDialog({ children, onClose, tag, title, description }) {
  const [submitResult, setSubmitResult] = useState(null);

  return (
    <FormResultDialogContext value={{ submitResult, setSubmitResult }}>
      {children}
      <Dialog
        open={!!submitResult}
        onOpenChange={(open) => {
          if (!open) setSubmitResult(null);
        }}>
        <FormResultDialogContent
          onClose={onClose}
          tag={tag}
          title={title}
          description={description}
        />
      </Dialog>
    </FormResultDialogContext>
  );
}

export function FormResultDialogContent({
  onClose,
  tag = {
    success: "Request success",
    failed: "Request failed",
  },
  title = {
    success: "요청이 완료되었습니다.",
    failed: "요청에 실패했습니다.",
  },
  description = {
    success: "요청이 완료되었습니다.",
    failed: (
      <>
        요청 중 오류가 발생했습니다. <br />
        잠시 후 다시 시도해주세요.
      </>
    ),
  },
}) {
  const { langContent } = useLang();
  const { submitResult, setSubmitResult } = useFormResultDialog();
  const { success, message } = submitResult || {};

  const handleDialogClose = async (e) => {
    e.preventDefault();
    const result = submitResult;
    setSubmitResult(null);
    onClose && onClose(result);
  };

  return (
    <DialogContent
      className={{
        container: cn("z-[210] max-w-sm"),
        content: cn("space-y-10 !p-6 !pt-8"),
      }}
      overlayClassName={cn("z-[205]")}
      hideClose
      onPointerDownOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}>
      <DialogHeader className={cn("!gap-0 space-y-3 text-center tablet:space-y-2")}>
        <DialogTitle className={cn("text-xl")}>
          <span className={cn("mb-[0.5em] block text-sm text-dd-blue")}>
            {success ? tag.success : tag.failed}
          </span>
          {success ? title.success : title.failed}
        </DialogTitle>
        <DialogDescription className={cn("text-base text-black")}>
          {success ? description.success : message || description.failed}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className={cn("justify-center")}>
        <Button variant="gray-darker" onClick={handleDialogClose} className={cn("px-[2em]")}>
          {langContent({
            ko: "확인",
            en: "Confirm",
          })}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
