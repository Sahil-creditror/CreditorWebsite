// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import InnovationPurpose from "./InnovationPurpose";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simple parallax style helper (no TypeScript, no window at top-level)
  const parallaxStyle = (factorX, factorY) => ({
    x: mousePos.x * factorX,
    y: mousePos.y * factorY,
  });

  const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay },
  });

  return (
    <div className="w-full bg-slate-950 text-slate-900">
      {/* ===================== SECTION 1 – HERO (DARK BLUE) ===================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-10 lg:px-16 pt-16 pb-10 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
        {/* Background grid + glow */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(30,64,175,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,64,175,0.2)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_55%)]" />

        {/* Floating orbs */}
        <motion.div
          style={parallaxStyle(0.03, 0.02)}
          className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-sky-500/30 blur-3xl"
        />
        <motion.div
          style={parallaxStyle(-0.02, -0.01)}
          className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/30 blur-3xl"
        />
        <motion.div
          style={parallaxStyle(0.015, -0.02)}
          className="pointer-events-none absolute top-1/3 right-1/3 h-44 w-44 rounded-full bg-cyan-400/20 blur-2xl"
        />

        <div className="relative z-10 grid w-full max-w-6xl gap-12 lg:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
          {/* Left: content */}
          <div className="space-y-8 text-slate-50">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-200"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Credit Boost • 2025
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            >
              Boost Your{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Credit Score
              </span>{" "}
              in Weeks, Not Years.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-xl text-sm md:text-base text-slate-200/90 leading-relaxed"
            >
              Tradeline Exchange Company gives you secure access to premium
              authorized user tradelines. Break free from credit invisibility
              with a transparent, data-driven approach that actually makes
              sense.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href="/services_page/tradeline-exchange/buy-tradelines"
                className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 px-7 py-3 text-sm md:text-base font-semibold text-slate-950 shadow-[0_20px_40px_rgba(56,189,248,0.6)] transition-transform duration-300 hover:translate-y-0.5 hover:shadow-[0_24px_60px_rgba(56,189,248,0.85)]"
              >
                <span className="relative z-10">Get Started Now</span>
                <motion.svg
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="relative z-10 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/40 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/services_page/tradeline-exchange/about"
                className="inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-slate-950/60 px-6 py-3 text-sm md:text-base font-medium text-slate-100 backdrop-blur-xl transition-all hover:bg-sky-500/15 hover:border-sky-200"
              >
                Learn how it works
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-2 flex flex-wrap items-center gap-5 text-xs md:text-sm text-slate-300/90"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-400/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                  100% SECURE
                </span>
                <span>No hard pulls, fully encrypted & verified.</span>
              </div>
              <span className="hidden h-4 w-px bg-slate-700 md:block" />
              <div className="flex flex-wrap items-center gap-3">
                {/* <span>⚡ Avg. results in 30–45 days</span>
                <span>•</span>
                <span>🏆 Trusted by 100K+ customers</span> */}
              </div>
            </motion.div>
          </div>

          {/* Right: interactive card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ y: -6 }}
              className="relative mx-auto max-w-md rounded-3xl border border-sky-400/40 bg-slate-950/80 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                    Projection
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-50">
                    90-Day Credit Boost
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live estimate
                </div>
              </div>

              {/* Score circle */}
              <div className="relative flex flex-col items-center justify-center mb-6">
                <div className="relative h-40 w-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-cyan-400 opacity-70 blur-xl" />
                  <div className="absolute inset-[12px] rounded-full border border-sky-500/40 bg-slate-950/90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-slate-400">
                      Estimated
                    </span>
                    <span className="mt-1 text-4xl font-black text-slate-50">
                      740
                    </span>
                    <span className="mt-1 text-[9px] text-slate-400">
                      from 580 in ~3 months
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-slate-300 flex items-center gap-2">
                  <span className="inline-flex h-1.5 w-6 rounded-full bg-sky-400" />
                  With recommended tradeline package
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                <div className="rounded-2xl border border-sky-500/25 bg-slate-950/90 p-3">
                  <p className="text-slate-400 mb-1">Utilization</p>
                  <p className="text-slate-50 font-semibold">↓ 64%</p>
                  <p className="mt-1 text-[10px] text-emerald-300">
                    Optimized with new limits
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-500/25 bg-slate-950/90 p-3">
                  <p className="text-slate-400 mb-1">History</p>
                  <p className="text-slate-50 font-semibold">+7 yrs</p>
                  <p className="mt-1 text-[10px] text-sky-300">
                    Seasoned tradelines added
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-500/25 bg-slate-950/90 p-3">
                  <p className="text-slate-400 mb-1">Risk</p>
                  <p className="text-slate-50 font-semibold">Low</p>
                  <p className="mt-1 text-[10px] text-emerald-300">
                    Balanced exposure
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-400">
                  Run a{" "}
                  <span className="font-semibold text-sky-300">
                    free credit scenario
                  </span>{" "}
                  in under a minute.
                </p>
                <Link
                  href="/services_page/tradeline-exchange/buy-tradelines"
                  className="rounded-full bg-sky-500/90 px-4 py-2 text-[11px] font-semibold text-slate-950 hover:bg-sky-400 transition-colors"
                >
                  Start demo
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== SECTION 2 – ABOUT (LIGHT BLUE) ===================== */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_60%)]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            {...fadeInUp(0)}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 border border-sky-200 px-4 py-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-700">
                About Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              A Clear, Fair Path to{" "}
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                Stronger Credit.
              </span>
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              We make premium tradeline access simple, safe, and understandable.
              No confusing jargon. Just a guided experience tailored to your
              goals.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🧭",
                title: "Guided Strategy",
                desc: "We help you understand which tradelines make sense for your timeline and goals.",
              },
              {
                icon: "🔐",
                title: "Security First",
                desc: "Bank-level encryption, vetted partners, and full transparency at every step.",
              },
              {
                icon: "📚",
                title: "Education Focused",
                desc: "We teach you how credit really works, so you keep winning long-term.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                {...fadeInUp(0.1 + i * 0.1)}
                className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-[0_16px_30px_rgba(15,23,42,0.08)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition-all duration-300"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-sky-50 to-blue-50 transition-opacity duration-300" />
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-xl">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 3 – MISSION / STATS (DARK BLUE) ===================== */}
      <section className="relative bg-slate-950 py-18 md:py-20 px-6 md:px-10 lg:px-16 border-t border-slate-800">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_minmax(0,1fr)] items-start">
          <motion.div {...fadeInUp(0)} className="text-slate-50">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/70 px-4 py-1.5 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-sky-100">
                Mission
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Equal Credit Access for{" "}
              <span className="bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent">
                Everyone.
              </span>
            </h3>
            <p className="text-sm md:text-base text-slate-300 mb-5 leading-relaxed">
              Most people never get access to the same generational credit tools
              that banks and wealthy families use. We’re changing that by
              opening up fair, responsible tradeline access that respects your
              reality.
            </p>
            <ul className="space-y-3 text-sm text-slate-200">
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>Responsible, compliant access to authorized user tradelines.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>Clear expectations — no wild promises or hidden catches.</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>Built for first-time builders, rebuilders, and everyone in between.</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/services_page/tradeline-exchange/buy-tradelines"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500/90 px-6 py-3 text-xs md:text-sm font-semibold text-slate-950 hover:bg-sky-400 transition-colors"
              >
                Explore available tradelines
                <span className="text-lg">↗</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp(0.1)}
            className="grid gap-4 sm:grid-cols-2 text-slate-50"
          >
            <div className="col-span-1 sm:col-span-2 rounded-3xl border border-sky-500/60 bg-slate-950/90 p-6 shadow-[0_24px_60px_rgba(56,189,248,0.4)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-sky-200 mb-2">
                The Gap
              </p>
              <p className="text-4xl font-black mb-2 text-slate-50">
                33<span className="text-2xl">%</span>
              </p>
              <p className="text-sm text-slate-300">
                Only about one-third of people benefit from generational
                tradeline access. We’re here for the{" "}
                <span className="font-semibold text-sky-300">other 67%.</span>
              </p>
            </div>

            {[
              {
                label: "Profiles Studied",
                value: "100K+",
                note: "Powering smarter recommendations.",
              },
              {
                label: "Secure Trades",
                value: "✓ Verified",
                note: "Every account vetted & monitored.",
              },
              {
                label: "Support",
                value: "24/7",
                note: "Real humans ready to help.",
              },
              {
                label: "Risk Guarantee",
                value: "0% Risk",
                note: "No surprise commitments or pulls.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-slate-700 bg-slate-950/85 p-5 hover:border-sky-400/70 transition-colors"
              >
                <p className="text-xs text-slate-400 mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-slate-50">
                  {item.value}
                </p>
                <p className="text-xs text-slate-400 mt-1">{item.note}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===================== SECTION 3.5 – INNOVATION & PURPOSE ===================== */}
      <InnovationPurpose />

      {/* ===================== SECTION 4 – CTA (LIGHT BLUE) ===================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 py-16 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),transparent_60%)]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center text-slate-50">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to See What Your Credit Could Look Like?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm md:text-base text-sky-50/90 max-w-2xl mx-auto mb-8"
          >
            Launch a free, no-obligation simulation and preview your potential
            credit trajectory using verified tradelines — in just a few clicks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/services_page/tradeline-exchange/contact"
              className="group flex items-center gap-3 rounded-full bg-slate-950/90 px-7 py-3 text-sm md:text-base font-semibold text-sky-100 shadow-[0_20px_40px_rgba(15,23,42,0.6)] transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Start My Free Simulation</span>
              <svg
                className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>

            <Link
              href="/services_page/tradeline-exchange/about"
              className="text-xs md:text-sm font-medium text-sky-50/95 underline-offset-4 hover:underline"
            >
              Or learn more about our process
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
