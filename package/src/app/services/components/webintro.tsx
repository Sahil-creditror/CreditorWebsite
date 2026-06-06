'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WebsiteUpperSection: React.FC = () => {
  // Animation controls for different sections
  const controls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);


  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  } as const;



  return (
    <>


        {/* Website Development & Design Section */}
        <motion.section
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          style={{ padding: '50px 5%', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', sans-serif", background: '#ffffff', position: 'relative' }}
        >
          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginTop: '50px', fontFamily: "'Poppins', sans-serif" }}
          >
          {/* Left Content */}
          <motion.div variants={textVariants} style={{ flex: '1 1 300px', minWidth: '300px' }}>
            <motion.h2 variants={textVariants} style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: '#1a202c', marginBottom: '20px', fontWeight: 'bold' }}>
              Website{' '}
              <motion.span variants={textVariants} style={{ color: '#5dade2', background: 'linear-gradient(90deg, #5dade2, #2a9d8f, #5dade2)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Development & Design
              </motion.span>
            </motion.h2>

            <motion.div variants={textVariants} whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} style={{ display: 'inline-block', background: 'rgba(42, 157, 143, 0.1)', padding: '12px 30px', borderRadius: '50px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.8rem)", color: 'rgb(42, 157, 143)', fontWeight: '600', margin: '0', textAlign: 'center' }}>
                <span style={{ color: '#1a202c' }}>$100</span> One-Time Setup <span style={{ color: '#1a202c' }}>+ $49/month</span> Maintenance
              </p>
            </motion.div>

            <motion.p variants={textVariants} style={{ fontSize: '1.1rem', color: '#4a5568', marginTop: '30px', lineHeight: '1.7' }}>
              Transform your online presence with a custom, responsive website that aligns with your brand and drives business growth. From startups to established companies, we create digital experiences that captivate and convert.
            </motion.p>

            <motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '30px', marginBottom: '30px' }}>
              <motion.span variants={textVariants} whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} style={{ background: '#e6f7ff', color: '#5dade2', padding: '10px 22px', borderRadius: '50px', fontSize: '0.95rem', fontWeight: '600', boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
                Mobile-First Design
              </motion.span>
              <motion.span variants={textVariants} whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} style={{ background: '#e6f7ff', color: '#5dade2', padding: '10px 22px', borderRadius: '50px', fontSize: '0.95rem', fontWeight: '600', boxShadow: '0 3px 10px rgba(0,0,0,0.03)' }}>
                SEO Optimized
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } } }} style={{ flex: '1 1 300px', minWidth: '300px', maxWidth: '500px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            <motion.img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" alt="Website Development" style={{ width: '100%', height: 'auto', display: 'block' }} whileHover={{ scale: 1.02 }} />
          </motion.div>
          </motion.div>
        </motion.section>
    </>
  );
};

export default WebsiteUpperSection;
