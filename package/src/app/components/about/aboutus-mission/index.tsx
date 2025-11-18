"use client";

import { motion, Variants } from "framer-motion";
import { FaBullseye, FaEye, FaLightbulb, FaRocket } from "react-icons/fa"; // Import FaRocket
import React from "react";
import Image from "next/image";

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
    <div className="relative py-8">
      <section className="relative py-8 md:py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 dark:from-blue-900 dark:via-blue-900 dark:to-cyan-900 overflow-hidden text-white">


        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Core Beliefs</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Driving financial empowerment through education and innovation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-stretch max-w-6xl mx-auto relative"> {/* Added relative to parent for absolute positioning */}
            {/* Mission Card - Left (image style) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                className="relative rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="relative h-56 md:h-64 lg:h-72">
                  <Image
                    src="/images/about-us/offer.webp"
                    alt="Our Mission"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">Our Mission</h3>
                    <p className="mt-2 text-sm md:text-base text-white/90">
                      To demystify financial complexity and equip individuals with practical knowledge for confident credit and money management decisions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>



            {/* Vision Card - Right (image style) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                className="relative rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="relative h-56 md:h-64 lg:h-72">
                  <Image
                    src="/images/about-us/why.webp"
                    alt="Our Vision"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">Our Vision</h3>
                    <p className="mt-2 text-sm md:text-base text-white/90">
                      To cultivate a financially empowered generation that excels in both personal prosperity and professional achievement.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>


    </div>
  );
};

export default AboutusMission;