"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

const HeroSection = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  // Content configuration
  const heroContent = {
    title: "Become a Member",
    description: "Protect What You Build. Pass On What Matters.",
    bgImage: "/images/hero/Bannerhero.webp",
    logoSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp/v1768883696/creditor-website-assets/images/logo/credi_logoo.webp"
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-start bg-[#0b1320] text-white overflow-hidden">
      
      {/* ── BACKGROUND LAYER (Optimized Asset Pipeline) ── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={heroContent.bgImage}
          alt="Hero Premium Background"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105 select-none"
          sizes="100vw"
        />
        {/* Sleek, professional vignette overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:bg-black/40"></div>
      </div>

      {/* ── TOP RIGHT FLOATING CTA: Get In Touch ── */}
      <div className="absolute top-28 right-4 sm:right-6 md:right-8 z-20">
        <button
          onClick={() => setShowContactForm(true)}
          className="group flex items-center gap-3 bg-white/10 hover:bg-white text-white hover:text-gray-950 border border-white/20 rounded-full px-5 py-2.5 transition-all duration-300 backdrop-blur-md shadow-lg"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">
            Get In Touch
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* ── MAIN CONTENT INFRASTRUCTURE ── */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-26 pb-8 flex flex-col items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl flex flex-col gap-5 items-center"
        >
          {/* Corporate Identifier Logo */}
          <div className="relative block opacity-95">
            <Image
              src={heroContent.logoSrc}
              alt="Creditor Academy Logo"
              width={380}
              height={90}
              priority
              quality={90}
              className="object-contain w-48 sm:w-64 md:w-70 h-auto"
            />
          </div>

          {/* Heading Framework */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            {heroContent.title}
          </h1>

          {/* Body Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl font-medium leading-relaxed text-center tracking-wide">
            {heroContent.description}
          </p>

          {/* Core Interactive Action Router CTA */}
          <div className="mt-2 group">
            <Link
              href="/masterclass-membership"
              className="inline-flex items-center gap-4 bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base uppercase tracking-wider pl-6 pr-2 py-2 rounded-full transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95"
            >
              <span>Start Now</span>
              <span className="w-10 h-10 bg-white flex items-center justify-center rounded-full text-gray-950 shadow-sm transition-transform duration-300 group-hover:rotate-45">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── MODAL CONTEXTS ── */}
      <AnimatePresence>
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;