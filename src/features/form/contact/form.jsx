"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { FormResultDialog, useFormResultDialog } from "@/features/form/ui/form-result-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setFieldErrors } from "@/shared/lib/validation.utils";
import { Form, FormField, FormControl, FormItem, FormSubmit } from "@/shared/shadcn/ui/form";
import { RadioGroup, FormRadioGroupItem } from "@/shared/shadcn/ui/radio-group";
import { Input } from "@/shared/shadcn/ui/input";
import { Textarea } from "@/shared/shadcn/ui/textarea";

import { Br } from "@/features/layout";
import { FormTitle } from "@/features/form/ui/form-title";
import { FormSheet, FormSheetRow } from "@/features/form/ui/form-sheet";
import { FormPolicy } from "@/features/form/ui/form-policy";
import { PrivacyPolicy } from "@/features/policies/privacy-policy";
import { telFilter } from "@/shared/lib/utils";

import { defaultValues, formScheme } from "./scheme";
import { createRequest } from "./api/request";
import { CONTACT_CATEGORY_LIST, CONTACT_PRODUCT_LIST } from "@/app/app-constants";
import { arrayToOptions } from "@/shared/lib/utils";
import { useEffect } from "react";

export function ContactForm() {
  const { langContent } = useLang();
  return (
    <FormResultDialog
      title={{
        success: langContent({
          ko: "문의가 접수되었습니다.",
          en: "Your inquiry has been received.",
        }),
        failed: langContent({
          ko: "문의 접수 중 오류가 발생했습니다.",
          en: "An error occurred while receiving your inquiry.",
        }),
      }}
      description={{
        success: langContent({
          ko: (
            <>
              문의주신 내용은 담당자가 확인 후
              <Br pc tablet mobile />
              빠른 시일 내에 답변 드리겠습니다.
            </>
          ),
          en: (
            <>
              Your inquiry will be reviewed by the responsible party, and we will respond to you
              promptly.
            </>
          ),
        }),
        failed: langContent({
          ko: (
            <>
              문의 접수 중 오류가 발생했습니다. <Br pc tablet mobile />
              잠시 후 다시 시도해주세요.
            </>
          ),
          en: <>An error occurred while receiving your inquiry. Please try again later.</>,
        }),
      }}>
      <ContactFormBody />
    </FormResultDialog>
  );
}

