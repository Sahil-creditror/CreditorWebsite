"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ThanksgivingPopupProps {
  delayMs?: number;
  disableAutoOpen?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ThanksgivingPopup: React.FC<ThanksgivingPopupProps> = ({ delayMs = 1000, disableAutoOpen = false }) => {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (disableAutoOpen) return;
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, disableAutoOpen]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // December 25, 2025 11:59:59 PM PST (UTC-8)
      const targetDate = new Date("2025-12-25T23:59:59-08:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!open) return null;

  return (
    <>
      <div
        className="tg-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="tg-card" role="dialog" aria-modal="true" aria-label="Christmas Mega Offer">
          <button className="tg-close" aria-label="Close" onClick={() => setOpen(false)}>
            ×
          </button>

          <div className="tg-inner">
            <div className="tg-text">
              <div className="tg-eyebrow">🎄 Christmas Mega Offer – Limited Time!</div>
              <h2 className="tg-title">Christmas Mega Offer</h2>
              <p className="tg-sub">
                Celebrate this festive season with our biggest Christmas deal ever! Join our <strong>Masterclass Membership</strong> or grab the <strong>Cadillac Luxury Website Package</strong> and receive exclusive holiday bonus credits, premium support, and VIP benefits.
              </p>

              <div className="tg-deadline">
                ⏰ <strong>Offer Valid Only Till December 25th, 2025 (11:59 PM PST)</strong>
              </div>

              <div className="tg-countdown" aria-live="polite">
                <div className="countdown-item" title={`${timeLeft.days} days`}>
                  <div className="countdown-value">{timeLeft.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-divider" aria-hidden="true">:</div>
                <div className="countdown-item" title={`${timeLeft.hours} hours`}>
                  <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-divider" aria-hidden="true">:</div>
                <div className="countdown-item" title={`${timeLeft.minutes} minutes`}>
                  <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-divider" aria-hidden="true">:</div>
                <div className="countdown-item" title={`${timeLeft.seconds} seconds`}>
                  <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-label">Seconds</div>
                </div>
              </div>

              <div className="btn-container">
                <Link
                  href="/tncmasterclass"
                  className="tg-cta-btn"
                  onClick={() => setOpen(false)}
                  aria-label="Explore Now"
                >
                  Explore Now →
                </Link>
              </div>
            </div>

            <div className="tg-image-wrap" aria-hidden="true">
              <img
                src="/images/event/christmas.webp"
                alt="Christmas Mega Offer"
                className="tg-image"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tg-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .tg-card {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          background: linear-gradient(180deg, #2b0d16, #4a1120, #6b0f1a);
          border-radius: 20px;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.75);
          display: flex;
          flex-direction: column;
        }

        .tg-card::-webkit-scrollbar {
          width: 8px;
        }

        .tg-card::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .tg-card::-webkit-scrollbar-thumb {
          background: rgba(255, 179, 71, 0.5);
          border-radius: 10px;
        }

        .tg-card::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 179, 71, 0.7);
        }

        .tg-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 24px;
          align-items: center;
        }

        .tg-close {
          position: absolute;
          top: 12px;
          right: 16px;
          border: none;
          background: rgba(0, 0, 0, 0.6);
          color: #fff;
          font-size: 28px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .tg-text {
          color: #f5f7ff;
        }

        .tg-eyebrow {
          display: inline-block;
          background: linear-gradient(90deg, #ffb347, #ff6a00);
          color: #1b0f00;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .tg-title {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 800;
          margin-bottom: 8px;
          color: #fff;
          line-height: 1.2;
        }

        .tg-sub {
          font-size: 13px;
          color: rgba(230, 240, 255, 0.9);
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .tg-deadline {
          background: linear-gradient(90deg, #ff4500, #ff8c00);
          color: #fff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 11px;
          margin-bottom: 12px;
          display: inline-block;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 69, 0, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 20px 10px rgba(255, 69, 0, 0);
          }
        }

        .tg-countdown {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .countdown-item {
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 179, 71, 0.4);
          border-radius: 10px;
          padding: 8px 12px;
          text-align: center;
          min-width: 55px;
          backdrop-filter: blur(10px);
        }

        .countdown-value {
          font-size: 22px;
          font-weight: 800;
          color: #ffb347;
          line-height: 1;
          text-shadow: 0 2px 10px rgba(255, 179, 71, 0.5);
        }

        .countdown-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 3px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .countdown-divider {
          font-size: 22px;
          font-weight: 700;
          color: #ffb347;
          line-height: 1;
        }

        .btn-container {
          margin-top: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
        }

        /* Updated tg-cta-btn: added fallback color, appearance reset, and stronger clipping rules */
        .tg-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          /* fallback color in case gradient is overwritten */
          background-color: #0f66ff;
          /* main gradient */
          background-image: linear-gradient(90deg, #0f66ff 0%, #06c8ff 100%);
          color: #ffffff !important;
          padding: 15px 46px;
          border-radius: 999px;
          font-size: 18px;
          font-weight: 800;
          text-decoration: none !important;
          border: none;
          cursor: pointer;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.38);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          -webkit-appearance: none;
          appearance: none;
          text-align: center;
          line-height: 1;
          /* ensure gradient paints the element box */
          background-origin: padding-box;
          background-clip: padding-box;
        }

        .tg-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.42);
          filter: brightness(1.05);
        }

        .tg-cta-btn:active {
          transform: translateY(-1px) scale(0.995);
        }

        .tg-image-wrap {
          background: #020712;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          aspect-ratio: 1 / 1;
          width: 100%;
        }

        .tg-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 980px) {
          .tg-card {
            max-width: 95vw;
          }
          .tg-inner {
            grid-template-columns: 1fr;
            padding: 20px;
            gap: 16px;
          }
          .tg-image-wrap {
            aspect-ratio: 1 / 1;
            max-width: 300px;
            margin: 0 auto;
          }
          .tg-countdown {
            gap: 5px;
          }
          .countdown-item {
            min-width: 50px;
            padding: 8px 10px;
          }
          .countdown-value {
            font-size: 20px;
          }
          .countdown-label {
            font-size: 8px;
          }
          .countdown-divider {
            font-size: 20px;
          }
        }

        @media (max-width: 640px) {
          .tg-card {
            border-radius: 16px;
            max-height: 95vh;
          }
          .tg-inner {
            padding: 16px;
            gap: 12px;
          }
          .tg-title {
            font-size: 18px;
          }
          .tg-sub {
            font-size: 12px;
          }
          .tg-deadline {
            font-size: 10px;
            padding: 6px 10px;
          }
          .tg-countdown {
            gap: 4px;
          }
          .countdown-item {
            min-width: 45px;
            padding: 6px 8px;
          }
          .countdown-value {
            font-size: 18px;
          }
          .countdown-label {
            font-size: 7px;
          }
          .countdown-divider {
            font-size: 18px;
          }
          .btn-container {
            padding: 4px 14px;
          }
          .tg-cta-btn {
            padding: 10px 24px;
            font-size: 14px;
            min-width: 140px;
            gap: 4px;
          }
          .tg-image-wrap {
            max-width: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default ThanksgivingPopup;