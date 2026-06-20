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
  <div className="flex flex-col items-center gap-1 bg-white border border-blue-100 shadow-sm rounded-xl px-4 py-2.5 min-w-[60px] backdrop-blur-sm">
    <span className="text-[26px] font-extrabold tabular-nums text-slate-900 leading-none">
      {value}
    </span>
    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
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
      bg-gradient-to-br
      from-sky-200
      via-indigo-100
      to-blue-200
      text-slate-800
      font-sans
      selection:bg-blue-600
      selection:text-white
      "
    >
      {/* Dynamic light glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-sky-400/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="
          flex
          flex-col
          justify-center
          gap-6
          px-6
          sm:px-12
          lg:px-16
          py-16
          "
        >
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.15em]">
            Secrets to operating private
          </p>

          <h1 className="text-4xl md:text-[44px] lg:text-[46px] font-black leading-[1.08] tracking-tight text-slate-900">
            Become and{" "}
            <span className="text-blue-600">
              Operate
            </span>{" "}
            Private
          </h1>

          <p className="text-[14px] text-slate-600 leading-[1.75] max-w-[440px]">
            Learn how private individuals step outside the public system to gain
            control, limit liability, and achieve financial sovereignty with
            Creditor Academy's core principles.
          </p>

          <ul className="flex flex-col gap-3">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3"
              >
                <span className="
                w-[18px]
                h-[18px]
                rounded-full
                bg-blue-600/10
                border
                border-blue-600/20
                flex
                items-center
                justify-center
                mt-[2px]
                "
                >
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span className="text-[13px] font-medium text-slate-700">
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <hr className="border-slate-200/80 my-2" />

          <div className="flex flex-col sm:flex-row sm:items-end gap-8">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                Next session starts in
              </p>

              <div className="flex items-center gap-1.5">
                <CountUnit value={pad(h)} label="hrs" />
                <span className="text-xl font-bold text-slate-300 mb-3">:</span>
                <CountUnit value={pad(m)} label="min" />
                <span className="text-xl font-bold text-slate-300 mb-3">:</span>
                <CountUnit value={pad(s)} label="sec" />
              </div>
            </div>

            <Link
              href="/webinar"
              className="
              group
              inline-flex
              items-center
              gap-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-bold
              text-[13px]
              uppercase
              tracking-wide
              rounded-full
              pl-6
              pr-2
              py-2
              w-fit
              shadow-md
              shadow-blue-600/15
              transition-all
              "
            >
              Secure your free seat
              <span
                className="
                w-8
                h-8
                rounded-full
                flex
                items-center
                justify-center
                bg-white/10
                backdrop-blur-sm
                transition-transform
                duration-300
                group-hover:rotate-45
                "
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>

        {/* IMAGE RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="
          relative
          min-h-[440px]
          lg:min-h-0
          "
        >
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
            alt="PaulMichael Rowland"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="
            object-cover
            object-top
            "
          />

          {/* Live Indicator pill */}
          <div className="
          absolute
          top-6
          right-6
          bg-white/90
          backdrop-blur-md
          border border-slate-100
          shadow-sm
          rounded-full
          px-3
          py-1.5
          flex
          items-center
          gap-2
          ">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="
            text-[10px]
            font-extrabold
            text-slate-800
            uppercase
            tracking-wider
            ">
              Live stream
            </span>
          </div>

          {/* Floating Caption Nameplate */}
          <div className="
          absolute
          bottom-6
          left-6
          bg-white/80
          backdrop-blur-md
          border border-white/40
          shadow-lg shadow-slate-900/5
          rounded-xl
          p-4
          ">
            <p className="text-base text-slate-900 font-bold leading-tight">
              PaulMichael Rowland
            </p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              Founder and CEO, Creditor Academy
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}