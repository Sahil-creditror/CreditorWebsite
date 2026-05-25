'use client';

import React from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaCreditCard, FaBolt } from 'react-icons/fa';

type Props = {
  container?: string;
  sectionSpacing?: string;
  primaryGradient?: string;
};

export default function HeroSection({
  container = 'container mx-auto px-4',
  sectionSpacing = 'py-12',
  primaryGradient = 'from-[#60A5FA] via-[#3B82F6] to-[#1E3A8A]'
}: Props) {
  return (
    <>
      {/* HERO */}
      <section className={`w-full ${sectionSpacing} relative overflow-hidden bg-white dark:bg-[#151922]`}>
        {/* Background Accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.25), transparent)' }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(6,182,212,0.22), transparent)' }}
        />

		{/* Centered Title & Subtitle */}
		<div className="container mx-auto px-4 sm:px-6">
			<div className="max-w-3xl mx-auto text-center">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold mb-3 sm:mb-4 text-slate-900 dark:text-white">
					Build Your <span className={`bg-clip-text text-transparent bg-gradient-to-r ${primaryGradient}`}>Private Business</span> Empire
				</h1>
				<p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg mb-8 sm:mb-12 leading-relaxed">
					Get into the private fast with a clear, guided workflow — secure freedom, protection, and funding step by step.
				</p>
			</div>
		</div>

		<div
			className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 lg:gap-8 items-center my-8 lg:my-15"
		>
          
			{/* Content (Left) */
			}
          <div>
            <div className="max-w-2xl">
				{/* Title */}
					{/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-4">
                Proven Three-Step System
              </div> */}

              {/* Workflow Timeline */}
              <div className="relative">
                {/* vertical connector with glow */}
                <div className="hidden sm:block absolute left-[27px] sm:left-[31px] top-6 sm:top-8 bottom-6 sm:bottom-8 w-[2px] sm:w-[3px] bg-gradient-to-b from-sky-400 via-blue-500 to-purple-600 rounded-full opacity-40" aria-hidden />
                <div className="hidden sm:block absolute left-[27px] sm:left-[31px] top-6 sm:top-8 bottom-6 sm:bottom-8 w-[2px] sm:w-[3px] bg-gradient-to-b from-sky-400 via-blue-500 to-purple-600 rounded-full blur-sm" aria-hidden />

                <div className="space-y-5 sm:space-y-8">
                  {/* Step 1 */}
                  <div className="relative flex gap-3 sm:gap-5 group">
                    <div className="shrink-0">
                      <div className="relative">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" aria-hidden />
                        <div className="relative size-14 sm:size-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/40 grid place-items-center ring-2 ring-white/50 dark:ring-slate-700/50 transition-transform duration-300 group-hover:scale-110">
                          <FaShieldAlt className="text-xl sm:text-2xl" />
                        </div>
                        <span className="absolute -bottom-1.5 sm:-bottom-2 -right-1.5 sm:-right-2 inline-flex items-center justify-center size-7 sm:size-8 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-br from-white to-slate-50 text-blue-700 ring-2 ring-blue-200 shadow-lg dark:from-slate-800 dark:to-slate-900 dark:text-blue-300 dark:ring-blue-900">01</span>
                      </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-white to-sky-50/30 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20 group-hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">Step One</div>
                        <div className="flex-1 h-px bg-gradient-to-r from-sky-300/50 to-transparent dark:from-sky-700/50" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400 mb-1">Unincorporated Business Trust</div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 leading-tight">Own nothing, control everything</div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        Create the most powerful private entity available. This trust protects your assets and forms the lawful foundation of your private empire.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex gap-3 sm:gap-5 group">
                    <div className="shrink-0">
                      <div className="relative">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" aria-hidden />
                        <div className="relative size-14 sm:size-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 text-white shadow-xl shadow-indigo-500/40 grid place-items-center ring-2 ring-white/50 dark:ring-slate-700/50 transition-transform duration-300 group-hover:scale-110">
                          <FaCreditCard className="text-xl sm:text-2xl" />
                        </div>
                        <span className="absolute -bottom-1.5 sm:-bottom-2 -right-1.5 sm:-right-2 inline-flex items-center justify-center size-7 sm:size-8 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-br from-white to-slate-50 text-indigo-700 ring-2 ring-indigo-200 shadow-lg dark:from-slate-800 dark:to-slate-900 dark:text-indigo-300 dark:ring-indigo-900">02</span>
                      </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Step Two</div>
                        <div className="flex-1 h-px bg-gradient-to-r from-indigo-300/50 to-transparent dark:from-indigo-700/50" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400 mb-1">Private Merchant Account</div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 leading-tight">Operate securely in the private</div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        Connect your Business Trust to its own private merchant account to accept payments, process transactions, and run operations securely.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex gap-3 sm:gap-5 group">
                    <div className="shrink-0">
                      <div className="relative">
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" aria-hidden />
                        <div className="relative size-14 sm:size-16 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white shadow-xl shadow-purple-500/40 grid place-items-center ring-2 ring-white/50 dark:ring-slate-700/50 transition-transform duration-300 group-hover:scale-110">
                          <FaBolt className="text-xl sm:text-2xl" />
                        </div>
                        <span className="absolute -bottom-1.5 sm:-bottom-2 -right-1.5 sm:-right-2 inline-flex items-center justify-center size-7 sm:size-8 rounded-full text-[10px] sm:text-xs font-bold bg-gradient-to-br from-white to-slate-50 text-purple-700 ring-2 ring-purple-200 shadow-lg dark:from-slate-800 dark:to-slate-900 dark:text-purple-300 dark:ring-purple-900">03</span>
                      </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-white to-purple-50/30 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-1">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">Step Three</div>
                        <div className="flex-1 h-px bg-gradient-to-r from-purple-300/50 to-transparent dark:from-purple-700/50" />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-400 mb-1">Credit Optimization</div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1.5 sm:mb-2 leading-tight">Unlock up to $200K in private credit</div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-snug">
                        Optimize your trust's credit profile to qualify for major funding opportunities and scale faster with strategic, compliant leverage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

				{/* Closing moved above, centered with title */}
            </div>
          </div>

          {/* VIDEO (Right) */}
          <div className="w-full">
            <div
              className="w-full max-w-4xl mx-auto aspect-video rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
            >
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

		{/* Bottom Closing Copy (Centered) */}
		<div className="container mx-auto px-4 sm:px-6">
    <p className="mt-8 sm:mt-12 text-sm sm:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto text-center leading-relaxed">
      Start with our{" "}
      <Link href="/masterclass-membership" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        Masterclass
      </Link>{" "}
      to learn these basics, then advance through our Premium Courses —{" "}
      <Link href="/become-private" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        Become Private
      </Link>
      ,{" "}
      <Link href="/operate-private" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        Operate Private
      </Link>
      , and{" "}
      <Link href="/financial-freedom" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
        Financial Freedom
      </Link>{" "}
      — to master every stage of your journey from public to private.
    </p>
		</div>
		</section>
    </>
  );
}
