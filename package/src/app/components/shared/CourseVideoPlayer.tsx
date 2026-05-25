"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type VideoEmbed from "./VideoEmbed";

export type CourseVideoPlayerProps = ComponentProps<typeof VideoEmbed>;

function VideoSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="w-full aspect-video rounded-2xl bg-slate-200/90 dark:bg-slate-800/90 animate-pulse ring-1 ring-slate-200/80 dark:ring-slate-700" />
    </div>
  );
}

/** Client-only player — avoids SSR/client HTML mismatch during dev HMR and for embeds */
const VideoEmbedClient = dynamic(() => import("./VideoEmbed"), {
  ssr: false,
  loading: () => <VideoSkeleton />,
});

export default function CourseVideoPlayer({
  className = "",
  ...props
}: CourseVideoPlayerProps) {
  return (
    <div className={className}>
      <VideoEmbedClient {...props} className="w-full" />
    </div>
  );
}
