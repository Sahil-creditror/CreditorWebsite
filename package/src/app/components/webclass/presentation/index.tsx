"use client";

import Image from "next/image";
import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";

export default function PresentationSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 text-white bg-[linear-gradient(135deg,_#1e40af_0%,_#3b82f6_50%,_#60a5fa_100%)] dark:bg-[#060a13]">
      {/* subtle background art */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hidden md:block absolute -left-40 top-10 w-[520px] h-[380px] rounded-3xl bg-white/10 blur-[1px]" />
        <div className="hidden md:block absolute right-[-12%] top-24 w-[560px] h-[420px] rounded-[40px] bg-white/10" />
        <div className="absolute -top-24 right-24 w-40 h-40 rounded-full bg-white/30 blur-3xl opacity-70" />
        <div className="hidden dark:block w-full h-full opacity-[0.25] bg-[radial-gradient(circle_at_top,_rgba(2,111,226,0.6),_transparent_55%)]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Header */}
          {/* <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs md:text-sm uppercase tracking-widest shadow-sm mb-8">
            4. What You'll Learn
          </span> */}

          <div className="inline-flex flex-col gap-4">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              During This FREE Live Webclass You'll Learn the Creditor Academy Framework
            </h2>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="inline-block w-16 h-1 rounded-full bg-[#b87b1f]" />
            <span className="w-3 h-3 rounded-full border border-[#b87b1f] bg-white dark:bg-transparent" />
            <span className="inline-block w-16 h-1 rounded-full bg-[#b87b1f]" />
          </div>

          <p className="mt-8 text-lg md:text-2xl font-semibold leading-relaxed text-white/90 max-w-4xl mx-auto">
            Discover practical strategies for building stronger financial foundations through proper structure, credit management, and business operations.
          </p>

          {/* Video Container */}
          <div className="mt-12">
            <div className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/50 bg-white dark:border-white/10 dark:bg-[#0c1322]">
              <div className="relative w-full overflow-hidden shadow-2xl aspect-video bg-black border border-white/10 dark:border-gray-200/30 rounded-none">
                <video
                  playsInline
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

          {/* CTA Button */}
          <div className="mt-10">
            <button
              type="button"
              onClick={openWebinarRegistration}
              className="inline-flex items-center justify-center rounded-xl bg-[#ffd24c] text-[#10213b] font-extrabold text-lg px-10 py-4 shadow-lg hover:bg-[#ffcc33] active:scale-[0.98] transition-all duration-200"
            >
              Claim My Free Access Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}