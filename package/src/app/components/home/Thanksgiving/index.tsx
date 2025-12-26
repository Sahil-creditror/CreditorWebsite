"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface ThanksgivingPopupProps {
  delayMs?: number;
  disableAutoOpen?: boolean;
}

const ThanksgivingPopup: React.FC<ThanksgivingPopupProps> = ({ delayMs = 1000, disableAutoOpen = false }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (disableAutoOpen) return;
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs, disableAutoOpen]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] p-4 md:p-5"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div
          className="relative w-full max-w-[95vw] md:max-w-[900px] max-h-[95vh] md:max-h-[90vh] bg-gradient-to-b from-[#0d162b] via-[#11204a] to-[#0f1a6b] rounded-2xl md:rounded-[20px] overflow-y-auto overflow-x-hidden shadow-[0_30px_70px_rgba(0,0,0,0.75)] flex flex-col [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-[rgba(59,130,246,0.5)] [&::-webkit-scrollbar-thumb]:rounded-[10px] hover:[&::-webkit-scrollbar-thumb]:bg-[rgba(59,130,246,0.7)]"
          role="dialog"
          aria-modal="true"
          aria-label="Webinar Event"
        >
          <button
            className="absolute top-3 right-4 border-0 bg-black/60 text-white text-[28px] w-[38px] h-[38px] rounded-full cursor-pointer flex items-center justify-center leading-none hover:bg-black/80 transition-colors"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-8 md:p-10 items-center">
            <div className="text-[#f5f7ff] space-y-6">
              <div className="inline-block bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] text-white px-3 py-2 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase">
                🎓 Exclusive Webinar – Limited Time!
              </div>
              <h2 className="text-[clamp(20px,2.5vw,32px)] md:text-[clamp(24px,2.5vw,32px)] font-extrabold text-white leading-tight">
                Join Our Exclusive Webinar
              </h2>
              <p className="text-sm md:text-[14px] text-[rgba(230,240,255,0.9)] leading-relaxed">
                Don't miss out on this incredible opportunity! Join our exclusive webinar to learn from industry experts, gain valuable insights, and take your skills to the next level. Register now and secure your spot!
              </p>

              {/* <div className="bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-lg text-xs md:text-sm font-semibold inline-block animate-pulse">
                ⏰ <strong>Register Now – Limited Spots Available!</strong>
              </div> */}

              <div className="text-xl md:text-2xl font-bold text-[#60a5fa] [text-shadow:0_2px_10px_rgba(96,165,250,0.5)]">
                Closing soon
              </div>

              <div className="pt-2">
                <Link
                  href="/webinar"
                  className="inline-flex items-center justify-center gap-2 md:gap-3 bg-[#0f66ff] bg-gradient-to-r from-[#0f66ff] to-[#06c8ff] text-white !important py-4 px-8 md:py-[18px] md:px-[52px] rounded-full text-base md:text-lg font-extrabold no-underline border-0 cursor-pointer shadow-[0_18px_36px_rgba(0,0,0,0.38)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.42)] hover:brightness-105 active:translate-y-[-1px] active:scale-[0.995] text-center leading-none min-w-[160px]"
                  onClick={() => setOpen(false)}
                  aria-label="Explore Now"
                >
                  Explore Now →
                </Link>
              </div>
            </div>

            <div className="bg-[#020712] rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 aspect-square w-full max-w-[250px] mx-auto md:max-w-none md:mx-0" aria-hidden="true">
              <img
                src="/images/webinar/popbanner.webp"
                alt="Webinar Event"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 20px 10px rgba(37, 99, 235, 0);
          }
        }
      `}</style>
    </>
  );
};

export default ThanksgivingPopup;