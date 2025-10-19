"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, Variants, Transition } from "framer-motion";
import { gsap } from "gsap";
import {
  Building2,
  Handshake,
  Shield,
  Heart,
} from "lucide-react";

export default function CourseOverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [particlePositions, setParticlePositions] = useState<Array<{ left: number; top: number }>>([]);

  // Course description
  const description = "Operate Private teaches you how to live, build, and do business in the private sector. This course shows you how to use business trusts and private associations to protect assets, manage commerce, family legacy planning, and operate outside public jurisdiction—so you can create wealth, freedom, and sovereignty on your own terms.";
  
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
      if (particles.length > 0) {
        gsap.to(particles, {
          y: -40,
          opacity: 0,
          duration: 6,
          stagger: 0.2,
          repeat: -1,
          ease: "power1.out",
          delay: 1
        });
      }

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

  // Generate particle positions on client only to avoid SSR/CSR mismatch
  useEffect(() => {
    setParticlePositions(
      Array.from({ length: 15 }, () => ({ left: Math.random() * 100, top: Math.random() * 100 }))
    );
  }, []);

  // Start particle animation once particles are present
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (particlePositions.length === 0) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const particles = containerRef.current?.querySelectorAll(".particle") ?? [];
    if (particles.length === 0) return;

    const tween = gsap.to(particles, {
      y: -40,
      opacity: 0,
      duration: 6,
      stagger: 0.2,
      repeat: -1,
      ease: "power1.out",
      delay: 1
    });

    return () => { tween.kill(); };
  }, [particlePositions.length]);

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
    { icon: Building2, text: 'Business Trusts' },
    { icon: Handshake, text: 'Private Associations' },
    { icon: Shield, text: 'Asset Protection' },
    { icon: Heart, text: 'Family Legacy' }
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
      className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 md:px-6 py-12 md:py-16"
    >

      {/* Enhanced Ripple background */}
      <div ref={rippleRef} aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ripple absolute left-1/4 top-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), rgba(79,70,229,0.08) 40%, transparent 65%)' }} />
        <div className="ripple absolute right-1/4 top-1/4 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle at 60% 40%, rgba(79,70,229,0.22), rgba(99,102,241,0.06) 40%, transparent 70%)' }} />
        <div className="ripple absolute left-1/3 bottom-1/3 w-88 h-88 rounded-full" style={{ background: 'radial-gradient(circle at 40% 60%, rgba(99,102,241,0.18), rgba(79,70,229,0.04) 40%, transparent 72%)' }} />
      </div>

      {/* Floating particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-indigo-500/40"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced decorative blobs */}
      <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full blob bg-gradient-to-br from-blue-400/20 to-indigo-400/15 dark:from-indigo-700/25 dark:to-blue-600/20 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blob bg-gradient-to-br from-indigo-300/20 to-purple-300/12 dark:from-indigo-800/20 dark:to-purple-800/15 mix-blend-screen blur-3xl transform-gpu" />
      <div aria-hidden className="absolute top-1/4 -left-20 w-64 h-64 rounded-full blob bg-gradient-to-br from-blue-300/15 to-cyan-300/10 dark:from-blue-700/15 dark:to-cyan-600/10 mix-blend-screen blur-2xl transform-gpu" />

      <div className="mx-auto max-w-7xl flex flex-wrap gap-10 items-center relative z-10 p-0 md:p-0">
        {/* Embedded Drive Video */}
        <div className="flex-1 min-w-[18rem] max-w-3xl relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full aspect-video rounded-2xl relative overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://drive.google.com/file/d/1_x_eof3Q40gXfXepGAeMCEX98Dro6dIA/preview"
            allow="autoplay"
            allowFullScreen
            title="Course detail video"
            style={{ border: 0 }}
          />
          </div>
        </div>

        {/* Enhanced Course Description */}
        <div className="flex-1 min-w-[18rem] p-5 relative z-10">
          <motion.h2
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight relative inline-block"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600 dark:from-indigo-300 dark:to-blue-400">Course Overview</span>
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded"
            />
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="leading-relaxed text-base md:text-lg text-slate-700 dark:text-slate-300 mb-8"
          >
            {description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            transition={transition}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          >
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/70 dark:bg-slate-800/70 rounded-xl py-4 px-5 flex items-center gap-3 border border-indigo-100 dark:border-indigo-800/50 backdrop-blur-md shadow-sm"
                >
                  <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            transition={{ ...transition, delay: 0.6 }}
            className="mt-8"
          >
            {/* <motion.button 
              whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300"
            >
              Enroll Now
            </motion.button> */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}