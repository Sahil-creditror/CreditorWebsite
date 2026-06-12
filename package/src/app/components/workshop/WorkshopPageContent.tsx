"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";
import {
  WORKSHOP_EVENT_IMAGE,
  WORKSHOP_REGISTER_URL,
} from "@/lib/workshop";

// ── Event constants (from image) ──────────────────────────────────────────────
const WORKSHOP_EVENT_CALENDAR_DAY    = "13";
const WORKSHOP_EVENT_CALENDAR_MONTH  = "JUNE";
const WORKSHOP_EVENT_DATE_LABEL      = "Saturday, June 13, 2026";
const WORKSHOP_EVENT_TIME_DISPLAY    = "11:00 AM";
const WORKSHOP_EVENT_TIME_PST        = "11:00 AM PST";
const WORKSHOP_EVENT_TIMEZONE_LABEL  = "PST";
// Countdown target: June 13 2026, 11:00 AM PST (UTC-8)
const WORKSHOP_EVENT_CLOSE_MS        = new Date("2026-06-13T11:00:00-08:00").getTime();
// ─────────────────────────────────────────────────────────────────────────────

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getCountdown(targetMs: number) {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const INCLUDED = [
  "Live interactive bootcamp session",
  "Practical business education roadmap",
  "Q&A with Creditor Academy instructors",
  "Session resources & sustainable growth strategies",
] as const;

const TRADITIONAL = [
  { title: "Months of trial and error", body: "Piecing together advice from scattered sources with no clear order." },
  { title: "Unstructured scaling", body: "Mixing generic strategies that do not scale or protect operations." },
  { title: "No live guidance", body: "Stuck when questions come up — delays cost you critical growth windows." },
] as const;

const CREDITOR = [
  { title: "One focused bootcamp", body: "Structured path detailing business formation, operations, and funding readiness." },
  { title: "Business-first approach", body: "Built for long-term company profiles, private operations, and branding." },
  { title: "Live Q&A included", body: "Get clarity from Creditor Academy during the bootcamp — not after." },
] as const;

export default function WorkshopPageContent() {
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(() => getCountdown(WORKSHOP_EVENT_CLOSE_MS));

  useEffect(() => {
    setMounted(true);
    const tick = () => setCountdown(getCountdown(WORKSHOP_EVENT_CLOSE_MS));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = countdown;

  return (
    <div className="workshop-athena-style min-h-screen bg-[#eef5fc] text-slate-800">
      {/* Hero — darker shade */}
      <section className="relative overflow-hidden border-b border-[#1a4d7a] bg-gradient-to-br from-[#061525] via-[#0a2d52] to-[#0f3d6b] px-4 pb-16 pt-28 md:pb-24 md:pt-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(2,111,226,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(2,111,226,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div className="container relative z-10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-[#7eb8ff]">
                Creditor Academy · Private Montessori Association
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Business Builder{" "}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  BOOTCAMP
                </span>
              </h1>

              <div className="mt-4 inline-block rounded-xl bg-black/30 border border-white/10 px-4 py-2 text-left">
                <p className="text-sm font-bold text-amber-300 sm:text-base">
                  Build, Structure &amp; Scale Your Business{" "}
                  <span className="underline decoration-yellow-400">the Right Way</span>
                </p>
              </div>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blue-100/85 lg:mx-0">
                Discover practical strategies for business formation, operations, funding readiness, branding, and sustainable growth.
              </p>
              <Link
                href={WORKSHOP_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#026fe2] px-10 py-4 text-base font-bold text-white shadow-lg shadow-blue-900/40 transition hover:bg-[#158af0]"
              >
                Register Now
              </Link>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-[#026fe2]/30">
                <Image
                  src={WORKSHOP_EVENT_IMAGE}
                  alt="Business Builder Bootcamp — June 13, 2026"
                  width={440}
                  height={560}
                  className="w-full rounded-xl"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event date + time */}
      <section className="border-b border-[#c5dff5] bg-gradient-to-b from-[#e3f0fa] to-[#eef5fc] py-12 md:py-14">
        <div className="container">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#b8d9f5]/80 bg-white shadow-lg shadow-blue-900/[0.06] ring-1 ring-[#026fe2]/5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#026fe2]/10 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" aria-hidden />

            <div className="relative flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="text-center lg:max-w-sm lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#026fe2]/20 bg-[#026fe2]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#026fe2]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Online Webinar
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                  June 13 Bootcamp
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start">
                  <Video className="h-4 w-4 shrink-0 text-[#026fe2]" aria-hidden />
                  Practical Business Education
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-xl lg:shrink-0">
                {/* Date card */}
                <div className="flex items-center gap-4 rounded-2xl border border-[#c5dff5] bg-gradient-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div
                    className="flex h-[4.25rem] w-[4.25rem] shrink-0 flex-col overflow-hidden rounded-xl bg-gradient-to-b from-[#026fe2] to-[#0259bd] text-center text-white shadow-md shadow-blue-600/25"
                    aria-hidden
                  >
                    <span className="bg-black/15 py-1 text-[10px] font-bold uppercase tracking-widest">
                      {WORKSHOP_EVENT_CALENDAR_MONTH}
                    </span>
                    <span className="flex flex-1 items-center justify-center text-3xl font-black leading-none">
                      {WORKSHOP_EVENT_CALENDAR_DAY}
                    </span>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Date</p>
                    <p className="mt-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                      {WORKSHOP_EVENT_DATE_LABEL}
                    </p>
                  </div>
                </div>

                {/* Time card */}
                <div className="flex items-center gap-4 rounded-2xl border border-[#c5dff5] bg-gradient-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-xl border border-[#026fe2]/15 bg-[#eef5fc] text-[#026fe2] shadow-inner">
                    <Clock className="h-8 w-8" strokeWidth={2.25} aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Time</p>
                    <p className="mt-1 text-xl font-black tabular-nums text-slate-900">
                      {WORKSHOP_EVENT_TIME_DISPLAY}
                    </p>
                    <p className="text-sm font-semibold text-[#026fe2]">
                      {WORKSHOP_EVENT_TIMEZONE_LABEL}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison — Traditional vs Creditor */}
      <section className="bg-[#f0f7fd] py-16 md:py-24">
        <div className="container">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-[#026fe2]">
            Why attend?
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Stop the business guesswork
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            See how one focused live session replaces months of scattered research.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#c5dff5] bg-white/60 p-8 backdrop-blur-sm">
              <span className="inline-block rounded-full bg-[#d0e8f8] px-3 py-1 text-xs font-bold uppercase text-slate-600">
                Traditional path
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-500">SLOW &amp; SCATTERED</p>
              <ul className="mt-6 space-y-6">
                {TRADITIONAL.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-2xl font-extrabold text-slate-400">~MONTHS</p>
            </div>

            <div className="rounded-2xl border-2 border-[#026fe2] bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] p-8 shadow-lg shadow-blue-500/15">
              <span className="inline-block rounded-full bg-[#026fe2] px-3 py-1 text-xs font-bold uppercase text-white">
                Creditor Academy
              </span>
              <p className="mt-4 text-sm font-semibold text-[#026fe2]">STRUCTURED</p>
              <ul className="mt-6 space-y-6">
                {CREDITOR.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-2xl font-extrabold text-[#026fe2]">~1 BOOTCAMP</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim your spot */}
      <section
        className="bg-gradient-to-br from-[#061525] via-[#0a2d52] to-[#0f3d6b] py-16 md:py-24"
        id="register"
      >
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
                  Limited seats · {WORKSHOP_EVENT_DATE_LABEL}
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Claim your{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    spot
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-blue-100/90 lg:mx-0">
                  One live comprehensive session with Creditor Academy — walk away with a clear infrastructure design blueprint for sustainable growth.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm lg:p-7">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Sparkles className="h-5 w-5 text-amber-300" aria-hidden />
                  <h3 className="text-base font-bold text-white">Everything included</h3>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3.5 text-left"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                        <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                      </span>
                      <span className="text-sm font-medium leading-snug text-white/95">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {mounted && (
                <div
                  className="rounded-2xl border border-[#026fe2]/30 bg-[#026fe2]/10 p-6"
                  aria-live="polite"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7eb8ff]">
                    Registration closes in
                  </p>
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                    <Timer value={pad(days)} label="Days" />
                    <Timer value={pad(hours)} label="Hrs" />
                    <Timer value={pad(minutes)} label="Min" />
                    <Timer value={pad(seconds)} label="Sec" />
                  </div>
                </div>
              )}
            </div>

            {/* Right: registration card */}
            <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="rounded-2xl bg-gradient-to-br from-[#026fe2] to-[#0259bd] px-6 py-6 text-center text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100/90">
                  Online Webinar
                </p>
                <p className="mt-3 text-2xl font-extrabold leading-tight">
                  Business Builder Bootcamp
                </p>
                <div className="mt-4 inline-flex flex-col gap-1 rounded-xl bg-black/15 px-4 py-3 text-sm">
                  <span className="font-semibold">{WORKSHOP_EVENT_DATE_LABEL}</span>
                  <span className="text-blue-100">{WORKSHOP_EVENT_TIME_PST}</span>
                </div>
              </div>

              <p className="mt-6 text-center text-base leading-relaxed text-slate-600">
                Join live on June 13. Reserve your seat before registration closes.
              </p>

              <Link
                href={WORKSHOP_REGISTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center rounded-full bg-[#026fe2] py-4 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-[#0259bd]"
              >
                Register Now
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">
                Secure confirmation · instant email access credentials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Platforms Live Note */}
      <section className="bg-slate-900 text-white py-6 border-y border-white/10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center text-sm md:flex-row md:gap-8">
          <p className="font-bold tracking-wide">
            WE ARE <span className="text-yellow-400">LIVE</span> ON:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> Rumble
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> YouTube
            </span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" /> Facebook
            </span>
          </div>
          <p className="text-xs text-slate-400 md:ml-4">
            You can also join us <span className="text-yellow-400 font-bold">LIVE</span> on our social media platforms!
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#c5dff5] bg-gradient-to-b from-[#dceefb] to-[#e8f4fc] py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ready to scale your business structure?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600">
            Join Creditor Academy live — limited open seats remaining for the June 13th bootcamp.
          </p>
          <Link
            href={WORKSHOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#026fe2] px-10 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#0259bd]"
          >
            Register Now
          </Link>
          <p className="mt-6 text-sm text-slate-500">
            Questions?{" "}
            <a href="tel:+14254009246" className="font-semibold text-[#026fe2] hover:underline">
              (425) 400-9246
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

function Timer({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="rounded-xl border border-white/15 bg-[#061525]/60 px-2 py-3 sm:px-3">
      <div className="text-center text-3xl font-extrabold tabular-nums text-white sm:text-4xl">
        {value}
      </div>
      <div className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#7eb8ff]">
        {label}
      </div>
    </div>
  );
}