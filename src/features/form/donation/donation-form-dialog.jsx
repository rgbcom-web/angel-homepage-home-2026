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
  DialogDescription,
} from "@/shared/shadcn/ui/dialog";

const DonationFormDialogContext = createContext();

export const useDonationFormDialog = () => {
  return use(DonationFormDialogContext);
};

export function DonationFormDialog({ dialogTrigger, dialogContent }) {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  return (
    <DonationFormDialogContext value={{ isRequestDialogOpen, setIsRequestDialogOpen }}>
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        {dialogContent}
      </Dialog>
    </DonationFormDialogContext>
  );
}

export function DonationFormDialogContent({ children }) {
  return (
    <DialogContent
      className={{ container: cn("max-w-[720px]"), content: cn("space-y-8", "tablet:space-y-6") }}>
      <DialogHeader className={cn("space-y-4", "tablet:space-y-2")}>
        <DialogTitle>
          <span className={cn("block text-3xl/[1.3]", "tablet:text-2xl/[1.3]")}>기부 문의하기</span>
        </DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
