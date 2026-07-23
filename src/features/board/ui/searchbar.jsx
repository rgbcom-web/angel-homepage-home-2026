"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { useForm } from "react-hook-form";
import { Form, FormField, FormControl } from "@/shared/shadcn/ui/form";
import { Input } from "@/shared/shadcn/ui/input";
import { Button } from "@/shared/shadcn/ui/button";
import { useQueryString } from "@/shared/hooks/useQueryString";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { Suspense } from "react";

export function SearchBar({ ...props }) {
  return (
    <Suspense>
      <SearchBarElement {...props} />
    </Suspense>
  );
}

export function SearchbarInput({ ...props }) {
  return (
    <Suspense>
      <SearchbarInputElement {...props} />
    </Suspense>
  );
}

function SearchBarElement({ placeholder, className }) {
  const { langContent } = useLang();
  const pathname = usePathname();
  const { searchParams, set, get } = useQueryString();

  const form = useForm({
    defaultValues: {
      search: get("search") || "",
    },
  });

  const onSubmit = (data) => {
    set({ search: data.search }, "push", { scroll: false });
  };

  useEffect(() => {
    form.reset({
      search: get("search") || "",
    });
  }, [pathname, searchParams]);

  return (
    <Form {...form}>
      <form className={cn(className?.form)} onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <SearchbarInput
              placeholder={
                placeholder ||
                langContent({
                  ko: "검색어를 입력해주세요.",
                  en: "Please enter keywords",
                })
              }
              className={className}
              field={field}
            />
          )}
        />
      </form>
    </Form>
  );
}

function SearchbarInputElement({ placeholder, className, field }) {
  const { langContent } = useLang();
  const qs = useQueryString();

  const handleReset = () => {
    qs.clear();
  };

  return (
    <div
      className={cn(
        "flex gap-2",
        "mobile:w-full mobile:items-center mobile:overflow-hidden mobile:rounded-full mobile:bg-dd-gray-lighter mobile:pr-1",
        className?.container,
      )}>
      <FormControl>
        <Input
          {...field}
          className={cn(
            "w-[386px]",
            "tablet:w-60",
            "mobile:w-full mobile:!border-0 mobile:!outline-none mobile:!ring-0",
            className?.input,
          )}
          placeholder={
            placeholder ||
            langContent({
              ko: "검색어를 입력해주세요.",
              en: "Please enter keywords",
            })
          }
        />
      </FormControl>
      <div className={cn("flex gap-1")}>
        <Button
          type="submit"
          className={cn(
            "h-11 w-11 flex-shrink-0 rounded-full p-0",
            "tablet:h-11 tablet:w-11",
            "mobile:h-8 mobile:w-8",
            className?.button,
          )}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23.995"
            height="24"
            viewBox="0 0 23.995 24"
            className={cn("!h-auto !w-1/2")}>
            <path
              d="M19.5,9.749A9.725,9.725,0,0,1,17.622,15.5l5.934,5.938a1.5,1.5,0,0,1-2.123,2.123L15.5,17.622a9.75,9.75,0,1,1,4-7.874ZM9.749,16.5A6.749,6.749,0,1,0,3,9.749,6.749,6.749,0,0,0,9.749,16.5Z"
              fill="#fff"
            />
          </svg>
        </Button>
        <Button
          onClick={handleReset}
          type="button"
          variant="gray-darker"
          className={cn(
            "h-11 w-11 flex-shrink-0 rounded-full p-0",
            "tablet:h-11 tablet:w-11",
            "mobile:h-8 mobile:w-8",
            className?.button,
          )}>
          <RotateCcw className={cn("!h-auto !w-1/2")} />
        </Button>
      </div>
    </div>
  );
}
