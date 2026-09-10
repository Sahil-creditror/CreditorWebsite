"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WORKSHOP_REGISTER_URL } from "@/lib/workshop";

const TARGET_EVENT_MS = new Date("2026-09-12T11:00:00-07:00").getTime();
const EVENT_IMAGE = "/images/todayclasstopic/caworkshop_12.jpg";
const EVENT_DATE_LABEL = "Saturday, 12 September 2026";

export interface EventPopupProps {
  delayMs?: number;
  disableAutoOpen?: boolean;
  manualTrigger?: number;
}

function pad(n: number | string) {
  return String(n).padStart(2, "0");
}

function getCountdown(targetMs: number) {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function EventPopup({
  delayMs = 25000,
  disableAutoOpen = false,
  manualTrigger = 0,
}: EventPopupProps) {
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(() => getCountdown(TARGET_EVENT_MS));
  const dialogRef = useRef<HTMLDivElement>(null);

  // Auto-open after delay
  useEffect(() => {
    if (disableAutoOpen) return;
    const t = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs, disableAutoOpen]);

  // Manual trigger (gift button click)
  useEffect(() => {
    if (manualTrigger > 0) setOpen(true);
  }, [manualTrigger]);

  // Countdown ticker
  useEffect(() => {
    const tick = () => setCountdown(getCountdown(TARGET_EVENT_MS));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const { days, hours, minutes, seconds } = countdown;
  const isLive = Date.now() >= TARGET_EVENT_MS;

  return (
    /* ── Overlay ── */
    <div
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      data-event-popup="buy-your-house-with-a-credit-card"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        background: "rgba(10,20,40,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {/* ── Dialog ── */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ep-title"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "min(960px, calc(100vw - 24px))",
          maxHeight: "calc(100vh - 24px)",
          overflowY: "auto",
          borderRadius: "20px",
          background: "#ffffff",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          display: "grid",
          gridTemplateColumns: "1fr",
        }}
      >
        {/* Close button */}
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            zIndex: 10,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #e2e8f0",
            borderRadius: "50%",
            background: "#f8fafc",
            color: "#64748b",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* ── Responsive grid wrapper ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
          }}
          className="ep-inner-grid"
        >
          {/* ── Right: poster (top on mobile, right on desktop) ── */}
          <div
            style={{
              background: "#f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              borderRadius: "20px 20px 0 0",
            }}
            className="ep-right-panel"
          >
            <div style={{
              width: "100%",
              maxWidth: 320,
              aspectRatio: "1/1",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              background: "#fff",
            }}>
              <Image
                src={EVENT_IMAGE}
                alt={`Free Workshop: Buy Your House With A Credit Card — ${EVENT_DATE_LABEL}`}
                width={480}
                height={480}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* ── Left: content (bottom on mobile, left on desktop) ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              padding: "28px 24px 28px",
            }}
            className="ep-left-panel"
          >
            {/* Brand */}
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.04em", color: "#0052cc" }}>
                CREDITOR ACADEMY
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", color: "#0052cc" }}>
                PRIVATE MONTESSORI ASSOCIATION
              </p>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 10px", borderRadius: 6,
                fontSize: 10, fontWeight: 700,
                color: "#ea580c", background: "#fff7ed", border: "1px solid #ffedd5",
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#f97316", boxShadow: "0 0 6px #f97316", flexShrink: 0,
                }} />
                FREE WORKSHOP
              </span>
              <span style={{
                padding: "5px 10px", borderRadius: 6,
                fontSize: 10, fontWeight: 600,
                color: "#0284c7", background: "#f0f9ff", border: "1px solid #e0f2fe",
              }}>
                Sept 12, 2026 @ 11:00 AM PST
              </span>
            </div>

            {/* Title */}
            <h2 id="ep-title" style={{ margin: 0, fontSize: 26, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#0f172a" }}>
              BUY YOUR HOUSE{" "}
              <span style={{
                background: "linear-gradient(135deg,#0284c7,#0369a1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                WITH A CREDIT CARD
              </span>
            </h2>

            {/* Subtitle */}
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, color: "#475569" }}>
              0% Stacking • Business Credit • Property Without Waiting On A Bank
            </p>

            {/* Tags */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["0% STACKING", "BUSINESS CREDIT", "NO BANK WAITING", "SMART FUNDING"].map((t) => (
                <span key={t} style={{
                  padding: "8px 10px", borderRadius: 8,
                  fontSize: 11, fontWeight: 600, textAlign: "center",
                  color: "#1e293b", background: "#f1f5f9", border: "1px solid #e2e8f0",
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Countdown */}
            <div style={{
              padding: 16, borderRadius: 14,
              background: "#f0f9ff", border: "1px solid #e0f2fe",
            }}>
              {isLive ? (
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#0369a1", marginBottom: 6 }}>
                    LIVE NOW
                  </p>
                  <p style={{ margin: 0, color: "#0284c7", fontWeight: 700, fontSize: 15 }}>
                    Workshop is live — stream now
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ margin: "0 0 10px", textAlign: "center", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "#0369a1" }}>
                    STARTS IN
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <CBox value={days} label="Days" />
                    <Colon />
                    <CBox value={pad(hours)} label="Hrs" />
                    <Colon />
                    <CBox value={pad(minutes)} label="Min" />
                    <Colon />
                    <CBox value={pad(seconds)} label="Sec" />
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <a
              href={WORKSHOP_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "100%", padding: "14px 24px", borderRadius: 50,
                fontSize: 15, fontWeight: 800, color: "#fff", textDecoration: "none",
                background: "linear-gradient(90deg,#0284c7,#0052cc)",
                boxShadow: "0 4px 14px rgba(2,132,199,0.4)",
              }}
            >
              RESERVE YOUR FREE SEAT
            </a>
          </div>
        </div>

        {/* Responsive CSS via a <style> tag — does NOT use styled-jsx scoping */}
        <style>{`
          @media (min-width: 720px) {
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-inner-grid {
              grid-template-columns: 1.2fr 0.8fr !important;
              direction: rtl;
            }
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-inner-grid > * {
              direction: ltr;
            }
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-right-panel {
              border-radius: 0 20px 20px 0 !important;
              padding: 0 !important;
              align-items: stretch !important;
            }
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-right-panel > div {
              max-width: 100% !important;
              height: 100% !important;
              aspect-ratio: unset !important;
              border-radius: 0 20px 20px 0 !important;
              box-shadow: none !important;
            }
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-right-panel img {
              object-fit: cover !important;
              height: 100% !important;
            }
            [data-event-popup="buy-your-house-with-a-credit-card"] .ep-left-panel {
              padding: 36px 36px 36px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function CBox({ value, label }: { value: number | string; label: string }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      minWidth: 52, padding: "8px 4px", borderRadius: 10,
      background: "#fff", border: "1px solid #e0f2fe",
      boxShadow: "0 2px 4px rgba(3,105,161,0.05)",
    }}>
      <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "#0369a1", fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
      <span style={{ marginTop: 4, fontSize: 9, fontWeight: 600, color: "#64748b" }}>
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span style={{ paddingBottom: 14, fontSize: 18, fontWeight: 600, color: "#bae6fd", userSelect: "none" }}>
      :
    </span>
  );
}
