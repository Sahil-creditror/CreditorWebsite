"use client";

import "swiper/css";
import Projectswiper from "./projectswiper";
import Premium from "./courses";

function Courses() {
  return (
    <section className="relative py-20 md:py-20 overflow-hidden">
      {/* 🔹 Light Mode Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 dark:hidden"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/course-bg-light.mp4" type="video/mp4" />
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
        <div className="container">
          <div className="flex flex-col gap-24">
            {/* Section Header */}
            <div className="flex flex-col xl:flex-row items-start gap-8">
              {/* Left Badge */}
              <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
                <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                  03
                </span>
                <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
                <p className="section-bedge py-1.5 px-4 rounded-full">Courses</p>
              </div>

              {/* Title + Tagline */}
              <div className="flex flex-col gap-11">
                <div className="flex flex-col gap-5">
                  <h2 className="max-w-3xl text-white dark:text-white">Premium Courses</h2>
                  <p className="max-w-2xl text-secondary/70 dark:text-white/70 leading-relaxed">
                    Learn Differently. Grow Distinctively. <br />
                    Become Private with Our Premium Courses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper Section */}
        <div className="px-3.5">
          <Premium />
        </div>
      </div>
    </section>
  );
}

export default Courses;
