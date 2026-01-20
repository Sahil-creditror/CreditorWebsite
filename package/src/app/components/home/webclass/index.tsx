"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fixed daily webinar times in PST (24h format).
 * These are used for the countdown logic and upcoming-session dropdown.
 * Updated for hourly sessions from 9:00 AM to 12:00 AM (midnight).
 */
const WEBINAR_SESSION_HOURS_PST: number[] = [];
const WEBINAR_SESSION_MINUTES_PST: number[] = [];

// Generate hourly time slots from 9:00 AM to 12:00 AM (midnight)
// 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, ..., 11:00 PM, 12:00 AM
for (let hour = 9; hour < 24; hour++) {
  WEBINAR_SESSION_HOURS_PST.push(hour);
  WEBINAR_SESSION_MINUTES_PST.push(0); // Only hourly slots (minute = 0)
}
// Add midnight (12:00 AM = 0:00)
WEBINAR_SESSION_HOURS_PST.push(0);
WEBINAR_SESSION_MINUTES_PST.push(0);

/**
 * Hard stop for this webinar series (final occurrence).
 * Used so that "upcoming" logic never goes past the last scheduled date.
 *
 * NOTE: Feb 1, 2026 11:59 PM PST (adjust if the series end date changes).
 */
const WEBINAR_SERIES_END = new Date("2026-02-01T23:59:59-08:00");

/**
 * Countdown hook: next scheduled webinar (hourly from 9 AM to 12 AM PST) from current time.
 * Shows countdown to the nearest upcoming session start time.
 * When a session time passes, automatically moves to the next session.
 */
function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();

    // Build all possible sessions for today and tomorrow
    const allSessions: Date[] = [];
    
    // Today's sessions
    for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
      const d = new Date(now);
      d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
      if (d.getTime() > now.getTime()) {
        allSessions.push(d);
      }
    }

    // Tomorrow's sessions (if needed)
    if (allSessions.length === 0) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
        const d = new Date(tomorrow);
        d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
        allSessions.push(d);
      }
    }

    // Sort by time and get the nearest upcoming session
    allSessions.sort((a, b) => a.getTime() - b.getTime());
    return allSessions[0] || new Date(now.getTime() + 60 * 60 * 1000); // Fallback: 1 hour from now
  };

  const [targetTime, setTargetTime] = useState<Date>(getNextSessionTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
        // Move to the next session and recompute
        const newTarget = getNextSessionTarget();
        setTargetTime(newTarget);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}

