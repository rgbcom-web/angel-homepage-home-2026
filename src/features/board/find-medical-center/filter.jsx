"use client";

import { cn } from "@/shared/lib/utils";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/shared/shadcn/ui/form";
import { FormSelect } from "@/shared/shadcn/ui/form-select";
import { SearchbarInput } from "@/features/board/ui/searchbar";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

import { sidoOptions, sigunguData, toOptions } from "./region-data";

export function FindMedicalCenterFilter({ products }) {
  const pathname = usePathname();
  const { lang } = useParams();
  const { searchParams, set, get } = useQueryString();

  const form = useForm({
    defaultValues: {
      product: get("product") || "",
      sido: get("sido") || "",
      sigungu: get("sigungu") || "",
      search: get("search") || "",
    },
  });

  const onSubmit = (data) => {
    set(
      {
        product: data.product,
        sido: data.sido,
        sigungu: data.sigungu,
        search: data.search,
      },
      "push",
      { scroll: false },
    );
  };

  useEffect(() => {
    form.reset({
      product: get("product") || "",
      sido: get("sido") || "",
      sigungu: get("sigungu") || "",
      search: get("search") || "",
    });
  }, [pathname, searchParams]);

  const selectedSido = form.watch("sido");
  const sigunguOptions = toOptions(sigunguData[selectedSido]);

  useEffect(() => {
    form.setValue("sigungu", "");
  }, [selectedSido]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex items-center gap-2", "mobile:flex-col")}>
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormSelect
              options={[
                { label: "제품 전체", value: "all" },
                ...products.map((product) => ({
                  label: product[`name_${lang}`],
                  value: product[`name_${lang}`],
                })),
              ]}
              placeholder="제품 선택"
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <FormField
          control={form.control}
          name="sido"
          render={({ field }) => (
            <FormSelect
              placeholder="시/도 선택"
              options={[{ label: "시/도 전체", value: "all" }, ...sidoOptions]}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
        <FormField
          control={form.control}
          name="sigungu"
          render={({ field }) => (
            <FormSelect
              placeholder="구/군 선택"
              options={[{ label: "구/군 전체", value: "all" }, ...sigunguOptions]}
              onValueChange={field.onChange}
              value={field.value}
              disabled={!selectedSido || selectedSido === "all"}
            />
          )}
        />
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <SearchbarInput placeholder="병원명을 입력해주세요." field={field} />
          )}
        />
      </form>
    </Form>
  );
}
