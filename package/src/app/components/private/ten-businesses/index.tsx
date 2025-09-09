"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TenBusinesses() {
  const [showCards, setShowCards] = useState(false);

  const businesses = [
    { 
      name: "E-commerce Store", 
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      hoverColor: "group-hover:text-blue-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' /></svg> 
    },
    { 
      name: "Digital Marketing Agency", 
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      hoverColor: "group-hover:text-purple-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' /></svg> 
    },
    { 
      name: "Consulting Firm", 
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      hoverColor: "group-hover:text-indigo-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' /></svg> 
    },
    { 
      name: "Real Estate Investment", 
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      hoverColor: "group-hover:text-amber-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' /></svg> 
    },
    { 
      name: "Franchise Business", 
      color: "text-green-500",
      bgColor: "bg-green-50",
      hoverColor: "group-hover:text-green-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' /></svg> 
    },
    { 
      name: "Subscription Box Service", 
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      hoverColor: "group-hover:text-pink-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' /></svg> 
    },
    { 
      name: "Mobile App Development", 
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      hoverColor: "group-hover:text-cyan-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' /></svg> 
    },
    { 
      name: "Online Education Platform", 
      color: "text-red-500",
      bgColor: "bg-red-50",
      hoverColor: "group-hover:text-red-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M12 14l9-5-9-5-9 5 9 5z' /><path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' /></svg> 
    },
    { 
      name: "Content Creation Agency", 
      color: "text-teal-500",
      bgColor: "bg-teal-50",
      hoverColor: "group-hover:text-teal-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z' /></svg> 
    },
    { 
      name: "Event Planning Business", 
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      hoverColor: "group-hover:text-orange-600",
      icon: <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg> 
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      {/* Enhanced Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 opacity-30 dark:opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-24 right-0 w-80 h-80 bg-indigo-400 opacity-20 dark:opacity-10 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-300 opacity-20 dark:opacity-10 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      </div>

      <div className="text-center mb-16 relative z-10">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-white"
        >
          Unlock Your Entrepreneurial Potential
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 text-3xl md:text-4xl mt-2">
            10 Business Ideas to Launch with Your Newfound Financial Freedom
          </span>
        </motion.h2>
        
        <motion.button
          onClick={() => setShowCards(!showCards)}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center"
        >
          What you can achieve
          <motion.svg
            animate={{ rotate: showCards ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>
      </div>

      {showCards && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto relative z-10 mt-12"
        >
          {businesses.map((business, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ 
                y: -8, 
                scale: 1.04, 
                boxShadow: "0 20px 25px -5px rgba(76, 81, 255, 0.12), 0 10px 10px -5px rgba(76, 81, 255, 0.04)" 
              }}
              viewport={{ once: true, margin: "0px" }}
              className="group relative"
            >
              <div className="bg-white dark:bg-slate-800/50 rounded-3xl p-6 shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-slate-600 group-hover:border-indigo-300 dark:group-hover:border-indigo-500 transition-all duration-300 h-full flex flex-col items-center text-center">
                {/* Enhanced glow effect with dynamic color */}
                <div className={`absolute left-1/2 top-8 -translate-x-1/2 -z-10 w-20 h-20 rounded-full ${business.color.replace('text', 'bg')} opacity-10 blur-2xl group-hover:opacity-20 group-hover:w-24 group-hover:h-24 transition-all duration-500`}></div>
                
                {/* Icon container with gradient border */}
                <div className={`mb-6 p-4 rounded-2xl ${business.bgColor} dark:bg-slate-700/50 group-hover:bg-opacity-80 transition-all duration-300`}>
                  <div className={`${business.color} dark:text-indigo-400`}>
                    {business.icon}
                  </div>
                </div>
                
                <h3 className={`text-xl font-bold mb-2 text-slate-800 dark:text-white ${business.hoverColor} transition-colors duration-300`}>
                  {business.name}
                </h3>
                
                {/* Subtle hover indicator with dynamic color */}
                <div className={`w-8 h-1 ${business.color.replace('text', 'bg')} rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {showCards && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16 relative z-10"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Enroll in Our Course Today
          </motion.button>
        </motion.div>
      )}
    </section>
  );
}