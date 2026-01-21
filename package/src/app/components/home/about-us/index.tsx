"use client";
import Image from "next/image";
import StarRating from "../../shared/star-rating";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Aboutus() {
  const [avatarList, setAvatarList] = useState<any>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();
  const [reduceMotion, setReduceMotion] = useState(false);
  const [sectionActive, setSectionActive] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // GSAP timeline and animation references
  const masterTL = useRef<gsap.core.Timeline | null>(null);
  const cardAnimations = useRef<gsap.core.Tween[]>([]);

  // Store DOM listener refs per card so we can remove them safely
  const cardHandlers = useRef<
    Map<
      HTMLDivElement,
      {
        enter: (e: globalThis.MouseEvent) => void;
        move: (e: globalThis.MouseEvent) => void;
        leave: (e: globalThis.MouseEvent) => void;
      }
    >
  >(new Map());

  // Respect prefers-reduced-motion and visibility
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let lastIntersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        lastIntersecting = entry.isIntersecting;
        setSectionActive(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    const onVis = () => setSectionActive(lastIntersecting && !document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data?.avatarList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  // Handle video modal
  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      const modal = document.querySelector(".video-modal");
      if (modal && !modal.contains(event.target as Node)) {
        closeVideoModal();
      }
    };

    if (isVideoModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVideoModalOpen, closeVideoModal]);

  // Avatar list stagger animation
  useEffect(() => {
    if (Array.isArray(avatarList) && avatarList.length > 0) {
      controls.start((i) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: i * 0.15,
          type: "spring",
          stiffness: 100,
          damping: 10
        }
      }));
    }
  }, [avatarList, controls]);

  // GSAP animations setup (trimmed to entrance only; heavy loops removed)
  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined" || reduceMotion || !sectionActive) return;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current as HTMLDivElement | null;
      if (!sectionEl) return;
      // Clean up any existing animations
      if (masterTL.current) {
        masterTL.current.kill();
      }
      cardAnimations.current.forEach((anim) => anim.kill());
      cardAnimations.current = [];

      // Master timeline for coordinated animations
      masterTL.current = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 75%",
          toggleActions: "play none none none",
          markers: false
        }
      });

      // Section entrance animation
      masterTL.current.from(
        sectionEl.querySelectorAll(".section-content > *"),
        {
          opacity: 0,
          y: 80,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.2)",
          onStart: () => {
            gsap.to(sectionEl, {
              duration: 0.8,
              css: {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              },
              ease: "power3.inOut"
            });
          }
        }
      );

      // Card hover tilt/looping and background animations removed for performance
    }, sectionRef);

    // Cleanup function
    return () => {
      // Kill animations
      if (masterTL.current) {
        masterTL.current.kill();
        masterTL.current = null;
      }
      cardAnimations.current.forEach((anim) => anim.kill());
      cardAnimations.current = [];

      // Revert GSAP context
      ctx.revert();
    };
  }, [reduceMotion, sectionActive]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-40 dark:bg-darkblue overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        willChange: "clip-path"
      }}
    >
      {/* Background + mouse follower animations removed for performance */}

      <div className="container section-content relative z-10">
        <div className="flex flex-col 2xl:flex-row gap-5 2xl:gap-18">
          {/* Left Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 0.77, 0.47, 0.97]
                    }
                  }
                : {}
            }
            className="flex flex-col gap-5 2xl:gap-7 w-full 2xl:max-w-2xl 2xl:w-full"
          >
            {/* Top Row */}
            <motion.div
              className="flex items-center gap-4 md:gap-8"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      transition: { delay: 0.2 }
                    }
                  : {}
              }
            >
              <motion.span
                className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary"
                initial={{ scale: 0 }}
                animate={
                  inView
                    ? {
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 15
                        }
                      }
                    : {}
                }
              >
                01
              </motion.span>
              <motion.div
                className="h-px w-16 bg-secondary/12 dark:bg-white/12"
                initial={{ scaleX: 0 }}
                animate={
                  inView
                    ? {
                        scaleX: 1,
                        transition: { delay: 0.3 }
                      }
                    : {}
                }
              />
              <motion.p
                className="text-base font-medium text-white bg-secondary dark:bg-white/10 py-1.5 px-4 rounded-full"
                initial={{ y: 20, opacity: 0 }}
                animate={
                  inView
                    ? {
                        y: 0,
                        opacity: 1,
                        transition: { delay: 0.4 }
                      }
                    : {}
                }
              >
                About Creditor
              </motion.p>
            </motion.div>

            {/* Heading + Paragraph with stagger */}
            <motion.div
              className="flex flex-col gap-5 2xl:gap-7"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
            >
              <motion.h2
                className="2xl:max-w-3xl text-secondary dark:text-white"
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      ease: [0.34, 1.56, 0.64, 1]
                    }
                  }
                }}
              >
                Why Choose Us
              </motion.h2>

              <motion.p
                className="2xl:max-w-sm text-black dark:text-white/70 text-justify"
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
              >
                At Creditor Academy, we equip individuals and entrepreneurs with the knowledge to unlock
                the full power of the "Private" operating outside the public system, which means more control,
                more protection, and more opportunity.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Side - 3 Columns */}
          <div className="grid md:grid-cols-3 gap-5 2xl:gap-7">
            {/* Card 1 */}
            <div className="flex flex-col gap-5 2xl:gap-7">
              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="interactive-card w-full h-full overflow-hidden rounded-lg cursor-pointer rounded-xl group"
                onMouseEnter={() => {
                  gsap.to(".mouse-follower", {
                    opacity: 1,
                    scale: 2,
                    backgroundColor: "rgba(0, 100, 255, 0.3)",
                    backdropFilter: "blur(4px)",
                    overwrite: "auto"
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(".mouse-follower", {
                    opacity: 0,
                    scale: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(2px)",
                    overwrite: "auto"
                  });
                }}
                onClick={openVideoModal}
              >
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src="/video/intro.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-secondary ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }}
                whileHover={{
                  scale: 1.0,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="interactive-card bg-secondary dark:bg-lightgray/10 p-5 2xl:p-7 flex flex-col justify-between gap-8 cursor-pointer rounded-xl"
                onMouseEnter={() => {
                  gsap.to(".mouse-follower", {
                    opacity: 1,
                    scale: 2,
                    backgroundColor: "rgba(100, 200, 255, 0.3)",
                    backdropFilter: "blur(4px)",
                    overwrite: "auto"
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(".mouse-follower", {
                    opacity: 0,
                    scale: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(2px)",
                    overwrite: "auto"
                  });
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { delay: 0.4 }
                  }}
                >
                  <motion.h2
                    className="text-white"
                    initial={{ scale: 0.9 }}
                    whileInView={{
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                  >
                    1,000+
                  </motion.h2>
                  <motion.p className="text-base text-white/70">
                    Students trained worldwide
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: { delay: 0.5 }
                  }}
                >
                  <ul className="avatar flex flex-row items-center">
                    {Array.isArray(avatarList) &&
                      avatarList.map((items: any, index: number) => (
                        <motion.li
                          key={index}
                          custom={index}
                          animate={controls}
                          className="-mr-2 z-1 hover:-translate-y-2 transition-transform duration-300"
                          initial={{ x: 10, opacity: 0 }}
                          whileHover={{
                            y: -5,
                            zIndex: 10,
                            scale: 1.2,
                            transition: {
                              type: "spring",
                              stiffness: 500
                            }
                          }}
                        >
                          <Image
                            src={items.image}
                            alt="Image"
                            width={44}
                            height={44}
                            quality={100}
                            className="rounded-full border-2 border-secondary hover:border-primary transition-all duration-300"
                          />
                        </motion.li>
                      ))}
                  </ul>
                </motion.div>
              </motion.div>
            </div>

            {/* Card 2 - Text colors remain unchanged as requested */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="interactive-card relative overflow-hidden p-5 2xl:p-7 bg-white flex flex-col justify-between gap-8 md:gap-0 cursor-pointer rounded-xl"
              onMouseEnter={() => {
                gsap.to(".mouse-follower", {
                  opacity: 1,
                  scale: 2,
                  backgroundColor: "rgba(200, 100, 255, 0.3)",
                  backdropFilter: "blur(4px)",
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }}
              onMouseLeave={() => {
                gsap.to(".mouse-follower", {
                  opacity: 0,
                  scale: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(2px)",
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }}
            >
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.5 }
                }}
              >
                <motion.h2
                  className="text-4xl font-bold text-gray-800 dark:text-black"
                  initial={{ scale: 0.9 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15
                    }
                  }}
                >
                  35+
                </motion.h2>
                <motion.p className="text-gray-600 dark:text-black mt-2">
                  Exclusive credit & lawful courses
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.6 }
                }}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -2, 2, -2, 0],
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png"}
                    alt="Logo Image"
                    height={60}
                    width={250}
                    className="dark:hidden"
                  />
                  <Image
                    src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png"}
                    alt="Logo Image"
                    height={60}
                    width={250}
                    className="hidden dark:block"
                  />
                </motion.div>

                <motion.p
                  className="text-gray-600 dark:text-black"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.7, duration: 0.5 }
                  }}
                >
                  Our educational platform & Instructors empower you to structure your life and business
                  for maximum privacy, asset protection, and true independence. This is where knowledge
                  becomes sovereignty, because real freedom begins in the Private.
                </motion.p>
              </motion.div>

              {/* Subtle animated gradient background */}
              <motion.div
                className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 0.05,
                  transition: { delay: 0.8, duration: 1 }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500"></div>
              </motion.div>

              {/* Thicker animated floating circles */}
              <motion.div
                className="absolute -top-72 -right-24 border-2 border-gray-300 rounded-full w-[489px] h-[489px] opacity-40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 0.4,
                  scale: 1,
                  transition: {
                    delay: 0.8,
                    duration: 1.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{
                  opacity: 0.5,
                  borderWidth: "3px",
                  transition: { duration: 0.5 }
                }}
              />

              <motion.div
                className="absolute -bottom-36 -right-14 border-2 border-gray-300 rounded-full w-[489px] h-[489px] opacity-40"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 0.4,
                  scale: 1,
                  transition: {
                    delay: 0.9,
                    duration: 1.2,
                    ease: "easeOut"
                  }
                }}
                whileHover={{
                  opacity: 0.5,
                  borderWidth: "3px",
                  transition: { duration: 0.5 }
                }}
              />

              {/* Additional medium circle for depth */}
              <motion.div
                className="absolute -top-40 -left-20 border border-gray-400 rounded-full w-[350px] h-[350px] opacity-20"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{
                  opacity: 0.2,
                  scale: 1,
                  transition: {
                    delay: 1.0,
                    duration: 1.5,
                    ease: "easeOut"
                  }
                }}
              />

              {/* Subtle shimmer effect */}
              <motion.div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                initial={{ x: "-100%", skewX: "-15deg" }}
                whileHover={{
                  x: "200%",
                  transition: { duration: 1.2, ease: "easeOut" }
                }}
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="interactive-card relative bg-primary p-4 2xl:p-7 flex flex-col justify-between gap-8 md:gap-0 cursor-pointer group rounded-xl overflow-hidden"
              onMouseEnter={() => {
                gsap.to(".mouse-follower", {
                  opacity: 1,
                  scale: 2,
                  backgroundColor: "rgba(255, 200, 0, 0.3)",
                  backdropFilter: "blur(4px)",
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }}
              onMouseLeave={() => {
                gsap.to(".mouse-follower", {
                  opacity: 0,
                  scale: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(2px)",
                  duration: 0.3,
                  ease: "power2.out",
                  overwrite: "auto"
                });
              }}
            >
              <motion.div
                className="relative z-10 flex flex-col gap-2 lg:gap-4"
                whileHover={{ transition: { staggerChildren: 0.1 } }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <StarRating count={5} color="#FFFFFF" />
                </motion.div>
                <motion.p className="text-white" whileHover={{ x: 5 }}>
                  "Creditor Academy transformed my understanding of credit and
                  empowered me with strategies I never thought possible."
                </motion.p>
              </motion.div>

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.3 }
                }}
              >
                <div className="relative border-b border-white/20 pb-5">
                  <motion.h2
                    className="text-white"
                    initial={{ scale: 0.9 }}
                    whileInView={{
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }
                    }}
                  >
                    98.9%
                  </motion.h2>
                  <motion.p className="text-base text-white/80">
                    Student satisfaction rate
                  </motion.p>
                </div>

                <div className="flex items-center gap-2 lg:gap-5 pt-5">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                  >
                    <Image
                      src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883592/creditor-website-assets/images/home/aboutusIndex/avatar.svg"}
                      alt="Image"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.4 }
                    }}
                  >
                    <p className="font-medium text-white">Jordan Matthews</p>
                    <p className="text-base text-white/80">
                      Academy Graduate
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Optimized background element without extra space */}
              <motion.div
                className="absolute bottom-0 right-0 w-40 h-40 opacity-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 0.1,
                  scale: 1,
                  transition: { delay: 0.5, duration: 0.8 }
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-xl"></div>
              </motion.div>

              {/* Optimized decorative elements with reduced lag */}
              <motion.div
                className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white/5"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ willChange: "transform, opacity" }}
              />

              {/* Additional subtle glow for depth */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-lg opacity-20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 video-modal"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button - positioned outside the video container */}
              <button
                onClick={closeVideoModal}
                className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Video player */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <div className="relative pt-[56.25%]">
                  {/* 16:9 aspect ratio */}
                  <iframe
                    src="https://drive.google.com/file/d/1jUjnrebq_Z6jy64RWnIZqAHjD6JEfW9Y/preview"
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Aboutus;