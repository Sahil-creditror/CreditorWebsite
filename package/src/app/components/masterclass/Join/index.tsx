"use client";

import React from "react";
import { FaLock, FaFileDownload, FaClock, FaHeart, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

// Optional props to pass your Tailwind container and spacing classes from the parent.
// Keeping structure exactly the same as requested.

type Props = {
  container?: string;
  sectionSpacing?: string;
};

export default function EnrollMasterclass({ container = "", sectionSpacing = "" }: Props) {
  return (
    // {/* ENROLL (form removed as requested) */}
    <section
      id="enroll"
      className={`${container} ${sectionSpacing} px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16
          bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 
          dark:from-[#0a0f1a] dark:via-[#101828] dark:to-[#1a2235] relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 dark:opacity-10"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 dark:opacity-10"
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 dark:opacity-10"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div 
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-700 shadow-lg relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="grid lg:grid-cols-2">
          {/* Left Content */}
          <motion.div 
            className="p-10 bg-white dark:bg-slate-900"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-lg">
              <motion.h3 
                className="text-4xl font-extrabold mb-4 text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Join the Masterclass
              </motion.h3>
              <motion.p 
                className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Secure lifetime access to recordings, templates, and private guides. Designed for real operators — <span className="font-semibold text-blue-500 dark:text-blue-400">builders, sellers, and founders</span> who want control.
              </motion.p>

              <motion.div 
                className="space-y-4 mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
              >
                {[
                  { 
                    icon: <FaLock />, 
                    title: "Lifetime Access", 
                    subtitle: "Return anytime — materials updated",
                    bgColor: "bg-gradient-to-br from-blue-50/80 to-indigo-100/60 dark:from-blue-900/20 dark:to-indigo-900/15",
                    borderColor: "border-blue-200/50 dark:border-blue-700/30",
                    iconBg: "bg-gradient-to-tr from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30",
                    iconColor: "text-blue-600 dark:text-blue-300"
                  },
                  { 
                    icon: <FaFileDownload />, 
                    title: "All Templates", 
                    subtitle: "Trusts, contracts, vendor lists",
                    bgColor: "bg-gradient-to-br from-emerald-50/80 to-teal-100/60 dark:from-emerald-900/20 dark:to-teal-900/15",
                    borderColor: "border-emerald-200/50 dark:border-emerald-700/30",
                    iconBg: "bg-gradient-to-tr from-emerald-100 to-teal-200 dark:from-emerald-900/30 dark:to-teal-900/30",
                    iconColor: "text-emerald-600 dark:text-emerald-300"
                  },
                  { 
                    icon: <FaClock />, 
                    title: "Private Payment Flows", 
                    subtitle: "Resilient, low-risk payment design",
                    bgColor: "bg-gradient-to-br from-purple-50/80 to-pink-100/60 dark:from-purple-900/20 dark:to-pink-900/15",
                    borderColor: "border-purple-200/50 dark:border-purple-700/30",
                    iconBg: "bg-gradient-to-tr from-purple-100 to-pink-200 dark:from-purple-900/30 dark:to-pink-900/30",
                    iconColor: "text-purple-600 dark:text-purple-300"
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl ${item.bgColor} border ${item.borderColor}`}
                    variants={{
                      hidden: { opacity: 0, x: -30, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        x: 0, 
                        scale: 1,
                        transition: { duration: 0.5, ease: "easeOut" }
                      },
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className={`p-3 rounded-full ${item.iconBg} ${item.iconColor}`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{item.subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 text-sm inline-flex items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaHeart className="text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="text-slate-700 dark:text-slate-400">
                  Secure enrollment. We respect your privacy and protect your data.
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right CTA */}
          <motion.div
            className="p-10 flex items-center justify-center relative"
            style={{
              backgroundImage: "url('/images/home/services/master.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Dark overlay covering the background */}
            <motion.div 
              className="absolute inset-0 bg-black/50"
              whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
              transition={{ duration: 0.3 }}
            />

            {/* Card content */}
            <motion.div 
              className="relative w-full max-w-sm p-8 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-lg bg-white/30 dark:bg-black/40 backdrop-blur-md"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.h4 
                className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Reserve your spot
              </motion.h4>
              <motion.p 
                className="text-slate-700 dark:text-slate-300 mt-2 mb-6 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                No form here — click to go to the secure checkout / scheduled page.
              </motion.p>
              <motion.a
                href="/tncmasterclass"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#1E3A8A] text-white font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(96, 165, 250, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Reserve My Spot 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
