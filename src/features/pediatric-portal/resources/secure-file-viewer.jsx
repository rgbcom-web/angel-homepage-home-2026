"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "../portal-context";
import { formatMemberDisplayName } from "../mock-data";
import { PdfDocumentViewer } from "./pdf-document-viewer";

/**
 * 보안 뷰어
 * - 첨부 목록(위) + 선택 파일 뷰어(아래)
 * - PDF는 전체 페이지를 렌더해 스크롤로 끝까지 열람
 * - 투명 쉴드로 우클릭·인쇄 메뉴 차단, 휠은 바깥 컨테이너로 전달
 */
export function SecureFileViewer({ resource }) {
  const { member } = usePediatricPortal();
  const scrollRef = useRef(null);
  const files = useMemo(() => {
    if (Array.isArray(resource?.files) && resource.files.length) return resource.files;
    if (resource?.fileUrl) {
      return [
        {
          name: resource.fileName || "첨부 1",
          type: resource.fileType || "pdf",
          fileUrl: resource.fileUrl,
        },
      ];
    }
    return [];
  }, [resource]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = files[activeIndex] || files[0] || null;

  useEffect(() => {
    setActiveIndex(0);
  }, [resource?.id]);

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

  const isImage = active?.type === "image";
  const isPdf = active?.type === "pdf";

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
    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!active) {
    return (
      <div className={cn("rounded-2xl border border-[#E2E8F0] bg-white py-16 text-center text-sm text-[#94A3B8]")}>
        등록된 첨부 파일이 없습니다.
      </div>
    );
  }

  return (
    <div className={cn("space-y-3")} onContextMenu={blockMenu}>
      {files.length > 0 && (
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white",
            "select-none",
          )}
          onContextMenu={blockMenu}
          onDragStart={blockMenu}>
          <div className={cn("border-b border-[#E2E8F0] px-4 py-3")}>
            <p className={cn("text-sm font-semibold text-[#0F172A]")}>첨부 파일</p>
            <p className={cn("mt-0.5 text-xs text-[#94A3B8]")}>
              파일을 선택하면 아래 뷰어에서 열람됩니다.
            </p>
          </div>
          <ul className={cn("divide-y divide-[#F1F5F9]")}>
            {files.map((file, index) => {
              const selected = index === activeIndex;
              return (
                <li key={`${file.fileUrl}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onContextMenu={blockMenu}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                      selected ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]",
                    )}>
                    <span
                      className={cn(
                        "inline-flex h-8 w-10 shrink-0 items-center justify-center rounded text-[11px] font-bold",
                        file.type === "image"
                          ? "bg-[#FEF3C7] text-[#B45309]"
                          : "bg-[#DBEAFE] text-[#1D4ED8]",
                      )}>
                      {file.type === "image" ? "IMG" : "PDF"}
                    </span>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm",
                        selected ? "font-semibold text-[#1D4ED8]" : "text-[#334155]",
                      )}>
                      {file.name || `첨부 ${index + 1}`}
                    </span>
                    {selected && (
                      <span className={cn("shrink-0 text-xs font-semibold text-[#2563EB]")}>
                        열람 중
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

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
                key={active.fileUrl}
                src={active.fileUrl}
                alt={active.name || resource.title}
                draggable={false}
                className={cn(
                  "pointer-events-none relative z-0 mx-auto max-h-none w-auto max-w-full object-contain",
                )}
                style={{ WebkitUserDrag: "none", userSelect: "none" }}
              />
            )}

            {isPdf && (
              <PdfDocumentViewer
                key={active.fileUrl}
                url={active.fileUrl}
                title={active.name || resource.title || "PDF"}
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
          워터마크로 표시됩니다. 스크롤하여 전체 내용을 확인할 수 있습니다.
        </div>
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
