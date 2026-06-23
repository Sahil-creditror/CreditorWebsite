"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";

// ── Event Constants Extracted Directly From sdw.png ───────────────────────
const WORKSHOP_EVENT_CALENDAR_DAY = "27";
const WORKSHOP_EVENT_CALENDAR_MONTH = "JUNE";
const WORKSHOP_EVENT_DATE_LABEL = "Saturday, June 27, 2026";
const WORKSHOP_EVENT_TIME_DISPLAY = "11:00 AM";
const WORKSHOP_EVENT_TIME_PST = "11:00 AM PST";
const WORKSHOP_EVENT_TIMEZONE_LABEL = "PST";

// Target Countdown Date: Saturday, June 27, 2026, 11:00 AM PST (UTC-7 due to Daylight Savings)
const WORKSHOP_EVENT_CLOSE_MS = new Date("2026-06-27T11:00:00-07:00").getTime();
const WORKSHOP_EVENT_IMAGE = "/images/todayclasstopic/sdw.png";
const PAYMENT_LINK_URL = "https://rzp.io/rzp/4ofk48g";
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

// Exactly mirroring the 5 masterclass modules from the sdw.png checklist
const INCLUDED = [
  "Validate your business idea",
  "Build a profitable offer",
  "Find your first customers",
  "Create consistent revenue",
  "Transition from side hustle to full-time entrepreneur",
] as const;

const TRADITIONAL = [
  { title: "Months of trial and error", body: "Piecing together advice from scattered sources with no clear order or market validation." },
  { title: "Unstructured offers", body: "Launching business services without building a backend setup that guarantees high conversion metrics." },
  { title: "No direct guidance", body: "Falling into common administrative or operational traps that slow your full-time progression permanently." },
] as const;

const CREDITOR = [
  { title: "One comprehensive blueprint", body: "A single step-by-step roadmap engineered around executing a fast, 90-day launch system." },
  { title: "Market-compliant framework", body: "Direct mapping of validation concepts against structured customer-acquisition strategies." },
  { title: "Live interactive insights", body: "Real-time masterclass training designed to safely clean up infrastructure and clear scaling bottlenecks instantly." },
] as const;

