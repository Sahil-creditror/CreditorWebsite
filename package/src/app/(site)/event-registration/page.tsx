"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Copy } from "lucide-react";
import FreedomFormula from "@/app/components/home/Offer";

interface TimeLeft {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const formatSessionDateLine = (dateStr: string): string => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "Session time pending";
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

const buildCalendarLink = (title: string, startTime: string, durationMinutes = 90, details = ""): string => {
  const start = new Date(startTime);
  if (Number.isNaN(start.getTime())) return "";
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
  const format = (value: Date) => value.toISOString().replace(/-|:|\.\d+/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${format(start)}/${format(end)}`,
  });

  if (details) {
    params.append("details", details);
  }

  return `https://www.google.com/calendar/render?${params.toString()}`;
};

export default function EventRegistrationSuccess(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ expired: false, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const getParam = (key: string): string => {
    const hookValue = searchParams?.get(key);
    if (hookValue) return hookValue;

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(key) || "";
    }

    return "";
  };

  const registrantName = getParam("name") || "Guest";
  const joinUrl = getParam("join_url");
  const sessionDate = getParam("session_date");
  const registrantId = getParam("registrant_id");

  /**
   * For recurring webinars that run daily at the same time until a final end date,
   * Zoom currently sends us the LAST occurrence as `session_date` (e.g. Feb 1).
   *
   * This helper converts that "series end" timestamp into the NEXT upcoming
   * occurrence by preserving the same UTC time-of-day each day.
   * Using UTC instead of local hours avoids extra +/- hours depending
   * on the viewer's local timezone.
   */
  const getNextOccurrenceTarget = (seriesEndISO: string): number | null => {
    if (!seriesEndISO) return null;

    const seriesEnd = new Date(seriesEndISO);
    if (Number.isNaN(seriesEnd.getTime())) return null;

    const now = new Date();

    // If we're already past the series end, just treat it as expired.
    if (now.getTime() > seriesEnd.getTime()) {
      return seriesEnd.getTime();
    }

    // Use the UTC time-of-day from the series end as the recurring slot anchor.
    const utcHour = seriesEnd.getUTCHours();
    const utcMinute = seriesEnd.getUTCMinutes();
    const utcSecond = seriesEnd.getUTCSeconds();

    // Candidate = today at the webinar UTC time
    let candidate = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        utcHour,
        utcMinute,
        utcSecond,
        0
      )
    );

    // If today's slot has already passed, move to tomorrow (in UTC)
    if (candidate.getTime() <= now.getTime()) {
      candidate = new Date(candidate.getTime());
      candidate.setUTCDate(candidate.getUTCDate() + 1);
    }

    // Never go past the final series end date
    if (candidate.getTime() > seriesEnd.getTime()) {
      return seriesEnd.getTime();
    }

