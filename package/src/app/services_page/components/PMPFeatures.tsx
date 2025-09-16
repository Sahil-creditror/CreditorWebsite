"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type IntegrationCard = {
  title: string;
  description: string;
  image: string;
};

const defaultCards: IntegrationCard[] = [
  {
    title: "POS & Gateway Options",
    description:
      "EMV-compliant terminals, mobile readers, and online gateways.",
    image: "/images/services/PMP1.webp",
  },
  {
    title: "Fraud & Chargeback Protection",
    description:
      "Real-time monitoring and dispute support.",
    image: "/images/services/PMP2.webp",
  },
  {
    title: "PCI & EMV Compliant",
    description:
      "Security built into every account.",
    image: "/images/services/PMP3.webp",
  },
  {
    title: "Multi-Currency Settlement",
    description:
      "Process payments worldwide and settle in your preferred currency.",
    image: "/images/services/PMP4.webp",
  },
  {
    title: "Detailed Reporting",
    description:
      "Merchant statements, analytics, and dashboards.",
    image: "/images/services/PMP5.webp",
  },
];

export default function PMPFeatures({ cards = defaultCards }: { cards?: IntegrationCard[] }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // per-card styles
  const badgeColors = [
    "#2563eb", // blue
    "#7c3aed", // purple
    "#059669", // emerald
    "#ea580c", // orange
    "#9333ea", // violet
  ];
  const gradientClasses = [
    "from-blue-500 to-blue-600",
    "from-purple-500 to-purple-600",
    "from-emerald-500 to-emerald-600",
    "from-orange-500 to-orange-600",
    "from-indigo-500 to-indigo-600",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    const calculateMetrics = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
      }
    };

    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);

    return () => {
      window.removeEventListener('resize', calculateMetrics);
    };
  }, [isMounted, cards]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      const newPosition = direction === 'right' 
        ? Math.min(scrollPosition + scrollAmount, maxScroll)
        : Math.max(scrollPosition - scrollAmount, 0);
      
      containerRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-12">
          {/* <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-full">02</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 py-1.5 px-4 rounded-full">
              Why Choose Creditor Academy?
            </span>
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
            Features of a Private Merchant Account
          </h2>
        </div>

        <div className="relative">
          {maxScroll > 0 && (
            <>
              <button 
                onClick={() => scrollTo('left')}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 transition-opacity ${scrollPosition === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                disabled={scrollPosition === 0}
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => scrollTo('right')}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 transition-opacity ${scrollPosition >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                disabled={scrollPosition >= maxScroll}
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide gap-6 scroll-smooth"
          >
            {cards.map((c, idx) => (
              <div
                key={`${c.title}-${idx}`}
                className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] snap-start group relative"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-all duration-300 h-full flex flex-col">
                  {/* Image section */}
                  <div className="relative h-44 overflow-hidden">
                    <Image src={c.image} alt={c.title} fill className="object-cover" />
                  </div>

                  {/* Overlay icon */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-36 w-14 h-14 rounded-lg flex items-center justify-center shadow-md"
                    style={{ backgroundColor: badgeColors[idx % badgeColors.length], boxShadow: `${badgeColors[idx % badgeColors.length]}55 0px 6px 18px` }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="px-4 pt-10 pb-6 text-center mt-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">
                      {c.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                      {c.description}
                    </p>
                    <div className="mt-4" />
                  </div>

                  {/* Gradient accent */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradientClasses[idx % gradientClasses.length]}`}></div>
                </div>

                {/* Floating effect background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[idx % gradientClasses.length]} rounded-xl opacity-20 blur-md transition-opacity duration-300 -z-10 translate-y-4`} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex space-x-2">
              {cards.map((_, idx) => {
                const cardWidth = containerRef.current ? (containerRef.current.scrollWidth / cards.length) : 320;
                const activeIndex = Math.round(scrollPosition / cardWidth);
                return (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-all ${activeIndex === idx ? 'bg-blue-600 w-4' : 'bg-gray-300 dark:bg-gray-700'}`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
