"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_WEBINAR_ID } from "@/config/api";
import { registerZoomWebinar, ZoomWebinarRegistrationPayload } from "@/services/zoom";

/**
 * Fixed daily webinar times in PST (24h format).
 * These are used for the countdown logic and upcoming-session dropdown.
 */
const WEBINAR_SESSION_HOURS_PST = [10, 14, 19]; // 10:00, 14:00 (2 PM), 19:00 (7 PM)

/**
 * Hard stop for this webinar series (final occurrence).
 * Used so that "upcoming" logic never goes past the last scheduled date.
 *
 * NOTE: Feb 1, 2026 11:59 PM PST (adjust if the series end date changes).
 */
const WEBINAR_SERIES_END = new Date("2026-02-01T23:59:59-08:00");

/**
 * Countdown hook: next scheduled webinar (10am, 2pm, 7pm PST) from current time.
 * If we've passed 7pm, it rolls over to tomorrow's 10am.
 */
function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();

    // Build today's sessions at fixed hours
    const todaySessions = WEBINAR_SESSION_HOURS_PST.map((hour) => {
      const d = new Date(now);
      d.setHours(hour, 0, 0, 0);
      return d;
    });

    // Find the first session later than "now"
    const upcomingToday = todaySessions.find((session) => session.getTime() > now.getTime());
    if (upcomingToday) {
      return upcomingToday;
    }

    // Otherwise, go to tomorrow's first session (10am)
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(WEBINAR_SESSION_HOURS_PST[0], 0, 0, 0);
    return tomorrow;
  };

  const [targetTime, setTargetTime] = useState<Date>(getNextSessionTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
        // Move to the next session and recompute
        const newTarget = getNextSessionTarget();
        setTargetTime(newTarget);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return timeLeft;
}

type FormState = Omit<ZoomWebinarRegistrationPayload, "webinarId">;

const initialFormState: FormState = {
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
};

type WebinarSession = {
  key: string;
  id: string;
  label: string;
  time: string;
  description: string;
};

/**
 * Base templates for the three daily webinar slots.
 * We derive the actual upcoming occurrences (date + time) from these.
 */
type WebinarTemplate = {
  baseKey: string;
  id: string;
  label: string;
  hour: number;
  minute: number;
  description: string;
};

const webinarTemplates: WebinarTemplate[] = [
  {
    baseKey: "morning",
    id: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING || DEFAULT_WEBINAR_ID,
    label: "Morning Intensive",
    hour: 10,
    minute: 0,
    description: "Perfect if you want to take action before lunch.",
  },
  {
    baseKey: "afternoon",
    id: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON || DEFAULT_WEBINAR_ID,
    label: "Afternoon Deep-Dive",
    hour: 14,
    minute: 0,
    description: "Great for regrouping mid-day and asking questions live.",
  },
  {
    baseKey: "evening",
    id:
      process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING ||
      process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON ||
      DEFAULT_WEBINAR_ID,
    label: "Evening Session",
    hour: 19,
    minute: 0,
    description: "Catch the training after work with zero rush.",
  },
];

/**
 * Build the next N upcoming webinar slots (date + time) in PST,
 * constrained so that they never extend past the final series date.
 */
const buildUpcomingSessions = (count: number): WebinarSession[] => {
  const now = new Date();
  const sessions: WebinarSession[] = [];

  // Iterate day-by-day until we gather the requested number of upcoming slots
  let cursor = new Date(now);

  while (sessions.length < count) {
    for (const template of webinarTemplates) {
      const occurrence = new Date(cursor);
      occurrence.setHours(template.hour, template.minute, 0, 0);

      // Only include future occurrences
      if (occurrence.getTime() <= now.getTime()) continue;

      // Stop if we’re past the series end date
      if (occurrence.getTime() > WEBINAR_SERIES_END.getTime()) {
        return sessions;
      }

      const dateLabel = occurrence.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "America/Los_Angeles",
      });

      const timeLabel = occurrence.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
        timeZone: "America/Los_Angeles",
      });

      sessions.push({
        key: `${template.baseKey}-${occurrence.toISOString()}`,
        id: template.id,
        label: `${template.label} — ${dateLabel}`,
        time: timeLabel,
        description: template.description,
      });

      if (sessions.length === count) {
        return sessions;
      }
    }

    // Move to the next day and continue
    cursor.setDate(cursor.getDate() + 1);
  }

  return sessions;
};

