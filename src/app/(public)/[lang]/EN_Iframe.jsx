"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";

export function IframeWithPostMessage() {
  const { lang } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // iframe에서 보내는 메시지 수신
    const handleMessage = (event) => {
      // 출처 검증 (보안상 중요)
      if (event.origin !== "https://sgmechatronics.mycafe24.com") return;

      const { type, path } = event.data;

      if (type === "pathChange") {
        // 경로에서 언어 코드 추출
        const pathParts = path.split("/").filter(Boolean);
        const iframeLang = pathParts[0]; // 첫 번째 경로 세그먼트

        // 현재 언어 추출
        const currentLang = pathname.split("/")[1];

        // 언어가 변경된 경우 경로 업데이트
        if (iframeLang && iframeLang !== lang) {
          const newPath = pathname.replace(`/${currentLang}`, `/${iframeLang}`);
          router.push(newPath);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [pathname, router]);

  return (
    <iframe
      src="https://sgmechatronics.mycafe24.com/en/"
      className="h-screen w-full"
      frameBorder="0"
    />
  );
}
