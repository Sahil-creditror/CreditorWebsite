"use client";

import Image from "next/image";
import { motion, Variants, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Apply Online",
    description:
      "A short, secure pre-application form.",
  },
  {
    id: 2,
    title: "Underwriting",
    description:
      "Your business is reviewed and approved within 24–48 hours.",
  },
  {
    id: 3,
    title: "Go Live",
    description:
      "Start accepting cards with your private merchant account, backed by 99.9% uptime infrastructure.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.42, ease: "easeOut" } },
};

const sliderImages = [
  "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883866/creditor-website-assets/images/services/credit-repair/1.webp",
  "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883867/creditor-website-assets/images/services/credit-repair/2.webp",
  "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883867/creditor-website-assets/images/services/credit-repair/3.webp",
];

export default function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % sliderImages.length);
    }, 2500);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="w-full bg-gradient-to-br from-[#eef5ff] to-[#f8fbff] dark:from-[#0b1220] dark:to-[#0e1a2b] py-12 md:py-20 relative overflow-hidden">
      {/* Professional background design elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-purple-400/8 dark:bg-purple-400/3 blur-2xl" />
        
        {/* Geometric patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-blue-200/20 dark:border-blue-700/20 rounded-lg rotate-12" />
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-cyan-300/20 dark:border-cyan-600/20 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-lg rotate-45" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[size:40px_40px]"></div>
        </div>
        
        
        {/* Thick curved lines that extend beyond edges */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
          {/* Thick curved lines that extend beyond edges */}
          <path
            d="M-200,300 Q200,250 600,280 T1400,260"
            stroke="url(#thickGradient1)"
            strokeWidth="8"
            fill="none"
            opacity="0.15"
            className="dark:opacity-08"
          />
          <path
            d="M-150,500 Q300,450 700,480 T1350,460"
            stroke="url(#thickGradient2)"
            strokeWidth="6"
            fill="none"
            opacity="0.12"
            className="dark:opacity-06"
          />
          <path
            d="M-100,600 Q400,550 800,580 T1300,560"
            stroke="url(#thickGradient3)"
            strokeWidth="10"
            fill="none"
            opacity="0.1"
            className="dark:opacity-05"
          />
          
          {/* Gradient definitions */}
          <defs>
            {/* Thick line gradients */}
            <linearGradient id="thickGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="thickGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
              <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="thickGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* LEFT - hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-md overflow-hidden shadow-2xl border-4 border-blue-200 dark:border-blue-800/50"
          >
            <div className="relative w-full h-[420px] md:h-[540px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={sliderImages[currentIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={sliderImages[currentIndex]}
                    alt="Creditor Academy Card"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT - steps and content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
            className="pl-2 md:pl-8"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-blue-900 dark:text-blue-100 mb-8"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              How It Works
            </motion.h2>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-[28px] top-6 bottom-6 w-[2px] bg-blue-300 dark:bg-blue-600 opacity-70 hidden md:block" />

              <motion.ul className="space-y-8" variants={containerVariants}>
                {steps.map((s) => (
                  <motion.li
                    key={s.id}
                    className="group relative md:flex md:items-start md:gap-6"
                    variants={itemVariants}
                  >
                    {/* circle */}
                    <div className="flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold shadow-lg bg-blue-600 dark:bg-blue-500"
                      >
                        <span className="text-lg md:text-xl">{s.id}</span>
                      </motion.div>
                    </div>

                    {/* content */}
                    <div className="mt-2 md:mt-0">
                      <motion.h3
                        className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight"
                        variants={itemVariants}
                      >
                        {s.title}
                      </motion.h3>

                      <motion.p className="mt-2 text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed" variants={itemVariants}>
                        {s.description}
                      </motion.p>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* CTA row
            <motion.div
              className="mt-10 flex gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <button
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-semibold shadow-md hover:scale-105 transform transition-transform duration-200 hover:bg-blue-700 dark:hover:bg-blue-600"
                // href="https://payments.creditoracademy.com/form/creditor-academy-paulr-referral"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                Start Processing Today
              </button>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
