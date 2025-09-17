'use client';

import React from 'react';
import { FaArrowRight, FaFileDownload, FaLock, FaShieldAlt, FaCreditCard, FaBolt } from 'react-icons/fa';

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
  return (
    <>
      {/* HERO */}
      <section className={`w-full ${sectionSpacing} relative overflow-hidden bg-white dark:bg-[#151922]`}>
        {/* Background Accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.25), transparent)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(6,182,212,0.22), transparent)' }}
        />

        <div
          className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center my-15"
        >
          
          {/* Content (Left) */}
          <div>
            <div className="max-w-2xl">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 block" />
                Exclusive • Limited Seats
              </div>

              {/* Heading */}
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-extrabold mb-6 text-slate-900 dark:text-white"
              >
                Build your <span className={`bg-clip-text text-transparent bg-gradient-to-r ${primaryGradient}`}>Private Business</span> Empire — modern, compliant, and sovereign.
              </h1>

              {/* Subtext */}
              <p className="text-slate-700 dark:text-slate-300 mb-6">
                A refined three-phase system for founders who want legal protection, fundable credit, and private payment flows. Templates, walkthroughs, and proven playbooks included.
              </p>

              {/* CTAs */}
              {/* <motion.div variants={riseAndFade} className="flex flex-col sm:flex-row gap-4">
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
              </motion.div> */}

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    <FaFileDownload />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Templates + Checklists</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Contracts and trust docs</div>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                    <FaLock />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Private Community</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Gateways, flow design, fraud avoidance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VIDEO (Right) */}
          <div>
            <div
              className="w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg"
            >
              <iframe
                className="w-full h-full"
                src="https://drive.google.com/file/d/1ATSSVZJ9zTAXFhSgQfFN5AzJud_STVXo/preview"
                title="Intro Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Three-step tiles (just below video) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-300 to-blue-500 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                    <FaShieldAlt className="text-white" />
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90">Step 1</div>
                </div>
                <div className="mt-2 text-lg font-bold">Unincorporated Business Trust</div>
                {/* <div className="mt-1 text-sm opacity-95">Foundational legal structure.</div> */}
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                    <FaCreditCard className="text-white" />
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90">Step 2</div>
                </div>
                <div className="mt-2 text-lg font-bold">Private Merchant Account</div>
                {/* <div className="mt-1 text-sm opacity-95">Private Merchant Account</div> */}
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/15">
                    <FaBolt className="text-white" />
                  </span>
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-90">Step 3</div>
                </div>
                <div className="mt-2 text-lg font-bold">Credit Optimization</div>
                {/* <div className="mt-1 text-sm opacity-95">Private merchant payments & onboarding.</div> */}
              </div>
            </div>
            
          </div>

        </div>
        </section>
    </>
  );
}
