import * as React from "react";

import { cn } from "@/shared/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[300px] w-full border border-transparent placeholder:text-dd-gray",
        "focus-visible:border-dd-blue focus-visible:bg-white focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "rounded-[24px] bg-dd-gray-lighter px-6 py-4 text-lg",
        "tablet:min-h-[200px] tablet:rounded-[20px] tablet:px-4 tablet:py-3 tablet:text-base",
        "[&[aria-invalid='true']]:border-destructive-light [&[aria-invalid='true']]:bg-destructive-bg",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
