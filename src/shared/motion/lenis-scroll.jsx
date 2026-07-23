"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function LenisScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef();

  // RAF 함수를 useCallback으로 메모이제이션
  const raf = useCallback((time) => {
    lenisRef.current?.raf(time);
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Lenis 인스턴스 생성을 한 번만 수행
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        lerp: 0.2,
        smoothWheel: true,
        smoothTouch: {
          smooth: true,
          direction: "vertical",
          mouseMultiplier: 1,
          touchMultiplier: 1.5,
          mobileNative: false,
        },
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1.2,
        infinite: false,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [raf]);

  // 페이지 변경 시 스크롤 위치 초기화
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // shadcn Dialog 오픈시 스크롤 락 - scroll-area 제외
  useEffect(() => {
    const handleScrollLock = () => {
      if (document.body.dataset.scrollLocked === "1") {
        // 완전히 멈추지 않고, 스크롤 가능 영역 설정
        if (lenisRef.current) {
          // scroll-area 요소를 제외한 나머지 스크롤 락
          lenisRef.current.options.smoothWheel = false;

          // Dialog 내부의 scroll-area는 스크롤 허용
          const scrollableElements = document.querySelectorAll(
            '[data-scrollable="true"], .scroll-area, [data-radix-scroll-area-viewport]',
          );

          // Lenis의 wheelCallback 옵션 사용
          const originalWheelCallback = lenisRef.current.options.wheelCallback;
          lenisRef.current.options.wheelCallback = (e) => {
            // 이벤트가 발생한 요소가 .scroll-area 내부인지 확인
            let isScrollArea = false;
            let target = e.target;

            while (target) {
              if (
                Array.from(scrollableElements).some((el) => el.contains(target)) ||
                (target.classList &&
                  (target.classList.contains("scroll-area") ||
                    target.hasAttribute("data-radix-scroll-area-viewport")))
              ) {
                isScrollArea = true;
                break;
              }
              target = target.parentElement;
            }

            // scroll-area 내부면 이벤트 통과(스크롤 허용)
            if (isScrollArea) {
              return true;
            }

            // 원래 콜백 실행 (스크롤 차단)
            return originalWheelCallback ? originalWheelCallback(e) : false;
          };
        }
      } else {
        // Dialog가 닫히면 원래 상태로 복원
        if (lenisRef.current) {
          lenisRef.current.options.smoothWheel = true;
          lenisRef.current.options.wheelCallback = null;
          lenisRef.current.start();
        }
      }
    };

    // DOM 변화 감지
    const observer = new MutationObserver(handleScrollLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    // 클린업 함수
    return () => {
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
