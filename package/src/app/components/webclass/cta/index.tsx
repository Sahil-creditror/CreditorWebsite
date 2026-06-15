"use client";

import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";
import { ArrowRight, Sparkles, Users } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="
relative
overflow-hidden
py-24
md:py-24
bg-gradient-to-br
from-sky-100
via-blue-50
to-white
"
    >
      {/* Background Effects */}

      <div
        className="
absolute
top-0
left-0
w-96
h-96
bg-blue-300/30
rounded-full
blur-3xl
"
      />

      <div
        className="
absolute
bottom-0
right-0
w-[450px]
h-[450px]
bg-cyan-300/30
rounded-full
blur-3xl
"
      />

      <div
        className="
relative
z-10
max-w-5xl
mx-auto
px-6
text-center
"
      >
        {/* Badge */}

        <div
          className="
inline-flex
items-center
gap-2
px-5
py-2
rounded-full
bg-white
border
border-blue-200
text-blue-600
font-bold
text-sm
uppercase
tracking-widest
shadow-sm
"
        >
          Final Invitation
        </div>

        {/* Heading */}

        <h2
          className="
mt-8
text-4xl
md:text-6xl
font-black
leading-tight
text-slate-900
"
        >
          Ready To Learn How To
          <span
            className="
block
bg-gradient-to-r
from-blue-700
via-blue-600
to-cyan-500
bg-clip-text
text-transparent
"
          >
            Become & Operate Private?
          </span>
        </h2>

        {/* Description */}

        <p
          className="
mt-6
max-w-2xl
mx-auto
text-lg
md:text-xl
text-slate-600
leading-relaxed
"
        >
          Join the next free training session and discover the frameworks behind
          private operation, asset protection, business structuring, and
          financial freedom.
        </p>

        {/* CTA CARD */}

        <div
          className="
mt-12
mx-auto
max-w-3xl
bg-white/80
backdrop-blur-xl
rounded-[35px]
border
border-blue-100
shadow-2xl
p-8
md:p-12
"
        >
          <div
            className="
flex
flex-col
items-center
"
          >
            <div
              className="
w-16
h-16
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
shadow-lg
mb-6
"
            >
              <Users size={30} />
            </div>

            <button
              type="button"
              onClick={openWebinarRegistration}
              className="
text-2xl
md:text-3xl
font-black
text-slate-900
"
            >
              Reserve Your Free Seat Now
            </button>

            <p
              className="
mt-3
text-slate-600
"
            >
              Limited seats available for the upcoming live webclass.
            </p>

              <button
                type="button"
                onClick={openWebinarRegistration}
                className="
mt-8
group
flex
items-center
gap-3
bg-gradient-to-r
from-blue-600
to-cyan-500
hover:from-blue-700
hover:to-cyan-600
text-white
font-black
text-lg
px-10
py-5
rounded-full
shadow-xl
shadow-blue-500/30
transition
"
              >
                Reserve My Free Seat Now
                <ArrowRight
                  className="
group-hover:translate-x-1
transition
"
                />
              </button>
          </div>
        </div>

        {/* Bottom Text */}

        <div
          className="
mt-8
text-sm
text-slate-500
"
        >
          ✓ Free Training &nbsp; • &nbsp; ✓ Expert Guidance &nbsp; • &nbsp; ✓
          Limited Availability
        </div>
      </div>
    </section>
  );
}