    return candidate.getTime();
  };

  const calcTimeLeft = (targetDate: string): TimeLeft => {
    const recurringTarget = getNextOccurrenceTarget(targetDate);
    const target = recurringTarget ?? new Date(targetDate).getTime();
    const diff = target - Date.now();

    if (diff <= 0) {
      setIsLinkActive(true);
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    let s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    s %= 86400;
    const hours = Math.floor(s / 3600);
    s %= 3600;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;

    return { expired: false, days, hours, minutes, seconds };
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkParams = setTimeout(() => {
      let currentJoinUrl = searchParams?.get("join_url") || "";
      let currentSessionDate = searchParams?.get("session_date") || "";

      if (typeof window !== "undefined" && (!currentJoinUrl || !currentSessionDate)) {
        const urlParams = new URLSearchParams(window.location.search);
        currentJoinUrl = currentJoinUrl || urlParams.get("join_url") || "";
        currentSessionDate = currentSessionDate || urlParams.get("session_date") || "";
      }

      if (!currentJoinUrl || !currentSessionDate) {
        router.push("/");
      }
    }, 300);

    return () => clearTimeout(checkParams);
  }, [isMounted, router, searchParams]);

  useEffect(() => {
    if (!isMounted) return;

    let currentJoinUrl = searchParams?.get("join_url") || "";
    let currentSessionDate = searchParams?.get("session_date") || "";

    if (typeof window !== "undefined" && (!currentJoinUrl || !currentSessionDate)) {
      const urlParams = new URLSearchParams(window.location.search);
      currentJoinUrl = currentJoinUrl || urlParams.get("join_url") || "";
      currentSessionDate = currentSessionDate || urlParams.get("session_date") || "";
    }

    if (!currentJoinUrl || !currentSessionDate) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(currentSessionDate));
    }, 1000);

    setTimeLeft(calcTimeLeft(currentSessionDate));

    return () => clearInterval(timer);
  }, [isMounted, searchParams]);

  const pad = (n: number) => {
    const value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    return ("0" + value).slice(-2);
  };

  const handleJoinSession = () => {
    if (isLinkActive && joinUrl) {
      window.open(joinUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopyLink = () => {
    if (joinUrl) {
      navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateUrl = (url: string, maxLength: number = 25): string => {
    if (!url || url.length <= maxLength) return url;
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      const protocol = urlObj.protocol;
      // Show protocol + first part of hostname + "..."
      // e.g., "https://us0..." for "https://us06web.zoom.us/..."
      const prefix = `${protocol}//${hostname.substring(0, Math.min(20, hostname.length))}`;
      return `${prefix}...`;
    } catch {
      // Fallback if URL parsing fails - show first part + "..."
      return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
    }
  };

  const heroHeading = "Creditor Academy Orientation: Entering the Private Pathway";

  // Use the NEXT upcoming occurrence (for recurring daily webinars) for display & calendar
  const nextOccurrenceMs = sessionDate ? getNextOccurrenceTarget(sessionDate) : null;
  const displaySessionDate = nextOccurrenceMs ? new Date(nextOccurrenceMs).toISOString() : sessionDate || "";

  const sessionDateLabel = displaySessionDate ? formatSessionDateLine(displaySessionDate) : "Session time pending";
  const calendarLink =
    displaySessionDate && joinUrl
      ? buildCalendarLink(
          "How to Start & Grow Your Credit Repair Business",
          displaySessionDate,
          90,
          `Join webinar: ${joinUrl}`
        )
      : "";

  const digitColorClass = isLinkActive ? "text-[#026fe2] dark:text-[#026fe2]" : "text-white dark:text-white";

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#060f14] via-[#08152b] to-[#04060a] text-white dark:from-white dark:via-slate-50 dark:to-white dark:text-gray-900">
      <div className="bg-[#08152b] text-center text-[12px] sm:text-[13px] tracking-[0.35em] uppercase font-semibold pt-24 pb-5 text-white dark:bg-gray-900 dark:text-gray-100">
        Great! You are now successfully registered and CONFIRMED for this Webclass...
      </div>

      <div className="relative flex-1 overflow-hidden pb-16 bg-[#f7f9fc] dark:bg-[#050911]">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 20%, rgba(2,111,226,0.05), transparent 45%), radial-gradient(circle at 80% 0%, rgba(69,190,255,0.08), transparent 55%), url("data:image/svg+xml,%3Csvg width='180' height='180' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid-light' width='180' height='180' patternUnits='userSpaceOnUse'%3E%3Cpath d='M180 0H0V180' fill='none' stroke='%23cbd5f5' stroke-width='1' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid-light)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
            }}
          />
        </div>

        <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pt-10 md:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div className="text-gray-900 dark:text-white flex flex-col h-full">
              <p className="text-xs md:text-sm font-semibold tracking-[0.4em] uppercase text-black dark:text-gray-300 mb-5">
                Exclusive confirmation for {registrantName || "Guest"}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black leading-tight text-[#11142d] dark:text-white mb-6">
                How To Start Your Very Own{" "}
                <span className="text-[#026fe2] block">Profitable Credit Repair Business</span>
              </h1>
              <div className="flex flex-col w-full max-w-[560px]">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-none bg-[#026fe2] text-white font-black text-xs sm:text-sm tracking-[0.2em] uppercase py-3 w-full shadow-lg dark:shadow-[#026fe2]/20"
                >
                  Watch This Video To Find Out The Best Way To Prepare For This Webclass!
                </button>
                <div className="relative w-full overflow-hidden shadow-2xl aspect-video bg-black border border-white/10 dark:border-gray-200/30 rounded-none">
                  <video
                    playsInline
                    autoPlay
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src="/video/squeeze.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

              </div>
            </div>

            <aside className="rounded-[32px] bg-white text-gray-900 shadow-2xl p-8 flex flex-col gap-6 h-full dark:bg-[#0b1322] dark:text-white dark:shadow-black/50">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] text-blue-600 uppercase mb-1.5 dark:text-gray-300">
                  Congrats! You're Registered!
                </p>
                <h3 className="text-xl md:text-2xl font-black leading-snug text-[#1f1f1f] dark:text-white">{heroHeading}</h3>
              </div>

              <button
                onClick={handleJoinSession}
                disabled={!isLinkActive}
                className={`w-full rounded-2xl py-3.5 font-black text-base transition shadow-lg ${
                  isLinkActive
                    ? "bg-[#026fe2] hover:bg-[#158af0] text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-white/10 dark:text-white/50"
                }`}
              >
                {isLinkActive ? "Join Webinar" : "Link activates when session starts"}
              </button>

              {calendarLink && (
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-semibold text-[#026fe2] hover:text-[#158af0] underline text-center dark:text-[#026fe2]"
                >
                  Add to Calendar
                </a>
              )}

              {joinUrl && (
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-4">
                  <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-300 mb-2">Link</p>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 dark:bg-white/5 dark:border-white/10">
                    <code className="flex-1 text-[11px] text-gray-700 truncate dark:text-gray-200" title={joinUrl}>
                      {truncateUrl(joinUrl)}
                    </code>
                    <button
                      onClick={handleCopyLink}
                      title="Copy link"
                      className="flex items-center justify-center rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition w-9 h-9 flex-shrink-0 dark:bg-white/10 dark:text-white"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-[#11142d] text-white px-5 py-5 flex flex-col gap-4 dark:bg-[#050910] dark:text-white">
                {isLinkActive && (
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#026fe2]">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#026fe2] opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#026fe2]" />
                    </span>
                    Session is live!
                  </div>
                )}
                <div className="grid grid-cols-4 text-center gap-2">
                  {[
                    { label: "Days", value: pad(timeLeft.days) },
                    { label: "Hours", value: pad(timeLeft.hours) },
                    { label: "Mins", value: pad(timeLeft.minutes) },
                    { label: "Secs", value: pad(timeLeft.seconds) },
                  ].map((unit) => (
                    <div key={unit.label}>
                      <p className={`text-2xl font-black ${digitColorClass}`}>{unit.value}</p>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-white/70">{unit.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-2xl px-3 py-2.5 text-xs font-semibold text-center dark:bg-white/5">
                  {sessionDateLabel}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-100 dark:border-white/10 pt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-white/5">
                  <Image
                    src="/images/squeeze/webex.jpeg"
                    alt="Host avatar"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">PaulMichael Rowland</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">Host & Founder, Creditor Academy</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
      <FreedomFormula />
    </main>
  );
}

