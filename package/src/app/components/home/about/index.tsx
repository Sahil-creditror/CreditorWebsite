"use client";
import Image from "next/image";
import { useCallback, useState } from "react";

// Removed GSAP and framer-motion

function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Handle video modal
  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }, []);


  return (
    <section className="relative py-10 md:py-20 dark:bg-darkblue overflow-hidden">
      {/* Christmas bell in top right corner */}
      <div className="absolute top-0 right-0 z-20 pointer-events-none">
        <Image
          src="/images/hero/bell.png"
          alt="Christmas Bell"
          width={200}
          height={200}
          priority
          className="w-32 md:w-44 lg:w-52 h-auto drop-shadow-xl select-none "
        />
      </div>

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="animated-gradient absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            background:
              "linear-gradient(270deg, #ff00cc, #3333ff, #00ccff, #33cc33)",
            backgroundSize: "800% 800%"
          }}
        />
      </div>

      <div className="container section-content relative z-10">
        <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-18">
          {/* Left Side */}
          <div className="flex flex-col gap-5 2xl:gap-7 w-full 2xl:max-w-2xl 2xl:w-full">
            {/* Heading + Paragraph */}
            <div className="flex flex-col gap-5 2xl:gap-7">
            <h2 className="relative inline-block 2xl:max-w-3xl text-secondary dark:text-white">
              <Image
                src="/images/hero/hat.png"
                alt="Christmas Hat"
                width={80}
                height={200}
                priority
                className="absolute -top-3 -left-7 md:-top-5 md:-left-8 lg:-top-6 lg:-left-9 w-14 md:w-18 lg:w-20 h-auto drop-shadow-lg select-none z-10 rotate-[-10deg]"
              />
              Why Choose Us
            </h2>

              <p className="2xl:max-w-sm text-black dark:text-white/70 text-justify">
                At Creditor Academy, we equip individuals and entrepreneurs with the knowledge to unlock
                the full power of the &quot;Private&quot; operating outside the public system, which means more control,
                more protection, and more opportunity.
              </p>
            </div>
          </div>

          {/* Right Side - 3 Columns */}
          <div className="grid md:grid-cols-3 gap-5 2xl:gap-7">
            {/* Video */}
            <div className="w-full h-full overflow-hidden rounded-lg cursor-pointer rounded-xl md:col-span-2" onClick={openVideoModal}>
              <div className="relative w-full h-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/video/intro-new.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-secondary ml-1"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden p-5 2xl:p-7 bg-white flex flex-col justify-between gap-8 md:gap-0 rounded-xl">
              <div className="flex flex-col gap-4 relative z-10">
                <div>
                  <Image
                    src={"/images/logo/creditorlogo.webp"}
                    alt="Logo Image"
                    height={60}
                    width={250}
                    className="dark:hidden"
                  />
                  <Image
                    src={"/images/logo/creditorlogo.webp"}
                    alt="Logo Image"
                    height={60}
                    width={250}
                    className="hidden dark:block"
                  />
                </div>

                <p className="text-gray-600 dark:text-black relative z-30">
                  Our educational platform & Instructors empower you to structure your life and business
                  for maximum privacy, asset protection, and true independence. This is where knowledge
                  becomes sovereignty, because real freedom begins in the Private.
                </p>
                           {/* Centered Blue Button */}
    <div className="flex justify-center mt-4">
      <a
        href="https://calendly.com/d/cwfz-k3q-w85/creditor-academy-education-counselor"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
      >
        Book a Slot
      </a>
    </div>
              </div>

              {/* Subtle gradient background */}
              <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500"></div>
              </div>

              {/* Floating circles */}
              <div className="absolute -top-72 -right-24 border-2 border-gray-300 rounded-full w-[489px] h-[489px] opacity-40" />

              <div className="absolute -bottom-36 -right-14 border-2 border-gray-300 rounded-full w-[489px] h-[489px] opacity-40" />

              {/* Additional medium circle for depth */}
              <div className="absolute -top-40 -left-20 border border-gray-400 rounded-full w-[350px] h-[350px] opacity-20" />
            </div>

            {/* Removed Card 3 */}
          </div>
        </div>
      </div>
      {/* Snow image at bottom right of section */}
      <div className="absolute bottom-0 right-0 z-20">
          <Image
            src="/images/home/aboutusIndex/about_snow.png"
            alt="Snow decoration"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 video-modal"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - positioned outside the video container */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Video player */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <div className="relative pt-[56.25%]">
                {/* 16:9 aspect ratio */}
                <iframe
                  src="https://drive.google.com/file/d/1r29AYUqcgbs7ZHao66vpeVYV1XskhA6A/preview"
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default About;