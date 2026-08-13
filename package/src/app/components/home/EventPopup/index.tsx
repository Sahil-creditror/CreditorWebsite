"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { WORKSHOP_REGISTER_URL } from "@/lib/workshop";

// Target Event Timestamp updated to Saturday, August 15, 2026 @ 11 AM PST
const TARGET_EVENT_MS = new Date("2026-08-15T11:00:00-07:00").getTime();
const EVENT_IMAGE = "/images/todayclasstopic/ca15.jpg"; 
const EVENT_DATE_LABEL = "Saturday, August 15, 2026";

interface EventPopupProps {
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

  useEffect(() => {
    if (disableAutoOpen) return;
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearInterval(timer);
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
  const isLive = Date.now() >= TARGET_EVENT_MS;

  return (
    <div
      className="event-popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
      data-event-popup="ca7-build-business-credit"
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
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="event-popup-grid">
          {/* Main Content Area */}
          <div className="event-popup-left">
            <header className="event-popup-header">
              <div className="event-popup-brand-wrapper">
                <p className="event-popup-brand">CREDITOR ACADEMY</p>
                <p className="event-popup-subbrand">PRIVATE MONTESSORI ASSOCIATION</p>
              </div>
              <div className="event-popup-badges">
                <span className="event-badge event-badge--live">
                  <span className="event-badge-dot" aria-hidden />
                  WORKSHOP
                </span>
                <span className="event-badge event-badge--date">August 15 @ 11 AM PST</span>
              </div>
            </header>

            <h2 id="event-popup-title" className="event-popup-title">
              How to Get an <span className="event-popup-title-accent">80 Paydex Score</span>
            </h2>

            <p className="event-popup-desc">
              Build stronger business credit and improve your funding readiness.
            </p>

            <div className="event-popup-tags">
              <span>📈 Credit Building</span>
              <span>⚖️ Payment Strategies</span>
              <span>⚙️ PAYDEX Insights</span>
              <span>🚀 Funding Readiness</span>
            </div>

            <div className="event-popup-countdown-wrap">
              {isLive ? (
                <div className="event-live-status">
                  <p className="event-popup-countdown-label">LIVE NOW</p>
                  <p className="event-live-text">Workshop is live — stream now</p>
                </div>
              ) : (
                <>
                  <p className="event-popup-countdown-label">STARTS IN</p>
                  <div className="event-popup-countdown-row">
                    <CountdownBox value={days} label="Days" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(hours)} label="Hrs" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(minutes)} label="Min" />
                    <span className="event-popup-colon">:</span>
                    <CountdownBox value={pad(seconds)} label="Sec" />
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
              REGISTER NOW
            </a>
          </div>

          {/* Graphical Display Panel */}
          <div className="event-popup-right">
            <div className="event-popup-poster-card">
              <Image
                src={EVENT_IMAGE}
                alt={`Free Workshop: How to Get an 80 Paydex Score — ${EVENT_DATE_LABEL}`}
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
          padding: 6px;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
        }
        
        .event-popup-dialog {
          position: relative;
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: none;
          border-radius: 24px;
          border: 1px solid #ffffff;
          background: #ffffff;
          box-shadow: 
            0 1px 3px rgba(0, 0, 0, 0.05),
            0 25px 50px -12px rgba(15, 23, 42, 0.15),
            0 0 40px rgba(14, 165, 233, 0.04);
        }
        .event-popup-dialog::-webkit-scrollbar {
          display: none;
        }

        .event-popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 30;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          background: #f8fafc;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .event-popup-close:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #cbd5e1;
        }

        .event-popup-grid {
          display: flex;
          flex-direction: column-reverse;
        }

        .event-popup-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
        }

        .event-popup-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .event-popup-brand-wrapper {
          display: flex;
          flex-direction: column;
        }

        .event-popup-brand {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 0.03em;
          color: #0052cc;
          line-height: 1.2;
        }

        .event-popup-subbrand {
          margin: 3px 0 0 0;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #0052cc;
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
          border-radius: 6px;
          font-weight: 700;
          font-size: 10px;
          padding: 5px 10px;
        }
        .event-badge--live {
          gap: 6px;
          color: #ea580c;
          background: #fff7ed;
          border: 1px solid #ffedd5;
        }
        .event-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f97316;
          box-shadow: 0 0 6px #f97316;
          flex-shrink: 0;
        }
        .event-badge--date {
          font-weight: 600;
          color: #0284c7;
          background: #f0f9ff;
          border: 1px solid #e0f2fe;
        }

        .event-popup-title {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #0f172a;
        }
        .event-popup-title-accent {
          color: #0052cc;
          background: linear-gradient(135deg, #0052cc 0%, #0033aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .event-popup-desc {
          margin: 0;
          font-size: 14px;
          line-height: 1.35;
          color: #475569;
        }

        .event-popup-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .event-popup-tags span {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }

        .event-popup-countdown-wrap {
          padding: 16px;
          border-radius: 16px;
          background: #f0f9ff;
          border: 1px solid #e0f2fe;
        }
        .event-popup-countdown-label {
          margin: 0 0 12px;
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #0369a1;
        }
        .event-popup-countdown-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-variant-numeric: tabular-nums;
        }
        .event-popup-colon {
          padding-bottom: 14px;
          font-size: 18px;
          font-weight: 600;
          color: #bae6fd;
          user-select: none;
        }
        
        .event-live-status {
          text-align: center;
        }
        .event-live-text {
          margin: 0;
          color: #0284c7;
          font-weight: 700;
          font-size: 15px;
        }

        .event-popup-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 24px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          background: #dc2626;
          background: linear-gradient(90deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);
          transition: all 0.2s ease;
        }
        .event-popup-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.5);
          filter: brightness(1.05);
        }

        .event-popup-right {
          padding: 24px 24px 0 24px;
          display: flex;
          justify-content: center;
          background: #f8fafc;
        }

        .event-popup-poster-card {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);
          border: 4px solid #ffffff;
        }
        
        .event-popup-poster-card :global(.event-popup-poster-img) {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain;
          object-position: center;
          border-radius: 12px;
        }

        /* Desktop Breakpoint Modifications */
        @media (min-width: 840px) {
          .event-popup-dialog {
            max-width: 960px;
            overflow: hidden;
          }
          .event-popup-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            min-height: 580px;
          }
          .event-popup-left {
            padding: 40px;
            gap: 24px;
          }
          .event-popup-right {
            padding: 0;
            align-items: stretch;
            justify-content: stretch;
            border-left: 1px solid #f1f5f9;
          }
          .event-popup-poster-card {
            height: 100%;
            min-height: 580px;
            aspect-ratio: auto;
            border-radius: 0;
            border: 0;
            box-shadow: none;
          }
          .event-popup-title {
            font-size: 32px;
          }
          .event-popup-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
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
      <style jsx>{`
        .event-countdown-box {
          display: flex;
          min-width: 52px;
          flex-direction: column;
          align-items: center;
          padding: 8px 4px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid #e0f2fe;
          box-shadow: 0 2px 4px rgba(3, 105, 161, 0.04);
        }
        .event-countdown-num {
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
          color: #0369a1;
          font-variant-numeric: tabular-nums;
        }
        .event-countdown-unit {
          margin-top: 4px;
          font-size: 9px;
          font-weight: 600;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}