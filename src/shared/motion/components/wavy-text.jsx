"use client";

import { cn } from "@/shared/lib/utils";
import { motion, useInView, useAnimation } from "framer-motion";
import { easing } from "@/shared/motion/variables";
import { useEffect, useRef, Children, isValidElement, cloneElement } from "react";

export function WavyText({
  text,
  children,
  splitParam = "",
  trigger,
  className,
  y = 150,
  duration = 1,
  initialDelay = 0,
  delayAcc = 0.03,
  useInViewOption = true,
  inViewOptions = { once: false, amount: 0.5, fallbackInView: true, rootMargin: "0px 0px 0px 0px" },
  resetDuration = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, inViewOptions);
  const controls = useAnimation();

  useEffect(() => {
    if (trigger || (useInViewOption && isInView)) {
      controls.start((i) => ({
        y: 0,
        transition: {
          ease: easing.pop,
          duration,
          delay: i * delayAcc + initialDelay,
        },
      }));
    } else if (!trigger || (useInViewOption && !isInView)) {
      controls.start((i) => ({
        y: y,
        transition: {
          duration: resetDuration ? duration : 0.1,
          delay: resetDuration ? i * delayAcc + initialDelay : 0,
        },
      }));
    }
  }, [
    trigger,
    isInView,
    useInViewOption,
    controls,
    delayAcc,
    duration,
    initialDelay,
    y,
    resetDuration,
  ]);

  // 문자열 처리 함수
  const animateText = (content) => {
    if (typeof content !== "string") return content;

    const array =
      splitParam === " "
        ? content.split(/(\s+)/)
        : splitParam
          ? content.split(splitParam)
          : content.split("");

    return array.map((word, index) => (
      <motion.span
        key={index}
        custom={index}
        initial={{ y }}
        animate={controls}
        className={cn("inline-block", word === " " && "w-[0.3em]")}>
        {word}
      </motion.span>
    ));
  };

  return (
    <div ref={ref} className={cn("inline-block overflow-hidden", className)}>
      {children ? (
        // children이 배열이나 React 요소인 경우 (JSX)
        typeof children === "object" ? (
          // 각 자식 요소마다 WavyTextWrapper로 감싸기
          <WavyTextWrapper controls={controls} y={y} animateText={animateText}>
            {children}
          </WavyTextWrapper>
        ) : (
          // 단순 문자열인 경우 직접 애니메이션 적용
          animateText(children)
        )
      ) : (
        // text prop 사용 (기존 방식)
        animateText(text)
      )}
    </div>
  );
}

// 자식 요소를 재귀적으로 처리하는 컴포넌트
function WavyTextWrapper({ children, controls, y, animateText }) {
  return Children.map(children, (child, index) => {
    // 문자열/숫자인 경우 직접 애니메이션 적용
    if (typeof child === "string" || typeof child === "number") {
      return animateText(String(child));
    }

    if (isValidElement(child)) {
      if (!child.props.children || typeof child.props.children === "string") {
        return cloneElement(child, {
          ...child.props,
          children:
            typeof child.props.children === "string"
              ? animateText(child.props.children)
              : child.props.children,
        });
      }

      // 복잡한 자식 요소가 있는 경우 재귀 처리
      return cloneElement(child, {
        ...child.props,
        children: (
          <WavyTextWrapper controls={controls} y={y} animateText={animateText}>
            {child.props.children}
          </WavyTextWrapper>
        ),
      });
    }

    return child;
  });
}
