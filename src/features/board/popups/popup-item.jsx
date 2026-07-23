"use client";

import { useLang } from "@/shared/context/lang-provider";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import cookie from "react-cookies";
import CKContent from "@/shared/components/ck-editor/ck-content";

import { useAppContext } from "@/shared/context/app.context";

const styles = {
  container: cn(
    "absolute overflow-hidden rounded-2xl bg-dd-gray-lighter shadow-lg",
    "mobile:!left-[50%] mobile:!translate-x-[-50%] mobile:max-w-[calc(100%-30px)] mobile:!top-[60px]",
  ),
  content: cn("p-3", "mobile:p-2"),
  contentInner: cn("rounded-md overflow-hidden max-w-full"),
  nav: cn("grid grid-cols-2 divide-x border-t", "mobile:text-sm"),
  button: cn("p-2 text-gray-500 font-medium hover:bg-gray-50", "mobile:p-2"),
};

export function PopupItem({ data }) {
  const { homeCoverAnimationEnd } = useAppContext();
  const { id, content, top, left, width } = data;
  const popupId = `popup_${id}`;
  const [isHided, setIsHided] = useState(cookie.load(popupId));
  const [isClosed, setIsClosed] = useState(false);

  if (isHided || isClosed || !homeCoverAnimationEnd) {
    return null;
  }

  return (
    <div
      className={styles.container}
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}>
      <div className={styles.content}>
        <div className={styles.contentInner} style={{ width: `${width}px` }}>
          <CKContent content={content} className={cn("!text-base")} />
        </div>
      </div>
      <nav className={styles.nav}>
        <HideButton popupId={popupId} setIsHided={setIsHided} />
        <CloseButton setIsClosed={setIsClosed} />
      </nav>
    </div>
  );
}

function HideButton({ popupId, setIsHided }) {
  const { langContent } = useLang();
  const handleClick = () => {
    const expires = new Date();
    expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
    cookie.save(popupId, "hidden", {
      path: "/",
      expires,
      secure: false,
      httpOnly: false,
    });

    setIsHided(cookie.load(popupId) === "hidden");
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {langContent({
        ko: "오늘 하루 숨김",
        en: "Hide today",
      })}
    </button>
  );
}

function CloseButton({ setIsClosed }) {
  const { langContent } = useLang();
  const handleClick = () => setIsClosed(true);
  return (
    <button className={styles.button} onClick={handleClick}>
      {langContent({
        ko: "닫기",
        en: "Close",
      })}
    </button>
  );
}
