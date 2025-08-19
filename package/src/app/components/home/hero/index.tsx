"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";

interface VideoSlide {
  src: string;
  poster: string;
  title: string;
  description: string;
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const videos: VideoSlide[] = [
    {
      src: "/video/hero-1.mp4",
      poster: "/images/hero/banner-1.png",
      title: "Creditor Academy",
      description: "Protect What You Build. Pass On What Matters",
    },
    {
      src: "/video/hero-2.mp4",
      poster: "/images/hero/banner-2.png",
      title: "Creditor Academy",
      description: "\"When the people fear the government there is tyranny. When the government fears the people, there is liberty\" - Thomas Jefferson"
    },
    {
      src: "/video/hero-3.mp4",
      poster: "/images/hero/banner-3.png",
      title: "Creditor Academy",
      description: "Board as a Student. Land as a Sovereign.",
    },
    {
      src: "/video/hero-4.mp4",
      poster: "/images/hero/banner-4.png",
      title: "Creditor Academy",
      description: "Operate Private. Take Control. Live Sovereign",
    },
    {
      src: "/video/hero-5.mp4",
      poster: "/images/hero/banner-5.png",
      title: "Creditor Academy",
      description: "Restore Your Credit. Discharge Debt. Take Your Power Back.",
    },
  ];

  // ✅ Animation variants
  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.5, ease: "easeOut" },
    },
  };

  const leafVariants = {
    spin: {
      rotate: 360,
      transition: { duration: 10, repeat: Infinity, ease: "linear" },
    },
  };

  // ✅ Navigation
  const goToPrevious = (): void => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    resetInterval();
  };

  const goToNext = (): void => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    resetInterval();
  };

  const goToSlide = (slideIndex: number): void => {
    setDirection(slideIndex > currentIndex ? "right" : "left");
    setCurrentIndex(slideIndex);
    resetInterval();
  };

  const resetInterval = (): void => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isHovered) {
      intervalRef.current = setInterval(goToNext, 4000); // Changed to 4 seconds
    }
  };

  // ✅ Swipe gestures
  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(goToNext, 4000); // Changed to 4 seconds
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isHovered]);

  return (
    <ParallaxProvider>
      <div
        className="relative flex items-end text-white bg-black min-h-screen overflow-hidden"
        onMouseEnter={() => {
          setIsHovered(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          resetInterval();
        }}
        {...handlers}
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
        <div className="relative z-10 container mx-auto px-6 text-left pb-20">
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
          >
            {/* Icon + Subtext */}
            <div className="flex items-start gap-3 md:gap-6">
              <motion.div
                className="w-12 h-12 flex-shrink-0"
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
              <p className="text-white/80 max-w-md text-lg leading-relaxed">
                We empower individuals with{" "}
                <span className="text-primary font-semibold">
                  credit and financial mastery
                </span>{" "}
                to unlock lasting freedom and confidence.
              </p>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl xl:text-9xl font-extrabold tracking-tight leading-tight">
              {videos[currentIndex].title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
              {videos[currentIndex].description}
            </p>
          </motion.div>
        </div>

        {/* ◀ Navigation Arrows ▶ */}
        <motion.button
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md"
          onClick={goToPrevious}
          whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous video"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        <motion.button
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md"
          onClick={goToNext}
          whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next video"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>

        {/* 🔘 Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-7"
                  : "bg-white/30 w-3 hover:bg-white/50"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 📽 Thumbnails */}
        <div className="absolute right-6 bottom-8 flex flex-col gap-3 z-20">
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
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default HeroSection;