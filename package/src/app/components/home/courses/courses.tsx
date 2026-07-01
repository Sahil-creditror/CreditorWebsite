"use client";

import React from "react";
import {
  BECOME_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
  OPERATE_PRIVATE_PATH,
} from "@/lib/coursePaths";

const CourseRoadmap: React.FC = () => {
  const courses = [
    {
      title: "Become Private",
      // Pointed to your local public assets directory structure
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
      subtitle: "Reclaim Your Lawful Identity",
      description: "Step out of public systems and transition your legal parameters into the private domain.",
      learnings: [
        "Status correction principles",
        "Remove from public jurisdiction",
        "Essential lawful documents",
      ],
      href: BECOME_PRIVATE_PATH,
    },
    {
      title: "Operate Private",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp",
      subtitle: "Asset Protection & Business",
      description: "Build, manage, and scale an independent private empire shielded from public liabilities.",
      learnings: [
        "Unincorporated Business Trusts",
        "Private Membership Associations",
        "Family legacy planning",
      ],
      href: OPERATE_PRIVATE_PATH,
      highlight: true,
    },
    {
      title: "Financial Freedom",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp",
      subtitle: "Capital & Credit Architectures",
      description: "Master the architecture of modern private commerce, banking funding, and credit systems.",
      learnings: [
        "Private Business Credit",
        "Personal Credit Repair",
        "Credit card stacking strategies",
      ],
      href: FINANCIAL_FREEDOM_PATH,
    },
  ];

  return (
    // Replaced abstract gradients with your custom bgfreedom.jpg background layout
    <section className="relative overflow-hidden py-24 px-5 sm:px-8 bg-slate-950 min-h-screen flex items-center justify-center">

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100"
        style={{ backgroundImage: `url('/images/bg/bgfreedom.jpg')` }}
      />

      {/* Dark tint overlay to keep premium contrast high and text highly readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90 mix-blend-multiply pointer-events-none" />

      {/* Ambient glass glow points matching your structural themes */}
      <div className="absolute top-12 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
            Explore Our Premium Catalogs
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mt-5 rounded-full shadow-sm" />
          <p className="mt-6 text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow">
            Structured masterclasses designed to help you build, protect, and expand your private foundation.
          </p>
        </div>

        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch justify-items-center">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`group relative w-full max-w-md flex flex-col rounded-[32px] transition-all duration-500 ${course.highlight ? "lg:-translate-y-4" : ""
                }`}
            >
              {/* Highlight Background Glow */}
              {course.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-3xl rounded-[32px] pointer-events-none" />
              )}

              {/* Card Container Frame - Tuned for premium glassmorphism dark mode visibility against the image */}
              <div className={`relative flex flex-col h-full bg-slate-900/75 backdrop-blur-2xl border rounded-[32px] overflow-hidden shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-2 transition-all duration-500 ${course.highlight
                ? "border-blue-500/40 ring-1 ring-blue-500/30"
                : "border-slate-800/80"
                }`}>

                {/* Image Element */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                  {course.highlight && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-[10px] font-black tracking-wider uppercase shadow-md">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                {/* Card Context Body */}
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                      {course.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-slate-300 leading-relaxed min-h-[40px]">
                      {course.description}
                    </p>

                    {/* Streamlined Core Bullet Layout */}
                    <div className="mt-5 space-y-2.5">
                      {course.learnings.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-xs font-semibold text-slate-200">
                          <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 shadow-sm" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Action Interface */}
                  <div className="mt-8">
                    <a
                      href={course.href}
                      className={`inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${course.highlight
                        ? "bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl"
                        : "bg-slate-800 hover:bg-blue-600 text-white"
                        }`}
                    >
                      Explore Syllabus
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CourseRoadmap;