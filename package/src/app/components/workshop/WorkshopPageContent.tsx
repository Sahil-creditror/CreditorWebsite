"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Sparkles, Video } from "lucide-react";
import { useEffect, useState } from "react";
import {
  WORKSHOP_EVENT_CALENDAR_DAY,
  WORKSHOP_EVENT_CALENDAR_MONTH,
  WORKSHOP_EVENT_CLOSE_MS,
  WORKSHOP_EVENT_DATE_LABEL,
  WORKSHOP_EVENT_IMAGE,
  WORKSHOP_EVENT_TIME_DISPLAY,
  WORKSHOP_EVENT_TIME_PST,
  WORKSHOP_EVENT_TIMEZONE_LABEL,
  WORKSHOP_REGISTER_URL,
} from "@/lib/workshop";

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
  "Live interactive workshop",
  "Step-by-step business credit roadmap",
  "Q&A with Creditor Academy",
  "Session resources & guidance",
] as const;

const TRADITIONAL = [
  { title: "Months of trial and error", body: "Piecing together advice from scattered sources with no clear order." },
  { title: "Personal credit only", body: "Mixing personal and business strategies that do not scale." },
  { title: "No live guidance", body: "Stuck when questions come up — delays cost you funding windows." },
] as const;

const CREDITOR = [
  { title: "One focused live session", body: "Structured path from Tier 1 setup toward $50K–$250K in business credit." },
  { title: "Business-first approach", body: "Built for company profiles, funding readiness, and private operations." },
  { title: "Live Q&A included", body: "Get clarity from Creditor Academy during the workshop — not after." },
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
                Creditor Academy Workshop
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
                Build Elite{" "}
                <span className="bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  Business Credit
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-blue-100/85 lg:mx-0">
                If you&apos;re building a business and want funding-ready credit — save months of
                guesswork. Learn Tier 1 credit, funding paths, and live strategies in one session.
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
                  alt="Business Credit Workshop — June 7"
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

      {/* Event date + PST time */}
      <section className="border-b border-[#c5dff5] bg-gradient-to-b from-[#e3f0fa] to-[#eef5fc] py-12 md:py-14">
        <div className="container">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#b8d9f5]/80 bg-white shadow-lg shadow-blue-900/[0.06] ring-1 ring-[#026fe2]/5">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#026fe2]/10 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl"
              aria-hidden
            />

            <div className="relative flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="text-center lg:max-w-sm lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#026fe2]/20 bg-[#026fe2]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#026fe2]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live session
                </span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                  7th June Workshop
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start">
                  <Video className="h-4 w-4 shrink-0 text-[#026fe2]" aria-hidden />
                  Interactive webinar with Creditor Academy
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-xl lg:shrink-0">
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
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </p>
                    <p className="mt-1 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                      {WORKSHOP_EVENT_DATE_LABEL}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-[#c5dff5] bg-gradient-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-xl border border-[#026fe2]/15 bg-[#eef5fc] text-[#026fe2] shadow-inner">
                    <Clock className="h-8 w-8" strokeWidth={2.25} aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Time
                    </p>
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
            Stop the credit guesswork
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            See how one live workshop replaces months of scattered research.
          </p>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border-2 border-[#c5dff5] bg-white/60 p-8 backdrop-blur-sm">
              <span className="inline-block rounded-full bg-[#d0e8f8] px-3 py-1 text-xs font-bold uppercase text-slate-600">
                Traditional path
              </span>
              <p className="mt-4 text-sm font-semibold text-slate-500">SLOW</p>
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
              <p className="mt-4 text-sm font-semibold text-[#026fe2]">FOCUSED</p>
              <ul className="mt-6 space-y-6">
                {CREDITOR.map((item) => (
                  <li key={item.title}>
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-center text-2xl font-extrabold text-[#026fe2]">~1 SESSION</p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim your spot — two columns */}
      <section
        className="bg-gradient-to-br from-[#061525] via-[#0a2d52] to-[#0f3d6b] py-16 md:py-24"
        id="register"
      >
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-stretch gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: headline, benefits panel, countdown */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden />
                  Limited seats · June 7
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                  Claim your{" "}
                  <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                    spot
                  </span>
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-blue-100/90 lg:mx-0">
                  One live session with Creditor Academy — walk away with a clear path to
                  funding-ready business credit.
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
                      <span className="text-sm font-medium leading-snug text-white/95">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {mounted && (
                <div className="rounded-2xl border border-[#026fe2]/30 bg-[#026fe2]/10 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7eb8ff]">
                    Registration closes in
                  </p>
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                    <Timer value={days} label="Days" />
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
                  Live Workshop
                </p>
                <p className="mt-3 text-2xl font-extrabold leading-tight">
                  Business Credit Workshop
                </p>
                <div className="mt-4 inline-flex flex-col gap-1 rounded-xl bg-black/15 px-4 py-3 text-sm">
                  <span className="font-semibold">{WORKSHOP_EVENT_DATE_LABEL}</span>
                  <span className="text-blue-100">{WORKSHOP_EVENT_TIME_PST}</span>
                </div>
              </div>

              <p className="mt-6 text-center text-base leading-relaxed text-slate-600">
                Join live on June 7. Reserve your seat before registration closes.
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
                Secure checkout · instant email confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[#c5dff5] bg-gradient-to-b from-[#dceefb] to-[#e8f4fc] py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ready to build elite business credit?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-600">
            Join Creditor Academy live — limited seats for the June workshop.
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
    <div className="rounded-xl border border-white/15 bg-[#061525]/50 px-2 py-3 sm:px-3">
      <div className="text-center text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
        {value}
      </div>
      <div className="mt-0.5 text-center text-[10px] font-bold uppercase tracking-wider text-[#7eb8ff]">
        {label}
      </div>
    </div>
  );
}
