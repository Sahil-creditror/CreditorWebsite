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
            <div className="text-left md:text-right space-y-5 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight sm:leading-none">
                PRIVATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                  BUSINESS
                </span>{" "}
                <br />
                LAUNCHPAD
              </h1>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-sm md:max-w-md ml-0 md:ml-auto"
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
                <Link href="/membership">
                  <button className="relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white">
                    <span className="flex items-center gap-2">
                      LEARN MORE
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
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
