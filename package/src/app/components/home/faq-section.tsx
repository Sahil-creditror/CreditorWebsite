"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, FileCheck, BookOpen, ArrowRight } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the difference between Free Training, individual courses, and Membership?",
      a: "The Free Training is a 45-minute on-demand foundation class that introduces core concepts with zero commitment. Individual courses provide targeted deep-dives into specific subjects. The Masterclass Membership ($69/mo locked-in promotional rate) provides all-inclusive access to all 3 core tracks, weekly live interactive classes Monday–Friday, direct instructor Q&A, verified legal templates, and our private PMA community.",
    },
    {
      q: "How do I access my courses after enrolling?",
      a: "All enrolled students receive instant login credentials to our dedicated Athena LMS platform (lmsathena.com). You can immediately access your video curriculum, module slide decks, and document templates on mobile, tablet, or desktop.",
    },
    {
      q: "Do I need previous legal or financial experience to participate?",
      a: "No. Our curriculum is specifically organized into 'Book Smart' (live structured lessons) and 'Street Smart' (practical recorded lectures) so everyday entrepreneurs, business owners, and beginners can follow along without any prior legal or financial background.",
    },
    {
      q: "Is this training applicable to both personal status and business operations?",
      a: "Yes. Our three tracks cover the full spectrum: 'Become Private' addresses personal standing and status correction; 'Operate Private' covers Unincorporated Business Trusts and Private Membership Associations (PMAs); and 'Financial Freedom' guides both personal credit restoration and building $200k+ in business credit architectures.",
    },
    {
      q: "What is the cancellation or subscription policy for the membership?",
      a: "The Masterclass Membership is completely flexible with pay-as-you-go billing. You can cancel your subscription anytime with a single click inside your account portal without penalties or contracts.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-slate-50/70 border-t border-slate-200/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight mb-3">
            Clear answers to common questions.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about pricing, access, and curriculum.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4 mb-20">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-bold text-secondary text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* USEFUL RESOURCES SECTION (Matches bottom section of user mockup) */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary">
              Useful resources. Practical next steps.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex items-start gap-4 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <FileCheck size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-secondary text-base sm:text-lg mb-1">
                  Business Credit Readiness Checklist
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  Start with a practical self-audit of your business foundation.
                </p>
                <Link
                  href="/documentation"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  <span>Read the Guide</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: eBooks */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex items-start gap-4 hover:border-primary/40 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-primary flex items-center justify-center shrink-0">
                <BookOpen size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-secondary text-base sm:text-lg mb-1">
                  eBook Library
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">
                  Browse topics, previews and deep-dive book details.
                </p>
                <Link
                  href="/ebooks"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  <span>Explore eBooks</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

