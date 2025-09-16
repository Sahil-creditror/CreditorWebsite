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

export default function WhyAPMP({
  title = "Why a Private Merchant Account?",
  subtitle = "",
  sideImageSrc = "/images/services/PMP_Flex.webp",
  highlightedPhrase = "private operators",
}: MerchantFeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  return (
    <MotionSection
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-br from-white/90 dark:from-[#071023] to-blue-50 dark:to-[#041019] overflow-hidden"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Soft layered background glows */}
      <div className="pointer-events-none absolute -top-36 right-0 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300/50 via-blue-600/25 to-transparent blur-[96px] mix-blend-screen z-10" />
      <div className="pointer-events-none absolute -bottom-36 left-0 h-96 w-96 rounded-full bg-gradient-to-tr from-white/40 via-blue-500/15 to-transparent blur-[72px] mix-blend-overlay z-10" />
      <div className="pointer-events-none absolute inset-0 scale-110 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-200/15 to-transparent dark:from-blue-900/15 z-5" />

      <div className="container relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left content with numbered items */}
        <MotionDiv
          variants={staggerVariants}
          className="lg:col-span-6 max-w-3xl mx-auto lg:mx-0 relative flex flex-col"
        >
          <motion.h2
            variants={itemVariants}
            className="relative pl-8 text-5xl md:text-6xl font-extrabold leading-tight text-blue-600 dark:text-blue-400 drop-shadow-[0_3px_8px_rgba(0,31,160,0.3)]"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-6 pl-8 text-lg md:text-2xl text-secondary/90 dark:text-white/90 font-medium max-w-xl"
          >
            {subtitle}
          </motion.p>

          {/* Numbered features */}
          <motion.div
            variants={staggerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mt-16 max-w-3xl pl-8 flex-grow"
          >
            {[
              { title: "Direct Underwriting", desc: "Get approved as a legitimate merchant, not lumped in with thousands of others." },
              { title: "Reliable Payouts", desc: "Funds in 24–48 hours, not frozen for weeks." },
              { title: "Custom Pricing", desc: "Interchange-plus and volume-based rates, not one-size-fits-all fees." },
              { title: "Dedicated Support", desc: "An account manager who knows your business." },
              { title: "Privacy and Control", desc: "Bank-free rails with PCI-compliant infrastructure." },
            ].map((f, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ translateY: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative pl-0 pb-8"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 text-xs font-bold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {f.title}
                    </h4>
                    <p className="mt-2 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Button at bottom */}
          <motion.div
            variants={itemVariants}
            className="mt-10 pl-8 flex justify-start self-start"
          >
            <button
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow-lg hover:scale-105 hover:brightness-110 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-400/50"
              aria-label="See how a private account saves you money"
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
              See How a Private Account Saves You Money
            </button>
          </motion.div>
        </MotionDiv>

        {/* Right: Large image card with layered glows */}
        <motion.div
          variants={containerVariants}
          className="order-1 lg:order-2 relative flex justify-center items-center lg:col-span-6"
        >
          <motion.div
            variants={imageVariants}
            className="relative h-80 sm:h-96 md:h-[520px] w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-3xl border-8 border-white dark:border-blue-950 transition-transform hover:scale-[1.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-blue-400/20 to-white/30 mix-blend-multiply" />
            <Image
              src={sideImageSrc}
              alt="Private merchant processing visual"
              fill
              className="object-cover object-center"
              priority
            />
          </motion.div>

          {/* Glow circles */}
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-xl bg-gradient-to-tr from-blue-500/50 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-xl bg-gradient-to-br from-blue-300/40 dark:from-white/20 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </MotionSection>
  );
}
