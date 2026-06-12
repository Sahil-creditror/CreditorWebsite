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
      if (diff <= 0) { setTarget(getNext()); return; }
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

const CountUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-1 bg-white/7 border border-white/12 rounded-xl px-4 py-2.5 min-w-[60px]">
    <span className="text-[26px] font-extrabold tabular-nums text-white leading-none tracking-tight">
      {value}
    </span>
    <span className="text-[9px] font-semibold text-white/28 uppercase tracking-widest">
      {label}
    </span>
  </div>
);

export default function WebclassSection() {
  const { h, m, s } = useCountdown();

  return (
    <section className="bg-[#2043B1] text-white font-sans selection:bg-white selection:text-[#0f2a6e] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

        {/* ── LEFT: Content ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col justify-center gap-6 px-8 sm:px-12 lg:px-16 py-16"
        >
          {/* Eyebrow */}
          <p className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.12em]">
            Secrets to operating private
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-[44px] lg:text-[46px] font-black leading-[1.08] tracking-tight">
            Become and{" "}
            <span className="text-[#ea9840]">Operate</span>{" "}
            Private
          </h1>

          {/* Description */}
          <p className="text-[14px] text-white/70 leading-[1.75] max-w-[400px] font-normal">
            Learn how private individuals step outside the public system to gain
            control, limit liability, and achieve financial sovereignty with
            Creditor Academy's core principles.
          </p>

          {/* Benefits */}
          <ul className="flex flex-col gap-2.5">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="w-[18px] h-[18px] rounded-full bg-sky-400/12 border border-sky-400/30 flex items-center justify-center flex-shrink-0 mt-[2px]">
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[13px] font-medium text-white/70 leading-snug">{b}</span>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="border-white/10" />

          {/* Countdown + CTA row */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8">
            {/* Countdown */}
            <div>
              <p className="text-[10px] font-bold text-white/28 uppercase tracking-widest mb-2.5">
                Next session starts in
              </p>
              <div className="flex items-center gap-1.5">
                <CountUnit value={pad(h)} label="hrs" />
                <span className="text-xl font-light text-white/20 mb-3.5">:</span>
                <CountUnit value={pad(m)} label="min" />
                <span className="text-xl font-light text-white/20 mb-3.5">:</span>
                <CountUnit value={pad(s)} label="sec" />
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2">
              <Link
                href="/webinar"
                className="group inline-flex items-center gap-3 bg-white hover:bg-sky-50 text-[#0f2a6e] font-extrabold text-[13px] uppercase tracking-wider rounded-full pl-6 pr-2 py-2 transition-all duration-150 w-fit active:scale-[0.98]"
              >
                Secure your free seat
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0f2a6e] transition-transform duration-300 group-hover:rotate-45 flex-shrink-0">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>
              <p className="text-[11px] text-white/25 pl-1">
                100% free ·{" "}
                <span className="text-sky-300/75">Limited spots available</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT: Speaker photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-[400px] lg:min-h-0"
        >
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
            alt="Paul Michael Rowland — Founder, Creditor Academy"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-top brightness-[0.82]"
          />

          {/* Left-side gradient bleed into content */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f2a6e]/80 via-[#0f2a6e]/10 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a6e]/60 via-transparent to-transparent" />

          {/* Live tag */}
          <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-white rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-[#0f2a6e] uppercase tracking-widest">
              Live stream
            </span>
          </div>

          {/* Speaker info */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-1.5">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
              <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest">
                Free webclass
              </span>
            </div>
            <p className="text-[17px] font-black text-white leading-tight tracking-tight">
              Paul Michael Rowland
            </p>
            <p className="text-xs text-white/45 font-normal">Founder, Creditor Academy</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}