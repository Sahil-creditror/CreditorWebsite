"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ src, title = "Video", className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      // Hide overlay button 1.5s after play starts
      setTimeout(() => setShowButton(false), 1500);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowButton(true);
    }
  }, []);

  // Show button again when video ends
  const handleEnded = () => {
    setIsPlaying(false);
    setShowButton(true);
  };

  // Show button on hover while playing
  const handleMouseEnter = () => {
    if (isPlaying) setShowButton(true);
  };
  const handleMouseLeave = () => {
    if (isPlaying) setShowButton(false);
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer select-none ${className}`}
      onClick={togglePlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Native video — no controls, we handle everything */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full rounded-2xl object-cover"
        src={src}
        preload="none"
        title={title}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => { setIsPlaying(false); setShowButton(true); }}
      />

      {/* Dark overlay — only visible when paused */}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/35 rounded-2xl"
          />
        )}
      </AnimatePresence>

      {/* Center Play / Pause button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            key={isPlaying ? "pause" : "play"}
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/90 shadow-2xl backdrop-blur-sm ring-4 ring-white/30">
              {isPlaying ? (
                /* Pause icon */
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 sm:w-9 sm:h-9 text-slate-900"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon — offset right slightly for visual centering */
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 sm:w-9 sm:h-9 text-slate-900 translate-x-0.5"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
