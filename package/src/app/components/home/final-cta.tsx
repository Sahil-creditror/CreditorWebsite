import Link from "next/link";
import { ArrowRight, Play, Compass } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-slate-200/60 relative overflow-hidden">
      {/* Subtle brand glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          GET STARTED TODAY
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
          Ready to build and protect your private wealth?
        </h2>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of students learning business trusts, asset protection, and financial freedom through Creditor Academy.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/webinar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all duration-200 shadow-md shadow-primary/20 active:scale-[0.98]"
          >
            <Play size={16} className="fill-white" />
            <span>Watch Free Training</span>
          </Link>

          <Link
            href="/services/course-cataloges"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-secondary text-secondary font-bold text-sm hover:bg-secondary hover:text-white transition-all duration-200 active:scale-[0.98]"
          >
            <Compass size={16} />
            <span>Explore Courses</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

