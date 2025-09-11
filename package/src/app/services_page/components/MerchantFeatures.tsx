"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { MotionDiv, MotionSection } from "@/shared/motion-components";

type MerchantFeaturesProps = {
  title?: string;
  subtitle?: string;
  sideImageSrc?: string;
  highlightedPhrase?: string;
};

export default function MerchantFeatures({
  title = "Creditor Academy Private Merchant Processing",
  subtitle = "Process Payments Privately. Get Paid Securely. Stay in Control.",
  sideImageSrc = "/images/services/PMP_Flex.webp",
  highlightedPhrase = "private operators",
}: MerchantFeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // optimistic counters
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

  // animate optimistic counters when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200; // ms
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

  return (
    <MotionSection
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-b from-white/60 dark:from-[#071023] to-white/40 dark:to-[#041019] overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* decorative glows */}
      <div className="pointer-events-none absolute -top-28 -right-8 h-80 w-80 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl mix-blend-overlay" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-80 w-80 rounded-full bg-secondary/20 dark:bg-white/3 blur-3xl mix-blend-overlay" />

      <div className="container">
        <MotionDiv
          variants={staggerVariants}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-14"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
            aria-hidden
          >
            Private • Secure • Flexible
          </motion.span>

          <motion.h2 variants={itemVariants} className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight text-secondary dark:text-white">
            {title}
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-3 text-base md:text-lg text-secondary/80 dark:text-white/80">
            {subtitle}
          </motion.p>
        </MotionDiv>

        <MotionDiv
          variants={staggerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch max-w-6xl mx-auto"
        >
          {/* Left: feature card */}
          <motion.div
            variants={containerVariants}
            className="relative order-2 lg:order-1 bg-white dark:bg-[#071421] border border-secondary/8 dark:border-white/8 rounded-3xl p-6 md:p-8 shadow-xl"
          >
            <motion.div variants={staggerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
              <motion.h3 variants={itemVariants} className="relative text-2xl md:text-3xl font-extrabold leading-snug">
                <span className="inline-block align-baseline">Built for</span>{" "}
                <span className="relative inline-block align-baseline">
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: easeOut }}
                    className="text-primary"
                  >
                    {highlightedPhrase}
                  </motion.span>
                  <motion.span
                    className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-primary/60"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={isVisible ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
                    style={{ transformOrigin: "left center" }}
                  />
                </span>
              </motion.h3>

              <motion.div variants={itemVariants} className="text-secondary/80 dark:text-white/80 space-y-3 md:text-lg mt-3">
                <p>Process payments without compromising your sovereignty, privacy, or mission.</p>
                <p>Powered by NMI, international banking rails, and Shopify for elite-grade reliability.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Private by Design",
                    desc: "Operate off major public rails with discretion.",
                    text: "text-emerald-600 dark:text-emerald-400",
                    bg: "bg-emerald-100 dark:bg-emerald-400/10",
                    containerBg: "bg-emerald-50 dark:bg-emerald-400/10",
                    border: "border-emerald-200 dark:border-emerald-400/20",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10V7a5 5 0 1 1 10 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 15v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: "Bank-Resilient",
                    desc: "Minimize dependence on legacy banking partners.",
                    text: "text-blue-600 dark:text-blue-400",
                    bg: "bg-blue-100 dark:bg-blue-400/10",
                    containerBg: "bg-blue-50 dark:bg-blue-400/10",
                    border: "border-blue-200 dark:border-blue-400/20",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 10l9-6 9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 10h16v8H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M9 14h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: "Global Ready",
                    desc: "International routing, settlements & FX.",
                    text: "text-violet-600 dark:text-violet-400",
                    bg: "bg-violet-100 dark:bg-violet-400/10",
                    containerBg: "bg-violet-50 dark:bg-violet-400/10",
                    border: "border-violet-200 dark:border-violet-400/20",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 3c3 3.5 3 14.5 0 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    ),
                  },
                  {
                    title: "Shopify Friendly",
                    desc: "Seamless storefront and webhook integrations.",
                    text: "text-pink-600 dark:text-pink-400",
                    bg: "bg-pink-100 dark:bg-pink-400/10",
                    containerBg: "bg-pink-50 dark:bg-pink-400/10",
                    border: "border-pink-200 dark:border-pink-400/20",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 7h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M9 7l1-3h4l1 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                  },
                ].map((f, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ translateY: -6, boxShadow: "0 12px 30px rgba(2,6,23,0.12)" }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className={`group flex items-start gap-3 rounded-xl p-4 border hover:shadow-md transition-transform ${f.containerBg} ${f.border}`}
                  >
                    <span className={`mt-1 inline-flex ${f.text}`}>
                      {f.icon}
                    </span>

                    <div>
                      <h4 className="text-lg font-bold">{f.title}</h4>
                      <p className="text-secondary/70 dark:text-white/70 text-sm md:text-base">{f.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary/40"
                  aria-label="Start onboarding"
                >
                  Get started
                </button>

                <a href="#learn-more" className="text-sm text-secondary/80 hover:underline">
                  Learn how it works
                </a>
              </motion.div> */}
            </motion.div>
          </motion.div>

          {/* Right: image */}
          <motion.div variants={containerVariants} className="order-1 lg:order-2 relative">
            <motion.div variants={imageVariants} className="relative h-64 sm:h-72 md:h-80 lg:h-full min-h-64 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-multiply" />
              <Image src={sideImageSrc} alt="Private merchant processing visual" fill className="object-cover object-center" priority />
            </motion.div>

            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-xl bg-primary/20 blur-xl" />
            <div className="absolute -top-5 -right-5 h-24 w-24 rounded-xl bg-secondary/20 dark:bg-white/10 blur-xl" />
          </motion.div>
        </MotionDiv>

        {/* Optimistic section */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-10 md:mt-12 max-w-6xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-to-r from-white/60 dark:from-[#071421] to-white/30 dark:to-[#041019] p-6 md:p-8 border border-secondary/8 dark:border-white/6 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-extrabold">Optimistic Outcomes — What you can expect</h3>
                <p className="mt-2 text-secondary/80 dark:text-white/80">We designed the stack to deliver fast settlements, robust uptime, and global coverage — so you can focus on growth.</p>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold">{payoutSpeed}%</div>
                    <div className="text-sm text-secondary/70">Faster payouts</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold">{uptime}%</div>
                    <div className="text-sm text-secondary/70">Platform uptime</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold">{globalNodes}+</div>
                    <div className="text-sm text-secondary/70">Global nodes</div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-72">
                <div className="rounded-xl p-4 bg-gradient-to-b from-primary/6 to-transparent border border-primary/8">
                  <h4 className="font-semibold">Ready for an optimistic future?</h4>
                  <p className="text-sm text-secondary/70 mt-2">Join a private merchant program built for resilience and discretion.</p>
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-primary/40">Request invite</button>
                    <button className="px-3 py-2 rounded-lg border border-secondary/10 dark:border-white/8 text-sm">Contact sales</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
