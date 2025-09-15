"use client";

import React, { useRef, useEffect } from "react";
import { motion, Variants, Transition } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import {
  ShieldCheck,
  Building2,
  Briefcase,
  Sprout,
  Sparkles,
  CalendarClock,
  FileCheck,
  Users,
} from "lucide-react";

// ---------------------------------------------
// Types
// ---------------------------------------------

type Module = {
  month: string; // e.g. "Month 1"
  title: string;
  points: string[];
};

interface MasterclassOverviewProps {
  title?: string;
  kicker?: string;
  pitch?: string[];
  audience?: string[];
  modules?: Module[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------
// Defaults
// ---------------------------------------------

const DEFAULT_TITLE = "Launch a Private Business with Trusts & PMAs";
const DEFAULT_KICKER = "Overview • Self-paced Journey";
const DEFAULT_PITCH = [
  "Operate outside state-controlled systems",
  "Private trusts & PMA structures", 
  "Lawful commerce strategies",
  "Asset protection frameworks",
  "Family legacy planning"
];

const DEFAULT_AUDIENCE = [
  "Entrepreneurs",
  "Real estate pros",
  "Educators",
  "Freelancers",
  "Freedom-seekers",
];

export default function MasterclassOverview({
  title = DEFAULT_TITLE,
  kicker = DEFAULT_KICKER,
  pitch = DEFAULT_PITCH,
  audience = DEFAULT_AUDIENCE,
  primaryCtaText = "Join Now",
  primaryCtaHref = "#apply",
  secondaryCtaText = "Contact Us",
  secondaryCtaHref = "/contact",
  className = "",
}: MasterclassOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const titleWords = title.split(" ");
  // Deterministic PRNG (mulberry32) to avoid SSR/client mismatches for particles
  const mulberry32 = (seed: number) => {
    let state = seed >>> 0;
    return () => {
      state |= 0;
      state = (state + 0x6D2B79F5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  // Precompute particle positions deterministically so SSR === CSR
  const PARTICLE_POSITIONS = React.useMemo(() => {
    const baseSeed = 0xC0FFEE; // fixed seed for stability
    return Array.from({ length: 15 }, (_, i) => {
      const rand = mulberry32(baseSeed + i * 97);
      const leftPercent = `${rand() * 100}%`;
      const topPercent = `${rand() * 100}%`;
      return { left: leftPercent, top: topPercent } as const;
    });
  }, []);

  
  // --- GSAP ripple + blob animation ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Enhanced ripple effect
      const ripples = rippleRef.current?.querySelectorAll(".ripple") ?? [];
      gsap.set(ripples, { scale: 0, opacity: 0.6, transformOrigin: "50% 50%" });

      const rippleTl = gsap.timeline({ repeat: -1 });
      rippleTl.to(ripples, {
        scale: 2.8,
        opacity: 0,
        duration: 3.6,
        ease: "power1.out",
        stagger: 0.9
      });

      // Enhanced blob animation
      const blobs = containerRef.current?.querySelectorAll(".blob") ?? [];
      gsap.to(blobs, {
        y: "+=24",
        x: "+=16",
        rotation: "+=5",
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.5
      });

      // Particle animation
      const particles = containerRef.current?.querySelectorAll(".particle") ?? [];
      gsap.to(particles, {
        y: -40,
        opacity: 0,
        duration: 6,
        stagger: 0.2,
        repeat: -1,
        ease: "power1.out",
        delay: 1
      });

      // Section entrance animation
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );

      return () => rippleTl.kill();
    });

    return () => mm.revert();
  }, []);

  // --- Video placeholder removed; embedding Google Drive preview directly ---

