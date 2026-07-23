"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { FormItem, FormLabel, FormControl } from "./form";

import { cn } from "@/shared/lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-wrap gap-x-6 gap-y-3", "mobile:flex-col", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "radio-group-item focus-visible:ring-ring m-0 aspect-square h-6 w-6 rounded-full border border-dd-blue text-dd-blue focus:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        "[&[aria-invalid='true']&[aria-checked='false']]:border-destructive-light [&[aria-invalid='true']&[aria-checked='false']]:bg-destructive-bg",
        className,
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3 w-3 fill-dd-blue" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const FormRadioGroupItem = React.forwardRef(({ className, label, ...props }, ref) => {
  return (
    <FormItem className={cn("flex items-center")}>
      <FormControl>
        <RadioGroupItem ref={ref} {...props} />
      </FormControl>
      <FormLabel className={cn("pl-2 font-normal leading-[1.3] text-[#707070]")}>{label}</FormLabel>
    </FormItem>
  );
});
FormRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem, FormRadioGroupItem };
