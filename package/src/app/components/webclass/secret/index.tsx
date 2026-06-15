"use client";

import Image from "next/image";
import Link from "next/link";

export default function LearningSection() {
  const learningPoints = [
    {
      module: "MODULE 1",
      title: "How Private Individuals Think & Operate Differently",
      description:
        "Understand the mindset, principles, and framework behind private operation and learn how successful individuals position themselves with clarity and control.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883940/creditor-website-assets/images/webinar/3.webp",
    },
    {
      module: "MODULE 2",
      title: "Trusts & Private Association Structures",
      description:
        "Discover how private structures are designed to create separation, protection, and stronger foundations for business and legacy planning.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883939/creditor-website-assets/images/webinar/2.webp",
    },
    {
      module: "MODULE 3",
      title: "Business Credit & Financial Leverage",
      description:
        "Learn strategies around business credit, financial positioning, and building systems that support long-term growth.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883938/creditor-website-assets/images/webinar/1.webp",
    },
    {
      module: "MODULE 4",
      title: "Building Your Private Enterprise Roadmap",
      description:
        "Create a complete roadmap that connects your assets, operations, and financial strategy into one clear structure.",
      image:
        "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883940/creditor-website-assets/images/webinar/3.webp",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-24 bg-gradient-to-br from-indigo-100 via-sky-50 to-blue-100 text-slate-800">
      
      {/* Soft Ambient Vector Blurs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-300/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-200/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-blue-200/60 text-blue-700 font-bold text-xs md:text-sm uppercase tracking-widest shadow-sm">
            Inside The Free Webclass
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900 tracking-tight">
            What You Will{" "}
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mt-1">
              Discover Inside Creditor Academy
            </span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-medium">
            Learn the complete framework around private operation, business structures, and financial strategies.
          </p>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-6 rounded-full shadow-md" />
        </div>

        {/* 2x2 BALANCED GRID */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {learningPoints.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white/70 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/60 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:border-blue-300/50 transition-all duration-300 group"
            >
              <div>
                {/* IMAGE CONTAINER */}
                <div className="relative h-[240px] rounded-2xl overflow-hidden bg-slate-900 mb-6 shadow-md">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-w-7xl) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Shadow Base */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-80" />

                  {/* Corner Module Identifier Tag */}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/50 shadow-md">
                    <span className="text-xs font-black tracking-widest text-yellow-400">
                      {item.module}
                    </span>
                  </div>
                </div>

                {/* TEXT CONTENT CONTAINER */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-blue-600 tracking-widest uppercase block">
                    {item.module}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BRIGHT CALL TO ACTION CARD */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-center px-6 py-12 md:py-16 shadow-xl shadow-blue-900/20 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
          
          <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Ready To Unlock The Framework?
          </h3>

          <p className="mt-3 text-blue-100 text-sm md:text-lg font-normal max-w-md mx-auto">
            Reserve your seat for the free live webclass today. Spaces are strictly monitored.
          </p>

          <Link
            href="/webinar"
            className="mt-8 w-full sm:w-auto inline-flex justify-center items-center bg-yellow-400 hover:bg-yellow-300 active:scale-[0.98] text-slate-950 font-black text-base md:text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-200">
            Secure My Spot in the Live Webclass
          </Link>
        </div>

      </div>
    </section>
  );
}