"use client";

import React, { useState } from "react";
import { FaCreditCard, FaShieldAlt, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
      answer: "It removes financial roadblocks by fixing your credit, unlocking private payment solutions, and building your business credit profile.",
      icon: <FaShieldAlt className="text-2xl" />
    },
    {
      question: "How will it help me?",
      answer: "You gain access to funding, keep your payments secure and private, and finally separate your personal and business finances.",
      icon: <FaChartLine className="text-2xl" />
    },
    {
      question: "What does it do?",
      answer: "It repairs your personal credit, sets you up with a private merchant account, and grows your business credit into six-figure funding.",
      icon: <FaCreditCard className="text-2xl" />
    },
    {
      question: "How will I know I need it?",
      answer: "If you're tired of denials, frozen accounts, or using personal cards for business, this is your answer.",
      icon: <FaCheckCircle className="text-2xl" />
    }
  ];

  const handleCardClick = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  return (
    <div className="w-full py-20 px-4 bg-white dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Personal Credit Repair, Private Merchant Processing, and Business Credit
        </motion.p>
      </div>

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
            Unlock your financial potential and secure your business future
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQSection;