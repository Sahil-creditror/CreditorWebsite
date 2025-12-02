"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Calendar, Clock, GraduationCap, Lightbulb, ExternalLink, Copy, Mail, Phone, Video, AlertCircle } from "lucide-react";

interface TimeLeft {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventRegistrationSuccess(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ expired: false, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Get registration data from URL params with fallback
  const getParam = (key: string): string => {
    // Try searchParams hook first
    const hookValue = searchParams?.get(key);
    if (hookValue) return hookValue;
    
    // Fallback to window.location if available
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(key) || '';
    }
    
    return '';
  };
  
  const registrantName = getParam('name') || 'Guest';
  const joinUrl = getParam('join_url');
  const sessionDate = getParam('session_date');
  const registrantId = getParam('registrant_id');

  // Calculate time left until session
  const calcTimeLeft = (targetDate: string): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const diff = target - Date.now();
    
    if (diff <= 0) {
      setIsLinkActive(true);
      return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    let s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    s %= 86400;
    const hours = Math.floor(s / 3600);
    s %= 3600;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    
    return { expired: false, days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Mark component as mounted (client-side only)
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only check after component is mounted to ensure we can access window.location
    if (!isMounted) {
      return;
    }

    // Wait a bit for search params to be fully available (especially on direct navigation)
    const checkParams = setTimeout(() => {
      // Get fresh values after delay (in case they weren't available initially)
      let currentJoinUrl = searchParams?.get('join_url') || '';
      let currentSessionDate = searchParams?.get('session_date') || '';
      
      // Fallback to window.location if hook values are empty
      if (typeof window !== 'undefined' && (!currentJoinUrl || !currentSessionDate)) {
        const urlParams = new URLSearchParams(window.location.search);
        currentJoinUrl = currentJoinUrl || urlParams.get('join_url') || '';
        currentSessionDate = currentSessionDate || urlParams.get('session_date') || '';
      }
      
      // Only redirect if params are still missing after waiting
      if (!currentJoinUrl || !currentSessionDate) {
      router.push('/');
        return;
      }
    }, 300); // Small delay to allow search params to load

    return () => {
      clearTimeout(checkParams);
    };
  }, [isMounted, router, searchParams]);

