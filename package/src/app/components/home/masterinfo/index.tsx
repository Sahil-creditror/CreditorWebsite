"use client";

import { motion } from "framer-motion";
import { FaShieldAlt, FaCreditCard, FaStore, FaRocket } from "react-icons/fa";

const BannerContentSection = () => {
  const features = [
    { 
      icon: <FaShieldAlt className="text-blue-400 text-lg sm:text-xl" />, 
      title: "Private Trust Formation", 
      description: "Protect assets and stay out of state control" 
    },
    { 
      icon: <FaCreditCard className="text-blue-400 text-lg sm:text-xl" />, 
      title: "Tier 1 Credit Profile", 
      description: "Access capital without SSN requirements" 
    },
    { 
      icon: <FaStore className="text-blue-400 text-lg sm:text-xl" />, 
      title: "Private Merchant Accounts", 
      description: "Collect payments without shutdown risks" 
    },
    { 
      icon: <FaRocket className="text-blue-400 text-lg sm:text-xl" />, 
      title: "Business Launch System", 
      description: "Income-producing online/offline businesses" 
    }
  ];

  const stats = [
    { value: "90", label: "Day Program" }, 
    { value: "24/7", label: "Support Access" }
  ];

  return (
    <section className="w-full bg-[#0a1122] py-16">  {/* full background applied here */}
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-5">
        {/* your existing motion content grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
            {/* Left Column - Slides in from left */}
            <motion.div 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
            <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                    Masterclass Membership
                </span>
                <br className="hidden sm:block" />
                <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.4 }}
                    className="block"
                >
                Build Privately. Launch Confidently. Grow Without Limits.
                </motion.span>
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-300 text-sm sm:text-lg"
            >
                The 90-Day Masterclass by Creditor Academy is your all-in-one business launch system for the private world. Whether you're a first-time entrepreneur or ready to restructure your public business, this program equips you with everything you need to operate sovereignly.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
                }}
                className="p-4 sm:p-6 bg-gray-800/50 border border-gray-700 rounded-xl"
            >
                <motion.h3 
                className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.5 }}
                >
                <motion.div
                    animate={{ 
                    rotate: [0, 10, -10, 0],
                    transition: { 
                        delay: 0.7,
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    } 
                    }}
                >
                    <FaRocket className="text-blue-400 shrink-0" />
                </motion.div>
                <span>Why This Private Business Launchpad Is Different?</span>
                </motion.h3>
                <motion.p 
                className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: 0.6 }}
                >
                Unlike traditional business programs that focus on outdated models, this Master Class teaches you the private approach:
                </motion.p>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {features.map((feature, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                        duration: 0.6, 
                        delay: index * 0.15,
                        ease: "backOut"
                        } 
                    }}
                    viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                    whileHover={{
                        y: -5,
                        transition: { duration: 0.3 }
                    }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-blue-900/20 hover:border-blue-500/30 border border-transparent transition-all duration-300"
                    >
                    <motion.div 
                        className="p-3 bg-blue-900/50 rounded-lg border border-blue-500/50 shrink-0"
                        whileHover={{ rotate: 10 }}
                    >
                        {feature.icon}
                    </motion.div>
                    <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{feature.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-300 mt-1">{feature.description}</p>
                    </div>
                    </motion.div>
                ))}
                </div>
            </motion.div>
            </motion.div>

            {/* Right Column - Slides in from right */}
            <motion.div 
            className="space-y-4 sm:space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            >
            <motion.div 
                className="p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl h-full flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5 }}
            >
                {/* Top text */}
                <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                    Ready to Unlock Your Private Business Potential?
                    </span>
                </h3>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    Tap below to explore the full Master Class breakdown, bonus tools, and the dozens of businesses you can launch after completing the program.
                </p>
                </div>

                {/* Image with zoom effect */}
                <div className="overflow-hidden rounded-lg border border-blue-500/30 mb-4 sm:mb-6">
                <motion.img
                    src="/images/home/services/master.jpg"
                    alt="Masterclass Preview"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {stats.map((stat, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="p-3 sm:p-4 rounded-lg relative overflow-hidden group border-2 border-blue-200 bg-white/90 backdrop-blur-sm shadow-sm"
                    >
                    {/* Content */}
                    <div className="relative">
                        <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">
                        {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-blue-500 uppercase tracking-wider">
                        {stat.label}
                        </div>
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300" />
                    </motion.div>
                ))}
                </div>

                {/* Button */}
                <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative"
                >
                <button
                    className="relative w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg border border-blue-300/50 flex items-center justify-center gap-2 text-sm sm:text-lg transition-all duration-200 overflow-hidden"
                >
                    <FaRocket className="text-blue-100" />
                    <span>Explore Now</span>
                </button>
                </motion.div>
            </motion.div>
            </motion.div>
        </motion.div>
        </div>
        </section>
  );
};

export default BannerContentSection;