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
      title: "I Want Remedy Now",
      subtitle: "Personal Credit Repair",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883405/creditor-website-assets/images/courses/become/iwrn.webp",
      imageAlt: "Status Correction Illustration",
      theme: "blue" as const,
      animationDelay: 0,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          <path d="M12 7v6l3 3"></path>
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ),
          text: "Remove Negative Accounts & Collections"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: "Eliminate Late Payments & Charge-Offs"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5-2.586V6a2 2 0 00-2-2h-3.586a2 2 0 01-1.414-.586l-1.414-1.414A2 2 0 0010.586 2H7a2 2 0 00-2 2v1.414A2 2 0 014.586 6L3.172 7.414A2 2 0 002 8.828V12a2 2 0 002 2h1.172a2 2 0 011.414.586l1.414 1.414A2 2 0 008.828 18H12a2 2 0 002-2v-1.172a2 2 0 01.586-1.414l1.414-1.414A2 2 0 0018 12h1.172a2 2 0 001.414-.586l1.414-1.414A2 2 0 0022 8.828V8a2 2 0 00-2-2h-1z" />
            </svg>
          ),
          text: "Dispute Inaccurate Credit Report Data"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          ),
          text: "Boost FICO Scores Fast"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          ),
          text: "Qualify for High-Limit Credit Cards"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
          ),
          text: "Restore Financial Freedom & Confidence"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a5 5 0 11-9.9 1M10 14l2 2m-2-2l-2 2m2-2l2-2" />
            </svg>
          ),
          text: "Unlock Better Loan & Lease Terms"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
            </svg>
          ),
          text: "Protect Identity & Credit Profile"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: "Rebuild Strong Payment History"
        }
      ]
    },
    {
      title: "Private Merchant Processing",
      subtitle: "Foundations Mastery",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883429/creditor-website-assets/images/courses/become/pmp.webp",
      imageAlt: "Sovereignty Foundations Illustration",
      theme: "indigo" as const,
      animationDelay: 0.05,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          ),
          text: "Lower Transaction Fees"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          text: "Faster Funding Times"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
          text: "No Hidden Costs"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          text: "Dedicated Account Manager"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          text: "Seamless Equipment Integration"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          text: "Real-Time Reporting Dashboard"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />
            </svg>
          ),
          text: "Chargeback Protection Tools"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          text: "Customizable Payment Solutions"
        }
      ]
    },
    {
      title: "Private Business Credit",
      subtitle: "Foundations Mastery",
      imageSrc: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883427/creditor-website-assets/images/courses/become/pbccard.webp",
      imageAlt: "Sovereignty Foundations Illustration",
      theme: "blue" as const,
      animationDelay: 0.1,
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="white" strokeWidth="2" />
          <path d="M8 9h8M8 13h5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="18" cy="17" r="1.5" stroke="white" strokeWidth="2" />
        </svg>
      ),
      features: [
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          ),
          text: "Earn Cash-Back on Every Purchase"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          ),
          text: "Travel Rewards for Flights & Hotels"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          text: "Airport Lounge Access"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          ),
          text: "Exclusive Hotel Upgrades"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          ),
          text: "0% Intro APR Offers"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          text: "Get Approved for Up to $200K"
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm0 8l9 5-9 5-9-5 9-5z" />
            </svg>
          ),
          text: "Credit Card Stacking Strategies"
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
            <span className="text-slate-800 dark:text-slate-100">Your Path to </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Financial Freedom
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
            Learn to repair your credit, process payments privately, and build 200k + in business credit with clarity and confidence.
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
            Learn to establish your Financial Status
          </motion.p>
        </motion.section>

        <a href="/tncmasterclass">
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