export default function WebclassSection() {
  const { hours, minutes, seconds } = useCountdown();

  const format = (value: number) => value.toString().padStart(2, "0");

  return (
    <>
      {/* Webclass hero section - matching exact design from image */}
      <section className="relative overflow-hidden py-5 md:py-10 text-white dark:text-white">
        {/* Base gradient background using website blue shades */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #001428 0%, #002b5c 30%, #026fe2 60%, #45beff 85%, #bfdbfe 100%)",
          }}
        />
        
        {/* Split design with diagonal lines on right side - light mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden">
          {/* Left side - gradient dark blue */}
          <div 
            className="absolute inset-0 left-0 right-[40%]"
            style={{
              background: "linear-gradient(to bottom right, #001428 0%, #002b5c 50%, #026fe2 100%)",
            }}
          />
          
          {/* Right side - lighter blue gradient with diagonal streaks */}
          <div 
            className="absolute inset-0 left-[40%] right-0"
            style={{
              background: "linear-gradient(to bottom right, #026fe2 0%, #45beff 40%, #93c5fd 70%, #bfdbfe 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='diagonal-lines' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cg opacity='0.12'%3E%3Cpath d='M 0 0 L 120 120' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 30 L 120 150' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 60 L 120 180' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 90 L 120 210' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 0 L 90 120' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 30 L 90 150' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 60 L 90 180' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 90 L 90 210' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23diagonal-lines)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Split design for dark mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
          {/* Left side - dark gradient */}
          <div 
            className="absolute inset-0 left-0 right-[40%]"
            style={{
              background: "linear-gradient(to bottom right, #000000 0%, #001428 50%, #002b5c 100%)",
            }}
          />
          
          {/* Right side - darker gradient with subtle diagonal lines */}
          <div 
            className="absolute inset-0 left-[40%] right-0"
            style={{
              background: "linear-gradient(to bottom right, #001428 0%, #002b5c 40%, #026fe2 70%, #0a0a0a 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='diagonal-lines-dark' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cg opacity='0.08'%3E%3Cpath d='M 0 0 L 120 120' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 30 L 120 150' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 60 L 120 180' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 90 L 120 210' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 0 L 90 120' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 30 L 90 150' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 60 L 90 180' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 90 L 90 210' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23diagonal-lines-dark)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Top header with logo */}
        <div className="relative z-10 bg-transparent py-2">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="text-center">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.webp"
                  alt="Creditor Academy Logo"
                  width={250}
                  height={60}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.webp"
                  alt="Creditor Academy Logo"
                  width={250}
                  height={60}
                  className="hidden dark:block"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top banner */}
        <div className="relative z-10 bg-transparent py-3">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <p className="text-center text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
              This <strong>FREE Webclass</strong> Is For Business Owners, Individuals, &amp; Anyone Ready for Change…
            </p>
          </div>
        </div>

        {/* Alert Banner - Webinar Closing Soon */}
        <div className="relative z-10 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 py-3 my-3 shadow-lg">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
                <strong>URGENT:</strong> This FREE Webinar Is Closing Soon - Limited Spots Available!
              </p>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description line below alert */}
        <div className="relative z-10 py-2">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <p className="text-center text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
              Learn how people step out of the public system and operate in private to gain control, limit liability, and achieve financial freedom.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            {/* Left image with gold border */}
            <div className="lg:w-5/12 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div 
                  className="relative w-full h-[700px] border-2 overflow-hidden"
                  style={{ 
                    borderColor: "#d4af37",
                    backgroundColor: "#f3f4f6"
                  }}
                >
                  <Image
                    src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"}
                    alt="Speaker"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 flex flex-col justify-center lg:pr-8 xl:pr-12">
              {/* Small uppercase text */}
              <p className="text-xs md:text-sm tracking-wider uppercase mb-1 text-white dark:text-gray-400 font-medium" style={{ fontFamily: "Arial, sans-serif" }}>
                Secrets To Easily Starting Your Own
              </p>

              {/* Main headline - very large, bold */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-2 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif", fontWeight: 900 }}>
                <span className="block" style={{ color: "#ffc107" }}>Become and</span>
                <span className="block">Operate Private</span>
              </h1>

              {/* Description paragraphs */}
              <div className="mb-4 space-y-2">
                <p className="text-base md:text-lg text-white dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                  This FREE webclass introduces Creditor Academy's principles on how private individuals and businesses operate differently in structure, credit, income, and responsibility—focused on positioning, private operation, and reducing dependency.
                </p>
              </div>

              {/* Highlight text - bold with gold highlights */}
              <p className="text-base md:text-lg font-bold mb-4 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
                <span style={{ color: "#ffc107" }}>100% FREE</span> - Next Class Is Starting <span style={{ color: "#ffc107" }}>TODAY!</span>
              </p>

              {/* Alert Message - Closing Soon */}
              <div className="mb-4 w-fit p-3 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-300 dark:border-red-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm md:text-base font-semibold text-red-800 dark:text-red-200 whitespace-nowrap" style={{ fontFamily: "Arial, sans-serif" }}>
                    <strong>Closing Soon!</strong> Register now before spots fill up.
                  </p>
                </div>
              </div>

              {/* CTA Button - Link to /webinar */}
              <div className="mb-4">
                <a
                  href="/webinar"
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg transition-colors bg-[#FFC107] hover:bg-[#FFD700] text-gray-900"
                  style={{ 
                    fontFamily: "Arial, sans-serif",
                    boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)"
                  }}
                >
                  Go to Registration Page
                </a>
                <p className="mt-2 text-xs md:text-sm text-white dark:text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
                  Learn More About The Private Operation Webclass
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-3">
                <p className="text-base md:text-lg font-semibold mb-3 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
                  Next Webclass Begins In:
                </p>

                <div className="flex items-center gap-3 md:gap-4">
                  {[
                    { label: "HOUR", value: format(hours) },
                    { label: "MINUTES", value: format(minutes) },
                    { label: "SECONDS", value: format(seconds) },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div
                        className="rounded-full flex flex-col items-center justify-center border-[3px] bg-white dark:bg-[#0a0e14]"
                        style={{
                          width: 120,
                          height: 120,
                          borderColor: "#d1d5db"
                        }}
                      >
                        <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-1" style={{ fontFamily: "Arial, sans-serif" }}>
                          {item.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
