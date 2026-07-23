"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function ResponsiveImage({ src, tabletSrc, mobileSrc, alt = "", className, ...props }) {
  const { getValue } = useMediaQuery();

  const srcMap = {
    pc: src,
    tablet: tabletSrc,
    mobile: mobileSrc,
  };

  const imgSrc = getValue(srcMap);

  return <img src={imgSrc} alt={alt} className={cn(className)} {...props} />;
}

export function BackgroundImage({ src, alt = "", className, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      quality={100}
      priority
      className={cn("absolute inset-0 z-0 object-cover", className)}
      {...props}
    />
  );
}
