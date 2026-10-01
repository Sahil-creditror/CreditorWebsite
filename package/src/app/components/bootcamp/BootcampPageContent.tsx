"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Banknote,
  Clock,
  Handshake,
  Phone,
  TrendingUp,
  Video,
} from "lucide-react";
import {
  BOOTCAMP_EVENT_CALENDAR_DAY,
  BOOTCAMP_EVENT_CALENDAR_MONTH,
  BOOTCAMP_EVENT_CLOSE_MS,
  BOOTCAMP_EVENT_DATE_LABEL,
  BOOTCAMP_EVENT_IMAGE,
  BOOTCAMP_EVENT_TIME_DISPLAY,
  BOOTCAMP_EVENT_TIME_PST,
  BOOTCAMP_EVENT_WEEKDAY,
  BOOTCAMP_PHONE,
  BOOTCAMP_REGISTER_URL,
} from "@/lib/bootcamp";

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

const FEATURES = [
  {
    title: "Business Loans",
    body: "Understand the kinds of business loans available, what lenders typically review, and how repayment fits into cash flow.",
    icon: Banknote,
  },
  {
    title: "Credit Building",
    body: "See how personal and business credit can affect funding options, and what it takes to build a stronger profile over time.",
    icon: TrendingUp,
  },
  {
    title: "Funding Strategies",
    body: "Learn how to match the right funding approach to your business goals so you can grow with a clearer plan.",
    icon: Handshake,
  },
] as const;

