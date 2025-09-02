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
        <div className="relative inline-block max-w-full">
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
                className="group bg-gradient-to-br from-slate-800 to-blue-700 text-white py-5 px-14 text-xl font-semibold border-none rounded-xl cursor-pointer shadow-xl relative overflow-hidden z-10 inline-flex items-center gap-3"
              >
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_45%)] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-500"></span>
                <motion.span
                  animate={{
                    rotate: [0, 15, -15, 0],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    },
                  }}
                  className="inline-block text-2xl"
                ></motion.span>
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
          <div className="absolute -bottom-3 left-10 right-10 h-5 bg-radial-gradient opacity-40 blur-sm z-0 rounded-full"></div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-slate-600 dark:text-slate-300 text-sm max-w-xl mx-auto"
        >
          Join 1,200+ students who've transformed their legal standing.
          Enrollment closes soon.
        </motion.p>
      </motion.div>
    </>
  );
}
