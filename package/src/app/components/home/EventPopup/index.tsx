"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  WORKSHOP_REGISTER_URL,
} from "@/lib/workshop";

// Target Date: Saturday, June 27, 2026 — 11:00 AM PST (UTC-8) -> -08:00
const TARGET_EVENT_MS = new Date("2026-06-27T11:00:00-08:00").getTime();
const EVENT_IMAGE = "/images/todayclasstopic/sdw.png";
const EVENT_DATE_LABEL = "Saturday, June 27";
const EVENT_TIME_LABEL = "11:00 AM PST";

interface EventPopupProps {
  delayMs?: number;
  disableAutoOpen?: boolean;
  manualTrigger?: number;
}

function pad(n: number) {
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

  useEffect(() => {
    if (disableAutoOpen) return;
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, disableAutoOpen]);

  useEffect(() => {
    if (manualTrigger > 0) setOpen(true);
  }, [manualTrigger]);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown(TARGET_EVENT_MS));
    updateCountdown();
    const id = setInterval(updateCountdown, 1000);
    return () => clearInterval(id);
  }, []);

  if (!open) return null;

  const { days, hours, minutes, seconds } = countdown;

  return (
    <div
      className="event-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      data-event-popup="ca7-side-hustle-to-full-time"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-popup-title"
        className="event-popup-dialog"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="event-popup-close"
        >
          ×
        </button>

        <div className="event-popup-grid">
          <div className="event-popup-left">
            <p className="event-popup-brand">CREDITOR ACADEMY</p>

            <div className="event-popup-badges">
              <span className="event-badge event-badge--live">
                <span className="event-badge-dot" aria-hidden />
                LIVE TRAINING
              </span>
              <span className="event-badge event-badge--date">{EVENT_DATE_LABEL}</span>
            </div>

            <h2 id="event-popup-title" className="event-popup-title">
              From Side Hustle <span className="event-popup-title-accent">To Full-Time</span>
            </h2>
            <p className="event-popup-subtitle-tag">The 90-Day Business Launch Plan</p>

            <p className="event-popup-desc">
              Turn your idea into a <strong>real business</strong> in just <strong>90 days</strong>. Join our live masterclass and learn to:
            </p>

            <ul className="event-popup-bullets">
              <li>Validate your business idea & build a profitable offer</li>
              <li>Find your first customers & create consistent revenue</li>
              <li>Transition smoothly into a full-time entrepreneur</li>
            </ul>

            <div className="event-popup-countdown-wrap">
              {Date.now() >= TARGET_EVENT_MS ? (
                <div style={{ textAlign: 'center' }}>
                  <p className="event-popup-countdown-label">LIVE NOW</p>
                  <p style={{ color: '#2ec0ff', fontWeight: 800, fontSize: 18 }}>Streaming live right now</p>
                </div>
              ) : (
                <>
                  <p className="event-popup-countdown-label">STARTS IN</p>
                  <div className="event-popup-countdown-row">
                    <CountdownBox value={days} label="DAYS" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(hours)} label="HRS" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(minutes)} label="MIN" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(seconds)} label="SEC" />
                  </div>
                </>
              )}
            </div>

            <a
              href={WORKSHOP_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="event-popup-cta"
            >
              Reserve Your Seat Today!
            </a>
          </div>

          <div className="event-popup-right">
            <div className="event-popup-poster-card">
              <Image
                src={EVENT_IMAGE}
                alt={`From Side Hustle to Full-Time Masterclass — ${EVENT_DATE_LABEL}, ${EVENT_TIME_LABEL}`}
                width={480}
                height={480}
                className="event-popup-poster-img"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .event-popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.84);
        }
        .event-popup-dialog {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 92vh;
          overflow-y: auto;
          border-radius: 20px;
          border: 1px solid rgba(59, 130, 246, 0.32);
          background: linear-gradient(152deg, #0c1628 0%, #0a192f 48%, #070e1c 100%);
          box-shadow:
            0 0 0 1px rgba(0, 180, 255, 0.06),
            0 28px 72px rgba(0, 0, 0, 0.72),
            0 0 48px rgba(0, 100, 255, 0.1);
        }
        .event-popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 20;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }
        .event-popup-close:hover {
          background: rgba(0, 0, 0, 0.72);
        }
        .event-popup-grid {
          display: grid;
          grid-template-columns: 1fr;
        }
        @media (min-width: 900px) {
          .event-popup-grid {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }
        .event-popup-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px 22px;
          background: radial-gradient(
            ellipse 90% 55% at 15% 8%,
            rgba(0, 180, 255, 0.08) 0%,
            transparent 58%
          );
        }
        @media (min-width: 900px) {
          .event-popup-left {
            padding: 28px;
            gap: 12px;
          }
        }
        .event-popup-brand {
          margin: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #6eb8e8;
        }
        .event-popup-badges {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .event-badge {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          font-weight: 700;
          text-transform: uppercase;
        }
        .event-badge--live {
          gap: 6px;
          padding: 5px 10px;
          font-size: 9px;
          letter-spacing: 0.04em;
          color: #0a2d4a;
          background: linear-gradient(90deg, #b8e8fc 0%, #9dd4f5 100%);
        }
        .event-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e53935;
        }
        .event-badge--date {
          padding: 5px 12px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.92);
          background: #141f33;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .event-popup-title {
          margin: 0;
          font-size: clamp(24px, 3.5vw, 32px);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
        }
        .event-popup-title-accent {
          color: #2ec0ff;
        }
        .event-popup-subtitle-tag {
          margin: -4px 0 2px 0;
          font-size: 13px;
          font-weight: 600;
          color: #b8e8fc;
        }
        .event-popup-desc {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }
        .event-popup-bullets {
          margin: 0;
          padding-left: 18px;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .event-popup-bullets li {
          list-style-type: disc;
        }
        .event-popup-countdown-wrap {
          padding: 10px;
          border-radius: 12px;
          background: #050c18;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 4px;
        }
        .event-popup-countdown-label {
          margin: 0 0 8px;
          text-align: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #5eb3e8;
        }
        .event-popup-countdown-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .event-popup-colon {
          padding-bottom: 16px;
          font-size: 18px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.32);
        }
        .event-popup-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 13px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(90deg, #0a7cff 0%, #1aa3ff 55%, #2ec0ff 100%);
          box-shadow: 0 6px 20px rgba(10, 124, 255, 0.35);
          text-transform: uppercase;
        }
        .event-popup-cta:hover {
          filter: brightness(1.06);
          transform: translateY(-1px);
          color: #fff;
        }
        .event-popup-right {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: #0a192f;
        }
        @media (min-width: 900px) {
          .event-popup-right {
            padding: 24px 24px 24px 12px;
          }
        }
        .event-popup-poster-card {
          width: 100%;
          max-width: min(400px, 100%);
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }
        .event-popup-poster-card :global(.event-popup-poster-img) {
          display: block;
          width: 100%;
          height: auto;
          min-height: 260px;
          object-fit: contain;
        }
        @media (min-width: 900px) {
          .event-popup-poster-card :global(.event-popup-poster-img) {
            min-height: 340px;
          }
        }
        :global(.event-countdown-box) {
          display: flex;
          min-width: 46px;
          flex-direction: column;
          align-items: center;
          padding: 6px 4px;
          border-radius: 8px;
          background: #0d1b2e;
          border: 1px solid #1e4068;
        }
        :global(.event-countdown-num) {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }
        :global(.event-countdown-unit) {
          margin-top: 4px;
          font-size: 8px;
          font-weight: 600;
          color: #5eb3e8;
        }
      `}</style>
    </div>
  );
}

function CountdownBox({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="event-countdown-box">
      <span className="event-countdown-num">{value}</span>
      <span className="event-countdown-unit">{label}</span>
    </div>
  );
}