function ContactFormBody() {
  const { lang, langContent, isEng } = useLang();
  const tableName = `contact_${lang}`;
  const { setSubmitResult } = useFormResultDialog();

  const form = useForm({
    defaultValues: defaultValues(lang),
    resolver: zodResolver(formScheme(lang)),
    mode: "onChange",
  });

  const categoryWatch = form.watch("category");
  const productDisabled = categoryWatch === { ko: "기타 문의", en: "Others" }[lang];

  useEffect(() => {
    if (productDisabled) {
      form.setValue("product", "");
    } else {
      form.setValue("product", CONTACT_PRODUCT_LIST[lang][0]);
    }
  }, [productDisabled]);

  const onSubmit = async (data) => {
    const { success, errors } = await createRequest(lang, data, tableName);

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
        <FormTitle>
          {langContent({
            ko: (
              <>
                궁금하신 점을 문의하시면 <Br mobile />
                빠른 시일 내에 답변 드리겠습니다.
              </>
            ),
            en: <>If you have any questions or requests, we will respond as soon as possible.</>,
          })}
        </FormTitle>
        <FormSheet>
          <FormSheetRow
            control={form.control}
            name="category"
            label={langContent({
              ko: "문의 구분",
              en: "Inquiry Type",
            })}
            required
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                {arrayToOptions(CONTACT_CATEGORY_LIST[lang]).map((option) => (
                  <FormRadioGroupItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {!productDisabled && (
            <FormSheetRow
              control={form.control}
              name="product"
              label={langContent({
                ko: "문의할 제품",
                en: "Product",
              })}
              required
              render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} value={field.value}>
                  {arrayToOptions(CONTACT_PRODUCT_LIST[lang], false, (item) =>
                    item !== "Others" ? item.toUpperCase() : item,
                  ).map((option) => (
                    <FormRadioGroupItem
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          )}
          <FormSheetRow
            control={form.control}
            name="name"
            label={langContent({
              ko: "성함/직급",
              en: (
                <>
                  Name
                  <Br tablet />
                  /Position
                </>
              ),
            })}
            required
            render={({ field }) => (
              <Input
                {...field}
                placeholder={langContent({
                  ko: "예) 홍길동",
                  en: "Angel / CEO",
                })}
              />
            )}
          />
          <FormSheetRow
            control={form.control}
            name="email"
            label={langContent({
              ko: "이메일",
              en: "E-mail",
            })}
            required
            render={({ field }) => (
              <Input
                {...field}
                placeholder={langContent({
                  ko: "예) angel@angel-robotics.com",
                  en: "angel@angel-robotics.com",
                })}
              />
            )}
          />
          <FormSheetRow
            control={form.control}
            name="contact"
            label={langContent({
              ko: "연락처",
              en: "Contact",
            })}
            required={!isEng}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder={langContent({
                  ko: "- 는 자동으로 입력됩니다.",
                  en: "Phone number",
                })}
                customfilter={!isEng && telFilter}
              />
            )}
          />
          {isEng && (
            <FormSheetRow
              control={form.control}
              name="country"
              label={langContent({
                ko: "국가",
                en: "Country",
              })}
              required
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={langContent({
                    ko: "국가를 입력해주세요.",
                    en: "Please enter your country.",
                  })}
                />
              )}
            />
          )}
          <FormSheetRow
            control={form.control}
            name="company"
            label={langContent({
              ko: "회사/부서",
              en: "Company URL",
            })}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={langContent({
                  ko: "현재 소속된 단체명 또는 개인으로 표기해주세요.",
                  en: "Home page",
                })}
              />
            )}
          />
          <FormSheetRow
            control={form.control}
            name="title"
            label={langContent({
              ko: "제목",
              en: "Title",
            })}
            required
            render={({ field }) => (
              <Input {...field} placeholder={langContent({ ko: "제목을 작성해주세요.", en: "" })} />
            )}
          />
          <FormSheetRow
            control={form.control}
            name="content"
            label={langContent({
              ko: "내용",
              en: "Content",
            })}
            required
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder={langContent({
                  ko: "내용을 작성해주세요.",
                  en: "Please let us know if you have any questions or requests.",
                })}
              />
            )}
          />
        </FormSheet>
        <div className={cn("mt-[80px]", "tablet:mt-[60px]", "mobile:mt-[40px]")}>
          <FormPolicy
            title={langContent({
              ko: "개인정보 수집 및 이용에 대한 안내",
              en: "Privacy Policy",
            })}>
            <PrivacyPolicy />
          </FormPolicy>
          <div className={cn("mt-7", "mobile:mt-4")}>
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    "flex items-center justify-between space-y-0 pl-4",
                    "tablet:pl-2",
                    "mobile:flex-col mobile:items-start mobile:gap-6 mobile:px-2",
                  )}>
                  {!isEng && (
                    <span
                      className={cn(
                        "flex gap-[0.5em] text-lg text-[#707070]",
                        "tablet:text-base",
                        "mobile:text-sm",
                      )}>
                      <span className={cn("mobile:hidden")}>*</span> 원활한 상담을 위해 개인정보
                      수집 및 이용 <Br mobile />
                      동의가 필요합니다.
                    </span>
                  )}
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className={cn(
                        "justify-end",
                        "tablet-only:gap-4",
                        "mobile:w-full mobile:items-start mobile:gap-2",
                        isEng && "ml-auto",
                      )}>
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
        <div className={cn("mt-10 flex justify-end", "mobile:mt-6")}>
          <FormSubmit>
            {langContent({
              ko: "문의하기",
              en: "Submit",
            })}
          </FormSubmit>
        </div>
      </form>
    </Form>
  );
}
