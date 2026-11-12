"use client";

import React from "react";

/**
 * Editorial SVG Autumn Foliage Corner Cluster (Soft Botanical Maple, Olive & Wheat)
 * Palette: Burnt Orange (#B85C32), Pumpkin Amber (#D99438), Golden Yellow (#E8B85C),
 * Autumn Brown (#69452F), Muted Olive (#81804F)
 */
export function AutumnFoliageCorner({
  className = "",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const transform = [flipX ? "scaleX(-1)" : "", flipY ? "scaleY(-1)" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={transform ? { transform } : undefined}
    >
      <defs>
        <linearGradient id="tg-maple-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B85C" />
          <stop offset="100%" stopColor="#B85C32" />
        </linearGradient>
        <linearGradient id="tg-maple-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7E9" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#E8B85C" />
          <stop offset="100%" stopColor="#D99438" />
        </linearGradient>
        <linearGradient id="tg-olive-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A9962" />
          <stop offset="100%" stopColor="#81804F" />
        </linearGradient>
      </defs>

      {/* Gentle botanical stem */}
      <path
        d="M6 12C48 22 86 48 122 92"
        stroke="#81804F"
        strokeWidth="1.2"
        strokeOpacity="0.28"
        strokeLinecap="round"
      />

      {/* Soft Curved Maple Leaf */}
      <g transform="translate(18, 6) rotate(-8)">
        <path
          d="M28 6C29.5 12 31.5 16 35 16.5C39 17 42 14.5 44 13C43 17.5 42 21 44.5 23.5C47 26 51 25.5 54 26.5C50 29.5 46.5 31 46 34.5C45.5 38 48 40.5 49 43C44.5 43 40 42 37.5 44C35 46 35.5 49 35 51C32.5 48.5 30 47.5 28 47.5C26 47.5 23.5 48.5 21 51C20.5 49 21 46 18.5 44C16 42 11.5 43 7 43C8 40.5 10.5 38 10 34.5C9.5 31 6 29.5 2 26.5C5 25.5 9 26 11.5 23.5C14 21 13 17.5 12 13C14 14.5 17 17 21 16.5C24.5 16 26.5 12 28 6Z"
          fill="url(#tg-maple-1)"
          fillOpacity="0.62"
        />
        <path
          d="M28 15V46M28 29L18 25M28 29L38 25"
          stroke="#FFF7E9"
          strokeWidth="0.9"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </g>

      {/* Secondary Warm Golden Leaf */}
      <g transform="translate(82, 34) rotate(22) scale(0.72)">
        <path
          d="M28 6C29.5 12 31.5 16 35 16.5C39 17 42 14.5 44 13C43 17.5 42 21 44.5 23.5C47 26 51 25.5 54 26.5C50 29.5 46.5 31 46 34.5C45.5 38 48 40.5 49 43C44.5 43 40 42 37.5 44C35 46 35.5 49 35 51C32.5 48.5 30 47.5 28 47.5C26 47.5 23.5 48.5 21 51C20.5 49 21 46 18.5 44C16 42 11.5 43 7 43C8 40.5 10.5 38 10 34.5C9.5 31 6 29.5 2 26.5C5 25.5 9 26 11.5 23.5C14 21 13 17.5 12 13C14 14.5 17 17 21 16.5C24.5 16 26.5 12 28 6Z"
          fill="url(#tg-maple-2)"
          fillOpacity="0.58"
        />
      </g>

      {/* Soft Olive Leaves */}
      <ellipse
        cx="26"
        cy="66"
        rx="11"
        ry="5.5"
        transform="rotate(-38 26 66)"
        fill="url(#tg-olive-1)"
        fillOpacity="0.48"
      />
      <ellipse
        cx="46"
        cy="82"
        rx="9.5"
        ry="4.8"
        transform="rotate(-18 46 82)"
        fill="url(#tg-olive-1)"
        fillOpacity="0.42"
      />
      <ellipse
        cx="72"
        cy="20"
        rx="8"
        ry="4"
        transform="rotate(24 72 20)"
        fill="#E8B85C"
        fillOpacity="0.48"
      />

      {/* Delicate Warm Accent Dots */}
      <circle cx="104" cy="76" r="3" fill="#E8B85C" fillOpacity="0.55" />
      <circle cx="116" cy="86" r="2.2" fill="#D99438" fillOpacity="0.5" />
      <circle cx="64" cy="96" r="2.4" fill="#E8B85C" fillOpacity="0.45" />
    </svg>
  );
}

/**
 * Sophisticated Editorial Harvest Visual (Cream/Amber Pumpkin + Soft Maple Leaf + Olive Sprig)
 * Non-cartoonish, warm editorial vector illustration.
 */
export function HarvestArrangementSvg({ className = "w-14 h-14" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {/* Muted Olive Sprig behind */}
      <path
        d="M12 46C18 36 26 28 36 22"
        stroke="#81804F"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="18" cy="34" rx="4.2" ry="2.3" transform="rotate(-35 18 34)" fill="#81804F" fillOpacity="0.82" />
      <ellipse cx="26" cy="27" rx="4.2" ry="2.3" transform="rotate(-25 26 27)" fill="#81804F" fillOpacity="0.72" />

      {/* Soft Maple Leaf accent */}
      <g transform="translate(30, 8) rotate(14) scale(0.55)">
        <path
          d="M24 5C25.5 10.5 27.5 13.5 30.5 14C34 14.5 36.5 12 38 11C37 15 36.5 18 38.5 20.5C40.5 22.5 44 22 46.5 23C43 25.5 40 27 39.5 30C39 33 41 35 42 37.5C38 37.5 34.5 36.5 32.5 38C30.5 39.5 30.5 42.5 30 44C28 42 26 41 24 41C22 41 20 42 18 44C17.5 42.5 17.5 39.5 15.5 38C13.5 36.5 10 37.5 6 37.5C7 35 9 33 8.5 30C8 27 5 25.5 1.5 23C4 22 7.5 22.5 9.5 20.5C11.5 18 11 15 10 11C11.5 12 14 14.5 17.5 14C20.5 13.5 22.5 10.5 24 5Z"
          fill="#E8B85C"
        />
      </g>

      {/* Editorial Heirloom Pumpkin */}
      <path
        d="M32 23C32 20 33.5 18 35.5 17.5"
        stroke="#69452F"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="38" rx="16" ry="12" fill="#B85C32" />
      <ellipse cx="32" cy="38" rx="11" ry="12" fill="#D99438" />
      <ellipse cx="32" cy="38" rx="5.5" ry="12" fill="#E8B85C" />
      <path
        d="M32 26C35 31 35 45 32 50M32 26C29 31 29 45 32 50"
        stroke="#69452F"
        strokeWidth="0.9"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

/**
 * Refined Editorial Hairline Divider between homepage sections
 */
export function HarvestDivider() {
  return (
    <div
      className="w-full py-1 bg-transparent flex items-center justify-center px-6"
      aria-hidden="true"
    >
      <div className="max-w-4xl w-full flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D99438]/35 to-[#D99438]/60" />
        <svg viewBox="0 0 40 16" className="w-8 h-3.5 text-[#D99438]/80 shrink-0" fill="none">
          <ellipse cx="12" cy="8" rx="5" ry="2.4" transform="rotate(-18 12 8)" fill="currentColor" fillOpacity="0.65" />
          <circle cx="20" cy="8" r="2.2" fill="#B85C32" fillOpacity="0.75" />
          <ellipse cx="28" cy="8" rx="5" ry="2.4" transform="rotate(18 28 8)" fill="currentColor" fillOpacity="0.65" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D99438]/35 to-[#D99438]/60" />
      </div>
    </div>
  );
}

