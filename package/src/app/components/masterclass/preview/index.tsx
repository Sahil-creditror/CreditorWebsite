'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FaArrowRight, FaFileDownload, FaLock } from 'react-icons/fa';

type Props = {
  container?: string;
  sectionSpacing?: string;
  primaryGradient?: string;
};

export default function HeroSection({
  container = 'container mx-auto px-4',
  sectionSpacing = 'py-12',
  primaryGradient = 'from-[#60A5FA] via-[#3B82F6] to-[#1E3A8A]'
}: Props) {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const riseAndFade: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: 'tween' } }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, type: 'tween' } }
  };

  const tiltOnHover: Variants = {
    rest: { rotateX: 0, rotateY: 0, scale: 1 },
    hover: { rotateX: 2, rotateY: -2, scale: 1.01, transition: { type: 'spring', stiffness: 250, damping: 18 } }
  };

  const arrowSlide: Variants = {
    rest: { x: 0 },
    hover: { x: 6, transition: { type: 'tween', duration: 0.2 } }
  };

  return (
    <>
      {/* HERO */}
      <section className={`${container} ${sectionSpacing} relative overflow-hidden bg-white dark:bg-[#151922]`}>
        {/* Background Accents */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.25), transparent)' }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(6,182,212,0.22), transparent)' }}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center my-15"
        >
          
          {/* VIDEO (Left) */}
          <motion.div
            id="video-section"
            variants={fadeIn}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg bg-slate-50 dark:bg-slate-800 will-change-transform"
          >
            <motion.div
              variants={tiltOnHover}
              className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                className="w-full h-full"
                src="https://drive.google.com/file/d/1KKlV8_rSO7eW0oMmPRUjc6tuf-X4bUnL/preview"
                title="Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-400/0 via-sky-400/0 to-indigo-500/0 group-hover:from-sky-400/15 group-hover:via-sky-400/10 group-hover:to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-[opacity,background] duration-500" />
          </motion.div>

          {/* Content (Right) */}
          <motion.div variants={riseAndFade} whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <div className="max-w-2xl">
              {/* Badge */}
              <motion.div
                variants={riseAndFade}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 block" />
                Exclusive • Limited Seats
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={riseAndFade}
                className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-extrabold mb-6 text-slate-900 dark:text-white"
              >
                Build your <span className={`bg-clip-text text-transparent bg-gradient-to-r ${primaryGradient}`}>Private Business</span> Empire — modern, compliant, and sovereign.
              </motion.h1>

              {/* Subtext */}
              <motion.p variants={riseAndFade} className="text-slate-700 dark:text-slate-300 mb-6">
                A refined three-phase system for founders who want legal protection, fundable credit, and private payment flows. Templates, walkthroughs, and proven playbooks included.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={riseAndFade} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/tncmasterclass"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A] text-white font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 dark:focus:ring-sky-600"
                >
                  Reserve Seat
                  <motion.span variants={arrowSlide} initial="rest" whileHover="hover" className="inline-flex">
                    <FaArrowRight />
                  </motion.span>
                </motion.a>
              </motion.div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <motion.div
                  variants={riseAndFade}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.995 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    <FaFileDownload />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Templates + Checklists</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Contracts, trust docs, and vendor lists</div>
                  </div>
                </motion.div>

                <motion.div
                  variants={riseAndFade}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.995 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    <FaLock />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Private Payments</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Gateways, flow design, fraud avoidance</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </>
  );
}
