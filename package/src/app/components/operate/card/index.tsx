"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

type CardType = {
  title: string;
  desc: string;
  img: string;
  color: string;
};

const WhatYoullLearnSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cards: CardType[] = [
    {
      title: "UBOT Trust Setup",
      desc: "Protect assets; compartmentalize holdings.",
      color: "#426be6",
      img: "/images/operate/img2.webp",
    },
    {
      title: "Private Membership Associations",
      desc: "Operate privately with PMAs.",
      color: "#7648be",
      img: "/images/operate/img5.webp",
    },
    {
      title: "Real Estate in Trusts",
      desc: "Acquire and hold privately.",
      color: "#23a26c",
      img: "/images/operate/img6.webp",
    },
    {
      title: "Private Bookkeeping",
      desc: "Disciplined records; clean books.",
      color: "#e28019",
      img: "/images/operate/img1.webp",
    },
    {
      title: "Intergenerational Wealth",
      desc: "Build with private instruments.",
      color: "#e14040",
      img: "/images/operate/img3.webp",
    },
  ];

  // ✅ Only run resize logic after mount (avoids SSR mismatch)
  useEffect(() => {
    setHasMounted(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // run once at mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🚀 Don’t render until mounted → fixes hydration errors
  if (!hasMounted) return null;

  const visibleCards = isMobile ? 1 : 4;
  const totalSlides = Math.max(1, cards.length - visibleCards + 1);

  const nextSlide = () => setCurrentIndex((i) => Math.min(i + 1, totalSlides - 1));
  const prevSlide = () => setCurrentIndex((i) => Math.max(i - 1, 0));

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
    if (distance > minSwipe) nextSlide();
    else if (distance < -minSwipe) prevSlide();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const translatePercent = currentIndex * (100 / visibleCards);

  return (
    <div className="w-full py-10 px-4 bg-whitesmoke dark:bg-slate-900 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-center text-4xl md:text-6xl font-bold text-[#0b3d78] dark:text-white">
            What You'll Learn
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 dark:text-gray-300 mb-10">
          Real-world curriculum for operating in the private with clarity and compliance.
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-900 border border-gray-700 w-11 h-11 rounded-full shadow-lg flex items-center justify-center z-10 text-white transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
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
                    <div className="text-white text-xl font-bold">{i + 1}</div>
                  </div>

                  <div className="px-4 pt-10 pb-6 text-center mt-6 flex-1">
                    <div className="text-base font-semibold text-gray-1000 dark:text-white mb-2">
                      {card.title}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
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
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 hover:bg-gray-900 border border-gray-700 w-11 h-11 rounded-full shadow-lg flex items-center justify-center z-10 text-white transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600"
          >
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Dots + Swipe */}
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
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-3 dark:text-gray-400">
            <FaChevronLeft className="text-sm" />
            <span>Swipe or use arrows</span>
            <FaChevronRight className="text-sm" />
          </div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16 relative z-10"
      >
        {/* <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg text-lg group"
        >
          Start Your Transformation
          <svg
            className="inline-block ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </motion.button> */}
      </motion.div>
    </div>
  );
};

export default WhatYoullLearnSlider;
