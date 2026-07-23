"use client";

import { useState, createContext, use } from "react";
import { cn } from "@/shared/lib/utils";
import { Br } from "@/features/layout";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/ui/dialog";
import { RecruitApplyForm } from "./apply-form";

const ApplyDialogContext = createContext();

export const useApplyDialog = () => {
  return use(ApplyDialogContext);
};

export function ApplyDialog({ dialogTrigger, item }) {
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);

  if (!item) {
    return null;
  }

  return (
    <ApplyDialogContext value={{ item, isApplyDialogOpen, setIsApplyDialogOpen }}>
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        <ApplyDialogContent />
      </Dialog>
    </ApplyDialogContext>
  );
}

function ApplyDialogContent() {
  const { item } = useApplyDialog();

  return (
    <DialogContent
      className={{ container: cn("max-w-[1000px]"), content: cn("space-y-8", "tablet:space-y-6") }}>
      <DialogHeader className={cn("space-y-4", "tablet:space-y-2")}>
        <DialogTitle>
          <span className={cn("block text-3xl/[1.3]", "tablet:text-2xl/[1.3]")}>지원하기</span>
        </DialogTitle>
      </DialogHeader>
      <RecruitApplyForm noticeData={item} />
    </DialogContent>
  );
}
