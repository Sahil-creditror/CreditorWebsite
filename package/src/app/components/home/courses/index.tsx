"use client";

import "swiper/css";
import Image from "next/image";
import Premium from "./courses";
import HerobannerWithTag from "@/app/components/shared/hero-banner-with-tag";

function Courses() {
  return (
    <>
      <HerobannerWithTag
        bannerimage="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883453/creditor-website-assets/images/courses/course-banner.webp"
        heading="Explore Our Premium Catalogs"
        desc="Learn Differently. Grow Distinctively. Become Private with Our Premium Catalogs."
      />

      <section className="relative py-20 md:py-20 overflow-hidden">
        {/* Static gradient background - Light mode (Blue gradient) */}
        <div 
          className="pointer-events-none absolute inset-0 -z-10 block dark:hidden"
          style={{
            background: "linear-gradient(to bottom, #1e40af, #60a5fa)",
          }}
        />
        
        {/* Static gradient background - Dark mode (Dark slate gradient) */}
        <div 
          className="pointer-events-none absolute inset-0 -z-10 hidden dark:block"
          style={{
            background: "linear-gradient(to bottom, #0f172a, #334155)",
          }}
        />

        <div className="relative flex flex-col gap-24">
          <div className="px-3.5">
            <Premium />
          </div>
        </div>

        {/* Snow image at bottom right of section */}
        {/* <div className="absolute bottom-0 right-0 z-20">
          <Image
            src="https://res.cloudinary.com/dlndnmuq1/image/upload/f_webp/v1768883471/creditor-website-assets/images/courses/santa.webp"
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
