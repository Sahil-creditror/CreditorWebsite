// "use client";

// import React, { useRef } from "react";
// import Image from "next/image";
// import { motion, useInView, Variants } from "framer-motion";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//     subsets: ["latin"],
//     weight: ["400", "500", "600", "700", "800", "900"],
//     display: "swap",
// });

// const BootcampBanner = () => {
//     const containerRef = useRef(null);
//     const isInView = useInView(containerRef, { once: false, amount: 0.2 });

//     // Single source of truth fully aligned with the ca.jpeg flyer
//     const classData = {
//         imageSrc: "/images/todayclasstopic/ca.jpeg", 
//         imageAlt: "Business Banking Best Practices Master Class by Creditor Academy",
//         badge: "Master Class • July 10th, 2026",
//         heading: (
//             <>
//                 Business Banking{" "}
//                 <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
//                     Best Practices
//                 </span>
//             </>
//         ),
//         description:
//             "Don't let banking errors stall your success. Master the habits that separate successful businesses from the rest.",
//         benefits: [
//             "Master Successful Banking Habits",
//             "Avoid Critical Banking Errors",
//             "Prevent Growth & Financial Stalls",
//             "Separate Your Business From the Rest",
//         ],
//     };

//     const containerVariants: Variants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.05,
//                 delayChildren: 0.05,
//             },
//         },
//     };

//     const itemVariants: Variants = {
//         hidden: { y: 15, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] },
//         },
//     };

//     return (
//         <section
//             ref={containerRef}
//             className={`${poppins.className} relative py-20 lg:py-20 overflow-hidden bg-linear-to-br from-slate-600 via-blue-950 to-slate-600 text-slate-100`}
//         >
//             {/* --- Ambient Light Background Graphics --- */}
//             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.02)_1px,transparent_1px)] bg-size-[4rem_4rem]" />
//                 <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] opacity-60" />
//                 <div className="absolute right-1/4 bottom-10 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[110px]" />
                
//                 <svg
//                     className="absolute w-full h-full min-w-[1440px] opacity-20"
//                     viewBox="0 0 1440 800"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     preserveAspectRatio="none"
//                 >
//                     <defs>
//                         <linearGradient id="light-wave-1" x1="0%" y1="0%" x2="100%" y2="100%">
//                             <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
//                             <stop offset="100%" stopColor="#6366f1" stopOpacity="0.01" />
//                         </linearGradient>
//                     </defs>
//                     <motion.path
//                         animate={{
//                             d: [
//                                 "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350",
//                                 "M -100 280 C 250 350, 550 150, 850 250 C 1150 350, 1350 250, 1600 380",
//                                 "M -100 250 C 300 400, 500 100, 900 300 C 1200 450, 1300 200, 1600 350"
//                             ]
//                         }}
//                         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//                         stroke="url(#light-wave-1)"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                     />
//                 </svg>
//             </div>

//             <div className="container mx-auto px-6 relative z-10">
//                 <motion.div
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate={isInView ? "visible" : "hidden"}
//                     className="flex flex-col gap-14"
//                 >
//                     {/* --- Top Global Header Area --- */}
//                     <motion.div variants={itemVariants} className="text-center space-y-3 max-w-2xl mx-auto">
//                         <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
//                             Today&apos;s Featured <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">Masterclasses</span>
//                         </h2>
//                         <p className="text-slate-400 font-medium text-sm sm:text-base">
//                             Dive straight into intensive interactive modules engineered to transform structural financial workflows in real time.
//                         </p>
//                     </motion.div>

//                     {/* --- Lower Layout Grid Section --- */}
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        
//                         {/* Left Column: Static Image Display */}
//                         <motion.div variants={itemVariants} className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
//                             <div className="absolute -inset-4 bg-blue-500/10 blur-[50px] rounded-full opacity-40" />
                            
//                             <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/40 border border-slate-800/80">
//                                 <Image
//                                     src={classData.imageSrc}
//                                     alt={classData.imageAlt}
//                                     fill
//                                     className="object-cover"
//                                     sizes="(max-width: 1024px) 100vw, 40vw"
//                                     priority
//                                 />
//                             </div>
//                         </motion.div>

//                         {/* Right Column: Content Content */}
//                         <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-blue-500/80 pl-6 lg:pl-8 py-2 justify-center">
//                             <motion.div variants={itemVariants} className="flex flex-col gap-5">
//                                 {/* Premium Event Badge */}
//                                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white w-fit shadow-md shadow-blue-950/50 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
//                                     <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
//                                     {classData.badge}
//                                 </div>

