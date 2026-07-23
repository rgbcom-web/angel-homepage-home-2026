"use client";

import { cn } from "@/shared/lib/utils";
import { Thumbnail } from "@/features/board/ui";
import { DownloadRequestDialog, DownloadRequestDialogContent } from "./download-request-dialog";
import { DownloadRequestForm } from "./download-request-form";

export function DownloadItem({ item, title, themes }) {
  return (
    <DownloadRequestDialog
      item={item}
      dialogTrigger={
        <div className={cn("group flex h-full w-full flex-col border-b border-[#D1D1D1]")}>
          <div
            className={cn(
              "relative overflow-hidden rounded-lg border border-dd-gray-light/50",
              "transition duration-300",
              "group-hover:translate-y-[-10px]",
            )}>
            <Thumbnail
              src={item.thumbnail?.url}
              className={cn("aspect-[273/384]")}
              width={273}
              height={384}
            />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                themes[title].overlay,
              )}>
              <div
                className={cn(
                  "scale-50 transition-transform duration-300 group-hover:scale-100",
                  themes[title].overlayIcon,
                )}>
                <OverlayIcon />
              </div>
            </div>
          </div>
          <div className={cn("py-5", "tablet:py-4")}>
            <span
              className={cn(
                "mb-[0.5em] block text-lg/[1] font-bold uppercase",
                "tablet:text-sm/[1]",
                themes[title].tag,
              )}>
              {title}
            </span>
            <span
              className={cn(
                "block break-normal text-lg/[1.4]",
                "tablet:text-base/[1.4]",
                "mobile:text-sm/[1.4]",
              )}>
              {item.title}
            </span>
          </div>
        </div>
      }
      dialogContent={
        <DownloadRequestDialogContent>
          <DownloadRequestForm item={item} />
        </DownloadRequestDialogContent>
      }
    />
  );
}

function OverlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="74"
      viewBox="0 0 74 74"
      className={cn("tablet:h-12 tablet:w-12")}>
      <circle id="타원_506" data-name="타원 506" cx="37" cy="37" r="37" fill="#fff" />
      <path
        d="M11.739,2.44,1.359,12.844a.913.913,0,0,1-.536.227.667.667,0,0,1-.557-.231.712.712,0,0,1-.01-1.1L11.58.414A1.511,1.511,0,0,1,12.011.1a1.192,1.192,0,0,1,.505-.1,1.173,1.173,0,0,1,.5.1,1.526,1.526,0,0,1,.428.309L24.77,11.737a.787.787,0,0,1,.237.527.757.757,0,0,1-.237.576.8.8,0,0,1-.558.258.7.7,0,0,1-.525-.258l-10.4-10.4V24.323a.774.774,0,1,1-1.548,0Z"
        transform="translate(49.533 46.087) rotate(180)"
        fill="currentColor"
      />
      <line
        x2="25.098"
        transform="translate(24.022 53.116)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  );
}
