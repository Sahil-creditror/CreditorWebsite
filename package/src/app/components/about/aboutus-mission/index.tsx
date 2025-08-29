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
    <div className="border-t-8 border-b-8 border-blue-900"> {/* Dark bold blue border at top and bottom */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingOrb
            delay={0}
            size="w-24 h-24"
            position={{ top: "15%", left: "8%" }}
            color="bg-blue-300/30 dark:bg-blue-500/20"
          />
          <FloatingOrb
            delay={7}
            size="w-20 h-20"
            position={{ top: "25%", right: "12%" }}
            color="bg-purple-300/30 dark:bg-purple-500/20"
          />
          <FloatingOrb
            delay={14}
            size="w-28 h-28"
            position={{ bottom: "20%", left: "18%" }}
            color="bg-cyan-300/30 dark:bg-cyan-500/20"
          />
          <FloatingOrb
            delay={10}
            size="w-16 h-16"
            position={{ bottom: "30%", right: "20%" }}
            color="bg-amber-300/30 dark:bg-amber-500/20"
          />
          
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.2)_1px,transparent_0)] bg-[size:40px_40px]"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Core Beliefs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                whileHover={{ 
                  y: -12,
                  rotateZ: -1,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-blue-100/50 dark:border-blue-700/30 h-full flex flex-col justify-center relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-6 left-6 w-12 h-12 bg-cyan-400/10 rounded-full blur-xl"></div>
                
                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl border-2 border-blue-200/30 dark:border-blue-600/20"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(59, 130, 246, 0.1)",
                      "0 0 15px rgba(59, 130, 246, 0.3)",
                      "0 0 0px rgba(59, 130, 246, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon Container */}
                <div className="relative mb-8 flex justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-4xl shadow-lg shadow-blue-500/30"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <FaBullseye />
                  </motion.div>
                  <motion.div
                    className="absolute -inset-4 rounded-2xl border-2 border-blue-400/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
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

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </motion.div>
            </motion.div>

            {/* Animated element between cards */}
            <motion.div
              className="absolute hidden lg:flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
              viewport={{ once: true }}
              animate={{
                y: ["-50%", "-60%", "-50%"], // Floating effect
                rotate: [0, 5, 0, -5, 0], // Subtle rotation
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative w-28 h-28 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/40">
                <FaRocket className="text-white text-5xl transform -rotate-45" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-indigo-300/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.1, 0.6],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                />
              </div>
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
                whileHover={{ 
                  y: -12,
                  rotateZ: 1,
                  transition: { type: "spring", stiffness: 300, damping: 15 }
                }}
                className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-purple-100/50 dark:border-purple-700/30 h-full flex flex-col justify-center relative overflow-hidden group"
              >
                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-6 right-6 w-12 h-12 bg-pink-400/10 rounded-full blur-xl"></div>
                
                {/* Animated border */}
                <motion.div 
                  className="absolute inset-0 rounded-3xl border-2 border-purple-200/30 dark:border-purple-600/20"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(168, 85, 247, 0.1)",
                      "0 0 15px rgba(168, 85, 247, 0.3)",
                      "0 0 0px rgba(168, 85, 247, 0.1)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                {/* Icon Container */}
                <div className="relative mb-8 flex justify-center">
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center text-white text-4xl shadow-lg shadow-purple-500/30"
                    whileHover={{
                      scale: 1.1,
                      rotate: -5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <FaEye />
                  </motion.div>
                  <motion.div
                    className="absolute -inset-4 rounded-2xl border-2 border-purple-400/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                  />
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

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
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
    </div>
  );
};

export default AboutusMission;