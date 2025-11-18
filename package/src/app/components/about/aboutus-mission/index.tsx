"use client";

import { motion, Variants } from "framer-motion";
import { FaBullseye, FaEye, FaLightbulb, FaRocket } from "react-icons/fa"; // Import FaRocket
import React from "react";

interface FloatingOrbProps {
  delay: number;
  size: string;
  position: React.CSSProperties;
  color: string;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ delay, size, position, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.4, 0],
      scale: [0, 1, 0],
      y: [0, -40, 0],
      x: [0, Math.random() * 20 - 10, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={position}
  />
);

const AboutusMission: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="relative py-16">
      <section className="relative py-24 md:py-32 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 dark:from-blue-900 dark:via-blue-900 dark:to-cyan-900 overflow-hidden text-white">


        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Core Beliefs</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Driving financial empowerment through education and innovation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch max-w-6xl mx-auto relative"> {/* Added relative to parent for absolute positioning */}
            {/* Mission Card - Left */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                className="rounded-3xl p-10 shadow-xl bg-white dark:bg-gray-800 border border-blue-100 dark:border-blue-700/40 h-full flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-cyan-400/10 blur-2xl" />

                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl shadow-md">
                    <FaBullseye />
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Mission</span>
                </h3>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
                  To demystify financial complexity and equip individuals with practical knowledge for confident credit and money management decisions.
                </p>

                {/* Feature highlights */}
                <div className="space-y-3 mt-6">
                  {["Simplify complex concepts", "Provide actionable guidance", "Build financial confidence"].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center text-blue-700 dark:text-blue-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-70 rounded-b-3xl" />
              </motion.div>
            </motion.div>



            {/* Vision Card - Right */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                className="rounded-3xl p-10 shadow-xl bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-700/40 h-full flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-pink-400/10 blur-2xl" />
                <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-500/10 blur-2xl" />

                <div className="mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white text-2xl shadow-md">
                    <FaEye />
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Vision</span>
                </h3>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
                  To cultivate a <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">financially empowered generation</span> that excels in both personal prosperity and professional achievement.
                </p>

                {/* Feature highlights */}
                <div className="space-y-3 mt-6">
                  {["Create financial awareness", "Foster generational wealth", "Enable life transformation"].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center text-purple-700 dark:text-purple-300"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 rounded-b-3xl" />
              </motion.div>
            </motion.div>
          </div>

          {/* Connecting Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl shadow-lg">
                <FaLightbulb />
              </div>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="w-3 h-3 rounded-full bg-blue-500/90 mx-auto mt-3 shadow-sm" />
    </div>
  );
};

export default AboutusMission;