import { cn } from "@/shared/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/shadcn/ui/form";

export function FormSheet({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "space-y-10 border-t border-black pt-10 text-lg",
        "tablet:space-y-7 tablet:text-base",
        "mobile:space-y-7 mobile:pt-8",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

export function FormSheetRow({ className, label, required, render, ...props }) {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem
          className={cn(
            "group",
            "grid grid-cols-[140px_1fr] items-start gap-5",
            "tablet:grid-cols-[100px_1fr]",
            "mobile:grid-cols-1 mobile:gap-2.5",
            className?.root,
          )}>
          <FormSheetRowLabel required={required} className={className?.label}>
            {label}
          </FormSheetRowLabel>
          <FormSheetRowContent className={className?.content}>
            {render({ field })}
          </FormSheetRowContent>
        </FormItem>
      )}
    />
  );
}

export function FormSheetRowNoFormField({ className, label, required, children }) {
  return (
    <FormItem
      className={cn(
        "group",
        "grid grid-cols-[140px_1fr] items-start gap-5",
        "tablet:grid-cols-[100px_1fr]",
        "mobile:grid-cols-1 mobile:gap-2.5",
        className,
      )}>
      <FormSheetRowLabel required={required}>{label}</FormSheetRowLabel>
      <FormSheetRowContent>{children}</FormSheetRowContent>
    </FormItem>
  );
}
export function FormSheetRowLabel({ children, className, required, ...props }) {
  return (
    <FormLabel
      className={cn(
        "w-full pt-[15px] font-medium",
        "tablet:pt-[12px]",
        "mobile:pt-0",
        "group-has-[.radio-group-item]:pt-0",
        "mobile:group-has-[.radio-group-item]:mb-1",
        className,
      )}
      {...props}>
      {children}
      {required && <span className="ml-1 text-dd-blue">*</span>}
    </FormLabel>
  );
}

export function FormSheetRowContent({ children, className, ...props }) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <FormControl {...props}>{children}</FormControl>
      <FormMessage className={cn("pl-2")} />
    </div>
  );
}
