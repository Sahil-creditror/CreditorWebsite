"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STRIP_STORAGE_KEY = "thanksgiving_strip_2026_dismissed";

/**
 * Slim Thanksgiving announcement strip placed cleanly above the fixed navigation.
 */
export function ThanksgivingTopStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STRIP_STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
        document.documentElement.style.setProperty("--tg-strip-offset", "36px");
      } else {
        document.documentElement.style.setProperty("--tg-strip-offset", "0px");
      }
    } catch {
      setVisible(true);
      document.documentElement.style.setProperty("--tg-strip-offset", "36px");
    }

    return () => {
      document.documentElement.style.setProperty("--tg-strip-offset", "0px");
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    document.documentElement.style.setProperty("--tg-strip-offset", "0px");
    try {
      sessionStorage.setItem(STRIP_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  };

  if (!visible) return null;

  const marqueeItems = [
    "Happy Thanksgiving 2026 from Creditor Academy",
    "Wishing You a Season of Gratitude, Sovereignty & Growth",
    "Explore Private Wealth & Business Trust Strategies",
    "Join Our Free Thanksgiving Season Webclass",
  ];

  return (
    <div
      role="banner"
      aria-label="Thanksgiving Announcement"
      className="fixed top-0 left-0 right-0 z-[55] h-9 bg-gradient-to-r from-[#4B2E1E] via-[#69452F] to-[#4B2E1E] text-[#FFF7E9] border-b border-[#E8B85C]/45 flex items-center overflow-hidden text-xs shadow-[0_2px_12px_rgba(75,46,30,0.25)]"
    >
      <div className="flex-1 overflow-hidden pr-10">
        <div className="thanksgiving-marquee-track flex w-max items-center whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-10 px-5">
              {marqueeItems.map((text, idx) => (
                <span key={idx} className="inline-flex items-center gap-3 font-medium tracking-wide text-[#FFF7E9]/95">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 text-[#E8B85C] shrink-0"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.5C12.8 5.2 13.8 7 15.5 7.3C17.4 7.6 18.8 6.4 19.7 5.7C19.2 7.8 18.7 9.4 19.9 10.6C21 11.7 22.8 11.5 24 12C22.2 13.4 20.6 14.1 20.4 15.7C20.2 17.3 21.3 18.5 21.8 19.6C19.7 19.6 17.6 19.1 16.5 20C15.4 20.9 15.5 22.3 15.3 23.2C14.1 22 13 21.5 12 21.5C11 21.5 9.9 22 8.7 23.2C8.5 22.3 8.6 20.9 7.5 20C6.4 19.1 4.3 19.6 2.2 19.6C2.7 18.5 3.8 17.3 3.6 15.7C3.4 14.1 1.8 13.4 0 12C1.2 11.5 3 11.7 4.1 10.6C5.3 9.4 4.8 7.8 4.3 5.7C5.2 6.4 6.6 7.6 8.5 7.3C10.2 7 11.2 5.2 12 2.5Z" />
                  </svg>
                  <span>{text}</span>
                </span>
              ))}
              <Link
                href="/webinar"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B85C32]/85 hover:bg-[#B85C32] text-[#FFF7E9] border border-[#E8B85C]/40 font-semibold text-[11px] transition-colors"
              >
                Reserve Your Free Seat →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Close Thanksgiving announcement strip"
        className="absolute right-0 top-0 bottom-0 px-3 sm:px-4 bg-gradient-to-l from-[#4B2E1E] via-[#4B2E1E] to-transparent flex items-center justify-center text-[#FFF7E9]/75 hover:text-[#FFF7E9] transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/**
 * Premium, dismissible Thanksgiving popup in the bottom-right corner.
 */
export default function ThanksgivingBanner() {
  return null;
}
