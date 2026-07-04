"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";

// ── Event Constants Extracted Directly From aitt.png ─────────────────────────
const WORKSHOP_EVENT_CALENDAR_DAY    = "11";
const WORKSHOP_EVENT_CALENDAR_MONTH  = "JULY";
const WORKSHOP_EVENT_DATE_LABEL      = "Saturday, July 11, 2026";
const WORKSHOP_EVENT_TIME_DISPLAY    = "11:00 AM";
const WORKSHOP_EVENT_TIME_PST        = "11:00 AM PST";
const WORKSHOP_EVENT_TIMEZONE_LABEL  = "PST";

// Target Countdown Date: Saturday, July 11, 2026, 11:00 AM PST
const WORKSHOP_EVENT_CLOSE_MS        = new Date("2026-07-11T11:00:00-07:00").getTime();
const WORKSHOP_EVENT_IMAGE           = "/images/todayclasstopic/aitt.png"; 
const REGISTRATION_LINK_URL          = "https://api.wonderengine.ai/widget/form/mL2L8I8p4RI7AF61stUd"; // Keep your conversion endpoint setup
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

// Exactly mirroring the 6 operational checkpoints from the aitt.png flyer checklist
const INCLUDED = [
  "Save time on daily tasks",
  "Automate your marketing",
  "Create content in minutes",
  "Manage finances smarter",
  "Make data-driven decisions",
  "Stay ahead of the competition",
] as const;

const TRADITIONAL = [
  { title: "Manual Repetitive Labor", body: "Spending critical operational hours running structural data entry, manual content drafts, and standard scheduling manually." },
  { title: "High Marketing Overhead", body: "Outsourcing expensive baseline copy and creative assets to slow third-party agencies with extensive turnaround timelines." },
  { title: "Lagging Analytics Decisions", body: "Relying on old historical bookkeeping reports rather than immediate predictive predictive automation tools." },
] as const;

