"use client";

import React, { useEffect, useState } from "react";

interface ThanksgivingPopupProps {
  delayMs?: number;
}

const ThanksgivingPopup: React.FC<ThanksgivingPopupProps> = ({ delayMs = 1000 }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

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
              <div className="tg-eyebrow">Special Event</div>
              <h2 className="tg-title">Thanksgiving Mega Offer</h2>
              <p className="tg-sub">
                Join our <strong>Masterclass Membership</strong> this Thanksgiving and get
                <strong> 2000 credit</strong> added to your LMS account — plus premium
                support & exclusive benefits.
              </p>
            </div>

            <div className="tg-image-wrap">
              <img
                src="/images/home/banner/Thanksgiving.png"
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
          max-width: 1400px; /* increased width */
          max-height: 92vh;
          background: linear-gradient(180deg, #001428, #002b5c, #004c9c);
          border-radius: 22px; /* added rounded corners */
          overflow: hidden;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.75);
          display: flex;
          flex-direction: column;
        }

        .tg-inner {
          display: grid;
          grid-template-columns: 1.1fr 2fr; /* more space for the banner */
          gap: 28px;
          padding: 32px;
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
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .tg-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 800;
          margin-bottom: 10px;
          color: #fff;
        }

        .tg-sub {
          font-size: 15px;
          color: rgba(230, 240, 255, 0.9);
          max-width: 460px;
          line-height: 1.6;
        }

        .tg-image-wrap {
          background: #020712;
          border-radius: 16px;
          overflow: hidden;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tg-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @media (max-width: 980px) {
          .tg-inner {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          .tg-image-wrap {
            height: auto;
          }
        }

        @media (max-width: 640px) {
          .tg-card {
            border-radius: 16px;
          }
          .tg-inner {
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
};

export default ThanksgivingPopup;
