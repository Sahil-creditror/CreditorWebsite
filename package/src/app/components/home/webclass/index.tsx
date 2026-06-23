"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useCountdown() {
  const getNext = () => {
    const next = new Date();
    next.setMinutes(0, 0, 0);
    next.setHours(next.getHours() + 1);
    return next;
  };

  const [target, setTarget] = useState<Date>(getNext);
  const [t, setT] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        setTarget(getNext());
        return;
      }

      setT({
        h: Math.floor(diff / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
      });
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [target]);

  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");

const BENEFITS = [
  "Step outside the public system entirely",
  "Limit liability and protect your assets",
  "Achieve true financial sovereignty",
];

const CountUnit = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 min-w-[64px]">
    <span className="text-2xl font-black tabular-nums text-slate-900 leading-none">
      {value}
    </span>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
      {label}
    </span>
  </div>
);

export default function WebclassSection() {
  const { h, m, s } = useCountdown();

  return (
    <section
      className="
  relative
  overflow-hidden
  bg-slate-50
  text-slate-800
  font-sans
  py-16
  lg:py-24
  selection:bg-blue-600
  selection:text-white
  "
    >
      {/* Blue circle gradient glow */}
      <div
        className="
    absolute
    -bottom-40
    -left-40
    w-[550px]
    h-[550px]
    rounded-full
    bg-blue-400/30
    blur-[120px]
    pointer-events-none
    "
      />
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/70 rounded-full blur-[100px] -z-10" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 px-4 sm:px-6 lg:px-8">

        {/* LEFT CONTENT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex gap-6 md:gap-8 items-stretch"
        >
          {/* Brand Stylized Vertical Separator Bar Inspired by image_0a9aa5.jpg */}
          <div className="w-[4px] sm:w-[6px] bg-blue-600 rounded-full flex-shrink-0" />

          <div className="flex flex-col justify-center gap-6 py-2">
            <div>
              {/* Event Header Pill */}
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-md mb-5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Master Class • Live Session
              </div>

              {/* Bold Headline Transformation */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.05]">
                Become and <br />
                <span className="text-blue-600">Operate Private</span>
              </h1>
            </div>

            <p className="text-[15px] sm:text-16px text-slate-600 leading-[1.7] max-w-2xl font-normal">
              Learn how private individuals step outside the public system to gain
              control, limit liability, and achieve financial sovereignty with
              Creditor Academy's core principles.
            </p>

            {/* Checklist Matrix Alignment */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[13.5px] font-bold text-slate-700 leading-snug">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <div className="w-full h-px bg-slate-200/80 my-3" />

            {/* Action Frame & Live Countdown integration */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm max-w-xl">
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Next session starts in
                </p>
                <div className="flex items-center gap-1">
                  <CountUnit value={pad(h)} label="hrs" />
                  <span className="text-lg font-bold text-slate-300 px-0.5">:</span>
                  <CountUnit value={pad(m)} label="min" />
                  <span className="text-lg font-bold text-slate-300 px-0.5">:</span>
                  <CountUnit value={pad(s)} label="sec" />
                </div>
              </div>

              <Link
                href="/webinar"
                className="group inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wide rounded-xl px-6 py-3.5 shadow-md shadow-blue-600/10 transition-all duration-200 text-center sm:w-auto"
              >
                Secure your free seat
                <svg
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE COLUMN - PREMIUM COMPOSITED MARKETING CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="relative  overflow-hidden group aspect-[4/5]">

            {/* Geometric Vector Swirl Accents inspired by image_0a9aa5.jpg background elements */}
            <div className="absolute top-0 right-0 w-44 h-44  pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64  pointer-events-none" />

            {/* Elegant inner dynamic border wrapper */}
            <div className="absolute inset-4 pointer-events-none z-10" />

            {/* Core Presenter Photograph Container */}
            <div className="relative w-full h-full  overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950">
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
                alt="PaulMichael Rowland"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top transition-transform duration-500 "
              />

              {/* Dynamic Abstract Wave Overlay on Lower Bound */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Live Streaming Meta Tag Overlay */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-md rounded-full px-3 py-1 flex items-center gap-1.5 z-20">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-wider">
                  Live Stream
                </span>
              </div>

              {/* Presenter Description Nameplate Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-4 z-20">
                <p className="text-base text-white font-black tracking-tight leading-none">
                  PaulMichael Rowland
                </p>
                <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mt-1.5">
                  Founder & CEO, Creditor Academy
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}