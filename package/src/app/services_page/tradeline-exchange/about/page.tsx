// @ts-nocheck
"use client";

import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaChartLine,
  FaEye,
  FaGraduationCap,
} from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-28 px-6 md:px-12">
      {/* floating background accents */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-400/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-300/20 blur-[180px] rounded-full" />

      <div className="relative max-w-7xl mx-auto space-y-32">

        {/* ================= HERO ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative rounded-[3rem] bg-gradient-to-br from-slate-950 via-slate-900 to-black px-10 md:px-24 py-28 text-center shadow-[0_40px_140px_rgba(0,0,0,0.65)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_60%)]" />

          <h1 className="relative text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            About Us
          </h1>

          <p className="relative mt-8 max-w-3xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed">
            We are The Credit Exchange, a platform built to bring order, visibility,
            and fairness to how established credit accounts are accessed and understood.
          </p>
        </motion.div>

        {/* ================= HOW IT WORKS ================= */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-8"
          >
            How the Exchange Works
          </motion.h2>

          <p className="text-slate-600 max-w-4xl mx-auto text-lg text-center mb-24">
            We operate a controlled marketplace that connects qualified participants
            with seasoned authorized user tradelines, presented with clear data and
            defined availability.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="grid md:grid-cols-3 gap-14"
          >
            {[
              {
                title: "Verification & Review",
                desc: "All tradelines listed on the Exchange undergo account integrity before being made available.",
                icon: <FaShieldAlt />,
              },
              {
                title: "Structured Access",
                desc: "Slots, timelines, and pricing are determined by account structure, age, and utilization—not marketing pressure.",
                icon: <FaChartLine />,
              },
              {
                title: "Ongoing Oversight",
                desc: "Accounts are monitored throughout the access period to ensure continued alignment with platform standards and reporting expectations.",
                icon: <MdOutlineSecurity />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -14, rotateX: 4 }}
                transition={{ type: "spring", stiffness: 160 }}
                className="group relative bg-white rounded-[2.5rem] p-12 shadow-2xl border border-slate-200 hover:shadow-[0_40px_80px_rgba(2,132,199,0.25)]"
              >
                <div className="absolute -top-7 left-12 w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-xl">
                  {item.icon}
                </div>

                <h3 className="mt-12 text-2xl font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ================= VALUES ================= */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-8"
          >
            What We Stand For
          </motion.h2>

          <p className="text-slate-600 max-w-4xl mx-auto text-lg text-center mb-24">
            Credit works best when people understand how it functions. Authorized user
            tradelines represent one part of a larger credit ecosystem, and our platform
            exists to bring structure and clarity to how they are used within it.
          </p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              {
                title: "Transparency First",
                desc: "Clear data, defined timelines, and realistic expectations",
                icon: <FaEye />,
              },
              {
                title: "System Awareness",
                desc: "Education focused on how credit actually functions—not shortcuts",
                icon: <FaGraduationCap />,
              },
              {
                title: "Responsible Access",
                desc: "A controlled environment designed for long-term positioning",
                icon: <MdOutlineSecurity />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 150 }}
                className="relative group bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-200 hover:border-sky-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center text-sky-600 mb-8 group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </section>
  );
}
