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
 * These are used for the countdown logic and upcoming-session dropdown.
 * Updated for hourly sessions from 12:00 AM (midnight) to 11:00 PM (all 24 hours).
 */
const WEBINAR_SESSION_HOURS_PST: number[] = [];
const WEBINAR_SESSION_MINUTES_PST: number[] = [];

// Generate hourly time slots for all 24 hours (0:00 to 23:00)
// 12:00 AM, 1:00 AM, 2:00 AM, 3:00 AM, ..., 11:00 PM
for (let hour = 0; hour < 24; hour++) {
  WEBINAR_SESSION_HOURS_PST.push(hour);
  WEBINAR_SESSION_MINUTES_PST.push(0); // Only hourly slots (minute = 0)
}

/**
 * Hard stop for this webinar series (final occurrence).
 * Used so that "upcoming" logic never goes past the last scheduled date.
 *
 * NOTE: Dec 31, 2026 11:59 PM PST (adjust if the series end date changes).
 */
const WEBINAR_SERIES_END = new Date("2026-12-31T23:59:59-08:00");

/**
 * Countdown hook: next scheduled webinar (hourly, all 24 hours PST) from current time.
 * Shows countdown to the nearest upcoming session start time.
 * When a session time passes, automatically moves to the next session.
 */
function useCountdown() {
  const getNextSessionTarget = () => {
    const now = new Date();

    // Build all possible sessions for today and tomorrow
    const allSessions: Date[] = [];

    // Today's sessions
    for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
      const d = new Date(now);
      d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
      if (d.getTime() > now.getTime()) {
        allSessions.push(d);
      }
    }

    // Tomorrow's sessions (if needed)
    if (allSessions.length === 0) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      for (let i = 0; i < WEBINAR_SESSION_HOURS_PST.length; i++) {
        const d = new Date(tomorrow);
        d.setHours(WEBINAR_SESSION_HOURS_PST[i], WEBINAR_SESSION_MINUTES_PST[i], 0, 0);
        allSessions.push(d);
      }
    }

    // Sort by time and get the nearest upcoming session
    allSessions.sort((a, b) => a.getTime() - b.getTime());
    return allSessions[0] || new Date(now.getTime() + 60 * 60 * 1000); // Fallback: 1 hour from now
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
  baseKey: string;
  id: string;
  label: string;
  time: string;
  description: string;
  occurrenceDate: Date; // Store the actual date for sorting
};

/**
 * Webinar ID mapping for each time slot.
 * Maps time slots (hour:minute) to their corresponding Zoom Webinar IDs.
 * Only hourly slots are active (9:00, 10:00, 11:00, ..., 12:00 AM).
 */
