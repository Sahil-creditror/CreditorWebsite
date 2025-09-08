"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EnrollmentCTA() {
  return (
    <>
      {/* Enrollment CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="relative text-center px-5 py-16 overflow-hidden bg-whitesmoke dark:bg-slate-900"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_600px_at_50%_-10%,rgba(59,130,246,0.15),transparent_60%)] dark:bg-[radial-gradient(600px_600px_at_50%_-10%,rgba(59,130,246,0.08),transparent_60%)]"></div>
        {/* Animated light-blue curved background */}
        <motion.svg
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute inset-0 w-full h-full -z-10 block dark:hidden"
          preserveAspectRatio="none"
          viewBox="0 0 2000 900"
        >
          <defs>
            <linearGradient id="ctaBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="blurSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>
          {/* back soft wash */}
          <motion.path
            d="M-400,640 C150,520 500,820 900,700 C1300,580 1700,820 2400,660"
            fill="none"
            stroke="url(#ctaBlue)"
            strokeWidth="60"
            strokeLinecap="round"
            filter="url(#blurSoft)"
            animate={{ x: [-45, 45, -45] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* middle line */}
          <motion.path
            d="M-420,540 C80,420 600,700 1020,600 C1400,510 1700,740 2420,560"
            fill="none"
            stroke="url(#ctaBlue)"
            strokeWidth="22"
            strokeLinecap="round"
            animate={{ x: [-55, 55, -55] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* front line */}
          <motion.path
            d="M-450,470 C0,360 700,520 1200,440 C1550,390 1950,520 2450,450"
            fill="none"
            stroke="url(#ctaBlue)"
            strokeWidth="12"
            strokeLinecap="round"
            animate={{ x: [-70, 70, -70] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            opacity="0.9"
          />
          {/* extra subtle lines for richness */}
          <motion.path
            d="M-430,600 C-20,520 620,760 1120,660 C1520,590 1900,760 2460,640"
            fill="none"
            stroke="url(#ctaBlue)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ x: [-60, 60, -60] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
          />
          <motion.path
            d="M-460,500 C-40,400 680,640 1280,560 C1650,510 2050,660 2480,560"
            fill="none"
            stroke="url(#ctaBlue)"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ x: [-65, 65, -65] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
        </motion.svg>
        {/* Dark mode variant */}
        <motion.svg
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute inset-0 w-full h-full -z-10 hidden dark:block"
          preserveAspectRatio="none"
          viewBox="0 0 2000 900"
        >
          <defs>
            <linearGradient id="ctaBlueDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.35" />
            </linearGradient>
            <filter id="blurSoftDark" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>
          <motion.path
            d="M-420,660 C120,540 560,840 980,720 C1380,610 1780,850 2420,690"
            fill="none"
            stroke="url(#ctaBlueDark)"
            strokeWidth="64"
            strokeLinecap="round"
            filter="url(#blurSoftDark)"
            animate={{ x: [-55, 55, -55] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-440,560 C40,440 640,740 1080,620 C1460,530 1760,760 2440,580"
            fill="none"
            stroke="url(#ctaBlueDark)"
            strokeWidth="24"
            strokeLinecap="round"
            animate={{ x: [-70, 70, -70] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.path
            d="M-460,490 C-20,390 740,540 1260,470 C1600,420 2020,560 2460,480"
            fill="none"
            stroke="url(#ctaBlueDark)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.95"
            animate={{ x: [-85, 85, -85] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />
          <motion.path
            d="M-430,610 C-10,520 700,770 1200,660 C1550,590 1950,760 2480,640"
            fill="none"
            stroke="url(#ctaBlueDark)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.6"
            animate={{ x: [-75, 75, -75] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M-470,520 C-60,420 760,660 1340,580 C1700,530 2100,680 2500,580"
            fill="none"
            stroke="url(#ctaBlueDark)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.5"
            animate={{ x: [-90, 90, -90] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.05 }}
          />
        </motion.svg>
        <div className="relative max-w-3xl mx-auto">
          {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-slate-800/60 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-blue-200/60 dark:ring-slate-700">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            Questions?
          </div> */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700 dark:from-white dark:to-slate-300"
          >
            Have doubts? Let's resolve them together.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Get a friendly, no-pressure consultation with our team. Share your situation, ask anything, and walk away with clear next steps.
          </motion.p>
        </div>
        <div className="relative inline-block max-w-full mt-8">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 15px 30px rgba(0,161,255,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-base sm:text-lg font-semibold text-white cursor-pointer overflow-hidden border border-white/10 dark:border-white/10 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-300"
                aria-label="Contact Us"
              >
                <span className="absolute inset-0 -z-10 rounded-[inherit] bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-90"></span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white/95">
                  <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v7.5A2.25 2.25 0 0 1 20.25 16.5H7.06l-3.71 3.09c-.96.8-2.35.11-2.35-1.12V6.75Z"/>
                </svg>
                <span>Contact Us</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1">
                  <path fillRule="evenodd" d="M4.5 12a.75.75 0 0 1 .75-.75h11.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H5.25A.75.75 0 0 1 4.5 12Z" clipRule="evenodd"/>
                </svg>
              </motion.button>
            </Link>
          </motion.div>
          <div className="absolute -bottom-3 left-10 right-10 h-5 bg-radial-gradient opacity-40 blur-sm z-0 rounded-full"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 justify-center rounded-lg bg-white/70 dark:bg-slate-800/60 px-4 py-3 ring-1 ring-slate-200/70 dark:ring-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-blue-600">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 1 0-1.06-1.06l-4.72 4.72-1.78-1.78a.75.75 0 0 0-1.06 1.06l2.31 2.31c.293.293.767.293 1.06 0l5.25-5.25Z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Free, no-obligation assessment</span>
          </div>
          <div className="flex items-center gap-3 justify-center rounded-lg bg-white/70 dark:bg-slate-800/60 px-4 py-3 ring-1 ring-slate-200/70 dark:ring-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-blue-600">
              <path d="M12 1.5a.75.75 0 0 1 .75.75V3h2.25a.75.75 0 0 1 0 1.5H12.75V6a.75.75 0 0 1-1.5 0V4.5H9a.75.75 0 0 1 0-1.5h2.25V2.25A.75.75 0 0 1 12 1.5Zm-6 6A2.25 2.25 0 0 0 3.75 9v9A2.25 2.25 0 0 0 6 20.25h12A2.25 2.25 0 0 0 20.25 18V9A2.25 2.25 0 0 0 18 7.5H6ZM5.25 9A.75.75 0 0 1 6 8.25h12a.75.75 0 0 1 .75.75v1.5H5.25V9ZM19.5 18v-5.25H4.5V18A.75.75 0 0 0 5.25 18.75h13.5A.75.75 0 0 0 19.5 18Z"/>
            </svg>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Average response time: under 2 hours</span>
          </div>
          <div className="flex items-center gap-3 justify-center rounded-lg bg-white/70 dark:bg-slate-800/60 px-4 py-3 ring-1 ring-slate-200/70 dark:ring-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-blue-600">
              <path fillRule="evenodd" d="M4.5 5.25A2.25 2.25 0 0 1 6.75 3h10.5A2.25 2.25 0 0 1 19.5 5.25v13.5A2.25 2.25 0 0 1 17.25 21H6.75A2.25 2.25 0 0 1 4.5 18.75V5.25Zm3 2.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm-.75 4.5A.75.75 0 0 1 7.5 10.5h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 3a.75.75 0 0 0 0 1.5h5.25a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">No spam. Your details stay private</span>
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-black dark:text-slate-300 text-m max-w-xl mx-auto"
        >
          Join 1,200+ students who've transformed their legal standing. Enrollment closes soon.
        </motion.p>
      </motion.div>
    </>
  );
}
