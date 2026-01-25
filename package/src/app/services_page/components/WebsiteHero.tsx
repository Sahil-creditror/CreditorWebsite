"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const img1 = "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883800/creditor-website-assets/images/pricing/Cover-2.jpg";

export function HeroSectionOne() {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 350);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative w-full bg-cover bg-center py-20 md:py-40"
      style={{
        backgroundImage: `url(${img1})`,
      }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>

      {/* Back Button */}
      <AnimatePresence>
        {!sticky && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed top-5 left-5 sm:top-8 sm:left-10 z-[70]"
          >
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-white hover:text-blue-600 dark:hover:text-blue-600 transition-all duration-300 group shadow-lg"
            >
              <Icon
                icon="solar:alt-arrow-left-linear"
                width="20"
                height="20"
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Back</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-center px-4">
        <div className="relative w-full max-w-5xl">
          <h1 className="text-left text-2xl md:text-4xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {"Launch Your Private Dream Website Today"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="mt-4 max-w-3xl text-left text-lg font-normal text-white/90 leading-relaxed"
          >
            Elevate your brand with a stunning, high-performance website designed for success.
          </motion.p>
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg bg-black/80 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800/90">
            Purchase Now
          </button>
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white/90 px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100/90">
            Contact Support
          </button>
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="mt-20 w-full rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
            <img
              src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883906/creditor-website-assets/images/services/Webhero.webp"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