export default function WorkshopPageContent() {
  const [countdown, setCountdown] = useState(() => getCountdown(WORKSHOP_EVENT_CLOSE_MS));

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(WORKSHOP_EVENT_CLOSE_MS));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = countdown;

  return (
    <div className="workshop-athena-style min-h-screen bg-[#eef5fc] text-slate-800">
      {/* Hero Section */}
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
              <h1 className="mt-4 text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl lg:text-[3.5rem] uppercase">
                From Side Hustle{" "}
                <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent font-black mt-1">
                  TO FULL-TIME
                </span>
              </h1>

              <div className="mt-5 inline-block rounded-xl bg-black/30 border border-white/10 px-4 py-2.5 text-left">
                <p className="text-sm font-bold text-amber-300 sm:text-base flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-xs font-black">STRATEGY</span>
                  THE 90-DAY BUSINESS LAUNCH PLAN
                </p>
              </div>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/85 lg:mx-0">
                Turn your idea into a <strong>real business</strong> in just <strong>90 days</strong>. Learn the foundational operational frameworks to secure consistent cash flow and safely fire your boss.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href={PAYMENT_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 hover:brightness-110"
                >
                  Register Now ($20)
                </Link>
                <span className="text-xs font-semibold text-blue-200/70 tracking-wide">
                  Secure instant seat confirmation
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-[#026fe2]/30">
                <Image
                  src={WORKSHOP_EVENT_IMAGE}
                  alt="From Side Hustle to Full-Time Live Masterclass Flyer — Saturday, June 27, 2026"
                  width={440}
                  height={440}
                  className="w-full rounded-xl object-contain bg-slate-950"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Timeline Banner */}
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
                  ONLINE TRAINING
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl uppercase">
                  June 27 Masterclass
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start text-sm">
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
                    <p className="mt-0.5 text-sm font-bold leading-snug text-slate-900 sm:text-base">
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
                    <p className="mt-0.5 text-xl font-black tabular-nums text-slate-900">
                      {WORKSHOP_EVENT_TIME_DISPLAY}
                    </p>
                    <p className="text-xs font-bold text-[#026fe2] uppercase tracking-wider">
                      {WORKSHOP_EVENT_TIMEZONE_LABEL}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Blocks */}
      <section className="bg-[#f0f7fd] py-16 md:py-24">
        <div className="container">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-[#026fe2]">
            Strategic Advantage
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-slate-900 md:text-4xl">
            A Tested, Scalable Strategy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            See how navigating a guided launch blueprint saves months of product delays and business plan errors.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#c5dff5] bg-white/60 p-8 backdrop-blur-sm">
              <span className="inline-block rounded-full bg-[#d0e8f8] px-3 py-1 text-xs font-bold uppercase text-slate-600">
                Traditional guesswork
              </span>
              <p className="mt-4 text-sm font-bold text-slate-400 tracking-wide">SLOW & UNVERIFIED</p>
              <ul className="mt-6 space-y-6">
                {TRADITIONAL.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-2xl font-extrabold text-slate-400">~MINIMUM MONTHS</p>
            </div>

            <div className="rounded-2xl border-2 border-[#026fe2] bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] p-8 shadow-lg shadow-blue-500/15">
              <span className="inline-block rounded-full bg-[#026fe2] px-3 py-1 text-xs font-bold uppercase text-white">
                The 90-Day Launch Plan
              </span>
              <p className="mt-4 text-sm font-bold text-[#026fe2] tracking-wide">VALIDATED & PROFITABLE</p>
              <ul className="mt-6 space-y-6">
                {CREDITOR.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-2xl font-extrabold text-[#026fe2]">~1 LIVE STREAM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Overview & Core Value Matrix */}
      <section className="bg-gradient-to-br from-[#061525] via-[#0a2d52] to-[#0f3d6b] py-16 md:py-24" id="register">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left Column */}
            <div className="flex flex-col gap-6 text-center lg:text-left justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
                  LIMITED ENTRY ACADEMY STREAM · {WORKSHOP_EVENT_DATE_LABEL}
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Secure Your Full{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    90-Day Roadmap
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100/90 lg:mx-0">
                  Walk away with a precise blueprint constructed to scale sustainable revenue metrics that match strict corporate transition limits.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm lg:p-7">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Sparkles className="h-5 w-5 text-amber-300" aria-hidden />
                  <h3 className="text-base font-bold text-white tracking-wide">Masterclass Core Learning Objectives</h3>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-1 sm:gap-3">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.04] p-3.5 text-left"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-sm font-semibold leading-snug text-white/95">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#026fe2]/30 bg-[#026fe2]/10 p-6" aria-live="polite">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7eb8ff]">
                  Livestream Broadcast Begins In
                </p>
                <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                  <Timer value={pad(days)} label="Days" />
                  <Timer value={pad(hours)} label="Hrs" />
                  <Timer value={pad(minutes)} label="Min" />
                  <Timer value={pad(seconds)} label="Sec" />
                </div>
              </div>
            </div>

            {/* Right: Registration/Payment Card */}
            <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="rounded-2xl bg-gradient-to-br from-[#026fe2] to-[#0259bd] px-6 py-6 text-center text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100/90">
                  ONLINE LIVE TRAINING
                </p>
                <p className="mt-3 text-2xl font-black tracking-tight uppercase">
                  SIDE HUSTLE TO FULL-TIME
                </p>
                <div className="mt-4 inline-flex flex-col gap-1 rounded-xl bg-black/15 px-5 py-3 text-sm font-bold">
                  <span>{WORKSHOP_EVENT_DATE_LABEL}</span>
                  <span className="text-amber-300">{WORKSHOP_EVENT_TIME_PST}</span>
                </div>
              </div>

              <div className="mt-6 border-b border-slate-100 pb-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Registration Fee</span>
                <span className="text-4xl font-black text-slate-900 mt-1 block">$20</span>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Includes full access to the live session &amp; Q&amp;A segment.
                </p>
              </div>

              <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                Join live on June 27th. Secure your slot through our prioritized gateway below before processing lines lock.
              </p>

              <Link
                href={PAYMENT_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#026fe2] py-4 text-base font-extrabold text-white shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5 hover:bg-[#0259bd]"
              >
                Complete Registration ($20)
              </Link>
              <p className="mt-4 text-center text-xs text-slate-400 font-medium">
                Instant delivery of access credentials via purchase email verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Syndicated Platforms Live Bar */}
      <section className="bg-slate-900 text-white py-6 border-y border-white/10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center text-sm md:flex-row md:gap-8">
          <p className="font-bold tracking-wider text-xs sm:text-sm">
            WE ARE <span className="text-sky-400 font-black">LIVE</span> ON:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-slate-300 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> Rumble
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> YouTube
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" /> Facebook
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium md:ml-4">
            YOU CAN ALSO JOIN US LIVE AT SOCIAL MEDIA!
          </p>
        </div>
      </section>

      {/* Final Action Segment */}
      <section className="border-t border-[#c5dff5] bg-gradient-to-b from-[#dceefb] to-[#e8f4fc] py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl uppercase tracking-tight">
            Ready to transition into your launch plan?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600 font-medium text-sm sm:text-base">
            Claim entry now to align your business idea with high-revenue parameters this Saturday.
          </p>
          <Link
            href={PAYMENT_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#026fe2] px-12 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5 hover:bg-[#0259bd]"
          >
            Access Masterclass Stream Now
          </Link>
          <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Direct Support Line:{" "}
            <a href="tel:+14254009246" className="text-[#026fe2] hover:underline font-extrabold ml-1">
              425-400-9246
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
      <div className="text-center text-3xl font-black tabular-nums text-white sm:text-4xl">
        {value}
      </div>
      <div className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#7eb8ff]">
        {label}
      </div>
    </div>
  );
}