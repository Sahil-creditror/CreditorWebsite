"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaBalanceScale,
  FaGavel,
  FaUserLock,
  FaFileContract,
  FaShieldAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { motion } from "framer-motion";

type CardType = {
  title: string;
  desc: string;
  Icon: React.ComponentType<any>;
  color: string;
  img: string;
};

const SovSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const cards: CardType[] = [
    {
      title: "Status Correction",
      desc: "Learn how to correct your legal status and establish sovereignty",
      Icon: FaBalanceScale,
      color: "#426be6",
      img: "/images/courses/become/status.png",
    },
    {
      title: "Legal Fictions",
      desc: "Understand legal fictions and how to rebut presumption",
      Icon: FaGavel,
      color: "#7648be",
      img: "/images/courses/become/judiciary.png",
    },
    {
      title: "Private Jurisdiction",
      desc: "Remove yourself from public jurisdiction effectively",
      Icon: FaUserLock,
      color: "#23a26c",
      img: "/images/courses/become/private.png",
    },
    {
      title: "Essential Documents",
      desc: "Create the necessary legal documents and private contracts",
      Icon: FaFileContract,
      color: "#e28019",
      img: "/images/courses/become/document.png",
    },
    {
      title: "Estate Protection",
      desc: "Begin protecting yourself and your estate properly",
      Icon: FaShieldAlt,
      color: "#e14040",
      img: "/images/courses/become/asset.png",
    },
  ];

  // Responsive logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCards = isMobile ? 1 : 4;
  const totalSlides = Math.max(1, cards.length - visibleCards + 1);

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

  const translatePercent = currentIndex * (100 / visibleCards);

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
          <div className="text-center text-3xl md:text-5xl font-extrabold text-[#0b3d78] dark:text-white">
            What You'll Learn
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-300 mb-10">
          Master these essential concepts to take control of your legal standing
        </div>
      </motion.div>

      {/* Slider */}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 w-11 h-11 rounded-full shadow-md flex items-center justify-center z-10 text-gray-700"
          >
            <FaChevronLeft />
          </button>
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${translatePercent}%)` }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="p-2 box-border"
                style={{ flex: `0 0 ${100 / visibleCards}%` }}
              >
                <div className="bg-white dark:bg-slate-950 rounded-xl shadow-lg overflow-hidden h-full flex flex-col relative">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-36 w-14 h-14 rounded-lg flex items-center justify-center shadow-md"
                    style={{
                      backgroundColor: card.color,
                      boxShadow: `${card.color}55 0px 6px 18px`,
                    }}
                  >
                    <card.Icon className="text-white text-xl" />
                  </div>

                  <div className="px-4 pt-10 pb-6 text-center mt-6 flex-1">
                    <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {card.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-white-300 leading-relaxed">
                      {card.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {currentIndex < totalSlides - 1 && (
          <button
            aria-label="Next"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 w-11 h-11 rounded-full shadow-md flex items-center justify-center z-10 text-gray-700"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Dots + Swipe Indicator */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-3">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === i ? "bg-[#426be6]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {isMobile && (
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-3">
            <FaChevronLeft className="text-sm text-gray-400" />
            <span>Swipe or use arrows</span>
            <FaChevronRight className="text-sm text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SovSlider;
