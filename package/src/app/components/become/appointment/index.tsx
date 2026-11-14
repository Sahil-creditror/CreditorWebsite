"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] flex items-center justify-center text-center bg-fixed bg-cover bg-center py-8 sm:py-12 md:py-16 lg:py-20"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883714/creditor-website-assets/images/masterclass/consult.jpg')", // Replace with your Creditor Academy image
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

        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4"
        >
          Take Control of Your Legal Standing & Identity
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="italic text-base sm:text-lg text-gray-200 mb-3"
        >
          "Educational Frameworks for Status & Privacy."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8"
        >
          Go step-by-step through lawful declarations, recorded notices, and private jurisdictional principles with practical educational templates.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="https://lmsathena.com/signup?course=become-private"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm sm:text-base font-semibold shadow-lg transition-transform duration-300 hover:shadow-xl"
        >
          Enroll in Become Private <FaArrowRight />
        </motion.a>
      </motion.div>
    </section>
  );
}
