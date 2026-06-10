"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  WORKSHOP_REGISTER_URL,
} from "@/lib/workshop";

// Target Event Time: Saturday, June 11, 2026, at 11:00 AM PST
// 11:00 AM PST is 7:00 PM (19:00) UTC
const TARGET_EVENT_MS = Date.UTC(2026, 5, 11, 19, 0, 0);
const EVENT_IMAGE = "/images/todayclasstopic/am.png";

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
  delayMs = 5000,
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

  // Active interval loop that drives the countdown calculation forward every single second
  useEffect(() => {
    if (!open) return;
    
    // Update immediately upon opening
    setCountdown(getCountdown(TARGET_EVENT_MS));
    
    const id = setInterval(() => {
      setCountdown(getCountdown(TARGET_EVENT_MS));
    }, 1000);
    
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  const { days, hours, minutes, seconds } = countdown;

  return (
    <div
      className="event-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      data-event-popup="ca7-business-builder-bootcamp-v2"
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
                LIVE WORKSHOP
              </span>
              <span className="event-badge event-badge--date">Saturday, June 11</span>
            </div>

            <h2 id="event-popup-title" className="event-popup-title">
              Business Builder <span className="event-popup-title-accent">Bootcamp</span>
            </h2>

            <p className="event-popup-desc">
              Build, Structure & Scale Your Business the Right Way. Learn essential strategies 
              for corporate compliance, operational frameworks, and institutional funding access.
            </p>

            <div className="event-popup-tags">
              <span>Structure & Scale</span>
              <span>Funding Blueprint</span>
              <span>11:00 AM PST</span>
            </div>

            <div className="event-popup-countdown-wrap">
              {Date.now() >= TARGET_EVENT_MS ? (
                <div style={{textAlign: 'center'}}>
                  <p className="event-popup-countdown-label">LIVE NOW</p>
                  <p style={{color: '#2ec0ff', fontWeight: 800, fontSize: 18}}>Joining live — streaming now</p>
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
              Register For Bootcamp
            </a>
          </div>

          <div className="event-popup-right">
            <div className="event-popup-poster-card">
              <Image
                src={EVENT_IMAGE}
                alt="Business Builder Bootcamp Masterclass Flyer detailing structure and scaling plans on Saturday, June 13, 2026"
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
          max-width: 800px;
          max-height: 92vh;
          overflow: hidden;
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
          transition: background 0.2s;
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
            grid-template-columns: 0.9fr 1.1fr;
          }
        }
        .event-popup-left {
          display: flex;
          flex-direction: column;
          gap: 13px;
          padding: 24px 22px 28px;
          background: radial-gradient(
            ellipse 90% 55% at 15% 8%,
            rgba(0, 180, 255, 0.08) 0%,
            transparent 58%
          );
        }
        @media (min-width: 900px) {
          .event-popup-left {
            padding: 26px 24px 28px 28px;
            gap: 14px;
          }
        }
        .event-popup-brand {
          margin: 0;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6eb8e8;
        }
        .event-popup-badges {
          display: flex;
          flex-wrap: wrap;
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
          padding: 6px 12px;
          font-size: 10px;
          letter-spacing: 0.04em;
          color: #0a2d4a;
          background: linear-gradient(90deg, #b8e8fc 0%, #9dd4f5 100%);
        }
        .event-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e53935;
          flex-shrink: 0;
        }
        .event-badge--date {
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          text-transform: none;
          color: rgba(255, 255, 255, 0.92);
          background: #141f33;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .event-popup-title {
          margin: 0;
          font-size: clamp(24px, 3.5vw, 30px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .event-popup-title-accent {
          color: #2ec0ff;
        }
        .event-popup-desc {
          margin: 0;
          max-width: 400px;
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
        }
        .event-popup-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .event-popup-tags span {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          color: #8ec8f5;
          background: #0b1526;
          border: 1px solid #2a5078;
        }
        .event-popup-countdown-wrap {
          padding: 12px 10px;
          border-radius: 14px;
          background: #050c18;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .event-popup-countdown-label {
          margin: 0 0 12px;
          text-align: center;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.28em;
          color: #5eb3e8;
        }
        .event-popup-countdown-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-variant-numeric: tabular-nums;
        }
        .event-popup-colon {
          padding-bottom: 18px;
          font-size: 20px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.32);
          user-select: none;
        }
        .event-popup-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 13px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          background: linear-gradient(90deg, #0a7cff 0%, #1aa3ff 55%, #2ec0ff 100%);
          box-shadow: 0 8px 26px rgba(10, 124, 255, 0.42);
          transition: filter 0.2s, transform 0.2s;
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
          padding: 16px 16px 20px;
          background: #0a192f;
        }
        @media (min-width: 900px) {
          .event-popup-right {
            padding: 18px 22px 22px 10px;
          }
        }
        .event-popup-poster-card {
          width: 100%;
          max-width: min(460px, 100%);
          border-radius: 14px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }
        @media (min-width: 900px) {
          .event-popup-poster-card {
            max-width: 100%;
          }
        }
        .event-popup-poster-card :global(.event-popup-poster-img) {
          display: block;
          width: 100%;
          height: auto;
          min-height: 280px;
          object-fit: contain;
        }
        @media (min-width: 900px) {
          .event-popup-poster-card :global(.event-popup-poster-img) {
            min-height: 360px;
          }
        }
        :global(.event-countdown-box) {
          display: flex;
          min-width: 50px;
          flex-direction: column;
          align-items: center;
          padding: 8px 6px;
          border-radius: 10px;
          background: #0d1b2e;
          border: 1px solid #1e4068;
        }
        :global(.event-countdown-num) {
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          color: #fff;
        }
        @media (min-width: 640px) {
          :global(.event-countdown-num) {
            font-size: 24px;
          }
        }
        :global(.event-countdown-unit) {
          margin-top: 6px;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.12em;
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