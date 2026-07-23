"use client";

import moment from "moment";
import { cn } from "@/shared/lib/utils";
import { ListEmpty } from "@/features/board/ui";
import { ArrowDownToLine, Loader } from "lucide-react";
import { Button } from "@/shared/shadcn/ui/button";
import { DownloadFileButton } from "@/service/api/download-file-button";

export function List({ list }) {
  return (
    <div className={cn("border-y border-black", "tablet:border-y")}>
      <ul>
        {list?.map((item) => (
          <li key={item.id} className={cn("border-b border-dd-gray-light/50")}>
            <DownloadFileButton
              file={item.attachments?.[0]}
              className={cn(
                "group grid w-full grid-cols-[80px_1fr_80px_150px] items-center gap-[20px] py-6 text-left text-xl",
                "tablet:grid-cols-[60px_1fr_60px_100px] tablet:gap-[10px] tablet:py-4 tablet:text-base",
                "mobile:grid-cols-[1fr_40px] mobile:gap-2",
                !item.attachments?.[0] && "pointer-events-none",
              )}>
              {({ pending }) => (
                <>
                  <span
                    className={cn(
                      "line-clamp-1 px-1 text-center font-semibold text-dd-gray",
                      "tablet:text-sm",
                      "mobile:hidden",
                    )}>
                    {item.no}
                  </span>
                  <span
                    className={cn(
                      "line-clamp-1 font-semibold group-hover:text-dd-blue group-hover:underline",
                    )}>
                    {item.title}
                  </span>
                  <span className={cn("text-right text-dd-gray", "tablet:text-sm")}>
                    <Button
                      size="icon"
                      variant={item.attachments?.[0] ? "outline-blue" : "gray-light"}
                      rounded={false}
                      asChild
                      className={cn(!item.attachments?.[0] && "pointer-events-none opacity-50")}>
                      <span>
                        {pending ? (
                          <Loader className={cn("animate-spin tablet:h-4 tablet:w-4")} />
                        ) : (
                          <ArrowDownToLine className={cn("tablet:h-4 tablet:w-4")} />
                        )}
                      </span>
                    </Button>
                  </span>
                  <span
                    className={cn("text-right text-dd-gray", "tablet:text-sm", "mobile:hidden")}>
                    {moment(item.created_at).format("YYYY.MM.DD")}
                  </span>
                </>
              )}
            </DownloadFileButton>
          </li>
        ))}
        {list.length === 0 && <ListEmpty />}
      </ul>
    </div>
  );
}
