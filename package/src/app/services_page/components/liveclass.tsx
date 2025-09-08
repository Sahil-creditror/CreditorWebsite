"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  tuesdayLink?: string;
  thursdayLink?: string;
  backgroundImage?: string;
  meetingHourEst?: number;
  meetingMinute?: number;
  activeWindowBeforeMinutes?: number;
  activeWindowAfterMinutes?: number;
  className?: string;
};

export default function LiveJoinHero({
  tuesdayLink = "#",
  thursdayLink = "#",
  backgroundImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1770&auto=format&fit=crop",
  meetingHourEst = 18,
  meetingMinute = 0,
  activeWindowBeforeMinutes = 30,
  activeWindowAfterMinutes = 60,
  className = "",
}: Props) {
  const timeZone = "America/New_York";

  // ---------- helpers ----------
  const fmtParts = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
      .formatToParts(date)
      .reduce<Record<string, string>>((acc, p) => {
        if (p.type !== "literal") acc[p.type] = p.value;
        return acc;
      }, {});
    return {
      weekday: parts.weekday ?? "Sunday",
      hour: parseInt(parts.hour ?? "0", 10),
      minute: parseInt(parts.minute ?? "0", 10),
    };
  };

  const weekdayToIndex: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  const humanMeetingLabel = useMemo(() => {
    const h = meetingHourEst % 12 || 12;
    const ampm = meetingHourEst >= 12 ? "PM" : "AM";
    return `Tue & Thu · ${h}:${pad2(meetingMinute)} ${ampm} ET`;
  }, [meetingHourEst, meetingMinute]);

  // ---------- live time (NY) ----------
  const [nowParts, setNowParts] = useState(() => fmtParts(new Date()));
  useEffect(() => {
    const id = setInterval(() => setNowParts(fmtParts(new Date())), 30_000);
    return () => clearInterval(id);
  }, []);

  const { weekday, hour, minute } = nowParts;
  const nowMinutes = hour * 60 + minute;
  const meetingMinutes = meetingHourEst * 60 + meetingMinute;
  const windowStart = meetingMinutes - activeWindowBeforeMinutes;
  const windowEnd = meetingMinutes + activeWindowAfterMinutes;

  const isTue = weekday === "Tuesday";
  const isThu = weekday === "Thursday";
  const isMeetingDay = isTue || isThu;
  const todayLink = isTue ? tuesdayLink : isThu ? thursdayLink : "";
  const isWithinWindow = nowMinutes >= windowStart && nowMinutes <= windowEnd;
  const isActive = Boolean(todayLink) && isMeetingDay && isWithinWindow;

  // ---------- countdown to next session ----------
  const wIdx = weekdayToIndex[weekday] ?? 0;
  const nextOffsetDays = (() => {
    if (isTue) return nowMinutes < windowStart ? 0 : 2;
    if (isThu) return nowMinutes < windowStart ? 0 : 5;
    const targets = [2, 4];
    const deltas = targets.map((t) => (t - wIdx + 7) % 7);
    return Math.min(...deltas);
  })();

  const minutesToStart =
    (nextOffsetDays === 0
      ? Math.max(0, meetingMinutes - nowMinutes)
      : (24 * 60 - nowMinutes) + (nextOffsetDays - 1) * 24 * 60 + meetingMinutes);

  const countdownLabel = (() => {
    const d = Math.floor(minutesToStart / (60 * 24));
    const h = Math.floor((minutesToStart % (60 * 24)) / 60);
    const m = minutesToStart % 60;
    if (minutesToStart <= 0) return "Starting now";
    if (d > 0) return `Starts in ${d}d ${h}h ${m}m`;
    if (h > 0) return `Starts in ${h}h ${m}m`;
    return `Starts in ${m}m`;
  })();

  const nextDayLabel = (() => {
    if (isTue && nowMinutes < windowStart) return "Today (Tue)";
    if (isThu && nowMinutes < windowStart) return "Today (Thu)";
    const labelByIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const nextIdx = (wIdx + nextOffsetDays) % 7;
    return labelByIdx[nextIdx];
  })();

  // ---------- parallax ----------
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [isHovering, setIsHovering] = useState(false);

  // ---------- stable particles (seeded RNG to avoid hydration mismatch) ----------
  const particles = useMemo(() => {
    const createRng = (seed: number) => {
      let t = seed >>> 0;
      return () => {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    };

    return Array.from({ length: 15 }, (_, i) => {
      const rng = createRng(1337 + i * 1013904223);
      const top = rng() * 100;
      const left = rng() * 100;
      const width = rng() * 10 + 2;
      const height = rng() * 10 + 2;
      const dx = rng() * 20 - 10;
      const duration = rng() * 10 + 10;
      const delay = rng() * 5;
      return { top, left, width, height, dx, duration, delay };
    });
  }, []);

  return (
    <section
      className={`relative overflow-hidden bg-fixed bg-center bg-cover ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-label="Live classes hero"
    >
      {/* Reduced overlay for visibility */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, p.dx, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y, willChange: "transform" }}
        className="relative z-10 min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center"
      >
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Join our live classes
          </motion.h1>

          <motion.p
            className="mt-4 text-xl sm:text-2xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Expert-led sessions, real-time Q&A, and hands-on walkthroughs.
            Learn, build, and ship with us.
          </motion.p>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            {isActive ? (
              <motion.a
                href={todayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 rounded-xl px-8 py-4 font-semibold text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-red-400"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Gradient + glow */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-red-600 to-red-500 shadow-[0_0_25px_rgba(255,0,0,0.6)]"></span>

                {/* Hover shimmer */}
                <motion.span
                  className="absolute inset-0 rounded-xl opacity-0"
                  animate={{ opacity: isHovering ? 0.25 : 0 }}
                  style={{
                    background:
                      "linear-gradient(120deg, rgba(255,255,255,.35) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,.35) 70%, rgba(255,255,255,0) 100%)",
                    backgroundSize: "200% 100%",
                  }}
                />

                <span className="relative flex items-center gap-3">
                  <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M10 3v12l8-6-8-6z" />
                  </svg>
                  Join Live now
                </span>

                {/* Outer glow */}
                <span className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-white/20 group-hover:ring-white/30"></span>
              </motion.a>
            ) : (
              <motion.button
                disabled
                className="group relative inline-flex cursor-not-allowed items-center gap-3 rounded-xl px-8 py-4 font-semibold text-white/90"
                title={`Available ${humanMeetingLabel}`}
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-red-600 to-red-500 shadow-[0_0_25px_rgba(255,0,0,0.4)]"></span>
                <span className="relative flex items-center gap-3">
                  <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M10 3v12l8-6-8-6z" />
                  </svg>
                  Join Live now
                </span>
                <span className="pointer-events-none absolute -inset-px rounded-xl ring-1 ring-white/10"></span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient ribbon */}
      <motion.div 
        className="pointer-events-none absolute -bottom-48 left-1/2 -translate-x-1/2 h-[560px] w-[1200px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent blur-3xl opacity-40"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      
    </section>
  );
}
