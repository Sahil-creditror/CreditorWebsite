"use client";
import Image from "next/image";
import StarRating from "../../shared/star-rating";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useMousePosition } from "../../../../hooks/useMousePosition";
import { useInView } from "react-intersection-observer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function Aboutus() {
  const [avatarList, setAvatarList] = useState<any>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Floating bubble configuration
  const bubbleConfigs = Array.from({ length: 15 }).map(() => ({
    size: Math.random() * 25 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 2,
    xMovement: Math.random() * 100 - 50,
    yMovement: Math.random() * 100 - 50
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data?.avatarList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Master timeline for coordinated animations
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      }
    });

    // Section entrance animation with morphing effect
    masterTL.from(sectionRef.current.querySelectorAll(".section-content > *"), {
      opacity: 0,
      y: 80,
      duration: 1.2,
      stagger: 0.15,
      ease: "back.out(1.2)",
      onStart: () => {
        gsap.to(sectionRef.current, {
          duration: 0.8,
          css: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          ease: "power3.inOut"
        });
      }
    });

    // Card hover animations with 3D tilt effect
    const cards = sectionRef.current?.querySelectorAll<HTMLDivElement>(".interactive-card");

      cards?.forEach((card) => {
        // Set up transform perspective
        gsap.set(card, { transformPerspective: 1000 });

        card.addEventListener("mouseenter", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          gsap.to(card, {
            duration: 0.5,
            y: -15,
            rotateY: (x - centerX) / 20,
            rotateX: (centerY - y) / 20,
            scale: 1.03,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            ease: "power2.out",
          });
        });

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          gsap.to(card, {
            duration: 0.5,
            rotateY: (x - centerX) / 20,
            rotateX: (centerY - y) / 20,
            ease: "power1.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            duration: 0.7,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            boxShadow: "none",
            ease: "elastic.out(1, 0.5)",
          });
        });
      });


    // Parallax effect with depth
    gsap.to(sectionRef.current.querySelector(".parallax-bg"), {
      y: 80,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });

    // Floating circles animation
    const circles = sectionRef.current.querySelectorAll(".floating-circle");
    circles.forEach((circle, i) => {
      gsap.to(circle, {
        duration: 15 + i * 3,
        x: `${Math.random() * 100 - 50}px`,
        y: `${Math.random() * 100 - 50}px`,
        rotation: Math.random() * 360,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Animated gradient background
    if (sectionRef.current.querySelector(".animated-gradient")) {
      gsap.to(sectionRef.current.querySelector(".animated-gradient"), {
        duration: 20,
        backgroundPosition: "100% 50%",
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      masterTL.kill();
    };
  }, []);

  // Advanced mouse follower effect
  useEffect(() => {
    if (!sectionRef.current || !x || !y) return;
    
    const follower = sectionRef.current.querySelector(".mouse-follower");
    if (follower) {
      // Smooth chase with momentum
      gsap.to(follower, {
        x: x - 20,
        y: y - 20,
        duration: 0.8,
        ease: "expo.out"
      });
      
      // Pulse effect when moving
      if (Math.abs(x - follower._gsap.x) > 2 || Math.abs(y - follower._gsap.y) > 2) {
        gsap.to(follower, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut"
        });
      }
    }
  }, [x, y]);

  // Avatar list stagger animation
  useEffect(() => {
    if (avatarList && avatarList.length > 0) {
      controls.start(i => ({
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

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-40 dark:bg-darkblack overflow-hidden"
      style={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        willChange: "clip-path"
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-gradient absolute inset-0 opacity-10 dark:opacity-5" 
          style={{
            background: "linear-gradient(270deg, #ff00cc, #3333ff, #00ccff, #33cc33)",
            backgroundSize: "800% 800%"
          }}
        />
      </div>
      
      {/* Floating bubbles with motion components */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        {bubbleConfigs.map((config, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 dark:bg-secondary/10"
            style={{
              width: `${config.size}px`,
              height: `${config.size}px`,
              left: `${config.x}%`,
              top: `${config.y}%`
            }}
            animate={{
              x: [0, config.xMovement, 0],
              y: [0, config.yMovement, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: config.duration,
              delay: config.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
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
        <div className="flex flex-col 2xl:flex-row gap-10 2xl:gap-28">
          {/* Left Side */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.8,
                ease: [0.16, 0.77, 0.47, 0.97]
              }
            } : {}}
            className="flex flex-col gap-5 2xl:gap-7 w-full 2xl:max-w-2xl 2xl:w-full"
          >
            {/* Top Row */}
            <motion.div 
              className="flex items-center gap-4 md:gap-8"
              initial={{ opacity: 0 }}
              animate={inView ? {
                opacity: 1,
                transition: { delay: 0.2 }
              } : {}}
            >
              <motion.span 
                className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary"
                initial={{ scale: 0 }}
                animate={inView ? {
                  scale: 1,
                  transition: { 
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                  }
                } : {}}
              >
                02
              </motion.span>
              <motion.div 
                className="h-px w-16 bg-secondary/12 dark:bg-white/12"
                initial={{ scaleX: 0 }}
                animate={inView ? {
                  scaleX: 1,
                  transition: { delay: 0.3 }
                } : {}}
              />
              <motion.p 
                className="text-base font-medium text-white bg-secondary dark:bg-white/10 py-1.5 px-4 rounded-full"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? {
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.4 }
                } : {}}
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
                      ease: [0.34, 1.56, 0.64, 1] // back.out alternative
                    }
                  }
                }}
              >
                Why Choose Us
              </motion.h2>

              <motion.p 
                className="2xl:max-w-sm text-secondary/70 dark:text-white/70"
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
              >
                Creditor Academy empowers individuals and businesses with the
                knowledge, strategies, and tools to take full control of their
                financial journey. Through expert-led courses, legal insights,
                and proven frameworks, we help our members build credit mastery,
                financial freedom, and long-term success.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Right Side - 3 Columns */}
          <div className="grid md:grid-cols-3 gap-5 2xl:gap-7">
            {/* Card 1 */}
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
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="interactive-card relative bg-primary p-4 2xl:p-7 flex flex-col justify-between gap-8 md:gap-0 cursor-pointer group rounded-xl overflow-hidden"
              onMouseEnter={() => {
                gsap.to(".mouse-follower", { 
                  opacity: 1,
                  scale: 2,
                  backgroundColor: "rgba(255, 200, 0, 0.3)",
                  backdropFilter: "blur(4px)"
                });
              }}
              onMouseLeave={() => {
                gsap.to(".mouse-follower", { 
                  opacity: 0,
                  scale: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(2px)"
                });
              }}
            >
              <motion.div 
                className="relative z-10 flex flex-col gap-2 lg:gap-4"
                whileHover={{ transition: { staggerChildren: 0.1 } }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <StarRating count={5} color="#1F2A2E" />
                </motion.div>
                <motion.p 
                  className="dark:text-secondary"
                  whileHover={{ x: 5 }}
                >
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
                <div className="relative border-b border-secondary/12 pb-5">
                  <motion.h2 
                    className="dark:text-secondary"
                    initial={{ scale: 0.9 }}
                    whileInView={{ 
                      scale: 1,
                      transition: { 
                        type: "spring",
                        stiffness: 300
                      }
                    }}
                  >
                    98.9%
                  </motion.h2>
                  <motion.p className="text-base text-secondary/70">
                    Student satisfaction rate
                  </motion.p>
                </div>
                
                <div className="flex items-center gap-2 lg:gap-5 pt-5">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Image
                      src={"/images/home/aboutusIndex/avatar.svg"}
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
                    <p className="font-medium dark:text-secondary">
                      Jordan Matthews
                    </p>
                    <p className="text-base text-secondary/70">
                      Academy Graduate
                    </p>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 right-0 parallax-bg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ 
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.5 }
                }}
              >
                <Image
                  src={"/images/home/aboutusIndex/bg-ellipse.svg"}
                  alt="image"
                  width={200}
                  height={200}
                />
              </motion.div>
              
              {/* Animated decorative elements */}
              <motion.div 
                className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Card 2 */}
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
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="interactive-card w-full h-full overflow-hidden rounded-lg cursor-pointer rounded-xl"
                onMouseEnter={() => {
                  gsap.to(".mouse-follower", { 
                    opacity: 1,
                    scale: 2,
                    backgroundColor: "rgba(0, 100, 255, 0.3)",
                    backdropFilter: "blur(4px)"
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(".mouse-follower", { 
                    opacity: 0,
                    scale: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(2px)"
                  });
                }}
              >
                <motion.div>
                  <Image
                    src={"/images/home/services/3062.jpg"}
                    alt="Image"
                    width={340}
                    height={215}
                    style={{ width: "100%", height: "100%" }}
                    className="transition-transform duration-500"
                  />
                </motion.div>
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
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                className="interactive-card bg-secondary dark:bg-lightgray/10 p-5 2xl:p-7 flex flex-col justify-between gap-8 cursor-pointer rounded-xl"
                onMouseEnter={() => {
                  gsap.to(".mouse-follower", { 
                    opacity: 1,
                    scale: 2,
                    backgroundColor: "rgba(100, 200, 255, 0.3)",
                    backdropFilter: "blur(4px)"
                  });
                }}
                onMouseLeave={() => {
                  gsap.to(".mouse-follower", { 
                    opacity: 0,
                    scale: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(2px)"
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
                    {avatarList?.map((items: any, index: any) => (
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
                          transition: { type: "spring", stiffness: 500 }
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

            {/* Card 3 */}
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
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="interactive-card relative overflow-hidden p-5 2xl:p-7 border border-secondary/12 dark:border-white/30 flex flex-col justify-between gap-8 md:gap-0 cursor-pointer rounded-xl"
              onMouseEnter={() => {
                gsap.to(".mouse-follower", { 
                  opacity: 1,
                  scale: 2,
                  backgroundColor: "rgba(200, 100, 255, 0.3)",
                  backdropFilter: "blur(4px)"
                });
              }}
              onMouseLeave={() => {
                gsap.to(".mouse-follower", { 
                  opacity: 0,
                  scale: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(2px)"
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
                  initial={{ scale: 0.9 }}
                  whileInView={{ 
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                >
                  35+
                </motion.h2>
                <motion.p>
                  Exclusive credit & legal courses
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
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.7 }
                  }}
                  whileTap={{ scale: 0.95 }}
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
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ 
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.7 }
                  }}
                >
                  Our programs are designed to deliver actionable knowledge,
                  practical frameworks, and real-world financial empowerment for
                  members at every stage of their credit journey.
                </motion.p>
              </motion.div>
              
              {/* Animated floating circles */}
              <motion.div 
                className="floating-circle absolute -top-72 right-0 border border-secondary/12 dark:border-white/30 rounded-full w-[489px] h-[489px] group-hover:opacity-80 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 0.3,
                  transition: { delay: 0.8 }
                }}
              />
              
              <motion.div 
                className="floating-circle absolute -bottom-36 -right-14 border border-secondary/12 dark:border-white/30 rounded-full w-[489px] h-[489px] group-hover:opacity-80 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 0.3,
                  transition: { delay: 0.9 }
                }}
              />
              
              {/* Particle animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/10 dark:bg-secondary/10"
                    style={{
                      width: `${Math.random() * 6 + 2}px`,
                      height: `${Math.random() * 6 + 2}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    animate={{
                      y: [0, Math.random() * 40 - 20],
                      x: [0, Math.random() * 40 - 20],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: Math.random() * 10 + 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 3
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;