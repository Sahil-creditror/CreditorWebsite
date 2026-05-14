"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaBalanceScale,
  FaGavel,
  FaUserLock,
  FaFileContract,
  FaShieldAlt,
  FaUserSecret,
  FaFlag,
  FaFileSignature,
  FaIdCard,
  FaHandsHelping,
  FaBookOpen,
  FaHistory,
  FaCoins,
  FaLock,
  FaUserCheck
} from 'react-icons/fa';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const BecomePrivateCourse: React.FC = () => {
  const colors = {
    primary: '#0369a1',
    primaryLight: '#e0f2fe',
    secondary: '#0ea5e9',
    dark: '#0c4a6e',
    light: '#ffffff',
    background: '#f8fafc',
    text: '#334155',
    accent: '#38bdf8',
    mutedText: '#64748b',
    success: '#10b981',
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)',
    gradientHover: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)'
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const hexToRgba = (hex: string, alpha: number = 1): string => {
    hex = hex.replace('#', '');

    const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);


  return (
    <div className="font-sans bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-5 relative overflow-hidden">


      {/* Title Section */}
      <div className="text-center px-5 max-w-7xl mx-auto relative z-10">

        {/* Courses Section with Creative Layout */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="my-10 relative"
        >
          {/* Section header */}
          <motion.div
            className="text-center mb-20 relative"
            variants={fadeIn}
          >
            {/* Decorative elements
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            /> */}

            {/* Main title */}
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <span className="text-slate-800 dark:text-slate-100">
                Your Path to{' '}
              </span>
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Sovereignty{' '}
              </span>
              <span className="text-slate-800 dark:text-slate-100">
                Mastery
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Transform your understanding of law, identity, and freedom through our comprehensive course system
            </motion.p>

            {/* Decorative dots
            <motion.div 
              className="flex justify-center items-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div> */}
          </motion.div>

          {/* Courses container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-5 relative z-10">
            {/* "Become Private" Course Card - Blue Theme */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-2xl p-0 w-full max-w-md shadow-xl border border-blue-200 dark:border-blue-700/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Premium Course Tag
              <div className="absolute top-5 left-5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold z-10 shadow-lg">
                Foundation Course
              </div> */}

              {/* Image container */}
              <div className="w-full h-60 overflow-hidden relative">
                <img
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883388/creditor-website-assets/images/courses/become/bp.webp"
                  alt="Status Correction Illustration"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </div>

              <div className="p-8 relative">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        <path d="M12 7v6l3 3"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 m-0">Become Private</h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Status Correction Masterclass</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left mb-4">
                    Learn how to step out of the public and establish your affairs in the private.
                  </p>

                  {/* Learning Points */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaUserSecret className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Correct your status and reclaim your lawful standing
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaFlag className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Establish yourself as an American National
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaFileSignature className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Complete your Secured Party Creditor process
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaIdCard className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Create your private identity and foundational documents
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaHandsHelping className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Declare your political and lawful autonomy
                      </p>
                    </div>
                  </div>

                  {/* <div className="mt-4">
                    <button className="w-full bg-blue-100 dark:bg-blue-800/40 hover:bg-blue-200 dark:hover:bg-blue-700/60 text-blue-700 dark:text-blue-300 font-medium py-3 rounded-lg transition-colors">
                      Explore Course
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>

            {/* Plus sign connector */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center relative flex-shrink-0 my-6 lg:my-0 shadow-lg"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.05 }}
              viewport={{ once: true }}
            >
              <div className="absolute w-7 h-1 bg-white rounded"></div>
              <div className="absolute w-1 h-7 bg-white rounded"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-blue-500 border-dashed opacity-30 animate-spin-slow"></div>
              <span className="sr-only">Plus</span>
            </motion.div>

            {/* New Sovereignty101 Course Card - Indigo Theme */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-0 w-full max-w-md shadow-xl border border-indigo-200 dark:border-indigo-700/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Premium Course Tag
              <div className="absolute top-5 left-5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold z-10 shadow-lg">
                Advanced Course
              </div> */}

              {/* Image container */}
              <div className="w-full h-60 overflow-hidden relative">
                <img
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883446/creditor-website-assets/images/courses/become/sovcard.webp"
                  alt="Sovereignty Foundations Illustration"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
              </div>

              <div className="p-8 relative">
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-indigo-700 dark:text-indigo-300 m-0">Sovereignty 101</h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Foundations Mastery</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left mb-4">
                    Discover how America shifted from liberty to control—and what it takes to reclaim independence once again.
                  </p>

                  {/* Learning Points */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaBookOpen className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Foundations of American sovereignty and law
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaHistory className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Evolution of lawful identity post-Civil War
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCoins className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Origins of commercial law and currency
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaLock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Public system as a managed debt trap
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaUserCheck className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed text-left">
                        Understanding your lawful private standing
                      </p>
                    </div>
                  </div>

                  {/* <div className="mt-4">
                    <button className="w-full bg-indigo-100 dark:bg-indigo-800/40 hover:bg-indigo-200 dark:hover:bg-indigo-700/60 text-indigo-700 dark:text-indigo-300 font-medium py-3 rounded-lg transition-colors">
                      Explore Course
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom mention */}
          <motion.p
            className="text-center mt-8 text-xl text-slate-700 dark:text-slate-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Learn to establish your <strong className="text-violet-700 dark:text-blue-400 font-semibold relative">
              Sovereign Status
            </strong>
          </motion.p>
        </motion.section>

        <motion.a
          href="/tncmasterclass"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 border-none rounded-full mb-8 py-4 px-10 text-white font-semibold cursor-pointer shadow-lg text-lg transition-all duration-300 relative z-10"
        >
          Start your transformation
          <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.a>
      </div>
    </div>
  );
};

export default BecomePrivateCourse;
