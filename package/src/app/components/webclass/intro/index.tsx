"use client";

import Image from "next/image";
import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";

const InstructorSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: IMAGE CONTAINER */}
          {/* order-2 lg:order-1 ensures image is below content on mobile, but on the left on desktop */}
          <div className="relative lg:col-span-5 order-2 lg:order-1">
            
            {/* Main Image Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 z-10">
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
                alt="Paul Michael Rowland"
                width={600}
                height={700}
                className="w-full h-[500px] lg:h-[600px] object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>

            {/* Decorative Background Accent */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-blue-600/10 rounded-3xl -z-10 hidden lg:block" />

            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 px-6 py-4 z-20">
              <h3 className="font-bold text-slate-900 tracking-tight">
                Paul Michael Rowland
              </h3>
              <p className="text-sm font-medium text-blue-600">
                Founder, Creditor Academy
              </p>
            </div>
            
          </div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            <h3 className="text-sm uppercase tracking-[3px] text-blue-600 font-bold mb-4">
              Meet Your Instructor
            </h3>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
              Learn From{" "}
              <span className="inline-block lg:block text-blue-600 mt-1">
                Paul Michael Rowland
              </span>
            </h2>

            <div className="space-y-5 text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
              <p>
                Paul Michael Rowland is the founder of Creditor Academy and
                specializes in teaching private operation strategies,
                business structuring, asset protection, and financial systems
                designed to help individuals gain more control and clarity.
              </p>
              
              <p>
                Through his frameworks, Paul helps students understand how
                private structures work and how to build stronger financial
                foundations.
              </p>
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={openWebinarRegistration}
              className="w-full sm:w-auto inline-flex justify-center items-center bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-extrabold text-lg px-8 py-4 rounded-xl shadow-lg shadow-yellow-400/20 transition-all duration-200"
            >
              Secure My Spot in the Live Webclass
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default InstructorSection;