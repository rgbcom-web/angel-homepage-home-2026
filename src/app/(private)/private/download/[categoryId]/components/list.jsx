"use client";

import { cn } from "@/shared/lib/utils";
import { Thumbnail } from "@/features/board/ui";
import { DownloadFileButton } from "@/service/api/download-file-button";
import { Loader } from "lucide-react";

export function DownloadList({ data }) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-[40px]",
        "tablet:gap-[20px]",
        "mobile:flex mobile:gap-[12px]",
      )}>
      {data.map((item) => (
        <div
          key={item.id}
          className={cn(
            "w-[calc((100%-120px)/4)]",
            "tablet:w-[calc((100%-40px)/3)]",
            "mobile:w-[calc((100%-24px)/2)]",
          )}>
          <DownloadItem {...item} />
        </div>
      ))}
    </div>
  );
}

function DownloadItem({ thumbnail, title, attachment }) {
  return (
    <DownloadFileButton
      file={attachment}
      className={cn("group flex flex-col border-b border-[#D1D1D1]")}>
      {({ pending }) => (
        <>
          <div
            className={cn(
              "relative overflow-hidden rounded-lg border border-dd-gray-light/50",
              "transition duration-300",
              "group-hover:translate-y-[-10px]",
            )}>
            <Thumbnail
              src={thumbnail?.url}
              width={700}
              height={960}
              className={cn("aspect-[700/960] w-[700px]")}
            />
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "opacity-100 transition-opacity duration-300 group-hover:opacity-100",
              )}>
              <div
                className={cn(
                  "flex h-[74px] w-[74px] items-center justify-center rounded-full text-white",
                  "tablet:h-[70px] tablet:w-[70px]",
                  "mobile:h-[60px] mobile:w-[60px]",
                  "bg-dd-blue/80",
                )}>
                {pending ? (
                  <Loader className={cn("h-10 w-10 animate-spin", "tablet:h-1/2 tablet:w-1/2")} />
                ) : (
                  <OverlayIcon />
                )}
              </div>
            </div>
          </div>
          <div className={cn("py-5 text-center", "tablet:py-4")}>
            <span className={cn("block text-lg/[1.3] font-bold uppercase", "tablet:text-sm/[1.3]")}>
              {title}
            </span>
          </div>
        </>
      )}
    </DownloadFileButton>
  );
}

function OverlayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="74"
      height="74"
      viewBox="0 0 74 74"
      className={cn("tablet:h-[70px] tablet:w-[70px]", "mobile:h-[60px] mobile:w-[60px]")}>
      <circle
        id="타원_506"
        data-name="타원 506"
        cx="37"
        cy="37"
        r="37"
        fill=""
        className={cn("fill-transparent")}
      />
      <path
        d="M11.739,2.44,1.359,12.844a.913.913,0,0,1-.536.227.667.667,0,0,1-.557-.231.712.712,0,0,1-.01-1.1L11.58.414A1.511,1.511,0,0,1,12.011.1a1.192,1.192,0,0,1,.505-.1,1.173,1.173,0,0,1,.5.1,1.526,1.526,0,0,1,.428.309L24.77,11.737a.787.787,0,0,1,.237.527.757.757,0,0,1-.237.576.8.8,0,0,1-.558.258.7.7,0,0,1-.525-.258l-10.4-10.4V24.323a.774.774,0,1,1-1.548,0Z"
        transform="translate(49.533 46.087) rotate(180)"
        fill="currentColor"
        className={cn("fill-white")}
      />
      <line
        x2="25.098"
        transform="translate(24.022 53.116)"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1"
        className={cn("stroke-white")}
      />
    </svg>
  );
}
