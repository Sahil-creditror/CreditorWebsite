"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import RippleBackground from "../background/commitment/ripple";

const commitments = [
  {
    id: "01",
    title: "Transparency & Trust",
    body:
      "We ensure complete clarity in every step of your journey — no hidden terms, no surprises, just honesty and integrity.",
  },
  {
    id: "02",
    title: "Personalized Mentorship",
    body:
      "Every learner receives tailored guidance from experienced mentors who understand your unique goals and challenges.",
  },
  {
    id: "03",
    title: "Career Transformation",
    body:
      "From knowledge to practice, we equip you with tools and strategies that lead to real, lasting career growth.",
  },
];

// Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/*                             Premium CTA Button                             */
/* -------------------------------------------------------------------------- */
function PremiumCTAButton({
  children = "Join Creditor Academy",
  onClick,
  className = "",
  ariaLabel = "Join Creditor Academy",
}: {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  className?: string;
  ariaLabel?: string;
}) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const createRipple = (e: any, keyboard = false) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = keyboard ? rect.width / 2 : e.clientX - rect.left;
    const y = keyboard ? rect.height / 2 : e.clientY - rect.top;
    const diag = Math.hypot(rect.width, rect.height);
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const ripple = { id, x, y, size: Math.max(24, diag * 0.6) };
    setRipples((s) => [...s, ripple]);
    window.setTimeout(
      () => setRipples((s) => s.filter((r) => r.id !== id)),
      700
    );
  };

  const handleClick = (e: any) => {
    createRipple(e, false);
    onClick?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      // @ts-ignore
      createRipple(e, true);
      onClick?.(e);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      aria-label={ariaLabel}
      className={`relative group overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 
                  rounded-2xl text-base font-semibold text-white
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-[#4d9fff]/60
                  shadow-[0_6px_16px_rgba(2,111,226,0.35)] transition ${className}`}
    >
      {/* Rich gradient background */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl z-0"
        style={{
          background:
            "linear-gradient(135deg, #0047ab, #026FE2, #7f5dff, #b38bff)",
        }}
      />

      {/* Soft inner highlight */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl z-0"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(255,255,255,0.18), rgba(255,255,255,0.05))",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Glow aura */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute -inset-6 rounded-3xl blur-3xl z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(111,173,255,0.35), transparent 70%)",
        }}
      />

      {/* Sheen */}
      <span className="absolute inset-0 overflow-hidden rounded-2xl">
        <span
          className="absolute inset-0 -translate-x-[120%] group-hover:translate-x-[120%]
                     transition-transform duration-[1100ms] ease-out"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
        />
      </span>

      {/* Label + Arrow */}
      <span className="relative z-10 flex items-center gap-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
        <span>{children}</span>
      </span>

      {/* Ripples (gradient instead of plain white) */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.35, scale: 0 }}
            animate={{ opacity: 0, scale: 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Commitment Section                             */
/* -------------------------------------------------------------------------- */
export default function CommitmentSection() {
  return (
    <section className="relative w-full bg-lightgray dark:bg-darkblack text-[#0d1b2a]">
      <RippleBackground />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-20">
        {/* Section Badge */}
        <div className="flex flex-col xl:flex-row items-start gap-8 mb-10">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                07
              </span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
              <p className="section-bedge py-1.5 px-4 rounded-full">Commitment</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT SIDE */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <div className="lg:sticky lg:top-24 xl:top-28 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#026FE2]/70 mb-4 sm:mb-6">
                Creditor Academy
              </p>
              <h2 className="font-extrabold text-4xl sm:text-5xl lg:text-5xl xl:text-5xl leading-relaxed text-[#000000] dark:text-white/90">
                Our Commitment <br />
                {/* <motion.span
                  className="inline-block mt-2 sm:mt-3 text-[#013a75] dark:text-[#026FE2]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                > */}
                  To You 🤝
                {/* </motion.span> */}
              </h2>

              {/* Replaced CTA with Premium CTA */}
              <div className="mt-8 sm:mt-10 w-full sm:w-auto flex justify-center lg:justify-start">
                <PremiumCTAButton
                  onClick={() => {
                    // replace with your real handler
                    console.log("Join CTA clicked");
                    // example: scroll to sign-up anchor
                    const el = document.getElementById("signup") as HTMLElement | null;
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Join Creditor Academy
                </PremiumCTAButton>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE CARDS */}
          <div className="lg:col-span-7">
            <div className="relative flex flex-col space-y-8">
              {commitments.map((item, idx) => (
                <motion.article
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, delay: idx * 0.25, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="sticky top-20 sm:top-24 lg:top-28 z-0 group/card"
                  role="article"
                  aria-label={`${item.title} commitment card`}
                >
                  {/* Gradient Border Wrapper */}
                  <div className="relative p-[1px] rounded-3xl bg-[conic-gradient(from_140deg,#026FE2,#8fd0ff,#a889ff,#026FE2)] shadow-[0_10px_30px_-10px_rgba(2,111,226,0.25)]">
                    {/* Inner panel: original frosted light look in light mode, dark glass in dark mode */}
                    <div className="relative h-full rounded-3xl bg-white/80 dark:bg-[#071226]/80 backdrop-blur-xl overflow-hidden">
                      {/* Glow Orbs */}
                      <motion.div
                        className="absolute -top-10 -left-10 h-32 w-32 rounded-full blur-2xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(2,111,226,0.18), transparent)" }}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full blur-2xl pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(168,137,255,0.16), transparent)" }}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Dotted Overlay (subtle & works on both themes) */}
                      <div
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{
                          backgroundImage: "radial-gradient(rgba(2,111,226,0.06) 1px, transparent 1px)",
                          backgroundSize: "18px 18px",
                        }}
                      />

                      {/* Hover Sheen */}
                      <div className="absolute -inset-x-10 -top-1/2 h-[140%] skew-x-[-18deg] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 translate-x-[-120%] group-hover/card:translate-x-[120%] transition-transform duration-[1200ms] ease-out bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 h-full p-6 sm:p-8 md:p-12 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-4 sm:gap-5">
                          {/* ID Badge */}
                          <motion.div
                            whileHover={{ rotate: 8, scale: 1.08 }}
                            className="relative h-14 w-14 sm:h-16 sm:w-16 grid place-items-center rounded-2xl
                                      bg-white/70 dark:bg-white/10 backdrop-blur-md
                                      border border-[#026FE2]/30
                                      text-lg sm:text-xl font-bold
                                      text-[#026FE2] dark:text-white
                                      shadow-inner"
                          >
                            {item.id}
                          </motion.div>

                          {/* Title - gradient in light mode, white-ish in dark mode, with fallback */}
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-[#013a75] dark:text-white">
                            <span
                              className={
                                "inline-block bg-clip-text text-transparent " +
                                "bg-gradient-to-r from-[#013a75] via-[#026FE2] to-[#6d7cff] " +
                                "dark:from-white dark:via-[#e6f4ff] dark:to-[#e8d9ff] " +
                                "group-hover/card:from-[#026FE2] group-hover/card:to-[#a889ff] " +
                                "transition-all duration-700"
                              }
                              style={{ WebkitBackgroundClip: "text", backgroundClip: "text" }}
                            >
                              {item.title}
                            </span>
                          </h3>
                        </div>

                        {/* Body */}
                        <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-[#1a2b4c]/90 dark:text-[#eef6ff] leading-relaxed">
                          {item.body}
                        </p>

                        <div className="mt-auto" />

                        {/* Footer */}
                        <motion.div
                          className="pt-5 sm:pt-7 text-xs sm:text-sm text-[#4b5c7a] dark:text-[#cbdaf2] italic border-t border-dashed border-[#cbd5e1]/50 dark:border-white/10 mt-6"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
                        >
                          Promise {idx + 1} of {commitments.length}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Spacer */}
              <div className="h-[20vh] sm:h-[30vh] lg:h-[40vh]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
