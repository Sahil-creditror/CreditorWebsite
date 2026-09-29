"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Building2,
  Clock,
  FileCheck2,
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

const PILLARS = [
  {
    verb: "DISCOVER",
    title: "What Banks Really Look For",
    body: "Learn the exact criteria bankers use when reviewing a UBT banking packet — so you walk in prepared.",
    icon: Building2,
  },
  {
    verb: "PREPARE",
    title: "The Right UBT Banking Documents",
    body: "Get clarity on the documents, structure, and presentation that make your trust packet bank-ready.",
    icon: FileCheck2,
  },
  {
    verb: "BUILD",
    title: "Stronger Business Relationships",
    body: "Position yourself to open accounts and build lasting relationships with banking decision-makers.",
    icon: Handshake,
  },
  {
    verb: "UNLOCK",
    title: "Better Terms & Larger Credit Limits",
    body: "Use a polished UBT banking approach to pursue stronger terms and higher business credit capacity.",
    icon: TrendingUp,
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
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
      {/* Hero — navy + gold, matched to flyer */}
      <section className="relative overflow-hidden border-b border-[#0a2342] bg-linear-to-br from-[#001a3a] via-[#002855] to-[#003d7a] px-4 pb-16 pt-24 md:pb-20 md:pt-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,215,0,0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,215,0,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#ffd700]/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" aria-hidden />

        <div className="container relative z-10">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="text-center lg:text-left">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#ffd700]/90">
                Creditor Academy · Private Montessori Association
              </p>

              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#ffd700]/40 bg-[#ffd700]/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#ffd700]">
                Free Bootcamp
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                UBT Banking Packet
                <span className="mt-2 block bg-linear-to-r from-[#ffd700] via-[#ffe566] to-white bg-clip-text text-transparent">
                  What the Banker Will Ask
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100/90 lg:mx-0">
                Walk into the bank with confidence. This free bootcamp shows you
                how to prepare a UBT banking packet, answer banker questions, and
                build stronger private business banking relationships.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/25 px-3.5 py-2 text-sm font-bold text-white">
                  <span className="text-[#ffd700]">29 SEP</span>
                  <span className="text-white/40">·</span>
                  {BOOTCAMP_EVENT_TIME_PST}
                </span>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href={BOOTCAMP_REGISTER_URL}
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#ffd700] to-[#f5c400] px-8 py-4 text-base font-extrabold uppercase text-[#001a3a] shadow-xl shadow-[#ffd700]/25 transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Reserve Your Spot
                </Link>
                <a
                  href={`tel:${BOOTCAMP_PHONE.replace(/-/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100/80 hover:text-[#ffd700] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {BOOTCAMP_PHONE}
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:max-w-lg">
              <div className="overflow-hidden rounded-2xl border-2 border-[#ffd700]/35 bg-white p-2 shadow-2xl shadow-black/40 ring-1 ring-[#ffd700]/20">
                <Image
                  src={BOOTCAMP_EVENT_IMAGE}
                  alt={`Free Bootcamp: UBT Banking Packet — What the Banker Will Ask — ${BOOTCAMP_EVENT_DATE_LABEL}`}
                  width={640}
                  height={800}
                  className="w-full rounded-xl object-contain bg-[#001a3a]"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Date / time / countdown */}
      <section className="border-b border-[#d6e4f5] bg-linear-to-b from-[#e8f0fa] to-[#f4f7fb] py-12 md:py-14">
        <div className="container">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#c5d9f0] bg-white shadow-lg shadow-[#001a3a]/6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#ffd700]/20 blur-3xl" aria-hidden />

            <div className="relative flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="text-center lg:max-w-sm lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#002855]/15 bg-[#002855]/8 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#002855]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live Online Bootcamp
                </span>
                <h2 className="mt-4 text-2xl font-black tracking-tight text-[#001a3a] md:text-3xl uppercase">
                  29 September Bootcamp
                </h2>
                <p className="mt-2 flex items-center justify-center gap-2 text-slate-600 lg:justify-start text-sm">
                  <Video className="h-4 w-4 shrink-0 text-[#002855]" aria-hidden />
                  UBT Banking Packet — What the Banker Will Ask
                </p>
              </div>

              <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-xl lg:shrink-0">
                <div className="flex items-center gap-4 rounded-2xl border border-[#c5d9f0] bg-linear-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div
                    className="flex h-17 w-17 shrink-0 flex-col overflow-hidden rounded-xl bg-linear-to-b from-[#002855] to-[#001a3a] text-center text-white shadow-md"
                    aria-hidden
                  >
                    <span className="bg-[#ffd700] py-1 text-[10px] font-black uppercase tracking-widest text-[#001a3a]">
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

                <div className="flex items-center gap-4 rounded-2xl border border-[#c5d9f0] bg-linear-to-br from-[#f8fbff] to-white p-4 shadow-sm">
                  <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-xl border border-[#ffd700]/40 bg-[#fff8dc] text-[#002855] shadow-inner">
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

            {/* Countdown */}
            <div className="border-t border-[#e2ecf7] bg-[#f8fbff] px-6 py-5 md:px-8">
              {isLive ? (
                <p className="text-center text-sm font-bold text-[#002855]">
                  Bootcamp is live — join now
                </p>
              ) : (
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#002855]/70">
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
                        className="flex min-w-14 flex-col items-center rounded-xl border border-[#c5d9f0] bg-white px-3 py-2 shadow-sm"
                      >
                        <span className="text-xl font-black tabular-nums text-[#001a3a]">
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

      {/* Four pillars from flyer */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#002855]/70">
              What you&apos;ll learn
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#001a3a] sm:text-4xl">
              Your UBT Banking Roadmap
            </h2>
            <p className="mt-3 text-slate-600">
              Four practical outcomes from this free Creditor Academy bootcamp.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
            {PILLARS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.verb}
                  className="group relative overflow-hidden rounded-2xl border border-[#c5d9f0] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ffd700]/60 hover:shadow-lg hover:shadow-[#001a3a]/8"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#002855] to-[#001a3a] text-[#ffd700] shadow-md ring-2 ring-[#ffd700]/30">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#002855]">
                        {String(i + 1).padStart(2, "0")} · {item.verb}
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold text-[#001a3a]">
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

      {/* CTA strip */}
      <section className="border-t border-[#0a2342] bg-linear-to-r from-[#001a3a] via-[#002855] to-[#001a3a] px-4 py-14 md:py-16">
        <div className="container">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Ready for the banker&apos;s questions?
            </h2>
            <p className="max-w-xl text-blue-100/85">
              Join the free UBT Banking Packet bootcamp on{" "}
              <span className="font-bold text-[#ffd700]">
                29 Sep · {BOOTCAMP_EVENT_TIME_PST}
              </span>
              .
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={BOOTCAMP_REGISTER_URL}
                className="inline-flex items-center justify-center rounded-full bg-[#ffd700] px-8 py-3.5 text-sm font-extrabold uppercase text-[#001a3a] shadow-lg shadow-[#ffd700]/30 transition hover:brightness-105"
              >
                Reserve Your Spot
              </Link>
              <a
                href="https://creditoracademy.com"
                className="text-sm font-semibold text-blue-100/80 hover:text-[#ffd700]"
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
