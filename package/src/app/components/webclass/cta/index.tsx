"use client";

import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";
import { ArrowRight, Users } from "lucide-react";

export default function CTASection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-8
        md:py-10
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
          w-72
          h-72
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
          w-80
          h-80
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
          px-5
          text-center
        "
      >


        {/* Heading */}
        <h2
          className="
            mt-4
            text-3xl
            sm:text-4xl
            md:text-6xl
            font-black
            leading-tight
            text-slate-900
          "
        >
          Ready To Learn How To{" "}
          
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
            mt-4
            max-w-xl
            mx-auto
            text-base
            sm:text-lg
            text-slate-600
          "
        >
          Join the next free training session.
        </p>



        {/* CTA CARD */}
        <div
          className="
            mt-8
            mx-auto
            max-w-3xl
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            border
            border-blue-100
            shadow-xl
            p-5
            sm:p-8
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
                w-12
                h-12
                sm:w-16
                sm:h-16
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                mb-4
              "
            >
              <Users size={24} />
            </div>



            <button
              type="button"
              onClick={openWebinarRegistration}
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                w-full
                sm:w-auto
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                hover:from-blue-700
                hover:to-cyan-600
                text-white
                font-black
                text-base
                sm:text-lg
                px-6
                sm:px-10
                py-4
                rounded-full
                shadow-lg
                transition
                active:scale-[0.98]
                mb-4
              "
            >
              Reserve My Free Seat Now

              <ArrowRight
                size={20}
                className="
                  group-hover:translate-x-1
                  transition
                "
              />

            </button>



            <p
              className="
                text-xs
                md:text-sm
                text-slate-600
              "
            >
              Limited seats available for the upcoming live webclass.
            </p>


          </div>

        </div>


      </div>

    </section>
  );
}