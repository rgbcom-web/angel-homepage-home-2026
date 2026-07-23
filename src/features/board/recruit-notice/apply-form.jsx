"use client";

import { useParams } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { FormResultDialog, useFormResultDialog } from "@/features/form/ui/form-result-dialog";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setFieldErrors } from "@/shared/lib/validation.utils";
import { Form, FormField, FormMessage, FormItem, FormSubmit } from "@/shared/shadcn/ui/form";
import { Input } from "@/shared/shadcn/ui/input";
import { FileInput } from "@/shared/shadcn/ui/input-file";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { Br, BulletList } from "@/features/layout";
import { FormSheet, FormSheetRow, FormSheetRowNoFormField } from "@/features/form/ui/form-sheet";
import { telFilter } from "@/shared/lib/utils";

import { defaultValues, formScheme } from "./apply-form-scheme";
import { createApplyRequest } from "./api/apply-request";
import { uploadFileToStorageClient } from "@/service/api/upload-file-to-storage-client";
import { PolicyAgreement } from "./apply-policy-agreement";
import { useApplyDialog } from "./apply-dialog";

export function RecruitApplyForm({ noticeData }) {
  const { setIsApplyDialogOpen } = useApplyDialog();

  return (
    <FormResultDialog
      title={{
        success: "지원서가 접수되었습니다.",
        failed: "지원서 접수 중 오류가 발생했습니다.",
      }}
      description={{
        success: <>엔젤로보틱스 채용공고에 지원해주셔서 감사합니다.</>,
        failed: (
          <>
            지원서 접수 중 오류가 발생했습니다. <Br />
            잠시 후 다시 시도해주세요.
          </>
        ),
      }}
      onClose={() => setIsApplyDialogOpen(false)}>
      <ContactFormBody noticeData={noticeData} />
    </FormResultDialog>
  );
}

function ContactFormBody({ noticeData }) {
  const { lang } = useParams();
  const tableName = `recruit_notice_applicants_${lang}`;
  const { setSubmitResult } = useFormResultDialog();
  const { id: parent_id, title: noticeTitle } = noticeData;

  const form = useForm({
    defaultValues: { ...defaultValues, parent_id },
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const uploadResultData = await uploadFileToStorageClient(data, tableName);

    // mailer에서 파일 첨부를 위해 files 데이터를 추가해야함.
    const { success, errors } = await createApplyRequest(
      noticeTitle,
      { ...uploadResultData, files: data.files },
      tableName,
    );

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
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("text-lg", "tablet:text-base")}>
        <FormSheet className={cn("space-y-6 border-none pt-0")}>
          <CustomRow
            control={form.control}
            name="name"
            label="성함"
            required
            render={({ field }) => <Input {...field} placeholder="예) 홍길동" />}
          />
          <CustomRow
            control={form.control}
            name="email"
            label="이메일"
            required
            render={({ field }) => <Input {...field} placeholder="예) angel@angel-robotics.com" />}
          />
          <CustomRow
            control={form.control}
            name="contact"
            label="연락처"
            required
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="- 는 자동으로 입력됩니다."
                customfilter={telFilter}
              />
            )}
          />
          <CustomRow
            control={form.control}
            name="title"
            label="제목"
            required
            render={({ field }) => <Input {...field} placeholder="제목을 작성해주세요." />}
          />
          <CustomRow
            control={form.control}
            name="content"
            label="내용"
            required
            render={({ field }) => <Textarea {...field} placeholder="내용을 작성해주세요." />}
          />
          <FormSheetRowNoFormField
            label={
              <div className="flex flex-col gap-2 mobile:mb-2 mobile:gap-1">
                <span>
                  첨부파일 <span className={cn("text-dd-blue")}>*</span>
                </span>
                <div className={cn("flex flex-col gap-2 mobile:gap-1")}>
                  <span className="text-base font-bold text-dd-blue tablet:text-sm">
                    첨부파일 1개 필수
                  </span>
                  <span className="text-base text-dd-gray-light tablet:text-sm">
                    이력서, 자기소개서, 포트폴리오 등
                  </span>
                </div>
              </div>
            }>
            <div className={cn("flex flex-col gap-4")}>
              <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`files.attachments.${index}`}
                    render={({ field }) => (
                      <FormItem className={cn("space-y-1.5")}>
                        <FileInput {...field} />
                        <FormMessage className={cn("pl-2")} />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div
                className={cn(
                  "flex justify-between gap-4",
                  "tablet:flex-col tablet:items-end tablet:gap-1",
                  "mobile:items-start",
                )}>
                <FormMessage className={cn("pl-2", "tablet:order-2 mobile:pl-0")}>
                  {form.formState.errors.files?.attachments?.root?.message}
                </FormMessage>
                <span
                  className={cn(
                    "ml-auto flex gap-1 text-right text-base text-dd-gray-light",
                    "tablet:text-sm",
                    "mobile:ml-0 mobile:text-left",
                  )}>
                  <span>*</span> 20MB 이하의 이미지, 문서(doc, hwp, pdf 등) 파일만 첨부 가능합니다.
                </span>
              </div>
            </div>
          </FormSheetRowNoFormField>
        </FormSheet>
        <div
          className={cn(
            "mt-[50px] flex items-end justify-between gap-4 border-t border-[#C9C9C9] pt-[30px]",
            "tablet:mt-[40px] tablet:flex-col tablet:items-start tablet:gap-8 tablet:pt-[25px]",
            "mobile:mt-[30px] mobile:gap-8 mobile:pt-[25px]",
          )}>
          <BulletList
            className={{ root: cn("text-base text-[#646464] tablet:text-sm") }}
            items={[
              <>
                등록된 개인정보는 관련 법령에 따라 엄격하게 취급되며 <Br pc />
                3년 경과 후 자동으로 폐기됩니다.
              </>,
            ]}
          />
          <PolicyAgreement />
        </div>
        <div className={cn("mt-8 flex justify-end", "mobile:mt-8")}>
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
}

function SubmitButton() {
  const form = useFormContext();
  const privacy_required = form.watch("privacy_required");

  if (!privacy_required) {
    return null;
  }

  return (
    <FormSubmit arrowButton variant="blue">
      지원하기
    </FormSubmit>
  );
}

function CustomRow({ children, className, ...props }) {
  return (
    <FormSheetRow className={{ root: cn("grid-cols-[70px_1fr]", className) }} {...props}>
      {children}
    </FormSheetRow>
  );
}