//                                 {/* Header text */}
//                                 <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-black leading-[1.15] tracking-tight font-sans uppercase">
//                                     {classData.heading}
//                                 </h3>

//                                 {/* Descriptive paragraph */}
//                                 <p className="text-base md:text-md text-slate-400 font-normal leading-relaxed max-w-xl">
//                                     {classData.description}
//                                 </p>

//                                 {/* Benefits Checkmarks */}
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
//                                     {classData.benefits.map((benefit, idx) => (
//                                         <div key={idx} className="flex items-center gap-3">
//                                             <div className="shrink-0 w-7 h-7 rounded-lg bg-cyan-950/60 text-blue-400 border border-cyan-900/60 flex items-center justify-center font-bold shadow-sm">
//                                                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                                 </svg>
//                                             </div>
//                                             <span className="text-slate-300 font-medium text-[14px] sm:text-[15px] leading-tight">
//                                                 {benefit}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </motion.div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default BootcampBanner;



"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

export default function BootcampBanner() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const [currentIndex, setCurrentIndex] = useState(0);

    // Array of masterclasses extracted directly from the flyers
    const classes = [
        {
            imageSrc: "/images/todayclasstopic/efs.jpg",
            imageAlt: "Master Class on Equipment Financing Strategies",
            badge: "Master Class • July 14, 2026",
            heading: (
                <>
                    Equipment Financing{" "}
                    <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                        Strategies
                    </span>
                </>
            ),
            description:
                "Finance the equipment your business needs—without hurting cash flow.",
            benefits: [
                "Choose the right financing option",
                "Improve approval chances",
                "Fund equipment for business growth",
            ],
        },
        {
            imageSrc: "/images/todayclasstopic/tae.jpg",
            imageAlt: "Trust Administration Basics Workshop",
            badge: "Workshop • July 14, 2026",
            heading: (
                <>
                    Trust{" "}
                    <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                        Administration
                    </span>{" "}
                    Basics
                </>
            ),
            description:
                "Learn the fundamentals of effective trust administration.",
            benefits: [
                "Trustee Roles",
                "Administration Process",
                "Avoid Common Mistakes",
            ],
        },
    ];

    // Automatic slide logic switching every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % classes.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [classes.length]);

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

    // Slide transition variations for smooth slide in/out effects
    const slideVariants = {
        enter: { x: 40, opacity: 0 },
        center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { x: -40, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
    } as const;

    const currentClass = classes[currentIndex];

    return (
        <section
            ref={containerRef}
            className={`${poppins.className} relative py-20 lg:py-20 overflow-hidden bg-linear-to-br from-slate-600 via-blue-950 to-slate-600 text-slate-100`}
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
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                            Today&apos;s Featured <span className="bg-linear-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">Workshops</span>
                        </h2>
                        <p className="text-slate-400 font-medium text-sm sm:text-base">
                            Dive straight into intensive interactive modules engineered by Creditor Academy to transform your business strategies in real time.
                        </p>
                    </motion.div>

                    {/* --- Lower Slide Layout Section with AnimatePresence --- */}
                    <div className="relative min-h-[500px] lg:min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center absolute inset-0 w-full"
                            >
                                {/* Left Column: Interactive Graphic Image Display */}
                                <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
                                    <div className="absolute -inset-4 bg-blue-500/10 blur-[50px] rounded-full opacity-40" />
                                    
                                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-slate-900/40 border border-slate-800/80">
                                        <Image
                                            src={currentClass.imageSrc}
                                            alt={currentClass.imageAlt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 40vw"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Right Column: Animated Content */}
                                <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-blue-500/80 pl-6 lg:pl-8 py-2 justify-center">
                                    <div className="flex flex-col gap-5">
                                        {/* Premium Event Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500 to-blue-600 text-white w-fit shadow-md shadow-blue-950/50 font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                            {currentClass.badge}
                                        </div>

                                        {/* Header Text */}
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl text-white font-black leading-[1.15] tracking-tight font-sans uppercase">
                                            {currentClass.heading}
                                        </h3>

                                        {/* Descriptive Paragraph */}
                                        <p className="text-base md:text-md text-slate-400 font-normal leading-relaxed max-w-xl">
                                            {currentClass.description}
                                        </p>

                                        {/* Benefits Checkmarks */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                                            {currentClass.benefits.map((benefit, idx) => (
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
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* --- Slider Pagination Dots Indicators --- */}
                    <div className="flex justify-center gap-2 mt-4">
                        {classes.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? "w-8 bg-blue-400" : "w-2 bg-slate-600"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}