"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fixed daily webinar times in PST.
 */
const WEBINAR_SESSION_HOURS_PST = [10, 14, 19];

/**
 * Countdown hook: next scheduled webinar (10am, 2pm, 7pm PST).
 */
function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();

    const todaySessions = WEBINAR_SESSION_HOURS_PST.map((hour) => {
      const session = new Date(now);
      session.setHours(hour, 0, 0, 0);
      return session;
    });

    const nextToday = todaySessions.find((session) => session.getTime() > now.getTime());
    if (nextToday) {
      return nextToday;
    }

    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(WEBINAR_SESSION_HOURS_PST[0], 0, 0, 0);
    return tomorrow;
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
      <section className="relative overflow-hidden py-10 md:py-20 bg-white text-gray-900 dark:bg-[#0f1419] dark:text-white">
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

        {/* Subtle grid pattern background overlay - light blue */}
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

        {/* Top header with logo and tagline */}
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
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
            {/* Tagline */}
            <p className="text-base md:text-lg text-black dark:text-gray-300">
              This Free Webclass Is For Entrepreneurs, Small Business Owners, &amp; Those Just Getting Started...
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            {/* Left image with background */}
            <div className="lg:w-5/12 flex justify-center lg:justify-start lg:pl-20">
              <div className="relative rounded-lg overflow-hidden w-full max-w-[420px]">
                <div className="relative rounded-lg w-full h-[600px] bg-gray-100 dark:bg-[#0a0e14]">
                  <Image
                    src={"/images/squeeze/webex.jpeg"}
                    alt="Speaker"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="opacity-"
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Small uppercase text */}
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-gray-600 dark:text-gray-400 font-medium">
                Secrets To Easily Starting Your Own
              </p>

              {/* Main headline - very large, bold */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-4 text-gray-900 dark:text-white">
                Credit Repair
                <br />
                <span className="block">Business</span>
              </h1>

              {/* Subtext */}
              <p className="text-base md:text-lg mb-4 text-gray-700 dark:text-gray-300">
                Without having any prior experience with credit repair!
              </p>

              {/* Highlight text - bold */}
              <p className="text-base md:text-lg font-bold mb-8 text-gray-900 dark:text-white">
                100% FREE - Next Class Is Starting TODAY!
              </p>

              {/* CTA Button */}
              <div className="mb-8">
                <a
                  href="/webinar"
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg  transition-colors bg-[#026fe2] hover:bg-[#45beff] text-white"
                  style={{ boxShadow: "0 8px 20px rgba(54, 185, 246, 0.3)" }}
                >
                  Register For The Webclass Now!
                </a>
                <p className="mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                  Save My Seat For The Credit Repair Business Webclass
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-6">
                <p className="text-base md:text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Next Webclass Begins In:
                </p>

                <div className="flex items-center gap-4 md:gap-6">
                  {[
                    { label: "HOUR", value: format(hours) },
                    { label: "MINUTES", value: format(minutes) },
                    { label: "SECONDS", value: format(seconds) },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div
                        className="rounded-full flex flex-col items-center justify-center bg-white border-[3px] border-gray-300 dark:border-gray-600"
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      >
                        <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-900 mb-1">
                          {item.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-700 uppercase tracking-wide">
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
