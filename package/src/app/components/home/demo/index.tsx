"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const commitments = [
  {
    id: "01",
    title: "Transparency & Trust",
    body: "We ensure complete clarity in every step of your journey — no hidden terms, no surprises, just honesty and integrity.",
  },
  {
    id: "02",
    title: "Personalized Mentorship",
    body: "Every learner receives tailored guidance from experienced mentors who understand your unique goals and challenges.",
  },
  {
    id: "03",
    title: "Career Transformation",
    body: "From knowledge to practice, we equip you with tools and strategies that lead to real, lasting career growth.",
  },
];

// Define variants properly
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export default function CommitmentSection() {
  return (
    <section className="relative w-full bg-[#f9fbff] text-[#0d1b2a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* LEFT SIDE */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="lg:sticky lg:top-24 xl:top-28 text-center lg:text-left">
              <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#026FE2]/70 mb-4 sm:mb-6">
                Creditor Academy
              </p>
              <h2 className="leading-tight font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#026FE2]">
                Our Commitment <br />
                <motion.span
                  className="inline-block mt-2 sm:mt-3 text-[#013a75]"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  To You
                </motion.span>
              </h2>

              {/* CTA */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(2,111,226,0.35)",
                }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 sm:mt-10 inline-flex items-center justify-center rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 text-sm sm:text-base font-medium shadow-md bg-[#026FE2] text-white hover:bg-[#0256b8] transition w-full sm:w-auto"
              >
                Join Creditor Academy
              </motion.button>

              {/* Hand Illustration */}
              <motion.div
                className="mt-8 sm:mt-12 select-none text-6xl sm:text-7xl flex justify-center lg:justify-start"
                aria-hidden
                initial={{ opacity: 0, rotate: -20, y: 40 }}
                whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span role="img" aria-label="hand">
                  🤝
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE CARDS */}
          <div className="lg:col-span-7">
            <div className="relative flex flex-col space-y-6">
              {commitments.map((item, idx) => (
                <motion.article
                  key={item.id}
                  className="sticky top-20 sm:top-24 lg:top-28 z-0 rounded-2xl sm:rounded-3xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-[#026FE2]/10 overflow-hidden"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }} // 👈 handle per-card delay here
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Background Tint */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl"
                    style={{
                      background:
                        "radial-gradient(800px 300px at 70% -20%, rgba(2,111,226,0.08), transparent)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative h-full p-6 sm:p-7 md:p-10 flex flex-col">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <motion.div
                        whileHover={{ rotate: 6, scale: 1.05 }}
                        className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full bg-[#026FE2]/10 grid place-items-center text-base sm:text-lg font-bold text-[#026FE2]"
                      >
                        {item.id}
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug text-[#013a75]">
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#1a2b4c] max-w-prose">
                      {item.body}
                    </p>

                    <div className="mt-auto" />
                    <motion.div
                      className="pt-4 sm:pt-6 text-xs sm:text-sm text-[#4b5c7a]"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Promise {idx + 1} of {commitments.length}
                    </motion.div>
                  </div>
                </motion.article>
              ))}

              {/* Spacer */}
              <div className="h-[20vh] sm:h-[30vh] lg:h-[40vh]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
