import Image from "next/image";
import Link from "next/link";
import { Award, ShieldCheck, Users, Video, ArrowRight } from "lucide-react";

export default function InstructorCredibility() {
  return (
    <section className="pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-8 lg:pb-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Compact, Clean Instructor Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[310px] sm:max-w-[340px] aspect-[1024/972] rounded-2xl overflow-hidden shadow-lg shadow-slate-200/90 border border-slate-200/80 bg-white">
              
              {/* High-Resolution Artwork */}
              <Image
                src="/images/home/paulmichael-instructor.webp"
                alt="PaulMichael Rowland"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-center"
                priority
              />

              {/* Top-Left Floating Badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#102a43] text-xs font-bold shadow-sm border border-white/70">
                  <ShieldCheck size={13} className="text-[#026fe2]" />
                  Lead Instructor
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Spread Out, Concise & High-Impact Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left lg:pl-2">
            
            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#026fe2] text-xs font-bold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#026fe2]" />
              <span>MEET YOUR INSTRUCTOR</span>
            </div>
            
            {/* Instructor Name */}
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#102a43] tracking-tight leading-[1.1] mb-2.5">
              PaulMichael Rowland
            </h2>

            {/* Concise Subtitle (Only necessary text) */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-6 max-w-xl">
              Explore the curriculum and the practical teaching approach before you enroll.
            </p>

            {/* 4 Crisp Credibility Micro-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mb-6">
              
              {/* Pillar 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#026fe2] flex items-center justify-center shrink-0">
                  <Award size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#102a43] leading-snug">
                    10+ Years Experience
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Private Wealth Education
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#026fe2] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#102a43] leading-snug">
                    3-Track Framework
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Become, Operate &amp; Freedom
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#026fe2] flex items-center justify-center shrink-0">
                  <Users size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#102a43] leading-snug">
                    Active Graduates
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Hundreds of Trust Students
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#026fe2] flex items-center justify-center shrink-0">
                  <Video size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-[#102a43] leading-snug">
                    Live Mentorship
                  </h4>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    Weekly Direct Q&amp;A Guidance
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#102a43] hover:bg-[#026fe2] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.99] group"
              >
                <span>Meet PaulMichael</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/services/course-cataloges"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#026fe2] transition-colors py-2 px-1"
              >
                <span>Explore Courses</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
