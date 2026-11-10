"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

const BootcampBanner = () => {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    // Single source of truth fully aligned with the flyer
    const classData = {
        imageSrc: "/images/event/26event.webp", 
        imageAlt: "Private Banking YouTube Live by Creditor Academy",
        badge: "YouTube Live • Today at 2:00 PM PST",
        heading: (
            <>
                Exclusive{" "}
                <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                    Private Banking
                </span>{" "}
                Event
            </>
        ),
        description:
            "Join our special Private Banking event and take control of your financial future.",
        benefits: [
            "Private Banking Secrets",
            "Asset Protection",
            "Wealth Building",
            "Expert Guidance",
        ],
    };

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

    return (
        <section
            ref={containerRef}
            className="relative py-20 lg:py-20 overflow-hidden bg-linear-to-br from-slate-600 via-blue-950 to-slate-600 text-slate-100 font-sans"
        >
            {/* --- Ambient Light Background Graphics --- */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] opacity-60" />
                <div className="absolute right-1/4 bottom-10 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[110px]" />
                
                <svg
                    className="absolute w-full h-full min-w-[1440px] opacity-20"
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="light-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
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
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                            Today&apos;s Featured <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">YouTube Live</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-sm sm:text-base">
                            Join our interactive YouTube Live session engineered to transform structural financial workflows in real time.
                        </p>
                    </motion.div>

                    {/* --- Lower Layout Grid Section --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
                        {/* Left Column: Static Image Display */}
                        <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
                            <div className="absolute -inset-4 bg-blue-500/10 blur-[50px] rounded-full opacity-40" />
                            
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/40 border border-slate-800/80">
                                <Image
                                    src={classData.imageSrc}
                                    alt={classData.imageAlt}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Right Column: Content */}
                        <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-blue-500/80 pl-6 lg:pl-8 py-2 justify-center">
                            <motion.div variants={itemVariants} className="flex flex-col gap-5">
                                {/* Premium Event Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white w-fit shadow-md shadow-blue-950/50 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    {classData.badge}
                                </div>

                                {/* Header text */}
                                <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-[1.15] tracking-tight font-sans uppercase">
                                    {classData.heading}
                                </h3>

                                {/* Descriptive paragraph */}
                                <p className="text-base md:text-md text-slate-400 font-normal leading-relaxed max-w-xl">
                                    {classData.description}
                                </p>

                                {/* Benefits Checkmarks */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                                    {classData.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="shrink-0 w-7 h-7 rounded-lg bg-cyan-950/60 text-blue-400 border border-cyan-900/60 flex items-center justify-center font-bold shadow-sm">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-slate-300 font-medium text-[14px] sm:text-[15px] leading-tight">
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* YouTube CTA Button */}
                                <div className="mt-4">
                                    <a
                                        href="https://www.youtube.com/@creditoracademy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)] uppercase tracking-wide"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                        Watch on YouTube
                                    </a>
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
