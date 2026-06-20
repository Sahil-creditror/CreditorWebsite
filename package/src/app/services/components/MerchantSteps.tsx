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
    title: "STEP 1",
    description:
      "Complete a secure pre‑application — takes less than 5 minutes.",
  },
  {
    title: "STEP 2",
    description:
      "Get underwritten by a private‑friendly processor — usually within 48 hours.",
  },
  {
    title: "STEP 3",
    description:
      "Begin processing payments through your Private Trust, Association, or any business structure.",
  },
];

export default function MerchantSteps({
  heading = "Get Started in 3 Private Steps",
  steps = defaultSteps,
}: MerchantStepsProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    hover: {
      y: -4,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 0.5, y: 0, transition: { duration: 0.5, delay: 0.1 } },
  };

  return (
    <section className="relative py-16 md:py-20 bg-lightgray/40 dark:bg-secondary/10 overflow-hidden">
      {/* Ambient motion accents */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.25, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-16 -left-28 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-300/10"
      />

      <div className="container relative">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-2xl md:text-4xl font-extrabold text-primary mb-10 md:mb-12"
        >
          {heading}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Step 1 */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative rounded-2xl bg-white dark:bg-secondary/20 border border-secondary/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:via-primary/5" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[0]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-3xl">
                  {steps[0]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-5xl md:text-6xl font-extrabold text-black/10 dark:text-white/10 select-none"
              >
                1
              </motion.span>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative rounded-2xl bg-blue-50/80 dark:bg-blue-900/40 border border-blue-200/60 dark:border-blue-700/40 shadow-[0_10px_30px_rgba(30,64,175,0.08)] p-6 md:p-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-200/0 via-blue-200/0 to-blue-200/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:via-blue-200/10 dark:group-hover:via-blue-300/10" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[1]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/85 text-base md:text-lg max-w-3xl">
                  {steps[1]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-5xl md:text-6xl font-extrabold text-blue-300/50 dark:text-blue-200/20 select-none"
              >
                2
              </motion.span>
            </div>
          </motion.div>

          {/* Step 3 spans full width */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group relative rounded-2xl bg-white dark:bg-secondary/20 border border-secondary/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 lg:col-span-2"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-primary/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:via-primary/5" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[2]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-4xl">
                  {steps[2]?.description}
                </p>
              </div>
              <motion.span
                variants={numberVariants}
                className="text-5xl md:text-6xl font-extrabold text-black/10 dark:text-white/10 select-none"
              >
                3
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


