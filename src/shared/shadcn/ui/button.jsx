import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden",
  {
    variants: {
      variant: {
        blue: "bg-dd-blue text-white labtop-only:hover:bg-dd-blue/70",
        "blue-light": "bg-dd-blue-light text-white labtop-only:hover:bg-dd-blue-light/70",
        "blue-lighter": "bg-dd-blue-lighter text-white labtop-only:hover:bg-dd-blue-lighter/70",
        navy: "bg-dd-navy text-white labtop-only:hover:bg-dd-navy/80",
        mint: "bg-dd-mint text-white labtop-only:hover:bg-dd-mint/80",
        orange: "bg-dd-orange text-white labtop-only:hover:bg-dd-orange/80",
        "gray-blue": "bg-dd-gray-blue text-white labtop-only:hover:bg-dd-gray-blue/80",
        gray: "bg-dd-gray text-white labtop-only:hover:bg-dd-gray/80",
        "gray-light": "bg-dd-gray-light text-white labtop-only:hover:bg-dd-gray-light/80",
        "gray-lighter":
          "bg-dd-gray-lighter text-black/30 labtop-only:hover:bg-dd-gray-light/50 labtop-only:hover:text-black/50",
        "gray-dark": "bg-dd-gray-dark text-white labtop-only:hover:bg-dd-gray-dark/80",
        "gray-darker": "bg-dd-gray-darker text-white labtop-only:hover:bg-dd-gray-darker/80",
        black: "bg-black text-white labtop-only:hover:bg-black/80",
        destructive:
          "bg-destructive text-destructive-foreground labtop-only:hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-black/60 labtop-only:hover:border-dd-blue/70 labtop-only:hover:text-dd-blue",
        "outline-blue":
          "border border-dd-blue text-dd-blue labtop-only:hover:border-dd-blue/70 labtop-only:hover:text-dd-blue/70",
        "outline-blue-light":
          "border border-dd-blue-light text-dd-blue-light labtop-only:hover:border-dd-blue-light/70 labtop-only:hover:text-dd-blue-light/70",
        "outline-blue-lighter":
          "border border-dd-blue-lighter text-dd-blue-lighter labtop-only:hover:border-dd-blue-lighter/70 labtop-only:hover:text-dd-blue-lighter/70",
        ghost: "labtop-only:hover:bg-dd-gray-light/20 labtop-only:hover:text-black/60",
        link: "text-primary underline-offset-4 labtop-only:hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 rounded-xl text-base tablet:h-9 tablet:text-sm",
        sm: "h-9 rounded-xl px-3 text-base tablet:h-8 tablet:text-sm",
        lg: "h-12 rounded-xl px-8 text-lg tablet:h-10 tablet:text-base",
        icon: "h-10 w-10 tablet:h-9 tablet:w-9 tablet:text-base mobile:text-sm mobile:w-8 mobile:h-8",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, rounded = true, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), rounded && "rounded-full")}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
