"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type ContactProps = { contactdataNumber?: string };

export default function Contact(props: ContactProps) {
  const { contactdataNumber } = props;
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure iframe/script render only on client to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="mx-auto flex flex-col gap-8 md:gap-12">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Column - Title, Subtitle, and Message */}
            <div className="flex flex-col gap-8">
              {/* Title and Subtitle */}
              <div>
                <span className="inline-flex items-center justify-center px-5 py-2 mb-5 text-sm font-semibold tracking-wide rounded-full overflow-hidden bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-600/20 dark:from-blue-400/10 dark:via-blue-500/5 dark:to-blue-600/10 border border-blue-500/30 dark:border-blue-400/30 backdrop-blur-md text-blue-800 dark:text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    Contact Us
                  </span>
                </span>

                <h2 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Get in Touch
                </h2>
                <p className="mt-5 text-black dark:text-white/70">
                  Let's collaborate and craft something extraordinary together.
                  Share your vision—I'm all ears and ready to help bring it to
                  life.
                </p>
              </div>

              {/* Message Card */}
              <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>

                {/* Heading with icon */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-xl shadow-md">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Ready to Step Into the Private?
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 relative z-10">
                  One message can change your life. We'll guide you with
                  clarity, strategy, and purpose.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full">
              {/* Form loading state */}
              {!isFormLoaded && (
                <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Loading form...
                    </p>
                  </div>
                </div>
              )}

              {/* WonderEngine Form (client-only) */}
              {isMounted && (
                <iframe
                  src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                  style={{
                    width: "100%",
                    height: "380px",
                    border: "none",
                    borderRadius: "12px",
                    display: isFormLoaded ? "block" : "none",
                  }}
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

              {/* WonderEngine Script (client-only) */}
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
