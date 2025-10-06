"use client";

import "swiper/css";
import Premium from "./courses";
import HerobannerWithTag from "@/app/components/shared/hero-banner-with-tag";

function Courses() {
  return (
    <>
      <HerobannerWithTag
        bannerimage="/images/courses/course-banner.webp"
        heading="Explore Our Premium Catalogs"
        desc="Learn Differently. Grow Distinctively. Become Private with Our Premium Catalogs."
        badgeNumber="02"
        badgeText="Courses"
      />

      <section className="relative py-20 md:py-20 overflow-hidden">
      {/* 🔹 Light Mode Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 dark:hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/course-bg-new-light.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Dark Mode Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 hidden dark:block"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/course-bg-dark.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔹 Overlay for darkening video */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 -z-10" />

        <div className="relative flex flex-col gap-24">
          {/* Badge moved into Hero banner variant */}

          {/* Swiper Section */}
          <div className="px-3.5">
            <Premium />
          </div>
        </div>
      </section>
    </>
  );
}

export default Courses;
