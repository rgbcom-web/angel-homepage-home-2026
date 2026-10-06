"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

/**
 * PDF 전체 페이지를 canvas로 렌더해 바깥 스크롤로 끝까지 열람 가능하게 함.
 * (고정 높이 iframe이 긴 PDF를 중간에서 자르던 문제 해결)
 */
export function PdfDocumentViewer({ url, title = "PDF" }) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("PDF를 불러오는 중…");
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!url) return undefined;

    let cancelled = false;
    let pdfDoc = null;
    const host = hostRef.current;

    async function render() {
      setStatus("loading");
      setMessage("PDF를 불러오는 중…");
      setPageCount(0);
      if (host) host.innerHTML = "";

      try {
        const pdfjs = await import("pdfjs-dist");
        // Next/Turbopack에서 worker 번들 이슈를 피하기 위해 CDN worker 사용
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const response = await fetch(url, {
          credentials: "same-origin",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("PDF를 불러오지 못했습니다.");
        }

        const data = await response.arrayBuffer();
        if (cancelled) return;

        pdfDoc = await pdfjs.getDocument({ data }).promise;
        if (cancelled) {
          await pdfDoc.destroy?.();
          return;
        }

        const containerWidth = Math.max(host?.clientWidth || 800, 320);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        setPageCount(pdfDoc.numPages);
        setMessage(`총 ${pdfDoc.numPages}페이지 렌더링 중…`);

        for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdfDoc.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const cssScale = containerWidth / baseViewport.width;
          const viewport = page.getViewport({ scale: cssScale * dpr });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.background = "#fff";
          if (pageNumber > 1) canvas.style.marginTop = "12px";
          canvas.setAttribute("aria-label", `${title} ${pageNumber}페이지`);
          canvas.className = "pointer-events-none";

          const context = canvas.getContext("2d", { alpha: false });
          await page.render({ canvasContext: context, viewport }).promise;
          page.cleanup?.();
          if (cancelled) return;

          host?.appendChild(canvas);
          setMessage(`${pageNumber} / ${pdfDoc.numPages} 페이지`);
        }

        if (!cancelled) {
          setStatus("ready");
          setMessage("");
        }
      } catch (error) {
        console.error("[PdfDocumentViewer]", error);
        if (!cancelled) {
          setStatus("error");
          setMessage(error?.message || "PDF를 표시하지 못했습니다.");
        }
      }
    }

    render();

    return () => {
      cancelled = true;
      if (hostRef.current) hostRef.current.innerHTML = "";
      try {
        pdfDoc?.destroy?.();
      } catch {
        // ignore destroy errors during unmount
      }
    };
  }, [url, title]);

  return (
    <div className={cn("relative w-full bg-white")}>
      {status !== "ready" && (
        <div
          className={cn(
            "flex min-h-[50vh] items-center justify-center px-4 text-center text-sm",
            status === "error" ? "text-red-600" : "text-[#64748B]",
          )}>
          {message}
        </div>
      )}
      <div
        ref={hostRef}
        className={cn(status === "ready" ? "block" : "hidden")}
        data-page-count={pageCount || undefined}
      />
    </div>
  );
}
