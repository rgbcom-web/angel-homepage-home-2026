"use client";

import { cn } from "@/shared/lib/utils";
import { motion, useInView, useAnimation } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useEffect, useRef } from "react";

export function SlideIn({
  children,
  className,
  direction = "up", // 'up', 'down', 'left', 'right'
  distance = "100%",
  duration = 1,
  initialDelay = 0,
  useInViewOption = true,
  inViewOptions = { once: false, amount: 0.5, fallbackInView: true, rootMargin: "0px 0px 0px 0px" },
  trigger,
  resetDuration = 0.1,
  resetDelay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, inViewOptions);
  const controls = useAnimation();

  // 방향에 따른 초기 위치 설정
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { y: distance, x: 0 };
    }
  };

  // 애니메이션 목표 위치
  const targetPosition = { x: 0, y: 0 };

  useEffect(() => {
    if (trigger || (useInViewOption && isInView)) {
      controls.start({
        ...targetPosition,
        transition: {
          ease: easing.pop,
          duration,
          delay: initialDelay,
        },
      });
    } else if (!trigger || (useInViewOption && !isInView)) {
      // 화면에서 벗어났을 때 초기 상태로 리셋
      controls.start({
        ...getInitialPosition(),
        transition: {
          duration: resetDuration, // 빠르게 초기화
          delay: resetDelay,
        },
      });
    }
  }, [isInView, useInViewOption, controls, duration, initialDelay, direction, distance, trigger]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div initial={getInitialPosition()} animate={controls} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
