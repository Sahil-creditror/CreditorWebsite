"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { PhoneCall, Calendar, ShieldCheck, Mail, ArrowRight, Sparkles } from "lucide-react";

type ContactProps = {
  contactdataNumber?: string;
};

export default function Contact({ contactdataNumber }: ContactProps) {
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");
  const [isFormLoaded, setIsFormLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  void contactdataNumber;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-20 bg-gradient-to-br from-blue-300/60 via-indigo-50/50 to-blue-200 text-slate-800"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-400/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-100/80 backdrop-blur-sm">
                Get In Touch
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
                Let's build your next step towards{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  freedom
                </span>
              </h2>

              <p className="mt-5 text-base text-slate-600 leading-relaxed">
                Have questions or ready to begin? Connect with our team and discover the right path for your goals.
              </p>
            </div>

            {/* INTERACTIVE VALUE CARDS */}
            <div className="flex flex-col gap-4">
              <div className="group rounded-2xl bg-white/60 border border-slate-200/60 p-5 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900">Ready to get started?</h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      One conversation can clarify your next move. Our team helps guide you with strategy and direction.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl bg-white/60 border border-slate-200/60 p-5 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 backdrop-blur-md">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-2 text-blue-600 font-semibold">
                    <ShieldCheck size={18} className="text-emerald-500" />
                    Secure & confidential connection
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT ZONE - INTERACTIVE WORKSPACE */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white rounded-3xl shadow-xl shadow-indigo-950/5 border border-slate-200/80 p-4 sm:p-6 overflow-hidden backdrop-blur-xl">
              
              {/* INTERACTIVE SWITCHER TABS */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-6 relative">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                    activeTab === "form"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Mail size={16} />
                  Send a Message
                </button>
                <button
                  onClick={() => setActiveTab("calendar")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
                    activeTab === "calendar"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Calendar size={16} />
                  Book Instant Meeting
                </button>
              </div>

              {/* TAB CONTENT PANES */}
              <div className="relative min-h-[420px]">
                
                {/* Loader State shared between embeds */}
                {!isFormLoaded && activeTab === "form" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-20">
                    <div className="text-center">
                      <div className="w-10 h-10 border-3 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-xs text-slate-500 font-medium tracking-wide">
                        Establishing secure connection...
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 1: FORM INTERFACE */}
                {activeTab === "form" && isMounted && (
                  <div className="animate-in fade-in duration-300">
                    <iframe
                      src="https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls"
                      className="w-full"
                      style={{
                        height: "420px",
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
                  </div>
                )}

                {/* TAB 2: CALENDAR INTEGRATION */}
                {activeTab === "calendar" && (
                  <div className="flex flex-col items-center justify-center text-center p-6 min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 ring-8 ring-indigo-50/50">
                      <Calendar size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Pick a time that works for you</h3>
                    <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                      Skip the back-and-forth emails. Access our direct schedule calendar to lock in a slot instantly.
                    </p>
                    
                    <button
                      onClick={() => window.open("https://scheduler.zoom.us/d/yryit5gx/athena-lms-platform-demo", "_blank")}
                      className="group inline-flex items-center justify-center gap-2.5 mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                      Open Scheduler
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* External Form Loader Script */}
      {isMounted && (
        <Script
          src="https://api.wonderengine.ai/js/form_embed.js"
          strategy="afterInteractive"
        />
      )}
    </section>
  );
}