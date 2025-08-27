"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ContactProps = { contactdataNumber?: string };

export default function Contact(props: ContactProps) {
  const { contactdataNumber } = props;
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contactData, setContactData] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const sectionRef = useRef<HTMLElement | null>(null);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/page-data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setContactData(data?.statsFactData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchData();
  }, []);

  // GSAP: ripple background + subtle entrance parallax
  useEffect(() => {
    if (!rippleRef.current || typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const ripples = gsap.utils.toArray<HTMLSpanElement>('.ripple');

      // animate repeating ripples - scales & fades
      gsap.to(ripples, {
        scale: 6,
        opacity: 0,
        duration: 3.2,
        ease: 'power2.out',
        stagger: 0.9,
        repeat: -1,
        repeatDelay: 0.6,
        transformOrigin: '50% 50%'
      });

      // small parallax move for the whole section on scroll
      gsap.to(sectionRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, rippleRef);

    return () => ctx.revert();
  }, []);

  const reset = () => {
    setFormData({ name: "", email: "", message: "" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
    setSubmitted(false);

    try {
      const response = await fetch("https://formsubmit.co/ajax/niravjoshi87@gmail.com", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();
      // formsubmit returns { success: true } on success — fallback to truthy
      if (data?.success || response.ok) {
        setSubmitted(true);
        reset();
      } else {
        setSubmitted(false);
      }
    } catch (error: any) {
      console.error('Submit error:', error?.message || error);
      setSubmitted(false);
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // framer-motion variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, when: 'beforeChildren' } }
  };
  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className="relative py-20 md:py-24 bg-gray-50 dark:bg-darkblack overflow-hidden"
    >
      {/* ripple animation layer (purely decorative) */}
      <div ref={rippleRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        {/* center ripples - three elements, different base sizes */}
        <span className="ripple absolute rounded-full bg-primary/20 dark:bg-primary/10 z-0" style={{ width: 120, height: 120, left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }} />
        <span className="ripple absolute rounded-full bg-primary/16 dark:bg-primary/8 z-0" style={{ width: 220, height: 220, left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }} />
        <span className="ripple absolute rounded-full bg-primary/10 dark:bg-primary/6 z-0" style={{ width: 340, height: 340, left: '50%', top: '48%', transform: 'translate(-50%, -50%)' }} />
      </div>

      <div className="container relative z-10">
        <motion.div variants={container} className="mx-auto flex flex-col gap-8 md:gap-12">

          <motion.div variants={item} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="bg-primary dark:text-secondary py-1.5 px-3 text-base font-semibold rounded-full">{contactdataNumber ?? 10}</span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
              <p className="section-bedge py-1.5 px-4 rounded-full">Contact us</p>
            </div>
            <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Get in Touch
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-xl">
                Let’s collaborate and craft something extraordinary together.  
                Share your vision—I’m all ears and ready to help bring it to life.
            </p>
            </div>
          </motion.div>

          <motion.div variants={container} className="flex flex-col xl:flex-row gap-10 xl:gap-16">

            {/* left info column */}
{/* Left info column - Enhanced */}
<motion.div
  variants={item}
  className="max-w-md flex flex-col gap-10 md:gap-14"
>
  <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-800/80 dark:to-gray-900/70 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:shadow-3xl hover:-translate-y-1.5 overflow-hidden group">
    
    {/* Decorative elements */}
    <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-700"></div>
    <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
    
    {/* Shimmer effect on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -skew-x-12 group-hover:animate-shimmer transition-all duration-1000 opacity-0 group-hover:opacity-100"></div>
    
    {/* Heading with icon */}
    <div className="flex items-center gap-3 mb-6 relative z-10">
      <div className="bg-gradient-to-r from-primary to-blue-600 p-2 rounded-xl shadow-md">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
        Why Reach Out?
      </p>
    </div>
    
    {/* Description */}
    <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 relative z-10">
      Quick collaboration, custom quotes, or even a friendly chat about your next big idea.  
      We'll guide you every step of the way with clarity and care.
    </p>

    {/* Keypoints */}
    <ul className="space-y-5 relative z-10">
      {contactData?.keypoint?.map((value: any, index: number) => (
        <motion.li
          key={index}
          variants={item}
          className="flex items-start gap-4 group p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 hover:bg-white/80 dark:hover:bg-gray-800/50 transition-all duration-300 border border-white/30 dark:border-white/5"
        >
          <div className="bg-gradient-to-r from-primary to-blue-600 p-2.5 rounded-full flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 mt-0.5">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors duration-300">
            {value}
          </span>
        </motion.li>
      ))}
    </ul>

    {/* Manager Profile - Enhanced */}
    <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/30 relative z-10">
      <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/40 dark:bg-gray-800/30 hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-300">
        {contactData?.managerProfile?.image && (
          <div className="relative">
            <Image
              src={contactData.managerProfile.image}
              alt="manager"
              width={72}
              height={72}
              className="rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/30 transition-all duration-500"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 ring-2 ring-white dark:ring-gray-900">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-lg">
            {contactData?.managerProfile?.name}
          </p>
          <span className="text-sm text-gray-600 dark:text-gray-400 block mt-1">
            {contactData?.managerProfile?.position}
          </span>
          <div className="flex items-center mt-2">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-gray-500 dark:text-gray-400">Typically replies in 2 hours</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>

            {/* right form column */}
            <motion.div variants={item} className="w-full">
              <motion.form onSubmit={handleSubmit} variants={container} className="relative bg-white/70 dark:bg-white/6 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-black/4 dark:border-white/6 flex flex-col gap-4 md:gap-6">

                <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5 bg-transparent"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    aria-label="Name"
                  />
                  <input
                    required
                    className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5 bg-transparent"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    aria-label="Email"
                  />
                </motion.div>

                <motion.textarea
                  variants={item}
                  className="w-full border-b border-secondary dark:border-white/20 focus:border-black dark:focus:border-white focus:outline-none py-3.5 bg-transparent resize-none"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  aria-label="Message"
                />

                {submitted && (
                  <motion.div variants={item} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                    <div className="bg-primary w-fit p-1.5 rounded-full">
                      <Image src={'/images/Icon/right-check.svg'} alt="right-icon" width={18} height={18} />
                    </div>
                    <p className="text-secondary">Great! Email has been successfully sent. We will get in touch ASAP.</p>
                  </motion.div>
                )}

                <div className="mt-2">
                  {!loader ? (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="group relative flex justify-center items-center w-full bg-primary hover:bg-secondary rounded-full transition-all duration-300 ease-in-out cursor-pointer py-3.5">
                      <span className="text-lg font-bold text-secondary group-hover:text-white transition-all duration-300 ease-in-out">Submit message</span>
                      <div className="absolute top-1 right-1 transition-all duration-300 ease-in-out">
                        <svg className="flex items-center transition-transform duration-300 ease-in-out group-hover:rotate-45" width="46" height="46" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_1_873)">
                            <rect x="3" y="2" width="52" height="52" rx="26" fill="white" />
                            <path d="M24 23H34M34 23V33M34 23L24 33" stroke="#1F2A2E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </g>
                          <defs>
                            <filter id="filter0_d_1_873" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                              <feOffset dy="1" />
                              <feGaussianBlur stdDeviation="1.5" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_873" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_873" result="shape" />
                            </filter>
                          </defs>
                        </svg>
                      </div>
                    </motion.button>
                  ) : (
                    <button className="bg-gray-100 dark:bg-white/5 item-center flex gap-2 py-3 px-6 rounded w-full justify-center">
                      <div className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full text-primary" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                      </div>
                      Submitting
                    </button>
                  )}
                </div>

              </motion.form>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

    </motion.section>
  );
}
