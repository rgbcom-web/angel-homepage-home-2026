"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "../portal-context";
import { formatMemberDisplayName } from "../mock-data";

/**
 * 보안 뷰어
 * - 원본 화질 유지 (img / PDF iframe)
 * - PDF는 iframe 포인터를 막고 투명 쉴드로 우클릭·인쇄 메뉴 차단
 * - 스크롤은 휠을 바깥 컨테이너로 전달
 */
export function SecureFileViewer({ resource }) {
  const { member } = usePediatricPortal();
  const scrollRef = useRef(null);

  const watermarkText = useMemo(() => {
    const name = member?.name
      ? formatMemberDisplayName(member)
      : "Pediatric KOL Portal";
    const loginId = member?.loginId || member?.email || "user";
    return `${name} / ${loginId}`;
  }, [member]);

  useEffect(() => {
    const prevent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["p", "s", "c", "u", "a"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const style = document.createElement("style");
    style.setAttribute("data-pediatric-secure-print", "true");
    style.textContent = `
      @media print {
        body.pediatric-secure-viewer {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    document.addEventListener("contextmenu", prevent, true);
    document.addEventListener("dragstart", prevent, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.body.classList.add("pediatric-secure-viewer");

    return () => {
      document.removeEventListener("contextmenu", prevent, true);
      document.removeEventListener("dragstart", prevent, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.classList.remove("pediatric-secure-viewer");
      style.remove();
    };
  }, []);

  const isImage = resource.fileType === "image";
  const isPdf = resource.fileType === "pdf";

  const blockMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onShieldWheel = (e) => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    scroller.scrollTop += e.deltaY;
    scroller.scrollLeft += e.deltaX;
  };

  const onShieldMouseDown = (e) => {
    // 우클릭 / 가운데 버튼 기본 동작 차단
    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0F172A] select-none",
      )}
      onContextMenu={blockMenu}
      onCopy={blockMenu}
      onCut={blockMenu}>
      <div className={cn("relative isolate h-[75vh] min-h-[70vh]")}>
        <div ref={scrollRef} className={cn("h-full overflow-auto")}>
          {isImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={resource.fileUrl}
              alt={resource.title}
              draggable={false}
              className={cn(
                "pointer-events-none relative z-0 mx-auto max-h-[75vh] w-auto max-w-full object-contain",
              )}
              style={{ WebkitUserDrag: "none", userSelect: "none" }}
            />
          )}

          {isPdf && (
            <iframe
              title={resource.title}
              src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className={cn(
                "pointer-events-none relative z-0 w-full border-0 bg-white",
                "min-h-[75vh] h-[2400px]",
              )}
              tabIndex={-1}
            />
          )}

          {!isImage && !isPdf && (
            <div
              className={cn(
                "relative z-0 flex h-[50vh] items-center justify-center text-white/70",
              )}>
              미리보기를 지원하지 않는 파일 형식입니다.
            </div>
          )}
        </div>

        {/* PDF/이미지 위 투명 쉴드 — 우클릭·인쇄 메뉴가 iframe에 닿지 않게 함 */}
        <div
          aria-hidden
          className={cn("absolute inset-0 z-10")}
          onContextMenu={blockMenu}
          onMouseDown={onShieldMouseDown}
          onWheel={onShieldWheel}
          onDragStart={blockMenu}
        />

        <WatermarkOverlay text={watermarkText} />
      </div>

      <div
        className={cn(
          "relative z-20 border-t border-white/10 bg-[#0B1220] px-4 py-3 text-center text-xs text-white/60",
        )}>
        이 자료는 열람 전용입니다. 다운로드·인쇄·복사가 제한되며, 화면에는 이용자 정보가
        워터마크로 표시됩니다.
      </div>
    </div>
  );
}

function WatermarkOverlay({ text }) {
  const tiles = Array.from({ length: 24 });

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-20 overflow-hidden")}
      aria-hidden>
      <div
        className={cn(
          "absolute inset-[-40%] grid rotate-[-28deg] grid-cols-2 gap-x-28 gap-y-36",
          "mobile:gap-x-16 mobile:gap-y-24",
        )}>
        {tiles.map((_, i) => (
          <span
            key={i}
            className={cn(
              "whitespace-nowrap text-center text-[32px] font-bold tracking-wide",
              "mobile:text-[24px]",
              "text-black/[0.07]",
              "[text-shadow:0_0_1px_rgba(255,255,255,0.32)]",
            )}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
