"use client";
import Image from "next/image";
import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { useMousePosition } from "../../../../hooks/useMousePosition";
import { useInView } from "react-intersection-observer";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function About() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { x, y } = useMousePosition();
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

  // Removed avatar data fetch; card removed

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

  // Advanced mouse follower effect
  useEffect(() => {
    if (!sectionRef.current || x == null || y == null) return;
    const follower = sectionRef.current.querySelector(
      ".mouse-follower"
    ) as HTMLElement | null;

    if (follower) {
      gsap.to(follower, {
        x: x - 20,
        y: y - 20,
        duration: 0.8,
        ease: "expo.out",
        overwrite: "auto"
      });
    }
  }, [x, y]);

  // Removed avatar animation; card removed

  // GSAP animations setup
  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

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

      // Card hover animations with 3D tilt effect
      const cards = sectionEl.querySelectorAll<HTMLDivElement>(
        ".interactive-card"
      );

      cards?.forEach((card) => {
        // Set up transform perspective
        gsap.set(card, { transformPerspective: 1000 });

        const handleMouseEnter = (e: globalThis.MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const tween = gsap.to(card, {
            duration: 0.5,
            y: -15,
            rotateY: (x - cx) / 20,
            rotateX: (cy - y) / 20,
            scale: 1.03,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            ease: "power2.out",
            overwrite: "auto"
          });
          cardAnimations.current.push(tween);
        };

        const handleMouseMove = (e: globalThis.MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          gsap.to(card, {
            duration: 0.5,
            rotateY: (x - cx) / 20,
            rotateX: (cy - y) / 20,
            ease: "power1.out",
            overwrite: "auto"
          });
        };

        const handleMouseLeave = () => {
          const tween = gsap.to(card, {
            duration: 0.7,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            boxShadow: "none",
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto"
          });
          cardAnimations.current.push(tween);
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        cardHandlers.current.set(card, {
          enter: handleMouseEnter,
          move: handleMouseMove,
          leave: handleMouseLeave
        });
      });

      // Floating circles animation
      const circles = sectionEl.querySelectorAll(".floating-circle");
      circles.forEach((circle, i) => {
        const circleTween = gsap.to(circle, {
          duration: 15 + i * 3,
          x: `${Math.random() * 100 - 50}px`,
          y: `${Math.random() * 100 - 50}px`,
          rotation: Math.random() * 360,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        cardAnimations.current.push(circleTween);
      });

      // Animated gradient background
      const gradientEl = sectionEl.querySelector(
        ".animated-gradient"
      ) as HTMLElement | null;
      if (gradientEl) {
        const gradientTween = gsap.to(gradientEl, {
          duration: 20,
          backgroundPosition: "100% 50%",
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
        cardAnimations.current.push(gradientTween);
      }
    }, sectionRef);

    // Cleanup function
    return () => {
      // Remove card listeners safely
      cardHandlers.current.forEach((handlers, card) => {
        card.removeEventListener("mouseenter", handlers.enter);
        card.removeEventListener("mousemove", handlers.move);
        card.removeEventListener("mouseleave", handlers.leave);
      });
      cardHandlers.current.clear();

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-40 dark:bg-darkblue overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        willChange: "clip-path"
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="animated-gradient absolute inset-0 opacity-10 dark:opacity-5"
          style={{
            background:
              "linear-gradient(270deg, #ff00cc, #3333ff, #00ccff, #33cc33)",
            backgroundSize: "800% 800%"
          }}
        />
      </div>

      {/* Enhanced mouse follower */}
      <motion.div
        className="mouse-follower fixed w-10 h-10 rounded-full bg-primary/20 pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen opacity-0 backdrop-blur-sm"
        initial={{ scale: 0.5 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />

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
            {/* Video */}
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
              className="interactive-card w-full h-full overflow-hidden rounded-lg cursor-pointer rounded-xl group md:col-span-2"
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
                    src={"/images/logo/creditorlogo.png"}
                    alt="Logo Image"
                    height={60}
                    width={250}
                    className="dark:hidden"
                  />
                  <Image
                    src={"/images/logo/creditorlogo.png"}
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

            {/* Removed Card 3 */}
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

export default About;