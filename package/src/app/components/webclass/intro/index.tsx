"use client";

import Image from "next/image";
import { openWebinarRegistration } from "@/app/lib/openWebinarRegistration";

const InstructorSection = () => {
  return (
    <section className="py-16 lg:py-20 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">

          {/* IMAGE */}
          <div className="relative lg:col-span-5 order-2 lg:order-1">

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 z-10">
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
                alt="PaulMichael Rowland"
                width={600}
                height={700}
                className="
                w-full
                h-[340px]
                sm:h-[450px]
                lg:h-[600px]
                object-cover
                "
                priority
              />
            </div>


            {/* Decorative Accent */}
            <div className="
            absolute
            -top-4
            -left-4
            w-full
            h-full
            bg-blue-600/10
            rounded-3xl
            -z-10
            hidden
            lg:block
            " />


            {/* Name Badge */}
            <div className="
            absolute
            bottom-4
            right-4
            bg-white
            rounded-xl
            shadow-xl
            border
            border-slate-200
            px-3
            py-2
            sm:px-5
            sm:py-4
            z-20
            ">

              <h3 className="
              font-bold
              text-slate-900
              text-sm
              sm:text-base
              ">
                PaulMichael Rowland
              </h3>

              <p className="
              text-xs
              sm:text-sm
              font-semibold
              text-blue-600
              ">
                Founder, Creditor Academy
              </p>

            </div>

          </div>



          {/* CONTENT */}
          <div className="
          lg:col-span-7
          order-1
          lg:order-2
          relative
          z-10
          ">


            <h3 className="
            text-sm
            uppercase
            tracking-[3px]
            text-blue-600
            font-bold
            mb-4
            ">
              Meet Your Instructor
            </h3>


            <h2 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            text-slate-900
            leading-tight
            mb-6
            ">
              Learn From{" "}
              <span className="block text-blue-600 mt-2">
                PaulMichael Rowland
              </span>
            </h2>


            <div className="
            space-y-5
            text-slate-700
            text-base
            sm:text-lg
            leading-relaxed
            mb-8
            max-w-xl
            ">

              <p>
                PaulMichael Rowland is the founder of Creditor Academy and
                specializes in teaching private operation strategies,
                business structuring, asset protection, and financial systems
                designed to help individuals gain more control and clarity.
              </p>


              <p>
                Through his frameworks, Paul helps students understand how
                private structures work and how to build stronger financial
                foundations.
              </p>

            </div>



            <button
              type="button"
              onClick={openWebinarRegistration}
              className="
              w-full
              sm:w-auto
              inline-flex
              justify-center
              items-center
              bg-yellow-400
              hover:bg-yellow-300
              text-slate-950
              font-extrabold
              text-lg
              px-8
              py-4
              rounded-xl
              shadow-lg
              transition
              "
            >
              Secure My Spot in the Live Webclass
            </button>


          </div>


        </div>
      </div>
    </section>
  );
};

export default InstructorSection;