  useEffect(() => {
    // Only start countdown if we have valid data and component is mounted
    if (!isMounted) {
      return;
    }

    // Get current values (may have changed after mount)
    let currentJoinUrl = searchParams?.get('join_url') || '';
    let currentSessionDate = searchParams?.get('session_date') || '';
    
    // Fallback to window.location if hook values are empty
    if (typeof window !== 'undefined' && (!currentJoinUrl || !currentSessionDate)) {
      const urlParams = new URLSearchParams(window.location.search);
      currentJoinUrl = currentJoinUrl || urlParams.get('join_url') || '';
      currentSessionDate = currentSessionDate || urlParams.get('session_date') || '';
    }

    if (!currentJoinUrl || !currentSessionDate) {
      return;
    }

    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(currentSessionDate));
    }, 1000);

    // Initial calculation
    setTimeLeft(calcTimeLeft(currentSessionDate));

    return () => clearInterval(timer);
  }, [isMounted, searchParams]);

  useEffect(() => {
    // Add entrance animation
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  }, []);

  const pad = (n: number) => {
    const value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    return ('0' + value).slice(-2);
  };

  const handleJoinSession = () => {
    if (isLinkActive && joinUrl) {
      window.open(joinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    if (joinUrl) {
      navigator.clipboard.writeText(joinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatSessionDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-300 to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(1200px_600px_at_20%_-10%,rgba(59,130,246,0.10),transparent),radial-gradient(900px_500px_at_80%_110%,rgba(16,185,129,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px)] dark:[background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40 [background-image:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.4),transparent_35%)] dark:opacity-20" />

      {/* Content Section */}
      <section className="container relative mx-auto px-4 pt-12 md:pt-20 pb-20 md:pb-32 z-10">
        
        {/* Success Header */}
        <div className="text-center mb-12 animate-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-smokewhite dark:text-white mb-3 tracking-tight">
            Registration Successful!
          </h1>
          <p className="text-lg md:text-xl text-white dark:text-primary/90 font-semibold mb-2">
            Welcome, <span className="text-primary">{registrantName}</span>! You're all set for the session.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/80 dark:text-white/70">
            <Mail className="w-4 h-4" />
            <span>We've sent a confirmation email with your unique session link and calendar invite.</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side - Info Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg animate-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-primary/8 to-transparent" />
              <div className="px-6 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white leading-tight mb-4 flex items-center gap-3">
                  <Video className="w-8 h-8 text-primary" />
                  What to Expect
                </h2>
                <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-lg">
                  <Image
                    src="/images/squeeze/squeeze.webp"
                    alt="What to Expect"
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg animate-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-primary/8 to-transparent" />
              <div className="px-6 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white leading-tight mb-6">
                  Session Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Calendar,
                      label: "Date & Time",
                      value: sessionDate ? formatSessionDate(sessionDate) : 'Loading...',
                      gradient: "from-blue-500/10 to-blue-600/5",
                      iconBg: "bg-blue-500/10",
                      iconColor: "text-blue-600 dark:text-blue-400"
                    },
                    {
                      icon: GraduationCap,
                      label: "Topic",
                      value: "Free Non-Member Orientation",
                      gradient: "from-purple-500/10 to-purple-600/5",
                      iconBg: "bg-purple-500/10",
                      iconColor: "text-purple-600 dark:text-purple-400"
                    },
                    {
                      icon: Clock,
                      label: "Duration",
                      value: "Approximately 60-90 minutes",
                      gradient: "from-green-500/10 to-green-600/5",
                      iconBg: "bg-green-500/10",
                      iconColor: "text-green-600 dark:text-green-400"
                    },
                    {
                      icon: Lightbulb,
                      label: "What You'll Learn",
                      value: "Private education, trust setup, credit mastery, and financial freedom",
                      gradient: "from-amber-500/10 to-amber-600/5",
                      iconBg: "bg-amber-500/10",
                      iconColor: "text-amber-600 dark:text-amber-400"
                    }
                  ].map((detail, idx) => {
                    const Icon = detail.icon;
                    return (
                      <div
                        key={idx}
                        className={`group flex items-start gap-3 bg-gradient-to-br ${detail.gradient} dark:from-slate-800/80 dark:to-slate-800/60 rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
                      >
                        <div className={`flex-none w-10 h-10 rounded-lg ${detail.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className={`w-5 h-5 ${detail.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-secondary/60 dark:text-white/60 mb-1 uppercase tracking-wide">
                            {detail.label}
                          </div>
                          <div className="text-base font-bold text-secondary dark:text-white leading-snug">
                            {detail.value}
                          </div>
              </div>
            </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg animate-in opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-primary/8 to-transparent" />
              <div className="px-6 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h3 className="text-2xl md:text-3xl font-extrabold text-secondary dark:text-white mb-6">
                  Important Tips
                </h3>
                <div className="space-y-3">
                  {[
                    "Check your email for the confirmation and calendar invite",
                    "Join 5 minutes early to test your audio and video",
                    "Have a stable internet connection for the best experience",
                    "Prepare questions you'd like to ask during the Q&A",
                    "Keep this page open or save your session link"
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-secondary/60 border-l-4 border-primary">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-none mt-0.5" />
                      <p className="text-sm text-secondary/80 dark:text-white/80 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Countdown & Join */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Countdown Timer */}
            <div className="sticky top-20 animate-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="rounded-3xl bg-white/80 p-6 md:p-8 shadow-2xl ring-1 ring-black/5 dark:bg-secondary dark:ring-white/8 backdrop-blur-sm">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-secondary dark:text-white mb-2">
                    {isLinkActive ? (
                      <span className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        Session is Live!
                      </span>
                    ) : (
                      "Session Starts In"
                    )}
                  </h3>
        </div>
          
          {!timeLeft.expired ? (
                  <div className="flex justify-center items-center gap-3 mb-6">
                    {[
                      { value: timeLeft.days, label: 'Days' },
                      { value: pad(timeLeft.hours), label: 'Hours' },
                      { value: pad(timeLeft.minutes), label: 'Minutes' },
                      { value: pad(timeLeft.seconds), label: 'Seconds' }
                    ].map((item, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          <div className="text-4xl md:text-5xl font-extrabold text-primary mb-1">
                            {item.value}
              </div>
                          <div className="text-xs font-semibold text-secondary/60 dark:text-white/60 uppercase tracking-wide">
                            {item.label}
              </div>
              </div>
                        {idx < 3 && (
                          <div className="text-3xl font-bold text-secondary/30 dark:text-white/30 pb-8">
                            :
              </div>
                        )}
                      </React.Fragment>
                    ))}
            </div>
          ) : (
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-extrabold text-lg shadow-lg animate-pulse">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
              SESSION IS LIVE NOW!
                    </div>
            </div>
          )}

                {/* Join Button */}
          <button
            onClick={handleJoinSession}
            disabled={!isLinkActive}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-extrabold text-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 group ${
                    isLinkActive
                      ? 'bg-primary hover:bg-primary/90 text-white hover:shadow-xl'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
          >
            {isLinkActive ? (
              <>
                      <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                Join Session Now
              </>
            ) : (
              <>
                      <Clock className="w-5 h-5" />
                Link Activates When Session Starts
              </>
            )}
          </button>

                {/* Session Link */}
          {joinUrl && (
                  <div className="mt-6 p-4 rounded-xl bg-white/60 dark:bg-secondary/60 border-2 border-gray-200 dark:border-white/10">
                    <div className="text-xs font-semibold text-secondary/70 dark:text-white/70 mb-2">
                      Your Personal Session Link:
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-secondary/80 border border-gray-200 dark:border-white/10">
                      <code className="flex-1 text-xs text-primary dark:text-primary font-mono break-all">
                        {joinUrl}
                      </code>
                <button
                        onClick={handleCopyLink}
                        className="flex-none p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 hover:scale-110"
                  title="Copy link"
                >
                        {copied ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>

            {/* Support Box */}
            <div className="rounded-2xl bg-white/60 dark:bg-secondary/60 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm animate-in opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="flex items-center gap-3 text-sm text-secondary/80 dark:text-white/80">
                <Phone className="w-5 h-5 text-primary flex-none" />
                <div>
            Need help? Contact us at{' '}
                  <a href="tel:425-400-9246" className="font-bold text-primary hover:underline">
                    425-400-9246
                  </a>
                </div>
              </div>
            </div>
        </div>

      </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
          opacity: 0;
          transform: translateY(30px);
        }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

