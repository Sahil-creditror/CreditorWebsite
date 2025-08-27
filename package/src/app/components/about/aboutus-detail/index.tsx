"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, CSSProperties, ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';


// ✅ Props typing for FloatingShape
interface FloatingShapeProps {
  delay: number;
  size: string;
  position: CSSProperties;
  color: string;
}

const FloatingShape = ({ delay, size, position, color }: FloatingShapeProps) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.2, 0],
      scale: [0, 1, 0],
      y: [0, -40, 0],
      x: [0, 15, 0],
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

// ✅ Each card type
interface CardType {
  title: string;
  desc: string;
  long_desc: string;
  icon: ReactNode;
  image: string;
  color: string;
  bgColor: string;
  fallbackColor: string;
}

// ✅ SVGs remain unchanged (ReactNode)
const OfferSVG: ReactNode = (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
    <rect x="8" y="21" width="32" height="15" rx="5" fill="url(#offer-grad)" />
    <path d="M24 21V12" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="5" stroke="#155ee3" strokeWidth="2" fill="white" />
    <circle cx="32" cy="16" r="5" stroke="#06b6d4" strokeWidth="2" fill="white" />
    <defs>
      <linearGradient id="offer-grad" x1="8" y1="21" x2="40" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const DoSVG: ReactNode = (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="12" fill="url(#do-grad)" />
    <path d="M18 24h12M24 18v12" stroke="#a21caf" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3" fill="#fff" />
    <defs>
      <linearGradient id="do-grad" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a21caf" />
        <stop offset="1" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
);

const WhySVG: ReactNode = (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
    <ellipse cx="24" cy="20" rx="11" ry="9" fill="url(#why-grad)" />
    <path d="M20 32h8M24 29.5v2.5" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M24 28c-2.5-2-6-4-6-8a6 6 0 1 1 12 0c0 4-3.5 6-6 8z"
      fill="#fff"
      fillOpacity="0.7"
    />
    <defs>
      <linearGradient id="why-grad" x1="13" y1="11" x2="35" y2="29" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e42" />
        <stop offset="1" stopColor="#fdba74" />
      </linearGradient>
    </defs>
  </svg>
);

const AboutusDetail = () => {
  const [expanded, setExpanded] = useState<boolean>(false); // ✅ typed state

  // ✅ Motion variants typed
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  // ✅ Cards typed
  const cards: CardType[] = [
    {
      title: "What We Offer",
      desc: "Structured programs, workshops, and resources designed to simplify credit, loans, and money management.",
      long_desc:
        "Our comprehensive curriculum covers everything from the basics of credit scores to advanced investment strategies. We offer workshops, one-on-one coaching, and a rich library of resources.",
      icon: OfferSVG,
      image: "/images/about-us/offer.webp",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      fallbackColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "What We Do",
      desc: "We break down complex financial concepts into easy-to-grasp lessons with actionable guidance.",
      long_desc:
        "Our team of financial experts creates engaging learning experiences with real-world examples and practical exercises to ensure students can apply what they learn.",
      icon: DoSVG,
      image: "/images/about-us/do.webp",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      fallbackColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Why We Do It",
      desc: "Because financial literacy is the foundation for opportunity, independence, and long-term success.",
      long_desc:
        "We believe that everyone deserves financial freedom. By empowering individuals with knowledge, we help create a more equitable and prosperous society.",
      icon: WhySVG,
      image: "/images/about-us/why.webp",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      fallbackColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  const Bubble = () => (
    <motion.div
      className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
      initial={{ y: '110vh', opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
      animate={{ y: '-10vh', opacity: [0, 1, 0], scale: Math.random() * 0.5 + 0.5 }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * 5,
      }}
      style={{
        width: `${Math.random() * 100 + 50}px`,
        height: `${Math.random() * 100 + 50}px`,
        left: `${Math.random() * 100}%`,
      }}
    />
  );

  const BubblesBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <Bubble key={i} />
      ))}
    </div>
  );


  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-darkblack dark:via-secondary dark:to-blue-900/10">
      <BubblesBackground />
      {/* Floating Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingShape delay={0} size="w-32 h-32" position={{ top: "15%", left: "5%" }} color="bg-blue-200/30 dark:bg-blue-500/10" />
        <FloatingShape delay={7} size="w-24 h-24" position={{ top: "25%", right: "10%" }} color="bg-purple-200/30 dark:bg-purple-500/10" />
        <FloatingShape delay={14} size="w-28 h-28" position={{ bottom: "20%", left: "15%" }} color="bg-amber-200/30 dark:bg-amber-500/10" />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-darkblack dark:text-white"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.span variants={wordVariants} className="inline-block mr-2">
              About
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block mr-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
            >
              Creditor
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
            >
              Academy
            </motion.span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1.5 w-32 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Transforming the way people understand and manage credit through{" "}
            <span className="font-semibold text-primary">practical education</span> and{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              real-world insights
            </span>
            .
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              onClick={() => setExpanded(!expanded)} // ✅ global expand
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              className={`relative cursor-pointer p-8 rounded-3xl bg-gradient-to-b from-white to-gray-50 dark:from-darkblack dark:to-gray-900 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 z-10 group h-full`}
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
              />

              {/* Top Accent */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.color} rounded-t-3xl`} />

              <motion.div layout className="flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  layout
                  className={`flex items-center justify-center mb-6 p-4 rounded-2xl ${card.bgColor} w-16 h-16 mx-auto animate-pulse`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">{card.icon}</div>
                </motion.div>

                <motion.h3
                  layout
                  className="text-2xl font-bold text-darkblack dark:text-white mb-4 text-center"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layout
                  className="text-gray-600 dark:text-gray-300 leading-relaxed text-center flex-grow"
                >
                  {card.desc}
                </motion.p>

                {/* Expanded content */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-6"
                    >
                      <div
                        className={`w-full h-40 rounded-xl mb-4 ${card.fallbackColor} flex items-center justify-center overflow-hidden`}
                      >
                        <motion.img
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                        {card.long_desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Close button only on last card */}
                {expanded && i === cards.length - 1 && (
                  <motion.div
                    className="flex justify-center mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button
                      onClick={() => setExpanded(false)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gradient-to-r ${card.color} text-sm font-medium`}
                    >
                      Close <FaArrowRight className="text-xs" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Masterclass CTA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative max-w-7xl mx-auto mt-24 rounded-3xl p-8 bg-gradient-to-br from-blue-50/80 via-white/80 to-blue-100/70 dark:from-blue-900/70 dark:via-darkblack/80 dark:to-blue-900/60 shadow-2xl overflow-hidden group"
        >
          <BubblesBackground />
          <motion.div className="absolute inset-0 border-2 border-blue-300/50 dark:border-blue-500/50 rounded-3xl animate-pulse group-hover:border-blue-400 dark:group-hover:border-blue-600 transition-colors duration-500" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left Column: Image */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="w-full h-full relative"
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg animate-pulse" />
              <Image
                src="/images/about-us/masterclass.webp"
                alt="Masterclass"
                width={500}
                height={500}
                className="relative rounded-2xl shadow-xl object-cover w-full h-full"
              />
            </motion.div>

            {/* Right Column: Text Content */}
            <div className="text-center md:text-left">
              <motion.h3
                variants={itemVariants}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-darkblack dark:text-white"
              >
                <motion.span
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 inline-block"
                >
                  Master Class
                </motion.span>
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300"
              >
                Ready to boost your credit score, get out of debt, and start building wealth? Our hands-on Master Class gives you the tools and strategies to achieve your financial goals faster than you ever thought possible.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <p className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">Confirm you slot &rarr;</p>
                <motion.a
                  href="/projects"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg hover:scale-110 transform transition-transform duration-300"
                >
                  Join Now
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutusDetail;