"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SCHEDULE_IMAGE = "/images/pop-up/schedule.png";

export interface EventPopupProps {
  delayMs?: number;
  disableAutoOpen?: boolean;
  manualTrigger?: number;
}

export default function EventPopup({
  delayMs = 15000,
  disableAutoOpen = false,
  manualTrigger = 0,
}: EventPopupProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disableAutoOpen) return;
    if (delayMs <= 0) {
      setOpen(true);
      return;
    }
    const timeout = window.setTimeout(() => setOpen(true), delayMs);
    return () => window.clearTimeout(timeout);
  }, [delayMs, disableAutoOpen]);

  useEffect(() => {
    if (manualTrigger > 0) setOpen(true);
  }, [manualTrigger]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        background: "rgba(10,20,40,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Weekly class schedule"
        style={{
          position: "relative",
          display: "inline-flex",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        <Image
          src={SCHEDULE_IMAGE}
          alt="Creditor Academy weekly class schedule"
          width={639}
          height={628}
          priority
          sizes="(max-width: 671px) calc(100vw - 32px), 639px"
          style={{
            display: "block",
            width: "auto",
            height: "auto",
            maxWidth: "calc(100vw - 32px)",
            maxHeight: "calc(100vh - 32px)",
            objectFit: "contain",
            borderRadius: 12,
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          }}
        />
        <button
          type="button"
          aria-label="Close schedule"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "grid",
            width: 36,
            height: 36,
            placeItems: "center",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "50%",
            background: "rgba(15,23,42,0.7)",
            color: "#fff",
            fontSize: 24,
            lineHeight: 1,
            cursor: "pointer",
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
