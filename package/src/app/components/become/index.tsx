"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion";

// Image imports (adjust depending on your bundler/Next.js setup)
import MP from "../assets/PMP2.webp";

// Variants with type-safe transition
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as Transition["ease"], // ✅ cast for TS
    },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as Transition["ease"], // ✅ cast for TS
    },
  },
};

const BecomePrivateIntro: React.FC = () => {
  // Cast if your bundler returns StaticImageData

  return (
    <div className="font-inter bg-slate-50 text-slate-800 p-6">
      {/* --- Title + Intro Section --- */}
      <div className="max-w-6xl mx-auto text-center mb-16 px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sky-700 mb-4"
        >
          Become Private &amp; SOV 101
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base md:text-lg text-slate-700 max-w-2xl mx-auto"
        >
          Reclaim Your Legal Identity and Exit the Public System
        </motion.p>

        {/* Courses / Intro creative layout */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mt-12 relative"
        >
          {/* decorative radial */}
          <div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full blur-3xl opacity-80 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(224,242,254,1) 0%, rgba(255,255,255,0) 70%)",
            }}
          />

          <motion.h3
            variants={fadeIn}
            className="text-2xl md:text-4xl font-semibold mb-12 text-center"
          >
            Your Path to{" "}
            <span className="text-sky-700">Sovereignty Mastery</span>
          </motion.h3>

          <div className="flex flex-wrap items-center justify-center gap-10 z-10">
            {/* Course Card - Become Private */}
            <motion.div
              whileHover={{ y: -8 }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 w-[320px] overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/courses/become/Remedy_Result_3.webp"
                  alt="Status Correction"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-sky-600 to-sky-400 text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      <path d="M12 7v6l3 3" />
                    </svg>
                  </div>

                  <div className="text-left">
                    <h4 className="text-xl font-bold text-sky-700">
                      Become Private
                    </h4>
                    <p className="text-sm text-slate-500">
                      Status Correction Masterclass
                    </p>
                  </div>
                </div>

                <p className="text-slate-600">
                  Reclaim your legal identity and exit the public system through
                  proper status correction.
                </p>
              </div>
            </motion.div>

            {/* Plus connector */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: false, amount: 0.3 }}
              className="w-16 h-16 rounded-full bg-sky-600 flex items-center justify-center relative flex-shrink-0"
            >
              <span className="text-white text-2xl font-bold">+</span>
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-sky-600 opacity-30 animate-spin" />
            </motion.div>

            {/* Course Card - Sovereignty 101 */}
            <motion.div
              whileHover={{ y: -8 }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 w-[320px] overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/courses/become/PMP2.webp"
                  alt="Sovereignty Foundations"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-sky-400 to-sky-600 text-white">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>

                  <div className="text-left">
                    <h4 className="text-xl font-bold text-sky-600">
                      Sovereignty 101
                    </h4>
                    <p className="text-sm text-slate-500">
                      Sovereignty Foundations
                    </p>
                  </div>
                </div>

                <p className="text-slate-600">
                  Master the principles of sovereignty and how to rebut legal
                  presumptions effectively.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom mention + CTA */}
          <motion.p
            className="text-center mt-12 text-lg text-slate-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            Plus learn to establish your{" "}
            <strong className="text-sky-700 font-semibold relative">
              Sovereign Status
            </strong>
          </motion.p>

          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-full px-8 py-3 text-sm font-semibold shadow-lg"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.section>
      </div>

      {/* --- Course Overview Section --- */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg mb-20"
      >
        <div className="relative overflow-hidden rounded-lg flex flex-col md:flex-row gap-8 items-center">
          {/* Video Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex-1 min-w-[260px] max-w-[800px]"
          >
            <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 cursor-pointer transition-all">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5V19L19 12L8 5Z" fill="white" />
                </svg>
              </div>

              <p className="mt-6 text-white font-medium">Preview this course</p>
              <p className="text-sm text-white/80">2:34 min introduction</p>
            </div>
          </motion.div>

          {/* Course Description */}
          <div className="flex-1 min-w-[260px] p-2 md:p-6">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold text-sky-700 mb-4"
            >
              Course Overview
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-slate-700 mb-6 leading-relaxed"
            >
              Discover how the public system views you as a corporate fiction
              and learn how to correct your status. This foundational course
              equips you with the knowledge and legal framework to reclaim your
              identity and start living in the private.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {[
                { icon: "📜", text: "Legal Status Correction" },
                { icon: "⚖️", text: "Sovereignty Framework" },
                { icon: "🔐", text: "Private Jurisdiction" },
                { icon: "🛡️", text: "Asset Protection" },
              ].map((item, index) => (
                <motion.div
                  whileHover={{ y: -3 }}
                  key={index}
                  className="bg-white/60 border border-sky-100 rounded px-4 py-2 flex items-center gap-3 backdrop-blur-sm"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-sky-700">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BecomePrivateIntro;
