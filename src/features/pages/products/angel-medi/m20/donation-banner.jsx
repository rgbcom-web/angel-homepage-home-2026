"use client";

import { cn } from "@/shared/lib/utils";
import { Container, Br } from "@/features/layout";
import { ArrowRight } from "@/shared/svgs";
import {
  DonationFormDialog,
  DonationFormDialogContent,
} from "@/features/form/donation/donation-form-dialog";
import { DonationForm } from "@/features/form/donation/donation-form";

export function DonationBanner() {
  return (
    <DonationFormDialog
      dialogTrigger={
        <button
          type="button"
          className={cn(
            "wrapper-no-padding-bottom",
            "relative flex min-h-[237px] w-full items-center overflow-hidden bg-dd-blue text-left",
          )}>
          <Container
            className={cn(
              "relative z-10 flex items-center justify-between text-white",
              "tablet:flex-col tablet:gap-6 tablet:py-14 tablet:text-center",
            )}>
            <span
              className={cn(
                "text-4xl/[1.3] text-white/80",
                "tablet:text-3xl/[1.3]",
                "mobile:whitespace-nowrap mobile:text-2xl",
              )}>
              <small className={cn("text-2xl", "tablet:text-xl/[1.3]", "mobile:text-base")}>
                Brighten the World with Angel Robotics
              </small>{" "}
              <Br />
              <b className={cn("text-white")}>
                웨어러블 로봇이 꼭 필요한 곳에 <Br mobile />
                도움을 주세요.
              </b>
            </span>
            <span
              className={cn(
                "flex items-center gap-[1em] px-[1em] text-[28px] font-bold",
                "tablet:rounded-full tablet:bg-white/15 tablet:py-[0.3em] tablet:text-xl",
                "mobile:text-lg",
              )}>
              기부 문의하기 <ArrowRight />
            </span>
          </Container>
        </button>
      }
      dialogContent={
        <DonationFormDialogContent>
          <DonationForm />
        </DonationFormDialogContent>
      }
    />
  );
}
