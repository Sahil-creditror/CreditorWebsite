"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Landmark,
  ArrowUpRight,
} from "lucide-react";

export default function AboutCreditorAcademy() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-sky-100/30 via-blue-50/60 to-indigo-50/30 text-slate-900 font-sans selection:bg-blue-600 selection:text-white overflow-x-clip">
      {/* Background Decorative Gradients - Enhanced for depth over the blue background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-300/30 via-sky-200/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40vh] right-[-10vw] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* --- HERO / WELCOME SECTION --- */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-clip">
        {/* Ambient Backlight Glow underneath the hero layout */}
        <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-blue-400/20 to-sky-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-24 right-10 w-[300px] h-[300px] bg-gradient-to-br from-indigo-400/20 to-purple-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content + CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left relative z-10 px-6">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl  tracking-tight text-slate-900 leading-[1.1]">
                Welcome to <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
                  Creditor Academy
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                We exist to make true financial sovereignty accessible. Through
                our Masterclass, we break down business trusts, asset
                protection, and private wealth strategies that the elite use to
                build, insulate, and pass on generational wealth.
              </p>
            </div>
          </div>

          {/* Right Column: Layered Interactive Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-4 relative mt-8 lg:mt-0">
            {/* Decorative Blur Background Accent specifically behind cards */}
            <div className="absolute inset-0 bg-blue-100/30 rounded-3xl blur-2xl -z-10 transform scale-90" />

            {/* Card 1: Asset Protection */}
            <div className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-md hover:shadow-2xl hover:shadow-blue-900/5 hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 space-y-4 relative overflow-hidden">
              {/* Glow corner accent inside card */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-400/10 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-xl w-fit shadow-inner group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-blue-700 transition-colors">
                  Asset Protection
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                  Insulate your accumulated wealth from malicious external
                  liabilities using pristine, private &amp; legal structures.
                </p>
              </div>
            </div>

            {/* Card 2: Business Trusts (Offset vertically on desktop for structural depth) */}
            <div className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-md hover:shadow-2xl hover:shadow-indigo-900/5 hover:bg-white/90 hover:-translate-y-1 lg:mt-8 transition-all duration-300 space-y-4 relative overflow-hidden">
              {/* Glow corner accent inside card */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-400/10 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 rounded-xl w-fit shadow-inner group-hover:scale-110 transition-transform duration-300">
                <Landmark className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-extrabold text-slate-900 text-lg tracking-tight group-hover:text-indigo-700 transition-colors">
                  Business Trusts
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                  Operate completely within the private financial sector with
                  ultimate anonymity, freedom, and asset control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DIVIDER WITH EXPLORE CTA --- */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="relative flex justify-center">
          <Link
            href="/learning-journey"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#2563EB] text-white text-sm sm:text-base font-bold shadow-xl shadow-blue-600/35 ring-4 ring-blue-100 hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            Explore Learning Journey
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* --- MEET YOUR INSTRUCTOR SECTION --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative ">

        {/* Enhanced card container with crisp white overlay borders to look high-end on light blue background */}
        <div className="bg-white/90 backdrop-blur-md rounded-4xl border border-white/80 shadow-2xl shadow-blue-900/10 p-8 sm:p-12 relative overflow-hidden">
          {/* Subtle inside accent blob */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="flex flex-col items-center space-y-8">
            {/* Header Title */}
            <div className="flex items-center gap-3">
              <span className="h-1 w-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
              <span className="text-blue-700 font-extrabold tracking-widest text-xs uppercase">
                Meet Your Instructor
              </span>
              <span className="h-1 w-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full" />
            </div>

            {/* Content Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center w-full pt-4">
              {/* Left Paragraph */}
              <div className="lg:col-span-4 lg:text-right text-center order-2 lg:order-1">
                <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
                  <span className="text-slate-900 font-black block mb-1 text-xl lg:text-2xl">
                    PaulMichael Rowland
                  </span>
                  Founder of Creditor Academy. He specializes in private asset
                  protection, complex business structuring, and bulletproof
                  financial blueprints.
                </p>
              </div>

              {/* Center Portrait */}
              <div className="lg:col-span-3 flex justify-center order-1 lg:order-2">
                <div className="relative">
                  {/* Clean gradient ring background accent */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 opacity-30 blur-md" />

                  {/* Modern Soft Round Image Ring */}
                  <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl">
<div className="w-full h-full rounded-full overflow-hidden bg-slate-100 border-4 border-white relative">
  <Image
    src="https://res.cloudinary.com/jup2hjfk/image/upload/v1785733640/Paul_o8ocl3.avif"
    alt="PaulMichael Rowland"
    fill
    priority
    className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-500"
  />
</div>
                  </div>
                </div>
              </div>

              {/* Right Paragraph */}
              <div className="lg:col-span-4 lg:text-left text-center order-3">
                <p className="text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
                  By packaging raw institutional mechanics into highly
                  actionable frameworks, Paul helps everyday students untangle
                  complexity to establish unshakeable wealth control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
