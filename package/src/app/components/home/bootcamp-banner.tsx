"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const slidesData = [
  {
    imageSrc: "/images/todayclasstopic/11june.webp",
    imageAlt: "Business Credit Foundations",
    tagline: "FINANCIAL FOUNDATIONS",
    date: "June 11, 2026",
    heading: (
      <>
        Build a Fundable <br />
        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Business Profile</span>
      </>
    ),
    description: "Establish strong core business credit and unlock real capital opportunities with a structure banks trust.",
    pillText: "Includes 1:1 Counseling",
  },
  {
    imageSrc: "/images/todayclasstopic/11CA.webp",
    imageAlt: "Wealth Preservation",
    tagline: "ASSET PROTECTION",
    date: "June 11, 2026",
    heading: (
      <>
        Preserve Wealth & <br />
        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Protect Your Assets</span>
      </>
    ),
    description: "Safeguard your earnings and build concrete financial shields to weather economic instability safely.",
    pillText: "Live Master Class",
  },
];

const animationConfig = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

const BootcampBanner = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Accelerated 2-second auto-slide interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slide = slidesData[currentIndex];

  return (
    <section
      ref={containerRef}
      className={`${poppins.className} relative py-16 md:py-24 bg-[#FAF9F5] text-[#1A2432] overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* ── LEFT SIDE: MEDIA CONTAINER ── */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden shadow-2xl shadow-secondary/10 bg-white group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 "
                    sizes="(max-w-lg) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT SIDE: MINIMALIST CONTENT BLOCK ── */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={animationConfig}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col space-y-5"
              >
                {/* Meta Row with dynamic Date item */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase text-secondary/40">
                    {slide.tagline}
                  </span>
                  <div className="h-px w-4 sm:w-6 bg-secondary/20" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-secondary/60 bg-secondary/5 px-2 py-0.5 rounded">
                    {slide.date}
                  </span>
                  <div className="hidden sm:block h-px w-4 bg-secondary/20" />
                  <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full">
                    {slide.pillText}
                  </span>
                </div>

                {/* Condensed Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.15] tracking-tight text-[#1A2432]">
                  {slide.heading}
                </h2>

                {/* Lean Description */}
                <p className="text-base text-secondary/70 max-w-[460px] leading-relaxed font-normal">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls Below Content */}
            <div className="flex items-center gap-3 mt-10 pt-6 border-t border-secondary/5">
              {slidesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 relative overflow-hidden ${
                    idx === currentIndex ? "w-10 bg-[#1A2432]" : "w-2 bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  {idx === currentIndex && (
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-primary w-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.0, ease: "linear" }} // Sync tracking fill precisely to 2s
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BootcampBanner;
