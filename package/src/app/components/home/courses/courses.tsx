"use client";

import {
  BECOME_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
  OPERATE_PRIVATE_PATH,
} from "@/lib/coursePaths";

const CourseRoadmap: React.FC = () => {
  const courses = [
    {
      title: "Become Private",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883850/creditor-website-assets/images/projects/projectlist/become.webp",
      subtitle: "Reclaim Your Lawful Identity",
      description: "Step out of public systems and transition your legal parameters into the private domain.",
      learnings: [
        "Status correction principles",
        "Remove from public jurisdiction",
        "Essential lawful documents",
      ],
      href: BECOME_PRIVATE_PATH,
    },
    {
      title: "Operate Private",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883858/creditor-website-assets/images/projects/projectlist/operate.webp",
      subtitle: "Asset Protection & Business",
      description: "Build, manage, and scale an independent private empire shielded from public liabilities.",
      learnings: [
        "Unincorporated Business Trusts",
        "Private Membership Associations",
        "Family legacy planning",
      ],
      href: OPERATE_PRIVATE_PATH,
      highlight: true,
    },
    {
      title: "Financial Freedom",
      image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883854/creditor-website-assets/images/projects/projectlist/financial.webp",
      subtitle: "Capital & Credit Architectures",
      description: "Master the architecture of modern private commerce, banking funding, and credit systems.",
      learnings: [
        "Private Business Credit",
        "Personal Credit Repair",
        "Credit card stacking strategies",
      ],
      href: FINANCIAL_FREEDOM_PATH,
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 px-5 sm:px-8 bg-gradient-to-br from-blue-100/50 via-slate-50 to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 transition-colors duration-500">

      {/* Background Ambient Blur Rings */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-400/15 dark:bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore Our Premium Catalogs
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mt-4 rounded-full" />
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Structured masterclasses designed to help you build, protect, and expand your private foundation.
          </p>
        </div>

        {/* Cards Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch justify-items-center">
          {courses.map((course) => (
            <div
              key={course.title}
              className={`group relative w-full max-w-md flex flex-col rounded-[32px] transition-all duration-500 ${course.highlight ? "lg:-translate-y-4" : ""
                }`}
            >
              {/* Highlight Background Glow */}
              {course.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-200/20 dark:from-blue-500/10 dark:to-violet-500/10 blur-2xl rounded-[32px] pointer-events-none" />
              )}

              {/* Card Container Frame */}
              <div className={`relative flex flex-col h-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${course.highlight
                ? "border-blue-400/40 dark:border-violet-500/40 ring-1 ring-blue-400/20"
                : "border-slate-200/60 dark:border-slate-800/60"
                }`}>

                {/* Image Element */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                  {course.highlight && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-[10px] font-black tracking-wider uppercase shadow-sm">
                      RECOMMENDED
                    </span>
                  )}
                </div>

                {/* Card Context Body */}
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                      {course.subtitle}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed min-h-[40px]">
                      {course.description}
                    </p>

                    {/* Streamlined Core Bullet Layout */}
                    <div className="mt-5 space-y-2.5">
                      {course.learnings.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clean Action Interface */}
                  <div className="mt-8">
                    <a
                      href={course.href}
                      className={`inline-flex items-center justify-center w-full py-3 px-4 rounded-xl font-bold text-sm transition duration-300 ${course.highlight
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-500/10"
                        : "bg-slate-900 hover:bg-blue-600 text-white dark:bg-slate-800 dark:hover:bg-violet-600"
                        }`}
                    >
                      Explore Syllabus
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CourseRoadmap;