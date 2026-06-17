"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_WEBINAR_ID } from "@/config/api";
import {
  registerZoomWebinar,
  ZoomWebinarRegistrationPayload,
  fetchOccurrences,
  OccurrenceItem,
} from "@/services/zoom";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";

/**
 * Fixed daily webinar times in PST (24h format).
 */
const WEBINAR_SESSION_HOURS_PST: number[] = [];
const WEBINAR_SESSION_MINUTES_PST: number[] = [];

for (let hour = 0; hour < 24; hour++) {
  WEBINAR_SESSION_HOURS_PST.push(hour);
  WEBINAR_SESSION_MINUTES_PST.push(0);
}

const WEBINAR_SERIES_END = new Date("2026-12-31T23:59:59-08:00");

function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();
    const allSessions: Date[] = [];

    for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
      const d = new Date(now);
      d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
      if (d.getTime() > now.getTime()) {
        allSessions.push(d);
      }
    }

    if (allSessions.length === 0) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
        const d = new Date(tomorrow);
        d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
        allSessions.push(d);
      }
    }

    allSessions.sort((a, b) => a.getTime() - b.getTime());
    return allSessions[0] || new Date(now.getTime() + 60 * 60 * 1000);
  };

  const [targetTime, setTargetTime] = useState<Date>(getNextSessionTarget);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
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
  baseKey: string;
  id: string;
  label: string;
  time: string;
  description: string;
  occurrenceDate: Date;
};

const WEBINAR_ID_MAP: Record<string, string> = {
  "9:0": process.env.NEXT_PUBLIC_WEBINAR_ID_9_00 || "82601545984",
  "10:0": process.env.NEXT_PUBLIC_WEBINAR_ID_10_00 || "84265437174",
  "11:0": process.env.NEXT_PUBLIC_WEBINAR_ID_11_00 || "85185172043",
  "12:0": process.env.NEXT_PUBLIC_WEBINAR_ID_12_00 || "87614755296",
  "13:0": process.env.NEXT_PUBLIC_WEBINAR_ID_13_00 || "85373105170",
  "14:0": process.env.NEXT_PUBLIC_WEBINAR_ID_14_00 || "89734509269",
  "15:0": process.env.NEXT_PUBLIC_WEBINAR_ID_15_00 || "89674704873",
  "16:0": process.env.NEXT_PUBLIC_WEBINAR_ID_16_00 || "89483212244",
  "17:0": process.env.NEXT_PUBLIC_WEBINAR_ID_17_00 || "86711751718",
  "18:0": process.env.NEXT_PUBLIC_WEBINAR_ID_18_00 || "89351857514",
  "19:0": process.env.NEXT_PUBLIC_WEBINAR_ID_19_00 || "86776822313",
  "20:0": process.env.NEXT_PUBLIC_WEBINAR_ID_20_00 || "87147064450",
  "21:0": process.env.NEXT_PUBLIC_WEBINAR_ID_21_00 || "85713847774",
  "22:0": process.env.NEXT_PUBLIC_WEBINAR_ID_22_00 || "88035229421",
  "23:0": process.env.NEXT_PUBLIC_WEBINAR_ID_23_00 || "85625843176",
  "0:0": process.env.NEXT_PUBLIC_WEBINAR_ID_0_00 || "85673138781",
  "1:0": process.env.NEXT_PUBLIC_WEBINAR_ID_1_00 || "85159712004",
  "2:0": process.env.NEXT_PUBLIC_WEBINAR_ID_2_00 || "89163851137",
  "3:0": process.env.NEXT_PUBLIC_WEBINAR_ID_3_00 || "81659019401",
};

type WebinarTemplate = {
  baseKey: string;
  id: string;
  label: string;
  hour: number;
  minute: number;
  description: string;
};

const webinarTemplates: WebinarTemplate[] = WEBINAR_SESSION_HOURS_PST.map((hour, index) => {
  const minute = WEBINAR_SESSION_MINUTES_PST[index];
  const timeKey = `${hour}:${minute}`;
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? "AM" : "PM";
  const minuteStr = minute.toString().padStart(2, "0");

  let label: string;
  if (hour === 9 && minute === 0) {
    label = "Orientation Webinar 9 AM";
  } else if (hour === 14 && minute === 0) {
    label = "Orientation Webinar 2 PM";
  } else if (hour === 19 && minute === 0) {
    label = "Orientation Webinar 7 PM";
  } else if (hour === 0 && minute === 0) {
    label = "Orientation Webinar 12 AM";
  } else {
    if (minute === 0) {
      label = `Orientation at ${hour12} ${ampm}`;
    } else {
      label = `Orientation at ${hour12}:${minuteStr} ${ampm}`;
    }
  }

  return {
    baseKey: `time_${hour}_${minute}`,
    id: WEBINAR_ID_MAP[timeKey] || DEFAULT_WEBINAR_ID,
    label,
    hour,
    minute,
    description: `Join us at ${hour12}:${minuteStr} ${ampm} for this orientation session.`,
  };
});

