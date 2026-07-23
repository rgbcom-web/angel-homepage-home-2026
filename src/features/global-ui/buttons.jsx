import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowRight } from "@/shared/svgs";
import { DDLink } from "@/shared/components/link";

// 테두리 색상 클래스 맵
const borderColors = {
  mint: "border-dd-mint",
  blue: "border-dd-blue",
  navy: "border-dd-navy",
  orange: "border-dd-orange",
  "gray-lighter": "border-dd-gray-lighter",
  "gray-light": "border-dd-gray-light",
  gray: "border-dd-gray",
  "gray-dark": "border-dd-gray-dark",
  "gray-darker": "border-dd-gray-darker",
  black: "border-black",
  white: "border-white",
  transparent: "border-none",
};

// 호버 텍스트 색상 클래스 맵
const hoverTextColors = {
  mint: "labtop-only:hover:text-dd-mint",
  blue: "labtop-only:hover:text-dd-blue",
  navy: "labtop-only:hover:text-dd-navy",
  orange: "labtop-only:hover:text-dd-orange",
  "gray-lighter": "labtop-only:hover:text-dd-gray-lighter",
  "gray-light": "labtop-only:hover:text-dd-gray-light",
  gray: "labtop-only:hover:text-dd-gray",
  "gray-dark": "labtop-only:hover:text-dd-gray-dark",
  "gray-darker": "labtop-only:hover:text-dd-gray-darker",
  black: "labtop-only:hover:text-black",
  white: "labtop-only:hover:text-white",
  none: "", // hover 시 텍스트 색상 변경 없음
};

// 배경 색상 클래스 맵 (Dimmer 용)
const bgColorVariants = {
  mint: "!bg-dd-mint",
  blue: "!bg-dd-blue",
  navy: "!bg-dd-navy",
  orange: "!bg-dd-orange",
  "gray-lighter": "!bg-dd-gray-lighter",
  "gray-light": "!bg-dd-gray-light",
  gray: "!bg-dd-gray",
  "gray-dark": "!bg-dd-gray-dark",
  "gray-darker": "!bg-dd-gray-darker",
  black: "!bg-black",
  white: "!bg-white",
  default: "!bg-white", // 기본 Dimmer 색상
  transparent: "!bg-transparent", // 투명 배경
};

// 버튼 스타일 프리셋
const buttonPresets = {
  default: {
    variant: "blue",
    borderColor: "blue",
    hoverTextColor: "white", // hover 시 텍스트 색상
    hoverEffect: true,
    dimmerColor: "default",
  },
  primary: {
    variant: "blue",
    borderColor: "blue",
    hoverTextColor: "white",
    hoverEffect: true,
    dimmerColor: "default",
  },
  secondary: {
    variant: "white",
    borderColor: "blue",
    hoverTextColor: "white",
    hoverEffect: true,
    dimmerColor: "blue",
  },
  ghost: {
    variant: "transparent",
    borderColor: "transparent",
    hoverTextColor: "blue",
    hoverEffect: true,
    dimmerColor: "white",
  },
  outline: {
    variant: "transparent",
    borderColor: "blue",
    hoverTextColor: "white",
    hoverEffect: true,
    dimmerColor: "blue",
  },
};

export function ArrowButton({
  children,
  className,
  dimmerClassName,
  hoverEffect = true, // hover 효과 사용 여부
  variant = "blue", // 기본 테마
  borderColor = "transparent", // 테두리 색상 (별도 지정)
  hoverTextColor, // hover 시 텍스트 색상 (별도 지정)
  dimmerColor = "default", // Dimmer 배경색
  bgColor,
  preset, // 프리셋 스타일
  href,
  keepLang,
  ...props
}) {
  // 프리셋 적용 (지정된 경우)
  if (preset && buttonPresets[preset]) {
    const presetStyle = buttonPresets[preset];
    variant = presetStyle.variant;
    borderColor = presetStyle.borderColor;
    hoverTextColor = presetStyle.hoverTextColor;
    hoverEffect = presetStyle.hoverEffect;
    dimmerColor = presetStyle.dimmerColor || "default";
  }

  // borderColor가 지정되지 않으면 variant와 동일하게 설정
  if (borderColor === undefined) {
    borderColor = variant;
  }

  // hoverTextColor가 지정되지 않으면 white로 설정 (대비를 위해)
  if (hoverTextColor === undefined) {
    hoverTextColor = "white";
  }

  if (bgColor === undefined) {
    bgColor = "white";
  }

  const Dimmer = ({ className }) => (
    <span
      className={cn(
        "absolute left-[-2px] top-1/2 z-0 h-[calc(100%+4px)] w-[calc(100%+4px)] -translate-x-full -translate-y-1/2 rounded-full opacity-0",
        bgColorVariants[dimmerColor], // 동적 배경색 설정
        "transition-all duration-300 ease-timing-pop",
        "group-hover/arrow-button:translate-x-0 group-hover/arrow-button:opacity-100",
        "tablet:hidden",
        className,
      )}
    />
  );

  const Content = ({ children }) => (
    <>
      {hoverEffect && <Dimmer className={dimmerClassName} />}
      <span className={cn("relative z-10 flex items-center gap-[1em]")}>
        {children} <ArrowRight />
      </span>
    </>
  );

  return (
    <Button
      className={cn(
        "group/arrow-button relative overflow-hidden px-[1em]",
        borderColors[borderColor], // 독립적인 테두리 클래스
        hoverEffect && "transition-colors duration-300 ease-timing-pop",
        hoverEffect && hoverTextColors[hoverTextColor], // 독립적인 호버 텍스트 클래스
        bgColorVariants[bgColor],
        className,
      )}
      variant={variant} // 기본 스타일용
      asChild={!!href}
      {...props}>
      {href ? (
        <DDLink href={href} keepLang={keepLang}>
          <Content>{children}</Content>
        </DDLink>
      ) : (
        <Content>{children}</Content>
      )}
    </Button>
  );
}
