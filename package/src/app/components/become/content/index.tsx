"use client";

import React, { useState } from "react";
import { FaLock, FaRocket, FaBook, FaLightbulb } from "react-icons/fa";
import { motion, AnimatePresence, Variants } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
  icon: React.ReactNode;
};

const FAQSection: React.FC = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "How does it make my problem go away?",
      answer: "It breaks you free from debt, taxes, and government overreach by showing you private remedies.",
      icon: <FaLock className="text-2xl" />
    },
    {
      question: "How will it help me?",
      answer: "It gives you the tools to protect your assets, secure your rights, and reclaim control of your life.",
      icon: <FaRocket className="text-2xl" />
    },
    {
      question: "What does it do?",
      answer: "It teaches you the foundations of sovereignty and step-by-step how to transition into the private.",
      icon: <FaBook className="text-2xl" />
    },
    {
      question: "How will I know I need it?",
      answer: "If you feel trapped in the system, burdened by rules, or searching for true freedom, you're ready.",
      icon: <FaLightbulb className="text-2xl" />
    }
  ];

  const handleCardClick = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
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

  return (
    <div className="w-full py-20 px-4 bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
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

      {/* Flip Cards Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqData.map((item, index) => (
            <div key={index} className="h-80">
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => handleCardClick(index)}
              >
                <AnimatePresence mode="wait">
                  {flippedIndex !== index ? (
                    // Front Card - Question
                    <motion.div
                      key="front"
                      initial={{ opacity: 1, rotateY: 0 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: -90 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center text-center transition-colors duration-300"
                    >
                      <div className="w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white mb-6 shadow-lg transition-colors duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                        {item.question}
                      </h3>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold text-lg transition-colors duration-300">
                        Click to reveal answer
                      </div>
                    </motion.div>
                  ) : (
                    // Back Card - Answer
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-800 dark:to-blue-900 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center text-center transition-colors duration-300"
                    >
                      {/* <div className="text-white dark:text-blue-100 text-2xl font-bold mb-6 transition-colors duration-300">
                        Answer
                      </div> */}
                      <p className="text-white dark:text-blue-100 text-xl leading-relaxed font-medium transition-colors duration-300">
                        {item.answer}
                      </p>
                      <div className="text-blue-100 dark:text-blue-300 font-semibold text-lg mt-8 transition-colors duration-300">
                        Click to see question
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-300">
            Your path to sovereignty and true freedom
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;