const buildUpcomingSessions = (count: number): WebinarSession[] => {
  const now = new Date();
  const allSessions: WebinarSession[] = [];

  const cursor = new Date(now);
  const maxDays = 7;

  for (let day = 0; day < maxDays; day++) {
    for (const template of webinarTemplates) {
      const occurrence = new Date(cursor);
      occurrence.setHours(template.hour, template.minute, 0, 0);

      if (occurrence.getTime() <= now.getTime()) continue;
      if (occurrence.getTime() > WEBINAR_SERIES_END.getTime()) break;

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

      allSessions.push({
        key: `${template.baseKey}-${occurrence.toISOString()}`,
        baseKey: template.baseKey,
        id: template.id,
        label: `${template.label} — ${dateLabel}`,
        time: timeLabel,
        description: template.description,
        occurrenceDate: occurrence,
      });
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  allSessions.sort((a, b) => a.occurrenceDate.getTime() - b.occurrenceDate.getTime());
  return allSessions.slice(0, count);
};

export default function WebclassSection() {
  const router = useRouter();
  const { hours, minutes, seconds } = useCountdown();
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const format = (value: number) => value.toString().padStart(2, "0");

  const [widgetOpen, setWidgetOpen] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormState>({ ...initialFormState });
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  const [sessions, setSessions] = useState<WebinarSession[]>(() => buildUpcomingSessions(20));
  const [selectedSessionKey, setSelectedSessionKey] = useState<string>("");
  const [watchRecording, setWatchRecording] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    email: false,
    first_name: false,
    last_name: false,
    session: false,
    phone_number: false,
  });

  const selectedSession =
    sessions.find((session) => session.key === selectedSessionKey) ?? sessions[0];
  const sessionTimezoneLabel = "PST";

  const resetFormState = useCallback(() => {
    setFormData({ ...initialFormState });
    setPhoneNumber(undefined);
    setWatchRecording(false);
    setFormStep(1);
    setTouched({ email: false, first_name: false, last_name: false, session: false, phone_number: false });
    const refreshedSessions = buildUpcomingSessions(20);
    setSessions(refreshedSessions);
    setSelectedSessionKey(refreshedSessions[0]?.key || "");
    setError(null);
  }, []);

  const handleNextStep = () => {
    if (!watchRecording && !selectedSessionKey) {
      setTouched({ ...touched, session: true });
      setError('Please choose either a live session or select to watch the previous recording');
      return;
    }
    setError(null);
    setFormStep(2);
  };

  const handleBackStep = () => {
    setFormStep(1);
    setError(null);
  };

  const handleWidgetOpen = useCallback(() => {
    resetFormState();
    setWidgetOpen(true);
  }, [resetFormState]);

  const handleWidgetClose = useCallback(() => {
    setWidgetOpen(false);
    resetFormState();
  }, [resetFormState]);

  useEffect(() => {
    if (!widgetOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleWidgetClose(); };
    document.addEventListener('keydown', onKey as EventListener);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalCloseRef.current?.focus(), 120);
    return () => {
      document.removeEventListener('keydown', onKey as EventListener);
      document.body.style.overflow = prev;
    };
  }, [widgetOpen, handleWidgetClose]);

  useEffect(() => {
    if (!widgetOpen) return;

    const storeOccurrence = (baseKey: string, webinarId: string, occ?: OccurrenceItem) => {
      if (typeof window === "undefined" || !occ) return;
      localStorage.setItem(`occurrence_${baseKey}_id`, occ.occurrence_id);
      localStorage.setItem(`occurrence_${baseKey}_start`, occ.start_time);
      localStorage.setItem(`occurrence_${baseKey}_webinar`, webinarId);
    };

    const loadOccurrencesForModal = async () => {
      const now = new Date();
      await Promise.all(
        webinarTemplates.map(async (template) => {
          try {
            const result = await fetchOccurrences(template.id);
            if (!result.success || !result.data) return;
            const occurrences = result.data.occurrences || [];
            const future = occurrences
              .filter((occ) => new Date(occ.start_time) > now)
              .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
            const chosen = future[0] || occurrences.sort(
              (a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
            )[0];
            if (chosen) storeOccurrence(template.baseKey, template.id, chosen);
          } catch (err) {
            console.error(`Error fetching occurrences for ${template.baseKey}:`, err);
          }
        })
      );
    };

    loadOccurrencesForModal();
  }, [widgetOpen]);

  useEffect(() => {
    const handleOpenRegistration = () => handleWidgetOpen();
    window.addEventListener('openWebinarRegistration', handleOpenRegistration);
    return () => window.removeEventListener('openWebinarRegistration', handleOpenRegistration);
  }, [handleWidgetOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string | undefined): boolean => {
    if (!phone || !phone.trim()) return false;
    try {
      return isValidPhoneNumber(phone);
    } catch {
      return false;
    }
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
    if (formStep !== 2) return;

    setTouched({ email: true, first_name: true, last_name: true, session: true, phone_number: true });

    if (!formData.first_name.trim()) { setError('First name is required'); return; }
    if (!formData.last_name.trim()) { setError('Last name is required'); return; }
    if (!formData.email.trim()) { setError('Email is required'); return; }
    if (!validateEmail(formData.email)) { setError('Please enter a valid email address'); return; }
    if (!phoneNumber || !phoneNumber.trim()) { setError('Phone number is required'); return; }
    if (!validatePhoneNumber(phoneNumber)) { setError('Please enter a valid phone number'); return; }

    setIsSubmitting(true);
    setError(null);

    try {
      if (watchRecording) {
        try {
          const response = await fetch('/api/webx/recording-registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              first_name: formData.first_name,
              last_name: formData.last_name,
              phone_number: phoneNumber || formData.phone_number || '',
              webinar_id: DEFAULT_WEBINAR_ID,
            }),
          });
          await response.json();
        } catch (err) {
          console.warn("Error saving recording registration (non-blocking):", err);
        }

        const params = new URLSearchParams({
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          type: 'recording',
        });
        router.push(`/webinar-recording?${params.toString()}`);
        return;
      }

      const baseKey = selectedSession?.baseKey || selectedSession?.key.split("-")[0] || "morning";
      const occurrenceId = (typeof window !== "undefined" && localStorage.getItem(`occurrence_${baseKey}_id`)) || "";
      const storedWebinarId = (typeof window !== "undefined" && localStorage.getItem(`occurrence_${baseKey}_webinar`)) || "";
      const sessionId = selectedSession?.id || storedWebinarId || DEFAULT_WEBINAR_ID;

      const result = await registerZoomWebinar({
        ...formData,
        phone_number: phoneNumber || formData.phone_number || '',
        webinarId: sessionId,
        occurrence_id: occurrenceId,
      });

      if (result.success && result.data) {
        const params = new URLSearchParams({
          name: `${formData.first_name} ${formData.last_name}`,
          join_url: result.data.join_url,
          session_date: result.data.start_time || new Date().toISOString(),
          registrant_id: result.data.registrant_id,
          session_label: selectedSession?.label || 'Selected Session',
        });
        router.push(`/event-registration?${params.toString()}`);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="wc-hero">
        {/* LEFT PANEL */}
        <div className="wc-left">
          {/* Logo */}
          <div className="wc-logo-wrap">
            <Image
              src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png"
              alt="Creditor Academy Logo"
              width={180}
              height={44}
              priority
            />
          </div>

          {/* H1 Eyebrow */}
<h1 className="wc-eyebrow">
  <span className="bg-red-500 text-white px-2 py-1 rounded-md font-bold">
    FREE
  </span>{" "}
  <span className="wc-eyebrow">LIVE WEBCLASS</span>
</h1>
          {/* H2 Headline */}
          <h1 className="wc-headline">
            Learn 3 core pillars of<br />
            <span className="wc-headline-accent">Creditor Academy</span>
          </h1>

          {/* H3 Pillars */}
          <div className="wc-pillars">
            {[
              {
                title: "Become Private",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v5c0 5.25 4.25 10.15 10 11.35C17.75 22.15 22 17.25 22 12V7L12 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                title: "Operate Private",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                    <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                title: "Financial Freedom",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((pillar) => (
              <div key={pillar.title} className="wc-pillar-item">
                <span className="wc-pillar-icon">{pillar.icon}</span>
                <span className="wc-pillar-title">{pillar.title}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="wc-divider" />

          {/* Countdown */}
          <p className="wc-countdown-label">Next Session Starts In</p>
          <div className="wc-countdown-row">
            {[
              { label: "HRS", value: format(hours) },
              { label: "MIN", value: format(minutes) },
              { label: "SEC", value: format(seconds) },
            ].map((item, i) => (
              <div key={item.label} className="wc-countdown-block-wrap">
                <div className="wc-countdown-block">
                  <span className="wc-countdown-num">{item.value}</span>
                  <span className="wc-countdown-unit">{item.label}</span>
                </div>
                {i < 2 && <span className="wc-countdown-sep">:</span>}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className="wc-cta-btn" onClick={handleWidgetOpen}>
            Reserve My Free Seat Now
            <span className="wc-cta-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {/* Live Q&A note */}
          {/* <p className="wc-cta-sub">
            Includes <span className="wc-cta-highlight">Live Q&amp;A</span> with Paul Michael Rowland
          </p> */}
        </div>

        {/* RIGHT PANEL - Speaker image */}
        <div className="wc-right">
          {/* Live stream badge */}
          <div className="wc-live-badge">
            <span className="wc-live-dot" />
            LIVE STREAM
          </div>

          <div className="wc-right-image-wrap">
            <Image
              src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"
              alt="Paul Michael Rowland"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
              quality={90}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            {/* Overlay gradient at bottom */}
            <div className="wc-right-overlay" />
          </div>

          {/* Speaker info card */}
          <div className="wc-speaker-card">
            <span className="wc-speaker-tag">
              <span className="wc-speaker-tag-dot" />
              FREE WEBCLASS
            </span>
            <p className="wc-speaker-name">Paul Michael Rowland</p>
            <p className="wc-speaker-title">Founder, Creditor Academy</p>
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
                  <Image
                    src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883706/creditor-website-assets/images/logo/logo_roadmap.png"}
                    alt="Logo"
                    width={80}
                    height={60}
                    className="w-20 h-15 object-contain"
                    priority
                  />
                </div>
                <div className="modal-title-group">
                  <h2 className="modal-title">Register for FREE Webinar</h2>
                  <p className="modal-subtitle">Fill out the form below to register for our free webinar</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="registration-form">
                {/* Step Indicator */}
                <div className="form-step-indicator">
                  <div className={`form-step ${formStep === 1 ? 'form-step-active' : formStep > 1 ? 'form-step-completed' : ''}`}>
                    <div className="form-step-number">1</div>
                    <div className="form-step-label">Choose Session</div>
                  </div>
                  <div className={`form-step-line ${formStep === 2 ? 'form-step-line-active' : ''}`}></div>
                  <div className={`form-step ${formStep === 2 ? 'form-step-active' : ''}`}>
                    <div className="form-step-number">2</div>
                    <div className="form-step-label">Personal Details</div>
                  </div>
                </div>

                {/* Step 1: Session Selection */}
                {formStep === 1 && (
                  <div className="form-step-content">
                    <div className="form-group">
                      <label htmlFor="webinar_session" className="form-label">
                        Choose Your Live Session <span className="required">*</span>
                      </label>
                      <div className="form-select-wrapper">
                        <select
                          id="webinar_session"
                          className={`form-input form-select-input ${touched.session && !selectedSessionKey && !watchRecording ? 'form-input-error' : ''}`}
                          value={selectedSessionKey}
                          onChange={(e) => {
                            setSelectedSessionKey(e.target.value);
                            if (e.target.value) setWatchRecording(false);
                            setError(null);
                          }}
                          onBlur={() => handleBlur('session')}
                          disabled={isSubmitting || sessions.length === 0}
                        >
                          <option value="">Select a session time...</option>
                          {sessions.map((session: WebinarSession) => (
                            <option key={session.key} value={session.key}>
                              {session.label} — {session.time}
                            </option>
                          ))}
                        </select>
                        <span className="form-select-icon" aria-hidden="true">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      {selectedSession && !watchRecording && (
                        <p className="form-select-detail">
                          You're reserving the <strong>{selectedSession.label}</strong> starting at {selectedSession.time} {sessionTimezoneLabel}.
                        </p>
                      )}
                      {touched.session && !selectedSessionKey && !watchRecording && (
                        <p className="form-error">Please select the time you plan to attend</p>
                      )}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Times listed in Pacific Time (PST). Choose whichever works best for you.
                      </p>
                    </div>

                    <div className="form-divider">
                      <span className="form-divider-text">OR</span>
                    </div>

                    <div className="form-group">
                      <div className={`form-recording-option ${watchRecording ? 'form-recording-option-selected' : ''}`}>
                        <label className="form-recording-label">
                          <input
                            type="checkbox"
                            checked={watchRecording}
                            onChange={(e) => {
                              setWatchRecording(e.target.checked);
                              if (e.target.checked) setSelectedSessionKey("");
                              setError(null);
                            }}
                            disabled={isSubmitting}
                            className="form-recording-checkbox"
                          />
                          <div className="form-recording-content">
                            <div className="form-recording-header">
                              <span className="form-recording-title">In a Hurry? Watch Previous Recording</span>
                            </div>
                          </div>
                        </label>
                      </div>
                      {watchRecording && (
                        <p className="form-select-detail mt-2">
                          You'll watch the <strong>previous session recording</strong> immediately after registration.
                        </p>
                      )}
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
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary form-submit"
                      disabled={isSubmitting || (!watchRecording && !selectedSessionKey)}
                    >
                      Next
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Step 2: Personal Details */}
                {formStep === 2 && (
                  <div className="form-step-content">
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
                      {touched.email && !formData.email.trim() && <p className="form-error">Email is required</p>}
                      {touched.email && formData.email.trim() && !validateEmail(formData.email) && (
                        <p className="form-error">Please enter a valid email</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone_number" className="form-label">
                        Phone Number <span className="required">*</span>
                      </label>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={phoneNumber}
                        onChange={(value) => { setPhoneNumber(value); setError(null); }}
                        onBlur={() => handleBlur('phone_number')}
                        disabled={isSubmitting}
                        className="form-phone-input-wrapper"
                        numberInputProps={{
                          id: "phone_number",
                          className: `form-input form-phone-input ${touched.phone_number && (!phoneNumber || !phoneNumber.trim() || !validatePhoneNumber(phoneNumber)) ? 'form-input-error' : ''}`,
                          placeholder: "(555) 123-4567",
                          autoComplete: "tel",
                        }}
                      />
                      {touched.phone_number && (!phoneNumber || !phoneNumber.trim()) && (
                        <p className="form-error">Phone number is required</p>
                      )}
                      {touched.phone_number && phoneNumber && phoneNumber.trim() && !validatePhoneNumber(phoneNumber) && (
                        <p className="form-error">Please enter a valid phone number</p>
                      )}
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

                    <div className="form-step-actions">
                      <button type="button" onClick={handleBackStep} className="btn btn-secondary form-back-button" disabled={isSubmitting}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                      </button>
                      <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
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
                    </div>
                  </div>
                )}

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
        /* =====================
           HERO SECTION
        ===================== */
        .wc-hero {
          display: flex;
          height: 100vh;
          min-height: 650px;
          max-height: 900px;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        /* LEFT PANEL */
        .wc-left {
          flex: 0 0 50%;
          background: linear-gradient(160deg, #1a2fa8 0%, #2348d4 40%, #1e3ab8 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 30px 45px 30px 55px;
          color: white;
          position: relative;
          z-index: 1;
        }

        .wc-logo-wrap {
          margin-bottom: 18px;
        }

        .free{
          color: #f5a623;
          }

        /* H1 eyebrow */
        .wc-eyebrow {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin: 0 0 10px 0;
          margin-bottom: 18px;
        }

        /* H2 headline */
        .wc-headline {
          font-weight: 700;
          font-size: clamp(18px, 3.2vw, 32px);
          line-height: 1.1;
          margin-bottom: 14px;
          color: white;
          letter-spacing: -0.01em;
        }

        .wc-headline-accent {
          color: #f5a623;
        }

        /* H3 Pillars */
        .wc-pillars {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 6px;
        }

        .wc-pillar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 10px;
          padding: 12px 16px;
          transition: background 0.2s;
        }

        .wc-pillar-item:hover {
          background: rgba(255,255,255,0.16);
        }

        .wc-pillar-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(245,166,35,0.25);
          border: 1px solid rgba(245,166,35,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wc-pillar-title {
          font-size: 15px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.01em;
        }

        .wc-divider {
          height: 1px;
          background: rgba(255,255,255,0.2);
          margin: 0 0 20px 0;
        }

        .wc-countdown-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          margin: 0 0 10px 0;
        }

        .wc-countdown-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 24px;
        }

        .wc-countdown-block-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .wc-countdown-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 8px;
          padding: 8px 14px;
          min-width: 60px;
        }

        .wc-countdown-num {
          font-size: 26px;
          font-weight: 900;
          color: white;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .wc-countdown-unit {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .wc-countdown-sep {
          font-size: 28px;
          font-weight: 900;
          color: rgba(255,255,255,0.5);
          margin: 0 2px;
          margin-bottom: 12px;
        }

        .wc-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: white;
          color: #1a2fa8;
          font-size: 16px;
          font-weight: 800;
          padding: 16px 32px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.01em;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        @media (min-width: 901px) {
          .wc-cta-btn {
            padding: 14px 24px;
            max-width: 360px;
            width: auto;
          }
        }

        .wc-cta-btn:hover {
          background: #f0f4ff;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .wc-cta-arrow {
          width: 32px;
          height: 32px;
          background: #1a2fa8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .wc-cta-sub {
          margin: 12px 0 0 0;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
        }

        .wc-cta-highlight {
          color: #f5a623;
          font-weight: 700;
        }

        /* RIGHT PANEL */
        .wc-right {
          flex: 0 0 50%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #0d1a5e;
          min-height: 350px;
        }

        .wc-right-image-wrap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
        }

        .wc-right-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(13,26,94,0.15) 0%,
            rgba(13,26,94,0.0) 40%,
            rgba(13,26,94,0.6) 80%,
            rgba(13,26,94,0.85) 100%
          );
        }

        .wc-live-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 7px;
          background: white;
          color: #111;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 7px 14px;
          border-radius: 50px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .wc-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e53935;
          animation: livePulse 1.4s ease-in-out infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }

        .wc-speaker-card {
          position: absolute;
          bottom: 32px;
          left: 32px;
          z-index: 10;
        }

        .wc-speaker-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 5px 12px;
          border-radius: 50px;
          margin-bottom: 10px;
        }

        .wc-speaker-tag-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4caf50;
        }

        .wc-speaker-name {
          font-size: 22px;
          font-weight: 800;
          color: white;
          margin: 0 0 4px 0;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        .wc-speaker-title {
          font-size: 14px;
          color: rgba(255,255,255,0.75);
          margin: 0;
          text-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .wc-hero {
            flex-direction: column;
            min-height: auto;
            height: auto;
            max-height: none;
          }
          .wc-left {
            flex: none;
            padding: 36px 28px;
          }
          .wc-right {
            flex: none;
            width: 100%;
            height: 420px;
            min-height: 420px;
            position: relative;
          }
          .wc-right-image-wrap {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }

        @media (max-width: 480px) {
          .wc-left {
            padding: 28px 20px;
          }
          .wc-headline {
            font-size: 28px;
          }
          .wc-countdown-num {
            font-size: 26px;
          }
          .wc-countdown-block {
            min-width: 56px;
            padding: 8px 12px;
          }
          .wc-right {
            height: 360px;
            min-height: 360px;
          }
        }

        /* =====================
           MODAL STYLES
        ===================== */
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
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
        .dark .modal-close { background: rgba(255,255,255,0.1); color: #ccc; }
        .modal-close:hover:not(:disabled) { background: rgba(0,0,0,0.1); transform: scale(1.1); }
        .dark .modal-close:hover:not(:disabled) { background: rgba(255,255,255,0.2); }
        .modal-close:disabled { opacity: 0.5; cursor: not-allowed; }
        .modal-form-wrapper { padding: 32px 24px 24px; }
        .modal-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
        .modal-icon { font-size: 40px; line-height: 1; }
        .modal-title-group { flex: 1; }
        .modal-title { font-size: 24px; font-weight: 700; margin: 0 0 4px; color: #111; }
        .dark .modal-title { color: #fff; }
        .modal-subtitle { font-size: 14px; color: #666; margin: 0; }
        .dark .modal-subtitle { color: #999; }
        .registration-form { display: flex; flex-direction: column; gap: 20px; }
        .form-row { display: flex; flex-direction: column; gap: 16px; }
        .form-row .form-group { width: 100%; }
        @media (min-width: 768px) {
          .form-row { flex-direction: row; flex-wrap: nowrap; }
          .form-row .form-group { flex: 1; min-width: 0; }
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label { font-size: 14px; font-weight: 600; color: #333; }
        .dark .form-label { color: #e5e5e5; }
        .required { color: #dc2626; }
        .form-input {
          padding: 12px 16px; border: 2px solid #e5e5e5; border-radius: 8px;
          font-size: 16px; transition: all 0.2s; background: white; color: #111;
        }
        .form-select-wrapper { position: relative; }
        .form-select-input { appearance: none; width: 100%; padding-right: 44px; cursor: pointer; background: white; }
        .dark .form-select-input { background: #2a2a2a; }
        .form-select-input:disabled { cursor: not-allowed; opacity: 0.5; background: #f3f4f6 !important; }
        .dark .form-select-input:disabled { background: #1f2937 !important; }
        .form-select-icon {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #555;
          pointer-events: none; display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%; background: #f3f4f6; transition: all 0.2s;
        }
        .form-select-icon svg { width: 12px; height: 12px; display: block; }
        .dark .form-select-icon { color: #ccc; background: #374151; }
        .form-select-detail { font-size: 12px; color: #4b5563; margin: 6px 2px 0; }
        .dark .form-select-detail { color: #d1d5db; }
        .dark .form-input { background: #2a2a2a; border-color: #444; color: #e5e5e5; }
        .form-input:focus { outline: none; border-color: #026fe2; box-shadow: 0 0 0 3px rgba(2,111,226,0.1); }
        .dark .form-input:focus { border-color: #45beff; box-shadow: 0 0 0 3px rgba(69,190,255,0.1); }
        .form-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-input-error { border-color: #dc2626; }
        .form-input-error:focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.1); }
        .form-error { font-size: 12px; color: #dc2626; margin: 0; }
        .form-error-message {
          display: flex; align-items: center; gap: 8px; padding: 12px;
          background: #fee2e2; border: 1px solid #fecaca; border-radius: 8px;
          color: #991b1b; font-size: 14px;
        }
        .dark .form-error-message { background: rgba(220,38,38,0.2); border-color: rgba(220,38,38,0.3); color: #fca5a5; }
        .form-submit {
          width: 100%; padding: 14px 24px; background: #026fe2; color: white;
          border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; margin-top: 8px;
        }
        .form-submit:hover:not(:disabled) { background: #45beff; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(2,111,226,0.3); }
        .form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .form-footer { display: flex; align-items: center; gap: 8px; padding-top: 8px; font-size: 12px; color: #666; }
        .dark .form-footer { color: #999; }
        .form-footer svg { flex-shrink: 0; color: #026fe2; }
        .dark .form-footer svg { color: #45beff; }
        .form-step-indicator {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-bottom: 32px; padding: 0 8px;
        }
        .form-step { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 0 0 auto; min-width: 120px; }
        .form-step-number {
          width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center;
          justify-content: center; font-weight: 600; font-size: 16px;
          background: #e5e5e5; color: #9ca3af; border: 2px solid #e5e5e5; transition: all 0.3s;
        }
        .dark .form-step-number { background: #2a2a2a; border-color: #444; color: #666; }
        .form-step-active .form-step-number { background: #026fe2; border-color: #026fe2; color: white; box-shadow: 0 0 0 4px rgba(2,111,226,0.1); }
        .dark .form-step-active .form-step-number { background: #45beff; border-color: #45beff; color: #0a0e14; box-shadow: 0 0 0 4px rgba(69,190,255,0.1); }
        .form-step-completed .form-step-number { background: #10b981; border-color: #10b981; color: white; }
        .form-step-label { font-size: 13px; font-weight: 500; color: #6b7280; text-align: center; white-space: nowrap; }
        .dark .form-step-label { color: #9ca3af; }
        .form-step-active .form-step-label { color: #026fe2; font-weight: 600; }
        .dark .form-step-active .form-step-label { color: #45beff; }
        .form-step-completed .form-step-label { color: #10b981; }
        .form-step-line { flex: 1; height: 2px; background: #e5e7eb; max-width: 80px; margin: 0 4px; transition: background 0.3s; }
        .dark .form-step-line { background: #444; }
        .form-step-line-active { background: #026fe2; }
        .dark .form-step-line-active { background: #45beff; }
        .form-step-content { animation: fadeSlideIn 0.3s ease-out; }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .form-step-actions { display: flex; gap: 12px; margin-top: 8px; }
        .form-back-button {
          padding: 14px 24px; background: #f3f4f6; color: #374151; border: 2px solid #e5e5e5;
          border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; flex: 0 0 auto;
        }
        .dark .form-back-button { background: #2a2a2a; border-color: #444; color: #e5e5e5; }
        .form-back-button:hover:not(:disabled) { background: #e5e7eb; border-color: #d1d5db; }
        .dark .form-back-button:hover:not(:disabled) { background: #333; border-color: #555; }
        .form-back-button:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-step-actions .form-submit { flex: 1; margin-top: 0; }
        .form-recording-option {
          border: 2px solid #e5e7eb; border-radius: 8px; padding: 16px;
          background: white; transition: all 0.2s; cursor: pointer;
        }
        .dark .form-recording-option { background: #1a1a1a; border-color: #444; }
        .form-recording-option:hover { border-color: #026fe2; background: #f8fafc; }
        .dark .form-recording-option:hover { border-color: #45beff; background: #1a1f2e; }
        .form-recording-option-selected { border-color: #026fe2; background: #eff6ff; }
        .dark .form-recording-option-selected { border-color: #45beff; background: rgba(69,190,255,0.1); }
        .form-recording-label { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; margin: 0; }
        .form-recording-checkbox { width: 20px; height: 20px; margin-top: 2px; cursor: pointer; accent-color: #026fe2; flex-shrink: 0; }
        .dark .form-recording-checkbox { accent-color: #45beff; }
        .form-recording-checkbox:disabled { cursor: not-allowed; opacity: 0.6; }
        .form-recording-content { flex: 1; }
        .form-recording-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .form-recording-title { font-size: 15px; font-weight: 500; color: #111; }
        .dark .form-recording-title { color: #e5e5e5; }
        .form-recording-option-selected .form-recording-title { color: #026fe2; font-weight: 600; }
        .dark .form-recording-option-selected .form-recording-title { color: #45beff; }
        .form-divider { display: flex; align-items: center; gap: 16px; margin: 0; }
        .form-divider::before, .form-divider::after { content: ''; flex: 1; height: 1px; background: #e5e5e5; }
        .dark .form-divider::before, .dark .form-divider::after { background: #444; }
        .form-divider-text { font-size: 14px; font-weight: 600; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
        .dark .form-divider-text { color: #999; }
        .form-phone-input-wrapper { width: 100%; }
        .PhoneInput { display: flex; align-items: stretch; gap: 8px; }
        .PhoneInputCountry { flex-shrink: 0; }
        .PhoneInputCountryIcon { width: 20px; height: 15px; box-shadow: 0 0 0 1px rgba(0,0,0,0.1); border-radius: 2px; }
        .PhoneInputCountrySelect {
          padding: 12px 36px 12px 12px; border: 2px solid #e5e5e5; border-radius: 8px; font-size: 16px;
          transition: all 0.2s; background: white; color: #111; cursor: pointer; min-width: 100px;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; background-size: 12px;
        }
        .dark .PhoneInputCountrySelect {
          background-color: #2a2a2a; border-color: #444; color: #e5e5e5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23e5e5e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        }
        .PhoneInputCountrySelect:focus { outline: none; border-color: #026fe2; box-shadow: 0 0 0 3px rgba(2,111,226,0.1); }
        .dark .PhoneInputCountrySelect:focus { border-color: #45beff; box-shadow: 0 0 0 3px rgba(69,190,255,0.1); }
        .PhoneInputCountrySelect:disabled { opacity: 0.6; cursor: not-allowed; }
        .PhoneInputInput {
          flex: 1; padding: 12px 16px; border: 2px solid #e5e5e5; border-radius: 8px;
          font-size: 16px; transition: all 0.2s; background: white; color: #111;
        }
        .dark .PhoneInputInput { background: #2a2a2a; border-color: #444; color: #e5e5e5; }
        .PhoneInputInput:focus { outline: none; border-color: #026fe2; box-shadow: 0 0 0 3px rgba(2,111,226,0.1); }
        .dark .PhoneInputInput:focus { border-color: #45beff; box-shadow: 0 0 0 3px rgba(69,190,255,0.1); }
        .PhoneInputInput:disabled { opacity: 0.6; cursor: not-allowed; }
        .PhoneInputInput::placeholder { color: #999; }
        .dark .PhoneInputInput::placeholder { color: #666; }
      `}</style>
    </>
  );
}