import { cn } from "@/shared/lib/utils";
import { FormTitle } from "./form-title";
import { ScrollArea } from "@/shared/shadcn/ui/scroll-area";

export function FormPolicy({ title, children, className, ...props }) {
  return (
    <div>
      <FormTitle className={cn("mb-4", className?.title)}>{title}</FormTitle>
      <ScrollArea className={{ root: cn("h-[300px]", "tablet:h-[200px]", className?.scroll) }}>
        <div
          className={cn(
            "p-10 tablet:p-6 tablet:pr-8",
            "mobile:p-4 mobile:pr-6",
            className?.content,
          )}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
