"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  BookOpen,
  UserCheck,
  Receipt,
  CreditCard,
  Ban,
  Copyright,
  Settings,
  AlertTriangle,
  XCircle,
  Scale,
  RotateCcw,
} from "lucide-react";

/**
 * CourseTNC – Terms & Conditions page
 * - Fully responsive, accessible
 * - Beautiful animated background (aurora + blobs + grid)
 * - Dark mode aware (uses Tailwind `dark:` variants)
 * - Subtle, tasteful motion via Framer Motion
 * - Sticky CTA with agree checkbox
 */

const sections = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "1. Introduction",
    body: (
      <p>
        Welcome to Creditor Academy! These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with these terms.
      </p>
    ),
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "2. User Eligibility",
    body: (
      <ul className="space-y-2">
        <Li>You must be at least 18 years old to use our services.</Li>
        <Li>If under 18, you need parental or guardian consent.</Li>
      </ul>
    ),
  },
  {
    icon: <Receipt className="h-6 w-6" />,
    title: "3. Account Registration",
    body: (
      <ul className="space-y-2">
        <Li>Create an account with accurate and complete information.</Li>
        <Li>You're responsible for your login credentials.</Li>
        <Li>We may suspend accounts for suspected fraud or unauthorized use.</Li>
      </ul>
    ),
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "4. Membership and Payment",
    body: (
      <ul className="space-y-2">
        <Li>Services are offered via membership plans.</Li>
        <Li>Payments are processed securely via third parties.</Li>
        <Li>All fees are non-refundable.</Li>
        <Li>Pricing may change, but your current plan remains active until renewal.</Li>
      </ul>
    ),
  },
  {
    icon: <Ban className="h-6 w-6" />,
    title: "5. Prohibited Activities",
    body: (
      <ul className="space-y-2">
        <Li>Do not share login details.</Li>
        <Li>No illegal activities using our platform.</Li>
        <Li>Unauthorized copying or reselling is forbidden.</Li>
        <Li>No fraudulent transactions or IP violations.</Li>
      </ul>
    ),
  },
  {
    icon: <Copyright className="h-6 w-6" />,
    title: "6. Intellectual Property",
    body: (
      <p>
        All course content, text, videos, and logos are owned by Creditor Academy. Reproduction or distribution without permission is prohibited.
      </p>
    ),
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "7. Service Availability",
    body: (
      <ul className="space-y-2">
        <Li>We may update or discontinue services anytime.</Li>
        <Li>We're not liable for disruptions due to external factors.</Li>
      </ul>
    ),
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "8. Limitation of Liability",
    body: (
      <p>
        We are not responsible for any direct, indirect, incidental, or consequential damages from using our services.
      </p>
    ),
  },
  {
    icon: <XCircle className="h-6 w-6" />,
    title: "9. Termination of Services",
    body: (
      <ul className="space-y-2">
        <Li>We may suspend your account for violating terms.</Li>
        <Li>You can cancel anytime, but no refunds will be provided.</Li>
      </ul>
    ),
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: "10. Governing Law",
    body: (
      <>
        <p>
          Since the Association is protected by the First, Fourth, Fifth, Ninth, and Tenth Amendments of the U.S. Constitution, it is outside the jurisdiction of federal and state authorities regarding complaints or grievances against its members.
        </p>
        <p className="mt-3">
          These terms follow the laws of The United States of America. Disputes will be resolved via binding arbitration in The United States of America.
        </p>
      </>
    ),
  },
  {
    icon: <RotateCcw className="h-6 w-6" />,
    title: "11. Changes to Terms",
    body: (
      <p>
        We may update terms at any time. Always refer to the latest version on our website.
      </p>
    ),
  },
];

