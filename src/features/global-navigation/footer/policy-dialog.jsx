"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/shadcn/ui/dialog";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";
import { PrivacyPolicy } from "@/features/policies/privacy-policy";
import { EmailPolicy } from "@/features/policies/email-policy";

export function PrivacyPolicyDialog({ dialogTrigger }) {
  const { langContent } = useLang();

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className={{ container: cn("max-w-[640px]") }}>
        <DialogHeader>
          <DialogTitle className={cn("text-2xl/[1.3]", "mobile:text-2xl/[1.3]")}>
            {langContent({
              ko: "개인정보처리방침",
              en: "Privacy Policy",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className={cn("border-b border-dd-gray-light/50 py-4")}>
          <ScrollArea
            className={{ root: cn("h-[60vh] rounded-none border-0"), scrollbar: cn("mr-0 py-0") }}>
            <PrivacyPolicy />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EmailPolicyDialog({ dialogTrigger }) {
  const { langContent } = useLang();

  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className={{ container: cn("max-w-[640px]") }}>
        <DialogHeader>
          <DialogTitle className={cn("text-2xl/[1.3]", "mobile:text-2xl/[1.3]")}>
            {langContent({
              ko: "이메일 무단수집 거부",
              en: "E-mail Policy",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className={cn("border-b border-dd-gray-light/50 py-4")}>
          <ScrollArea
            className={{ root: cn("h-[60vh] rounded-none border-0"), scrollbar: cn("mr-0 py-0") }}>
            <EmailPolicy />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
