"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function PrivateTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-8 md:py-10 lg:py-12 bg-lightgray dark:bg-secondary overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
          
          {/* Centered Heading */}
          <div
            className={`text-center transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            <p className="text-sm sm:text-base text-primary dark:text-primary/80 font-medium tracking-wider uppercase mb-2 md:mb-4">
              They Never Taught You This…
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary dark:text-white leading-tight">
              Most people operate publicly.
              <br />
              <span className="text-primary dark:text-primary">A few operate privately.</span>
            </h2>
          </div>

          {/* Two Column Layout - Image Left, Content Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative aspect-[1/1] rounded-2xl overflow-hidden shadow-2xl bg-secondary dark:bg-darkblack">
                <Image
                  src="/images/avatar/paul.webp"
                  alt="Private Operation"
                  fill
                  className="object-cover"
                  loading="lazy"
                  quality={85}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent dark:from-secondary/70" />
                <div className="absolute top-4 left-4 bg-primary text-white dark:text-secondary px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  Exclusive
                </div>
              </div>
            </div>

            {/* Right Column - All Content */}
            <div
              className={`space-y-6 transition-all duration-1000 ease-out delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
            >
              <div className="relative py-2">
                <p className="text-lg sm:text-xl md:text-2xl text-secondary/70 dark:text-white/70 font-medium italic">
                  The difference?
                </p>
                <div className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-primary to-primary/50 dark:from-primary dark:to-primary/70 rounded-full" />
              </div>
              
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary dark:text-primary tracking-wide">
                Control. Protection. Positioning.
              </p>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary dark:text-white tracking-[0.05em] md:tracking-[0.1em] leading-tight">
                BECOME & OPERATE PRIVATE
              </h1>
              
              <div className="space-y-4 pt-2">
                {/* Coming Soon Badge - Attention Grabbing */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary via-primary/90 to-primary rounded-full shadow-lg animate-pulse">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Launching Soon
                  </span>
                </div>

                {/* Free for Limited Time Badge - Attention Grabbing */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 via-green-600 to-green-500 rounded-full shadow-xl border-2 border-green-400/50">
                  <span className="text-lg font-bold">🎁</span>
                  <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    Going to Completely Free for a Limited Time
                  </span>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-black/70 dark:text-white/60 font-light">
                  Something exclusive is launching soon.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-black/70 dark:text-white/60 font-light">
                  Only for those ready for change.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div
            className={`text-center pt-2 md:pt-3 transition-all duration-1000 ease-out delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/contact"
              className="inline-block px-8 md:px-12 py-3 md:py-4 text-sm sm:text-base md:text-lg font-bold text-white bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl tracking-wider uppercase"
              aria-label="Know More"
            >
              Know More
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PrivateTeaser;