const WEBINAR_ID_MAP: Record<string, string> = {
  "9:0": process.env.NEXT_PUBLIC_WEBINAR_ID_9_00 || "83714099773",
  // "9:20": process.env.NEXT_PUBLIC_WEBINAR_ID_9_20 || "84025714942",
  // "9:40": process.env.NEXT_PUBLIC_WEBINAR_ID_9_40 || "88069720130",
  "10:0": process.env.NEXT_PUBLIC_WEBINAR_ID_10_00 || "81791098294",
  // "10:20": process.env.NEXT_PUBLIC_WEBINAR_ID_10_20 || "87147336148",
  // "10:40": process.env.NEXT_PUBLIC_WEBINAR_ID_10_40 || "85247127947",
  "11:0": process.env.NEXT_PUBLIC_WEBINAR_ID_11_00 || "82020563134",
  // "11:20": process.env.NEXT_PUBLIC_WEBINAR_ID_11_20 || "82978557986",
  // "11:40": process.env.NEXT_PUBLIC_WEBINAR_ID_11_40 || "88590684526",
  "12:0": process.env.NEXT_PUBLIC_WEBINAR_ID_12_00 || "83019894049",
  // "12:20": process.env.NEXT_PUBLIC_WEBINAR_ID_12_20 || "86790401487",
  // "12:40": process.env.NEXT_PUBLIC_WEBINAR_ID_12_40 || "81397341406",
  "13:0": process.env.NEXT_PUBLIC_WEBINAR_ID_13_00 || "81760965028",
  // "13:20": process.env.NEXT_PUBLIC_WEBINAR_ID_13_20 || "82736752329",
  // "13:40": process.env.NEXT_PUBLIC_WEBINAR_ID_13_40 || "88516407451",
  "14:0": process.env.NEXT_PUBLIC_WEBINAR_ID_14_00 || "82535773783",
  // "14:20": process.env.NEXT_PUBLIC_WEBINAR_ID_14_20 || "81687485195",
  // "14:40": process.env.NEXT_PUBLIC_WEBINAR_ID_14_40 || "88004203092",
  "15:0": process.env.NEXT_PUBLIC_WEBINAR_ID_15_00 || "89804122112",
  // "15:20": process.env.NEXT_PUBLIC_WEBINAR_ID_15_20 || "84565337034",
  // "15:40": process.env.NEXT_PUBLIC_WEBINAR_ID_15_40 || "81055148799",
  "16:0": process.env.NEXT_PUBLIC_WEBINAR_ID_16_00 || "85643875195",
  // "16:20": process.env.NEXT_PUBLIC_WEBINAR_ID_16_20 || "83402332029",
  // "16:40": process.env.NEXT_PUBLIC_WEBINAR_ID_16_40 || "89184864298",
  "17:0": process.env.NEXT_PUBLIC_WEBINAR_ID_17_00 || "85862841627",
  // "17:20": process.env.NEXT_PUBLIC_WEBINAR_ID_17_20 || "82414041370",
  // "17:40": process.env.NEXT_PUBLIC_WEBINAR_ID_17_40 || "81100579049",
  "18:0": process.env.NEXT_PUBLIC_WEBINAR_ID_18_00 || "85885160584",
  // "18:20": process.env.NEXT_PUBLIC_WEBINAR_ID_18_20 || "83709383501",
  // "18:40": process.env.NEXT_PUBLIC_WEBINAR_ID_18_40 || "87324155325",
  "19:0": process.env.NEXT_PUBLIC_WEBINAR_ID_19_00 || "83058065233",
  // "19:20": process.env.NEXT_PUBLIC_WEBINAR_ID_19_20 || "87488320536",
  // "19:40": process.env.NEXT_PUBLIC_WEBINAR_ID_19_40 || "84436856616",
  "20:0": process.env.NEXT_PUBLIC_WEBINAR_ID_20_00 || "86026778255",
  // "20:20": process.env.NEXT_PUBLIC_WEBINAR_ID_20_20 || "81579764439",
  // "20:40": process.env.NEXT_PUBLIC_WEBINAR_ID_20_40 || "84010459642",
  "21:0": process.env.NEXT_PUBLIC_WEBINAR_ID_21_00 || "82439433153",
  // "21:20": process.env.NEXT_PUBLIC_WEBINAR_ID_21_20 || "84741812359",
  // "21:40": process.env.NEXT_PUBLIC_WEBINAR_ID_21_40 || "84509036766",
  "22:0": process.env.NEXT_PUBLIC_WEBINAR_ID_22_00 || "86228662125",
  // "22:20": process.env.NEXT_PUBLIC_WEBINAR_ID_22_20 || "81461797359",
  // "22:40": process.env.NEXT_PUBLIC_WEBINAR_ID_22_40 || "85661956630",
  "23:0": process.env.NEXT_PUBLIC_WEBINAR_ID_23_00 || "84501530874",
  // "23:20": process.env.NEXT_PUBLIC_WEBINAR_ID_23_20 || "86553620476",
  // "23:40": process.env.NEXT_PUBLIC_WEBINAR_ID_23_40 || "87637581703",
  "0:0": process.env.NEXT_PUBLIC_WEBINAR_ID_0_00 || "81770671957",
  "1:0": process.env.NEXT_PUBLIC_WEBINAR_ID_1_00 || "81314744802",
  "2:0": process.env.NEXT_PUBLIC_WEBINAR_ID_2_00 || "85093947802",
  "3:0": process.env.NEXT_PUBLIC_WEBINAR_ID_3_00 || "84500398491",
};

