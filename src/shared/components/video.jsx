"use client";

import { cn } from "@/shared/lib/utils";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export function Video({
  // 비디오 소스
  src,
  poster,

  // 재생 옵션
  autoplay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  // 인뷰 옵션
  inView = true,
  inViewOptions = {
    once: false,
    amount: 0.5,
    fallbackInView: true,
    rootMargin: "0px 0px 0px 0px",
  },
  className,
  ...props
}) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, inViewOptions);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isInView && inView) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isInView]);

  return (
    <video
      ref={videoRef}
      muted={muted}
      playsInline={playsInline}
      loop={loop}
      controls={controls}
      poster={poster}
      className={cn("h-auto w-full bg-black", className)}
      {...props}>
      {src && <source src={src} type="video/mp4" />}
    </video>
  );
}
