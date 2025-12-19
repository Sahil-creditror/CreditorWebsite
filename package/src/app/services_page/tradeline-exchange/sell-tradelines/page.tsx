// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function SellTradelines() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden px-6 md:px-10 lg:px-16 py-16 md:py-20">
        {/* Background accents */}
        <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(56,189,248,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.12)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div {...fadeIn(0)} className="space-y-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 border border-sky-400/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100">
              Earn Side Income
            </span>
            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Earn a side income by selling authorized user tradelines.
            </h1>
            <p className="text-sm md:text-base text-slate-200/90 max-w-3xl mx-auto">
              Get a quote to find out how much you could earn by selling authorized user tradelines.
            </p>
          </motion.div>

          <motion.div
            {...fadeIn(0.12)}
            className="mt-10 rounded-3xl border border-sky-400/30 bg-slate-950/70 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.55)] p-6 sm:p-8 space-y-6"
          >
            <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4 sm:p-5 text-left">
              <p className="text-sm md:text-base text-slate-100 font-semibold mb-1">Notice</p>
              <p className="text-sm md:text-base text-slate-200/90">
                At this time, we are only enrolling Discover tradelines. Please enter your information below if you have Discover cards or would like to sign up for our waitlist for other banks.
              </p>
            </div>

            <form className="grid gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-slate-200/90 font-semibold">Your name</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="rounded-xl bg-slate-900/60 border border-sky-400/30 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="text-slate-200/90 font-semibold">Your e-mail</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="rounded-xl bg-slate-900/60 border border-sky-400/30 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm">
                <span className="text-slate-200/90 font-semibold">Telephone number</span>
                <input
                  type="tel"
                  placeholder="(000) 000-0000"
                  className="rounded-xl bg-slate-900/60 border border-sky-400/30 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.6)] transition-transform hover:translate-y-0.5"
                >
                  Get My Quote
                </button>
                <span className="text-xs text-slate-300">
                  No obligation. We’ll contact you with earnings details.
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
