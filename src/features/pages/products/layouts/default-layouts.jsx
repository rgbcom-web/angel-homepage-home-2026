"use client";

import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { BackgroundImage } from "@/shared/components/image";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { WavyText } from "@/shared/motion/components";

export function ProductContentWrapper({ children, className }) {
  return (
    <div
      className={cn(
        "space-y-[154px] bg-dark-background pb-[245px] text-white",
        "has-[.wrapper-no-padding-bottom]:pb-0",
        "tablet:space-y-28 tablet:pb-32",
        "mobile:space-y-20 mobile:pb-28",
        className,
      )}>
      {children}
    </div>
  );
}

export function ProductIntroHero({ title, subtitle, backgroundImage }) {
  const trackRef = useRef(null);
  const isInView = useInView(trackRef);

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(trackProgress, [0, 1], ["0%", "60%"]);
  const bgOpacity = useTransform(trackProgress, [0, 1], [1, 0]);
  const bgY = useTransform(trackProgress, [0, 1], ["0%", "50%"]);
  const bgScale = useTransform(trackProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={trackRef} className={cn("relative h-screen w-full overflow-hidden")}>
      <motion.div style={{ y: sectionY }} className={cn("relative h-full w-full")}>
        <motion.div
          initial={{ clipPath: "inset(30% 30% 30% 30% round 30px)" }}
          animate={{ clipPath: "inset(0 0 0 0 round 0px)" }}
          transition={{ duration: 0.7, delay: 0.3, ease: easing.popDelay }}
          className={cn("absolute inset-0 h-full w-full overflow-hidden")}>
          <motion.div
            className={cn("h-full w-full")}
            style={{ opacity: bgOpacity, y: bgY, scale: bgScale }}>
            <BackgroundImage src={backgroundImage} />
          </motion.div>
        </motion.div>
        <Container
          className={cn(
            "relative z-10 flex h-full items-center justify-center text-center text-white",
          )}>
          <h1
            className={cn(
              "space-y-[0.1em] text-[88px]/[1.3] font-bold",
              "tablet:text-[72px]/[1.3]",
              "mobile:text-5xl/[1.3]",
            )}>
            <WavyText
              className={cn("block text-[0.43em]")}
              text={title}
              useInViewOption
              splitParam=" "
              trigger={isInView}
            />
            <WavyText
              text={subtitle}
              useInViewOption
              initialDelay={0.4}
              className={cn("block")}
              trigger={isInView}
            />
          </h1>
        </Container>
      </motion.div>
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 h-1/5 w-full bg-gradient-to-t from-dark-background/100 to-transparent",
        )}
      />
    </div>
  );
}

export function ProductSection({ children, className, containerProps }) {
  return (
    <section className={cn("bg-dark-background", className)}>
      <Container
        {...containerProps}
        className={cn(
          "space-y-6",
          "tablet:space-y-4",
          "mobile:space-y-4",
          containerProps?.className,
        )}>
        {children}
      </Container>
    </section>
  );
}

export function ProductSectionHeader({ children, className }) {
  return (
    <div
      className={cn(
        "mb-[78px] space-y-8 last:!mb-0",
        "tablet:mb-8 tablet:space-y-6",
        "mobile:mb-6 mobile:space-y-4",
        className,
      )}>
      {children}
    </div>
  );
}

export function ProductSectionTitle({ children, titleTag = "h2", label, className }) {
  const TitleTag = titleTag;

  return (
    <TitleTag
      className={cn(
        "text-[46px]/[1.2] font-bold",
        "tablet:text-4xl/[1.2]",
        "mobile:text-3xl/[1.2]",
        className,
      )}>
      {label && <span className={cn("mb-[1em] block text-[0.5em] font-bold")}>{label}</span>}
      {children}
    </TitleTag>
  );
}

export function ProductSectionDescription({ children, className }) {
  return (
    <div
      className={cn(
        "space-y-3",
        "text-[22px]/[1.55] text-white/70",
        "tablet:text-xl",
        "mobile:text-lg",
        className,
      )}>
      {children}
    </div>
  );
}
