"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { PhoneCall, Calendar, ShieldCheck } from "lucide-react";

type ContactProps = {
  contactdataNumber?: string;
};

export default function Contact({ contactdataNumber }: ContactProps) {
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  void contactdataNumber;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="contact"
      className="
      relative 
      overflow-hidden 
      py-20 
      md:py-20 
      pb-1
      bg-gradient-to-br 
      from-sky-50 
      via-indigo-50 
      to-blue-100 
      text-slate-800
      "
    >
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-300/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
                Get In Touch
              </p>

              <h2 className="mt-4 text-4xl md:text-5xl font-black leading-tight text-slate-900">
                Let's build your next step towards{" "}
                <span className="text-blue-600">
                  freedom
                </span>
              </h2>

              <p className="mt-5 text-sm md:text-base text-slate-600 leading-relaxed">
                Have questions or ready to begin? Connect with our team and discover the right path for your goals.
              </p>
            </div>

            {/* STRATEGY CARD */}
            <div className="rounded-3xl bg-white/70 border border-blue-100 p-7 shadow-xl shadow-blue-900/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/10">
                  <PhoneCall size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  Ready to get started?
                </h3>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                One conversation can clarify your next move. Our team helps guide you with strategy and direction.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600">
                <ShieldCheck size={16} />
                Secure & confidential
              </div>
            </div>

            {/* SCHEDULER BUTTON */}
            <button
              onClick={() => window.open("https://scheduler.zoom.us/d/yryit5gx/athena-lms-platform-demo", "_blank")}
              className="group inline-flex items-center justify-center gap-3 w-full sm:w-fit px-7 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/15 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]"
            >
              <Calendar size={18} />
              Schedule A Meeting
            </button>
          </div>

          {/* RIGHT FORM COLUMN (Completely raw overlay) */}
          <div className="lg:col-span-7 w-full">
            {!isFormLoaded && (
              <div className="flex items-center justify-center h-[400px]">
                <div className="text-center">
                  <div className="w-9 h-9 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-slate-500 font-medium">
                    Loading secure form...
                  </p>
                </div>
              </div>
            )}

            {isMounted && (
              <iframe
                src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                className="w-full"
                style={{
                  height: "400px",
                  display: isFormLoaded ? "block" : "none",
                  border: "0",
                  background: "transparent"
                }}
                id="inline-o69tKOXv3NV8GnS4aGls"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-form-name="Contact us form"
                data-height="402"
                data-form-id="o69tKOXv3NV8GnS4aGls"
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
    </section>
  );
}