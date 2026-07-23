import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { AngelAProConnected } from "./angel-a-pro-connected";
import { AngelAProTrainning } from "./angel-a-pro-trainning";
import { AngelAProSessionAnalysis } from "./angel-a-pro-session-analysis";
import { AngelAProMotionAnalysis } from "./angel-a-pro-motion-analysis";

export function AngelAPro() {
  return (
    <div
      className={cn(
        "bg-white text-black",
        "tablet-only:portrait:mt-[-30vh]",
        "tablet-only:landscape:mt-[-10vh]",
      )}>
      <AngelAProConnected />
      <AngelAProTrainning />
      <AngelAProSessionAnalysis />
      <AngelAProMotionAnalysis />
    </div>
  );
}

export function AngelASection({ children, className, ref, trackClassName, ...props }) {
  return (
    <div className={cn("h-[150vh]", trackClassName)}>
      <section
        className={cn(
          "sticky top-0 flex min-h-screen items-center justify-center overflow-hidden bg-white py-20",
          "mobile:justify-start tablet:portrait:justify-start",
          className,
        )}
        {...props}
        ref={ref}>
        {children}
      </section>
    </div>
  );
}

export function AngelASectionHead({ tag, title, description, className, ...props }) {
  return (
    <motion.div className={cn(className)} {...props}>
      <span className={cn("mb-2 block text-xl/[1] font-bold text-dd-mint", "tablet:text-base/[1]")}>
        {tag}
      </span>
      <h3
        className={cn(
          "text-[40px]/[1.2] font-bold",
          "tablet:text-[30px]/[1.2]",
          "mobile:text-3xl/[1.3]",
        )}>
        {title}
      </h3>
      <p
        className={cn(
          "mt-[30px] text-lg/[1.5] opacity-70 [&_b]:text-dd-mint",
          "tablet:mt-5 tablet:text-base/[1.5]",
        )}>
        {description}
      </p>
    </motion.div>
  );
}
