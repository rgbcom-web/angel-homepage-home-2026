"use client";

import Link from "next/link";
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
import { FormTitle } from "@/features/form/ui/form-title";
import { FormSheet, FormSheetRow, FormSheetRowNoFormField } from "@/features/form/ui/form-sheet";
import { telFilter } from "@/shared/lib/utils";

import { defaultValues, formScheme } from "./scheme";
import { createRequest } from "./api/request";
import { uploadFileToStorageClient } from "@/service/api/upload-file-to-storage-client";
import { PolicyAgreement } from "./policy-agreement";

export function RecruitApplyForm() {
  return (
    <FormResultDialog
      title={{
        success: "지원서가 접수되었습니다.",
        failed: "지원서 접수 중 오류가 발생했습니다.",
      }}
      description={{
        success: (
          <>
            엔젤로보틱스 상시 채용에 지원해주셔서 감사합니다.
            <Br />
            추후 여러분의 이력에 맞는 직무의 채용이 발생한 경우, 우선적으로 검토하여 채용 담당자가
            연락을 드리겠습니다.
          </>
        ),
        failed: (
          <>
            지원서 접수 중 오류가 발생했습니다. <Br />
            잠시 후 다시 시도해주세요.
          </>
        ),
      }}>
      <ContactFormBody />
    </FormResultDialog>
  );
}

function ContactFormBody() {
  const { lang } = useParams();
  const tableName = `recruit_application_${lang}`;
  const { setSubmitResult } = useFormResultDialog();

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const uploadResultData = await uploadFileToStorageClient(data, tableName);

    // mailer에서 파일 첨부를 위해 files 데이터를 추가해야함.
    const { success, errors } = await createRequest(
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
        <FormTitle>아래 양식을 통해 이력서를 등록해 주세요.</FormTitle>
        <FormSheet>
          <FormSheetRow
            control={form.control}
            name="name"
            label="성함"
            required
            render={({ field }) => <Input {...field} placeholder="예) 홍길동" />}
          />
          <FormSheetRow
            control={form.control}
            name="email"
            label="이메일"
            required
            render={({ field }) => <Input {...field} placeholder="예) angel@angel-robotics.com" />}
          />
          <FormSheetRow
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
          <FormSheetRow
            control={form.control}
            name="title"
            label="제목"
            required
            render={({ field }) => <Input {...field} placeholder="제목을 작성해주세요." />}
          />
          <FormSheetRow
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
            className={{ root: cn("text-[#646464] tablet:text-sm") }}
            items={[
              <>
                해당 페이지는 <b className={cn("text-black")}>인재 DB 등록</b>이며, 적합 포지션 발생
                시 해당 부서에서 연락을 드립니다.
              </>,
              <>
                현재 진행중인 공고는{" "}
                <Link href="../notice" className={cn("font-bold text-black")}>
                  채용 중 공고
                </Link>{" "}
                페이지에서 확인 가능합니다.
              </>,
              "등록된 개인정보는 관련 법령에 따라 엄격하게 취급되며 3년 경과 후 자동으로 폐기됩니다.",
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
