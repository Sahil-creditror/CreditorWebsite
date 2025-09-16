"use client";

import { motion, type Variants } from "framer-motion";

type Step = {
  title: string;
  description: string;
};

type MerchantStepsProps = {
  heading?: string;
  steps?: Step[];
};

const defaultSteps: Step[] = [
  {
    title: "Apply Online",
    description: "A short, secure pre-application form.",
  },
  {
    title: "Underwriting",
    description: "Your business is reviewed and approved within 24–48 hours.",
  },
  {
    title: "Go Live",
    description:
      "Start accepting cards with your private merchant account, backed by 99.9% uptime infrastructure.",
  },
];

export default function PMPHowItWorks({
  heading = "How It Works",
  steps = defaultSteps,
}: MerchantStepsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.16, delayChildren: 0.09 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
      scale: 1.035,
      boxShadow:
        "0 12px 32px rgba(38,102,254,0.10), 0 2px 8px rgba(38,102,254,0.05)",
      y: -6,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 0.25,
      y: 0,
      transition: { duration: 0.6, delay: 0.12 },
    },
  };

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white via-blue-50/60 to-white dark:from-[#0d1730] dark:via-[#101d3b] dark:to-[#071023] overflow-hidden">
      {/* Ambient, layered glows */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 0.20, scale: 1.1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 bg-gradient-to-bl from-blue-400/30 via-blue-600/10 to-transparent rounded-full blur-[70px]"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.17, scale: 1.08 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-20 -left-32 h-72 w-72 bg-gradient-to-tr from-white/40 via-blue-400/20 to-transparent rounded-full blur-[90px]"
      />

      <div className="container relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.64, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 mb-12 md:mb-16 drop-shadow-xl"
        >
          {heading}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {/* Step 1 */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-3xl bg-white/90 dark:bg-[#192040]/90 border border-blue-200/30 dark:border-blue-800/30 shadow-2xl p-8 md:p-12"
          >
            <div className="relative flex items-start justify-between min-h-[90px]">
              <div>
                <p className="text-blue-600 dark:text-blue-300 font-bold tracking-wide text-lg md:text-xl">
                  {steps[0]?.title}
                </p>
                <p className="mt-4 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-3xl">
                  {steps[0]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 text-transparent bg-clip-text select-none"
                style={{
                  WebkitTextStroke: "3px rgba(38,102,254,0.07)",
                  letterSpacing: "-0.03em",
                }}
              >
                1
              </motion.span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-3xl bg-gradient-to-br from-blue-100/90 to-blue-50/85 dark:from-blue-900/80 dark:to-blue-800/60 border border-blue-200/60 dark:border-blue-700/40 shadow-2xl p-8 md:p-12"
          >
            <div className="relative flex items-start justify-between min-h-[90px]">
              <div>
                <p className="text-blue-600 dark:text-blue-300 font-bold tracking-wide text-lg md:text-xl">
                  {steps[1]?.title}
                </p>
                <p className="mt-4 text-secondary/80 dark:text-white/85 text-base md:text-lg max-w-3xl">
                  {steps[1]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-blue-300 via-blue-200 to-blue-50 text-transparent bg-clip-text select-none"
                style={{
                  WebkitTextStroke: "3px rgba(38,102,254,0.07)",
                  letterSpacing: "-0.03em",
                }}
              >
                2
              </motion.span>
            </div>
          </motion.div>

          {/* Step 3 (full-width on LG) */}
          <motion.div
            variants={cardVariants}
            className="relative rounded-3xl bg-white/95 dark:bg-[#192040]/95 border border-blue-200/30 dark:border-blue-800/30 shadow-2xl p-8 md:p-12"
          >
            <div className="relative flex flex-col lg:flex-row items-start justify-between min-h-[90px] gap-6 lg:gap-0">
              <div>
                <p className="text-blue-600 dark:text-blue-300 font-bold tracking-wide text-lg md:text-xl">
                  {steps[2]?.title}
                </p>
                <p className="mt-4 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-4xl">
                  {steps[2]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-6xl md:text-7xl font-extrabold bg-gradient-to-br from-blue-400 via-blue-200 to-blue-100 text-transparent bg-clip-text select-none"
                style={{
                  WebkitTextStroke: "3px rgba(38,102,254,0.07)",
                  letterSpacing: "-0.03em",
                }}
              >
                3
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated CTA button */}
        <div className="mt-14 md:mt-16 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 12px 32px rgba(38,102,254,0.19)", filter: "brightness(1.05)" }}
            whileTap={{ scale: 1.01 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-lg shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/80"
            aria-label="Start processing today"
          >
           Start Processing Today
          </motion.button>
        </div>
      </div>
    </section>
  );
}
