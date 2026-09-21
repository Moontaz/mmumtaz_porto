"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v", ".ogv"];

export function isVideoSource(src: string) {
   const path = src.split("?")[0]?.toLowerCase() ?? "";
   return VIDEO_EXTENSIONS.some((extension) => path.endsWith(extension));
}

type ProjectMediaProps = {
   src: string;
   alt: string;
   sizes: string;
   className?: string;
   priority?: boolean;
};

/**
 * Renders a project thumbnail as either a video or an image.
 * Both variants fill the same parent box, so swapping a still for a
 * clip never changes the layout.
 */
export function ProjectMedia({
   src,
   alt,
   sizes,
   className,
   priority = false,
}: ProjectMediaProps) {
   const mediaClassName = cn("object-cover", className);

   if (isVideoSource(src)) {
      return (
         <video
            src={src}
            className={mediaClassName}
            style={{
               position: "absolute",
               inset: 0,
               width: "100%",
               height: "100%",
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            draggable={false}
            aria-label={alt}
         />
      );
   }

   return (
      <Image
         src={src}
         alt={alt}
         fill
         sizes={sizes}
         className={mediaClassName}
         draggable={false}
         priority={priority}
      />
   );
}
