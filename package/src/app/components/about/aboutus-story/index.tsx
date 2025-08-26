"use client";

import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

// ✅ Bubble props type
interface BubbleProps {
  size: number;
  x: number;
  y: number;
  delay: number;
}

const Bubble = ({ size, x, y, delay }: BubbleProps) => (
  <motion.div
    className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      bottom: `${y}%`,
    }}
    animate={{
      y: [0, -100, 0],
      opacity: [0, 1, 0],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 15 + Math.random() * 15,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
);

const BubbleBackground = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    {[...Array(20)].map((_, i) => (
      <Bubble
        key={i}
        size={Math.random() * 40 + 10}
        x={Math.random() * 100}
        y={Math.random() * 100}
        delay={Math.random() * 10}
      />
    ))}
  </div>
);

const AboutusStory = () => {
  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Creditor Academy started with a vision to make credit education accessible to everyone.",
      image: "/images/about-us/story1.webp",
    },
    {
      year: "2020",
      title: "First Growth",
      description:
        "Expanded reach to students and professionals, gaining recognition as a trusted learning platform.",
      image: "/images/about-us/story2.webp",
    },
    {
      year: "2022",
      title: "Global Impact",
      description:
        "Our community grew worldwide, empowering learners with financial literacy and credit management skills.",
      image: "/images/about-us/story3.webp",
    },
    {
      year: "Future",
      title: "What’s Next",
      description:
        "We continue to innovate and expand, shaping the future of credit education for generations to come.",
      image: "/images/about-us/story4.webp",
    },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // ✅ updated for framer-motion v7
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // ✅ FIXED: Explicitly typed as Variants
  const timelineVariants: Variants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const milestoneVariants: Variants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  const milestoneVariantsRight: Variants = {
    hidden: { opacity: 0, x: 50, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.5, ease: "easeOut" },
    }),
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-28 md:py-40 bg-gradient-to-b from-white to-gray-100 dark:from-darkblack dark:to-gray-900 relative overflow-hidden">
      <BubbleBackground />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"
        style={{ y: backgroundY }}
      />
      <div ref={containerRef} className="container mx-auto px-4 relative z-20">
        {/* ✅ Heading size increased */}
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 relative z-30">
          Our <span className="text-primary">Story</span>
        </h2>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-primary/30"
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={index % 2 === 0 ? milestoneVariants : milestoneVariantsRight}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-center w-full relative"
              >
                <div className="w-full flex flex-col md:flex-row items-center justify-between">
                  <motion.div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:order-1" : "md:order-2"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-60 object-cover rounded-lg mb-4 shadow-lg"
                      style={{ y: backgroundY }}
                    />
                  </motion.div>
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <motion.div variants={textVariants} className="text-left">
                      <div className="text-2xl font-bold text-primary mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-secondary dark:text-white/70">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(96, 165, 250, 0.4)",
                      "0 0 0 10px rgba(96, 165, 250, 0)",
                      "0 0 0 0 rgba(96, 165, 250, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3 + 1,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutusStory;