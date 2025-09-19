"use client";
import React from "react";
import {
  ShieldCheck,
  Sparkles,
  FileCheck,
  Users,
} from "lucide-react";

export default function CourseOverviewSection() {

  // Previous content data (restored) used in this layout
  const pitch = [
    "Operate outside state-controlled systems",
    "Private trusts & PMA structures",
    "Lawful commerce strategies",
    "Asset protection frameworks",
    "Family legacy planning",
  ];
  const audience = [
    "Entrepreneurs",
    "Real estate pros",
    "Educators",
    "Freelancers",
    "Freedom-seekers",
  ];

  

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 md:px-6 py-12 md:py-16"
    >

      

      

      

      <div className="mx-auto max-w-7xl flex flex-wrap gap-10 items-center relative z-10 p-0 md:p-0">
        {/* Embedded Drive Video */}
        <div className="flex-1 min-w-[18rem] max-w-3xl relative rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full aspect-video rounded-2xl relative overflow-hidden">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://drive.google.com/file/d/1_x_eof3Q40gXfXepGAeMCEX98Dro6dIA/preview"
            allow="autoplay"
            allowFullScreen
            title="Course detail video"
            style={{ border: 0 }}
          />
          </div>
        </div>

        {/* Enhanced Course Description */}
        <div className="flex-1 min-w-[18rem] p-5 relative z-10">

          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800 dark:text-indigo-300 relative inline-block"
          >
            Course Overview
            <span 
              className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded underline-animate" 
            />
          </h2>

          <ul
            className="space-y-2 mb-6"
          >
            {pitch.map((point, index) => (
              <li key={index} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                <span className="text-base font-medium">{point}</span>
              </li>
            ))}
          </ul>

          <div 
            className="flex flex-wrap gap-2 mb-6"
          >
            {audience.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs sm:text-sm font-medium text-gray-800 backdrop-blur border border-gray-200 shadow-sm dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-700"
              >
                <Sparkles className="h-3.5 w-3.5" /> {tag}
              </span>
            ))}
          </div>

          <div
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" /> Small groups
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Private access
            </span>
            <span className="inline-flex items-center gap-2">
              <FileCheck className="h-4 w-4" /> Templates
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes underlineGrow {
          from { width: 0; }
          to { width: 3.5rem; }
        }
        .underline-animate {
          width: 0;
          display: block;
          animation: underlineGrow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s forwards;
        }
      `}</style>
    </section>
  );
}