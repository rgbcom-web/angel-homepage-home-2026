"use client";

import { useCallback, useEffect, useState } from "react";

const SCRIPT_ID = "daum-postcode-script";
const SCRIPT_SRC = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

function loadDaumPostcodeScript() {
  if (typeof window === "undefined") return Promise.reject(new Error("window 없음"));
  if (window.daum?.Postcode) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("우편번호 스크립트 로드 실패")));
      if (window.daum?.Postcode) resolve();
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("우편번호 스크립트 로드 실패"));
    document.body.appendChild(script);
  });
}

export function useDaumPostcode() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadDaumPostcodeScript()
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, []);

  const openPostcode = useCallback((onComplete) => {
    if (!window.daum?.Postcode) {
      alert("우편번호 서비스를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete(data) {
        const address =
          data.userSelectedType === "R"
            ? data.roadAddress
            : data.jibunAddress;
        onComplete({
          zipCode: data.zonecode || "",
          address: address || "",
        });
      },
    }).open();
  }, []);

  return { ready, openPostcode };
}
