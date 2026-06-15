"use client";

import {
  MessageCircle,
  HelpCircle,
  Gift,
  GraduationCap,
  Users,
  ArrowRight,
} from "lucide-react";
import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";

export default function WhyAttendSection() {
  const benefits = [
    {
      title: "Live Q&A",
      description: "Get your questions answered directly during the live session.",
      icon: MessageCircle
    },
    {
      title: "Ask Questions Directly",
      description: "Interact with Paul and get clarity on your biggest challenges.",
      icon: HelpCircle
    },
    {
      title: "Free Resources",
      description: "Receive exclusive resources available only for attendees.",
      icon: Gift
    },
    {
      title: "Bonus Training",
      description: "Unlock additional strategies and valuable insights.",
      icon: GraduationCap
    }
  ];

  return (
    <section className="py-24 bg-blue-50/50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Why Attend Live?
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Get More Than Just A Webclass.
            <span className="block text-blue-600/70 font-normal mt-1">
              Get Direct Access & Training.
            </span>
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Join the live session to access exclusive training, resources, and direct interaction with the instructor.
          </p>
        </div>

        {/* BENEFITS GRID WITH INTEGRATED CTA */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-blue-100 overflow-hidden rounded-2xl border border-blue-100 shadow-sm">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 hover:bg-blue-50/30 transition-colors duration-200"
              >
                <div className="inline-flex items-center justify-center text-blue-600">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* 5th BENEFIT - SPANS 2 COLUMNS ON MOBILE/TABLET FOR BALANCED GRID */}
          <div className="bg-white p-8 hover:bg-blue-50/30 transition-colors duration-200 sm:col-span-2 lg:col-span-1">
            <div className="inline-flex items-center justify-center text-blue-600">
              <Users size={24} strokeWidth={2} />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-slate-900">
              Limited Seats
            </h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Only a limited number of seats are available to ensure quality interaction.
            </p>
          </div>

          {/* THE 6th SLOT: INTEGRATED HIGH-CONTRAST BLUE CTA */}
          <div className="bg-blue-600 p-8 flex flex-col justify-between sm:col-span-2 lg:col-span-1 min-h-[220px]">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Ready to Join?
              </h3>
              <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
                Secure your spot in this exclusive live session before registration closes.
              </p>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                onClick={openWebinarRegistration}
                className="group inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm px-5 py-3 rounded-xl transition duration-200 shadow-sm active:scale-[0.98]"
              >
                Secure My Spot
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}