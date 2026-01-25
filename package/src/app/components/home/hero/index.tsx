"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay"; // Import the overlay

interface VideoSlide {
  src: string;
  poster: string;
  title: string;
  description: string;
  type?: "video" | "image";
}

type Direction = "left" | "right";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>("right");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false); // start false, will flip when intersecting
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // intervalRef holds the interval id so we can clear it immediately when needed
  const intervalRef = useRef<number | null>(null);

  const videos: VideoSlide[] = [
    {
      src: "",
      poster: "/images/hero/herobann.webp",
      title: "Become a Member",
      description: "Protect What You Build. Pass On What Matters",
      type: "image",
    },
  ];

  // animation variants (unchanged)
  const slideVariants: Variants = {
    enter: (direction: Direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (direction: Direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.5, ease: "easeOut" },
    },
  };

  // stable navigation functions
  const goToPrevious = useCallback((): void => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos.length]);

  const goToNext = useCallback((): void => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos.length]);

  const goToSlide = (slideIndex: number): void => {
    setDirection(slideIndex > currentIndex ? "right" : "left");
    setCurrentIndex(slideIndex);
  };

  // Intersection Observer: sets isInView and resets to first slide when entering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentIndex(0);
          setDirection("right");
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      observer.disconnect();
    };
  }, []);

  // Autoplay interval: runs only when in view and not hovered
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isInView && !isHovered) {
      intervalRef.current = window.setInterval(() => {
        goToNext();
      }, 4000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView, isHovered, goToNext]);

  // swipe handlers (unchanged)
  const { ref: _swipeRef, ...swipeHandlers } = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <ParallaxProvider>
      <div
        ref={sectionRef}
        className="relative flex items-end text-white bg-black min-h-screen overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...swipeHandlers}
      >
        {/* 🚀 LCP OPTIMIZATION: Static Background Layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/images/hero/Bannerhero.webp"
            alt="Hero Banner"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* 🎥 Video/Image Carousel */}
        <div className="hidden md:block absolute inset-0 w-full h-full z-1">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <Parallax speed={-20} style={{ height: "100%" }}>
                <div className="absolute inset-0 w-full h-full">
                  {videos[currentIndex].type === "image" ? (
                    <img
                      src={videos[currentIndex].poster}
                      alt={videos[currentIndex].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading={currentIndex === 0 ? "eager" : "lazy"}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 w-full h-full">
                        <img
                          src={videos[currentIndex].poster}
                          alt={videos[currentIndex].title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        loop
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                        poster={videos[currentIndex].poster}
                        key={videos[currentIndex].src}
                        style={{
                          width: "100%",
                          height: "100%",
                          zIndex: 2,
                          opacity: 0,
                          transition: "opacity 0.5s ease-in-out",
                        }}
                        onCanPlay={(e) => {
                          const video = e.currentTarget;
                          video.style.opacity = "1";
                        }}
                      >
                        <source src={videos[currentIndex].src} type="video/mp4" />
                      </video>
                    </>
                  )}
                </div>
              </Parallax>
              <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🔘 Get In Touch Button - Positioned top right below hamburger */}
        <div className="absolute top-28 right-4 sm:right-6 md:right-8 z-20">
          <button
            onClick={() => setShowContactForm(true)}
            className="group flex items-center gap-4 bg-neutral-900/80 hover:bg-neutral-800 border-2 border-white/10 hover:border-white/30 rounded-full pl-6 pr-3 py-2 text-white transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <span className="text-sm font-black uppercase tracking-widest whitespace-nowrap">
              Get In Touch
            </span>
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full group-hover:rotate-12 transition-transform duration-300 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F2A2E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-left pb-0 sm:pb-20">
          <motion.div
            className="flex flex-col gap-1 sm:gap-2"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            {/* Logo */}
            <div className="relative z-10 flex justify-center sm:justify-start ml-0 sm:ml-14 md:ml-16 lg:ml-20 mt-4 sm:mt-6">
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp/v1768883696/creditor-website-assets/images/logo/credi_logoo.webp"
                alt="Creditor Academy Logo"
                width={450}
                height={110}
                priority
                quality={85}
                className="object-contain w-52 sm:w-60 md:w-80 lg:w-[420px]"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-3xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
              {videos[currentIndex].title}
            </h1>

            {/* Start Now Button */}
            <div className="mt-2">
              <Link
                href="/projects"
                className="group flex gap-4 items-center w-fit bg-primary border border-primary hover:border-white/30 hover:bg-secondary rounded-full transition-all duration-200 ease-in-out"
              >
                <span className="pl-6 text-lg font-bold text-secondary group-hover:text-white group-hover:translate-x-12 transform transition-transform duration-200 ease-in-out">
                  Start Now
                </span>
                <svg
                  className="py-1 group-hover:-translate-x-37 group-hover:rotate-45 transition-all duration-300 ease-in-out"
                  width="58"
                  height="58"
                  viewBox="0 0 58 58"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                  <path
                    d="M24 23H34M34 23V33M34 23L24 33"
                    stroke="#1F2A2E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Description */}
            <p className="text-base sm:text-xl text-white/80 max-w-xl sm:max-w-2xl leading-relaxed pb-8">
              {videos[currentIndex].description}
            </p>
          </motion.div>
        </div>

        {/* ◀ Navigation Arrows ▶ */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200 hidden sm:block"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200 hidden sm:block"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>

        {/* 🔘 Indicators */}
        <div className="absolute left-0 right-0 bottom-4 hidden md:flex justify-center gap-2 z-20">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-white/40"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showContactForm && (
          <HeroContactOverlay onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </ParallaxProvider>
  );
};

export default HeroSection;
