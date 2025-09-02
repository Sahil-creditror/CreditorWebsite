"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { gsap } from "gsap";

export default function CourseOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // --- GSAP ripple + blob animation ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Enhanced ripple effect
      const ripples = rippleRef.current?.querySelectorAll(".ripple") ?? [];
      gsap.set(ripples, { scale: 0, opacity: 0.6, transformOrigin: "50% 50%" });

      const rippleTl = gsap.timeline({ repeat: -1 });
      rippleTl.to(ripples, {
        scale: 2.8,
        opacity: 0,
        duration: 3.6,
        ease: "power1.out",
        stagger: 0.9
      });

      // Enhanced blob animation
      const blobs = containerRef.current?.querySelectorAll(".blob") ?? [];
      gsap.to(blobs, {
        y: "+=24",
        x: "+=16",
        rotation: "+=5",
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.5
      });

      // Particle animation
      const particles = containerRef.current?.querySelectorAll(".particle") ?? [];
      gsap.to(particles, {
        y: -40,
        opacity: 0,
        duration: 6,
        stagger: 0.2,
        repeat: -1,
        ease: "power1.out",
        delay: 1
      });

      // Section entrance animation
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.3
        }
      );

      return () => rippleTl.kill();
    });

    return () => mm.revert();
  }, []);

  // Play button animation
  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      gsap.to(videoRef.current, {
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(79, 70, 229, 0.4)",
        duration: 0.5
      });
      
      // Simulate video playing (in a real app, this would trigger actual video playback)
      setTimeout(() => {
        setIsPlaying(false);
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            scale: 1,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.5
          });
        }
      }, 3000);
    }
  };

  // --- Framer Motion Variants ---
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        when: "beforeChildren", 
        staggerChildren: 0.15,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const features = [
    { icon: '📜', text: 'Legal Status Correction' },
    { icon: '⚖️', text: 'Sovereignty Framework' },
    { icon: '🔐', text: 'Private Jurisdiction' },
    { icon: '🛡️', text: 'Asset Protection' }
  ];

  const transition: Transition = {
    duration: 0.65,
    ease: [0.43, 0.13, 0.23, 0.96]
  };

  return (
    <motion.section
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 shadow-xl border border-blue-100 dark:border-slate-700"
    >

      {/* Enhanced Ripple background */}
      <div ref={rippleRef} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ripple absolute left-1/4 top-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), rgba(79,70,229,0.08) 40%, transparent 65%)' }} />
        <div className="ripple absolute right-1/4 top-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(79,70,229,0.22), rgba(99,102,241,0.06) 40%, transparent 70%)' }} />
        <div className="ripple absolute left-1/3 bottom-1/3 w-88 h-88 rounded-full" style={{ background: 'radial-gradient(circle at 40% 60%, rgba(99,102,241,0.18), rgba(79,70,229,0.04) 40%, transparent 72%)' }} />
      </div>

      {/* Floating particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-indigo-500/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced decorative blobs */}
      <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blob bg-gradient-to-br from-blue-400/20 to-indigo-400/15 dark:from-indigo-700/25 dark:to-blue-600/20 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blob bg-gradient-to-br from-indigo-300/20 to-purple-300/12 dark:from-indigo-800/20 dark:to-purple-800/15 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blob bg-gradient-to-br from-blue-300/15 to-cyan-300/10 dark:from-blue-700/15 dark:to-cyan-600/10 mix-blend-screen blur-2xl transform-gpu" />

      <div className="flex flex-wrap gap-10 items-center relative z-10">
        {/* Enhanced Video Preview */}
        <motion.div 
          ref={videoRef}
          whileHover={{ scale: 1.01 }} 
          className="flex-1 min-w-[18rem] max-w-3xl relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
          onClick={handlePlay}
        >
          <div className="w-full aspect-video rounded-2xl relative overflow-hidden bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center text-white">
            <motion.div 
              initial={{ opacity: 0.15 }} 
              whileHover={{ opacity: 0.3 }} 
              transition={{ duration: 0.45 }} 
              className="absolute inset-0 mix-blend-overlay" 
              style={{ background: 'linear-gradient(45deg, rgba(79,70,229,0.18), rgba(99,102,241,0.12))' }} 
            />

            {!isPlaying ? (
              <motion.button 
                whileTap={{ scale: 0.96 }} 
                whileHover={{ scale: 1.08 }} 
                aria-label="Play course preview" 
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-24 h-24 bg-white/20 rounded-full"
                />
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30 transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5V19L19 12L8 5Z" fill="white" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">Preview this course</p>
                  <p className="text-sm opacity-80">2:34 min introduction</p>
                </div>
              </motion.button>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/30">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="6" y="6" width="4" height="12" fill="white" />
                    <rect x="14" y="6" width="4" height="12" fill="white" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">Playing preview...</p>
              </div>
            )}

            <div className="absolute w-48 h-48 bg-blue-500/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="absolute w-32 h-32 bg-indigo-400/15 rounded-full top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className="absolute w-40 h-40 bg-blue-400/10 rounded-full bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 z-0" />
          </div>
        </motion.div>

        {/* Enhanced Course Description */}
        <div className="flex-1 min-w-[18rem] p-5 relative z-10">
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800 dark:text-indigo-300 relative inline-block"
          >
            Course Overview
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "3.5rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded" 
            />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="leading-relaxed text-lg text-slate-700 dark:text-slate-300 mb-8"
          >
            Discover how the public system views you as a corporate fiction and learn how to correct your status.
            This foundational course equips you with the knowledge and legal framework to reclaim your identity and start living in the private.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-white/70 dark:bg-slate-800/70 rounded-xl py-4 px-5 flex items-center gap-3 border border-indigo-100 dark:border-indigo-800/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-indigo-800 dark:text-indigo-200">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.6 }}
            className="mt-8"
          >
            <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Enroll Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}