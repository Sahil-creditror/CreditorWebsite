"use client";

import { motion } from "framer-motion";

export default function TransparentPricingSnapshot() {
  const rows = [
    { volume: "$1k – $10k", fees: "2.7% + $0.30", settlement: "24–48 hrs" },
    { volume: "$10k – $100k", fees: "2.3% + $0.25", settlement: "24 hrs" },
    { volume: "Enterprise / High Volume", fees: "Custom Quote", settlement: "24 hrs" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-white via-blue-100/50 to-blue-50 dark:from-[#131e38] dark:via-[#192040] dark:to-[#071023] overflow-hidden">
      {/* Ambient glows for glassmorphic effect */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.14, scale: 1.1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-blue-300/30 blur-2xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.13, scale: 1.1 }}
        viewport={{ once: true, margin: "-18%" }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl"
      />

      <div className="container relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 drop-shadow-xl"
          >
            Transparent Pricing Snapshot
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl border border-blue-200/20 dark:border-blue-900/30 bg-white/60 dark:bg-[#192040]/80 shadow-2xl backdrop-blur-lg overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-gradient-to-r from-blue-200/20 via-blue-100/30 to-white/50 dark:from-blue-900/20 dark:to-blue-900/60 text-blue-800 dark:text-blue-200 font-bold text-base md:text-lg w-full">
            <div className="px-6 py-5">Monthly Volume</div>
            <div className="px-6 py-5">Typical Fees</div>
            <div className="px-6 py-5">Settlement Time</div>
          </div>
          <div className="divide-y divide-blue-200/18 dark:divide-blue-900/18 w-full">
            {rows.map((r, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 + idx * 0.15, ease: "easeOut" }}
                className="grid grid-cols-3 text-base md:text-lg w-full"
              >
                <div className="px-6 py-4 font-bold text-blue-700 dark:text-blue-200">{r.volume}</div>
                <div className="px-6 py-4 text-blue-900/90 dark:text-blue-200/80">{r.fees}</div>
                <div className="px-6 py-4 text-blue-900/90 dark:text-blue-200/80">{r.settlement}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-5 text-center text-base md:text-lg text-blue-900/80 dark:text-blue-100/80"
        >
          Final rates depend on business type, volume, and chargeback history.
        </motion.p>

        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.07,
              boxShadow: "0 10px 24px rgba(38,102,254,0.12)",
              filter: "brightness(1.08)",
            }}
            whileTap={{ scale: 1.01 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-lg shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/80"
            aria-label="Request a custom quote"
          >
            Request a Custom Quote
          </motion.button>
        </div>
      </div>
    </section>
  );
}
