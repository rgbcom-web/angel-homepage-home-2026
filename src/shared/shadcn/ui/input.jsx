import * as React from "react";
import { cn } from "@/shared/lib/utils";

export const inputClassName = cn(
  "flex h-[2.67em] w-full py-[0.1em] transition-colors border border-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-dd-gray",
  "focus-visible:bg-white focus-visible:outline-none focus-visible:border-dd-blue focus-visible:ring-destructive-light disabled:cursor-not-allowed disabled:opacity-50",
  "rounded-full bg-dd-gray-lighter px-[1.2em] text-inherit",
  "[&[aria-invalid='true']]:border-destructive-light [&[aria-invalid='true']]:bg-destructive-bg [&[aria-invalid='true']]:border",
  "tablet:h-[2.5em]",
);

const Input = React.forwardRef(({ className, type = "text", customfilter, ...props }, ref) => {
  const handleChange = (e) => {
    let filteredValue = e.target.value;

    if (customfilter) {
      filteredValue = customfilter(filteredValue);
    }

    // props.onChange가 있으면 필터링된 값으로 호출
    if (props.onChange) {
      const syntheticEvent = { ...e, target: { ...e.target, value: filteredValue } };
      props.onChange(syntheticEvent);
    }
  };

  return (
    <input
      type={type}
      className={cn(inputClassName, className)}
      ref={ref}
      {...props}
      onChange={handleChange}
    />
  );
});
Input.displayName = "Input";

export { Input };
