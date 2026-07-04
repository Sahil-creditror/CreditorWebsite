"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

// --- Luxury Ambient Blue Particle Field ---
const LuxuryParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = [
      "rgba(56, 189, 248, ",
      "rgba(14, 165, 233, ",
      "rgba(255, 255, 255, ",
    ];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }> = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.25 - 0.05,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.25 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 opacity-70 mix-blend-screen"
    />
  );
};

// --- Main Hero Component ---
const HeroSection = () => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const heroContent = {
    eyebrow: "Creditor Academy Masterclass",
    title: "Become Private",
    titleAccent: "Operate Private",
    titleFreedom: "Achieve Financial Freedom",
    subTitle: "Build Generational Wealth",
    description:
      "Learn business trusts, asset protection, business credit, and financial sovereignty through the Creditor Academy Masterclass — the strategies the privileged use to build, protect, and pass on wealth.",
    bgImage: "/images/lifestylebg.png",
  };

  return (
    <div className="relative min-h-screen w-full flex items-center lg:items-end overflow-hidden bg-[#020617] text-white font-sans selection:bg-sky-500/30">
      {/* BACKGROUND GRAPHICS & TEXTURES */}
      <div className="absolute inset-0 z-0">
        {/* Main Hero Media Asset */}
        <div className="absolute inset-0 opacity-60 lg:w-full lg:opacity-100">
          <Image
            src={heroContent.bgImage}
            alt="Private skyline overlooking the city — the world of financial sovereignty"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-4000 ease-out hover:scale-105"
          />

          {/* High-tech Grid Matrix Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-size-[5rem_5rem]" />
        </div>

        {/* Cinematic Vignettes & Dynamic Environmental Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-[#020617]/85 via-[#020617]/40 to-transparent hidden lg:block" />
        <div className="absolute inset-0 bg-linear-to-b from-[#020617]/90 via-transparent to-[#020617] lg:hidden block" />

        {/* Soft Organic Ambient Light Glares */}
        <div className="absolute top-1/3 left-[-10%] w-[600px] h-[600px] bg-sky-500/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
        <LuxuryParticles />
      </div>

      {/* TYPOGRAPHY & CTA LAYOUT CONTAINER */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-20 pt-24 lg:pb-24 flex justify-start">
        <div className="max-w-2xl text-left flex flex-col items-start backdrop-blur-[2px] lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl">
          {/* Premium Eyebrow Flag */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 text-[8px] sm:text-[10px] uppercase tracking-[0.4em] text-sky-400 font-bold mb-4"
          >
            <span className="w-6 h-px bg-linear-to-r from-sky-400 to-transparent" />
            <span className="bg-linear-to-r from-sky-400 via-sky-200 to-white bg-clip-text text-transparent">
              {heroContent.eyebrow}
            </span>
          </motion.div>

          {/* Heading Architectural Complex */}
          <h1 className="font-serif tracking-tight leading-[1.08] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white w-full">
            {/* Heading 1: Become Private */}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block tracking-tight drop-shadow-md text-slate-50"
            >
              {heroContent.title}
            </motion.span>

            {/* Heading 2: Operate Private */}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block text-transparent bg-clip-text bg-linear-to-r from-sky-400 via-sky-100 to-slate-200 font-light italic mt-1"
            >
              {heroContent.titleAccent}
            </motion.span>

            {/* Heading 3: Financial Freedom */}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.34,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-sky-300 font-light pb-2 mt-1 tracking-tight text-xl sm:text-2xl lg:text-5xl italic"
            >
              {heroContent.titleFreedom}
            </motion.span>

            {/* Micro Separation Rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-1/3 bg-linear-to-r from-sky-500/50 to-transparent my-4 origin-left"
            />

            {/* Sub-Headline Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block text-sm sm:text-lg lg:text-xl font-sans font-medium tracking-[0.12em] text-sky-300/90 uppercase"
            >
              {heroContent.subTitle}
            </motion.span>
          </h1>

          {/* Context Body Copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-6 mb-9 text-xs sm:text-sm text-slate-300 leading-relaxed tracking-wide font-light max-w-lg"
          >
            {heroContent.description}
          </motion.p>

          {/* High-Fidelity Call To Action Interfaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 w-full sm:w-auto"
          >
            {/* Primary Action Button */}
            <Link
              href="/masterclass-membership"
              className="group relative inline-flex items-center justify-between gap-6 bg-white text-[#020617] font-bold text-[11px] uppercase tracking-[0.2em] rounded-full pl-7 pr-2.5 py-2.5 shadow-[0_10px_30px_rgba(2,6,23,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Join Membership</span>
              <span className="w-9 h-9 rounded-full bg-[#020617] text-white flex items-center justify-center transition-all duration-300 group-hover:rotate-45 group-hover:bg-sky-500">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>

            {/* Secondary Action Button */}
            <Link
              href="/webinar"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-200 font-semibold text-[11px] uppercase tracking-[0.2em] backdrop-blur-md hover:bg-sky-500/10 hover:text-white hover:border-sky-400/40 transition-all duration-300 group"
            >
              <span>Watch Free Webinar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-150 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Overlay Modal Portal */}
      <AnimatePresence>
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;