"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaBalanceScale,
  FaGavel,
  FaUserLock,
  FaFileContract,
  FaShieldAlt
} from 'react-icons/fa';
import Banner from '../assets/BPSOV_Banner.webp';



// import GameBanner from '../components/GameBanner';
// import SovSlider from '../components/SovSlider';
// import Remedy from '../assets/Remedy_Result_3.webp';
// import MP from '../assets/PMP2.webp';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const PrivateBusinessCredit: React.FC = () => {
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
    <div className="font-sans bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-5">

      {/* Title Section */}
      <div className="text-center px-5 max-w-7xl mx-auto mb-20 relative">

        {/* Courses Section with Creative Layout */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="my-10 relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-36 h-36 rounded-full bg-blue-100 bg-opacity-70 blur-xl z-0 dark:bg-blue-900 dark:bg-opacity-30"></div>
          <div className="absolute -bottom-20 right-20 w-24 h-24 rounded-full bg-indigo-100 bg-opacity-50 blur-lg z-0 dark:bg-indigo-900 dark:bg-opacity-20"></div>
          
          {/* Section header */}
          <motion.h3 
            className="text-center text-3xl md:text-5xl mb-16 relative text-slate-800 dark:text-slate-100 font-bold"
            variants={fadeIn}
          >
            Your Path to <span className="text-blue-700 dark:text-blue-400 relative inline-block">
            Financial Freedom
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
            />
            </span>
          </motion.h3>

          {/* Courses container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-5 relative z-10">
            {/* "Become Private" Course Card - Blue Theme */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-2xl p-0 w-full max-w-sm shadow-xl border border-blue-200 dark:border-blue-700/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Premium Course Tag */}
              <div className="absolute top-5 left-5 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold z-10 shadow-lg">
                Foundation Course
              </div>

              {/* Image container with hover effect */}
              <motion.div 
                className="w-full h-40 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/images/courses/become/remedy.webp"
                  alt="Status Correction Illustration"
                  className="w-full h-full object-cover object-center group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </motion.div>

              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 clip-path-polygon opacity-10 dark:opacity-15"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        <path d="M12 7v6l3 3"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300 m-0">I Want Remedy Now</h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Status Correction Masterclass</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left">
                    Fix your personal credit with our proven system. Remove negative items, boost your score, and gain financial control.
                  </p>
                  <div className="mt-4">
                    <button className="w-full bg-blue-100 dark:bg-blue-800/40 hover:bg-blue-200 dark:hover:bg-blue-700/60 text-blue-700 dark:text-blue-300 font-medium py-3 rounded-lg transition-colors">
                      Explore Course
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plus sign connector */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center relative flex-shrink-0 my-6 lg:my-0 shadow-lg"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="absolute w-7 h-1 bg-white rounded"></div>
              <div className="absolute w-1 h-7 bg-white rounded"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-blue-500 border-dashed opacity-30 animate-spin-slow"></div>
              <span className="sr-only">Plus</span>
            </motion.div>

            {/* New SOV 101 Course Card - Indigo Theme */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-0 w-full max-w-sm shadow-xl border border-indigo-200 dark:border-indigo-700/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Premium Course Tag */}
              <div className="absolute top-5 left-5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold z-10 shadow-lg">
                Advanced Course
              </div>

              {/* Image container with hover effect */}
              <motion.div 
                className="w-full h-40 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/images/courses/become/PMP2.webp"
                  alt="Sovereignty Foundations Illustration"
                  className="w-full h-full object-cover object-center group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
              </motion.div>

              <div className="p-6 relative">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-700 clip-path-polygon opacity-10 dark:opacity-15"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 m-0">Private Merchant Processing </h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Foundations Mastery</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left">
                    Process payments without banks. No KYC, no shutdowns. Take full control of your financial transactions.
                  </p>
                  <div className="mt-4">
                    <button className="w-full bg-indigo-100 dark:bg-indigo-800/40 hover:bg-indigo-200 dark:hover:bg-indigo-700/60 text-indigo-700 dark:text-indigo-300 font-medium py-3 rounded-lg transition-colors">
                      Explore Course
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Plus sign connector for the 3rd card */}
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center relative flex-shrink-0 my-6 lg:my-0 shadow-lg"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }} // Increased delay
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="absolute w-7 h-1 bg-white rounded"></div>
              <div className="absolute w-1 h-7 bg-white rounded"></div>
              <div className="absolute w-full h-full rounded-full border-2 border-blue-500 border-dashed opacity-30 animate-spin-slow"></div>
              <span className="sr-only">Plus</span>
            </motion.div>

            {/* "Private Business Credit" Course Card - Green Theme */}
            <motion.div
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-2xl p-0 w-full max-w-sm shadow-xl border border-blue-200 dark:border-blue-700/50 relative overflow-hidden group"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Premium Course Tag */}
              <div className="absolute top-5 left-5 bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold z-10 shadow-lg">
                Advanced Course
              </div>

              {/* Image container with hover effect */}
              <motion.div 
                className="w-full h-40 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/images/courses/become/PBC.webp"
                  alt="Sovereignty Foundations Illustration"
                  className="w-full h-full object-cover object-center group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent"></div>
              </motion.div>

              <div className="p-6 relative">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-700 clip-path-polygon opacity-10 dark:opacity-15"></div>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-blue-700 dark:text-blue-300 m-0">Private Business Credit </h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Foundations Mastery</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left">
                    Build business credit through UBOT Trusts and private processing and empower yourself with the financial freedom.
                  </p>
                  <div className="mt-4">
                    <button className="w-full bg-indigo-100 dark:bg-indigo-800/40 hover:bg-indigo-200 dark:hover:bg-indigo-700/60 text-indigo-700 dark:text-indigo-300 font-medium py-3 rounded-lg transition-colors">
                      Explore Course
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom mention */}
          <motion.p
            className="text-center mt-16 text-xl text-slate-700 dark:text-slate-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Plus learn to establish your <strong className="text-blue-700 dark:text-blue-400 font-semibold relative">
            Financial Status
            <motion.span 
              className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700 dark:bg-blue-400 rounded-full"
              initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            />
            </strong>
          </motion.p>
        </motion.section>

        {/* <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg mt-6 text-lg transition-all duration-300"
        >
          Start Your Journey Today <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.button> */}
      </div>

      
      
      {/* Game Banner Section */}
      {/* <SovSlider />
      <GameBanner /> */}

      {/* What You Can Do Section */}
      

      {/* Enrollment CTA Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="text-center my-20 px-5"
      >
        <div className="relative inline-block max-w-full">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 15px 30px rgba(0,161,255,0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-slate-800 to-blue-700 text-white py-5 px-14 text-xl font-semibold border-none rounded-xl cursor-pointer shadow-xl relative overflow-hidden z-10 inline-flex items-center gap-3"
          >
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-radial-gradient opacity-0 transition-opacity duration-300"></div>
            <motion.span
              animate={{
                rotate: [0, 15, -15, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }
              }}
              className="inline-block text-2xl"
            >
            </motion.span>
            Enroll in Course
          </motion.button>
          <div className="absolute -bottom-3 left-10 right-10 h-5 bg-radial-gradient opacity-40 blur-sm z-0 rounded-full"></div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-slate-500 text-sm max-w-xl mx-auto"
        >
          Join 1,200+ students who've transformed their legal standing. Enrollment closes soon.
        </motion.p>
      </motion.div> */}
    </div>
  );
};

export default PrivateBusinessCredit;