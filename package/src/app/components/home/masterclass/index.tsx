"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const MasterclassSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          src="/video/Banner.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/30" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 h-full flex flex-col justify-center"
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-12 w-full">
          
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 0.77, 0.47, 0.97],
                    },
                  }
                : {}
            }
            className="flex flex-col gap-5 w-full md:w-1/2"
          >
            {/* Tagline */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? { opacity: 1, transition: { delay: 0.2 } }
                  : {}
              }
            >
              <motion.span
                className="bg-primary py-1 px-2 sm:py-1.5 sm:px-3 text-xs sm:text-sm font-medium rounded-full text-white"
                initial={{ scale: 0 }}
                animate={
                  inView
                    ? {
                        scale: 1,
                        transition: { type: "spring", stiffness: 500, damping: 15 },
                      }
                    : {}
                }
              >
                03
              </motion.span>
              <motion.div
                className="h-px w-12 sm:w-16 bg-white/20"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1, transition: { delay: 0.3 } } : {}}
              />
              <motion.p
                className="text-xs sm:text-sm font-medium text-white bg-white/10 py-1 px-3 sm:py-1.5 sm:px-4 rounded-full backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  inView
                    ? { y: 0, opacity: 1, transition: { delay: 0.4 } }
                    : {}
                }
              >
                About Creditor
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }
                  : {}
              }
              className="space-y-5 sm:space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Private
                </span>{" "}
                Business Solution
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-md">
                Discover how to legally establish your private business framework and reclaim your financial sovereignty through proven strategies.
              </p>
              <ul className="space-y-3 text-white/80 text-sm sm:text-base">
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Asset protection strategies
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Legal entity structuring
                </li>
                <li className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Financial privacy techniques
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
<motion.div
  className="w-full md:w-1/2 flex flex-col items-start md:items-end"
  initial={{ opacity: 0, y: 50 }}
  animate={
    inView
      ? { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }
      : {}
  }
>
  <div className="w-full text-left md:text-right space-y-5 sm:space-y-6">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight sm:leading-none">
      PRIVATE <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
        BUSINESS
      </span>{" "}
      <br />
      LAUNCHPAD
    </h1>

    <motion.p
      className="text-base sm:text-lg md:text-xl text-white/80 max-w-sm md:max-w-md md:ml-auto"
      initial={{ opacity: 0 }}
      animate={
        inView
          ? { opacity: 1, transition: { delay: 0.8, duration: 0.8 } }
          : {}
      }
    >
      Reclaim Your Legal Identity and Exit the Public System
    </motion.p>

    <motion.div
      className="pt-2 sm:pt-4"
      initial={{ opacity: 0 }}
      animate={
        inView
          ? { opacity: 1, transition: { delay: 1, duration: 0.8 } }
          : {}
      }
    >
      {/* Row ensures the button aligns right on md+ */}
      <div className="flex justify-end w-full">
        <Link
          href="/projects"
          className="group flex gap-4 items-center w-fit bg-primary border border-primary hover:border hover:border-white/30 hover:bg-secondary rounded-full transition-all duration-200 ease-in-out"
        >
          <span className="pl-6 text-lg font-bold text-secondary group-hover:text-white group-hover:translate-x-12 transform transition-transform duration-200 ease-in-out">
            Learn More
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
    </motion.div>
  </div>
</motion.div>

        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={
            inView
              ? { opacity: 1, y: 0, transition: { delay: 1.5, duration: 0.8 } }
              : {}
          }
        >
          <p className="text-xs sm:text-sm text-white/50 mb-1 sm:mb-2">Scroll to explore</p>
          <div className="w-4 sm:w-5 h-7 sm:h-8 rounded-full border-2 border-white/30 relative">
            <motion.div
              className="w-1 h-2 bg-white rounded-full absolute top-1 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MasterclassSection;
