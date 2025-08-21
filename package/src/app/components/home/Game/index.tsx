"use client";

import React, { useState } from 'react';
import { FaGamepad, FaMedal, FaUsers, FaChevronRight, FaPlay, FaStar, FaTrophy } from 'react-icons/fa';
import { motion, Variants } from 'framer-motion';

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const GameBanner = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section style={{ fontFamily: 'Poppins, sans-serif', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
      {/* Enhanced Gamified Sovereignty Academy Section */}
      <motion.section
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        style={{
          padding: '80px 6%',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
          position: 'relative',
        }}
      >
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}></div>

        <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '10px 24px',
              borderRadius: '20px',
              marginBottom: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            }}
          >
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              color: '#334155',
              letterSpacing: '0.5px'
            }}>
              INTERACTIVE LEARNING
            </span>
          </motion.div>
          
          <h2 style={{ 
            fontSize: '2.5rem', 
            color: '#0f172a', 
            fontWeight: 700, 
            marginBottom: '15px',
            lineHeight: '1.2'
          }}>
            The First-Ever<br />
            <span style={{ 
              color: '#3b82f6',
            }}>Gamified Sovereignty Academy</span>
          </h2>
          
          <p
            style={{
              fontSize: '1.1rem',
              color: '#475569',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            No more boring slideshows — just real simulation games, XP, documents,
            badges, and fun learning through action!
          </p>
        </div>

        {/* Enhanced Grid Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '20px',
          }}
        >
          {[
            {
              title: 'Real Simulation Games',
              desc: 'Experience learning by playing with engaging, real-world legal scenarios.',
              icon: <FaGamepad size={24} color="#fff" />,
              color: '#3b82f6',
              hoverColor: '#2563eb'
            },
            {
              title: 'Earn XP & Unlock Badges',
              desc: 'Answer questions to unlock badges, contracts, docs & exclusive templates.',
              icon: <FaMedal size={24} color="#fff" />,
              color: '#f59e0b',
              hoverColor: '#d97706'
            },
            {
              title: 'Interactive Experience',
              desc: 'Engage with sound, effects, leaderboards, and multiplayer challenges.',
              icon: <FaUsers size={24} color="#fff" />,
              color: '#10b981',
              hoverColor: '#059669'
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#ffffff',
                padding: '32px 24px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease-in-out',
                textAlign: 'center',
                border: '1px solid #f1f5f9',
                color: '#334155',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated background element */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: hoveredCard === index ? '100%' : '4px',
                background: item.color,
                transition: 'height 0.3s ease',
                zIndex: 0,
                opacity: 0.1
              }}></div>
              
              {/* Icon Wrapper */}
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                style={{
                  marginBottom: '20px',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 6px 15px ${item.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginInline: 'auto',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {item.icon}
              </motion.div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                  position: 'relative',
                  zIndex: 2,
                  color: '#1e293b'
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: '0 auto',
                  position: 'relative',
                  zIndex: 2,
                  marginBottom: '20px',
                  color: '#64748b'
                }}
              >
                {item.desc}
              </p>
              
              {/* Learn more link */}
              <motion.div 
                whileHover={{ x: 5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: item.color,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  position: 'relative',
                  zIndex: 2,
                  cursor: 'pointer'
                }}
              >
                Learn more <FaChevronRight size={10} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Enhanced Game of the Month */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        style={{
          textAlign: 'center',
          padding: '60px 6%',
          background: '#ffffff',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', 
          background: 'rgba(59, 130, 246, 0.1)', padding: '6px 16px', borderRadius: '16px', 
          marginBottom: '12px' }}>
          <FaTrophy color="#3b82f6" size={14} />
          <span style={{ color: '#3b82f6', fontWeight: 600, fontSize: '0.85rem' }}>
            FEATURED GAME
          </span>
        </div>
        
        <h2 style={{ color: '#3b82f6', fontSize: '2.2rem', marginBottom: '8px', fontWeight: 700 }}>
          <span style={{ color: '#0f172a' }}>Game of the Month:</span>{' '}
          <span style={{ color: '#2563eb' }}>Creditor Football</span>
        </h2>
        
        <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Play your way to private power with football-themed quizzes and XP boosts. 
          Score legal knowledge goals and climb the leaderboard!
        </p>        
      </motion.div>

      {/* Enhanced Hero Promo */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        style={{
          position: 'relative',
          background: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.95)), url('/images/home/game/game_banner.webp') center center / cover no-repeat`,
          padding: '80px 5% 120px',
          color: 'white',
          textAlign: 'left',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(rgba(18, 28, 50, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 28, 50, 0.7) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}></div>

        {/* Text Content */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '32px', height: '2px', background: '#60a5fa' }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px', color: '#60a5fa' }}>
              NEW RELEASE
            </span>
          </div>
          
          <h4 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '12px', color: '#93c5fd' }}>
            CREDITOR<br />FOOTBALL
          </h4>
          
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: '1.1', marginBottom: '20px' }}>
            <motion.span 
              animate={{ textShadow: ['0 0 0px #60a5fa', '0 0 8px #60a5fa', '0 0 0px #60a5fa'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ color: '#60a5fa' }}
            >PLAY.</motion.span><br />
            <span style={{ color: '#ffffff' }}>LEARN.</span><br />
            <motion.span 
              animate={{ textShadow: ['0 0 0px #60a5fa', '0 0 8px #60a5fa', '0 0 0px #60a5fa'] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              style={{ color: '#60a5fa' }}
            >POWER UP.</motion.span>
          </h2>
          
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>
            Master private concepts through the excitement of football. Build your private<br/>
            literacy while having fun in this immersive learning experience.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <motion.a 
              href="https://creditorfootball.netlify.app/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#3b82f6',
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
              }}
            >
              <FaPlay size={12} />
              Play Now
            </motion.a>
          </div>

          {/* Feature Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'flex-start',
            }}
          >
            {[
              '2D Interactive Field',
              'Football + Law Quizzes',
              'XP System & Leaderboard',
              'Sound & Effects',
              'Solo or Multiplayer',
              'Monthly Updates',
            ].map((text, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(30, 58, 138, 0.2)',
                  color: '#dbeafe',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default GameBanner;