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
        document.documentElement.style.setProperty("--tg-strip-offset", "32px");
      } else {
        document.documentElement.style.setProperty("--tg-strip-offset", "0px");
      }
    } catch {
      setVisible(true);
      document.documentElement.style.setProperty("--tg-strip-offset", "32px");
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
      className="fixed top-0 left-0 right-0 z-[55] h-8 bg-gradient-to-r from-[#69452F] via-[#7A4E33] to-[#69452F] text-[#FFF7E9] border-b border-[#E8B85C]/35 flex items-center overflow-hidden text-[11px] sm:text-xs"
    >
      <div className="flex-1 overflow-hidden pr-9">
        <div className="thanksgiving-marquee-track flex w-max items-center whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 px-4">
              {marqueeItems.map((text, idx) => (
                <span key={idx} className="inline-flex items-center gap-2.5 font-medium tracking-wide">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E8B85C]" aria-hidden="true" />
                  <span>{text}</span>
                </span>
              ))}
              <Link
                href="/webinar"
                className="inline-flex items-center gap-1 text-[#E8B85C] hover:text-[#FFF7E9] font-semibold underline underline-offset-2 transition-colors"
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
        className="absolute right-0 top-0 bottom-0 px-2.5 sm:px-3.5 bg-gradient-to-l from-[#69452F] via-[#69452F] to-transparent flex items-center justify-center text-[#FFF7E9]/80 hover:text-[#FFF7E9] transition-colors cursor-pointer"
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
