"use client";

import { motion, Variants } from "framer-motion";
import { FaHandshake, FaUserGraduate, FaLightbulb, FaGlobe } from "react-icons/fa";
import { ReactNode, CSSProperties } from "react";

interface ValueItem {
  title: string;
  desc: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
}

const values: ValueItem[] = [
  { 
    title: "Integrity", 
    desc: "We uphold transparency and honesty in everything we do.", 
    icon: <FaHandshake />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
  },
  { 
    title: "Student First", 
    desc: "We design learning experiences that put students at the center.", 
    icon: <FaUserGraduate />,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
  },
  { 
    title: "Innovation", 
    desc: "We constantly evolve to deliver modern education solutions.", 
    icon: <FaLightbulb />,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
  },
  { 
    title: "Global Impact", 
    desc: "We aim to build financial literacy worldwide.", 
    icon: <FaGlobe />,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20"
  },
];

interface FloatingShapeProps {
  delay: number;
  size: string;
  position: CSSProperties;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({ delay, size, position }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 ${size}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.5, 0],
      scale: [0, 1, 0],
      y: [0, -20, 0],
      x: [0, 10, 0]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    style={position}
  />
);

const AboutusValues: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const headingWords = ["Our", "Core", "Values"];
  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.3, 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }),
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white dark:from-darkblack dark:to-secondary overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape delay={0} size="w-16 h-16" position={{ top: "15%", left: "10%" }} />
        <FloatingShape delay={2} size="w-24 h-24" position={{ top: "25%", right: "15%" }} />
        <FloatingShape delay={4} size="w-12 h-12" position={{ bottom: "20%", left: "20%" }} />
        <FloatingShape delay={6} size="w-20 h-20" position={{ bottom: "30%", right: "10%" }} />
      </div>
      
      <div className="container mx-auto text-center relative z-10 px-4">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center gap-3">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                className="relative inline-block text-blue-600 dark:text-blue-400"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.div
            variants={itemVariants}
            className="h-1.5 w-24 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full"
          />
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            These principles guide everything we do at Creditor Academy
          </motion.p>
        </motion.div>

        {/* Values grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15 }
              }}
              className="group p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${value.color}`} />
              
              <div className={`relative z-10 ${value.bgColor} p-6 rounded-xl`}>
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}
                >
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${value.color} text-white text-3xl shadow-md`}>
                    {value.icon}
                  </div>
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {value.desc}
                </p>
              </div>

              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutusValues;
