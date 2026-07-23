"use client";

import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";
import { useAppContext } from "@/shared/context/app.context";

import { DDLink } from "@/shared/components/link";
import { HoverArrow, ASInquiryIcon, ProductInquiryIcon } from "./icons";
import { ArrowUp } from "@/shared/svgs";

import { KAKAO_CHANNEL_URL } from "@/app/app-constants";
import { useLang } from "@/shared/context/lang-provider";

export function FloatingNavigation() {
  const { isHome, homeCoverAnimationEnd } = useAppContext();

  return (
    <motion.nav
      initial={
        isHome && {
          y: "50%",
          opacity: 0,
        }
      }
      animate={
        homeCoverAnimationEnd && {
          y: "0%",
          opacity: 1,
        }
      }
      transition={
        homeCoverAnimationEnd && {
          duration: 0.4,
          ease: "easeInOut",
        }
      }
      className={cn(
        "fixed bottom-[27px] right-[27px] z-fixed-navigation flex flex-col gap-[13px]",
        "w-[56px]",
        "tablet:hidden",
        "mobile:hidden",
      )}>
      <QuickMenu />
      <TopButton />
    </motion.nav>
  );
}

function QuickMenu() {
  const { isEng, langContent } = useLang();

  return (
    <div className="flex flex-col gap-[4px]">
      {!isEng && (
        <QuickMenuButton
          href={KAKAO_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          keepLang={false}
          className={{
            container: "bg-dd-blue",
            hoverArrow: "text-dd-blue",
          }}
          text={
            <>
              A/S <br />
              문의
            </>
          }
          icon={<ASInquiryIcon />}
        />
      )}
      <QuickMenuButton
        href="/support/contact"
        className={{
          container: "bg-dd-mint",
          hoverArrow: "text-dd-mint",
        }}
        text={langContent({
          ko: (
            <>
              제품 <br />
              문의
            </>
          ),
          en: <>Contact Us</>,
        })}
        icon={<ProductInquiryIcon />}
      />
    </div>
  );
}

function QuickMenuButton({ href, className, text, icon, keepLang, ...props }) {
  const { isEng } = useLang();
  return (
    <DDLink
      href={href}
      keepLang={keepLang}
      className={cn(
        "group",
        "flex w-full flex-col items-center justify-center gap-[17px] rounded-[2px] px-1 py-4",
        "shadow-[0px_2px_6px_rgb(0,0,0,0.15)]",
        "transition-all duration-300 ease-timing-pop",
        "hover:rounded-[100px]",
        className?.container,
      )}
      {...props}>
      <div className="relative h-[27px] w-[27px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-timing-pop group-hover:scale-0">
          {icon}
        </div>
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full bg-white shadow-[2px_3px_6px_rgb(0,0,0,0.15)]",
            "transition-all duration-300 ease-timing-pop",
            "scale-0 opacity-0",
            "group-hover:scale-100 group-hover:opacity-100",
            className?.hoverArrow,
          )}>
          <HoverArrow />
        </div>
      </div>
      <b
        className={cn(
          "font-bold leading-[1.2] text-white",
          isEng && "uppercase [writing-mode:vertical-rl]",
        )}>
        {text}
      </b>
    </DDLink>
  );
}

function TopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex aspect-square w-full items-center justify-center rounded-[2px] bg-[#242424]",
        "text-xl font-light text-white",
      )}>
      <ArrowUp />
    </button>
  );
}
