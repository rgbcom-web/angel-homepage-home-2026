import styles from "./ck-content.module.css";
import { cn } from "@/shared/lib/utils";

import React, { useMemo } from "react";

export default function CKContent({ content, className }) {
  const renderContent = useMemo(() => {
    const oEmbedUrlRegex = /<oembed url="(.+?)"><\/oembed>/gi;

    return content.replace(oEmbedUrlRegex, (match, url) => {
      const youtubeMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/i,
      );
      if (youtubeMatch) {
        return `<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      }

      const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/i);
      if (vimeoMatch) {
        return `<iframe class="w-full aspect-video" src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      }

      return url;
    });
  }, [content]);

  return (
    <div className={cn(styles.container, className)}>
      <div dangerouslySetInnerHTML={{ __html: renderContent }}></div>
    </div>
  );
}
