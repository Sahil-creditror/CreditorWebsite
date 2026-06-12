"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

const HeroSection = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const heroContent = {
    title: "Become a Member",
    description: "Protect What You Build. Pass On What Matters.",
    bgImage: "/images/hero/Bannerhero.webp",
  };

  return (
    <div className="relative w-full min-h-screen flex items-center bg-[#0b1320] text-white overflow-hidden">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroContent.bgImage}
          alt="Hero background"
          fill
          priority
          quality={90}
          className="object-cover object-center select-none"
          sizes="100vw"
        />
        {/* Directional vignette — strong left, fades right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1320] via-[#0b1320]/70 to-[#0b1320]/20" />
      </div>

      {/* ── TOP-RIGHT: GET IN TOUCH ── */}
      <div className="absolute top-6 right-6 z-20 sm:top-8 sm:right-8 pt-24">
        <button
          onClick={() => setShowContactForm(true)}
          className="group flex items-center gap-2.5 bg-white/7 hover:bg-white/12 text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-full pl-3 pr-4 py-2.5 transition-all duration-200 backdrop-blur-sm"
        >
          {/* Icon bubble */}
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest">
            Get In Touch
          </span>
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-xl flex flex-col"
        >

          {/* Membership status badge */}
          <div className="inline-flex items-center gap-2 self-start mb-8 bg-white/8 border border-white/15 rounded-full px-3.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            <span className="text-[11px] font-semibold text-white/65 uppercase tracking-[0.08em]">
              Membership open
            </span>
          </div>

          {/* Short rule */}
          <div className="w-10 h-0.5 bg-white/15 rounded-full mb-7" />

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-white mb-5">
            Become a{" "}
            <span className="text-white/35">Member</span>
          </h1>

          {/* Sub-copy */}
          <p className="text-base sm:text-lg text-white/50 leading-relaxed font-normal mb-10 max-w-sm">
            {heroContent.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 flex-wrap">
            {/* Primary CTA */}
            <Link
              href="/masterclass-membership"
              className="group inline-flex items-center gap-3 bg-white text-[#0b1320] font-bold text-sm uppercase tracking-wider rounded-full pl-7 pr-2 py-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <span>Start Now</span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0b1320] text-white transition-transform duration-300 group-hover:rotate-45 shrink-0">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>

            {/* Ghost CTA */}
            <Link href="/about-us" className="inline-flex items-center gap-2 text-white/55 hover:text-white border border-white/20 hover:border-white/35 rounded-full px-6 py-[13px] text-sm font-medium transition-all duration-200 hover:bg-white/8">
              Learn more
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

        </motion.div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence >
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;