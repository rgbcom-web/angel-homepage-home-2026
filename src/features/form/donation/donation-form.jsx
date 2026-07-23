"use client";

import { useParams } from "next/navigation";
import { useDonationFormDialog } from "./donation-form-dialog";
import { cn } from "@/shared/lib/utils";
import { FormResultDialog, useFormResultDialog } from "@/features/form/ui/form-result-dialog";
import { DialogFooter } from "@/shared/shadcn/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setFieldErrors } from "@/shared/lib/validation.utils";
import { Form, FormField, FormControl, FormItem, FormSubmit } from "@/shared/shadcn/ui/form";
import { Input } from "@/shared/shadcn/ui/input";
import { RadioGroup, FormRadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { FormSheet, FormSheetRow } from "@/features/form/ui/form-sheet";
import { FormPolicy } from "@/features/form/ui/form-policy";
import { PrivacyPolicy } from "@/features/policies/privacy-policy";
import { telFilter } from "@/shared/lib/utils";
import { donationFormDefaultValues, donationFormScheme } from "./donation-form.schema";
import { createRequest } from "./api/request";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { ArrowDownload } from "@/shared/svgs";

export function DonationForm() {
  const { setIsRequestDialogOpen } = useDonationFormDialog();

  return (
    <FormResultDialog
      onClose={({ success }) => {
        if (success) {
          setIsRequestDialogOpen(false);
        }
      }}
      title={{
        success: "기부 문의가 완료되었습니다.",
        failed: "기부 문의에 실패했습니다.",
      }}
      description={{
        success: (
          <>
            요청하신 기부 문의는 입력하신 이메일로 <br />
            빠른 시일 내에 답장해 드리겠습니다.
          </>
        ),
        failed: (
          <>
            기부 문의 중 오류가 발생했습니다. <br />
            잠시 후 다시 시도해주세요.
          </>
        ),
      }}>
      <DonationFormBody />
    </FormResultDialog>
  );
}

function DonationFormBody() {
  const { item } = useDonationFormDialog();
  const { setSubmitResult } = useFormResultDialog();
  const { lang } = useParams();
  const requestTableName = `donation_${lang}`;

  const form = useForm({
    defaultValues: donationFormDefaultValues(item),
    resolver: zodResolver(donationFormScheme),
  });

  const onSubmit = async (data) => {
    const { success, errors } = await createRequest(data, requestTableName);

    if (!success) {
      setFieldErrors(form, errors);

      if (errors.message) {
        setSubmitResult({ success: false, message: errors.message });
      }

      return;
    }

    form.reset();
    setSubmitResult({ success: true });
    return;
  };

  return (
    <Form {...form}>
      <form action={form.handleSubmit(onSubmit)}>
        <FormSheet
          className={cn(
            "space-y-4 border-0 pt-0 text-base",
            "tablet:space-y-3",
            "mobile:space-y-4",
          )}>
          <CustomRow
            control={form.control}
            name="name"
            label="성함/직급"
            required
            render={({ field }) => <CustomInput {...field} placeholder="예) 홍길동" />}
          />
          <CustomRow
            control={form.control}
            name="email"
            label="이메일"
            required
            render={({ field }) => (
              <CustomInput {...field} placeholder="예) angel@angel-robotics.com" />
            )}
          />
          <CustomRow
            control={form.control}
            name="contact"
            label="연락처"
            required
            render={({ field }) => (
              <CustomInput
                {...field}
                type="tel"
                placeholder="- 는 자동으로 입력됩니다."
                customfilter={telFilter}
              />
            )}
          />
        </FormSheet>
        <div className={cn("mt-[40px]")}>
          <FormPolicy
            title="개인정보 수집 및 이용에 대한 안내"
            className={{
              title: cn("!mb-2 !text-base"),
              scroll: cn("h-[150px]"),
              content: cn("p-6", "tablet:p-4"),
            }}>
            <PrivacyPolicy className={cn("!text-sm")} />
          </FormPolicy>
          <div className={cn("mt-7")}>
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className={cn("space-y-3")}>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className={cn("justify-center")}>
                      <FormRadioGroupItem value={true} label="동의합니다." />
                      <FormRadioGroupItem value={false} label="동의하지 않습니다." />
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter className={cn("mt-8 mobile:flex-col-reverse")}>
          <Button
            variant="gray-darker"
            size="lg"
            asChild
            className={cn("w-[230px] gap-[1em] px-[1.2em]", "mobile:w-full")}>
            <Link
              href="/files/donation-suggestion.pdf"
              download="엔젤로보틱스-기부제안서.pdf"
              target="_blank">
              기부 제안서 다운로드 <ArrowDownload />
            </Link>
          </Button>
          <FormSubmit size="lg" variant="blue" className={cn("w-[230px]", "mobile:w-full")}>
            기부 문의하기
          </FormSubmit>
        </DialogFooter>
      </form>
    </Form>
  );
}

function CustomRow({ ...props }) {
  return (
    <FormSheetRow
      {...props}
      className={{
        root: cn("grid-cols-[80px_1fr]", "tablet:grid-cols-[80px_1fr]"),
        label: cn("pt-2.5"),
      }}
    />
  );
}

function CustomInput({ ...props }) {
  return <Input {...props} />;
}