export default function BootcampPageContent() {
  const [countdown, setCountdown] = useState<null | ReturnType<
    typeof getCountdown
  >>(null);

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(BOOTCAMP_EVENT_CLOSE_MS));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = countdown ?? {};
  const isLive = Date.now() >= BOOTCAMP_EVENT_CLOSE_MS;

  return (
    <div className="min-h-screen bg-[#f4f9ff] text-slate-800">
      <section className="relative overflow-hidden border-b border-[#071a3a] bg-linear-to-br from-[#041428] via-[#0a2a5c] to-[#123a8a] px-4 pb-16 pt-24 md:pb-20 md:pt-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle at 12% 20%, rgba(37,99,235,0.28), transparent 32%),
              radial-gradient(circle at 88% 8%, rgba(250,204,21,0.16), transparent 24%)
            `,
          }}
          aria-hidden
        />

        <div className="container relative z-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#facc15]/90">
                Creditor Academy · Private Montessori Association
              </p>

              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#facc15] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#0b2f6b] shadow-sm">
                Free Bootcamp
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Unlock Your
                <span className="mt-2 block text-[#facc15]">
                  Business Funding Potential
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/85 lg:mx-0">
                Learn how to access the right funding, grow faster, and take
                your business to the next level.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-md">
                  <span className="text-[#facc15]">1 OCT · {BOOTCAMP_EVENT_WEEKDAY}</span>
                  <span className="text-white/40">·</span>
                  {BOOTCAMP_EVENT_TIME_PST}
                </span>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href={BOOTCAMP_REGISTER_URL}
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#facc15] to-[#f5c400] px-8 py-4 text-base font-extrabold uppercase text-[#0b2f6b] shadow-xl shadow-[#facc15]/30 transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Register Now
                </Link>
                <a
                  href={`tel:${BOOTCAMP_PHONE.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100/90 hover:text-[#facc15] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {BOOTCAMP_PHONE}
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:max-w-lg">
              <div className="overflow-hidden rounded-2xl border-2 border-[#facc15]/50 bg-white p-2 shadow-2xl shadow-black/40 ring-1 ring-white/10">
                <Image
                  src={BOOTCAMP_EVENT_IMAGE}
                  alt={`Free Bootcamp: Unlock Your Business Funding Potential — ${BOOTCAMP_EVENT_DATE_LABEL}`}
                  width={720}
                  height={720}
                  className="w-full rounded-xl object-contain bg-[#eef6ff]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d7e8fb] bg-linear-to-b from-white to-[#f4f9ff] py-12 md:py-14">
        <div className="container">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#cfe2f8] bg-white shadow-lg shadow-blue-900/5">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#facc15]/25 blur-3xl" aria-hidden />

            <div className="relative flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="text-center lg:max-w-sm lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#1d4ed8]/15 bg-[#eff6ff] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d4ed8]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live Online Bootcamp
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-[#0b2f6b] md:text-3xl uppercase">
                  1 October Bootcamp
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start text-sm">
                  <Video className="h-4 w-4 shrink-0 text-[#1d4ed8]" aria-hidden />
                  Unlock Your Business Funding Potential
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-xl lg:shrink-0">
                <div className="flex items-center gap-4 rounded-2xl border border-[#cfe2f8] bg-linear-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div
                    className="flex h-17 w-17 shrink-0 flex-col overflow-hidden rounded-xl bg-linear-to-b from-[#1d4ed8] to-[#0b2f6b] text-center text-white shadow-md"
                    aria-hidden
                  >
                    <span className="bg-[#facc15] py-1 text-[10px] font-black uppercase tracking-widest text-[#0b2f6b]">
                      {BOOTCAMP_EVENT_CALENDAR_MONTH}
                    </span>
                    <span className="flex flex-1 items-center justify-center text-3xl font-black leading-none">
                      {BOOTCAMP_EVENT_CALENDAR_DAY}
                    </span>
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </p>
                    <p className="mt-0.5 text-sm font-bold leading-snug text-slate-900 sm:text-base">
                      {BOOTCAMP_EVENT_DATE_LABEL}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-[#cfe2f8] bg-linear-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-xl border border-[#facc15]/50 bg-[#fff8dc] text-[#0b2f6b] shadow-inner">
                    <Clock className="h-8 w-8" strokeWidth={2.25} aria-hidden />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Time
                    </p>
                    <p className="mt-0.5 text-xl font-black tabular-nums text-slate-900">
                      {BOOTCAMP_EVENT_TIME_DISPLAY}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {BOOTCAMP_EVENT_TIME_PST}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#e4eef8] bg-[#f8fbff] px-6 py-5 md:px-8">
              {isLive ? (
                <p className="text-center text-sm font-bold text-[#0b2f6b]">
                  Bootcamp is live — join now
                </p>
              ) : (
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1d4ed8]/80">
                    Starts in
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    {[
                      { v: days, l: "Days" },
                      { v: pad(hours), l: "Hrs" },
                      { v: pad(minutes), l: "Min" },
                      { v: pad(seconds), l: "Sec" },
                    ].map((item) => (
                      <div
                        key={item.l}
                        className="flex min-w-14 flex-col items-center rounded-xl border border-[#cfe2f8] bg-white px-3 py-2 shadow-sm"
                      >
                        <span className="text-xl font-black tabular-nums text-[#0b2f6b]">
                          {item.v}
                        </span>
                        <span className="text-[9px] font-semibold uppercase text-slate-500">
                          {item.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex rounded-full bg-[#facc15] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#0b2f6b]">
              Featuring
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0b2f6b] sm:text-4xl">
              What this bootcamp covers
            </h2>
            <p className="mt-3 text-slate-600">
              Three topics from this free business funding bootcamp.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-[#d7e8fb] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#facc15] hover:shadow-lg hover:shadow-blue-900/8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1d4ed8] text-white shadow-md ring-4 ring-[#dbeafe]">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold text-[#0b2f6b]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#0b2f6b] bg-linear-to-r from-[#0b2f6b] via-[#1d4ed8] to-[#0b2f6b] px-4 py-14 md:py-16">
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready to unlock your business funding potential?
            </h2>
            <p className="max-w-xl text-blue-100/90">
              Join the free bootcamp on{" "}
              <span className="font-bold text-[#facc15]">
                1 Oct · {BOOTCAMP_EVENT_WEEKDAY} · {BOOTCAMP_EVENT_TIME_PST}
              </span>
              .
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={BOOTCAMP_REGISTER_URL}
                className="inline-flex items-center justify-center rounded-full bg-[#facc15] px-8 py-3.5 text-sm font-extrabold uppercase text-[#0b2f6b] shadow-lg shadow-[#facc15]/30 transition hover:brightness-105"
              >
                Register Now
              </Link>
              <a
                href="https://creditoracademy.com"
                className="text-sm font-semibold text-blue-100/90 hover:text-[#facc15]"
              >
                creditoracademy.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
