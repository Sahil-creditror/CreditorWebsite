"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaGavel,
  FaUserLock,
  FaFileContract,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";

type CardItem = {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  gradient: string;
  img: string;
};

export default function CourseFeatures() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const cardData: CardItem[] = [
    {
      title: "Comprehensive Curriculum",
      description:
        "In-depth modules covering all aspects of business credit building, from basics to advanced strategies.",
      icon: FaBalanceScale,
      color: "#4f46e5",
      gradient: "from-indigo-500 to-indigo-600",
      img: "/images/courses/become/curriculum.webp",
    },
    {
      title: "Expert Guidance",
      description:
        "Learn from industry professionals with years of experience in business finance and credit.",
      icon: FaGavel,
      color: "#7c3aed",
      gradient: "from-purple-500 to-purple-600",
      img: "/images/courses/become/Expert.webp",
    },
    {
      title: "Practical Tools & Resources",
      description:
        "Access templates, checklists, and actionable steps to implement your credit building plan effectively.",
      icon: FaFileContract,
      color: "#059669",
      gradient: "from-emerald-500 to-emerald-600",
      img: "/images/courses/become/finance.webp",
    },
    {
      title: "Community Support",
      description:
        "Join a thriving community of entrepreneurs for networking, support, and shared learning experiences.",
      icon: FaShieldAlt,
      color: "#ea580c",
      gradient: "from-orange-500 to-orange-600",
      img: "/images/courses/become/support.webp",
    },
  ];

  // Responsive logic (safe for SSR because it runs in useEffect)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = isMobile ? 1 : 4; // show 4 cards on desktop for narrower cards
  const totalSlides = Math.max(1, cardData.length - visibleCards + 1);

  const nextSlide = () => {
    setCurrentIndex((i) => Math.min(i + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipe = 50;

    if (distance > minSwipe) {
      nextSlide();
    } else if (distance < -minSwipe) {
      prevSlide();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // The amount to translate the track. We move by the width of one card each time.
  const translatePercent = (currentIndex * 100) / visibleCards;

  return (
    <div className="w-full py-10 px-4 bg-whitesmoke dark:bg-slate-900 font-sans">
      {/* Fade-in Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-center text-3xl md:text-5xl font-extrabold text-slate-800 dark:text-white">
            What You'll Learn
          </div>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Transform theoretical knowledge into powerful real-world applications
        </motion.p>
      </motion.div>

      {isMobile ? (
        <>
          {/* Slider (mobile only) */}
          <div
            className="relative px-4 md:px-12"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {currentIndex > 0 && (
              <button
                aria-label="Previous"
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 w-11 h-11 rounded-full shadow-md flex items-center justify-center z-10 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              >
                <FaChevronLeft />
              </button>
            )}

            {/* Track */}
            <div
              className="flex items-stretch transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {cardData.map((item, i) => (
                <div
                  key={i}
                  className="p-2 box-border flex h-[420px]"
                  style={{ flex: `0 0 ${100 / visibleCards}%` }}
                >
                  <motion.div
                    initial={{ y: 60, opacity: 0, rotate: 2 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true, margin: "0px" }}
                    className="relative w-full"
                  >
                    {/* Card - fixed size */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-all duration-300 h-full flex flex-col">
                      {/* Image section - fixed height */}
                      <div className="h-44 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Icon container - centered overlay */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-36 w-14 h-14 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          backgroundColor: item.color,
                          boxShadow: `${item.color}55 0px 6px 18px`,
                        }}
                      >
                        <item.icon className="text-white text-xl" />
                      </div>

                      {/* Content - fixed area with consistent spacing */}
                      <div className="px-4 pt-10 pb-6 text-center mt-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                          {item.description}
                        </p>

                        {/* Optional action area kept at bottom to keep height consistent */}
                        <div className="mt-4"> 
                          {/* placeholder: you can add a small CTA or tag here if needed */}
                        </div>
                      </div>

                      {/* Gradient accent */}
                      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>
                    </div>

                    {/* Floating effect background */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl opacity-20 blur-md transition-opacity duration-300 -z-10 translate-y-4`}></div>
                  </motion.div>
                </div>
              ))}
            </div>

            {currentIndex < totalSlides - 1 && (
              <button
                aria-label="Next"
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 w-11 h-11 rounded-full shadow-md flex items-center justify-center z-10 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              >
                <FaChevronRight />
              </button>
            )}
          </div>

          {/* Dots */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    currentIndex === i ? "bg-indigo-600" : "bg-gray-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-slate-400 mt-3">
              <FaChevronLeft className="text-sm" />
              <span>Swipe or use arrows</span>
              <FaChevronRight className="text-sm" />
            </div>
          </div>
        </>
      ) : (
        /* Desktop: simple 4-card grid, no slider */
        <div className="px-4 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 60, opacity: 0, rotate: 2 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                viewport={{ once: true, margin: "0px" }}
                className="relative w-full h-[420px]"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-36 w-14 h-14 rounded-lg flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `${item.color}55 0px 6px 18px`,
                    }}
                  >
                    <item.icon className="text-white text-xl" />
                  </div>

                  <div className="px-4 pt-10 pb-6 text-center mt-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4"></div>
                  </div>

                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl opacity-20 blur-md transition-opacity duration-300 -z-10 translate-y-4`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16 relative z-10"
      >
        {/* Example CTA - uncomment/modify as needed */}
        {/*
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg text-lg group"
        >
          Enroll Now
        </motion.button>
        */}
      </motion.div>
    </div>
  );
}
