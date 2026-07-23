"use client";

import { useEffect, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { usePediatricPortal } from "../portal-context";
import { formatMemberDisplayName } from "../mock-data";

/**
 * 보안 뷰어
 * - 다운로드 버튼 미제공
 * - 인쇄 / 우클릭 / 단축키 제한 (브라우저 한계 내)
 * - 이용자 이름 + 아이디 워터마크 (PDF/이미지 위 오버레이)
 */
export function SecureFileViewer({ resource }) {
  const { member } = usePediatricPortal();

  const watermarkText = useMemo(() => {
    const name = member?.name
      ? formatMemberDisplayName(member)
      : "Pediatric KOL Portal";
    const loginId = member?.loginId || member?.email || "user";
    return `${name} / ${loginId}`;
  }, [member]);

  useEffect(() => {
    const prevent = (e) => e.preventDefault();

    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && ["p", "s", "c", "u", "a"].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("pediatric-secure-viewer");

    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("pediatric-secure-viewer");
    };
  }, []);

  const isImage = resource.fileType === "image";
  const isPdf = resource.fileType === "pdf";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#0F172A] select-none",
      )}
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}>
      <div className={cn("relative isolate min-h-[70vh]")}>
        {isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resource.fileUrl}
            alt={resource.title}
            draggable={false}
            className={cn("relative z-0 mx-auto max-h-[75vh] w-auto max-w-full object-contain")}
          />
        )}

        {isPdf && (
          <iframe
            title={resource.title}
            src={`${resource.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className={cn("relative z-0 h-[75vh] w-full border-0 bg-white")}
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

        {/* iframe/PDF 위에도 보이도록 별도 레이어 */}
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
  const tiles = Array.from({ length: 36 });

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden",
      )}
      aria-hidden>
      <div
        className={cn(
          "absolute inset-[-30%] grid rotate-[-28deg] grid-cols-3 gap-x-8 gap-y-20",
        )}>
        {tiles.map((_, i) => (
          <span
            key={i}
            className={cn(
              "whitespace-nowrap text-center text-[15px] font-bold tracking-wide",
              // PDF 흰 배경에서도 보이도록 어두운 톤 + 밝은 외곽선
              "text-black/[0.18]",
              "[text-shadow:0_0_1px_rgba(255,255,255,0.55),0_1px_2px_rgba(255,255,255,0.35)]",
            )}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
