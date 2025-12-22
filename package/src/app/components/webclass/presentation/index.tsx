"use client";

import Image from "next/image";

export default function PresentationSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 text-white bg-[linear-gradient(135deg,_#1e40af_0%,_#3b82f6_50%,_#60a5fa_100%)] dark:bg-[#060a13]">
      {/* subtle background art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft left panel */}
        <div className="hidden md:block absolute -left-40 top-10 w-[520px] h-[380px] rounded-3xl bg-white/10 blur-[1px]" />

        {/* soft right panel behind image */}
        <div className="hidden md:block absolute right-[-12%] top-24 w-[560px] h-[420px] rounded-[40px] bg-white/10" />

        {/* top-right glow / circle accent */}
        <div className="absolute -top-24 right-24 w-40 h-40 rounded-full bg-white/30 blur-3xl opacity-70" />

        {/* dark-mode radial glow overlay */}
        <div className="hidden dark:block w-full h-full opacity-[0.25] bg-[radial-gradient(circle_at_top,_rgba(2,111,226,0.6),_transparent_55%)]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* <p className="uppercase tracking-[0.3em] text-sm md:text-base text-white/80 mb-6">
            Solutions | Instructional Design
          </p> */}

          <div className="inline-flex flex-col gap-4">
            <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-white px-6 py-3 rounded-lg bg-white/15 backdrop-blur">
              Join This FREE Training And Discover Exactly How Thousands Of Regular People Just Like You Are…
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="inline-block w-16 h-1 rounded-full bg-[#b87b1f]" />
            <span className="w-3 h-3 rounded-full border border-[#b87b1f] bg-white dark:bg-transparent" />
            <span className="inline-block w-16 h-1 rounded-full bg-[#b87b1f]" />
          </div>

          <p className="mt-6 text-lg md:text-2xl font-semibold leading-relaxed text-white/90 max-w-5xl mx-auto">
            ...And Find Out What{" "}
            <span className="text-[#ffe08a]">THOUSANDS Of Entrepreneurs, Who Are Just Like You,</span>{" "}
            Are Doing To Start And Grow Their Very Own{" "}
            <span className="text-white underline decoration-2">Credit Repair Businesses!</span>{" "}
            — legally destroying junk debt buyers, wiping out old debts, stopping garnishments cold,
            and turning the tables on collectors – all without spending $10,000+ on a lawyer!
          </p>


          {/* <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/d/cwfz-k3q-w85/creditor-academy-education-counselor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#ffd24c] text-[#10213b] font-semibold px-8 py-3 shadow-lg hover:bg-[#ffcc33] transition"
            >
              Book a Consultation →
            </a>
            <a
              href="https://calendly.com/d/cwfz-k3q-w85/creditor-academy-education-counselor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/60 text-white font-semibold px-8 py-3 hover:bg-white/10 transition"
            >
              Watch a Demo
            </a>
          </div> */}
        </div>

        <div className="mt-12">
          <div className="relative max-w-5xl mx-auto rounded-[32px] overflow-hidden shadow-2xl border border-white/50 bg-white dark:border-white/10 dark:bg-[#0c1322]">
            <div className="relative w-full overflow-hidden shadow-2xl aspect-video bg-black border border-white/10 dark:border-gray-200/30 rounded-none">
              <video
                playsInline
                controls
                controlsList="nodownload"
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src="/video/squeeze.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            <Image
              src="/images/squeeze/squeeze.webp"
              alt="Millionaires Club Awards"
              width={1800}
              height={700}
              className="w-full h-auto object-cover"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}


