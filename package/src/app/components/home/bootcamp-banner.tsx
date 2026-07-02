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

    const slidesData = [
        {
            imageSrc: "/images/todayclasstopic/today.png",
            imageAlt: "The Financial Freedom Class",
            badge: "Special Event • June 18, 2026",
            heading: <> The Financial Freedom Class: <span className="text-cyan-600">Creating Multiple Streams of Income</span></>,
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
            heading: <> Exit Strategies: <span className="text-cyan-600">Preparing Your Business for a Successful Sale</span></>,
            description: "Build with the end in mind. Learn verified strategies to maximize company valuation, mitigate transition risks, and guarantee a seamless, highly profitable enterprise transfer.",
            benefits: [
                "Maximize Business Value",
                "Reduce Venture Transfer Risk",
                "Expert Strategic Guidance",
                "Corporate Transition Blueprints"
            ]
        },
    ];

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
            className={`${poppins.className} relative py-20 lg:py-20 overflow-hidden bg-white`}
        >
            {/* --- Ambient Light Background Graphics --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Subtle high-tech grid texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                
                {/* Soft Light Blue Glow on the right side */}
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-400/10 rounded-full blur-[140px] opacity-80" />
                <div className="absolute right-1/4 bottom-10 w-[400px] h-[400px] bg-cyan-300/5 rounded-full blur-[110px]" />
                
                {/* Light Minimalist Wave Vector paths */}
                <svg
                    className="absolute w-full h-full min-w-[1440px] opacity-40"
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="light-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
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
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        stroke="url(#light-wave-1)"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col gap-14"
                >
                    {/* --- Top Global Header Area --- */}
                    <motion.div variants={itemVariants} className="text-center space-y-3 max-w-2xl mx-auto">
                       
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            Today's Featured <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">Masterclasses</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-sm sm:text-base">
                            Dive straight into intensive interactive modules engineered to transform structural financial workflows in real time.
                        </p>
                    </motion.div>

                    {/* --- Lower Layout Grid Section --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        {/* Left Column: Image Slider */}
                        <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
                            {/* Shadow Backing Frame */}
                            <div className="absolute -inset-4 bg-sky-200/40 blur-[50px] rounded-full opacity-40" />
                            
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(148,163,184,0.15)] bg-slate-50 border border-slate-100">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={slidesData[currentIndex].imageSrc}
                                        alt={slidesData[currentIndex].imageAlt}
                                        initial={{ opacity: 0, scale: 1.02 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Column: Content */}
                        <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-cyan-500 pl-6 lg:pl-8 py-2 min-h-[460px] justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    variants={contentFadeVariants}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Premium Event Badge */}
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-600 text-white w-fit shadow-md shadow-cyan-500/10 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                        {slidesData[currentIndex].badge}
                                    </div>

                                    {/* Header text */}
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl text-slate-900 font-black leading-[1.15] tracking-tight font-sans">
                                        {slidesData[currentIndex].heading}
                                    </h3>

                                    {/* Descriptive paragraph */}
                                    <p className="text-base md:text-md text-slate-600 font-normal leading-relaxed max-w-xl">
                                        {slidesData[currentIndex].description}
                                    </p>

                                    {/* Benefits Checkmarks */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                                        {slidesData[currentIndex].benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center font-bold shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-slate-700 font-medium text-[14px] sm:text-[15px] leading-tight">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Pagination Interface */}
                            <motion.div variants={itemVariants} className="flex flex-col gap-5 mt-2">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-slate-100/80 backdrop-blur-md border border-slate-200/60">
                                        {slidesData.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "w-8 bg-cyan-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BootcampBanner;