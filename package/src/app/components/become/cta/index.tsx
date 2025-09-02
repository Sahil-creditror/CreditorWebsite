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
        className="text-center my-20 px-5"
      >
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
                className="bg-gradient-to-br from-slate-800 to-blue-700 text-white py-5 px-14 text-xl font-semibold border-none rounded-xl cursor-pointer shadow-xl relative overflow-hidden z-10 inline-flex items-center gap-3"
              >
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-radial-gradient opacity-0 transition-opacity duration-300"></div>
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
          className="mt-6 text-slate-500 text-sm max-w-xl mx-auto"
        >
          Join 1,200+ students who've transformed their legal standing.
          Enrollment closes soon.
        </motion.p>
      </motion.div>
    </>
  );
}
