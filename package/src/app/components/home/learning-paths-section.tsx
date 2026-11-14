import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  BECOME_PRIVATE_PATH,
  OPERATE_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
} from "@/lib/coursePaths";

export default function LearningPathsSection() {
  return (
    <section id="learning-paths" className="pt-16 pb-8 sm:pt-20 sm:pb-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - locked to a single line on sm+ screens */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#026fe2] mb-3">
            FIND YOUR STARTING POINT
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#1F2A2E] tracking-tight mb-3 sm:whitespace-nowrap">
            Three paths. One clearer next step.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal">
            Compare the topics before you choose a course.
          </p>
        </div>

        {/* 3 Blue 3D Cards Grid with Overlay & Steady Non-Hover Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= CARD 1: BECOME PRIVATE ================= */}
          <Link
            href={BECOME_PRIVATE_PATH}
            className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] border border-white/20 shadow-[0_16px_36px_-12px_rgba(29,78,216,0.32)] h-[395px] sm:h-[420px]"
          >
            {/* Transparent Multi-Tone Blue Overlays for a unique, refined shade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[#172554]/35 via-transparent to-white/20 pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.22),_transparent_65%)] pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />

            {/* Top Typography */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight mb-2">
                Become Private
              </h3>
              <p className="text-blue-100 text-xs sm:text-[13px] leading-relaxed max-w-[92%] font-normal">
                Explore status concepts and document principles.
              </p>
            </div>

            {/* Middle: 3D Lawful Status Document & Ribbon Seal */}
            <div className="absolute inset-x-0 bottom-14 top-20 flex items-center justify-center pointer-events-none select-none">
              <svg
                viewBox="0 0 260 210"
                className="w-full h-full max-h-[220px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="docFace1" x1="60" y1="40" x2="190" y2="170" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#CDE1FE" />
                    <stop offset="35%" stopColor="#82B1FF" />
                    <stop offset="80%" stopColor="#4F86F7" />
                    <stop offset="100%" stopColor="#255CE6" />
                  </linearGradient>
                  <linearGradient id="docShadow1" x1="120" y1="70" x2="140" y2="185" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1E45BF" />
                    <stop offset="100%" stopColor="#0E236C" />
                  </linearGradient>
                  <linearGradient id="sealFace1" x1="140" y1="110" x2="210" y2="180" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#93C5FD" />
                    <stop offset="75%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="ribbonDrop1" x1="160" y1="150" x2="190" y2="195" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#0B1329" />
                  </linearGradient>
                </defs>

                {/* 3D Extrusion Shadow */}
                <path
                  d="M72 45 L178 30 L195 140 L88 156 Z"
                  fill="url(#docShadow1)"
                  opacity="0.8"
                  transform="translate(8, 12)"
                />

                {/* 3D Angled Document Parchment */}
                <path
                  d="M70 42 L176 27 C181 26, 185 30, 186 35 L196 138 C197 143, 193 147, 188 148 L82 163 C77 164, 73 160, 72 155 L66 49 C65 44, 69 40, 70 42 Z"
                  fill="url(#docFace1)"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />

                {/* Specular Fold */}
                <path
                  d="M70 42 L110 36 C105 52, 90 56, 72 56 Z"
                  fill="#FFFFFF"
                  fillOpacity="0.5"
                />

                {/* Embossed Status Lines */}
                <line x1="90" y1="62" x2="162" y2="52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
                <line x1="90" y1="78" x2="162" y2="68" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
                <line x1="90" y1="94" x2="148" y2="86" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.6" />
                <line x1="90" y1="110" x2="135" y2="103" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
                <line x1="90" y1="126" x2="130" y2="120" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.4" />

                {/* Ribbon Streamers */}
                <path d="M165 145 L155 185 L168 178 L178 186 L175 148 Z" fill="url(#ribbonDrop1)" />
                <path d="M178 145 L182 188 L194 180 L204 187 L194 146 Z" fill="url(#ribbonDrop1)" opacity="0.9" />

                {/* 3D Lawful Seal */}
                <circle cx="174" cy="140" r="26" fill="url(#sealFace1)" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="174" cy="140" r="19" fill="#2563EB" stroke="#93C5FD" strokeWidth="1.5" />
                <path
                  d="M174 128 L176 135 L183 135 L177 139 L179 146 L174 142 L169 146 L171 139 L165 135 L172 135 Z"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* Bottom Row: Exact Image 2 Text */}
            <div className="relative z-10 flex items-center justify-between gap-2 pt-3 mt-auto">
              <span className="bg-white text-[#1D4ED8] text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm tracking-tight truncate">
                View Become Private Curriculum
              </span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#1D4ED8] flex items-center justify-center shadow-md shrink-0">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </div>
          </Link>


          {/* ================= CARD 2: OPERATE PRIVATE ================= */}
          <Link
            href={OPERATE_PRIVATE_PATH}
            className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] border border-white/20 shadow-[0_16px_36px_-12px_rgba(29,78,216,0.32)] h-[395px] sm:h-[420px]"
          >
            {/* Transparent Multi-Tone Blue Overlays for a unique, refined shade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[#172554]/35 via-transparent to-white/20 pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.22),_transparent_65%)] pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />

            {/* Top Typography */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight mb-2">
                Operate Private
              </h3>
              <p className="text-blue-100 text-xs sm:text-[13px] leading-relaxed max-w-[92%] font-normal">
                Learn about business trusts, PMAs and legacy planning.
              </p>
            </div>

            {/* Middle: 3D Asset Protection Shield & Trust Vault */}
            <div className="absolute inset-x-0 bottom-14 top-20 flex items-center justify-center pointer-events-none select-none">
              <svg
                viewBox="0 0 260 210"
                className="w-full h-full max-h-[220px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="shieldFront1" x1="70" y1="35" x2="190" y2="175" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#CDE1FE" />
                    <stop offset="30%" stopColor="#82B1FF" />
                    <stop offset="70%" stopColor="#3B73EE" />
                    <stop offset="100%" stopColor="#1B47C5" />
                  </linearGradient>
                  <linearGradient id="shieldDepth1" x1="130" y1="70" x2="130" y2="195" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1E45BF" />
                    <stop offset="70%" stopColor="#122E8A" />
                    <stop offset="100%" stopColor="#0B1B54" />
                  </linearGradient>
                  <radialGradient id="vaultGlow1" cx="130" cy="110" r="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0B1B54" />
                    <stop offset="80%" stopColor="#122E8A" />
                    <stop offset="100%" stopColor="#3B73EE" />
                  </radialGradient>
                </defs>

                {/* 3D Extruded Shield Base Shadow */}
                <path
                  d="M130 38 L196 58 C196 118, 172 165, 130 188 C88 165, 64 118, 64 58 Z"
                  fill="url(#shieldDepth1)"
                  transform="translate(0, 10)"
                  opacity="0.85"
                />

                {/* Main 3D Bevelled Shield */}
                <path
                  d="M130 35 L195 55 C195 116, 171 163, 130 185 C89 163, 65 116, 65 55 Z"
                  fill="url(#shieldFront1)"
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                  strokeOpacity="0.45"
                />

                {/* Left Light Facet */}
                <path
                  d="M130 35 L65 55 C65 116, 89 163, 130 185 Z"
                  fill="#FFFFFF"
                  fillOpacity="0.15"
                />

                {/* Top Highlight Edge */}
                <path
                  d="M130 36 L192 55 L182 62 L130 46 L78 62 L68 55 Z"
                  fill="#FFFFFF"
                  fillOpacity="0.5"
                />

                {/* Inner Trust Inscription Ring */}
                <circle cx="130" cy="110" r="28" fill="url(#vaultGlow1)" stroke="#93C5FD" strokeWidth="2.5" />
                <circle cx="130" cy="110" r="21" fill="#0E236C" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.3" />

                {/* 3D Vault Keyhole */}
                <circle cx="130" cy="104" r="6" fill="#FFFFFF" />
                <path d="M127 106 L133 106 L135 120 L125 120 Z" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Bottom Row: Exact Image 2 Text */}
            <div className="relative z-10 flex items-center justify-between gap-2 pt-3 mt-auto">
              <span className="bg-white text-[#1D4ED8] text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm tracking-tight truncate">
                View Operate Private Curriculum
              </span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#1D4ED8] flex items-center justify-center shadow-md shrink-0">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </div>
          </Link>


          {/* ================= CARD 3: FINANCIAL FREEDOM ================= */}
          <Link
            href={FINANCIAL_FREEDOM_PATH}
            className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] border border-white/20 shadow-[0_16px_36px_-12px_rgba(29,78,216,0.32)] h-[395px] sm:h-[420px]"
          >
            {/* Transparent Multi-Tone Blue Overlays for a unique, refined shade */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-[#172554]/35 via-transparent to-white/20 pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.22),_transparent_65%)] pointer-events-none rounded-[28px] sm:rounded-[32px]"
            />

            {/* Top Typography */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-[25px] font-bold text-white tracking-tight mb-2">
                Financial Freedom
              </h3>
              <p className="text-blue-100 text-xs sm:text-[13px] leading-relaxed max-w-[92%] font-normal">
                Understand personal and business credit foundations.
              </p>
            </div>

            {/* Middle: 3D Credit Card & Capital Growth Tiers */}
            <div className="absolute inset-x-0 bottom-14 top-20 flex items-center justify-center pointer-events-none select-none">
              <svg
                viewBox="0 0 260 210"
                className="w-full h-full max-h-[220px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="cardFront1" x1="40" y1="60" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#CDE1FE" />
                    <stop offset="35%" stopColor="#82B1FF" />
                    <stop offset="75%" stopColor="#3B73EE" />
                    <stop offset="100%" stopColor="#1E45BF" />
                  </linearGradient>
                  <linearGradient id="cardExtrude1" x1="100" y1="80" x2="160" y2="185" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1B47C5" />
                    <stop offset="100%" stopColor="#0B1B54" />
                  </linearGradient>
                  <linearGradient id="chipGold1" x1="75" y1="90" x2="105" y2="115" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#CA8A04" />
                  </linearGradient>
                  <linearGradient id="growthBar1" x1="160" y1="70" x2="220" y2="150" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="40%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>

                {/* 3D Extrusion Depth */}
                <rect
                  x="56"
                  y="72"
                  width="142"
                  height="88"
                  rx="14"
                  transform="rotate(-10 127 116)"
                  fill="url(#cardExtrude1)"
                  opacity="0.85"
                />

                {/* Floating 3D Tier-1 Credit Card */}
                <rect
                  x="52"
                  y="62"
                  width="142"
                  height="88"
                  rx="14"
                  transform="rotate(-10 123 106)"
                  fill="url(#cardFront1)"
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                  strokeOpacity="0.45"
                />

                {/* Specular Light Bar */}
                <path
                  d="M60 85 L145 70 L135 125 L50 140 Z"
                  fill="#FFFFFF"
                  fillOpacity="0.18"
                />

                {/* EMV Microchip */}
                <rect
                  x="75"
                  y="92"
                  width="22"
                  height="18"
                  rx="4"
                  transform="rotate(-10 86 101)"
                  fill="url(#chipGold1)"
                  stroke="#A16207"
                  strokeWidth="0.8"
                />
                <line x1="82" y1="94" x2="82" y2="110" stroke="#854D0E" strokeWidth="0.7" />
                <line x1="88" y1="93" x2="88" y2="109" stroke="#854D0E" strokeWidth="0.7" />

                {/* Embossed Card Numbers */}
                <circle cx="78" cy="125" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="86" cy="124" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="94" cy="123" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="102" cy="122" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />

                <circle cx="114" cy="120" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="122" cy="119" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="130" cy="118" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />
                <circle cx="138" cy="117" r="2.5" fill="#FFFFFF" fillOpacity="0.8" />

                {/* Ascending Credit Funding Tier Growth Steps */}
                <rect x="175" y="112" width="10" height="24" rx="4" fill="url(#growthBar1)" />
                <rect x="190" y="98" width="10" height="38" rx="4" fill="url(#growthBar1)" />
                <rect x="205" y="82" width="10" height="54" rx="4" fill="url(#growthBar1)" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.5" />
                
                {/* Upward Growth Arrow */}
                <path
                  d="M182 92 L206 68 L218 80"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M206 68 L214 66 L218 74"
                  fill="#FFFFFF"
                />
              </svg>
            </div>

            {/* Bottom Row: Exact Image 2 Text */}
            <div className="relative z-10 flex items-center justify-between gap-2 pt-3 mt-auto">
              <span className="bg-white text-[#1D4ED8] text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm tracking-tight truncate">
                View Financial Freedom Curriculum
              </span>
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#1D4ED8] flex items-center justify-center shadow-md shrink-0">
                <ArrowRight size={15} strokeWidth={2.5} />
              </div>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
