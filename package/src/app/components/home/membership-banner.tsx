import Link from "next/link";
import { Users, Calendar, Shield, FileCheck, ArrowRight } from "lucide-react";

export default function MembershipBanner() {
  const benefits = [
    {
      iconKey: "calendar",
      title: "Weekly Live Interactive Classes",
      desc: "Ask questions, review filings, and get direct mentorship in real time.",
    },
    {
      iconKey: "shield",
      title: "All 3 Core Learning Tracks",
      desc: "Full curriculum access to Become Private, Operate Private & Financial Freedom.",
    },
    {
      iconKey: "users",
      title: "Private PMA Member Community",
      desc: "Network with verified sovereign operators and collaborative business owners.",
    },
    {
      iconKey: "file",
      title: "Document Vault & Legal Templates",
      desc: "Download verified trust indentures, PMA bylaws, and creditor filings.",
    },
  ];

  return (
    <section className="bg-secondary text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Top Bar (matches user mockup) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-primary shrink-0 border border-white/10">
              <Users size={28} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-1">
                Keep learning with Masterclass Membership
              </h2>
              <p className="text-sm sm:text-base text-slate-300">
                Review live-class access, community benefits and membership terms.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/masterclass-membership"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20 active:scale-[0.98]"
            >
              <span>View Membership &amp; Pricing</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Benefits Grid (Clearly explained included benefits) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-sky-400 flex items-center justify-center mb-4">
                {benefit.iconKey === "calendar" && <Calendar size={20} />}
                {benefit.iconKey === "shield" && <Shield size={20} />}
                {benefit.iconKey === "users" && <Users size={20} />}
                {benefit.iconKey === "file" && <FileCheck size={20} />}
              </div>
              <h3 className="font-bold text-base text-white mb-1.5">
                {benefit.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

