"use client";

import Image from "next/image";

export default function LearningSection() {
  const learningPoints = [
    {
      secret: "SECRET #1",
      title: "SECRET #1",
      description:
        "How To Find People Who Are More Than Willing To Pay You, And Land Clients Within 24 Hours, Even If You Have ZERO Experience...",
      image: "/images/squeeze/webex.jpeg",
    },
    {
      secret: "SECRET #2",
      title: "SECRET #2",
      description:
        'How To Use Our Step-By-Step "Dispute Process Blueprint" To Get EASY Credit Repair Results Without Being A Credit Expert...',
      image: "/images/squeeze/webex.jpeg",
    },
    {
      secret: "SECRET #3",
      title: "SECRET #3",
      description:
        "How To Scale Using Our Easy-To-Follow Process To Bring In A Flood Of New Customers, Without Paying For Advertising...",
      image: "/images/squeeze/webex.jpeg",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 bg-white text-gray-900 dark:bg-[#0f1419] dark:text-white">
      <div className="container mx-auto px-6">
        {/* Host Introduction */}
        <div className="text-center mb-8">
          <p className="text-xl md:text-2xl font-semibold text-[#b87b1f] dark:text-[#d19b3a] mb-6">
            Presenting Your Host: Daniel Rosen
          </p>

          {/* As Seen On Banner */}
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              As Seen On
            </h2>
            <div className="inline-flex items-center gap-6 md:gap-8 px-8 py-4 bg-gray-100 dark:bg-[#0f1419] rounded-xl shadow-md">
              <span className="text-gray-700 dark:text-gray-300 font-bold text-lg md:text-xl tracking-tight">
                abc
              </span>
              <span className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
              <span className="text-gray-700 dark:text-gray-300 font-bold text-lg md:text-xl tracking-tight">
                CBSO
              </span>
              <span className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
              <span className="text-gray-700 dark:text-gray-300 font-bold text-lg md:text-xl tracking-tight">
                NBC
              </span>
              <span className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
              <span className="text-gray-700 dark:text-gray-300 font-bold text-lg md:text-xl tracking-tight">
                Inc. 5000
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            What You Will Learn On This FREE Webclass:
          </h2>

          {/* Separator with circle */}
          <div className="flex items-center justify-center">
            <div className="flex-1 h-px bg-[#b87b1f] dark:bg-[#d19b3a] max-w-[200px]" />
            <div className="w-3 h-3 rounded-full bg-[#b87b1f] dark:bg-[#d19b3a] mx-4" />
            <div className="flex-1 h-px bg-[#b87b1f] dark:bg-[#d19b3a] max-w-[200px]" />
          </div>
        </div>

        {/* Three Learning Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {learningPoints.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
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

              {/* Description Card */}
              <div className="w-full bg-white dark:bg-[#0f1419] rounded-lg shadow-xl p-6 md:p-8 border-b-4 border-[#b87b1f] dark:border-[#d19b3a]">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {point.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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

