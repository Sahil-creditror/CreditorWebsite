"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

interface HeroBannerProps {
  bannerimage: string;
  heading: string;
  desc: string;
  headingClass?: string;
  buttonPath?: string;
  buttonText?: string;
}

const Herobanner: React.FC<HeroBannerProps> = ({
  bannerimage,
  heading,
  desc,
  headingClass = "large-heading",
  buttonPath,
  buttonText = "Start Now",
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
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="flex flex-col gap-2 sm:gap-3 pb-10 sm:pb-14 xl:pb-16">

          {/* Logo (replaces previous description area) */}
   {/* Logo */}
<div className="flex justify-start ml-10 sm:ml-12 md:ml-14 lg:ml-16 mt-6 sm:mt-8 mb-2">
  <Image
    src="/images/logo/credi_logoo.png"
    alt="Creditor Logo"
    width={320}
    height={80}
    priority
    quality={85}
    className="object-contain 
               w-44 sm:w-52 md:w-64 lg:w-[300px]"
  />
</div>


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

export default Herobanner;
