'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

import img1 from "../../../../public/images/pricing/Cover-2.jpg";

type LiveHeroProps = {
  channelUrl: string;
  className?: string;
};

const LiveHero: React.FC<LiveHeroProps> = ({ channelUrl, className }) => {
  return (
    <section
      className={`relative w-full min-h-[75vh] md:min-h-[85vh] overflow-hidden ${className ?? ''}`}
      aria-label="Live YouTube Sessions Hero"
    >
      {/* Background image */}
      <Image
        src={img1}
        alt="Background cover for live YouTube sessions"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-105 transition-transform duration-[3000ms] ease-out"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      {/* *** CENTERED CONTENT: absolute inset-0 ensures true centering *** */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-white/80 backdrop-blur-sm shadow-md">
             Live Community Sessions
          </span>

          <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
            Join Us <span className="text-red-500">Live</span> on YouTube
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white/85 leading-relaxed">
            Every <span className="font-semibold text-red-400">Tuesday</span> and <span className="font-semibold text-red-400">Thursday</span> 
            at <span className="font-semibold text-red-400">6:00 PM EST</span>.  
            Be part of an engaging community experience!
          </p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <Link
              href={channelUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#FF0000] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-red-800/40 transition-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:translate-y-0"
              aria-label="Watch on YouTube"
            >
              <Youtube className="h-6 w-6 transition-transform group-hover:scale-110" aria-hidden="true" />
              Watch on YouTube
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient glows */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl"
      />
    </section>
  );
};

export default LiveHero;
