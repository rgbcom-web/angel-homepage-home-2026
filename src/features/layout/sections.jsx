import { cn } from "@/shared/lib/utils";

export function GraySection({ children, className }) {
  return (
    <div
      className={cn(
        "bg-dd-gray-lighter pb-[100px] pt-[80px]",
        "tablet:pb-[80px] tablet:pt-[60px]",
        className,
      )}>
      {children}
    </div>
  );
}

export function Section({ children, className }) {
  return (
    <section
      className={cn("py-[100px] last:pb-0", "tablet:py-[80px]", "mobile:py-[60px]", className)}>
      {children}
    </section>
  );
}

export function SectionHead({ children, className }) {
  return (
    <div className={cn("mb-[45px] space-y-4", "tablet:mb-[35px]", "mobile:mb-[25px]", className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, className }) {
  return (
    <h2
      className={cn(
        "text-[38px]/[1.3] font-bold",
        "tablet:text-[26px]",
        "mobile:text-[24px]",
        className,
      )}>
      {children}
    </h2>
  );
}

export function SectionDescription({ children, className }) {
  return (
    <p className={cn("text-xl font-bold text-[#505050]", "tablet:text-base", className)}>
      {children}
    </p>
  );
}
