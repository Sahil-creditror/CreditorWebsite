"use client";

import "swiper/css";
import Premium from "./courses";

function Courses() {
  return (
    <section className="relative pt-20 overflow-hidden">
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
        {/* <div className="container">
          <div className="flex flex-col gap-24">
            <div className="flex flex-col xl:flex-row items-start gap-8">
              <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
                <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                  02
                </span>
                <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
                <p className="section-bedge py-1.5 px-4 rounded-full">Courses</p>
              </div>

              <div className="flex flex-col gap-11">
                <div className="flex flex-col gap-5">
                  <h2 className="max-w-3xl text-white dark:text-white">Explore Our Premium Catalogs</h2>
                  <p className="max-w-2xl text-white/70 dark:text-white/70 leading-relaxed">
                    Learn Differently. Grow Distinctively. <br />
                    Become Private with Our Premium Catalogs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Swiper Section */}
        <div >
          <Premium />
        </div>
      </div>
    </section>
  );
}

export default Courses;
