"use client";

import React from "react";

type LeafType = "maple" | "petal";

interface LeafSpec {
  id: number;
  type: LeafType;
  left: string;
  size: number;
  duration: string;
  delay: string;
  c1: string;
  c2: string;
  opacity: number;
  sway: string;
}

const LEAVES: LeafSpec[] = [
  { id: 1, type: "maple", left: "6%", size: 22, duration: "16s", delay: "0s", c1: "#D99438", c2: "#B85C32", opacity: 0.55, sway: "28px" },
  { id: 2, type: "petal", left: "15%", size: 18, duration: "19s", delay: "-4s", c1: "#E8B85C", c2: "#D99438", opacity: 0.5, sway: "-24px" },
  { id: 3, type: "maple", left: "24%", size: 24, duration: "17.5s", delay: "-9s", c1: "#B85C32", c2: "#69452F", opacity: 0.48, sway: "26px" },
  { id: 4, type: "petal", left: "35%", size: 17, duration: "21s", delay: "-2s", c1: "#81804F", c2: "#69452F", opacity: 0.42, sway: "-20px" },
  { id: 5, type: "maple", left: "46%", size: 20, duration: "18s", delay: "-7s", c1: "#E8B85C", c2: "#B85C32", opacity: 0.48, sway: "22px" },
  { id: 6, type: "petal", left: "58%", size: 19, duration: "20s", delay: "-12s", c1: "#D99438", c2: "#69452F", opacity: 0.45, sway: "-26px" },
  { id: 7, type: "maple", left: "69%", size: 24, duration: "16.5s", delay: "-3s", c1: "#B85C32", c2: "#D99438", opacity: 0.52, sway: "28px" },
  { id: 8, type: "petal", left: "79%", size: 18, duration: "19.5s", delay: "-8s", c1: "#E8B85C", c2: "#81804F", opacity: 0.46, sway: "-22px" },
  { id: 9, type: "maple", left: "88%", size: 22, duration: "17s", delay: "-5s", c1: "#D99438", c2: "#B85C32", opacity: 0.55, sway: "24px" },
  { id: 10, type: "petal", left: "95%", size: 18, duration: "18.5s", delay: "-1.5s", c1: "#B85C32", c2: "#69452F", opacity: 0.48, sway: "-20px" },
];

function LeafSvg({ item }: { item: LeafSpec }) {
  const gradId = `tg-soft-leaf-${item.id}`;

  if (item.type === "petal") {
    return (
      <svg viewBox="0 0 32 32" className="w-full h-full">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={item.c1} />
            <stop offset="100%" stopColor={item.c2} />
          </linearGradient>
        </defs>
        {/* Smooth organic autumn leaf silhouette */}
        <path
          d="M16 3C21 8.5 24.5 14.5 22 21.5C20.3 26.2 16 28.5 16 28.5C16 28.5 11.7 26.2 10 21.5C7.5 14.5 11 8.5 16 3Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M16 6.5V29.5"
          stroke="#FFF7E9"
          strokeOpacity="0.35"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={item.c1} />
          <stop offset="100%" stopColor={item.c2} />
        </linearGradient>
      </defs>
      {/* Curved botanical maple leaf */}
      <path
        d="M18 3.5C19.6 7.8 20.6 9.8 22.8 10.6C24.2 8.9 25.8 8.2 27.6 8.6C26.4 11.2 26.5 13 28.2 14.5C30.4 14.2 32 14.8 33.2 16C30.6 18.2 29.4 19.6 29.8 21.8C27.5 22 25.8 23.2 25.2 25.2C23.4 24.6 21.6 24.8 19.2 26.2L19.4 32.5H16.6L16.8 26.2C14.4 24.8 12.6 24.6 10.8 25.2C10.2 23.2 8.5 22 6.2 21.8C6.6 19.6 5.4 18.2 2.8 16C4 14.8 5.6 14.2 7.8 14.5C9.5 13 9.6 11.2 8.4 8.6C10.2 8.2 11.8 8.9 13.2 10.6C15.4 9.8 16.4 7.8 18 3.5Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M18 8V26.5M18 18.5L11.5 15.5M18 18.5L24.5 15.5"
        stroke="#FFF7E9"
        strokeOpacity="0.32"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ThanksgivingLeaves() {
  return (
    <div
      className="thanksgiving-leaves-layer fixed inset-0 pointer-events-none z-[45] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle top-edge warm golden sunset ambient glow (clear of logo) */}
      <div className="hidden lg:block absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#E8B85C]/12 blur-3xl" />

      {LEAVES.map((item) => (
        <span
          key={item.id}
          className="thanksgiving-leaf absolute -top-12"
          style={
            {
              left: item.left,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: item.opacity,
              animationDuration: item.duration,
              animationDelay: item.delay,
              "--leaf-sway": item.sway,
              filter: "drop-shadow(0 2px 4px rgba(105, 69, 47, 0.16))",
            } as React.CSSProperties
          }
        >
          <LeafSvg item={item} />
        </span>
      ))}
    </div>
  );
}