export default function CourseTNC() {
  const [agreed, setAgreed] = useState(false);
  const [darkHint, setDarkHint] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Reduced-motion preference
  const prefersReduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-800 dark:bg-neutral-950 dark:text-slate-200">
      {/* Animated Background */}
      <AnimatedBackground paused={prefersReduced} />

      {/* Content Card */}
      <section className="relative mx-auto max-w-4xl px-4 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-900/60 shadow-xl shadow-slate-800/5 dark:shadow-black/30 backdrop-blur-xl overflow-hidden"
        >
          {/* Card top gradient border */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-300" />

          {/* Hero title */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-6 md:pb-8">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 dark:from-blue-300 dark:via-indigo-300 dark:to-cyan-300">
                Terms & Conditions
              </span>
            </motion.h2>
            <p className="mt-4 text-center text-base md:text-lg text-slate-600 dark:text-slate-300">
              Effective Date: 26 September 2024
            </p>
            <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
              By using our website and services, you acknowledge and agree to the following terms.
            </p>
            {/* Agree + CTA moved here */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 rounded accent-indigo-600 dark:accent-indigo-400"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span className="text-base md:text-lg">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setShowTerms(!showTerms)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 font-medium"
                  >
                    Terms and Conditions
                  </button>
                  .
                </span>
              </label>

              <motion.button
                type="button"
                onClick={() => {
                  if (!agreed) return;
                  window.location.href = "https://quickclick.com/r/06k6zonz2prrxt1pqknxgwgi2jsbtr";
                }}
                disabled={!agreed}
                whileTap={{ scale: agreed ? 0.98 : 1 }}
                className={`relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-70 ${
                  agreed
                    ? "bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-slate-200 dark:bg-neutral-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                <span>Enroll Now</span>
              </motion.button>
            </div>
          </div>

          {/* Sections - Only show when showTerms is true */}
          {showTerms && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-6 md:px-10 pb-10 md:pb-12"
            >
              <div className="divide-y divide-black/5 dark:divide-white/10">
                {sections.map((s, i) => (
                  <Section key={i} index={i + 1} icon={s.icon} title={s.title}>
                    {s.body}
                  </Section>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Bottom padding */}
      <div className="h-16" />
    </main>
  );
}

/** Utility: List item with check icon */
function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-indigo-500 dark:text-indigo-400" />
      <span>{children}</span>
    </li>
  );
}

/** Utility: Checklist row with checkbox */
function Checklist({ children, defaultChecked = false }: { children: React.ReactNode; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <li className="flex items-start gap-3">
      <input
        type="checkbox"
        className="mt-1 h-5 w-5 rounded accent-indigo-600 dark:accent-indigo-400"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <span>{children}</span>
    </li>
  );
}

/** Section wrapper with subtle reveal animation */
function Section({
  index,
  icon,
  title,
  children,
}: {
  index: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="py-6 md:py-8"
    >
      <div className="mb-3 md:mb-4 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-400/20">
          {icon}
        </div>
        <h3 className="text-lg md:text-xl font-semibold tracking-tight">
          {title}
        </h3>
      </div>
      <div className="prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-li:leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

/** Animated layered background (aurora, blobs, grid, noise) */
function AnimatedBackground({ paused = false }: { paused?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Aurora sweep */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={paused ? { opacity: 0.25 } : { opacity: [0.25, 0.45, 0.25] }}
        transition={paused ? { duration: 6 } : { duration: 10, repeat: Infinity }}
        className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.25), rgba(99,102,241,0.25), rgba(34,211,238,0.25), rgba(59,130,246,0.25))",
        }}
      />

      {/* Floating gradient blobs */}
      <motion.div
        initial={{ x: -200, y: -120 }}
        animate={paused ? { x: -200, y: -120 } : { x: [ -200, 40, -60, -200 ], y: [ -120, -60, 30, -120 ] }}
        transition={paused ? { duration: 12 } : { duration: 26, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl bg-gradient-to-tr from-sky-400/35 to-fuchsia-400/35 dark:from-sky-500/25 dark:to-fuchsia-500/25"
      />
      <motion.div
        initial={{ x: 220, y: 160 }}
        animate={paused ? { x: 220, y: 160 } : { x: [ 220, -20, 80, 220 ], y: [ 160, 80, -20, 160 ] }}
        transition={paused ? { duration: 12 } : { duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-gradient-to-tr from-amber-300/35 to-rose-400/35 dark:from-amber-300/20 dark:to-rose-400/20"
      />

      {/* Subtle grid (light & dark variants) */}
      <div className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30,41,59,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 hidden dark:block opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(226,232,240,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(226,232,240,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          backgroundPosition: "center",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"none\" viewBox=\"0 0 400 400\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.6\"/></svg>')" }}
      />
    </div>
  );
}
    