"use client";
import React from "react";
import { motion } from "framer-motion";

export default function CourseFeatures() {
  const cardData = [
    {
      title: "Comprehensive Curriculum",
      description: "In-depth modules covering all aspects of business credit building, from basics to advanced strategies.",
      icon: "📚",
      color: "#4f46e5",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Expert Guidance",
      description: "Learn from industry professionals with years of experience in business finance and credit.",
      icon: "👨‍🏫",
      color: "#7c3aed",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Practical Tools & Resources",
      description: "Access templates, checklists, and actionable steps to implement your credit building plan effectively.",
      icon: "🛠️",
      color: "#059669",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Community Support",
      description: "Join a thriving community of entrepreneurs for networking, support, and shared learning experiences.",
      icon: "🤝",
      color: "#ea580c",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-white"
        >
          What You'll Achieve
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-5xl md:text-6xl mt-2">
            After This Course
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Transform theoretical knowledge into powerful real-world applications
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative z-10">
        {cardData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ y: 60, opacity: 0, rotate: 2 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -15, scale: 1.02 }}
            viewport={{ once: true, margin: "0px" }}
            className="group relative"
          >
            {/* Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden transition-all duration-300 h-full flex flex-col">
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>
              
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-12 h-12 rounded-bl-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: item.color }}></div>
              
              {/* Icon container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-2 relative overflow-hidden">
                  {/* Icon background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 rounded-xl`}></div>
                  {/* Icon */}
                  <span className="relative z-10 text-3xl">{item.icon}</span>
                </div>
                {/* Animated underline */}
                <div className={`w-12 h-1 bg-gradient-to-r ${item.gradient} rounded-full mt-2 group-hover:w-16 transition-all duration-300`}></div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-grow">
                {item.description}
              </p>
              
              {/* Action indicator */}
              {/* <div className="flex items-center text-sm font-medium" style={{ color: item.color }}>
                <span>Learn how</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div> */}
            </div>
            
            {/* Floating effect background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300 -z-10 translate-y-4 group-hover:translate-y-6`}></div>
          </motion.div>
        ))}
      </div>
    <div className="text-center mt-16 mb-16">
        {/* <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-600 dark:to-indigo-600 border-none rounded-full py-4 px-10 text-white font-semibold cursor-pointer shadow-lg mt-6 text-lg transition-all duration-300"
        >
          Enroll Now
        </motion.button> */}
      </div>
    </section>
  );
}
