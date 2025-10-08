"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { MotionDiv, MotionSection } from "@/shared/motion-components";
import { gsap } from "gsap";

type MerchantFeaturesProps = {
  title?: string;
  subtitle?: string;
  sideImageSrc?: string;
  highlightedPhrase?: string;
};

// Data-driven features array (icon + title + description)
const FEATURES: Array<{ icon: string; title: string; desc: string }> = [
  { icon: "📜", title: "Direct Underwriting", desc: "Get approved as a legitimate merchant, not lumped in with thousands of others." },
  { icon: "⚡", title: "Reliable Payouts", desc: "Funds in 24–48 hours, not frozen for weeks." },
  { icon: "💳", title: "Custom Pricing", desc: "Interchange-plus and volume-based rates, not one-size-fits-all fees." },
  { icon: "🤝", title: "Dedicated Support", desc: "An account manager who knows your business." },
  { icon: "🔐", title: "Privacy and Control", desc: "Bank-free rails with PCI-compliant infrastructure." },
];

export default function WhyAPMP({
  title = "Why a Private Merchant Account?",
  subtitle = "",
  sideImageSrc = "/images/services/intro-pmp.webp",
  highlightedPhrase = "Private Merchant Account",
}: MerchantFeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [payoutSpeed, setPayoutSpeed] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [globalNodes, setGlobalNodes] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: easeOut } },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Counter animation on reveal
  useEffect(() => {
    if (!isVisible) return;
    const duration = 1200;
    const start = performance.now();
    const targets = { payout: 48, up: 99, nodes: 120 };
    function step(ts: number) {
      const t = Math.min(1, (ts - start) / duration);
      const ease = (v: number) => 1 - Math.pow(1 - v, 3);
      setPayoutSpeed(Math.round(targets.payout * ease(t)));
      setUptime(Math.round(targets.up * ease(t)));
      setGlobalNodes(Math.round(targets.nodes * ease(t)));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isVisible]);

  // GSAP ripple, blob, and particle animations (mirrors CourseOverviewSection)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Ripple background
      const ripples = rippleRef.current?.querySelectorAll(".ripple") ?? [];
      gsap.set(ripples, { scale: 0, opacity: 0.6, transformOrigin: "50% 50%" });

      const rippleTl = gsap.timeline({ repeat: -1 });
      rippleTl.to(ripples, {
        scale: 2.8,
        opacity: 0,
        duration: 3.6,
        ease: "power1.out",
        stagger: 0.9,
      });

      // Floating blobs
      const blobs = containerRef.current?.querySelectorAll(".blob") ?? [];
      gsap.to(blobs, {
        y: "+=24",
        x: "+=16",
        rotation: "+=5",
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.5,
      });

      // Section entrance
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      return () => rippleTl.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <MotionSection
      ref={sectionRef}
      className="relative py-16 md:py-20 bg-gradient-to-br from-white/90 dark:from-[#071023] to-blue-50 dark:to-[#041019] overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Enhanced Ripple background */}
      <div ref={rippleRef} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div className="ripple absolute left-1/4 top-1/4 w-80 h-80 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), rgba(79,70,229,0.08) 40%, transparent 65%)" }} />
        <div className="ripple absolute right-1/4 top-1/4 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle at 60% 40%, rgba(79,70,229,0.22), rgba(99,102,241,0.06) 40%, transparent 70%)" }} />
        <div className="ripple absolute left-1/3 bottom-1/3 w-88 h-88 rounded-full" style={{ background: "radial-gradient(circle at 40% 60%, rgba(99,102,241,0.18), rgba(79,70,229,0.04) 40%, transparent 72%)" }} />
      </div>

      {/* Decorative blobs */}
      <div ref={containerRef} className="absolute inset-0">
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blob bg-gradient-to-br from-blue-400/20 to-indigo-400/15 dark:from-indigo-700/25 dark:to-blue-600/20 mix-blend-screen blur-3xl transform-gpu" />
        <div aria-hidden className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blob bg-gradient-to-br from-indigo-300/20 to-purple-300/12 dark:from-indigo-800/20 dark:to-purple-800/15 mix-blend-screen blur-3xl transform-gpu" />
        <div aria-hidden className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blob bg-gradient-to-br from-blue-300/15 to-cyan-300/10 dark:from-blue-700/15 dark:to-cyan-600/10 mix-blend-screen blur-2xl transform-gpu" />
      </div>

      {/* Existing soft glows (kept) */}
      <div className="pointer-events-none absolute -top-36 right-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300/50 via-blue-600/25 to-transparent blur-[96px] mix-blend-screen z-10" />
      <div className="pointer-events-none absolute -bottom-36 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-white/40 via-blue-500/15 to-transparent blur-[72px] mix-blend-overlay z-10" />
      <div className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-200/15 to-transparent dark:from-blue-900/15 z-5" />

      <div className="container relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left content: Title, subtitle, feature cards, CTA */}
        <MotionDiv
          variants={staggerVariants}
          className="lg:col-span-5 max-w-3xl mx-auto lg:mx-0 relative flex flex-col"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white"
          >
            {
              (() => {
                const phrase = highlightedPhrase;
                const index = title.indexOf(phrase);
                if (index !== -1) {
                  const before = title.slice(0, index);
                  const after = title.slice(index + phrase.length);
                  return (
                    <>
                      <span className="text-slate-900 dark:text-white">{before}</span>
                      <span className="text-blue-600 dark:text-blue-400">{phrase}</span>
                      <span className="text-slate-900 dark:text-white">{after}</span>
                    </>
                  );
                }
                return title;
              })()
            }
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-2xl text-secondary/90 dark:text-white/90 font-medium max-w-xl"
          >
            {subtitle}
          </motion.p>

          {/* Feature cards (similar to CourseOverviewSection) */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mt-12 max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FEATURES.map((f, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ translateY: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="bg-white/70 dark:bg-slate-800/70 rounded-xl py-4 px-5 flex items-start gap-3 border border-indigo-100 dark:border-indigo-800/50 backdrop-blur-md shadow-sm"
              >
                <span className="text-2xl select-none" aria-hidden>{f.icon}</span>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Button at bottom */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-start self-start"
          >
            <a
              href="/pmaform"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              aria-label="Start Your Application"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Start Your Application
            </a>
          </motion.div>
        </MotionDiv>

        {/* Right: Large image card with layered glows */}
        <motion.div
          variants={containerVariants}
          className="order-1 lg:order-2 relative flex justify-center items-center lg:col-span-7"
        >
          <motion.div
            variants={imageVariants}
            className="relative w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-3xl border-8 border-white dark:border-blue-950 transition-transform hover:scale-[1.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-blue-400/20 to-white/30 mix-blend-multiply" />
            <div className="relative w-full flex items-center justify-center">
              <Image
                src="/images/services/pmabanner.webp"
                alt="Private merchant processing visual"
                width={1600}
                height={1000}
                priority
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </motion.div>

          {/* Glow circles */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-xl bg-gradient-to-tr from-blue-500/50 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-xl bg-gradient-to-br from-blue-300/40 dark:from-white/20 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </MotionSection>
  );
}
