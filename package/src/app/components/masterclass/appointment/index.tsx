"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-[60vh] flex items-center justify-center text-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/masterclass/consult.jpg')", // Replace with your Creditor Academy image
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-3xl mx-auto px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="uppercase tracking-widest text-blue-400 font-bold mb-4 text-lg md:text-xl lg:text-2xl"
        >
          Creditor Academy
        </motion.p>

        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          Master Debt Resolution & Credit Repair
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="italic text-lg text-gray-200 mb-3"
        >
          “Take control of your financial future with expert guidance.”
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-300 mb-8"
        >
          Gain exclusive access to strategies, templates, and insights trusted by professionals worldwide.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#enroll"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg transition-transform duration-300 hover:shadow-xl"
        >
          Enroll Now <FaArrowRight />
        </motion.a>
      </motion.div>
    </section>
  );
}
