"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
 

type ContactProps = { contactdataNumber?: string };

export default function Contact(props: ContactProps) {
  const { contactdataNumber } = props;
  const [contactData, setContactData] = useState<any>(null);
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setContactData(data?.statsFactData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchData();
  }, []);

  // Ensure iframe/script render only on client to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

 

  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden"
    >

      <div className="container relative z-10">
        <div className="mx-auto flex flex-col gap-8 md:gap-12">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="bg-primary dark:text-secondary py-1.5 px-3 text-base font-semibold rounded-full">{contactdataNumber ?? 4}</span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
              <p className="section-bedge py-1.5 px-4 rounded-full">Contact us</p>
            </div>
            <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Get in Touch
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl transition-opacity duration-200">
                Let's collaborate and craft something extraordinary together.  
                Share your vision—I'm all ears and ready to help bring it to life.
            </p>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 xl:items-stretch">

            {/* left info column - Enhanced with more visual elements */}
            <div
              className="max-w-md flex flex-col gap-10 md:gap-14 xl:flex-1"
            >
              <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 transition-all duration-200 hover:shadow-3xl hover:-translate-y-0.5 overflow-hidden group h-full">
                
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
                
                
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -skew-x-12 group-hover:animate-shimmer transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                {/* Heading with icon */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-xl shadow-md">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Why Reach Out?
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 relative z-10">
                  Quick collaboration, custom quotes, or even a friendly chat about your next big idea.  
                  We'll guide you every step of the way with clarity and care.
                </p>

                {/* Keypoints */}
                <ul className="space-y-5 relative z-10">
                  {contactData?.keypoint?.map((value: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 group p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-transform duration-150 border border-white/30 dark:border-white/5 hover:scale-105"
                    >
                      <div className="bg-gradient-to-r from-primary to-blue-600 p-2.5 rounded-full flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200 mt-0.5">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-150">
                        {value}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Feature Highlights */}
                <div className="mt-8 relative z-10">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full animate-pulse"></div>
                    Why Choose Us?
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-white/5 hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Quick Response</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Within 2 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-white/5 hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200">
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Secure</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">100% Protected</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-white/30 dark:border-white/5 hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">24/7 Support</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Always Available</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* right form column - WonderEngine Form */}
            <div className="w-full xl:flex-1">
              <div 
                className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden group hover:shadow-3xl hover:-translate-y-0.5 transition-all duration-200 h-full"
              >
                {/* Enhanced decorative elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 group-hover:blur-2xl transition-all duration-700"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl group-hover:bg-green-500/30 group-hover:blur-2xl transition-all duration-700"></div>
                
                
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -skew-x-12 group-hover:animate-shimmer transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                {/* WonderEngine Form - Direct Integration */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Powered by WonderEngine</span>
                  </div>
                  
                  {/* Form loading state */}
                  {!isFormLoaded && (
                    <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl animate-pulse flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Loading form...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* WonderEngine Form (client-only) */}
                  {isMounted && (
                    <iframe
                      src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                      style={{ width: '100%', height: '380px', border: 'none', borderRadius: '12px', display: isFormLoaded ? 'block' : 'none' }}
                      id="inline-o69tKOXv3NV8GnS4aGls"
                      data-layout="{'id':'INLINE'}"
                      data-trigger-type="alwaysShow"
                      data-trigger-value=""
                      data-activation-type="alwaysActivated"
                      data-activation-value=""
                      data-deactivation-type="neverDeactivate"
                      data-deactivation-value=""
                      data-form-name="Contact us form"
                      data-height="402"
                      data-layout-iframe-id="inline-o69tKOXv3NV8GnS4aGls"
                      data-form-id="o69tKOXv3NV8GnS4aGls"
                      title="Contact us form"
                      onLoad={() => setIsFormLoaded(true)}
                    />
                  )}
                </div>

                {/* Form Footer */}
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Your information is secure and encrypted</span>
                  </div>
                </div>
                
                {/* WonderEngine Script (client-only) */}
                {isMounted && (
                  <Script src="https://api.wonderengine.ai/js/form_embed.js" strategy="afterInteractive" />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}
