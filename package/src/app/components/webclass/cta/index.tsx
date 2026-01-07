"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      {/* Background art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft left panel */}
        <div className="hidden md:block absolute -left-40 top-10 w-[520px] h-[380px] rounded-3xl bg-blue-100/30 dark:bg-white/10 blur-[1px]" />

        {/* soft right panel */}
        <div className="hidden md:block absolute right-[-12%] top-24 w-[560px] h-[420px] rounded-[40px] bg-blue-100/30 dark:bg-white/10" />

        {/* top-right glow / circle accent */}
        <div className="absolute -top-24 right-24 w-40 h-40 rounded-full bg-blue-200/40 dark:bg-white/30 blur-3xl opacity-70" />

        {/* dark-mode radial glow overlay */}
        <div className="hidden dark:block w-full h-full opacity-[0.25] bg-[radial-gradient(circle_at_top,_rgba(2,111,226,0.6),_transparent_55%)]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content (Left) */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-500/20 border border-blue-400/30 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Exclusive Masterclass
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">
                Ready to Transform
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Your Financial Future?
              </span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Join our exclusive masterclass and learn how to set up your{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Trust</span>,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Private Identity</span>, and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Business Credit</span>{" "}
              step-by-step from industry experts.
            </p>

            {/* CTA Button Container */}
            <div className="flex flex-col gap-6">
              {/* Main CTA Button */}
              <Link href="/membership">
                <div className="relative group inline-block">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Button */}
                  <div className="relative flex items-center gap-3 px-10 py-5 md:px-12 md:py-6 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-300">
                    <span className="text-xl md:text-2xl font-bold text-white">
                      Join Masterclass
                    </span>
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Link>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400" />
                  <span>Step-by-Step Guidance</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600" />
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span>Expert-Led Training</span>
                </div>
              </div>
            </div>
          </div>

          {/* Video (Right) */}
          <div className="w-full">
            <div className="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://drive.google.com/file/d/1ATSSVZJ9zTAXFhSgQfFN5AzJud_STVXo/preview?usp=sharing"
                title="Intro Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

