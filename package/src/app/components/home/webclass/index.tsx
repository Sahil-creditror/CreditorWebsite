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
  <div className="flex flex-col items-center justify-center bg-white border border-blue-100 rounded-xl px-3.5 py-2 min-w-[64px] shadow-sm">
    <span className="text-2xl font-black tabular-nums text-slate-900 leading-none">
      {value}
    </span>
    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1">
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
      bg-gradient-to-br from-blue-100 via-white to-blue-900
      text-slate-800
      font-sans
      py-20
      lg:py-24
      selection:bg-blue-600
      selection:text-white
      "
    >
      {/* --- Dynamic Three-Wave Ambient Background System --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Soft underlying glows */}
        <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-sky-200/20 rounded-full blur-[110px]" />

        <svg
          className="absolute w-full h-full min-w-[1440px] opacity-70"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.40" />
              <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Wave Line 1: Primary Structural Flow */}
          <motion.path
            animate={{
              d: [
                "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350",
                "M -100 280 C 250 350, 550 150, 850 250 C 1150 350, 1350 250, 1600 380",
                "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350"
              ]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            stroke="url(#wave-grad-1)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Wave Line 2: Subtle Echo Flow */}
          <motion.path
            animate={{
              d: [
                "M -100 450 C 200 300, 600 500, 1000 350 C 1250 250, 1400 400, 1600 450",
                "M -100 410 C 250 360, 550 420, 950 380 C 1200 340, 1450 360, 1600 410",
                "M -100 450 C 200 300, 600 500, 1000 350 C 1250 250, 1400 400, 1600 450"
              ]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            stroke="url(#wave-grad-2)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* Wave Line 3: High Amplitude Ridge */}
          <motion.path
            animate={{
              d: [
                "M -100 150 C 400 50, 450 350, 800 200 C 1100 80, 1200 300, 1600 120",
                "M -100 120 C 350 90, 500 280, 850 240 C 1050 120, 1250 260, 1600 150",
                "M -100 150 C 400 50, 450 350, 800 200 C 1100 80, 1200 300, 1600 120"
              ]
            }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            stroke="url(#wave-grad-1)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-12 px-4 sm:px-6 lg:px-8 z-10">

        {/* LEFT CONTENT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex gap-6 md:gap-8 items-stretch"
        >
          {/* Brand Stylized Vertical Separator Bar */}
          <div className="w-[4px] sm:w-[6px] bg-gradient-to-b from-blue-600 via-sky-500 to-transparent rounded-full flex-shrink-0" />

          <div className="flex flex-col justify-center gap-6 py-2">
            <div>
              {/* Event Header Pill - Changed to highlight Webinar training */}
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-md mb-5 shadow-md shadow-blue-600/10">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Free Live Webinar Training
              </div>

              {/* Bold Headline Transformation */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 uppercase leading-[1.05]">
                Become & <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
                  Operate Private
                </span>
              </h1>
            </div>

            {/* Changed content to focus on the live masterclass webinar broadcast */}
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-[1.7] max-w-2xl font-medium">
              Secure your spot for this exclusive webinar event. Learn the exact framework private individuals use to step completely outside the public system, eliminate standard liabilities, and unlock true financial sovereignty with Creditor Academy.
            </p>

            {/* Checklist Matrix Alignment */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
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

            <div className="w-full h-px bg-blue-200/40 my-3" />

            {/* Action Frame & Live Countdown integration - Retuned for webinar terminology */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/60 backdrop-blur-md border border-blue-100 p-5 rounded-2xl shadow-md shadow-blue-900/5 max-w-xl">
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Next Live Broadcast In
                </p>
                <div className="flex items-center gap-1">
                  <CountUnit value={pad(h)} label="hrs" />
                  <span className="text-lg font-bold text-blue-200 px-0.5">:</span>
                  <CountUnit value={pad(m)} label="min" />
                  <span className="text-lg font-bold text-blue-200 px-0.5">:</span>
                  <CountUnit value={pad(s)} label="sec" />
                </div>
              </div>

              <Link
                href="/webinar"
                className="group inline-flex items-center justify-center gap-3 bg-[#FFC107] hover:bg-[#FFB300] text-black font-bold text-sm uppercase tracking-wide rounded-xl px-6 py-3.5 shadow-md shadow-yellow-500/20 transition-all duration-200 text-center sm:w-auto"
              >
                Claim Free Webinar Seat
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
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-xl group aspect-[4/5] shadow-xl shadow-blue-900/10 border border-blue-100">
            {/* Core Presenter Photograph Container */}
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950">
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
                alt="PaulMichael Rowland"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
              />

              {/* Dynamic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

              {/* Webinar Status Overlay Badge */}
              <div className="absolute top-4 right-4 bg-red-600 border border-red-500 shadow-md rounded-full px-3 py-1 flex items-center gap-1.5 z-20">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-white uppercase tracking-wider">
                  Live Webinar Room
                </span>
              </div>

              {/* Presenter Description Nameplate Overlay */}
              <div className="absolute bottom-5 left-5 right-5 bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-xl rounded-xl p-4 z-20">
                <p className="text-base text-white font-black tracking-tight leading-none uppercase">
                  PaulMichael Rowland
                </p>
                <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mt-1.5">
                  Founder & Host, Creditor Academy
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}