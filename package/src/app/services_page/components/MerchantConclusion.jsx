"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MerchantConclusion({
  heading = "Ready to Ditch",
  highlightedText = "Stripe, PayPal & Big Tech?",
  description = "Big processors don't understand private commerce. They're built for W-2s, corporations, and mainstream compliance. You deserve a processor that works with — not against — your structure. With Creditor Academy Private Merchant Processing, you keep your autonomy, your terms, and your peace of mind.",
  imageSrc = "/images/services/PMP4.webp",
}) {
  return (
    <section className="py-16 md:py-20 bg-white dark:bg-[#101828]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              <span className="text-secondary dark:text-white">{heading}</span>
              <br />
              <span className="text-primary">{highlightedText}</span>
            </h2>
            <p className="text-base md:text-lg text-secondary/80 dark:text-white/80 leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Right Column - Animated Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src={imageSrc}
                alt="Private Commerce Network"
                fill
                className="object-cover"
              />
              
              {/* Animated Network Icons Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                {/* WiFi Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute top-8 left-8 w-12 h-12 bg-blue-500/80 rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                  </svg>
                </motion.div>

                {/* Globe Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="absolute top-16 left-16 w-10 h-10 bg-blue-500/80 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </motion.div>

                {/* Smartphone Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute top-12 right-16 w-10 h-10 bg-blue-500/80 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                  </svg>
                </motion.div>

                {/* Dollar Sign Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute top-8 right-8 w-12 h-12 bg-blue-500/80 rounded-full flex items-center justify-center"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </motion.div>

                {/* Cloud Upload Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute top-20 right-8 w-10 h-10 bg-blue-500/80 rounded-full flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                  </svg>
                </motion.div>

                {/* Animated Network Lines */}
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  viewBox="0 0 400 300"
                >
                  <motion.path
                    d="M80,80 Q200,120 320,80"
                    stroke="rgba(59, 130, 246, 0.6)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1.4, duration: 2 }}
                  />
                  <motion.path
                    d="M100,100 Q200,140 300,100"
                    stroke="rgba(59, 130, 246, 0.4)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1.6, duration: 2.5 }}
                  />
                  <motion.path
                    d="M120,120 Q200,160 280,120"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="2,2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 1.8, duration: 3 }}
                  />
                </motion.svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
