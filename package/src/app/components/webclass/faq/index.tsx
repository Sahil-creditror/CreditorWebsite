"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQSection() {
  const faqs = [
    {
      question: "Is this really free?",
      answer: "Yes. The live webclass is completely free to attend.",
    },
    {
      question: "How long is the webinar?",
      answer: "The webinar runs for approximately 60-90 minutes.",
    },
    {
      question: "Will there be a replay?",
      answer: "Limited replay availability may be provided after the live session.",
    },
    {
      question: "Who is this for?",
      answer: "This webclass is for business owners, entrepreneurs, families, and individuals interested in private operation.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-blue-50 text-slate-900">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Frequently Asked{" "}
            <span className="block md:inline text-blue-600">Questions</span>
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Everything you need to know before joining the live webclass.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-blue-100/80 shadow-sm overflow-hidden transition-colors duration-200"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 sm:px-8 sm:py-6"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`text-blue-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 sm:px-8 sm:pb-6 text-sm sm:text-base text-slate-500 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="max-w-md">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Still Have Questions?
            </h3>
            <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
              Join the live session and get answers directly from the instructor.
            </p>
          </div>
          
          <Link
            href="/webinar"
            className="group inline-flex items-center gap-2 whitespace-nowrap bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm px-6 py-3.5 rounded-xl transition duration-200 shadow-sm active:scale-[0.98]"
          >
            Reserve My Free Seat
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}