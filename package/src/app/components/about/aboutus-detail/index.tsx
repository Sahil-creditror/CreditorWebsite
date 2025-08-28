"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, CSSProperties, ReactNode, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import {
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming this is for utility classes

// ✅ Props typing for FloatingShape
interface FloatingShapeProps {
  delay: number;
  size: string;
  position: CSSProperties;
  color: string;
}

const FloatingShape = ({
  delay,
  size,
  position,
  color,
}: FloatingShapeProps) => (
  <motion.div
    className={`absolute rounded-full ${color} ${size}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.2, 0],
      scale: [0, 1, 0],
      y: [0, -40, 0], // Subtle vertical movement
      x: [0, 15, 0], // Subtle horizontal movement
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
    <path
      d="M24 21V12"
      stroke="#2563eb"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle
      cx="16"
      cy="16"
      r="5"
      stroke="#155ee3"
      strokeWidth="2"
      fill="white"
    />
    <circle
      cx="32"
      cy="16"
      r="5"
      stroke="#06b6d4"
      strokeWidth="2"
      fill="white"
    />
    <defs>
      <linearGradient
        id="offer-grad"
        x1="8"
        y1="21"
        x2="40"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3B82F6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
  </svg>
);

const DoSVG: ReactNode = (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
    <circle cx="24" cy="24" r="12" fill="url(#do-grad)" />
    <path
      d="M18 24h12M24 18v12"
      stroke="#a21caf"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="3" fill="#fff" />
    <defs>
      <linearGradient
        id="do-grad"
        x1="12"
        y1="12"
        x2="36"
        y2="36"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#a21caf" />
        <stop offset="1" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
);

const WhySVG: ReactNode = (
  <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
    <ellipse cx="24" cy="20" rx="11" ry="9" fill="url(#why-grad)" />
    <path
      d="M20 32h8M24 29.5v2.5"
      stroke="#f59e42"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 28c-2.5-2-6-4-6-8a6 6 0 1 1 12 0c0 4-3.5 6-6 8z"
      fill="#fff"
      fillOpacity="0.7"
    />
    <defs>
      <linearGradient
        id="why-grad"
        x1="13"
        y1="11"
        x2="35"
        y2="29"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#f59e42" />
        <stop offset="1" stopColor="#fdba74" />
      </linearGradient>
    </defs>
  </svg>
);

// Animated Button Components (kept as is, as they are good)
function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

const AboutusDetail = () => {
  const [showAllDescriptions, setShowAllDescriptions] = useState(false);

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
      bgColor:
        "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
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
      bgColor:
        "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
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
      bgColor:
        "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      fallbackColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  const Bubble = () => (
    <motion.div
      className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10"
      initial={{ y: "110vh", opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
      animate={{
        y: "-10vh",
        opacity: [0, 1, 0],
        scale: Math.random() * 0.5 + 0.5,
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
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
        <FloatingShape
          delay={0}
          size="w-32 h-32"
          position={{ top: "15%", left: "5%" }}
          color="bg-blue-200/30 dark:bg-blue-500/10"
        />
        <FloatingShape
          delay={7}
          size="w-24 h-24"
          position={{ top: "25%", right: "10%" }}
          color="bg-purple-200/30 dark:bg-purple-500/10"
        />
        <FloatingShape
          delay={14}
          size="w-28 h-28"
          position={{ bottom: "20%", left: "15%" }}
          color="bg-amber-200/30 dark:bg-amber-500/10"
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24" // Increased bottom margin
        >
          <motion.h2
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-darkblack dark:text-white"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.span variants={wordVariants} className="inline-block mr-3"> {/* Adjusted spacing */}
              About
            </motion.span>
            <motion.span
              variants={wordVariants}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600"
            >
              Creditor Academy
            </motion.span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1.5 w-32 bg-gradient-to-r from-primary to-blue-600 mx-auto mt-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" // Added max-width
          >
            Transforming the way people understand and manage credit through{" "}
            <span className="font-semibold text-primary">
              practical education
            </span>{" "}
            and{" "}
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
              onClick={() => setShowAllDescriptions(true)} // ✅ Show all descriptions
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
              className={`relative cursor-pointer p-8 rounded-3xl bg-gradient-to-b from-white to-gray-50 dark:from-darkblack dark:to-gray-900 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 z-10 group h-full flex flex-col`} 
            >
              {/* Hover glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
              />

              {/* Top Accent */}
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${card.color} rounded-t-3xl`}
              />

              <motion.div layout="position" className="flex flex-col h-full"> {/* layout="position" helps with smooth height transitions */}
                {/* Icon */}
                <motion.div
                  layout="position"
                  className={`flex items-center justify-center mb-6 p-4 rounded-2xl ${card.bgColor} w-20 h-20 mx-auto`}
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    {card.icon}
                  </div>
                </motion.div>

                <motion.h3
                  layout="position"
                  className="text-2xl font-bold text-darkblack dark:text-white mb-4 text-center"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layout="position"
                  className="text-gray-600 dark:text-gray-300 leading-relaxed text-center flex-grow"
                >
                  {card.desc}
                </motion.p>

                {/* Expanded content */}
                <AnimatePresence>
                  {showAllDescriptions && ( // ✅ Conditional rendering based on showAllDescriptions
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-6 overflow-hidden" // Added overflow-hidden for smooth height
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        {/* "Show Less" Button */}
        {showAllDescriptions && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => setShowAllDescriptions(false)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white bg-gradient-to-r from-gray-500 to-gray-700 text-base font-medium hover:scale-105 transition-all duration-300"
            >
              Show Less <FaArrowRight className="text-sm" />
            </button>
          </motion.div>
        )}
        {/* Masterclass CTA - Premium Enhanced */}
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="relative max-w-6xl mx-auto mt-28 rounded-4xl p-10 md:p-16 bg-gradient-to-br from-white via-blue-50/95 to-cyan-50/90 dark:from-blue-950/90 dark:via-blue-900/80 dark:to-cyan-900/70 shadow-2xl shadow-blue-200/50 dark:shadow-blue-900/30 overflow-hidden group border border-blue-200/60 dark:border-blue-700/40"
>
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Floating particles */}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-blue-400/20 dark:bg-cyan-400/10"
        initial={{ 
          y: `${Math.random() * 100}%`, 
          x: `${Math.random() * 100}%`,
          opacity: 0,
          scale: 0
        }}
        animate={{ 
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0, 0.5, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: Math.random() * 10 + 15,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "easeInOut"
        }}
        style={{
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
        }}
      />
    ))}
    
    {/* Gradient glow */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-400/5 to-blue-500/5" />
  </div>

  {/* Animated border */}
  <motion.div 
    className="absolute inset-0 rounded-4xl border-2 border-blue-300/40 dark:border-cyan-400/30"
    animate={{
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.1)",
        "0 0 40px rgba(59, 130, 246, 0.2)",
        "0 0 20px rgba(59, 130, 246, 0.1)"
      ]
    }}
    transition={{ duration: 3, repeat: Infinity }}
  />

  <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
    {/* Left Column: Text Content */}
    <div className="text-center lg:text-left order-2 lg:order-1">
      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6"
      >
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
        Limited spots available
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
      >
        Experience True{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 inline-block">
          Financial Freedom
        </span>
      </motion.h3>
      
      <motion.p
        variants={itemVariants}
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
      >
        Join our transformative Master Class and unlock the financial future you deserve
      </motion.p>

      {/* Benefits list */}
      <motion.div 
        variants={itemVariants}
        className="space-y-3 mb-10 text-left"
      >
        {[
          "✓ Boost credit score by 100+ points",
          "✓ Create a debt-free plan that works",
          "✓ Build sustainable wealth strategies",
          "✓ Personalized 1-on-1 coaching",
          "✓ Lifetime access to all materials"
        ].map((item, index) => (
          <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
      >
        <Button
  as="a"
  href="/projects"
  borderRadius="3rem"
  containerClassName="
    relative w-full sm:w-auto min-w-[200px] h-14 px-8 py-0 group/btn
    overflow-visible
  "
  className="
    text-base md:text-lg font-bold tracking-wide text-white
    bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500
    hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600
    transition-all duration-300 ease-out
    shadow-lg hover:shadow-xl hover:shadow-blue-500/30
    flex items-center justify-center
  "
  style={{
    letterSpacing: "0.02em",
  }}
>
  <span className="flex items-center">
    Join Now
    <svg
      className="ml-3 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
      fill="none"
      stroke="white"
      strokeWidth={2.2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </span>
</Button>



        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
          <div className="flex items-center mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 text-yellow-400 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span>4.9/5 from 2,400+ students</span>
        </div>
      </motion.div>
    </div>

    {/* Right Column: Image */}
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative w-full h-full min-h-[300px] lg:min-h-[450px] flex items-center justify-center order-1 lg:order-2"
    >
      {/* Image container with elegant frame */}
      <div className="relative w-full h-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl"></div>
        
        {/* Image with elegant border */}
        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-400/20 group-hover:shadow-cyan-400/30 transition-shadow duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 z-10"></div>
          <div className="absolute inset-0 border-2 border-white/30 rounded-3xl"></div>
          
          <Image
            src="/images/about-us/masterclass.webp"
            alt="Financial Freedom Master Class"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
        
        {/* Floating card element
        <motion.div 
          className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2 animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Next session:</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Starting in 5 days</p>
        </motion.div> */}
      </div>
    </motion.div>
  </div>
</motion.div>
      </div>
    </section>
  );
};

export default AboutusDetail;