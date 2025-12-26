"use client";

import "swiper/css";
import Image from "next/image";
import Premium from "./courses";
import HerobannerWithTag from "@/app/components/shared/hero-banner-with-tag";

function Courses() {
  return (
    <>
      <HerobannerWithTag
        bannerimage="/images/courses/course-banner.webp"
        heading="Explore Our Premium Catalogs"
        desc="Learn Differently. Grow Distinctively. Become Private with Our Premium Catalogs."
      />

      <section className="relative py-20 md:py-20 overflow-hidden">
        {/* Christmas bell in top right corner */}
        {/* <div className="absolute top-0 left-0 z-20 pointer-events-none">
          <Image
            src="/images/hero/bell.png"
            alt="Christmas Bell"
            width={200}
            height={200}
            priority
            className="w-32 md:w-44 lg:w-52 h-auto drop-shadow-xl select-none"
          />
        </div> */}

        {/* Light-mode background image (hidden in dark mode) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-20 block dark:hidden"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/course-bg-light.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark-mode background video (hidden in light mode) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-20 hidden dark:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/course-bg-dark.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for darkening video / image (above background) */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/60 -z-10" />

        <div className="relative flex flex-col gap-24">
          <div className="px-3.5">
            <Premium />
          </div>
        </div>

        {/* Snow image at bottom right of section */}
        {/* <div className="absolute bottom-0 right-0 z-20">
          <Image
            src="/images/courses/santa.webp"
            alt="Snow decoration"
            width={200}
            height={200}
            className="object-contain"
          />
        </div> */}
      </section>

    </>
  );
}

export default Courses;
