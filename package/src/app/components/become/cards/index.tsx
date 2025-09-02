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

import Intro from "@/app/components/become/intro";

// import GameBanner from '../components/GameBanner';
// import SovSlider from '../components/SovSlider';
// import Remedy from '../assets/Remedy_Result_3.webp';
// import MP from '../assets/PMP2.webp';

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
            Sovereignty Mastery
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
              className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 rounded-2xl p-0 w-full max-w-md shadow-xl border border-blue-200 dark:border-blue-700/50 relative overflow-hidden group"
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
                className="w-full h-52 overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/images/courses/become/Remedy_Result_3.webp"
                  alt="Status Correction Illustration"
                  className="w-full h-full object-cover object-center group-hover:brightness-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
              </motion.div>

              <div className="p-8 relative">
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
                      <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 m-0">Become Private</h4>
                      <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">Status Correction Masterclass</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left">
                    Reclaim your legal identity and exit the public system through proper status correction.
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
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl p-0 w-full max-w-md shadow-xl border border-indigo-200 dark:border-indigo-700/50 relative overflow-hidden group"
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
                className="w-full h-52 overflow-hidden relative"
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

              <div className="p-8 relative">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-700 clip-path-polygon opacity-10 dark:opacity-15"></div>
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
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left">
                    Master the principles of sovereignty and how to rebut legal presumptions effectively.
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
            Sovereign Status
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

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg mt-6 text-lg transition-all duration-300"
        >
          Start Your Journey Today <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </motion.button>
      </div>

      
      <Intro />
      {/* Game Banner Section */}
      {/* <SovSlider />
      <GameBanner /> */}

      {/* What You Can Do Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24 px-5 py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-purple-200/20 dark:bg-purple-900/15 blur-2xl"></div>
        
        <div className="text-center mb-16 relative z-10">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-white"
          >
            What You'll Achieve
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-5xl md:text-6xl mt-2">
              After This Course
            </span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Transform theoretical knowledge into powerful real-world applications
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
          {[
            {
              title: "Sovereignty Consulting",
              description: "Offer professional status correction and sovereignty consulting services",
              icon: "📋",
              color: "#4f46e5",
              gradient: "from-indigo-500 to-indigo-600"
            },
            {
              title: "Education Business",
              description: "Launch a private education, coaching, or legal literacy business",
              icon: "🎓",
              color: "#7c3aed",
              gradient: "from-purple-500 to-purple-600"
            },
            {
              title: "Trust Services",
              description: "Create your own trust-based services or business framework",
              icon: "🤝",
              color: "#059669",
              gradient: "from-emerald-500 to-emerald-600"
            },
            {
              title: "Asset Reclamation",
              description: "Start laying the legal foundation to discharge debt and reclaim assets",
              icon: "🏦",
              color: "#ea580c",
              gradient: "from-orange-500 to-orange-600"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 60, opacity: 0, rotate: 2 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              viewport={{ once: true, margin: "0px" }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-all duration-300 h-full flex flex-col">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>
                
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-bl-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: item.color }}></div>
                
                {/* Icon container */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-2 relative overflow-hidden">
                    {/* Icon background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 rounded-xl`}></div>
                    {/* Icon */}
                    <span className="relative z-10 text-3xl">{item.icon}</span>
                  </div>
                  {/* Animated underline */}
                  <div className={`w-12 h-1 bg-gradient-to-r ${item.gradient} rounded-full mt-2 group-hover:w-16 transition-all duration-300`}></div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                
                {/* Action indicator */}
                <div className="flex items-center text-sm font-medium" style={{ color: item.color }}>
                  <span>Learn how</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              
              {/* Floating effect background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300 -z-10 translate-y-4 group-hover:translate-y-6`}></div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg text-lg group"
          >
            Start Your Transformation
            <svg className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </motion.button>
          
          {/* Supporting text */}
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg">
            Join 2,500+ students who have transformed their lives
          </p>
        </motion.div>
      </motion.div>

      {/* Enrollment CTA Section */}
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default BecomePrivateCourse;