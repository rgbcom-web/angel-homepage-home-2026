"use client";

import { useLang } from "@/shared/context/lang-provider";
import { cn } from "@/shared/lib/utils";
import { Container } from "@/features/layout";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { Video } from "@/shared/components/video";

export function SummaryVideo() {
  const { lang } = useLang();
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const { device } = useMediaQuery();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["pc", "tablet"].includes(device)
      ? [
          "inset(0% 50% 0% 50% round 30px)",
          "inset(0% 0% 0% 0% round 30px)",
          "inset(0% 0% 0% 0% round 30px)",
          "inset(0% 50% 0% 50% round 30px)",
        ]
      : [
          "inset(100% 0% 0% 0% round 20px)",
          "inset(0% 0% 0% 0% round 20px)",
          "inset(0% 0% 0% 0% round 20px)",
          "inset(0% 100% 0% 100% round 20px)",
        ],
  );

  return (
    <div ref={trackRef} className={cn("relative z-10 h-[225vh]")}>
      <div
        ref={sectionRef}
        className={cn("sticky top-0 flex h-screen items-center overflow-hidden")}>
        <Container className={cn("relative tablet:w-[calc(100%-100px)]")}>
          <motion.div style={{ clipPath }}>
            <Video
              src={`/images/products/angel-suit/h10/connected-healthcare-${lang}.mp4`}
              className={cn("h-auto w-full", "mobile:hidden")}
              inViewOptions={{
                once: false,
                amount: 0.1,
                fallbackInView: true,
                rootMargin: "0px 0px 0px 0px",
              }}
            />
            <Video
              src={`/images/products/angel-suit/h10/connected-healthcare-mo-${lang}.mp4`}
              className={cn("hidden h-auto w-full", "mobile:block")}
              inViewOptions={{
                once: false,
                amount: 0.1,
                fallbackInView: true,
                rootMargin: "0px 0px 0px 0px",
              }}
            />
          </motion.div>
        </Container>
      </div>
    </div>
  );
}
