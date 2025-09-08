"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

// Register GSAP plugin safely (no-op on server)
if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    // ignore in non-browser environments
  }
}

type ProgramSectionProps = {
  onEnroll?: () => void;
};

export default function ProgramSection({ onEnroll }: ProgramSectionProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rippleRef = useRef<SVGSVGElement | null>(null);
  const priceRef = useRef<HTMLSpanElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Ripple circles animation (scoped to rippleRef)
      const circles = rippleRef.current
        ? Array.from(
            rippleRef.current.querySelectorAll<SVGCircleElement>(".ripple")
          )
        : [];

      circles.forEach((c, i) => {
        const dur = 3 + i * 1.1;
        gsap.fromTo(
          c,
          { attr: { r: 40 }, opacity: 0 },
          {
            attr: { r: 220 },
            opacity: 0.06,
            ease: "sine.inOut",
            duration: dur,
            repeat: -1,
            repeatDelay: 0.6 + i * 0.2,
            yoyo: true,
            stagger: { each: 0.2 },
          }
        );
      });

      // gentle floating of the hero card (scoped to cardRef)
      if (!prefersReducedMotion && cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 8 },
          { y: -8, ease: "sine.inOut", duration: 3.5, repeat: -1, yoyo: true }
        );
      }

      // price counter
      if (priceRef.current && !prefersReducedMotion) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 69,
          duration: 1.6,
          delay: 0.6,
          ease: "power3.out",
          onUpdate: () => {
            if (priceRef.current) priceRef.current.textContent = `$${Math.round(obj.val)}`;
          },
        });
      } else if (priceRef.current) {
        priceRef.current.textContent = "$69";
      }

      // Card entrance animation with ScrollTrigger (scoped to cardRef)
      if (cardRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 40,
            rotationX: 5,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // subtle parallax for ripple on pointermove (works on touch & mouse)
      const onMove = (e: PointerEvent) => {
        const el = wrapRef.current;
        if (!el || !rippleRef.current) return;
        const rect = el.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width - 0.5;
        const my = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(rippleRef.current, { x: mx * 18, y: my * 10, duration: 0.9, ease: "power2.out" });
      };

      if (!prefersReducedMotion) {
        wrapRef.current?.addEventListener("pointermove", onMove);
      }

      // cleanup handler inside gsap.context; ctx.revert() will also clear tweens
      return () => {
        if (!prefersReducedMotion) wrapRef.current?.removeEventListener("pointermove", onMove);
      };
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  const heading = {
    hidden: { opacity: 0, y: 12 },
    visible: (i = 1) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5 } }),
  };

  const list = {
    hidden: { opacity: 0, x: -10 },
    visible: (i = 1) => ({ opacity: 1, x: 0, transition: { delay: 0.15 * i, duration: 0.45 } }),
  };

  return (
    <section
      ref={wrapRef}
      aria-label="90 day program CTA"
      className={
        "relative overflow-hidden py-12 sm:py-16 lg:py-24 " +
        // Light theme (default): soft white/blue background + dark text
        "bg-gradient-to-br from-white via-sky-50 to-sky-100 text-slate-900 " +
        // Dark theme: blue-tinted dark background + light text
        "dark:from-slate-900 dark:via-sky-900 dark:to-slate-800 dark:text-slate-50"
      }
    >
      {/* Ripple SVG background (pointer-events-none so it doesn't block taps)
          CHANGES:
          - mix-blend-multiply in light mode so colors remain visible over white
          - dark:mix-blend-screen for soft glow in dark mode
          - opacity increased in light mode (opacity-100) and slightly reduced in dark (dark:opacity-70)
      */}
      <svg
        ref={rippleRef}
        className="pointer-events-none absolute inset-0 w-full h-full mix-blend-multiply dark:mix-blend-screen opacity-100 dark:opacity-70"
        viewBox="0 0 1400 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="g1" cx="50%" cy="40%">
            {/* slightly stronger in light so it's visible; dark mode opacity is handled by svg class above */}
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.06" />
          </radialGradient>
        </defs>

        <rect width="1400" height="800" fill="url(#g1)" />

        {/* Big ambient circles that pulse via GSAP
            Increased base opacity so they show through light backgrounds; dark mode will tone them via svg opacity.
        */}
        <g className="ripple-group">
          <circle className="ripple" cx="200" cy="120" r="40" fill="#60a5fa" opacity="0.14" />
          <circle className="ripple" cx="1100" cy="420" r="40" fill="#38bdf8" opacity="0.14" />
          <circle className="ripple" cx="700" cy="620" r="40" fill="#93c5fd" opacity="0.14" />
          <circle className="ripple" cx="400" cy="320" r="40" fill="#60a5fa" opacity="0.14" />
        </g>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Left - Content */}
          <div className="relative">
            {/* Glow Accent Behind Heading */}
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-sky-400/20 blur-3xl animate-pulse hidden sm:block" />

            <motion.h2
                initial="hidden"
                animate="visible"
                custom={1}
                variants={heading}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 dark:from-sky-300 dark:via-sky-200 dark:to-white bg-clip-text text-transparent relative"
            >
                <span className="relative inline-block">
                Private Operation:
                <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-clip-text text-transparent" />
                </span>
                <br />
                <span className="block">90-Day Accelerator</span>
            </motion.h2>

            <motion.p
                initial="hidden"
                animate="visible"
                custom={2}
                variants={heading}
                className="mt-6 text-slate-700 dark:text-slate-200 max-w-2xl text-lg sm:text-xl leading-relaxed font-light"
            >
                A focused 90-day program combining{" "}
                <span className="font-semibold text-sky-600 dark:text-sky-300">video training</span>,{" "}
                <span className="font-semibold text-sky-600 dark:text-sky-300">templates</span>, and{" "}
                <span className="font-semibold text-sky-600 dark:text-sky-300">live group mentorship</span>{" "}
                to help founders, creators, and investors run fully private, profitable operations.
            </motion.p>

            {/* Feature Cards */}
            <motion.ul
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl"
                initial="hidden"
                animate="visible"
            >
                {[
                "Video training + action templates",
                "Live weekly group mentorship",
                "Business & launch playbooks",
                "Community support + accountability",
                ].map((txt, i) => (
                <motion.li
                    key={i}
                    custom={i + 1}
                    variants={list}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-800/40 border border-slate-200/30 dark:border-white/10 backdrop-blur-lg shadow-md hover:shadow-xl transition-all relative overflow-hidden"
                >
                    {/* Faint ripple behind icon */}
                    <div className="absolute -inset-1 opacity-0 hover:opacity-100 transition duration-500 rounded-2xl bg-gradient-to-r from-sky-400/20 to-sky-600/10 blur-xl" />
                    <svg
                    className="w-6 h-6 flex-none mt-1 text-sky-600 dark:text-sky-300 relative z-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    >
                    <path
                        d="M5 12l4 4L19 6"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    </svg>
                    <span className="text-slate-900 dark:text-slate-100 text-sm sm:text-base font-medium relative z-10">{txt}</span>
                </motion.li>
                ))}
            </motion.ul>

            {/* Info Badges */}
            <motion.div
                className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.9 } }}
            >
                {[
                { label: "Program Length", value: "90 Days" },
                { label: "Format", value: "Video + Templates + Live Mentorship" },
                ].map((info, idx) => (
                <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-sky-500/10 to-sky-400/5 dark:from-sky-400/20 dark:to-sky-300/10 border border-sky-500/20 dark:border-sky-300/20 backdrop-blur-md shadow-sm"
                >
                    <span className="text-xs uppercase tracking-wider text-sky-600 dark:text-sky-300 font-semibold">
                    {info.label}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{info.value}</span>
                </div>
                ))}
            </motion.div>

            {/* CTA Paragraph */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1.1 } }}
                className="mt-8 border-l-4 border-sky-500/50 dark:border-sky-300/50 pl-4"
            >
                <p className="text-slate-600 dark:text-slate-300 max-w-md text-base sm:text-lg leading-relaxed">
                <strong className="text-sky-600 dark:text-sky-300 font-bold">Limited spots open monthly.</strong>{" "}
                Enroll now and take the first step toward full private operation.
                </p>
            </motion.div>
          </div>

          {/* Right - Pricing Card */}
          <motion.div
            ref={cardRef}
            className="hero-card group relative rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-60 pointer-events-none" />

            <div className="relative z-10 bg-white/60 dark:bg-slate-900/40 border border-slate-200/10 dark:border-white/10 rounded-2xl p-6 sm:p-7 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-xl border border-slate-200 dark:border-slate-700">
                {/* Left: Enrollment Info */}
                <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 p-3 shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                        <path
                        d="M12 3v6l4 2"
                        stroke="currentColor"
                        strokeWidth={1.6}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </span>
                    <div>
                    <p className="text-sm text-black-500 dark:text-slate-400 uppercase tracking-wide font-semibold">
                        Enrollment Plan
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-sky-600 dark:text-sky-300">
                        $69 <span className="text-sm text-slate-500">/month</span>
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        For 3 months · Total $207
                    </p>
                    </div>
                </div>

                {/* Right: Total Highlight */}
                <div className="sm:text-right w-full sm:w-auto">
                    <p className="text-m font-bold text-slate-800 dark:text-slate-400">Total</p>
                    <p className="mt-1 text-4xl font-extrabold tracking-tight text-sky-600 dark:text-sky-300">
                    $207
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Billed over 3 months
                    </p>
                </div>
                </div>

                {/* What's Included */}
                <div className="mt-5 mb-5">
                <h3 className="text-base sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                    What's Included:
                </h3>
                <ul className="grid gap-3">
                    {[
                    "Lifetime access to videos & templates",
                    "Weekly live group mentorship (Q&A)",
                    "Private community + accountability",
                    ].map((t, idx) => (
                    <li
                        key={idx}
                        className="flex items-center text-slate-700 dark:text-slate-200 text-base sm:text-lg gap-3 py-2 border-b border-slate-200/6 dark:border-white/5"
                    >
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-500/10">
                        <svg className="w-4 h-4 text-sky-500" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </span>
                        <span>{t}</span>
                    </li>
                    ))}
                </ul>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <motion.button
                    onClick={() => {
                      if (onEnroll) {
                        onEnroll();
                      } else {
                        router.push("/tncmasterclass");
                      }
                    }}
                    className="relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-lg sm:text-xl text-white bg-gradient-to-r from-sky-500 to-sky-600 shadow-lg hover:brightness-105 transition-all duration-200"
                    aria-label="Enroll now"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="relative z-10">Join Now — $69/mo</span>
                </motion.button>

                {/* <motion.a
                    href="#book"
                    className="text-base inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-slate-200/10 bg-white/70 dark:bg-transparent text-slate-800 dark:text-slate-100 hover:bg-white/80 transition-all duration-200"
                    whileHover={{ x: 4 }}
                >
                    Book an appointment
                </motion.a> */}
                </div>

                {/* Fine Print */}
                <p className="mt-5 text-sm text-center text-slate-500 dark:text-slate-400">
                Ideal for: aspiring entrepreneurs, coaches, investors, creators, and freedom-seekers.
                </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient flare */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-20 lg:-bottom-28 h-40 lg:h-56 bg-gradient-to-t from-black/20 to-transparent blur-3xl" />
    </section>
  );
}
