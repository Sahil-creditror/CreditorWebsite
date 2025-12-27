"use client";

import Image from "next/image";

export default function LearningSection() {
  const learningPoints = [
    {
      secret: "SECRET #1",
      title: "Status and Standing",
      description:
        "Learn what it actually means to become private—how the public system defines you by default, how private people think about status, capacity, and positioning, and the lawful framework we teach so you can move with clarity, confidence, and control.",
      image: "/images/webinar/3.webp",
    },
    {
      secret: "SECRET #2",
      title: "The Private Operating System",
      description:
        "Discover the core structures of private operation—how business trusts and private associations are used to create separation, privacy, and protection in commerce, assets, and family legacy planning, so your life and business stop being exposed to the public world's rules by default.",
      image: "/images/webinar/2.webp",
    },
    {
      secret: "SECRET #3",
      title: "Financial Freedom",
      description:
        "Learn how to build real financial leverage the private way—strengthening personal credit fundamentals, building elite business credit with an unincorporated business trust strategy, and setting up private merchant processing so you can run transactions cleanly, scale smoothly, and operate like a serious private enterprise.",
      image: "/images/webinar/1.webp",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white text-gray-900 dark:bg-[#1a1f2e] dark:text-white overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Host Introduction */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-bold text-[#3b82f6] dark:text-[#d19b3a] mb-4">
              Your Host: Paulmichael Rowland
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 italic">
              The man debt collectors HATE to see on the other side of a lawsuit.
            </p>
          </div>

          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              In This FREE Webclass Paulmichael Will Expose:
            </h2>

            {/* Separator with circle */}
            <div className="flex items-center justify-center">
              <div className="flex-1 h-px bg-[#3b82f6] dark:bg-[#3b82f6] max-w-[200px]" />
              <div className="w-3 h-3 rounded-full bg-[#3b82f6] dark:bg-[#3b82f6] mx-4" />
              <div className="flex-1 h-px bg-[#3b82f6] dark:bg-[#3b82f6] max-w-[200px]" />
            </div>
          </div>

          {/* Three Learning Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {learningPoints.map((point, index) => (
              <div key={index} className="flex flex-col items-center h-full">
                {/* Laptop Display */}
                <div className="relative w-full max-w-[400px] mb-6">
                  <div className="relative aspect-video bg-gray-900 rounded-t-lg overflow-hidden shadow-2xl">
                    {/* Laptop screen bezel */}
                    <div className="absolute inset-0 border-8 border-gray-800 rounded-t-lg pointer-events-none" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gray-800 rounded-b-lg" />
                    
                    {/* Screen content */}
                    <div className="relative w-full h-full bg-gray-900">
                      <Image
                        src={point.image}
                        alt={point.secret}
                        fill
                        style={{ objectFit: "cover" }}
                        className="opacity-95"
                      />
                      {/* Overlay text */}
                      <div className="absolute bottom-6 left-6">
                        <span className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-2xl">
                          {point.secret}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Laptop base */}
                  <div className="h-2 bg-gray-800 rounded-b-lg mx-auto w-[95%]" />
                  <div className="h-1 bg-gray-700 rounded-b-lg mx-auto w-[90%]" />
                </div>

                {/* Description Card - Fixed Height */}
                <div className="w-full bg-white dark:bg-[#0f1419] rounded-lg shadow-xl p-6 md:p-8 border-b-4 border-[#3b82f6] dark:border-[#3b82f6] flex flex-col flex-grow min-h-[200px]">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {point.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