export default function WebclassSection() {
  const router = useRouter();
  const { hours, minutes, seconds } = useCountdown();
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const format = (value: number) => value.toString().padStart(2, "0");

  // Modal and form state
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>({ ...initialFormState });
  const [sessions, setSessions] = useState<WebinarSession[]>(() => buildUpcomingSessions(3));
  const [selectedSessionKey, setSelectedSessionKey] = useState<string>(sessions[0]?.key || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    email: false,
    first_name: false,
    last_name: false,
    session: false,
  });
  const selectedSession =
    sessions.find((session) => session.key === selectedSessionKey) ?? sessions[0];
  const sessionTimesSummary = sessions.map((session) => `${session.label} @ ${session.time}`).join(" • ");
  const sessionTimezoneLabel = "PST";

  const resetFormState = () => {
    setFormData({ ...initialFormState });
    setTouched({ email: false, first_name: false, last_name: false, session: false });
    const refreshedSessions = buildUpcomingSessions(3);
    setSessions(refreshedSessions);
    setSelectedSessionKey(refreshedSessions[0]?.key || "");
    setError(null);
  };

  const handleWidgetOpen = () => {
    resetFormState();
    setWidgetOpen(true);
  };

  const handleWidgetClose = () => {
    setWidgetOpen(false);
    resetFormState();
  };

  useEffect(() => {
    if (!widgetOpen) return;
    const onKey = (e: KeyboardEvent) => { if ((e as KeyboardEvent).key === 'Escape') handleWidgetClose(); };
    document.addEventListener('keydown', onKey as EventListener);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalCloseRef.current?.focus(), 120);
    return () => {
      document.removeEventListener('keydown', onKey as EventListener);
      document.body.style.overflow = prev;
    };
  }, [widgetOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      first_name: true,
      last_name: true,
      session: true,
    });

    // Validate
    if (!formData.first_name.trim()) {
      setError('First name is required');
      return;
    }
    if (!formData.last_name.trim()) {
      setError('Last name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!selectedSessionKey) {
      setError('Please choose the webinar session you want to attend');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call backend API to register user
      const sessionId = selectedSession?.id || DEFAULT_WEBINAR_ID;

      const result = await registerZoomWebinar({
        ...formData,
        webinarId: sessionId,
      });

      if (result.success && result.data) {
        // Registration successful - redirect to success page
        const params = new URLSearchParams({
          name: `${formData.first_name} ${formData.last_name}`,
          join_url: result.data.join_url,
          session_date: result.data.start_time || new Date().toISOString(),
          registrant_id: result.data.registrant_id,
          session_label: selectedSession?.label || 'Selected Session',
        });

        router.push(`/event-registration?${params.toString()}`);
      } else {
        // Handle error
        setError(result.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  // placeholder SVG data URL
  const placeholderSrc =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>
         <defs>
           <linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#111827' /><stop offset='1' stop-color='#374151' /></linearGradient>
         </defs>
         <rect width='100%' height='100%' fill='url(#g)'/>
         <g fill='#f3f4f6' font-family='Arial, Helvetica, sans-serif'>
           <text x='50%' y='45%' font-size='36' text-anchor='middle' font-weight='700'>Speaker</text>
           <text x='50%' y='52%' font-size='18' text-anchor='middle'>Placeholder Image</text>
         </g>
       </svg>`
    );

  return (
    <>
      {/* Webclass hero section - matching exact design from image */}
      <section className="relative overflow-hidden py-10 md:py-20 text-white dark:text-white">
        {/* Base gradient background using website blue shades */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #001428 0%, #002b5c 30%, #026fe2 60%, #45beff 85%, #bfdbfe 100%)",
          }}
        />
        
        {/* Split design with diagonal lines on right side - light mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden dark:hidden">
          {/* Left side - gradient dark blue */}
          <div 
            className="absolute inset-0 left-0 right-[40%]"
            style={{
              background: "linear-gradient(to bottom right, #001428 0%, #002b5c 50%, #026fe2 100%)",
            }}
          />
          
          {/* Right side - lighter blue gradient with diagonal streaks */}
          <div 
            className="absolute inset-0 left-[40%] right-0"
            style={{
              background: "linear-gradient(to bottom right, #026fe2 0%, #45beff 40%, #93c5fd 70%, #bfdbfe 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='diagonal-lines' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cg opacity='0.12'%3E%3Cpath d='M 0 0 L 120 120' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 30 L 120 150' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 60 L 120 180' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M 0 90 L 120 210' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 0 L 90 120' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 30 L 90 150' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 60 L 90 180' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3Cpath d='M -30 90 L 90 210' fill='none' stroke='%23ffffff' stroke-width='1.5'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23diagonal-lines)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Split design for dark mode */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
          {/* Left side - dark gradient */}
          <div 
            className="absolute inset-0 left-0 right-[40%]"
            style={{
              background: "linear-gradient(to bottom right, #000000 0%, #001428 50%, #002b5c 100%)",
            }}
          />
          
          {/* Right side - darker gradient with subtle diagonal lines */}
          <div 
            className="absolute inset-0 left-[40%] right-0"
            style={{
              background: "linear-gradient(to bottom right, #001428 0%, #002b5c 40%, #026fe2 70%, #0a0a0a 100%)",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='diagonal-lines-dark' width='120' height='120' patternUnits='userSpaceOnUse'%3E%3Cg opacity='0.08'%3E%3Cpath d='M 0 0 L 120 120' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 30 L 120 150' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 60 L 120 180' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M 0 90 L 120 210' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 0 L 90 120' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 30 L 90 150' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 60 L 90 180' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3Cpath d='M -30 90 L 90 210' fill='none' stroke='%2345beff' stroke-width='1.5'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23diagonal-lines-dark)'/%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Top header with logo and tagline */}
        <div className="container mx-auto px-6 py-6 relative z-10">
          <div className="text-center mb-8">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/images/logo/creditorlogowhite.webp"
                alt="Creditor Academy Logo"
                width={250}
                height={60}
                className="dark:hidden"
                priority
              />
              <Image
                src="/images/logo/creditorlogowhite.webp"
                alt="Creditor Academy Logo"
                width={250}
                height={60}
                className="hidden dark:block"
                priority
              />
            </div>
            {/* Tagline */}
            <p className="text-base md:text-lg text-white dark:text-gray-300">
              This Free Webclass Is For Entrepreneurs, Small Business Owners, &amp; Those Just Getting Started...
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            {/* Left image with background */}
            <div className="lg:w-5/12 flex justify-center lg:justify-start lg:pl-20">
              <div className="relative rounded-lg overflow-hidden w-full max-w-[420px]">
                <div className="relative rounded-lg w-full h-[600px] bg-gray-100 dark:bg-[#0a0e14]">
                  <Image
                    src={"/images/squeeze/webex.jpeg"}
                    alt="Speaker"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    className="opacity-"
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Small uppercase text */}
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-3 text-white dark:text-gray-400 font-medium">
                Secrets To Easily Starting Your Own
              </p>

              {/* Main headline - very large, bold */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-4 text-white dark:text-white">
                Non Member
                <br />
                <span className="block">Orientation</span>
              </h1>

              {/* Subtext */}
              <p className="text-base md:text-lg mb-4 text-white dark:text-gray-300">
                ZERO legal experience required.
              </p>

              {/* Highlight text - bold */}
              <p className="text-base md:text-lg font-bold mb-6 text-white dark:text-white">
                100% FREE - Next Class Is Starting TODAY!
                {/* 100% FREE — {sessions.length || webinarTemplates.length} upcoming sessions ({sessionTimesSummary || 'Live all day'}) {sessionTimezoneLabel} so you can start now. */}
              </p>

              {/* Session options */}
              {/* {webinarSessions.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/80 dark:text-gray-300 mb-3">
                    Pick Your Preferred Live Time
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {webinarSessions.map((session) => (
                      <div
                        key={`${session.id}-${session.time}`}
                        className={`rounded-xl border border-white/30 bg-white/10 px-4 py-3 backdrop-blur-sm text-left transition ${
                          selectedSessionKey === session.key ? 'bg-[#FFC107] text-gray-900 border-transparent' : 'text-white'
                        }`}
                      >
                        <p className="text-sm font-semibold">{session.label}</p>
                        <p className="text-xs opacity-80">{session.time}</p>
                        <p className="text-[11px] opacity-70 mt-1 max-w-[220px]">{session.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* CTA Button */}
              <div className="mb-8">
                <button
                  onClick={handleWidgetOpen}
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg transition-colors bg-[#FFC107] hover:bg-[#FFD700] text-gray-900"
                  style={{ boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)" }}
                >
                  Register For The Webclass Now!
                </button>
                <p className="mt-2 text-xs md:text-sm text-white dark:text-gray-400">
                  Save My Seat For The Credit Repair Business Webclass
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-6">
                <p className="text-base md:text-lg font-semibold mb-4 text-white dark:text-white">
                  Next Webclass Begins In:
                </p>

                <div className="flex items-center gap-4 md:gap-6">
                  {[
                    { label: "HOUR", value: format(hours) },
                    { label: "MINUTES", value: format(minutes) },
                    { label: "SECONDS", value: format(seconds) },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div
                        className="rounded-full flex flex-col items-center justify-center bg-white border-[3px] border-gray-300 dark:border-gray-600"
                        style={{
                          width: 120,
                          height: 120,
                        }}
                      >
                        <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-gray-900 mb-1">
                          {item.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-700 uppercase tracking-wide">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {widgetOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Registration form"
          onClick={(e) => { if (e.target === e.currentTarget) handleWidgetClose(); }}
        >
          <div className="modal" role="document">
            <button
              className="modal-close"
              aria-label="Close form"
              onClick={handleWidgetClose}
              ref={modalCloseRef}
              disabled={isSubmitting}
            >
              ×
            </button>

            <div className="modal-form-wrapper">
              <div className="modal-header">
              <div className="modal-icon flex items-center justify-center">
                <img 
                  src={"/images/logo/logo_roadmap.webp"} 
                  alt="Logo" 
                  className="w-20 h-15 object-contain" 
                />
              </div>
                <div className="modal-title-group">
                  <h2 className="modal-title">Register for FREE Webinar</h2>
                  <p className="modal-subtitle">Fill out the form below to register for our free webinar</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                  <label htmlFor="webinar_session" className="form-label">
                    Choose Your Session <span className="required">*</span>
                  </label>
                  <div className="form-select-wrapper">
                    <select
                      id="webinar_session"
                      className={`form-input form-select-input ${touched.session && !selectedSessionKey ? 'form-input-error' : ''}`}
                      value={selectedSessionKey}
                      onChange={(e) => {
                        setSelectedSessionKey(e.target.value);
                        setError(null);
                      }}
                      onBlur={() => handleBlur('session')}
                      disabled={isSubmitting || sessions.length === 0}
                    >
                      {sessions.map((session: WebinarSession) => (
                        <option key={session.key} value={session.key}>
                          {session.label} — {session.time}
                        </option>
                      ))}
                    </select>
                    <span className="form-select-icon" aria-hidden="true">⌄</span>
                  </div>
                  {selectedSession && (
                    <p className="form-select-detail">
                      You’re reserving the <strong>{selectedSession.label}</strong> starting at {selectedSession.time} {sessionTimezoneLabel}.
                    </p>
                  )}
                  {touched.session && !selectedSessionKey && (
                    <p className="form-error">Please select the time you plan to attend</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Times listed in Pacific Time (PST). Choose whichever works best for you.
                  </p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="first_name" className="form-label">
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className={`form-input ${touched.first_name && !formData.first_name.trim() ? 'form-input-error' : ''}`}
                      value={formData.first_name}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                      onBlur={() => handleBlur('first_name')}
                      disabled={isSubmitting}
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                    />
                    {touched.first_name && !formData.first_name.trim() && (
                      <p className="form-error">First name is required</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name" className="form-label">
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className={`form-input ${touched.last_name && !formData.last_name.trim() ? 'form-input-error' : ''}`}
                      value={formData.last_name}
                      onChange={(e) => handleChange('last_name', e.target.value)}
                      onBlur={() => handleBlur('last_name')}
                      disabled={isSubmitting}
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                    />
                    {touched.last_name && !formData.last_name.trim() && (
                      <p className="form-error">Last name is required</p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${touched.email && (!formData.email.trim() || !validateEmail(formData.email)) ? 'form-input-error' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                  {touched.email && !formData.email.trim() && (
                    <p className="form-error">Email is required</p>
                  )}
                  {touched.email && formData.email.trim() && !validateEmail(formData.email) && (
                    <p className="form-error">Please enter a valid email</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number <span className="optional">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    className="form-input"
                    value={formData.phone_number || ''}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                </div>

                {error && (
                  <div className="form-error-message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle className="opacity-25" cx="12" cy="12" r="10"></circle>
                        <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>

                <div className="form-footer">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal {
          background: white;
          border-radius: 16px;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dark .modal {
          background: #1a1a1a;
          color: #e5e5e5;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.05);
          color: #666;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          z-index: 10;
        }
        .dark .modal-close {
          background: rgba(255, 255, 255, 0.1);
          color: #ccc;
        }
        .modal-close:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.1);
          transform: scale(1.1);
        }
        .dark .modal-close:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
        }
        .modal-close:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .modal-form-wrapper {
          padding: 32px 24px 24px;
        }
        .modal-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
        }
        .modal-icon {
          font-size: 40px;
          line-height: 1;
        }
        .modal-title-group {
          flex: 1;
        }
        .modal-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: #111;
        }
        .dark .modal-title {
          color: #fff;
        }
        .modal-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0;
        }
        .dark .modal-subtitle {
          color: #999;
        }
        .registration-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .form-row .form-group {
          flex: 1;
          min-width: 220px;
        }
        @media (max-width: 640px) {
          .form-row {
            flex-direction: column;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        .dark .form-label {
          color: #e5e5e5;
        }
        .required {
          color: #dc2626;
        }
        .optional {
          font-size: 12px;
          font-weight: 400;
          color: #999;
        }
        .form-input {
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          background: white;
          color: #111;
        }
        .form-select-wrapper {
          position: relative;
        }
        .form-select-input {
          appearance: none;
          width: 100%;
          padding-right: 44px;
          cursor: pointer;
          background: white;
        }
        .dark .form-select-input {
          background: #2a2a2a;
        }
        .form-select-input:disabled {
          cursor: not-allowed;
        }
        .form-select-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          color: #555;
          pointer-events: none;
        }
        .dark .form-select-icon {
          color: #ccc;
        }
        .form-select-detail {
          font-size: 12px;
          color: #4b5563;
          margin: 6px 2px 0;
        }
        .dark .form-select-detail {
          color: #d1d5db;
        }
        .dark .form-input {
          background: #2a2a2a;
          border-color: #444;
          color: #e5e5e5;
        }
        .form-input:focus {
          outline: none;
          border-color: #026fe2;
          box-shadow: 0 0 0 3px rgba(2, 111, 226, 0.1);
        }
        .dark .form-input:focus {
          border-color: #45beff;
          box-shadow: 0 0 0 3px rgba(69, 190, 255, 0.1);
        }
        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .form-input-error {
          border-color: #dc2626;
        }
        .form-input-error:focus {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        .form-error {
          font-size: 12px;
          color: #dc2626;
          margin: 0;
        }
        .form-error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          color: #991b1b;
          font-size: 14px;
        }
        .dark .form-error-message {
          background: rgba(220, 38, 38, 0.2);
          border-color: rgba(220, 38, 38, 0.3);
          color: #fca5a5;
        }
        .form-submit {
          width: 100%;
          padding: 14px 24px;
          background: #026fe2;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          margin-top: 8px;
        }
        .form-submit:hover:not(:disabled) {
          background: #45beff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(2, 111, 226, 0.3);
        }
        .form-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .form-footer {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 8px;
          font-size: 12px;
          color: #666;
        }
        .dark .form-footer {
          color: #999;
        }
        .form-footer svg {
          flex-shrink: 0;
          color: #026fe2;
        }
        .dark .form-footer svg {
          color: #45beff;
        }
      `}</style>
    </>
  );
}
