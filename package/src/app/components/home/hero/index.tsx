"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";
import Link from "next/link";

interface VideoSlide {
  src: string;
  poster: string;
  title: string;
  description: string;
}

type Direction = "left" | "right";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>("right");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false); // start false, will flip when intersecting
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // intervalRef holds the interval id so we can clear it immediately when needed
  const intervalRef = useRef<number | null>(null);

  const videos: VideoSlide[] = [
    {
      src: "/video/hero-1.mp4",
      poster: "/images/hero/banner-1.png",
      title: "Creditor Academy",
      description: "Protect What You Build. Pass On What Matters",
    },
    {
      src: "/video/Banner.mp4",
      poster: "/images/hero/",
      title: "Masterclass Membership",
      description: "Reclaim Your Legal Identity and Exit the Public System",
    },
    // {
    //   src: "/video/hero-3.mp4",
    //   poster: "/images/hero/banner-3.png",
    //   title: "Creditor Academy",
    //   description: "Board as a Student. Land as a Sovereign.",
    // },
    // {
    //   src: "/video/hero-4.mp4",
    //   poster: "/images/hero/banner-4.png",
    //   title: "Creditor Academy",
    //   description: "Operate Private. Take Control. Live Sovereign",
    // },
    // {
    //   src: "/video/hero-5.mp4",
    //   poster: "/images/hero/banner-5.png",
    //   title: "Creditor Academy",
    //   description:
    //     "Restore Your Credit. Discharge Debt. Take Your Power Back.",
    // },
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

  const leafVariants: Variants = {
    spin: {
      rotate: 360,
      transition: { duration: 10, repeat: Infinity, ease: "linear" },
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
          // user came into view -> reset to first video and mark in-view
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
    // clear any previous interval before creating a new one
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isInView && !isHovered) {
      // start interval
      intervalRef.current = window.setInterval(() => {
        goToNext();
      }, 4000) as unknown as number; // cast for TS in browser env
    }

    // cleanup on dependency change / unmount
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
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        {...swipeHandlers}
      >
        {/* 🎥 Video Carousel */}
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
              <video
                className="absolute inset-0 w-full h-full object-cover"
                loop
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={videos[currentIndex].poster}
                key={videos[currentIndex].src}
              >
                <source src={videos[currentIndex].src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Parallax>
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-left pb-0 sm:pb-20">
          <motion.div
            className="flex flex-col gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            {/* Icon + Subtext */}
            <div className="flex items-start gap-3 md:gap-6">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
                variants={leafVariants}
                animate="spin"
              >
                <Image
                  src={"/images/Icon/primary-leaf.svg"}
                  alt="icon"
                  width={48}
                  height={48}
                  priority
                />
              </motion.div>
              <p className="text-white/80 max-w-md text-base sm:text-lg leading-relaxed">
                We empower individuals with{" "}
                <span className="text-primary font-semibold">
                  credit and financial mastery
                </span>{" "}
                to unlock lasting freedom and confidence.
              </p>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-3xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight">
              {videos[currentIndex].title}
            </h1>

            {/* 🔘 Button directly under the title */}
            <div className="mt-2">
              <Link
                href="/projects"
                className="group flex gap-4 items-center w-fit bg-primary border border-primary hover:border hover:border-white/30 hover:bg-secondary rounded-full transition-all duration-200 ease-in-out"
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
                  <g filter="url(#filter0_d_1_873)">
                    <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                    <path
                      d="M24 23H34M34 23V33M34 23L24 33"
                      stroke="#1F2A2E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_1_873"
                      x="0"
                      y="0"
                      width="58"
                      height="58"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="1" />
                      <feGaussianBlur stdDeviation="1.5" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_873"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_873"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </Link>
            </div>

            {/* Description */}
            <p className="text-base sm:text-xl text-white/80 max-w-xl sm:max-w-2xl leading-relaxed pb-8">
              {videos[currentIndex].description}
            </p>

            {/* 📱 Mobile Thumbnails */}
            {/* <div className="flex sm:hidden gap-2 mt-4 overflow-x-auto pb-2">
              {videos.map((video, index) => (
                <motion.button
                  key={index}
                  className={`w-20 h-12 rounded-lg overflow-hidden relative flex-shrink-0 shadow-md ${
                    index === currentIndex
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Thumbnail for ${video.title}`}
                >
                  <video
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-primary/25"
                      layoutId="activeThumbnail"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                </motion.button>
              ))}
            </div> */}
          </motion.div>
        </div>

        {/* ◀ Navigation Arrows ▶ */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200 hidden sm:block"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200 hidden sm:block"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 🔘 Indicators (bottom center) */}
        <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2 z-20">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-white/40"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* 💻 Desktop Thumbnails
        <div className="absolute right-2 sm:right-6 bottom-6 hidden sm:flex flex-col gap-3 z-20">
          {videos.map((video, index) => (
            <motion.button
              key={index}
              className={`w-24 h-14 rounded-lg overflow-hidden relative shadow-md ${
                index === currentIndex
                  ? "ring-2 ring-primary"
                  : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Thumbnail for ${video.title}`}
            >
              <video
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="metadata"
                poster={video.poster}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-primary/25"
                  layoutId="activeThumbnail"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </motion.button>
          ))}
        </div> */}
      </div>
    </ParallaxProvider>
  );
};

export default HeroSection;
