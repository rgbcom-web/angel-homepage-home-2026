"use client";

import { useLang } from "@/shared/context/lang-provider";
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

const DownloadRequestDialogContext = createContext();

export const useDownloadRequestDialog = () => {
  return use(DownloadRequestDialogContext);
};

export function DownloadRequestDialog({ dialogTrigger, dialogContent, item = {} }) {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  return (
    <DownloadRequestDialogContext value={{ item, isRequestDialogOpen, setIsRequestDialogOpen }}>
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
        {dialogContent}
      </Dialog>
    </DownloadRequestDialogContext>
  );
}

export function DownloadRequestDialogContent({ children }) {
  const { isEng } = useLang();
  const { item } = useDownloadRequestDialog();
  const { title } = item;

  return (
    <DialogContent
      className={{ container: cn("max-w-[720px]"), content: cn("space-y-8", "tablet:space-y-6") }}>
      <DialogHeader className={cn("space-y-4", "tablet:space-y-2")}>
        <DialogTitle>
          <span
            className={cn("mb-[0.2em] block text-base font-bold text-dd-blue", "tablet:text-sm")}>
            Download
          </span>
          <span className={cn("block text-3xl/[1.3]", "tablet:text-2xl/[1.3]")}>{title}</span>
        </DialogTitle>
        {!isEng && (
          <DialogDescription>
            의료기기 제품 브로슈어는 <b>의료 전문가에게만 배포 가능</b>하며, 제품 매뉴얼은 구매처에
            한해 제공됩니다. <Br pc />
            요청하신 자료는 입력하신 이메일로 빠른 시일 내에 발송해 드리겠습니다.
          </DialogDescription>
        )}
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
