import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { SVG_Logo } from "@/shared/svgs";
import { Button } from "@/shared/shadcn/ui/button";

export function Header() {
  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 h-[80px] w-full border-b bg-white",
        "tablet:h-[60px]",
      )}>
      <Container className={cn("flex h-full items-center justify-between")}>
        <Link href="/private/download">
          <SVG_Logo className={{ svg: cn("tablet:w-[100px]") }} />
        </Link>
        <div className={cn("flex items-center gap-4")}>
          <span className={cn("text-xs font-normal text-dd-gray-dark underline")}>
            Visit our website
          </span>
          <div className={cn("flex gap-1")}>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn("bg-dd-gray-light/20 !text-sm text-dd-gray-dark hover:text-dd-blue")}>
              <Link href="/ko/">KO</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn("bg-dd-gray-light/20 !text-sm text-dd-gray-dark hover:text-dd-blue")}>
              <Link href="/en/">EN</Link>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
