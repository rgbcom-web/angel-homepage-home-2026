"use client";

import { useLang } from "@/shared/context/lang-provider";
import { useEffect, useRef, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useAppContext } from "@/shared/context/app.context";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function IntroCover() {
  const { lang, langContent } = useLang();
  const { homeCoverAnimationEnd, setHomeCoverAnimationEnd } = useAppContext();
  const { device } = useMediaQuery();

  const typoAnimation = useMemo(() => {
    return {
      initial: { y: "100%" },
      animate: { y: ["100%", "0%", "0%", "-100%"] },
      transition: {
        ease: easing.pop,
        duration: 3.2,
        delay: 0,
        times: [0, 0.4, 0.7, 1],
      },
    };
  }, [device]);
  const outroDelay = useMemo(() => {
    return typoAnimation.transition.duration * typoAnimation.transition.times[2] * 1000 + 200;
  }, [device]);
  const outroTimer = useRef(null);

  useEffect(() => {
    outroTimer.current = setTimeout(() => {
      setHomeCoverAnimationEnd(true);
    }, outroDelay);
  }, []);

  return (
    <AnimatePresence>
      {!homeCoverAnimationEnd && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 1.2, delay: 0 }}
          className={cn("fixed left-0 top-0 z-[99999] h-screen w-screen bg-black")}>
          <div
            className={cn(
              "relative flex h-full items-center justify-center will-change-transform",
            )}>
            <div
              className={cn(
                "absolute left-1/2 top-1/2 z-10 flex h-full w-full -translate-x-1/2 -translate-y-1/2",
                "items-center justify-center bg-black text-center text-[77px] font-semibold leading-[1.5] text-white",
                "tablet:text-[50px]",
                "mobile:text-[30px]",
              )}>
              {langContent({
                ko: <KoreanTypo typoAnimation={typoAnimation} />,
                en: <EnglishTypo typoAnimation={typoAnimation} />,
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KoreanTypo({ typoAnimation }) {
  const { device } = useMediaQuery();
  const isMobile = useMemo(() => device === "mobile", [device]);

  return !isMobile ? (
    <div className={cn("mobile:hidden")}>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={typoAnimation.transition}>
          우리는 <span className={cn("text-dd-blue")}>기술</span>로
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.15 }}>
          <span className={cn("text-dd-blue")}>사람의 능력</span>을{" "}
          <span className={cn("text-dd-blue")}>재창조</span>합니다.
        </motion.div>
      </div>
    </div>
  ) : (
    <div className={cn("hidden mobile:block")}>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0 }}>
          우리는 <span className={cn("text-dd-blue")}>기술</span>로
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.15 }}>
          <span className={cn("text-dd-blue")}>사람의 능력</span>을
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.3 }}>
          <span className={cn("text-dd-blue")}>재창조</span>합니다
        </motion.div>
      </div>
    </div>
  );
}

function EnglishTypo({ typoAnimation }) {
  const { device } = useMediaQuery();
  const isMobile = useMemo(() => device === "mobile", [device]);

  return !isMobile ? (
    <div className={cn("mobile:hidden")}>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={typoAnimation.transition}>
          <span>Recreating Human Ability</span>
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.15 }}>
          <span className={cn("text-dd-blue")}>with Technology</span>
        </motion.div>
      </div>
    </div>
  ) : (
    <div className={cn("hidden mobile:block")}>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0 }}>
          <span>Recreating</span>
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.15 }}>
          <span>Human Ability</span>
        </motion.div>
      </div>
      <div className={cn("w-full overflow-hidden")}>
        <motion.div {...typoAnimation} transition={{ ...typoAnimation.transition, delay: 0.3 }}>
          <span className={cn("text-dd-blue")}>with Technology</span>
        </motion.div>
      </div>
    </div>
  );
}
