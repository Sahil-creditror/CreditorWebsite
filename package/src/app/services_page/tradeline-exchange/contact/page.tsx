// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function Contact({ contactdataNumber }) {
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative pt-12 md:pt-16 px-6 md:px-20 overflow-hidden bg-white">
      <div className="container relative z-10">
        <div className="mx-auto flex flex-col gap-12 md:gap-16">

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-10">

              {/* Header */}
              <div>
                <span className="inline-flex items-center justify-center px-5 py-2.5 mb-4 md:mb-6 text-xs md:text-sm font-semibold tracking-wide rounded-full overflow-hidden bg-blue-50 border border-blue-300 text-blue-700">
                  Contact Us
                </span>

                <h2 className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent text-3xl md:text-5xl font-bold">
                  Get in Touch
                </h2>

                <p className="mt-4 md:mt-6 text-black text-base md:text-xl leading-relaxed">
                  Let's collaborate and craft something extraordinary together. Share your vision—I'm all ears and ready to help bring it to life.
                </p>
              </div>

              {/* Message Card */}
              <div className="relative bg-white/90 rounded-2xl p-6 md:p-10 shadow-xl border border-blue-100 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>

                <div className="flex items-center gap-4 mb-4 md:mb-6 relative z-10">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-md">
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-800">
                    Ready to Step Into the Private?
                  </p>
                </div>

                <p className="text-base md:text-lg leading-relaxed text-gray-700 relative z-10">
                  One message can change your life. We'll guide you with clarity, strategy, and purpose.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN – FORM */}
            <div className="w-full h-auto lg:h-[600px] flex items-start">
              {!isFormLoaded && (
                <div className="w-full h-[400px] lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading form...</p>
                  </div>
                </div>
              )}

              {isMounted && (
                <iframe
                  src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "16px",
                    display: isFormLoaded ? "block" : "none",
                  }}
                  title="Contact us form"
                  onLoad={() => setIsFormLoaded(true)}
                />
              )}

              {isMounted && (
                <Script
                  src="https://api.wonderengine.ai/js/form_embed.js"
                  strategy="afterInteractive"
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
