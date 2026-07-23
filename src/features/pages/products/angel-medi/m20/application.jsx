"use client";

import { ApplicationPC } from "./application-pc";
import { ApplicationMobile } from "./application-mobile";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export function Application() {
  const { device } = useMediaQuery();

  return device === "pc" ? <ApplicationPC /> : <ApplicationMobile />;
}
