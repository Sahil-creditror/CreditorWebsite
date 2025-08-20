"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";

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
  const [isInView, setIsInView] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      description:
        '"When the people fear the government there is tyranny. When the government fears the people, there is liberty" - Thomas Jefferson',
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
      description:
        "Restore Your Credit. Discharge Debt. Take Your Power Back.",
    },
  ];

  // ✅ Animation variants
  const slideVariants: Variants = {
    enter: (direction: Direction) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (direction: Direction) => ({
      x: direction === "right" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
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
    if (!isHovered && isInView) {
      intervalRef.current = setInterval(goToNext, 4000);
    }
  };

  // ✅ Swipe gestures
  const { ref: _swipeRef, ...swipeHandlers } = useSwipeable({
    onSwipedLeft: () => goToNext(),
    onSwipedRight: () => goToPrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // ✅ Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting) {
          resetInterval();
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ✅ Effect for auto-play
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isHovered && isInView) {
      intervalRef.current = setInterval(goToNext, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex, isHovered, isInView]);

  return (
    <ParallaxProvider>
      <div
        ref={sectionRef}
        className="relative flex items-end text-white bg-black min-h-screen overflow-hidden"
        onMouseEnter={() => {
          setIsHovered(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          resetInterval();
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
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-left pb-10 sm:pb-20">
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
            <h1 className="text-3xl sm:text-5xl md:text-7xl xl:text-9xl font-extrabold tracking-tight leading-tight">
              {videos[currentIndex].title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-xl text-white/80 max-w-xl sm:max-w-2xl leading-relaxed">
              {videos[currentIndex].description}
            </p>

            {/* 📱 Mobile Thumbnails (under description) */}
            <div className="flex sm:hidden gap-2 mt-4 overflow-x-auto pb-2">
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
            </div>
          </motion.div>
        </div>

        {/* ◀ Navigation Arrows ▶ */}
        {/* (unchanged) */}

        {/* 🔘 Indicators */}
        {/* (unchanged) */}

        {/* 💻 Desktop Thumbnails (bottom-right, vertical) */}
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
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default HeroSection;
