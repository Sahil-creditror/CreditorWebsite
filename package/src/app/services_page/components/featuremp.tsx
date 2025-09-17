"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

export default function MasterclassBenefits() {
  const benefits = [
    {
      title: "POS & Gateway Options",
      description:
        "EMV-compliant terminals, mobile readers, and online gateways.",
      image: "/images/services/private-merchant/gateway.webp",
    },
    {
      title: "Fraud & Chargeback Protection",
      description:
        "Real-time monitoring and dispute support.",
      image: "/images/services/private-merchant/protection.webp",
    },
    {
      title: "PCI & EMV Compliant",
      description:
        "Security built into every account.",
      image: "/images/services/template/business.webp",
    },
    {
      title: "Multi-Currency Settlement",
      description:
        "Process payments worldwide and settle in your preferred currency.",
      image: "/images/services/private-merchant/currency.webp",
    },
    {
      title: "Detailed Reporting",
      description:
        "Merchant statements, analytics, and dashboards.",
      image: "/images/services/private-merchant/report.webp",
    },
  ];

  // Section variants
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  // Title letter variants (subtle stagger)
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  // Cards are static (no framer motion animations on cards)

  const title = "Features of a Private Merchant Account";
  const words = title.split(" ");
  const subtitle = "Modern infrastructure, built-in security, and global-ready settlement options.";

  // Responsive slider controls
  const [windowWidth, setWindowWidth] = useState<number>(1024);
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth || 1024);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const visibleCards = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 4;
  const totalSlides = Math.max(1, benefits.length - visibleCards + 1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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

  const translatePercent = (currentIndex * 100) / visibleCards;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-24 md:py-20">
      {/* Animated wave background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Far back light waves */}
        <motion.svg
          className="absolute bottom-0 left-0 w-[200%] h-[20rem] text-blue-200 opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: -50 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,192L48,176C96,160,192,128,288,106.7C384,85,480,75,576,96C672,117,768,171,864,181.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>

        <motion.svg
          className="absolute bottom-0 left-0 w-[210%] h-[22rem] text-blue-300 opacity-25"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: -65 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,181.3C672,181,768,171,864,165.3C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>

        {/* Back wave */}
        <motion.svg
          className="absolute bottom-0 left-0 w-[220%] h-[24rem] text-blue-400 opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: -80 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,224L48,192C96,160,192,96,288,74.7C384,53,480,75,576,96C672,117,768,139,864,122.7C960,107,1056,53,1152,42.7C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>

        {/* Mid wave */}
        <motion.svg
          className="absolute bottom-0 left-0 w-[220%] h-[28rem] text-blue-500 opacity-50"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: -120 }}
          transition={{ duration: 14, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,288L40,272C80,256,160,224,240,208C320,192,400,192,480,176C560,160,640,128,720,117.3C800,107,880,117,960,144C1040,171,1120,213,1200,229.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          />
        </motion.svg>

        {/* Front wave */}
        <motion.svg
          className="absolute bottom-0 left-0 w-[240%] h-80 text-blue-600 opacity-70"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          initial={{ x: 0 }}
          animate={{ x: -160 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,256L60,229.3C120,203,240,149,360,160C480,171,600,245,720,261.3C840,277,960,235,1080,213.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </motion.svg>
      </div>
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -left-24 -top-24 w-96 h-[28rem] rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 opacity-12 blur-3xl" />
      <div className="pointer-events-none absolute right-8 -bottom-28 w-80 h-[24rem] rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.header
          className="max-w-4xl mx-auto text-center mb-10 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <motion.h2 className="font-extrabold leading-tight text-slate-900 dark:text-white text-3xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            {words.map((word, i) => (
              <motion.span key={i} className="inline-block mr-2" variants={letterVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p className="mx-auto text-sm md:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-medium" variants={sectionVariants}>
            {subtitle}
          </motion.p>
        </motion.header>

        {/* Slider (all breakpoints) */}
        <div className="relative">
          {/* Navigation buttons positioned outside the slider */}
          {currentIndex > 0 && (
            <button
              aria-label="Previous"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-blue-600 hover:bg-blue-700 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md flex items-center justify-center z-10 text-white transition-all duration-200"
            >
              <FaChevronLeft />
            </button>
          )}

          {currentIndex < totalSlides - 1 && (
            <button
              aria-label="Next"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-blue-600 hover:bg-blue-700 w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md flex items-center justify-center z-10 text-white transition-all duration-200"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Slider container with card-consistent spacing */}
          <div
            className="px-1"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Track */}
            <div
              className="flex items-stretch transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translatePercent}%)` }}
            >
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="px-1 box-border flex"
                  style={{ flex: `0 0 ${100 / visibleCards}%` }}
                >
                  <article
                    className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 flex flex-col w-full"
                  >
                    <div className="relative w-full h-40 sm:h-44 lg:h-40">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col text-center">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 opacity-80" />
                  </article>
                </div>
              ))}
            </div>
          </div>
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
        </div>

        {/* Sub-footer / note */}
        <motion.div className="mt-10 max-w-3xl mx-auto text-center text-sm text-slate-500 dark:text-slate-400" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p>
            Join today to get exclusive previews, live coaching, and entry to member-only community groups — cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
