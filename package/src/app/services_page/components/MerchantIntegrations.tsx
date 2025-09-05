"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type IntegrationCard = {
  title: string;
  description: string;
  image: string;
};

const defaultCards: IntegrationCard[] = [
  {
    title: "Private Merchant Accounts",
    description:
      "You're not renting access to a third-party processor. Operate through your own secure, fully underwritten account.",
    image: "/images/home/services/services_1.webp",
  },
  {
    title: "Full Shopify Integration",
    description:
      "Our platform syncs with Shopify, WooCommerce, and other major platforms while keeping your data in your hands.",
    image: "/images/home/services/services_2.webp",
  },
  {
    title: "No Freezes, No Holds",
    description:
      "We aren't Stripe. We aren't PayPal. You won't wake up one day with your funds frozen.",
    image: "/images/home/services/services_3.webp",
  },
  {
    title: "Total Privacy & Security",
    description:
      "Encrypted payment flows, fraud prevention, and private settlement rails by design.",
    image: "/images/home/services/services_4.webp",
  },
  {
    title: "Flexible Settlement Options",
    description:
      "Card, ACH, and alternative rails with configurable settlement schedules for cash-flow control.",
    image: "/images/pricing/Cover-3.jpg",
  },
];

export default function MerchantIntegrations({ cards = defaultCards }: { cards?: IntegrationCard[] }) {
  const [visibleCards, setVisibleCards] = useState(3);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollContainerRef = (node: HTMLDivElement) => {
    if (node) {
      setMaxScroll(node.scrollWidth - node.clientWidth);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollLeft);
  };

  const scrollTo = (direction: 'left' | 'right') => {
    const container = document.getElementById('cards-container');
    if (container) {
      const scrollAmount = 320; // Approximate card width + gap
      const newPosition = direction === 'right' 
        ? Math.min(scrollPosition + scrollAmount, maxScroll)
        : Math.max(scrollPosition - scrollAmount, 0);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-600 text-white text-sm font-semibold py-1 px-3 rounded-full">02</span>
            <div className="h-px w-12 bg-gray-300 dark:bg-gray-700" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 py-1.5 px-4 rounded-full">
              Why Choose Creditor Academy?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Powerful Integrations for Your Business
          </h2>
        </div>

        <div className="relative">
          {/* Navigation arrows for larger screens */}
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
            id="cards-container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide gap-6 scroll-smooth"
          >
            {cards.map((c, idx) => (
              <div
                key={`${c.title}-${idx}`}
                className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] 2xl:w-[calc(20%-1.5rem)] snap-start group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-900/50"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image 
                    src={c.image} 
                    alt={c.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {c.description}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator for mobile */}
          <div className="flex justify-center mt-4 lg:hidden">
            <div className="flex space-x-2">
              {cards.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${Math.floor(scrollPosition / 320) === idx ? 'bg-blue-600 w-4' : 'bg-gray-300 dark:bg-gray-700'}`}
                ></div>
              ))}
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