/**
 * Base templates for all daily webinar slots (hourly, all 24 hours).
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

// Generate webinar templates for all time slots
const webinarTemplates: WebinarTemplate[] = WEBINAR_SESSION_HOURS_PST.map((hour, index) => {
  const minute = WEBINAR_SESSION_MINUTES_PST[index];
  const timeKey = `${hour}:${minute}`;
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? "AM" : "PM";
  const minuteStr = minute.toString().padStart(2, "0");

  // Special labels for specific times
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
    // Format: "Orientation at 9:20 AM" or "Orientation at 10:40" (without AM/PM if obvious)
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

/**
 * Build the next N upcoming webinar slots (date + time) in PST,
 * sorted by nearest to current time, then farthest.
 * Constrained so that they never extend past the final series date.
 */
const buildUpcomingSessions = (count: number): WebinarSession[] => {
  const now = new Date();
  const allSessions: WebinarSession[] = [];

  console.log('[buildUpcomingSessions] Current time:', now.toISOString());
  console.log('[buildUpcomingSessions] Series end date:', WEBINAR_SERIES_END.toISOString());
  console.log('[buildUpcomingSessions] Number of templates:', webinarTemplates.length);

  // Iterate day-by-day to gather all upcoming slots
  const cursor = new Date(now);
  const maxDays = 7; // Look ahead up to 7 days

  for (let day = 0; day < maxDays; day++) {
    for (const template of webinarTemplates) {
      const occurrence = new Date(cursor);
      occurrence.setHours(template.hour, template.minute, 0, 0);

      // Debug first iteration
      if (day === 0 && template.hour === 9) {
        console.log('[buildUpcomingSessions] Sample occurrence:', {
          occurrenceTime: occurrence.toISOString(),
          nowTime: now.toISOString(),
          isFuture: occurrence.getTime() > now.getTime(),
          isPastSeriesEnd: occurrence.getTime() > WEBINAR_SERIES_END.getTime(),
        });
      }

      // Only include future occurrences
      if (occurrence.getTime() <= now.getTime()) continue;

      // Stop if we're past the series end date
      if (occurrence.getTime() > WEBINAR_SERIES_END.getTime()) {
        break;
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

    // Move to the next day
    cursor.setDate(cursor.getDate() + 1);
  }

  console.log('[buildUpcomingSessions] Total sessions generated:', allSessions.length);

  // Sort by time (nearest first, then farthest)
  allSessions.sort((a, b) => {
    return a.occurrenceDate.getTime() - b.occurrenceDate.getTime();
  });

  // Return the requested count
  return allSessions.slice(0, count);
};

export default function WebclassSection() {
  const router = useRouter();
  const { hours, minutes, seconds } = useCountdown();
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const format = (value: number) => value.toString().padStart(2, "0");

  // Modal and form state
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormState>({ ...initialFormState });
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
  // Show more sessions in dropdown (e.g., next 20 sessions)
  const [sessions, setSessions] = useState<WebinarSession[]>(() => {
    const initialSessions = buildUpcomingSessions(20);
    console.log('[Webclass] Initial sessions built:', initialSessions.length, 'sessions');
    return initialSessions;
  });
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
    // Validate step 1 before proceeding - must have either session selected or recording checked
    if (!watchRecording && !selectedSessionKey) {
      setTouched({ ...touched, session: true });
      setError('Please choose either a live session or select to watch the previous recording');
      return;
    }
    // Clear any errors and proceed to next step
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
    console.log('[Webclass] Modal opened. Sessions available:', sessions.length);
    console.log('[Webclass] First 3 sessions:', sessions.slice(0, 3));
  }, [resetFormState, sessions]);

  const handleWidgetClose = useCallback(() => {
    setWidgetOpen(false);
    resetFormState();
  }, [resetFormState]);

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
  }, [widgetOpen, handleWidgetClose]);

  /**
   * When the modal opens, fetch occurrences for all four webinar IDs
   * and store the latest (next upcoming) occurrence for each in localStorage.
   */
  useEffect(() => {
    if (!widgetOpen) return;

    const storeOccurrence = (baseKey: string, webinarId: string, occ?: OccurrenceItem) => {
      if (typeof window === "undefined" || !occ) return;
      localStorage.setItem(`occurrence_${baseKey}_id`, occ.occurrence_id);
      localStorage.setItem(`occurrence_${baseKey}_start`, occ.start_time);
      localStorage.setItem(`occurrence_${baseKey}_webinar`, webinarId);
      console.log(
        `[Webclass Modal] Stored ${baseKey} occurrence -> id: ${occ.occurrence_id}, start: ${occ.start_time}, webinar: ${webinarId}`
      );
    };

    const loadOccurrencesForModal = async () => {
      console.log("\n🟢 Modal opened -> fetching occurrences for dropdown (webclass hero)");
      const now = new Date();

      await Promise.all(
        webinarTemplates.map(async (template) => {
          try {
            console.log(`[Webclass Modal] Fetching occurrences for ${template.baseKey} (webinar ${template.id})`);
            const result = await fetchOccurrences(template.id);
            if (!result.success || !result.data) {
              console.warn(`[Webclass Modal] Failed to fetch occurrences for ${template.baseKey}`);
              return;
            }

            const occurrences = result.data.occurrences || [];
            const future = occurrences
              .filter((occ) => new Date(occ.start_time) > now)
              .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

            // Pick the next upcoming occurrence; if none future, pick the last known occurrence
            const chosen = future[0] || occurrences.sort(
              (a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
            )[0];

            if (chosen) {
              storeOccurrence(template.baseKey, template.id, chosen);
            } else {
              console.warn(`[Webclass Modal] No occurrences available for ${template.baseKey}`);
            }
          } catch (err) {
            console.error(`[Webclass Modal] Error fetching occurrences for ${template.baseKey}:`, err);
          }
        })
      );
    };

    loadOccurrencesForModal();
  }, [widgetOpen]);

  // Listen for custom event from CTA section to open the modal
  useEffect(() => {
    const handleOpenRegistration = () => {
      handleWidgetOpen();
    };

    window.addEventListener('openWebinarRegistration', handleOpenRegistration);
    return () => {
      window.removeEventListener('openWebinarRegistration', handleOpenRegistration);
    };
  }, [handleWidgetOpen]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string | undefined): boolean => {
    if (!phone || !phone.trim()) {
      return false;
    }
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

    // Only submit if we're on step 2
    if (formStep !== 2) {
      return;
    }

    // Mark all fields as touched
    setTouched({
      email: true,
      first_name: true,
      last_name: true,
      session: true,
      phone_number: true,
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
    if (!phoneNumber || !phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Check if user selected "Watch Previous Recording" option
      if (watchRecording) {
        // For recording option, save to our recording registrations endpoint
        // This ensures the registration appears in /webinar-registration page
        console.log("[Webclass Modal] Submitting recording registration with:", {
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_number: phoneNumber || formData.phone_number || '',
          type: 'recording',
        });

        try {
          const response = await fetch('/api/webx/recording-registrations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              first_name: formData.first_name,
              last_name: formData.last_name,
              phone_number: phoneNumber || formData.phone_number || '',
              webinar_id: DEFAULT_WEBINAR_ID,
            }),
          });

          const result = await response.json();

          if (result.success && result.data) {
            console.log("[Webclass Modal] Recording registration saved successfully");
          } else {
            console.warn("[Webclass Modal] Recording registration save failed (non-blocking):", result.error);
          }
        } catch (err) {
          console.warn("[Webclass Modal] Error saving recording registration (non-blocking):", err);
        }

        // Always redirect to video page regardless of save result
        const params = new URLSearchParams({
          name: `${formData.first_name} ${formData.last_name}`,
          email: formData.email,
          type: 'recording',
        });

        router.push(`/webinar-recording?${params.toString()}`);
        return;
      }

      // Determine baseKey for selected session
      const baseKey = selectedSession?.baseKey || selectedSession?.key.split("-")[0] || "morning";

      // Pull stored occurrence + webinar from localStorage (set when modal opened)
      const occurrenceId =
        (typeof window !== "undefined" && localStorage.getItem(`occurrence_${baseKey}_id`)) || "";
      const storedWebinarId =
        (typeof window !== "undefined" && localStorage.getItem(`occurrence_${baseKey}_webinar`)) || "";

      // Use selected session id, fallback to stored, then default
      const sessionId = selectedSession?.id || storedWebinarId || DEFAULT_WEBINAR_ID;

      console.log("[Webclass Modal] Submitting registration with:", {
        baseKey,
        occurrence_id: occurrenceId,
        webinar_id: sessionId,
      });

      const result = await registerZoomWebinar({
        ...formData,
        phone_number: phoneNumber || formData.phone_number || '',
        webinarId: sessionId,
        occurrence_id: occurrenceId,
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Webclass hero section - matching exact design from image */}
      <section className="relative overflow-hidden py-20 md:py-25 text-white dark:text-white">
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

        {/* Top header with logo */}
        <div className="relative z-10 bg-transparent py-2">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="text-center">
              {/* Logo */}
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png"
                  alt="Creditor Academy Logo"
                  width={250}
                  height={60}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png"
                  alt="Creditor Academy Logo"
                  width={250}
                  height={60}
                  className="hidden dark:block"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top banner */}
        <div className="relative z-10 bg-transparent py-3">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <p className="text-center text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
              This <strong>FREE Webclass</strong> Is For Business Owners, Individuals, &amp; Anyone Ready for Change…
            </p>
          </div>
        </div>

        {/* Alert Banner - Webinar Closing Soon */}
        <div className="relative z-10 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 py-3 my-3 shadow-lg">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-center text-white font-bold text-sm md:text-base lg:text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
                <strong>URGENT:</strong> This FREE Webinar Is Closing Soon - Limited Spots Available!
              </p>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description line below alert */}
        <div className="relative z-10 py-2">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
            <p className="text-center text-white text-sm md:text-base" style={{ fontFamily: "Arial, sans-serif" }}>
              Learn how people step out of the public system and operate in private to gain control, limit liability, and achieve financial freedom.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 relative z-10 pt-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
            {/* Left image with gold border */}
            <div className="lg:w-5/12 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div
                  className="relative w-full h-[700px] border-2 overflow-hidden"
                  style={{
                    borderColor: "#d4af37",
                    backgroundColor: "#f3f4f6"
                  }}
                >
                  <Image
                    src={"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883348/creditor-website-assets/images/avatar/paul2.webp"}
                    alt="Speaker"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 flex flex-col justify-center lg:pr-8 xl:pr-12">
              {/* Small uppercase text */}
              <p className="text-xs md:text-sm tracking-wider uppercase mb-1 text-white dark:text-gray-400 font-medium" style={{ fontFamily: "Arial, sans-serif" }}>
                Secrets To Easily Starting Your Own
              </p>

              {/* Main headline - very large, bold */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-2 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif", fontWeight: 900 }}>
                <span className="block" style={{ color: "#ffc107" }}>Become and</span>
                <span className="block">Operate Private</span>
              </h1>

              {/* Description paragraphs */}
              <div className="mb-4 space-y-2">
                <p className="text-base md:text-lg text-white dark:text-gray-300 leading-relaxed" style={{ fontFamily: "Arial, sans-serif" }}>
                  This FREE webclass introduces Creditor Academy's principles on how private individuals and businesses operate differently in structure, credit, income, and responsibility—focused on positioning, private operation, and reducing dependency.
                </p>
              </div>

              {/* Highlight text - bold with gold highlights */}
              <p className="text-base md:text-lg font-bold mb-4 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
                <span style={{ color: "#ffc107" }}>100% FREE</span> - Next Class Is Starting <span style={{ color: "#ffc107" }}>TODAY!</span>
              </p>

              {/* Alert Message - Closing Soon */}
              <div className="mb-4 w-fit p-3 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30 border-2 border-red-300 dark:border-red-700">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm md:text-base font-semibold text-red-800 dark:text-red-200 whitespace-nowrap" style={{ fontFamily: "Arial, sans-serif" }}>
                    <strong>Closing Soon!</strong> Register now before spots fill up.
                  </p>
                </div>
              </div>

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
              <div className="mb-4">
                <button
                  onClick={handleWidgetOpen}
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg transition-colors bg-[#FFC107] hover:bg-[#FFD700] text-gray-900"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)"
                  }}
                >
                  Register For The Webclass Now!
                </button>
                <p className="mt-2 text-xs md:text-sm text-white dark:text-gray-400" style={{ fontFamily: "Arial, sans-serif" }}>
                  Save My Seat For The Private Operation Webclass
                </p>
              </div>

              {/* Countdown */}
              <div className="mt-3">
                <p className="text-base md:text-lg font-semibold mb-3 text-white dark:text-white" style={{ fontFamily: "Arial, sans-serif" }}>
                  Next Webclass Begins In:
                </p>

                <div className="flex items-center gap-3 md:gap-4">
                  {[
                    { label: "HOUR", value: format(hours) },
                    { label: "MINUTES", value: format(minutes) },
                    { label: "SECONDS", value: format(seconds) },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <div
                        className="rounded-full flex flex-col items-center justify-center border-[3px] bg-white dark:bg-[#0a0e14]"
                        style={{
                          width: 120,
                          height: 120,
                          borderColor: "#d1d5db"
                        }}
                      >
                        <span className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-1" style={{ fontFamily: "Arial, sans-serif" }}>
                          {item.value}
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide" style={{ fontFamily: "Arial, sans-serif" }}>
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
                            if (e.target.value) {
                              setWatchRecording(false);
                            }
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
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    {/* Divider */}
                    <div className="form-divider">
                      <span className="form-divider-text">OR</span>
                    </div>

                    {/* Watch Recording Option */}
                    <div className="form-group">
                      <div className={`form-recording-option ${watchRecording ? 'form-recording-option-selected' : ''}`}>
                        <label className="form-recording-label">
                          <input
                            type="checkbox"
                            checked={watchRecording}
                            onChange={(e) => {
                              setWatchRecording(e.target.checked);
                              if (e.target.checked) {
                                setSelectedSessionKey("");
                              }
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
                      {touched.email && !formData.email.trim() && (
                        <p className="form-error">Email is required</p>
                      )}
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
                        onChange={(value) => {
                          setPhoneNumber(value);
                          setError(null);
                        }}
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
                      <button
                        type="button"
                        onClick={handleBackStep}
                        className="btn btn-secondary form-back-button"
                        disabled={isSubmitting}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="12" x2="5" y2="12"></line>
                          <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back
                      </button>
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
          flex-direction: column;
          gap: 16px;
        }
        .form-row .form-group {
          width: 100%;
        }
        @media (min-width: 768px) {
          .form-row {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .form-row .form-group {
            flex: 1;
            min-width: 0;
          }
        }
        @media (max-width: 767px) {
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
          opacity: 0.5;
          background: #f3f4f6 !important;
        }
        .dark .form-select-input:disabled {
          background: #1f2937 !important;
        }
        .form-select-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #555;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f3f4f6;
          transition: all 0.2s;
        }
        .form-select-icon svg {
          width: 12px;
          height: 12px;
          display: block;
        }
        .dark .form-select-icon {
          color: #ccc;
          background: #374151;
        }
        .form-select-input:focus ~ .form-select-icon {
          background: #e0e7ff;
        }
        .dark .form-select-input:focus ~ .form-select-icon {
          background: rgba(69, 190, 255, 0.2);
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
        /* Step Indicator Styling */
        .form-step-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 32px;
          padding: 0 8px;
        }
        .form-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 0 0 auto;
          min-width: 120px;
        }
        .form-step-number {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 16px;
          background: #e5e5e5;
          color: #9ca3af;
          border: 2px solid #e5e5e5;
          transition: all 0.3s;
        }
        .dark .form-step-number {
          background: #2a2a2a;
          border-color: #444;
          color: #666;
        }
        .form-step-active .form-step-number {
          background: #026fe2;
          border-color: #026fe2;
          color: white;
          box-shadow: 0 0 0 4px rgba(2, 111, 226, 0.1);
        }
        .dark .form-step-active .form-step-number {
          background: #45beff;
          border-color: #45beff;
          color: #0a0e14;
          box-shadow: 0 0 0 4px rgba(69, 190, 255, 0.1);
        }
        .form-step-completed .form-step-number {
          background: #10b981;
          border-color: #10b981;
          color: white;
        }
        .form-step-label {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
          white-space: nowrap;
        }
        .dark .form-step-label {
          color: #9ca3af;
        }
        .form-step-active .form-step-label {
          color: #026fe2;
          font-weight: 600;
        }
        .dark .form-step-active .form-step-label {
          color: #45beff;
        }
        .form-step-completed .form-step-label {
          color: #10b981;
        }
        .form-step-line {
          flex: 1;
          height: 2px;
          background: #e5e7eb;
          max-width: 80px;
          margin: 0 4px;
          position: relative;
          transition: background 0.3s;
        }
        .dark .form-step-line {
          background: #444;
        }
        .form-step-line-active {
          background: #026fe2;
        }
        .dark .form-step-line-active {
          background: #45beff;
        }
        .form-step-content {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .form-step-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }
        .form-back-button {
          padding: 14px 24px;
          background: #f3f4f6;
          color: #374151;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          flex: 0 0 auto;
        }
        .dark .form-back-button {
          background: #2a2a2a;
          border-color: #444;
          color: #e5e5e5;
        }
        .form-back-button:hover:not(:disabled) {
          background: #e5e7eb;
          border-color: #d1d5db;
        }
        .dark .form-back-button:hover:not(:disabled) {
          background: #333;
          border-color: #555;
        }
        .form-back-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .form-step-actions .form-submit {
          flex: 1;
          margin-top: 0;
        }
        /* Recording Option Styling */
        .form-recording-option {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          background: white;
          transition: all 0.2s;
          cursor: pointer;
        }
        .dark .form-recording-option {
          background: #1a1a1a;
          border-color: #444;
        }
        .form-recording-option:hover {
          border-color: #026fe2;
          background: #f8fafc;
        }
        .dark .form-recording-option:hover {
          border-color: #45beff;
          background: #1a1f2e;
        }
        .form-recording-option-selected {
          border-color: #026fe2;
          background: #eff6ff;
        }
        .dark .form-recording-option-selected {
          border-color: #45beff;
          background: rgba(69, 190, 255, 0.1);
        }
        .form-recording-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
          margin: 0;
        }
        .form-recording-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #026fe2;
          flex-shrink: 0;
        }
        .dark .form-recording-checkbox {
          accent-color: #45beff;
        }
        .form-recording-checkbox:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .form-recording-content {
          flex: 1;
        }
        .form-recording-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .form-recording-icon {
          font-size: 24px;
        }
        .form-recording-title {
          font-size: 15px;
          font-weight: 500;
          color: #111;
        }
        .dark .form-recording-title {
          color: #e5e5e5;
        }
        .form-recording-option-selected .form-recording-title {
          color: #026fe2;
          font-weight: 600;
        }
        .dark .form-recording-option-selected .form-recording-title {
          color: #45beff;
        }
        .form-recording-description {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
        .dark .form-recording-description {
          color: #999;
        }
        .form-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0px 0;
        }
        .form-divider::before,
        .form-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e5e5e5;
        }
        .dark .form-divider::before,
        .dark .form-divider::after {
          background: #444;
        }
        .form-divider-text {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .dark .form-divider-text {
          color: #999;
        }
        /* React Phone Number Input Styling */
        .form-phone-input-wrapper {
          width: 100%;
        }
        .PhoneInput {
          display: flex;
          align-items: stretch;
          gap: 8px;
        }
        .PhoneInputCountry {
          flex-shrink: 0;
        }
        .PhoneInputCountryIcon {
          width: 20px;
          height: 15px;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
          border-radius: 2px;
        }
        .PhoneInputCountrySelect {
          padding: 12px 36px 12px 12px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          background: white;
          color: #111;
          cursor: pointer;
          min-width: 100px;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 12px;
        }
        .dark .PhoneInputCountrySelect {
          background: #2a2a2a;
          border-color: #444;
          color: #e5e5e5;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23e5e5e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
        }
        .PhoneInputCountrySelect:focus {
          outline: none;
          border-color: #026fe2;
          box-shadow: 0 0 0 3px rgba(2, 111, 226, 0.1);
        }
        .dark .PhoneInputCountrySelect:focus {
          border-color: #45beff;
          box-shadow: 0 0 0 3px rgba(69, 190, 255, 0.1);
        }
        .PhoneInputCountrySelect:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .PhoneInputInput {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s;
          background: white;
          color: #111;
        }
        .dark .PhoneInputInput {
          background: #2a2a2a;
          border-color: #444;
          color: #e5e5e5;
        }
        .PhoneInputInput:focus {
          outline: none;
          border-color: #026fe2;
          box-shadow: 0 0 0 3px rgba(2, 111, 226, 0.1);
        }
        .dark .PhoneInputInput:focus {
          border-color: #45beff;
          box-shadow: 0 0 0 3px rgba(69, 190, 255, 0.1);
        }
        .PhoneInputInput:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .PhoneInputInput::placeholder {
          color: #999;
        }
        .dark .PhoneInputInput::placeholder {
          color: #666;
        }
      `}</style>
    </>
  );
}