  // --- Framer Motion Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const transition: Transition = {
    duration: 0.65,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  // Benefit cards data - simplified
  const benefitCards = [
    {
      icon: Building2,
      title: "Private Structure",
      desc: "UBOT Trusts & PMA formation for asset protection",
      colors: "from-blue-500 to-blue-700",
    },
    {
      icon: Briefcase,
      title: "Commerce Systems",
      desc: "Payment flows and client delivery frameworks",
      colors: "from-emerald-500 to-emerald-700",
    },
    {
      icon: Sprout,
      title: "Scalable Growth",
      desc: "Documentation and process systems for teams",
      colors: "from-amber-500 to-amber-700",
    },
    {
      icon: ShieldCheck,
      title: "Compliance",
      desc: "Legal boundaries and risk management",
      colors: "from-violet-500 to-violet-700",
    },
  ];

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 px-4 md:px-6 py-12 md:py-16">
      <motion.section
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-xl border border-blue-100 dark:border-slate-700"
      >
        {/* Enhanced Ripple background */}
        <div ref={rippleRef} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="ripple absolute left-1/4 top-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), rgba(79,70,229,0.08) 40%, transparent 65%)' }} />
          <div className="ripple absolute right-1/4 top-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(79,70,229,0.22), rgba(99,102,241,0.06) 40%, transparent 70%)' }} />
          <div className="ripple absolute left-1/3 bottom-1/3 w-88 h-88 rounded-full" style={{ background: 'radial-gradient(circle at 40% 60%, rgba(99,102,241,0.18), rgba(79,70,229,0.04) 40%, transparent 72%)' }} />
        </div>

        {/* Floating particles (deterministic positions to avoid SSR hydration mismatches) */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-indigo-500/40"
              style={{ left: pos.left, top: pos.top }}
            />
          ))}
        </div>

        {/* Enhanced decorative blobs */}
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blob bg-gradient-to-br from-blue-400/20 to-indigo-400/15 dark:from-indigo-700/25 dark:to-blue-600/20 mix-blend-screen blur-3xl transform-gpu" />
        <div aria-hidden className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blob bg-gradient-to-br from-indigo-300/20 to-purple-300/12 dark:from-indigo-800/20 dark:to-purple-800/15 mix-blend-screen blur-3xl transform-gpu" />
        <div aria-hidden className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blob bg-gradient-to-br from-blue-300/15 to-cyan-300/10 dark:from-blue-700/15 dark:to-cyan-600/10 mix-blend-screen blur-2xl transform-gpu" />

        <div className="flex flex-wrap gap-10 items-center relative z-10">
          {/* Embedded Video Preview (Google Drive) */}
          <div className="flex-1 min-w-[18rem] max-w-3xl relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="w-full aspect-video">
              <iframe
                src="https://drive.google.com/file/d/1_x_eof3Q40gXfXepGAeMCEX98Dro6dIA/preview"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Course preview video"
              />
            </div>
          </div>

          {/* Enhanced Course Description */}
          <div className="flex-1 min-w-[18rem] p-5 relative z-10">
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-3 py-1 text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm dark:border-indigo-800/60 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4"
            >
              <CalendarClock className="h-3.5 w-3.5" /> {kicker}
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-300 relative inline-block"
            >
              {titleWords.map((w, i) => (
                <span
                  key={i}
                  className="mr-2 inline-block text-blue-600 dark:text-blue-400"
                >
                  {w}
                </span>
              ))}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "3.5rem" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded" 
              />
            </motion.h2>

            <motion.ul
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="space-y-2 mb-6"
            >
              {pitch.map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-base font-medium">{point}</span>
                </li>
              ))}
            </motion.ul>

            {/* Audience pills */}
            <motion.div 
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="flex flex-wrap gap-2 mb-6"
            >
              {audience.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs sm:text-sm font-medium text-gray-800 backdrop-blur border border-gray-200 shadow-sm dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-700"
                >
                  <Sparkles className="h-3.5 w-3.5" /> {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="flex flex-wrap gap-3 mb-6"
            >
              <motion.a
                href={primaryCtaHref}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all"
              >
                <PlayCircle className="h-4 w-4" /> {primaryCtaText}
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm sm:text-base font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-800 dark:bg-gray-800/60 dark:text-indigo-300"
                >
                  <FileCheck className="h-4 w-4" /> {secondaryCtaText}
                </Link>
              </motion.div>
            </motion.div> */}

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              animate="visible"
              transition={transition}
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" /> Small groups
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Private access
              </span>
              <span className="inline-flex items-center gap-2">
                <FileCheck className="h-4 w-4" /> Templates
              </span>
            </motion.div>
          </div>
        </div>

        {/* Benefit Cards */}
        <motion.div
          variants={fadeUp}
          custom={6}
          initial="hidden"
          animate="visible"
          transition={{ ...transition, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 relative z-10"
        >
          {benefitCards.map(({ icon: Icon, title, desc, colors }) => (
            <motion.article
              key={title}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center">
                <div
                  className={`inline-flex rounded-xl p-4 bg-gradient-to-br ${colors} text-white shadow-sm mb-4`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}