"use client";
// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import defaultBotVideo from "./assets/default_bot.mp4";
import welcomeMessageVideo from "./assets/welcome message.mp4";

const AVATAR_PLAYBACK_RATE = 0.7;

function AvatarLipSync({
  audioUrl,
  visemes,
  isMuted = false,
  className,
  onSpeakingChange,
  onLoaded,
  autoPlayWelcomeVideo = false,
  onWelcomeVideoEnd,
}: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const welcomeVideoRef = useRef<HTMLVideoElement | null>(null);
  const defaultVideoRef = useRef<HTMLVideoElement | null>(null);
  const stableAudioUrl = useRef<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasCompletedWelcomeVideo, setHasCompletedWelcomeVideo] =
    useState(false);

  useEffect(() => {
    if (hasLoaded) return;

    setHasLoaded(true);
    onLoaded?.();
  }, [hasLoaded, onLoaded]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.volume = 1;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const handlePlay = () => {
      setIsSpeaking(true);
      onSpeakingChange?.(true);
    };

    const handleStop = () => {
      setIsSpeaking(false);
      onSpeakingChange?.(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handleStop);
    audio.addEventListener("ended", handleStop);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handleStop);
      audio.removeEventListener("ended", handleStop);
    };
  }, [onSpeakingChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const nextAudioUrl = audioUrl || "";
    if (stableAudioUrl.current === nextAudioUrl) {
      audio.muted = isMuted;
      return undefined;
    }

    stableAudioUrl.current = nextAudioUrl;

    if (!nextAudioUrl) {
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
      return undefined;
    }

    audio.src = nextAudioUrl;
    audio.muted = isMuted;
    audio.load();

    const tryPlay = async () => {
      if (isMuted) return;

      try {
        await audio.play();
      } catch {
        const resumeOnGesture = () => {
          audio.play().catch(() => {});
          window.removeEventListener("pointerdown", resumeOnGesture);
          window.removeEventListener("click", resumeOnGesture);
          window.removeEventListener("keydown", resumeOnGesture);
        };

        window.addEventListener("pointerdown", resumeOnGesture, { once: true });
        window.addEventListener("click", resumeOnGesture, { once: true });
        window.addEventListener("keydown", resumeOnGesture, { once: true });
      }
    };

    tryPlay();

    return () => {
      audio.pause();
    };
  }, [audioUrl, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    if (!isMuted && audioUrl && audio.paused) {
      audio.play().catch(() => {});
    }
  }, [audioUrl, isMuted]);

  useEffect(() => {
    if (welcomeVideoRef.current) {
      // Keep welcome clip audio in sync with speaker toggle without restarting playback.
      welcomeVideoRef.current.muted = isMuted;
    }
    if (defaultVideoRef.current) {
      defaultVideoRef.current.muted = isMuted;
      defaultVideoRef.current.playbackRate = AVATAR_PLAYBACK_RATE;
    }
  }, [isMuted]);

  useEffect(() => {
    setHasCompletedWelcomeVideo(false);
  }, [autoPlayWelcomeVideo]);

  useEffect(() => {
    const defaultVideo = defaultVideoRef.current;
    if (!defaultVideo || audioUrl) return undefined;

    defaultVideo.muted = isMuted;
    defaultVideo.play().catch(() => {});

    return () => {
      defaultVideo.pause();
    };
  }, [audioUrl, isMuted]);

  useEffect(() => {
    const welcomeVideo = welcomeVideoRef.current;
    if (
      !welcomeVideo ||
      audioUrl ||
      !autoPlayWelcomeVideo ||
      hasCompletedWelcomeVideo
    ) {
      return undefined;
    }

    welcomeVideo.muted = isMuted;
    welcomeVideo.currentTime = 0;
    welcomeVideo.play().catch(() => {});

    return () => {
      welcomeVideo.pause();
    };
  }, [audioUrl, autoPlayWelcomeVideo, hasCompletedWelcomeVideo]);

  useEffect(() => {
    const welcomeVideo = welcomeVideoRef.current;
    if (!welcomeVideo) return;

    // If welcome should not be visible, guarantee no hidden playback/audio.
    if (!autoPlayWelcomeVideo || hasCompletedWelcomeVideo || !!audioUrl) {
      welcomeVideo.pause();
      welcomeVideo.currentTime = 0;
    }
  }, [autoPlayWelcomeVideo, hasCompletedWelcomeVideo, audioUrl]);

  const handleVideoEnded = () => {
    if (!autoPlayWelcomeVideo || hasCompletedWelcomeVideo) return;

    setHasCompletedWelcomeVideo(true);
    onWelcomeVideoEnd?.();
  };

  void visemes;

  const showWelcomeVideo = autoPlayWelcomeVideo && !hasCompletedWelcomeVideo;

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <div className="relative h-full w-full overflow-hidden bg-black">
        <video
          ref={defaultVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center top" }}
          src={defaultBotVideo}
          playsInline
          autoPlay
          loop
          muted={isMuted}
          preload="auto"
        />
        <video
          ref={welcomeVideoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-75 ${showWelcomeVideo ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{ objectPosition: "center top" }}
          src={welcomeMessageVideo}
          playsInline
          autoPlay
          loop={false}
          muted={isMuted}
          preload="auto"
          onEnded={handleVideoEnded}
        />
      </div>
    </div>
  );
}

export default AvatarLipSync;
