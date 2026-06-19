"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const slidesData = [
  {
    imageSrc: "/images/todayclasstopic/11june.webp",
    imageAlt: "Business Credit Foundations",
    tagline: "FINANCIAL FOUNDATIONS",
    date: "June 11, 2026",
    heading: (
      <>
        Build a Fundable <br />
        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Business Profile</span>
      </>
    ),
    description: "Establish strong core business credit and unlock real capital opportunities with a structure banks trust.",
    pillText: "Includes 1:1 Counseling",
  },
  {
    imageSrc: "/images/todayclasstopic/11CA.webp",
    imageAlt: "Wealth Preservation",
    tagline: "ASSET PROTECTION",
    date: "June 11, 2026",
    heading: (
      <>
        Preserve Wealth & <br />
        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Protect Your Assets</span>
      </>
    ),
    description: "Safeguard your earnings and build concrete financial shields to weather economic instability safely.",
    pillText: "Live Master Class",
  },
];

const animationConfig = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

const BootcampBanner = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Accelerated 2-second auto-slide interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slide = slidesData[currentIndex];

  return (
    <section
      ref={containerRef}
      className={`${poppins.className} relative py-16 md:py-24 bg-[#FAF9F5] text-[#1A2432] overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
        >
          {/* ── LEFT SIDE: MEDIA CONTAINER ── */}
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="relative aspect-square w-full max-w-lg mx-auto overflow-hidden shadow-2xl shadow-secondary/10 bg-white group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    className="object-cover object-center transition-transform duration-700 "
                    sizes="(max-w-lg) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT SIDE: MINIMALIST CONTENT BLOCK ── */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={animationConfig}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col space-y-5"
              >
                {/* Meta Row with dynamic Date item */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <span className="text-[11px] font-black tracking-[0.2em] uppercase text-secondary/40">
                    {slide.tagline}
                  </span>
                  <div className="h-px w-4 sm:w-6 bg-secondary/20" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-secondary/60 bg-secondary/5 px-2 py-0.5 rounded">
                    {slide.date}
                  </span>
                  <div className="hidden sm:block h-px w-4 bg-secondary/20" />
                  <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full">
                    {slide.pillText}
                  </span>
                </div>

                {/* Condensed Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.15] tracking-tight text-[#1A2432]">
                  {slide.heading}
                </h2>

                {/* Lean Description */}
                <p className="text-base text-secondary/70 max-w-[460px] leading-relaxed font-normal">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls Below Content */}
            <div className="flex items-center gap-3 mt-10 pt-6 border-t border-secondary/5">
              {slidesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 relative overflow-hidden ${
                    idx === currentIndex ? "w-10 bg-[#1A2432]" : "w-2 bg-secondary/20 hover:bg-secondary/40"
                  }`}
                >
                  {idx === currentIndex && (
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-primary w-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.0, ease: "linear" }} // Sync tracking fill precisely to 2s
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BootcampBanner;


// "use client";

// import React, { useRef } from "react";
// import { motion, useInView, Variants } from "framer-motion";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//     subsets: ["latin"],
//     weight: ["400", "500", "600", "700", "800", "900"],
//     display: "swap",
// });

// const MasterClassBanner = () => {
//     const containerRef = useRef(null);
//     const isInView = useInView(containerRef, { once: false, amount: 0.2 });

//     // Data mapping synchronized with the verified text assets from a.png
//     const classData = {
//         imageSrc: "/images/todayclasstopic/arr.png",
//         imageAlt: "Creditor Academy Master Class Poster - Buying Real Estate Using Creative Financing Strategies Today",
//         badge: "Master Class - 15th June 2026",
//         heading: (
//             <>
//                 Buying Real Estate: <span className="text-primary block mt-1">Using Creative Financing Strategies Today</span>
//             </>
//         ),
//         description: "Join Creditor Academy (Private Montessori Association) for an exclusive, high-level real estate master class. Learn how to strategically acquire properties, maximize leverage, and scale your portfolio using creative financing.",
//         benefits: [
//             "Creative Financing",
//             "Invest Smarter",
//             "Build Wealth Today",
//             "Creditor Academy Private Association"
//         ]
//     };

//     const containerVariants: Variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.08,
//                 delayChildren: 0.05,
//             },
//         },
//     };

//     const itemVariants: Variants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { duration: 0.5, ease: [0.215, 0.610, 0.355, 1.000] },
//         },
//     };

//     return (
//         <section
//             ref={containerRef}
//             className={`${poppins.className} relative py-20 overflow-hidden bg-gradient-to-br from-lightgray via-white to-lightgray`}
//         >
//             {/* Background Decorative Accents */}
//             <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//                 <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
//                 <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
//                 <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[130px]" />
//                 <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[130px]" />
//             </div>

//             <div className="container mx-auto px-4 relative z-10">
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate={isInView ? "visible" : "hidden"}
//                     className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
//                 >
//                     {/* Left Content Column */}
//                     <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-primary pl-6 py-2 min-h-[440px] justify-center">
//                         <motion.div variants={itemVariants} className="flex flex-col gap-5">
//                             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary text-white w-fit shadow-md shadow-primary/10 font-bold uppercase tracking-wider text-[11px]">
//                                 <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
//                                 {classData.badge}
//                             </div>

//                             <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary font-extrabold leading-[1.1] tracking-tight uppercase">
//                                 {classData.heading}
//                             </h2>

//                             <p className="text-base md:text-lg text-secondary/80 font-medium leading-relaxed max-w-xl">
//                                 {classData.description}
//                             </p>

//                             {/* Core Class Takeaways */}
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
//                                 {classData.benefits.map((benefit, idx) => (
//                                     <div key={idx} className="flex items-center gap-3">
//                                         <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-bold">
//                                             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                             </svg>
//                                         </div>
//                                         <span className="text-secondary font-semibold text-[14px] leading-tight">{benefit}</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     </div>

//                     {/* Right Static Image Column */}
//                     <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
//                         <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full opacity-30" />
//                         <motion.div
//                             variants={itemVariants}
//                             className="relative aspect-[1/1] w-full rounded-sm overflow-hidden shadow-[0_25px_55px_-12px_rgba(0,0,0,0.12)] bg-white border border-gray-100"
//                         >
//                             <img
//                                 src={classData.imageSrc}
//                                 alt={classData.imageAlt}
//                                 className="absolute inset-0 w-full h-full object-cover bg-white"
//                             />
//                         </motion.div>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default MasterClassBanner;
