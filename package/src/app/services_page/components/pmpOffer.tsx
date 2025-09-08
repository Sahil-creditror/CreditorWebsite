"use client";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";

interface Bubble {
  id: number;
  left: string;
  width: string;
  height: string;
  duration: number;
  delay: number;
  scale: number;
  opacity: number;
}

const BusinessLaunch: React.FC = () => {
  const categories = [
    {
      title: "After Trust Formation",
      items: [
        "Airbnb or Short-Term Rentals",
        "Real Estate Trust Entity",
        "Credit Repair & Funding Agency",
        "Private Coaching or Mentorship",
        "Dropshipping or E-Commerce Store",
      ],
    },
    {
      title: "After Tier 1 Credit Setup",
      items: [
        "Cleaning & Maintenance Services",
        "Tax Prep & Bookkeeping",
        "Loan Signing & Mobile Notary",
        "Vending Machine Business",
        "Freelance or Virtual Assistant Work",
      ],
    },
    {
      title: "After Private Merchant Setup",
      items: [
        "Digital Courses & Info Products",
        "Subscription Boxes or Membership Sites",
        "Funnels & Digital Ad Agencies",
        "Event Spaces & Pop-Up Shops",
        "Podcasts, Studios, or Creative Brands",
      ],
    },
  ];

  const bubbles: Bubble[] = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 100 + 50}px`,
      height: `${Math.random() * 100 + 50}px`,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      scale: Math.random() * 0.8 + 0.2,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  const bubbleVariants: Variants = {
    initial: {
      y: "110vh",
      scale: 0,
      opacity: 0,
    },
    animate: (bubble: Bubble) => ({
      y: "-20vh",
      scale: bubble.scale,
      opacity: bubble.opacity,
      transition: {
        duration: bubble.duration,
        repeat: Infinity,
        repeatType: "loop",
        delay: bubble.delay,
      },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-gray-100 dark:bg-gray-900 py-24 px-4">
      <div className="absolute inset-0 z-0">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            custom={bubble}
            variants={bubbleVariants}
            initial="initial"
            animate="animate"
            style={{
              position: "absolute",
              left: bubble.left,
              backgroundColor: "rgba(100, 100, 255, 0.3)",
              borderRadius: "50%",
              width: bubble.width,
              height: bubble.height,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            style={{ color: "#026fe2" }}
          >
            Strategic Business Opportunities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg"
          >
            Launch your venture with confidence through our structured business
            foundation system.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-blue-600 dark:bg-blue-500 mx-auto mt-6"
            style={{ transformOrigin: "center" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-5 px-6">
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {cat.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: j * 0.1 + i * 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center"
                    >
                      <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-1.5 mr-4 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl py-10 px-6 border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Launch Your Business?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Our structured approach provides the foundation you need for
            entrepreneurial success.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-lg shadow-lg transition-all duration-300 transform"
          >
            Explore Business Formation Options
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default BusinessLaunch;