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

    // Dynamic Content Mapping synced perfectly with your t.jpg and u.jpg posters
    const slidesData = [
        {
            imageSrc: "/images/todayclasstopic/t.jpg",
            imageAlt: "Tax Freedom for Entrepreneurs Starts Here",
            badge: "9th June 2026",
            heading: <>Tax Freedom for <span className="text-primary">Entrepreneurs Starts Here</span></>,
            description: "Unlock powerful financial, operational, and structural strategies most CPAs won't tell you. Step out of traditional tax bounds and transition your commercial enterprise into optimized protection.",
            benefits: [
                "Operate Private",
                "Save More Wealth",
                "Grow Businesses Faster",
                "Advanced CPA Stratagems"
            ]
        },
        {
            imageSrc: "/images/todayclasstopic/u.jpg",
            imageAlt: "Understanding Trusts vs LLCs Masterclass",
            badge: "Status Correction",
            heading: <>Understanding <span className="text-primary">Trusts vs LLCs</span></>,
            description: "Private Power Moves Body. Move beyond public fiction. Choose the framework that matches your path to lawful independence, financial sovereignty, and absolute creditor-proofing.",
            benefits: [
                "Lawful Independence",
                "Absolute Creditor-Proofing",
                "Move Beyond Public Fiction",
                "Sovereignty Structures"
            ]
        }
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
            transition: { duration: 0.4, ease: [0.215, 0.610, 0.355, 1.000] },
        },
    };

    // Cast explicitly to object structure for precise Framer Motion animation configuration parameters
    const contentFadeVariants = {
        initial: { opacity: 0, x: -15 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: 15, transition: { duration: 0.3, ease: "easeIn" } }
    } as const;

    return (
        <section
            ref={containerRef}
            className={`${poppins.className} relative py-20 overflow-hidden bg-gradient-to-br from-lightgray via-white to-lightgray`}
        >
            {/* Background Decorative Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute top-[-10%] left-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[130px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-primary/5 rounded-full blur-[130px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
                >
                    {/* Left Content Column */}
                    <div className="lg:col-span-7 flex flex-col gap-6 border-l-4 border-primary pl-6 py-2 min-h-[480px] justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                variants={contentFadeVariants}
                                className="flex flex-col gap-5"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-primary text-white w-fit shadow-md shadow-primary/10 font-bold uppercase tracking-wider text-[11px]">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    {slidesData[currentIndex].badge}
                                </div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary font-black leading-[1.1] tracking-tight">
                                    {slidesData[currentIndex].heading}
                                </h2>

                                <p className="text-base md:text-lg text-secondary/80 font-medium leading-relaxed max-w-xl">
                                    {slidesData[currentIndex].description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
                                    {slidesData[currentIndex].benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-sm bg-primary/10 text-primary flex items-center justify-center font-bold">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-secondary font-semibold text-[14px] leading-tight">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Static Bottom Controls */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-5 mt-4">
                            <div className="flex flex-wrap items-center gap-4">
                                {/* <button className="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold tracking-wide transition-all duration-300 rounded-sm shadow-md shadow-primary/20">
                                    START YOUR JOURNEY
                                </button> */}
                                {/* Visual Slider Pagination Dots */}
                                <div className="flex gap-2 ml-2">
                                    {slidesData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"}`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Slider Column */}
                    <div className="lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto">
                        <div className="absolute -inset-4 bg-primary/10 blur-[60px] rounded-full opacity-30" />
                        <div className="relative aspect-[1/1] w-full rounded-sm overflow-hidden shadow-[0_25px_55px_-12px_rgba(0,0,0,0.12)] bg-white border border-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentIndex}
                                    src={slidesData[currentIndex].imageSrc}
                                    alt={slidesData[currentIndex].imageAlt}
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.45, ease: "easeInOut" }}
                                    className="absolute inset-0 w-full h-full object-cover bg-white"
                                />
                            </AnimatePresence>
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
// import Link from "next/link";

// const poppins = Poppins({
//     subsets: ["latin"],
//     weight: ["400", "500", "600", "700", "800", "900"],
//     display: "swap",
// });

// const BootcampBanner = () => {
//     const containerRef = useRef(null);
//     const isInView = useInView(containerRef, { once: false, amount: 0.2 });

//     // Data mapping accurately synchronized with a.png text assets
//     const classData = {
//         imageSrc:"/images/todayclasstopic/am.png",
//         imageAlt: "Business Builder Bootcamp Masterclass Poster",
//         badge: "Saturday Live Class - 11:00 AM PST",
//         heading: (
//             <>
//                 Business Builder Bootcamp: <span className="text-primary block mt-1">Build, Structure & Scale Your Business the Right Way</span>
//             </>
//         ),
//         description: "Discover practical strategies for business formation, operations, funding readiness, branding, and sustainable growth during this comprehensive live session.",
//         benefits: [
//             "Saturday, June 13, 2026",
//             "Online Practical Webinar",
//             "Business Education Strategies",
//             "Streaming Live Across Social Platforms"
//         ],
//         ctaText: "Register Now",
//         ctaLink: "https://www.creditoracademy.com"
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

//                             <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary font-extrabold leading-[1.1] tracking-tight">
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

//                         {/* Interactive Action Button */}
//                         {/* <motion.div variants={itemVariants} className="mt-4">
//                             <Link
//                                 href={classData.ctaLink}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary hover:bg-primary/95 transition-all duration-200 rounded-sm shadow-lg shadow-primary/20 tracking-wide group"
//                             >
//                                 {classData.ctaText}
//                                 <svg
//                                     className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                 </svg>
//                             </Link>
//                         </motion.div> */}
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

// export default BootcampBanner;