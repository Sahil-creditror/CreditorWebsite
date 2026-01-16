"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel, Card } from "../components/apple";

// ------------------------
// Feature Icons
// ------------------------
const featureIcons = {
  Design: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  Performance: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Product: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Integrations: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Security: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  Support: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
};

// ------------------------
// Enhanced Dummy content for Carousel
// ------------------------
const DummyContent = ({ category }: { category: string }) => {
  const benefits = [
    "Professional design tailored to your brand",
    "Fully responsive across all devices",
    "Optimized for speed and performance",
    "SEO-friendly structure and content",
  ];

  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => (
        <motion.div
          key={"dummy-content" + index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 p-6 sm:p-8 md:p-12 rounded-3xl mb-6 shadow-lg ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 opacity-20 blur-3xl dark:opacity-10 animate-pulse" aria-hidden="true" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700 opacity-20 blur-3xl dark:opacity-10 animate-pulse" style={{ animationDelay: "1s" }} aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 mb-4">
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
                  {category}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent">
                  Beautifully crafted experiences.
                </span>
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Create, iterate, and launch faster with components built for performance and accessibility. Organize ideas, document progress, and present with confidence.
              </p>

              <ul className="space-y-3 mb-6">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  aria-label="Explore feature details"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5">
                    <path fillRule="evenodd" d="M4.5 12a.75.75 0 0 1 .75-.75h11.69l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H5.25A.75.75 0 0 1 4.5 12Z" clipRule="evenodd" />
                  </svg>
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm md:text-base font-semibold text-gray-700 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400"
                >
                  Contact sales
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 blur-2xl" />
                <Image
                  src="https://assets.aceternity.com/macbook.png"
                  alt="Product mockup on a laptop"
                  height={500}
                  width={500}
                  loading="lazy"
                  className="relative h-full w-full max-h-72 md:max-h-96 object-contain mx-auto drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

// ------------------------
// Enhanced Carousel data with icons
// ------------------------
const carouselData = [
  {
    category: "Design",
    title: "Custom Website Design & Branding",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Design,
    gradient: "from-blue-500 to-blue-600",
    content: <DummyContent category="Design" />,
  },
  {
    category: "Performance",
    title: "Fast, Mobile-Responsive Websites",
    src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Performance,
    gradient: "from-blue-600 to-blue-700",
    content: <DummyContent category="Performance" />,
  },
  {
    category: "Product",
    title: "Optimized for Search Engines (SEO)",
    src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Product,
    gradient: "from-blue-500 to-blue-700",
    content: <DummyContent category="Product" />,
  },
  {
    category: "Integrations",
    title: "Seamless Tool & API Integrations",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Integrations,
    gradient: "from-blue-600 to-blue-800",
    content: <DummyContent category="Integrations" />,
  },
  {
    category: "Security",
    title: "Enterprise-Grade Security & Backups",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Security,
    gradient: "from-blue-700 to-blue-900",
    content: <DummyContent category="Security" />,
  },
  {
    category: "Support",
    title: "Ongoing Maintenance & Support",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3",
    icon: featureIcons.Support,
    gradient: "from-blue-500 to-blue-800",
    content: <DummyContent category="Support" />,
  },
];

// ------------------------
// Redesigned CardsCarousel component
// ------------------------
export function CardsCarouselSection() {
  const cards = carouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="relative w-full py-24 sm:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Enhanced background effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 via-blue-500/30 to-blue-600/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-500/30 via-blue-600/30 to-blue-700/30 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-400/10 via-blue-500/10 to-blue-600/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced header section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          
          <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how our tools help you build, optimize, and grow faster with delightful UX and cutting-edge technology.
          </p>
        </motion.div>

        {/* Carousel section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-12"
        >
          <Carousel items={cards} />
        </motion.div>
      </div>
    </section>
  );
}

