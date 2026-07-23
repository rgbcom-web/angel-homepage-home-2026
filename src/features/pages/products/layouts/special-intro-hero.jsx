"use client";

import { cn } from "@/shared/lib/utils";
import { useRef, useEffect } from "react";
import { Container } from "@/features/layout";
import { ScrollIconVertical } from "@/features/global-ui";
import { easing } from "@/shared/motion/variables";

export function SpecialIntroHeroWrapper({
  children,
  className,
  ref,
  scrollIconRevealDelay,
  inView,
  video,
  mobileVideo,
  poster,
  mobilePoster,
}) {
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  useEffect(() => {
    if (inView) {
      videoRef.current && videoRef.current.play();
      mobileVideoRef.current && mobileVideoRef.current.play();
    } else {
      videoRef.current && videoRef.current.pause();
      videoRef.current && (videoRef.current.currentTime = 0);
      mobileVideoRef.current && mobileVideoRef.current.pause();
      mobileVideoRef.current && (mobileVideoRef.current.currentTime = 0);
    }
  }, [inView]);

  return (
    <div className={cn("h-[100svh]", className?.root)} ref={ref}>
      {video && (
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full",
            "bg-black after:absolute after:inset-0 after:h-full after:w-full after:bg-black/30 after:mix-blend-overlay after:content-['']",
            "before:absolute before:inset-0 before:h-full before:w-full before:bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_50%)] before:content-['']",
          )}>
          <video
            ref={videoRef}
            className={cn(
              "absolute left-0 top-0 h-full w-full object-cover",
              mobileVideo && "tablet:portrait:hidden",
              className?.video,
            )}
            muted
            loop
            playsInline
            poster={poster}>
            <source src={video} type="video/mp4" />
          </video>
          {mobileVideo && (
            <video
              ref={mobileVideoRef}
              className={cn(
                "hidden object-cover",
                "mx-auto h-full w-full",
                "tablet:portrait:block",
                className?.mobileVideo,
              )}
              muted
              loop
              playsInline
              poster={mobilePoster}>
              <source src={mobileVideo} type="video/mp4" />
            </video>
          )}
        </div>
      )}
      <Container
        fixed={false}
        className={cn(
          "relative flex h-full items-center",
          "tablet:portrait:flex-col-reverse tablet:portrait:justify-center tablet:portrait:gap-10 tablet:portrait:pb-[150px] tablet:portrait:pt-[100px]",
          mobileVideo && "tablet:portrait:justify-start",
          "mobile:!gap-5 mobile:!py-[100px]",
          className?.container,
        )}>
        {children}
        <ScrollIconVertical
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50, x: "-50%" }}
          transition={{
            delay: inView ? scrollIconRevealDelay : 0,
            duration: 0.5,
            ease: easing.pop,
          }}
        />
      </Container>
    </div>
  );
}

export function SpecialIntroHeroContent({ children, className }) {
  return (
    <div
      className={cn(
        "flex h-1/2 max-h-[420px] w-1/2 flex-col items-start justify-between gap-8",
        "tablet:h-auto tablet:w-full",
        "tablet:landscape:gap-y-20",
        "tablet:portrait:max-h-none tablet:portrait:items-center tablet:portrait:text-center",
        className,
      )}>
      {children}
    </div>
  );
}

export function SpecialIntroHeroHeader({ children, className }) {
  return <div className={cn("space-y-1", className)}>{children}</div>;
}

export function SpecialIntroHeroTitle({ children, className }) {
  return (
    <h1
      className={cn(
        "text-[74px]/[1.3] font-bold text-white",
        "tablet:text-5xl",
        "tablet:portrait:text-6xl",
        "mobile:!text-3xl",
        className,
      )}>
      {children}
    </h1>
  );
}

export function SpecialIntroHeroSubtitle({ children, className }) {
  return (
    <span
      className={cn(
        "block text-2xl font-medium text-[#9C9C9C]",
        "tablet:text-xl",
        "tablet:portrait:text-2xl",
        "mobile:!text-base/[1.3]",
        className,
      )}>
      {children}
    </span>
  );
}
