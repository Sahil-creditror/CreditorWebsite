"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// LiveSessionCTA.jsx
// - Requires: Tailwind CSS + Framer Motion installed in your Next.js project
// - Usage: import LiveSessionCTA from '@/components/LiveSessionCTA' and place <LiveSessionCTA /> where needed

export default function LiveSessionCTA({
  tuesdayUrl = "https://meet.google.com/vmz-atgi-rpo",
  thursdayUrl = "https://meet.google.com/rvq-bhqr-kxv",
}: {
  tuesdayUrl?: string;
  thursdayUrl?: string;
}) {
  // Compute the next Tue/Thu at 6:00 PM Eastern Time (handles DST) and return Date in local timezone
  const getNextSessionDate = useMemo(() => {
    const NEW_YORK_TZ = "America/New_York";

    const getNewYorkParts = (date: Date) => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: NEW_YORK_TZ,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "short",
        hour12: false,
      });
      const parts = formatter.formatToParts(date);
      const lookup = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
      const weekdayText = (parts.find((p) => p.type === "weekday")?.value ?? "Sun");
      const weekdayIndexMap: Record<string, number> = {
        Sun: 0,
        Mon: 1,
        Tue: 2,
        Wed: 3,
        Thu: 4,
        Fri: 5,
        Sat: 6,
      };
      return {
        year: Number(lookup("year")),
        month: Number(lookup("month")),
        day: Number(lookup("day")),
        hour: Number(lookup("hour")),
        minute: Number(lookup("minute")),
        second: Number(lookup("second")),
        weekdayIndex: weekdayIndexMap[weekdayText] ?? 0,
      };
    };

    const getNewYorkOffsetMinutes = (dateUTC: Date) => {
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: NEW_YORK_TZ,
        timeZoneName: "shortOffset",
      });
      const text = fmt.format(dateUTC); // e.g., "... GMT-4"
      const match = text.match(/GMT([+-]?\d{1,2})(?::?(\d{2}))?/);
      if (!match) return 0;
      const sign = match[1].startsWith("-") ? -1 : 1;
      const hours = Math.abs(parseInt(match[1], 10));
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      // Parsed value is the UTC offset in hours (e.g., GMT-4 => -240).
      // For converting local NY time to UTC: UTC = local - offset.
      // So return the NEGATED offset minutes to add to local to get UTC.
      return -(sign * (hours * 60 + minutes));
    };

    return () => {
      const now = new Date();
      const nyNow = getNewYorkParts(now);
      const isTuesday = nyNow.weekdayIndex === 2;
      const isThursday = nyNow.weekdayIndex === 4;
      const targetHourNY = 18; // 6 PM ET

      const addDaysCalendar = (year: number, month: number, day: number, daysToAdd: number) => {
        const ms = Date.UTC(year, month - 1, day) + daysToAdd * 24 * 60 * 60 * 1000;
        const d = new Date(ms);
        return {
          year: d.getUTCFullYear(),
          month: d.getUTCMonth() + 1,
          day: d.getUTCDate(),
        };
      };

      // Decide how many days to add from NY perspective
      let daysToAdd = 0;
      if ((isTuesday || isThursday) && nyNow.hour < targetHourNY) {
        daysToAdd = 0;
      } else if (isTuesday && nyNow.hour >= targetHourNY) {
        daysToAdd = 2; // Tue after 6pm -> Thu
      } else if (isThursday && nyNow.hour >= targetHourNY) {
        daysToAdd = 5; // Thu after 6pm -> next Tue
      } else {
        const distances = [2, 4].map((target) => (target - nyNow.weekdayIndex + 7) % 7);
        daysToAdd = Math.min(...distances);
      }

      const nyTargetDate = addDaysCalendar(nyNow.year, nyNow.month, nyNow.day, daysToAdd);

      // Use noon to determine offset safely (avoid DST transition hour)
      const offsetMinutes = getNewYorkOffsetMinutes(
        new Date(Date.UTC(nyTargetDate.year, nyTargetDate.month - 1, nyTargetDate.day, 12, 0, 0))
      );

      // 18:00 in New York corresponds to UTC = local + offset
      const utcMillis =
        Date.UTC(nyTargetDate.year, nyTargetDate.month - 1, nyTargetDate.day, targetHourNY, 0, 0) +
        offsetMinutes * 60 * 1000;

      return new Date(utcMillis);
    };
  }, []);

  const [nextSession, setNextSession] = useState<Date>(getNextSessionDate());
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [timeParts, setTimeParts] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Update countdown every second
    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = nextSession.getTime();
      const diff = target - now;
      if (diff <= 0) {
        // Recompute the next session once we hit/past time
        const upcoming = getNextSessionDate();
        setNextSession(upcoming);
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const pad = (n: number) => String(n).padStart(2, "0");
      setTimeLeft(`${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
      setTimeParts({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextSession, getNextSessionDate]);

  // Build a Google Calendar link for the upcoming session (1-hour duration)
  const calendarHref = useMemo(() => {
    const start = nextSession.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const endDate = new Date(nextSession.getTime() + 60 * 60 * 1000);
    const end = endDate.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: "Creditor Academy Live Masterclass",
      dates: `${start}/${end}`,
      details:
        "Join PaulMichael for strategies, case studies, and live Q&A. Auto-adjusts to your timezone.",
      location: "Google Meet",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, [nextSession]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-12 px-4 bg-gradient-to-br from-[#e6f3ff] via-white to-[#f8fbff] dark:from-[#050b18] dark:via-[#07121f] dark:to-[#05101d]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/10 pointer-events-none" />

          {/* Animated background accents */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-24 h-64 w-64 rounded-full blur-3xl opacity-40 dark:opacity-25"
            style={{ background:
              "radial-gradient(closest-side, rgba(99,102,241,0.6), rgba(99,102,241,0.0))" }}
            initial={{ scale: 0.9, x: -20, y: -10, rotate: 0 }}
            animate={{
              scale: [0.9, 1.05, 0.95, 1.02, 0.9],
              x: [-20, -10, -30, -15, -20],
              y: [-10, -20, -5, -15, -10],
              rotate: [0, 5, -3, 3, 0],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full blur-3xl opacity-40 dark:opacity-25"
            style={{ background:
              "radial-gradient(closest-side, rgba(56,189,248,0.55), rgba(56,189,248,0.0))" }}
            initial={{ scale: 1, x: 10, y: 20, rotate: 0 }}
            animate={{
              scale: [1, 0.95, 1.08, 1.02, 1],
              x: [10, 25, 5, 15, 10],
              y: [20, 5, 15, 10, 20],
              rotate: [0, -4, 3, -2, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid gap-6 grid-cols-1 md:grid-cols-2 items-center p-8 md:p-12">
            {/* LEFT: Hero text + avatar */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full ring-2 ring-white dark:ring-gray-700 shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src="/images/services/Paul.webp"
                    alt="PaulMichael Rowland headshot"
                    fill
                    sizes="(max-width: 768px) 80px, 120px"
                    className="object-cover"
                    priority
                  />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Live with</p>
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    PaulMichael Rowland
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">Founder — Creditor Academy</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight text-gray-900 dark:text-white">
                  Don't Miss the Live Class
                </h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-xl">
                  Every Tuesday &amp; Thursday at <span className="font-semibold">6:00 PM ET</span>. Join
                  PaulMichael for real-world strategies, case studies and live Q&amp;A to help you reclaim and protect credit power. Seats
                  fill fast — reserve yours now.
                </p>

                <p className="mt-4 inline-flex items-center gap-2 text-sm rounded-full px-3 py-1 border shadow-sm bg-gradient-to-r from-rose-50 via-white to-indigo-50 border-rose-200/70 dark:from-rose-900/20 dark:via-transparent dark:to-indigo-900/20 dark:border-rose-800/60">
                  <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-red-500 animate-pulse ring-2 ring-red-200/60 dark:ring-red-900/40" aria-hidden />
                  <span className="inline-flex items-center gap-1 font-semibold tracking-wide text-[11px] uppercase text-rose-700 dark:text-rose-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                      <path d="M12 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      <path fillRule="evenodd" d="M4.928 4.928a10 10 0 1 1 14.144 14.144.75.75 0 1 1-1.06-1.06A8.5 8.5 0 1 0 5.99 5.99a.75.75 0 1 1-1.06-1.06Z" clipRule="evenodd"/>
                      <path d="M7.757 7.757a6 6 0 1 1 8.486 8.486.75.75 0 0 1-1.06-1.06 4.5 4.5 0 1 0-6.366-6.366.75.75 0 1 1-1.06-1.06Z"/>
                    </svg>
                    Live
                  </span>
                  <span className="text-xs text-gray-700 dark:text-gray-300">— Interactive session + Q&amp;A</span>
                </p>
              </div>

              {/* Attraction line */}
              <div className="mt-4">
                <p className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100">
                  Quick hook: <span className="text-indigo-600 dark:text-indigo-300">Learn 3 proven moves</span> you can use within 48 hours to
                  start fixing credit and unlocking better financial options.
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-3" aria-live="polite">
                <div className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 bg-indigo-50 text-indigo-800 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:ring-indigo-900/50">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden>
                    <path fillRule="evenodd" d="M6.75 3a.75.75 0 01.75.75V5h9V3.75a.75.75 0 011.5 0V5h.75A2.25 2.25 0 0121 7.25v10.5A2.25 2.25 0 0118.75 20H5.25A2.25 2.25 0 013 17.75V7.25A2.25 2.25 0 015.25 5H6V3.75a.75.75 0 01.75-.75zm0 3h10.5a.75.75 0 01.75.75V9H6V6.75a.75.75 0 01.75-.75zM6 10.5h12v7.25a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V10.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold">Next session starts in</span>
                </div>

                {/* Enhanced segmented display with glow and flip animation */}
                <motion.div
                  className="relative mt-2.5 max-w-sm"
                  initial={{ scale: 0.98, boxShadow: "0 0 0 rgba(79,70,229,0)" }}
                  animate={{
                    scale: [0.98, 1, 0.98],
                    boxShadow: [
                      "0 0 0 rgba(79,70,229,0)",
                      "0 0 24px rgba(79,70,229,0.22)",
                      "0 0 0 rgba(79,70,229,0)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-fuchsia-400/15 to-indigo-500/15 blur-lg" aria-hidden />
                  <div className="relative grid grid-cols-4 gap-2 sm:gap-2.5 bg-white/40 dark:bg-white/0 rounded-2xl p-1.5">
                  {[
                    { label: "Days", value: timeParts.days },
                    { label: "Hours", value: timeParts.hours },
                    { label: "Minutes", value: timeParts.minutes },
                    { label: "Seconds", value: timeParts.seconds },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ y: 6, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="relative rounded-xl p-2.5 sm:p-3 bg-white/80 dark:bg-white/5 ring-1 ring-indigo-200/60 dark:ring-indigo-800/50 shadow-sm backdrop-blur-md"
                    >
                      <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-indigo-500 via-fuchsia-400 to-indigo-500 rounded-full opacity-70" />
                      <div className="text-center [perspective:600px]">
                        <div className="relative h-[26px] sm:h-[32px]">
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={item.value}
                              initial={{ rotateX: -90, opacity: 0, y: -6 }}
                              animate={{ rotateX: 0, opacity: 1, y: 0 }}
                              exit={{ rotateX: 90, opacity: 0, y: 6 }}
                              transition={{ duration: 0.28, ease: "easeOut" }}
                              className="absolute inset-0 grid place-items-center text-xl sm:text-2xl font-extrabold tracking-tight tabular-nums"
                            >
                              {String(item.value).padStart(2, "0")}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                        <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-600 dark:text-gray-300">
                          {item.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: Schedule card + buttons */}
            <div className="flex justify-center md:justify-end">
              <motion.div
                initial={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md bg-white dark:bg-[#071826] rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Next live classes</p>
                    <h4 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">Weekly — Tue &amp; Thu</h4>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">6:00 PM ET • Live on Google Meet</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-200">Free Entry</span>
                    <span className="mt-3 text-xs text-gray-600 dark:text-gray-400">Duration: 60 mins</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <a
                    href={tuesdayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join the Tuesday live class on Google Meet"
                    className="block w-full text-center px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-[#071826] transition-transform"
                  >
                    Join Live — Tuesday
                  </a>

                  <a
                    href={thursdayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join the Thursday live class on Google Meet"
                    className="block w-full text-center px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-[#071826] transition-transform"
                  >
                    Join Live — Thursday
                  </a>

                  <a
                    href={calendarHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Add the next live masterclass to your Google Calendar"
                    className="block w-full px-4 py-3 rounded-lg font-semibold border border-indigo-200 dark:border-indigo-800 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-200 dark:hover:bg-indigo-900/30 transition inline-flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                      <path d="M8 3.75a.75.75 0 0 1 .75.75V6h6V4.5a.75.75 0 0 1 1.5 0V6h.5A2.25 2.25 0 0 1 19 8.25v9.5A2.25 2.25 0 0 1 16.75 20H7.25A2.25 2.25 0 0 1 5 17.75v-9.5A2.25 2.25 0 0 1 7.25 6H7.5V4.5A.75.75 0 0 1 8 3.75ZM6.5 9v8.75c0 .414.336.75.75.75h9.5a.75.75 0 0 0 .75-.75V9h-11Z"/>
                      <path d="M9.75 12.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Z"/>
                    </svg>
                    Add to Google Calendar
                  </a>
                </div>

                <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                  <p>
                    Can’t make the live time? Join live anyway — replays are recorded and shared with attendees. Bring your burning questions
                    and case statements!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom decorative stripe */}
          <div className="h-6 bg-gradient-to-r from-indigo-600/15 via-transparent to-yellow-400/10 dark:from-indigo-500/10 dark:to-yellow-400/5" />
        </div>
      </div>
    </motion.section>
  );
}
