"use client";

import { motion } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";

const FloatingOrb = ({ delay, size, position, color }) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0],
      scale: [0, 1, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={position}
  />
);

const AboutusMission = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const missionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const visionVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-gray-100 to-white dark:from-background dark:to-secondary overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingOrb 
          delay={0} 
          size="w-20 h-20" 
          position={{ top: '20%', left: '5%' }} 
          color="bg-blue-200/40 dark:bg-blue-500/20" 
        />
        <FloatingOrb 
          delay={5} 
          size="w-16 h-16" 
          position={{ top: '30%', right: '10%' }} 
          color="bg-purple-200/40 dark:bg-purple-500/20" 
        />
        <FloatingOrb 
          delay={10} 
          size="w-24 h-24" 
          position={{ bottom: '20%', left: '15%' }} 
          color="bg-cyan-200/40 dark:bg-cyan-500/20" 
        />
      </div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-stretch px-4 relative z-10">
        {/* Mission */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={missionVariants}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
            className="bg-gradient-to-br from-white to-blue-50 dark:from-secondary dark:to-blue-900/10 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 dark:border-blue-800/30 h-full flex flex-col justify-center text-center md:text-left relative overflow-hidden group"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/5 to-transparent rounded-tr-full"></div>
            
            {/* Icon with animated ring */}
            <div className="relative mb-6 flex justify-center md:justify-start">
              <motion.div 
                className="text-primary text-5xl p-3 rounded-2xl bg-blue-100/50 dark:bg-blue-900/30"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <FaBullseye />
              </motion.div>
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Mission</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To simplify financial concepts and empower individuals with the
              knowledge to make confident credit and money management decisions.
            </p>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          </motion.div>
        </motion.div>

        {/* Vision */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={visionVariants}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
            className="bg-gradient-to-br from-white to-purple-50 dark:from-secondary dark:to-purple-900/10 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-800/30 h-full flex flex-col justify-center text-center md:text-left relative overflow-hidden group"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/5 to-transparent rounded-tl-full"></div>
            
            {/* Icon with animated ring */}
            <div className="relative mb-6 flex justify-center md:justify-start">
              <motion.div 
                className="text-primary text-5xl p-3 rounded-2xl bg-purple-100/50 dark:bg-purple-900/30"
                whileHover={{ 
                  scale: 1.1,
                  rotate: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <FaEye />
              </motion.div>
              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Vision</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              To build a{" "}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                financially aware generation
              </span>{" "}
              that thrives in both personal and professional life.
            </p>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutusMission;