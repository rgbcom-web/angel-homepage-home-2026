import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-[1em] py-[0.25em] text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        blue: "border-transparent bg-dd-blue text-white",
        "blue-light": "border-transparent bg-dd-blue-light text-white",
        "blue-lighter": "border-transparent bg-dd-blue-lighter text-white",
        navy: "border-transparent bg-dd-navy text-white",
        mint: "border-transparent bg-dd-mint text-white",
        orange: "border-transparent bg-dd-orange text-white",
        pink: "border-transparent bg-dd-pink text-white",
        "gray-blue": "border-transparent bg-dd-gray-blue text-white",
        gray: "border-transparent bg-dd-gray text-white",
        "gray-light": "border-transparent bg-dd-gray-light text-white",
        "gray-lighter": "border-transparent bg-dd-gray-lighter text-black/30",
        outline: "border-dd-gray-light text-dd-gray",
        "outline-blue": "border-dd-blue bg-transparent text-dd-blue",
        "outline-blue-light": "border-dd-blue-light bg-transparent text-dd-blue-light",
        "outline-blue-lighter": "border-dd-blue-lighter bg-transparent text-dd-blue-lighter",
        "outline-navy": "border-dd-navy bg-transparent text-dd-navy",
        "outline-mint": "border-dd-mint bg-transparent text-dd-mint",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
