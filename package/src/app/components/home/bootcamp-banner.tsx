"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const BootcampBanner = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mapped array containing all event flyers organized chronologically by date
    const slidesData = [
        {
            imageSrc: "/images/todayclasstopic/today.png",
            imageAlt: "The Financial Freedom Class",
            badge: "Special Event • June 18, 2026",
            heading: <> The Financial Freedom Class: <span className="text-cyan-400">Creating Multiple Streams of Income</span></>,
            description: "Supercharge your path to autonomy. Discover modern frameworks to generate reliable income streams, fast-track your asset accumulation, and scale your personal capital portfolio.",
            benefits: [
                "Diverse Income Sources",
                "Accelerated Financial Growth",
                "True Financial Freedom Tools",
                "High-Yield Action Planning"
            ]
        },
        {
            imageSrc: "/images/todayclasstopic/exit.png",
            imageAlt: "Exit Strategies Master Class",
            badge: "Master Class • June 18, 2026",
            heading: <> Exit Strategies: <span className="text-cyan-400">Preparing Your Business for a Successful Sale</span></>,
            description: "Build with the end in mind. Learn verified strategies to maximize company valuation, mitigate transition risks, and guarantee a seamless, highly profitable enterprise transfer.",
            benefits: [
                "Maximize Business Value",
                "Reduce Venture Transfer Risk",
                "Expert Strategic Guidance",
                "Corporate Transition Blueprints"
            ]
        },
    ];

    // Slide transition running at 4000ms (4 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [slidesData.length]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 15, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] },
        },
    };

    const contentFadeVariants = {
        initial: { opacity: 0, x: -15 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: 15, transition: { duration: 0.3, ease: "easeIn" } }
    } as const;

    return (
        <section
            ref={containerRef}
            className={`${poppins.className} relative py-20 lg:py-20 overflow-hidden bg-slate-950`}
        >
            {/* Optimized localized background image system mapping to public files */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
                style={{ backgroundImage: `url('/images/bg/bgclas.jpg')` }}
            />

            {/* Layered atmospheric tint mesh over asset */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/85 to-blue-950/60 mix-blend-multiply pointer-events-none" />

            {/* --- Dynamic Three-Wave Ambient Overlay Paths --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
                <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
                <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[110px]" />

                <svg
                    className="absolute w-full h-full min-w-[1440px]"
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.30" />
                            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.03" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.05" />
                        </linearGradient>
                        <linearGradient id="wave-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.10" />
                            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.06" />
                        </linearGradient>
                    </defs>

                    <motion.path
                        animate={{
                            d: [
                                "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350",
                                "M -100 280 C 250 350, 550 150, 850 250 C 1150 350, 1350 250, 1600 380",
                                "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350"
                            ]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        stroke="url(#wave-grad-1)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    <motion.path
                        animate={{
                            d: [
                                "M -100 450 C 200 300, 600 500, 1000 350 C 1250 250, 1400 400, 1600 450",
                                "M -100 410 C 250 360, 550 420, 950 380 C 1200 340, 1450 360, 1600 410",
                                "M -100 450 C 200 300, 600 500, 1000 350 C 1250 250, 1400 400, 1600 450"
                            ]
                        }}
                        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                        stroke="url(#wave-grad-2)"
                        strokeWidth="2"
                        strokeDasharray="8 8"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
                >
                    {/* Left Image Slider Column - Enhanced to complementary dark backdrops */}
                    <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
                        <div className="absolute -inset-4 bg-cyan-500/15 blur-[60px] rounded-full opacity-30" />
                        <div className="relative aspect-[1/1] w-full rounded-md overflow-hidden shadow-2xl bg-slate-900 border border-slate-800/80">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={slidesData[currentIndex].imageSrc}
                                    alt={slidesData[currentIndex].imageAlt}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover bg-slate-900"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Content Column - Dark mode design upgrade */}
                    <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-cyan-500 pl-6 py-2 min-h-[480px] justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={contentFadeVariants}
                                className="flex flex-col gap-5"
                            >
                                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-600 to-violet-600 text-white w-fit shadow-xl shadow-cyan-900/40 font-bold uppercase tracking-wider text-[11px]">
                                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                                    {slidesData[currentIndex].badge}
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-black leading-[1.15] tracking-tight">
                                    {slidesData[currentIndex].heading}
                                </h2>

                                <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-xl">
                                    {slidesData[currentIndex].description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2.5">
                                    {slidesData[currentIndex].benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-7 h-7 rounded-md bg-cyan-950 border border-cyan-900/80 text-cyan-400 flex items-center justify-center font-bold">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-100 font-semibold text-[15px] leading-tight">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Static Bottom Controls - Dark glassmorphismpagination */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-5 mt-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex flex-wrap gap-2.5 ml-1 p-2 rounded-full bg-slate-900/60 backdrop-blur-sm border border-slate-800/80">
                                    {slidesData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-7 bg-cyan-400" : "w-2.5 bg-slate-700 hover:bg-slate-500"}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BootcampBanner;