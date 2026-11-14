import Link from "next/link";
import { PlayCircle, Compass, GraduationCap, ArrowRight } from "lucide-react";

export default function HowLearningWorks() {
  const steps = [
    {
      step: "01",
      title: "Watch Free Training",
      badge: "No Obligation",
      desc: "Get an introduction to private sovereignty, business trusts, and credit mechanics through our comprehensive 45-minute masterclass.",
      actionText: "Watch Training",
      actionHref: "/webinar",
      iconKey: "play",
    },
    {
      step: "02",
      title: "Choose Your Path",
      badge: "Curriculum Choice",
      desc: "Compare Become Private, Operate Private, and Financial Freedom to focus on what you need most — personal standing or enterprise protection.",
      actionText: "Explore Tracks",
      actionHref: "/services/course-cataloges",
      iconKey: "compass",
    },
    {
      step: "03",
      title: "Enroll & Master",
      badge: "Live & On-Demand",
      desc: "Access step-by-step video lessons, verified templates, and join live weekly classes on Athena LMS with direct mentor guidance.",
      actionText: "Join Membership",
      actionHref: "/masterclass-membership",
      iconKey: "grad",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            YOUR EDUCATIONAL JOURNEY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight mb-3">
            How Learning Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From your very first lesson to complete private operational mastery.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => (
            <div
              key={item.step}
              className="relative bg-slate-50/70 rounded-2xl border border-slate-200/80 p-8 flex flex-col justify-between hover:bg-white hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div>
                {/* Step Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {item.iconKey === "play" && <PlayCircle size={24} />}
                    {item.iconKey === "compass" && <Compass size={24} />}
                    {item.iconKey === "grad" && <GraduationCap size={24} />}
                  </div>
                  <span className="text-2xl font-black text-slate-300">
                    {item.step}
                  </span>
                </div>

                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-md mb-3">
                  {item.badge}
                </span>

                <h3 className="text-xl font-bold text-secondary mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <Link
                  href={item.actionHref}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                >
                  <span>{item.actionText}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

