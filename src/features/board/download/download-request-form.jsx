"use client";

import { useLang } from "@/shared/context/lang-provider";
import { useDownloadRequestDialog } from "./download-request-dialog";
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
import {
  downloadRequestDefaultValues,
  downloadRequestFormScheme,
} from "./download-request-form.schema";
import { createRequest } from "./api/request";
import { getFileDownloadUrl } from "@/service/api/download-file";
import { saveAs } from "file-saver";

export function DownloadRequestForm() {
  const { langContent } = useLang();
  const { setIsRequestDialogOpen } = useDownloadRequestDialog();

  return (
    <FormResultDialog
      onClose={({ success }) => {
        if (success) {
          setIsRequestDialogOpen(false);
        }
      }}
      title={{
        success: langContent({
          ko: "자료 요청이 완료되었습니다.",
          en: "Request completed",
        }),
        failed: langContent({
          ko: "자료 요청에 실패했습니다.",
          en: "Request failed",
        }),
      }}
      description={{
        success: langContent({
          ko: (
            <>
              요청하신 자료는 입력하신 이메일로 <br />
              빠른 시일 내에 발송해 드리겠습니다.
            </>
          ),
          en: <>Your requested materials have been downloaded successfully.</>,
        }),
        failed: langContent({
          ko: (
            <>
              자료 요청 중 오류가 발생했습니다. <br />
              잠시 후 다시 시도해주세요.
            </>
          ),
          en: (
            <>
              Request failed. <br />
              Please try again later.
            </>
          ),
        }),
      }}>
      <DownloadRequestFormBody />
    </FormResultDialog>
  );
}

function DownloadRequestFormBody() {
  const { langContent, lang, isEng } = useLang();
  const { item } = useDownloadRequestDialog();
  const { setSubmitResult } = useFormResultDialog();
  const requestTableName = `download_requests_${lang}`;

  const form = useForm({
    defaultValues: downloadRequestDefaultValues(item),
    resolver: zodResolver(downloadRequestFormScheme(lang)),
  });

  const onSubmit = async (data) => {
    const { success, errors } = await createRequest(lang, data, requestTableName);

    if (!success) {
      setFieldErrors(form, errors);

      if (errors.message) {
        setSubmitResult({ success: false, message: errors.message });
      }

      return;
    }

    if (isEng) {
      const { originalName, filePath } = item.attachment;
      const { data, errors } = await getFileDownloadUrl(filePath);

      if (data && data.url) {
        const response = await fetch(data.url);
        const blob = await response.blob();

        saveAs(blob, originalName);
      }
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
            "space-y-4 border-0 !pt-0 text-base",
            "tablet:space-y-3",
            "mobile:space-y-4",
          )}>
          <CustomRow
            control={form.control}
            name="name"
            label={langContent({
              ko: "성함/직급",
              en: "Name/Position",
            })}
            required
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={langContent({
                  ko: "예) 김천사, Angel KIM/ 사원",
                  en: "Angel / CEO",
                })}
              />
            )}
          />
          <CustomRow
            control={form.control}
            name="email"
            label={langContent({
              ko: "이메일",
              en: "E-mail",
            })}
            required
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={langContent({
                  ko: "예) angel@angel-robotics.com",
                  en: "angel@angel-robotics.com",
                })}
              />
            )}
          />
          <CustomRow
            control={form.control}
            name="contact"
            label={langContent({
              ko: "연락처",
              en: "Contact",
            })}
            required
            render={({ field }) => (
              <CustomInput
                {...field}
                type="tel"
                placeholder={langContent({
                  ko: "- 는 자동으로 입력됩니다.",
                  en: "Phone number",
                })}
                customfilter={!isEng ? telFilter : undefined}
              />
            )}
          />
          <CustomRow
            control={form.control}
            name="company"
            label={langContent({
              ko: "회사",
              en: "Company",
            })}
            required
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder={langContent({
                  ko: "현재 소속된 단체명 또는 개인으로 표기해주세요.",
                  en: "Company name or individual",
                })}
              />
            )}
          />
          <CustomRow
            control={form.control}
            name="department"
            label={langContent({
              ko: "부서",
              en: "Department",
            })}
            required
            render={({ field }) => <CustomInput {...field} />}
          />
        </FormSheet>
        <div className={cn("mt-[40px]")}>
          <FormPolicy
            title={langContent({
              ko: "개인정보 수집 및 이용에 대한 안내",
              en: "Privacy Policy",
            })}
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
                      <FormRadioGroupItem
                        value={true}
                        label={langContent({
                          ko: "동의합니다.",
                          en: "Agree",
                        })}
                      />
                      <FormRadioGroupItem
                        value={false}
                        label={langContent({
                          ko: "동의하지 않습니다.",
                          en: "Disagree",
                        })}
                      />
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter className={cn("mt-8")}>
          <FormSubmit size="lg">
            {langContent({
              ko: "자료요청하기",
              en: "Download",
            })}
          </FormSubmit>
        </DialogFooter>
      </form>
    </Form>
  );
}

function CustomRow({ ...props }) {
  const { isEng } = useLang();
  return (
    <FormSheetRow
      {...props}
      className={{
        root: cn(
          "grid-cols-[80px_1fr]",
          "tablet:grid-cols-[80px_1fr]",
          isEng && "grid-cols-[120px_1fr] tablet:grid-cols-[120px_1fr]",
        ),
        label: cn("pt-2.5"),
      }}
    />
  );
}

function CustomInput({ ...props }) {
  return <Input {...props} />;
}