const CREDITOR = [
  { title: "Integrated AI Frameworks", body: "Leveraging prompt models and automated system layers to claim back productive hours instantly." },
  { title: "Instant Content Generation", body: "Spinning up target marketing initiatives, messaging copy, and campaign elements in minutes using native automation." },
  { title: "Real-time Financial Clarity", body: "Deploying systematic modern tracking solutions to control business scaling decisions efficiently." },
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
      <section className="relative overflow-hidden border-b border-[#1a4d7a] bg-gradient-to-br from-[#061525] via-[#0a2d52] to-[#0f3d6b] px-4 pb-16 pt-20 md:pb-24 md:pt-24">
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
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-[#7eb8ff]">
                Creditor Academy · Private Montessori Association
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3rem] uppercase">
                AI Tools Every{" "}
                <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent font-black mt-1">
                  SMALL BUSINESS OWNER
                </span>
                <span className="text-3xl sm:text-4xl block mt-1 text-slate-200 lowercase font-medium italic">should use</span>
              </h1>

              <div className="mt-5 inline-block rounded-xl bg-black/30 border border-white/10 px-4 py-2.5 text-left">
                <p className="text-sm font-bold text-amber-300 sm:text-base flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-xs font-black animate-pulse">🔥 LIVE MASTERCLASS</span>
                  WORK SMARTER. SAVE TIME. GROW FASTER.
                </p>
              </div>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-blue-100/85 lg:mx-0">
                Discover the best AI tools to simplify your tasks, boost productivity, and systematically grow your business without operational overhead.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href={REGISTRATION_LINK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-4 text-base font-extrabold text-slate-950 shadow-xl shadow-amber-500/20 transition transform hover:-translate-y-0.5 hover:brightness-110"
                >
                  Register Free Now
                </Link>
                <span className="text-xs font-semibold text-blue-200/70 tracking-wide">
                  100% Free Registration • Instant Access Credentials
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <div className="overflow-hidden rounded-2xl border border-white/20 bg-white p-2 shadow-2xl shadow-black/30 ring-1 ring-[#026fe2]/30">
                <Image
                  src={WORKSHOP_EVENT_IMAGE}
                  alt="AI Tools Every Small Business Owner Should Use Live Online Training Flyer — Saturday, July 11, 2026"
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
                  LIVE ONLINE TRAINING
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl uppercase">
                  July 11 Masterclass
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start text-sm">
                  <Video className="h-4 w-4 shrink-0 text-[#026fe2]" aria-hidden />
                  Practical Business Scaling Automation
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
            Operational Efficiency
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Legacy Guesswork vs. AI Systems
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            See how incorporating immediate automation stacks can easily eliminate traditional growth barriers.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#c5dff5] bg-white/60 p-8 backdrop-blur-sm">
              <span className="inline-block rounded-full bg-[#d0e8f8] px-3 py-1 text-xs font-bold uppercase text-slate-600">
                Traditional Business Methods
              </span>
              <p className="mt-4 text-sm font-bold text-slate-400 tracking-wide">SLOW & TIME-CONSUMING</p>
              <ul className="mt-6 space-y-6">
                {TRADITIONAL.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border-2 border-[#026fe2] bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] p-8 shadow-lg shadow-blue-500/15">
              <span className="inline-block rounded-full bg-[#026fe2] px-3 py-1 text-xs font-bold uppercase text-white">
                AI Business Ecosystem Stack
              </span>
              <p className="mt-4 text-sm font-bold text-[#026fe2] tracking-wide">AUTOMATED & FAST</p>
              <ul className="mt-6 space-y-6">
                {CREDITOR.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                  </li>
                ))}
              </ul>
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
                  COMPLIMENTARY ACADEMY ACCESS · {WORKSHOP_EVENT_DATE_LABEL}
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Unlock Your Free{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    AI Execution Plan
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-blue-100/90 lg:mx-0">
                  Secure access to live visual walkthroughs detailing top applications engineered to optimize standard corporate operations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-6 backdrop-blur-sm lg:p-7">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Sparkles className="h-5 w-5 text-amber-300" aria-hidden />
                  <h3 className="text-base font-bold text-white tracking-wide">Flyer Core Objectives</h3>
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
                  Live Stream Broadcast Begins In
                </p>
                <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                  <Timer value={pad(days)} label="Days" />
                  <Timer value={pad(hours)} label="Hrs" />
                  <Timer value={pad(minutes)} label="Min" />
                  <Timer value={pad(seconds)} label="Sec" />
                </div>
              </div>
            </div>

            {/* Right: Registration Card */}
            <div className="flex flex-col justify-center rounded-3xl bg-white p-6 shadow-2xl shadow-black/25 md:p-8">
              <div className="rounded-2xl bg-gradient-to-br from-[#026fe2] to-[#0259bd] px-6 py-6 text-center text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-100/90">
                  ONLINE LIVE MASTERCLASS
                </p>
                <p className="mt-3 text-2xl font-black tracking-tight uppercase">
                  AI TOOLS FOR SMALL BUSINESS
                </p>
                <div className="mt-4 inline-flex flex-col gap-1 rounded-xl bg-black/15 px-5 py-3 text-sm font-bold">
                  <span>{WORKSHOP_EVENT_DATE_LABEL}</span>
                  <span className="text-amber-300">{WORKSHOP_EVENT_TIME_PST}</span>
                </div>
              </div>

              <div className="mt-6 border-b border-slate-100 pb-5 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Registration Fee</span>
                <span className="text-4xl font-black text-emerald-600 mt-1 block">FREE</span>
                <p className="mt-2 text-xs font-medium text-slate-500">
                  Includes full stream entry credentials and open Q&amp;A chat pool access.
                </p>
              </div>

              <p className="mt-4 text-center text-sm leading-relaxed text-slate-600">
                Join live this July. Complete registration below to lock in your live streaming seat hookup.
              </p>

              <Link
                href={REGISTRATION_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-emerald-600 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Register For Free Now
              </Link>
              <p className="mt-4 text-center text-xs text-slate-400 font-medium">
                Your future business starts with one decision. Make it today!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Syndicated Platforms Live Bar */}
      <section className="bg-slate-900 text-white py-6 border-y border-white/10">
        <div className="container flex flex-col items-center justify-center gap-4 text-center text-sm md:flex-row md:gap-8">
          <p className="font-bold tracking-wider text-xs sm:text-sm">
            WE ARE LIVE ON SOCIAL MEDIA TOO:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-bold text-slate-300 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" /> Rumble
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" /> YouTube
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" /> Facebook
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium md:ml-4">
            Don't miss out — join us live on your favorite platform!
          </p>
        </div>
      </section>

      {/* Final Action Segment */}
      <section className="border-t border-[#c5dff5] bg-gradient-to-b from-[#dceefb] to-[#e8f4fc] py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl uppercase tracking-tight">
            Ready to scale using modern workflows?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600 font-medium text-sm sm:text-base">
            Claim your complimentary ticket today to bypass operational headaches.
          </p>
          <Link
            href={REGISTRATION_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#026fe2] px-12 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5 hover:bg-[#0259bd]"
          >
            Access Free Live Stream
          </Link>
          <p className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Direct Support Line:{" "}
            <a href="tel:+14254009246" className="text-[#026fe2] hover:underline font-extrabold ml-1">
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
      <div className="text-center text-3xl font-black tabular-nums text-white sm:text-4xl">
        {value}
      </div>
      <div className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#7eb8ff]">
        {label}
      </div>
    </div>
  );
}