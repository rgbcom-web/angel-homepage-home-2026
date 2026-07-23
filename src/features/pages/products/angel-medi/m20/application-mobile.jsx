"use client";

import { cn } from "@/shared/lib/utils";
import { ApplicationMobileSection1 } from "./application-mobile-section-1";
import { ApplicationMobileSection2 } from "./application-mobile-section-2";

export function ApplicationMobile() {
  return (
    <div className={cn("bg-white text-black")}>
      <ApplicationMobileSection1 />
      <ApplicationMobileSection2 />
    </div>
  );
}
