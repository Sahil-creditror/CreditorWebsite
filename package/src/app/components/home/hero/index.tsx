"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

const HeroSection = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const heroContent = {
    title: "Become Private. Operate Private.",
    titleAccent: "Achieve Financial Freedom.",
    description:
      "Learn business trusts, asset protection, business credit, and financial sovereignty through the Creditor Academy Masterclass.",
    bgImage: "/images/hero/Bannerhero.webp",
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#071B52] text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src={heroContent.bgImage}
          alt="Hero background"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay — heavier in center-bottom, lighter at top edges */}
        <div className="absolute inset-0 bg-[#060a1c]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a1c]/90 via-[#071B52]/40 to-transparent" />
      </div>

      {/* Ambient glow — centered behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[180px] rounded-full pointer-events-none" />

      {/* CONTENT — fully centered */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 py-1 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mt-16">
            Become Private. Operate Private.
            <span className="bg-gradient-to-r  from-cyan-300 to-white bg-clip-text text-transparent block mt-2">
              Financial Freedom.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed font-medium mb-12">
            {heroContent.description}
          </p>

          {/* Divider dots */}
          {/* <div className="flex gap-1.5 mt-10 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            {/* Primary */}
            <Link
              href="/masterclass-membership"
              className="group inline-flex items-center gap-3 bg-white text-[#123A9E] font-extrabold text-sm uppercase tracking-wider rounded-full pl-7 pr-2 py-2 shadow-xl hover:-translate-y-1 transition-transform"
            >
              Join Masterclass Membership
              <span className="w-10 h-10 rounded-full bg-[#123A9E] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                <svg
                  width="15"
                  height="15"
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

            {/* Secondary */}
            <Link
              href="/webinar"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-semibold text-sm hover:bg-white/15 transition shadow-lg"
            >
              Watch Free Webinar
              <svg
                width="15"
                height="15"
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

          {/* Trust line */}
          <p className="mt-8 text-xs text-white/40 tracking-widest uppercase">
            Trusted by 10,000+ students nationwide
          </p>
        </motion.div>
      </div>

      {/* CONTACT OVERLAY MODAL */}
      <AnimatePresence>
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;