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
      // November 30, 2025 11:59:59 PM PST (UTC-8)
      const targetDate = new Date("2025-11-30T23:59:59-08:00");
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
        <div className="tg-card">
          <button className="tg-close" aria-label="Close" onClick={() => setOpen(false)}>
            ×
          </button>

          <div className="tg-inner">
            <div className="tg-text">
              <div className="tg-eyebrow">🔥 Limited Time Special Event</div>
              <h2 className="tg-title">Thanksgiving Mega Offer</h2>
              <p className="tg-sub">
                Join our <strong>Masterclass Membership</strong> this Thanksgiving and get
                <strong> 2000 credit</strong> added to your LMS account — plus premium
                support & exclusive benefits.
              </p>
              
              <div className="tg-deadline">
                ⏰ <strong>Offer Valid Only Till November 30th, 2025 (11:59 PM PST)</strong>
              </div>

              <div className="tg-countdown">
                <div className="countdown-item">
                  <div className="countdown-value">{timeLeft.days}</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="countdown-label">Minutes</div>
                </div>
                <div className="countdown-divider">:</div>
                <div className="countdown-item">
                  <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="countdown-label">Seconds</div>
                </div>
              </div>

              <div className="btn-container">
                <Link href="/tncmasterclass" className="tg-cta-btn" onClick={() => setOpen(false)}>
                  <span className="btn-text">Explore Now </span>
                  <span className="btn-arrow"> →</span>
                </Link>
              </div>
            </div>

            <div className="tg-image-wrap">
              <img
                src="/images/event/thanksgiving.png"
                alt="Thanksgiving Mega Offer"
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

        /* WIDER + BORDER RADIUS ADDED */
        .tg-card {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          background: linear-gradient(180deg, #001428, #002b5c, #004c9c);
          border-radius: 20px;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.75);
          display: flex;
          flex-direction: column;
        }

        /* Custom scrollbar */
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
          background: rgba(255, 255, 255, 0.1);
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
          margin-top: 8px;
          display: inline-block;
          position: relative;
          background:rgb(237, 115, 38);
          padding: 4px 16px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .btn-container:hover {
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .tg-cta-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #4c6fff 0%, #2563eb 100%);
          color: #ffffff;
          padding: 12px 32px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 900;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.02em;
          overflow: visible;
          min-width: 160px;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
          cursor: pointer;
        }

        .tg-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          padding: 2px;
          background: linear-gradient(135deg, #ff6a00, #ffb347, #ff6a00);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-shine {
          display: none;
        }

        .btn-text {
          position: relative;
          z-index: 1;
          color: #ffffff;
          font-weight: 900;
        }

        .btn-arrow {
          position: relative;
          z-index: 1;
          padding-left:4px;
          color: #ffffff;
          font-size: 18px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }

        .tg-cta-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 28px rgba(37, 99, 235, 0.6), 0 0 20px rgba(255, 106, 0, 0.3);
          background: linear-gradient(135deg, #ff6a00 0%, #ff8c00 100%);
        }

        .tg-cta-btn:hover::before {
          opacity: 1;
        }

        .tg-cta-btn:hover .btn-arrow {
          transform: translateX(5px);
          animation: arrowBounce 0.6s ease-in-out infinite;
        }

        @keyframes arrowBounce {
          0%, 100% {
            transform: translateX(5px);
          }
          50% {
            transform: translateX(10px);
          }
        }

        .tg-cta-btn:active {
          transform: translateY(-2px) scale(1);
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
          .btn-arrow {
            font-size: 16px;
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
