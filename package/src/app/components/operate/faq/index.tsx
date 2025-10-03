"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FaqSection() {
  const [active, setActive] = useState<string | null>(null);

  const faqs = [
    {
      id: "1",
      question: "How does it make my problem go away?",
      answer:
        "It removes the stress of public systems by giving you private solutions for business, banking, and protection.",
    },
    {
      id: "2",
      question: "How will it help me?",
      answer:
        "It empowers you to operate outside the broken 9–5 and government-controlled model, giving you freedom and control.",
    },
    {
      id: "3",
      question: "What does it do?",
      answer:
        "It teaches you step-by-step how to run your business privately with trusts, PMAs, and private credit strategies.",
    },
    {
      id: "4",
      question: "How will I know I need it?",
      answer:
        "If you’re tired of taxes, debt, bank denials, or relying on the system, this is your path to sovereignty.",
    },
  ];

  const toggle = (id: string) => {
    setActive((prev) => (prev === id ? null : id));
  };

  // Enhanced Motion variants
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 18,
        delay: 0.2 
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.6 
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-15 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <AnimatedBackground />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 container mx-auto px-6"
      >
        <div>
          {/* Enhanced Header */}
          <motion.div className="text-center mb-16">
            <motion.div 
              variants={headingVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              {/* <Sparkles className="h-8 w-8 text-blue-500 hidden md:block" /> */}
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Frequently Asked{' '}
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
              {/* <Sparkles className="h-8 w-8 text-blue-500 hidden md:block" /> */}
            </motion.div>
            
            <motion.div 
              variants={subtitleVariants}
              className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mb-8"
            />
            
            <motion.p 
              variants={subtitleVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Discover how we tailor our solutions to meet unique needs, delivering impactful strategies, personalized branding, and exceptional customer experiences.
            </motion.p>
          </motion.div>

          {/* Enhanced FAQ Items - Two Column Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {faqs.map((faq, index) => {
              const isOpen = active === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  variants={cardVariants}
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Enhanced Glow Effect - Only when open */}
                  <motion.div
                    className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 transition-all duration-500"
                    animate={isOpen ? { opacity: 0.1 } : { opacity: 0 }}
                    style={{
                      background:
                        "radial-gradient(60% 60% at 30% 30%, rgba(59,130,246,0.4), transparent 60%), radial-gradient(50% 60% at 70% 70%, rgba(99,102,241,0.3), transparent 60%)",
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Main Card */}
                  <div className="relative rounded-3xl border-2 border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl shadow-lg transition-all duration-500 overflow-hidden h-full">
                    {/* Gradient Border Animation */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 opacity-0 transition-opacity duration-500 ${isOpen ? 'opacity-100' : ''}`} 
                         style={{ padding: '2px' }}>
                      <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl h-full" />
                    </div>

                    <div className="relative z-10">
                      <button
                        onClick={() => toggle(faq.id)}
                        className="w-full p-6 lg:p-8 text-left focus:outline-none h-full flex flex-col"
                      >
                        <div className="flex items-start justify-between flex-1">
                          <div className="flex items-start gap-3 lg:gap-4 flex-1">
                            {/* Enhanced Icon */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-sm opacity-70"></div>
                              <div className={`relative p-2 lg:p-3 rounded-full transition-colors duration-300 ${isOpen ? 'bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/50 text-blue-500'}`}>
                                <HelpCircle className={`h-5 w-5 lg:h-6 lg:w-6 transition-all duration-300 ${isOpen ? 'scale-110' : ''}`} />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 dark:text-white mb-2 lg:mb-3 leading-tight">
                                {faq.question}
                              </h3>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, ease: "easeOut" }}
                                  className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed"
                                >
                                  {faq.answer}
                                </motion.div>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced Arrow with Hover Effect */}
                          <div className="ml-2 lg:ml-4 flex-shrink-0">
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-1.5 lg:p-2 rounded-full transition-colors duration-300 cursor-pointer ${isOpen ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-blue-100 dark:hover:bg-blue-800/50 hover:text-blue-600'}`}
                            >
                              <ChevronDown className="h-5 w-5 lg:h-6 lg:w-6" />
                            </motion.div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedBackground() {
  const blobTransition = {
    duration: 16,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {/* Subtle Dot Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] text-gray-400 dark:text-blue-900"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundPosition: "0 0",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Single Subtle Blob */}
      <motion.div
        initial={{ x: -100, y: -50, scale: 1 }}
        animate={{ x: 50, y: 20, scale: 1.05 }}
        transition={{ ...blobTransition, duration: 25 }}
        className="absolute -top-20 -left-20 w-[30rem] h-[30rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59, 130, 246, 0.15), rgba(29, 78, 216, 0.08), transparent)",
        }}
      />

      {/* Secondary Subtle Blob */}
      <motion.div
        initial={{ x: 100, y: 30, scale: 1 }}
        animate={{ x: -30, y: -20, scale: 0.95 }}
        transition={{ ...blobTransition, duration: 30 }}
        className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99, 102, 241, 0.12), rgba(67, 56, 202, 0.06), transparent)",
        }}
      />
    </div>
  );
}
