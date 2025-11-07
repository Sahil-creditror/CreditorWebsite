"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface HeroBannerWithTagProps {
  bannerimage: string;
  heading: string;
  desc: string;
  headingClass?: string;
  buttonPath?: string;
  buttonText?: string;
  badgeNumber?: string;
  badgeText?: string;
}

const HerobannerWithTag: React.FC<HeroBannerWithTagProps> = ({
  bannerimage,
  heading,
  desc,
  headingClass = "large-heading",
  buttonPath,
  buttonText = "Start Now",
  badgeNumber,
  badgeText,
}) => {
  const splitDesc = desc.split(/<\/?span>/);

  // For button animation
  const btnRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(btnRef, { once: true, amount: 0.25 });

  return (
    <section className="relative flex items-end text-white bg-black h-[70vh] bg-fixed sm:h-[80vh] max-h-[450px]">
      {/* Background image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero background"
        src={bannerimage}
        height={694}
        width={1800}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Top Badge (tag) */}
      {(badgeNumber || badgeText) && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full px-4">
          <div className="container mx-auto">
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              {badgeNumber && (
                <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                  {badgeNumber}
                </span>
              )}
              <div className="h-px w-16 bg-white/30" />
              {badgeText && (
                <p className="section-bedge py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm">
                  {badgeText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col gap-4 sm:gap-6 pb-10 sm:pb-16 xl:pb-20">
          {/* Logo (replaces previous description area) */}
          <div className="flex items-start">
            <Image
              src="/images/logo/creditorlogo.webp"
              alt="Creditor Logo"
              width={600}
              height={120}
              priority
            />
          </div>
          {/* Description
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src={"/images/Icon/primary-leaf.svg"}
                alt="icon"
                width={44}
                height={44}
                className="animate-spin"
              />
            </div>
            <p className="text-white/80 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">
              {splitDesc[0]}
              <span className="text-primary">{splitDesc[1]}</span>
              {splitDesc[2]}
            </p>
          </div> */}

          {/* Heading + Button Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1
              className={`${headingClass} text-2xl sm:text-4xl md:text-5xl font-bold`}
            >
              {heading}
            </h1>

            {buttonPath && (
              <motion.div
                ref={btnRef}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href={buttonPath}
                  aria-label={`Navigate to ${heading}`}
                  className="group flex items-center w-fit bg-primary border border-primary hover:border-white/30 hover:bg-secondary rounded-full transition-all duration-300 ease-in-out overflow-hidden"
                >
                  <span className="pl-6 pr-2 py-3 text-lg font-bold text-secondary group-hover:text-white whitespace-nowrap transition-all duration-300 ease-in-out group-hover:translate-x-2">
                    {buttonText}
                  </span>
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full m-1 transition-all duration-300 ease-in-out group-hover:rotate-45">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 17L17 7M17 7H7M17 7V17"
                        stroke="#1F2A2E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HerobannerWithTag;


