"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  FaBalanceScale,
  FaGavel,
  FaUserLock,
  FaFileContract,
  FaShieldAlt,
} from "react-icons/fa";
import Banner from "../assets/BPSOV_Banner.webp";


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Reusable Card Component
interface CardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
  features: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  theme: 'blue' | 'indigo';
  animationDelay?: number;
}

const CourseCard: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  icon,
  features,
  theme,
  animationDelay = 0
}) => {
  const themeClasses = {
    blue: {
      container: "bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/30 dark:to-sky-900/30 border-blue-200 dark:border-blue-700/50",
      iconBg: "bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600",
      titleColor: "text-blue-700 dark:text-blue-300",
      overlay: "from-blue-900/20"
    },
    indigo: {
      container: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200 dark:border-indigo-700/50",
      iconBg: "bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600",
      titleColor: "text-indigo-700 dark:text-indigo-300",
      overlay: "from-indigo-900/20"
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <motion.div
      className={`${currentTheme.container} rounded-2xl p-0 w-full max-w-sm shadow-xl border relative overflow-hidden group flex flex-col`}
      initial={{ opacity: 0, x: animationDelay > 0 ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: animationDelay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image container */}
      <motion.div
        className="w-full h-40 overflow-hidden relative flex-shrink-0"
        transition={{ duration: 0.2 }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center transition-all duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${currentTheme.overlay} to-transparent`}></div>
      </motion.div>

      {/* Content */}
      <div className="p-6 relative flex-1 flex flex-col">
        <div className="flex flex-col gap-5 flex-1">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${currentTheme.iconBg} flex items-center justify-center flex-shrink-0 shadow-md`}>
              {icon}
            </div>
            <div className="text-left">
              <h4 className={`text-lg font-bold ${currentTheme.titleColor} m-0`}>
                {title}
              </h4>
              <p className="m-0 text-slate-600 dark:text-slate-400 text-sm">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Features List */}
          <ul className="text-slate-700 dark:text-slate-300 leading-relaxed m-0 text-left space-y-2 flex-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                  {feature.icon}
                </div>
                <span className="text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const PrivateBusinessCredit: React.FC = () => {
  const colors = {
    primary: "#0369a1",
    primaryLight: "#e0f2fe",
    secondary: "#0ea5e9",
    dark: "#0c4a6e",
    light: "#ffffff",
    background: "#f8fafc",
    text: "#334155",
    accent: "#38bdf8",
    mutedText: "#64748b",
    success: "#10b981",
    gradient: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)",
    gradientHover: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)",
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  const hexToRgba = (hex: string, alpha: number = 1): string => {
    hex = hex.replace("#", "");

    const r = parseInt(
      hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2),
      16
    );
    const g = parseInt(
      hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4),
      16
    );
    const b = parseInt(
      hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6),
      16
    );

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  // Card data
  const cardsData = [
    {
      title: "Business Trust",
      subtitle: "Form and Operate UBTs",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883852/creditor-website-assets/images/projects/projectlist/bt.webp",
      imageAlt: "Business Trust Illustration",
      theme: "blue" as const,
      animationDelay: 0,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          text: "Learn how to form and operate Unincorporated Business Trusts (UBTs)"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
            </svg>
          ),
          text: "Protect assets from lawsuits, taxes, and creditors"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          ),
          text: "Separate control from ownership for maximum privacy and protection"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
          text: "Build a structure that can own businesses, property, and intellectual assets"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          text: "Use trust banking and EIN strategies to operate privately in commerce"
        }
      ]
    },
    {
      title: "Private Membership Association",
      subtitle: "PMA Formation & Operation",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883859/creditor-website-assets/images/projects/projectlist/pma.webp",
      imageAlt: "Private Membership Association Illustration",
      theme: "indigo" as const,
      animationDelay: 0.05,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
          <path d="M16 3.13a4 4 0 010 7.75"></path>
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          ),
          text: "Discover how PMAs lawfully function outside public jurisdiction"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          text: "Form private associations for health, education, or business ventures"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          text: "Contract privately with members using constitutional protections"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          text: "Shield your operations from licensing, regulation, and interference"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ),
          text: "Create a sustainable private community built on trust and consent"
        }
      ]
    },
    {
      title: "Real Estate & Legacy Planning",
      subtitle: "Property Trusts & Estate",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883860/creditor-website-assets/images/projects/projectlist/re.webp",
      imageAlt: "Real Estate and Legacy Planning Illustration",
      theme: "blue" as const,
      animationDelay: 0.1,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          text: "Learn to title property into a trust for asset protection and privacy"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          text: "Avoid probate, liens, and property tax exposure through trust strategies"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),
          text: "Use private contracts to buy, sell, or lease real estate"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          text: "Structure holdings for generational wealth and estate continuity"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          ),
          text: "Integrate real estate into your overall private trust portfolio"
        }
      ]
    }
  ];

  return (
    <div className="font-sans bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-5">
      {/* Title Section */}
      <div className="text-center px-5 max-w-7xl mx-auto mb-10 relative">
        {/* Courses Section with Creative Layout */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="my-10 relative"
        >

          {/* Section header (matched style from Become section) */}
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 relative text-slate-800 dark:text-slate-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <span className="text-slate-800 dark:text-slate-100">Master the </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Private Sector
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Build trusts, form private associations, and protect your wealth through real estate and legacy planning strategies.
          </motion.p>

          {/* Courses container */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-5 relative z-10">
            {/* Render cards using the reusable component */}
            {cardsData.map((card, index) => (
              <React.Fragment key={index}>
                <CourseCard {...card} />
                {index < cardsData.length - 1 && (
                  <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 flex items-center justify-center relative flex-shrink-0 my-6 lg:my-auto shadow-lg self-center"
                    initial={{ scale: 0, rotate: 180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1 + (index * 0.05),
                    }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="absolute w-7 h-1 bg-white rounded"></div>
                    <div className="absolute w-1 h-7 bg-white rounded"></div>
                    <div className="absolute w-full h-full rounded-full border-2 border-blue-500 border-dashed opacity-30 animate-spin-slow"></div>
                    <span className="sr-only">Plus</span>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom mention */}
          <motion.p
            className="text-center mt-8 text-xl text-slate-700 dark:text-slate-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Build Wealth, Freedom, and Sovereignty on Your Own Terms
          </motion.p>
        </motion.section>

        <a href="/signup">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg text-lg transition-all duration-300"
          >
            Start Today <svg className="inline-block ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </motion.button>
        </a>
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
          Join 1,200+ students who've transformed their lawful standing. Enrollment closes soon.
        </motion.p>
      </motion.div> */}
    </div>
  );
};

export default PrivateBusinessCredit;
