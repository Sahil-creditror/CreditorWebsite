"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fixed daily webinar times in PST (every 20 minutes from 9 AM to 12 AM).
 */
const WEBINAR_SESSION_HOURS_PST: number[] = [];
const WEBINAR_SESSION_MINUTES_PST: number[] = [];

// Generate all time slots from 9:00 AM to 12:00 AM (every 20 minutes)
for (let hour = 9; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 20) {
    WEBINAR_SESSION_HOURS_PST.push(hour);
    WEBINAR_SESSION_MINUTES_PST.push(minute);
  }
}
// Add midnight (12:00 AM = 0:00)
WEBINAR_SESSION_HOURS_PST.push(0);
WEBINAR_SESSION_MINUTES_PST.push(0);

/**
 * Countdown hook: next scheduled webinar (every 20 minutes from 9 AM to 12 AM PST).
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
    return allSessions[0] || new Date(now.getTime() + 20 * 60 * 1000); // Fallback: 20 minutes from now
  };

  const [targetTime, setTargetTime] = useState<Date>(getNextSessionTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
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

  // placeholder SVG data URL
  const placeholderSrc =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
         <defs>
           <linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#111827' /><stop offset='1' stop-color='#374151' /></linearGradient>
         </defs>
         <rect width='100%' height='100%' fill='url(#g)'/>
         <g fill='#f3f4f6' font-family='Arial, Helvetica, sans-serif'>
           <text x='50%' y='45%' font-size='36' text-anchor='middle' font-weight='700'>Speaker</text>
           <text x='50%' y='52%' font-size='18' text-anchor='middle'>Placeholder Image</text>
         </g>
       </svg>`
    );

  return (
    <>
      {/* Webclass hero section - matching exact design from image */}
      <section className="relative overflow-hidden py-5 md:py-10 bg-white text-gray-900 dark:bg-[#0f1419] dark:text-white">
        {/* Background image with opacity - light mode only */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden">
          <div
            className="w-full h-full opacity-[0.15]"
            style={{
              backgroundImage: "url('/images/squeeze/bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Subtle grid pattern background overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Grid pattern for light mode */}
          <div
            className="w-full h-full opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid-light' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='%23026fe2' stroke-width='1' opacity='0.7'/%3E%3Cpath d='M 0 0 L 80 80' fill='none' stroke='%23026fe2' stroke-width='0.5' opacity='0.15'/%3E%3Cpath d='M 80 0 L 0 80' fill='none' stroke='%23026fe2' stroke-width='0.5' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid-light)'/%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
              backgroundRepeat: "repeat",
            }}
          />
          {/* Grid pattern for dark mode */}
          <div
            className="w-full h-full hidden dark:block opacity-[0.18]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid-dark' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 80 0 L 0 0 0 80' fill='none' stroke='%2345beff' stroke-width='1' opacity='0.4'/%3E%3Cpath d='M 0 0 L 80 80' fill='none' stroke='%2345beff' stroke-width='0.5' opacity='0.2'/%3E%3Cpath d='M 80 0 L 0 80' fill='none' stroke='%2345beff' stroke-width='0.5' opacity='0.2'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid-dark)'/%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
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
                  src="/images/logo/creditorlogo.webp"
                  alt="Creditor Academy Logo"
                  width={250}
                  height={60}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="/images/logo/creditorlogo.webp"
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
            <p className="text-center text-black dark:text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
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
            <p className="text-center text-black dark:text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
              Learn how people step out of the public system and operate in private to gain control, limit liability, and achieve financial freedom.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            {/* Left image with gold border */}
            <div className="lg:w-5/12 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                <div 
                  className="relative w-full h-[700px] border-2 overflow-hidden"
                  style={{ 
                    borderColor: "#d4af37",
                    backgroundColor: "#f3f4f6"
                  }}
                >
                  <Image
                    src={"/images/webinar/paul_webclass.webp"}
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
              <p className="text-xs md:text-sm tracking-wider uppercase mb-1 text-gray-600 dark:text-gray-400 font-medium" style={{ fontFamily: "Arial, sans-serif" }}>
                Secrets To Easily Starting Your Own
              </p>

              {/* Main headline - very large, bold */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-2 text-gray-900 dark:text-white" style={{ fontFamily: "Arial, sans-serif", fontWeight: 900 }}>
                <span className="block" style={{ color: "#026fe2" }}>Become and</span>
                <span className="block">Operate Private</span>
              </h1>

              {/* Subtext
              <p className="text-base md:text-lg mb-3 text-black dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                WithOUT having any prior experience with private operation!
              </p> */}

              {/* Description paragraphs */}
              <div className="mb-4 space-y-2">
                {/* <p className="text-base md:text-lg text-black dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                  Learn how people step out of the public system and operate in private to gain control, limit liability, and achieve financial freedom.
                </p> */}
                <p className="text-base md:text-lg text-black dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                  This FREE webclass introduces Creditor Academy's principles on how private individuals and businesses operate differently in structure, credit, income, and responsibility—focused on positioning, private operation, and reducing dependency.
                </p>
              </div>

              {/* Highlight text - bold with gold highlights */}
              <p className="text-base md:text-lg font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
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

              {/* CTA Button - blue */}
              <div className="mb-4">
                <a
                  href="/webinar"
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg text-white transition-all hover:opacity-90"
                  style={{ 
                    backgroundColor: "#026fe2",
                    fontFamily: "Arial, sans-serif",
                    boxShadow: "0 8px 20px rgba(2, 111, 226, 0.3)"
                  }}
                >
                  Register For The Webclass Now!
                </a>
                <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
                  Save My Seat For The Private Operation Webclass
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-3">
                <p className="text-base md:text-lg font-semibold mb-3 text-gray-900 dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
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
