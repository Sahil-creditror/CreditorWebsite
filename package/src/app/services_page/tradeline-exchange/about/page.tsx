// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaBullseye, FaEye, FaShieldAlt, FaGraduationCap, FaChartLine, FaHandshake, FaStar, FaCheckCircle, FaFlask, FaAtom, FaMicroscope } from 'react-icons/fa';
import { RiTeamLine, RiLightbulbFlashLine } from 'react-icons/ri';
import { MdOutlineSecurity, MdSpeed, MdScience } from 'react-icons/md';

/*
const TimelineNode = ({ year, title, description, isActive, index }) => {
  return (
    <div className="relative pl-12 pb-12 border-l-2 border-slate-200 dark:border-slate-700">
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${isActive ? 'bg-sky-500 scale-125' : 'bg-slate-300 dark:bg-slate-600'} transition-all duration-300`}></div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`p-6 rounded-xl ${isActive ? 'bg-white dark:bg-slate-800 shadow-lg' : 'bg-slate-50 dark:bg-slate-900/50'} transition-all duration-300`}
      >
        <div className={`text-sm font-semibold mb-1 ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500'}`}>{year}</div>
        <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{title}</h3>
        <p className={`text-sm ${isActive ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-500'}`}>
          {description}
        </p>
      </motion.div>
    </div>
  );
};

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.7"]
  });

  const timeline = [
    {
      year: "2018",
      title: "The Genesis",
      description: "Our team of financial engineers and data scientists identified patterns in credit scoring algorithms that could be optimized."
    },
    {
      year: "2019",
      title: "Algorithm Development",
      description: "Developed proprietary algorithms to decode and optimize the credit scoring matrix with unprecedented precision."
    },
    {
      year: "2020",
      title: "Beta Testing",
      description: "Successfully tested our methodology with a select group of clients, achieving an average credit score increase of 120+ points."
    },
    {
      year: "2021",
      title: "Platform Launch",
      description: "Officially launched our platform, making advanced credit optimization accessible to everyone."
    },
    {
      year: "2022",
      title: "Industry Recognition",
      description: "Recognized as industry leaders in credit optimization with features in major financial publications."
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded our services internationally, helping clients in multiple countries optimize their credit profiles."
    },
    {
      year: "2024",
      title: "The Future",
      description: "Continuing to innovate and refine our algorithms to stay ahead of the evolving credit landscape."
    }
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const sections = timeline.length;
      const sectionHeight = 1 / sections;
      const currentSection = Math.min(
        Math.floor(progress / sectionHeight),
        sections - 1
      );
      setActiveIndex(currentSection);
    });

    return () => unsubscribe();
  }, [scrollYProgress, timeline.length]);

  const backgroundColors = [
    'from-slate-50 to-slate-100',
    'from-blue-50 to-blue-100',
    'from-sky-50 to-sky-100',
    'from-cyan-50 to-cyan-100',
    'from-teal-50 to-teal-100',
    'from-emerald-50 to-emerald-100',
    'from-green-50 to-green-100',
  ];

  return (
    <section className="relative py-20 mb-24 overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/beautiful-cryptocurrwncy-concept.jpg)'
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${backgroundColors[activeIndex]} dark:from-slate-900/80 dark:to-slate-800/80 transition-all duration-1000`} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">Our Journey Through Time</h2>
        <p className="text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
          Discover our strategic evolution and pivotal milestones in transforming credit optimization through innovation
        </p>
      </motion.div>

      <div className="relative" ref={containerRef}>
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400/50 to-transparent" />
        
        <div className="space-y-2">
          {timeline.map((item, index) => (
            <TimelineNode
              key={index}
              year={item.year}
              title={item.title}
              description={item.description}
              isActive={index <= activeIndex}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
*/

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-10 md:pt-14 pb-20 md:pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* ================= HERO (DARK, PREMIUM) ================= */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl px-8 py-16 md:px-14 md:py-20 text-center shadow-[0_25px_80px_rgba(0,0,0,0.55)] mb-24 relative overflow-hidden"
        >
          {/* Glow accents */}
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-sky-500/20 rounded-full blur-3xl" />

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 text-slate-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            We're the Credit chemist, transforming raw credit potential into financial gold through 
            our proprietary algorithms and scientific approach to credit optimization.
          </motion.p>
        </motion.section>

        {/* ================= INTERACTIVE TIMELINE ================= */}
        {/* Temporarily commented out the timeline section as requested
        <TimelineSection />
        */}

        {/* ================= SCIENTIFIC METHODOLOGY ================= */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center justify-center mb-6 bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-3 rounded-full shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MdScience className="text-white text-2xl mr-3" />
              <span className="text-white font-semibold text-lg">Data-Driven Approach</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Scientific Methodology</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg">
              We apply rigorous scientific methods to decode and optimize your credit profile
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMicroscope />,
                title: "Data Analysis",
                description: "We analyze thousands of data points to identify patterns and opportunities in credit scoring algorithms.",
                color: "from-blue-500 to-sky-500"
              },
              {
                icon: <FaAtom />,
                title: "Algorithm Optimization",
                description: "Our proprietary algorithms continuously adapt to optimize your credit profile across all major scoring models.",
                color: "from-emerald-500 to-teal-500"
              },
              {
                icon: <FaFlask />,
                title: "Continuous Testing",
                description: "We employ A/B testing and machine learning to refine our strategies for maximum effectiveness.",
                color: "from-purple-500 to-indigo-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700"
              >
                <motion.div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {React.cloneElement(item.icon, { 
                    className: `${item.icon.props.className} w-10 h-10 text-white` 
                  })}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= CREDIT CHEMISTS STORY ================= */}
        <motion.section 
          className="relative rounded-3xl overflow-hidden mb-24 min-h-[500px] flex items-center bg-gradient-to-br from-slate-900 to-slate-800"
        >
          <div className="absolute inset-0">
            <Image 
              src="/About.png" 
              alt="Background pattern"
              fill
              className="opacity-40 object-cover"
            />
          </div>
          <div className="relative z-10 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center justify-center mb-6 bg-slate-800/50 backdrop-blur-sm px-6 py-2 rounded-full border border-slate-700"
            >
              <FaFlask className="text-sky-400 mr-2" />
              <span className="text-sky-300 font-medium">The Science of Credit</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-6"
            >
              We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Credit Chemist</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/80 text-lg leading-relaxed mb-8 max-w-3xl mx-auto"
            >
              We approach credit optimization with scientific precision. Our proprietary algorithms analyze and decode the complex 
              credit scoring matrix, transforming your financial potential into tangible results. Like master chemist, we've 
              perfected the formula for credit success.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { icon: <FaAtom className="w-8 h-8 mx-auto mb-3 text-sky-400" />, title: "Decode the Matrix", desc: "We unravel the complex algorithms behind credit scoring" },
                { icon: <FaMicroscope className="w-8 h-8 mx-auto mb-3 text-sky-400" />, title: "Scientific Approach", desc: "Data-driven strategies based on empirical evidence" },
                { icon: <MdScience className="w-8 h-8 mx-auto mb-3 text-sky-400" />, title: "Precision Engineering", desc: "Meticulously crafted credit optimization solutions" }
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-sky-400/30 transition-colors">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ================= MISSION / VISION / VALUES (DARK CARDS) ================= */}
        <section className="grid md:grid-cols-3 gap-10 mb-24">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] p-10 border border-slate-700 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition cursor-pointer"
          >
            <FaBullseye className="absolute -top-6 -left-6 w-14 h-14 text-sky-400 bg-slate-950 p-3 rounded-full shadow-lg" />
            <h3 className="text-2xl font-bold text-sky-100 mb-3">Mission</h3>
            <p className="text-slate-300 leading-relaxed">
              To empower individuals to take control of their financial futures by providing secure, 
              effective, and ethical credit-building solutions.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] p-10 border border-slate-700 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition cursor-pointer"
          >
            <FaEye className="absolute -top-6 -left-6 w-14 h-14 text-sky-400 bg-slate-950 p-3 rounded-full shadow-lg" />
            <h3 className="text-2xl font-bold text-sky-100 mb-3">Vision</h3>
            <p className="text-slate-300 leading-relaxed">
              A world where access to prime credit is not a privilege but a possibility for all—regardless of background or starting point.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] p-10 border border-slate-700 hover:shadow-[0_25px_80px_rgba(0,0,0,0.55)] transition cursor-pointer"
          >
            <RiLightbulbFlashLine className="absolute -top-6 -left-6 w-14 h-14 text-sky-400 bg-slate-950 p-3 rounded-full shadow-lg" />
            <h3 className="text-2xl font-bold text-sky-100 mb-3">Our Values</h3>
            <p className="text-slate-300 leading-relaxed">
              Built on pillars of <span className="text-sky-300">Transparency</span>, <span className="text-sky-300">Security</span>, 
              <span className="text-sky-300"> Education</span>, and <span className="text-sky-300">Client Success</span>.
            </p>
          </motion.div>
        </section>

        {/* ================= CORE PRINCIPLES ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Core Principles</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              The foundation of everything we do at Tradeline Exchange 
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaShieldAlt className="w-8 h-8" />, title: "Security First", desc: "Rigorous vetting of all tradelines and strict compliance with financial regulations." },
              { icon: <FaGraduationCap className="w-8 h-8" />, title: "Education", desc: "Empowering clients with knowledge, not just products. Your success is our metric." },
              { icon: <MdOutlineSecurity className="w-8 h-8" />, title: "Ethical Practice", desc: "Transparent operations with no hidden fees. We adhere to all credit reporting guidelines." },
              { icon: <FaChartLine className="w-8 h-8" />, title: "Client Success", desc: "We measure our success by your credit score improvements and financial milestones." },
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white">{principle.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{principle.title}</h3>
                <p className="text-slate-600 leading-relaxed">{principle.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= THE TRADELINE SUPPLY DIFFERENCE ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">The Tradeline Exchange Difference</h2>
            
            <div className="grid md:grid-cols-2 gap-16 px-16 max-w-6xl mx-auto">
              <div className="mx-auto">
                <h3 className="text-2xl font-bold text-sky-300 mb-6 flex items-center gap-3">
                  <FaCheckCircle className="text-sky-400" /> What We Offer
                </h3>
                <ul className="space-y-4 max-w-md">
                  {[
                    "Vetted, seasoned primary cardholders",
                    "24/7 dashboard access & real-time tracking",
                    "Personalized strategy consultations",
                    "Post-addition support & guidance",
                    "Educational resources & credit insights",
                    "Transparent pricing, no hidden fees"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex items-start gap-3 text-slate-200"
                    >
                      <FaStar className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="mx-auto">
                <h3 className="text-2xl font-bold text-rose-300 mb-6 flex items-center gap-3">
                  <MdSpeed className="text-rose-400" /> The Industry Standard
                </h3>
                <ul className="space-y-4 max-w-md">
                  {[
                    "Unvetted or questionable sources",
                    "Limited or no client support",
                    "One-size-fits-all approaches",
                    "No follow-up after sale",
                    "Lack of educational guidance",
                    "Hidden fees & unclear pricing"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="flex items-start gap-3 text-slate-400"
                    >
                      <div className="w-5 h-5 border border-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-rose-500 rounded-full" />
                      </div>
                      <span className="line-through">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= OUR PROCESS ================= */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How We Work</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              A streamlined, transparent process designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Select", desc: "Choose from our curated, high-quality tradelines" },
              { step: "02", title: "Consult", desc: "Get personalized strategy advice from our experts" },
              { step: "03", title: "Add", desc: "Secure, compliant tradeline addition process" },
              { step: "04", title: "Monitor", desc: "Track progress with 24/7 dashboard access" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-sky-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= CTA SECTION ================= */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Credit Journey?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
            Join thousands who've taken control of their financial future with Tradeline Exchange.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold text-base"
            >
              View Available Tradelines
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border-2 border-sky-400 text-sky-300 px-10 py-4 rounded-full hover:bg-sky-400/10 transition-all font-semibold text-base"
            >
              Schedule a Free Consultation
            </motion.button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}