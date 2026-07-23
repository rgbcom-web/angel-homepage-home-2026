"use client";

import { cn } from "@/shared/lib/utils";
import { useRef } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { WavyText, SlideIn } from "@/shared/motion/components";
import { BackgroundImage } from "@/shared/components/image";
import { Container } from "@/features/layout";
import { Video } from "@/shared/components/video";

export function BrandIntroHero({ title, subtitle, backgroundImage, backgroundVideo, buttons }) {
  const trackRef = useRef(null);
  const isInView = useInView(trackRef);

  const { scrollYProgress: trackProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  const sectionY = useTransform(trackProgress, [0, 1], ["0%", "20%"]);
  const titleY = useTransform(trackProgress, [0, 1], ["0%", "50%"]);
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
            {backgroundVideo ? (
              <div className={cn("relative h-full w-full")}>
                <Video
                  src={backgroundVideo.desktopSrc}
                  poster={backgroundVideo.desktopPoster}
                  loop
                  className={cn(
                    "block h-full w-full object-cover",
                    backgroundVideo.mobileSrc && "mobile:hidden",
                  )}
                  inViewOptions={{
                    once: false,
                    amount: 0.1,
                    fallbackInView: true,
                    rootMargin: "0px 0px 0px 0px",
                  }}
                />
                {backgroundVideo.mobileSrc && (
                  <Video
                    src={backgroundVideo.mobileSrc}
                    poster={backgroundVideo.mobilePoster}
                    loop
                    className={cn("hidden h-full w-full object-cover", "mobile:block")}
                    inViewOptions={{
                      once: false,
                      amount: 0.1,
                      fallbackInView: true,
                      rootMargin: "0px 0px 0px 0px",
                    }}
                  />
                )}
                <div className={cn("absolute inset-0 bg-black/50")} />
              </div>
            ) : (
              <BackgroundImage src={backgroundImage} />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: sectionY }}
        className={cn("absolute left-0 top-0 z-10 h-full w-full")}>
        <Container
          className={cn(
            "relative z-10 flex h-full items-center justify-center text-center text-white",
          )}>
          <div
            className={cn(
              "flex h-1/2 max-h-[500px] flex-col items-center justify-center gap-10",
              "tablet:max-h-[400px]",
              "mobile:max-h-[300px]",
            )}>
            <motion.h1
              style={{ y: titleY }}
              className={cn(
                "space-y-[0.1em] text-[104px]/[1.3] font-bold",
                "tablet:text-[72px]/[1.3]",
                "mobile:text-5xl/[1.3]",
              )}>
              <div>
                {title?.map((row, index) => (
                  <WavyText
                    key={index}
                    className={cn("block text-[0.29em] text-[#BFBFBF]")}
                    text={row}
                    splitParam=" "
                    trigger={isInView}
                  />
                ))}
              </div>
              <WavyText text={subtitle} initialDelay={0.4} trigger={isInView} />
            </motion.h1>
            {buttons && (
              <SlideIn
                direction="up"
                distance={100}
                duration={1}
                initialDelay={0.8}
                className={cn("mt-auto", "tablet:mt-0")}
                trigger={isInView}>
                <nav className={cn("flex gap-4", "tablet:gap-2")}>{buttons}</nav>
              </SlideIn>
            )}
          </div>
        </Container>
      </motion.div>
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 z-0 h-1/5 w-full bg-gradient-to-t from-dark-background/100 to-transparent",
        )}
      />
    </div>
  );
}

export function BrandSection({ children, className, ref }) {
  return (
    <section
      ref={ref}
      className={cn(
        "group overflow-hidden py-[120px] first:pt-0",
        "tablet:py-20 tablet:pb-0",
        "mobile:py-10 mobile:last:pb-0",
        className,
      )}>
      {children}
    </section>
  );
}

export function BrandSectionTitle({ children, className, theme = "blue" }) {
  const themeClassNames = {
    mint: "[&_b]:text-dd-mint",
    blue: "[&_b]:text-dd-blue",
  };

  return (
    <h2
      className={cn(
        "mb-[0.8em] text-[50px]/[1.2] font-bold",
        "tablet:text-4xl/[1.2]",
        "mobile:text-3xl/[1.2]",
        themeClassNames[theme],
        className,
      )}>
      {children}
    </h2>
  );
}

export function BrandSectionDescription({ children, className, theme = "blue" }) {
  const themeClassNames = {
    mint: "[&_b]:text-dd-mint",
    blue: "[&_b]:text-dd-blue",
  };

  return (
    <div
      className={cn(
        "space-y-7 text-[22px]/[1.55] text-[#BFBFBF]",
        "tablet:space-y-4 tablet:text-lg/[1.55]",
        "mobile:space-y-3 mobile:text-base/[1.55]",
        themeClassNames[theme],
        className,
      )}>
      {children}
    </div>
  );
}
