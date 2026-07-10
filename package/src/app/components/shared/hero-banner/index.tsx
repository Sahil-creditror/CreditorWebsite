"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

interface HeroBannerProps {
  heading: string;
  desc: string;
  headingClass?: string;
  buttonPath?: string;
  buttonText?: string;
}

export const Herobanner: React.FC<HeroBannerProps> = ({
  heading,
  desc,
  headingClass = "text-4xl sm:text-5xl md:text-6xl",
  buttonPath,
  buttonText = "Start Now",
}) => {
  const pathname = usePathname();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parses <span> tags in description to apply the aesthetic yellow color accent
  const renderDescription = (text: string) => {
    const parts = text.split(/(<span>.*?<\/span>)/g);
    return parts.map((part, index) => {
      if (part.startsWith("<span>") && part.endsWith("</span>")) {
        const cleanText = part.replace(/<\/?span>/g, "");
        return (
          <span key={index} className="text-yellow-400 font-semibold">
            {cleanText}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section className="relative flex items-center text-white bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 min-h-[40vh] sm:min-h-[50vh] py-16 overflow-hidden pt-28">
      
      {/* Decorative subtle background glow element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-20 layout-container">
        <div className="max-w-4xl flex flex-col gap-6">
          
         

          {/* Main Heading */}
          <h1 className={`${headingClass} font-bold tracking-tight leading-tight text-white`}>
            {heading}
          </h1>

          {/* Clean Description */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed tracking-wide">
            {renderDescription(desc)}
          </p>

          {/* Action Button */}
          {buttonPath && (
            <div className="mt-4">
              <Link
                href={buttonPath}
                aria-label={`Maps to ${heading}`}
                className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-md transition-all duration-200 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 tracking-wide text-sm uppercase"
              >
                {buttonText}
                <Icon icon="solar:arrow-right-up-linear" width="18" height="18" className="stroke-[2.5]" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};