"use client";

import React from 'react';
import Image from 'next/image';

export default function MeetInstructor() {
    return (
        <section className="bg-slate-950 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center space-y-10">

                {/* Header Tag and Name */}
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-[2px] w-4 bg-blue-500 rounded-full block" />
                        <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">
                            Meet Your Instructor
                        </span>
                        <span className="h-[2px] w-4 bg-blue-500 rounded-full block" />
                    </div>
                    {/* <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight">
                        Learn From{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-400 bg-clip-text text-transparent block sm:inline">
                            PaulMichael Rowland
                        </span>
                    </h2> */}
                </div>

                {/* Main Horizontal Layout Row: [ Paragraph 1 | Image | Paragraph 2 ] */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center w-full">

                    {/* Left: Paragraph 1 */}
                    <div className="lg:col-span-4 lg:text-right">
                        <p className="text-slate-200 font-medium text-base sm:text-lg leading-relaxed">
                            PaulMichael Rowland is the founder of Creditor Academy. He specializes in asset protection, business structuring, and private financial systems.
                        </p>
                    </div>

                    {/* Center: Circular Optimized Image */}
                    <div className="lg:col-span-4 flex justify-center justify-self-center my-4 lg:my-0">
                        <div className="relative group">
                            {/* Glowing outer ring effect */}
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-indigo-500 to-teal-400 opacity-70 blur group-hover:opacity-90 transition duration-500" />

                            {/* Image frame */}
                            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] bg-slate-950">
                                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-800">
                                    <Image
                                        src="/images/paul/Paul.avif"
                                        alt="PaulMichael Rowland"
                                        fill
                                        priority
                                        className="object-cover object-top scale-105"
                                    />
                                </div>
                            </div>

                            {/* Minimal Floating Small Badge underneath image */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 py-0.5 px-3 rounded-full shadow-lg whitespace-nowrap">
                                <span className="text-slate-300 text-[10px] font-semibold tracking-wider uppercase">
                                    PaulMichael Rowland
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Paragraph 2 */}
                    <div className="lg:col-span-4 lg:text-left">
                        <p className="text-slate-200 font-medium text-base sm:text-lg leading-relaxed">
                            Through actionable frameworks, Paul helps students untangle complex structures to build unshakeable financial clarity and control.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}