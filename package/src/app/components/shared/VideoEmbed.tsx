"use client";

/** Become Private + SOV 101 — Google Drive */
export const BECOME_PRIVATE_DRIVE_VIDEO_ID = "1_zji-DvTUwqY-ss1l3HA3JBFwQgbNSQp";
export const BECOME_PRIVATE_DRIVE_VIEW_URL =
  "https://drive.google.com/file/d/1_zji-DvTUwqY-ss1l3HA3JBFwQgbNSQp/view";
export const BECOME_PRIVATE_DRIVE_PREVIEW_URL =
  "https://drive.google.com/file/d/1_zji-DvTUwqY-ss1l3HA3JBFwQgbNSQp/preview";

/** Add your YouTube video ID or full URL here for inline playback on the page */
export const BECOME_PRIVATE_YOUTUBE_VIDEO_ID = "";

export const BECOME_PRIVATE_VIDEO_POSTER =
  "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883855/creditor-website-assets/images/projects/projectlist/freshman.jpg";

type VideoEmbedProps = {
  title?: string;
  className?: string;
  youtubeId?: string;
  driveFileId?: string;
  /** Full Drive view URL (optional; built from file id if omitted) */
  driveViewUrl?: string;
  posterSrc?: string;
};

function resolveYoutubeId(input?: string): string | null {
  if (!input?.trim()) return null;
  const value = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1).split("/")[0] || null;
    }
    const v = url.searchParams.get("v");
    if (v) return v;
    const embed = url.pathname.match(/\/embed\/([^/?]+)/);
    if (embed?.[1]) return embed[1];
  } catch {
    return null;
  }
  return null;
}

export default function VideoEmbed({
  title = "Course video",
  className = "",
  youtubeId,
  driveFileId,
  driveViewUrl,
  posterSrc = BECOME_PRIVATE_VIDEO_POSTER,
}: VideoEmbedProps) {
  const ytId = resolveYoutubeId(youtubeId);

  if (ytId) {
    return (
      <div className={className}>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${ytId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    );
  }

  const fileId = driveFileId?.trim();
  if (!fileId) return null;

  const viewUrl =
    driveViewUrl?.trim() ||
    (fileId === BECOME_PRIVATE_DRIVE_VIDEO_ID
      ? BECOME_PRIVATE_DRIVE_VIEW_URL
      : `https://drive.google.com/file/d/${fileId}/view`);
  const previewUrl =
    fileId === BECOME_PRIVATE_DRIVE_VIDEO_ID
      ? BECOME_PRIVATE_DRIVE_PREVIEW_URL
      : `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className={className}>
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl ring-1 ring-slate-200/80 dark:ring-slate-700">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          src={previewUrl}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="mt-3 text-center text-sm text-slate-600 dark:text-slate-400">
        Video not playing?{" "}
        <a
          href={viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 dark:text-blue-400 underline hover:no-underline"
        >
          Open Become Private + SOV 101 in Google Drive
        </a>
      </p>
    </div>
  );
}
