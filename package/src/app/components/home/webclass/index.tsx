"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Generate hourly time slots for all 24 hours (0:00 to 23:00)
const WEBINAR_SESSION_HOURS_PST = Array.from({ length: 24 }, (_, i) => i);

function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();
    const allSessions: Date[] = [];

    // Today's sessions
    for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
      const d = new Date(now);
      d.setHours(WEBINAR_SESSION_HOURS_PST[i], 0, 0, 0);
      if (d.getTime() > now.getTime()) {
        allSessions.push(d);
      }
    }

    // Tomorrow's sessions (fallback)
    if (allSessions.length === 0) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
        const d = new Date(tomorrow);
        d.setHours(WEBINAR_SESSION_HOURS_PST[i], 0, 0, 0);
        allSessions.push(d);
      }
    }

    allSessions.sort((a, b) => a.getTime() - b.getTime());
    return allSessions[0] || new Date(now.getTime() + 60 * 60 * 1000);
  };

  const [targetTime, setTargetTime] = useState<Date>(getNextSessionTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
        setTargetTime(getNextSessionTarget());
        return;
      }

      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
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
    <section className="bg-[#0b1329] text-white py-8 md:py-20 font-sans selection:bg-amber-400 selection:text-black">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header/Logo */}
        <div className="flex justify-center mb-12">
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png"
            alt="Creditor Academy Logo"
            width={200}
            height={48}
            className="h-auto w-auto opacity-90"
            priority
          />
        </div>

        {/* Short Subtitle */}
        <p className="text-center text-sm md:text-base text-gray-400 max-w-2xl mx-auto mb-4">
          This <span className="text-amber-400 font-medium">FREE Webclass</span> Is For Business Owners, Individuals, &amp; Anyone Ready for Change…
        </p>

        {/* Simple Alert Banner */}
        <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-xl py-3 px-4 max-w-2xl mx-auto mb-12 text-center">
          <p className="text-xs md:text-sm font-semibold tracking-wide uppercase text-red-400">
            ⚠️ URGENT: Limited Spots Available — Closing Soon
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Subtle Accent */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[3/4] rounded-2xl overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 border border-amber-400/30 rounded-2xl z-10 pointer-events-none group-hover:border-amber-400 transition-colors duration-300" />
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
                alt="Paul Michael Rowland"
                fill
                className="object-cover  transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 block">
              Secrets To Operating Private
            </span>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">
              Become and <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Operate Private
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Learn how private individuals step out of the public system to gain control, limit liability, and achieve financial sovereignty with Creditor Academy's core principles.
            </p>

            {/* Simplified CTA Action Block */}
            <div className="space-y-4 mb-6">
              <div>
                <a
                  href="/webinar"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all shadow-xl shadow-amber-500/10 hover:shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Secure Your Free Seat
                </a>
              </div>
              {/* <p className="text-xs text-gray-400">
                100% Free • Next live stream starting today
              </p> */}
            </div>

            {/* <hr className="border-gray-800 my-4 max-w-xl mx-auto lg:mx-0" /> */}

            {/* Clean Minimal Countdown */}
            <div className="pt-4">
              <p className="text-sm font-medium tracking-wider text-gray-400 uppercase mb-4">
                Next session starts in:
              </p>
              
              <div className="flex justify-center lg:justify-start gap-4 text-center">
                {[
                  { label: "Hours", value: format(hours) },
                  { label: "Mins", value: format(minutes) },
                  { label: "Secs", value: format(seconds) },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/80 rounded-xl px-5 py-3 min-w-[75px]">
                    <div className="text-2xl font-mono font-bold text-white">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}