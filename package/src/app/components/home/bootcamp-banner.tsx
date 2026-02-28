"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const BootcampBanner = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    const benefits = [
        "Live weekday classes",
        "Structured private education",
        "Exclusive community access",
        "Proven frameworks",
    ];

    return (
        <section
            ref={containerRef}
            className="relative py-16 overflow-hidden bg-lightgray"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Content Column */}
                    <div className="flex flex-col gap-6 border-l-4 border-primary pl-6 py-2">
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary text-white w-fit shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px]">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            Enrollment Open
                        </motion.div>

                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary leading-[1.05] tracking-tight"
                        >
                            Master the Private. <span className="text-primary">Take Control</span> of Your Future.
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="text-base md:text-lg text-secondary/80 font-bold leading-relaxed max-w-lg"
                        >
                            Join Creditor Academy’s Bootcamp to guide you step-by-step into the Private.
                        </motion.p>

                        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3 group">
                                    <div className="flex-shrink-0 w-7 h-7 rounded-sm bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-secondary font-black text-[14px] leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div variants={itemVariants} className="p-4 rounded-sm bg-white border-l-4 border-primary shadow-[0_15px_40px_-10px_rgba(2,111,226,0.15)]">
                            <p className="text-secondary font-black text-[15px] flex items-center gap-3 whitespace-nowrap">
                                <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Membership: <span className="text-primary">$69/month</span> — Price increases soon.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
                            <Link
                                href="/contact"
                                className="px-10 py-4 bg-primary hover:bg-white border-2 border-primary hover:text-primary text-white text-[16px] font-black rounded-sm transition-all duration-300 transform hover:-translate-y-1 shadow-[0_20px_40px_-10px_rgba(2,111,226,0.4)]"
                            >
                                JOIN NOW
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Column */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full lg:max-w-lg mx-auto"
                    >
                        <div className="absolute -inset-8 bg-primary/10 blur-[70px] rounded-full opacity-40" />
                        <div className="relative rounded-sm overflow-hidden shadow-[0_30px_60px_-15px_rgba(2,111,226,0.2)]">
                            <img
                                src="/images/event/bootcampbanner.webp"
                                alt="Bootcamp"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BootcampBanner;
