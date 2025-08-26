"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Olivia",
    role: "Student",
    feedback:
      "Creditor Academy helped me understand credit scores and save thousands. The learning experience was simple yet powerful.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Henry",
    role: "Entrepreneur",
    feedback:
      "The practical courses transformed how I manage my business credit. Highly recommend for anyone serious about finance.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Charlotte",
    role: "Working Professional",
    feedback:
      "I now feel confident managing loans and personal finance. The content is practical and easy to follow.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const AboutusTestimonials = () => {
  // Variants for heading animation
  const headingVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-background">
      <div className="container mx-auto text-center">
        {/* Animated Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {"What Our Students Say".split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              className={
                word === "Students"
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 inline-block mr-2"
                  : "inline-block mr-2"
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative p-8 rounded-2xl shadow-lg bg-white dark:bg-secondary transition-transform transform hover:-translate-y-3 hover:shadow-2xl"
            >
              <p className="text-lg italic mb-6 text-gray-700 dark:text-gray-300">
                “{t.feedback}”
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-darkblack dark:text-white">
                    {t.name}
                  </h4>
                  <span className="text-sm text-gray-500">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutusTestimonials;
