"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  Briefcase,
  Sprout,
  Sparkles,
  CalendarClock,
  PlayCircle,
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
  pitch?: string;
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
const DEFAULT_KICKER = "Overview • 3-Month Journey";
const DEFAULT_PITCH =
  "This 3-month Journey teaches you how to operate entirely outside the state-controlled system—by using private trusts, PMAs, and lawful commerce strategies. Ideal for healers, real estate pros, educators, freelancers, and freedom-seekers.";

const DEFAULT_AUDIENCE = [
  "Healers",
  "Real estate pros",
  "Educators",
  "Freelancers",
  "Freedom-seekers",
];

// ---------------------------------------------
// Animation Variants
// ---------------------------------------------

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

// ---------------------------------------------
// Component
// ---------------------------------------------

export default function MasterclassOverview({
  title = DEFAULT_TITLE,
  kicker = DEFAULT_KICKER,
  pitch = DEFAULT_PITCH,
  audience = DEFAULT_AUDIENCE,
  primaryCtaText = "Join Now",
  primaryCtaHref = "#apply",
  secondaryCtaText = "View Curriculum",
  secondaryCtaHref = "#curriculum",
  className = "",
}: MasterclassOverviewProps) {
  const titleWords = title.split(" ");

  return (
    <section
      className={`relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-28 ${className}`}
      aria-labelledby="masterclass-overview-title"
    >
      {/* Background aesthetics */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] md:h-[36rem] md:w-[36rem] rounded-full bg-gradient-to-b from-indigo-400/15 via-fuchsia-400/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.08),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left: Title & Pitch */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50 px-3 py-1 text-xs sm:text-sm font-semibold text-indigo-700 shadow-sm dark:border-indigo-800/60 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              <CalendarClock className="h-3.5 w-3.5" /> {kicker}
            </motion.span>

            <h1
              id="masterclass-overview-title"
              className="mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-snug"
            >
              {titleWords.map((w, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className="mr-2 inline-block text-blue-600 dark:text-blue-400"
                >
                  {w}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {pitch}
            </motion.p>

            {/* Audience pills */}
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {audience.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs sm:text-sm font-medium text-gray-800 backdrop-blur border border-gray-200 shadow-sm dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-700"
                >
                  <Sparkles className="h-3.5 w-3.5" /> {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <PlayCircle className="h-4 w-4" /> {primaryCtaText}
              </a>
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-sm sm:text-base font-semibold text-indigo-700 hover:bg-white shadow-sm backdrop-blur dark:border-indigo-800 dark:bg-gray-800/60 dark:text-indigo-300"
              >
                <FileCheck className="h-4 w-4" /> {secondaryCtaText}
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" /> Small-group coaching
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Private community
              </span>
              <span className="inline-flex items-center gap-2">
                <FileCheck className="h-4 w-4" /> Templates included
              </span>
            </motion.div>
          </div>

          {/* Right: Program cards */}
          <div className="lg:col-span-6 xl:col-span-5">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Benefit Cards */}
              {[
                {
                  icon: Building2,
                  title: "Private-first structure",
                  desc: "Learn frameworks for operating privately with clarity and confidence.",
                  colors: "from-indigo-500 to-indigo-700",
                  gradient: "from-indigo-500/40 via-fuchsia-500/30 to-rose-500/30",
                },
                {
                  icon: Briefcase,
                  title: "Real-world commerce",
                  desc: "Translate principles into offers, payment flows and client delivery.",
                  colors: "from-emerald-500 to-teal-600",
                  gradient: "from-emerald-500/40 to-teal-500/30",
                },
                {
                  icon: Sprout,
                  title: "Built-in scalability",
                  desc: "Systems, documentation and habits that support growth without chaos.",
                  colors: "from-amber-500 to-rose-600",
                  gradient: "from-amber-500/40 to-pink-500/30",
                },
                {
                  icon: ShieldCheck,
                  title: "Clarity & compliance",
                  desc: "Operate with consistent practices and clear boundaries across contexts.",
                  colors: "from-violet-500 to-fuchsia-600",
                  gradient: "from-violet-500/40 to-fuchsia-500/30",
                },
              ].map(({ icon: Icon, title, desc, colors, gradient }) => (
                <motion.article
                  key={title}
                  variants={popIn}
                  className={`rounded-2xl p-[1px] bg-gradient-to-br ${gradient}`}
                >
                  <div className="h-full rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-white/60 dark:border-white/10 p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-xl p-3 bg-gradient-to-br ${colors} text-white shadow-inner`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          {title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Foreground accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-rose-400/10 via-fuchsia-400/10 to-indigo-400/10 blur-2xl"
      />
    </section>
  );
}
