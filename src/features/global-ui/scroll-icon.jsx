"use client";

import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

export function ScrollIconVertical({ className, ...props }) {
  return (
    <motion.div
      className={cn(
        "absolute bottom-[50px] left-1/2 flex -translate-x-1/2 flex-col items-center justify-center text-center",
        "gap-1",
        "mobile:bottom-[20px] mobile:text-sm",
        className,
      )}
      {...props}>
      <b>Scroll</b>
      <div className={cn("text-[40px] mobile:text-[30px]")}>
        <ScrollIconVerticalArrow delay={0} />
        <ScrollIconVerticalArrow delay={0.15} className={cn("-mt-1")} />
      </div>
    </motion.div>
  );
}

function ScrollIconVerticalArrow({ className, delay, ...props }) {
  const arrowVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        times: [0, 0.3, 1],
        repeat: Infinity,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.svg
      variants={arrowVariants}
      initial="initial"
      animate="animate"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="0.3em"
      viewBox="0 0 34.263 13.171"
      className={cn(className)}
      {...props}>
      <path
        d="M0,32.867,11.856,16.434,0,0"
        transform="translate(33.565 0.698) rotate(90)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </motion.svg>
  );
}
