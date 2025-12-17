"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { DEFAULT_WEBINAR_ID } from "@/config/api";
import {
  registerZoomWebinar,
  ZoomWebinarRegistrationPayload,
  fetchOccurrences,
  OccurrenceItem,
} from "@/services/zoom";

/**
 * Fixed daily webinar times in PST (24h format).
 * These are used for the countdown logic and upcoming-session dropdown.
 * Updated for sessions every 20 minutes from 9:00 AM to 12:00 AM (midnight).
 */
const WEBINAR_SESSION_HOURS_PST: number[] = [];
const WEBINAR_SESSION_MINUTES_PST: number[] = [];

// Generate all time slots from 9:00 AM to 12:00 AM (every 20 minutes)
// 9:00 AM = 9:00, 9:20, 9:40, 10:00, ... 11:40 PM, 12:00 AM (midnight)
for (let hour = 9; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 20) {
    WEBINAR_SESSION_HOURS_PST.push(hour);
    WEBINAR_SESSION_MINUTES_PST.push(minute);
  }
}
// Add midnight (12:00 AM = 0:00)
WEBINAR_SESSION_HOURS_PST.push(0);
WEBINAR_SESSION_MINUTES_PST.push(0);

/**
 * Hard stop for this webinar series (final occurrence).
 * Used so that "upcoming" logic never goes past the last scheduled date.
 *
 * NOTE: Feb 1, 2026 11:59 PM PST (adjust if the series end date changes).
 */
const WEBINAR_SERIES_END = new Date("2026-02-01T23:59:59-08:00");

/**
 * Dummy dataset for social proof notifications
 */
const AMERICAN_FIRST_NAMES = [
  "James", "Michael", "Robert", "John", "David", "William", "Richard", "Joseph", "Thomas", "Christopher",
  "Charles", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
  "Kenneth", "Kevin", "Brian", "George", "Timothy", "Ronald", "Jason", "Edward", "Jeffrey", "Ryan",
  "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon",
  "Benjamin", "Samuel", "Frank", "Gregory", "Raymond", "Alexander", "Patrick", "Jack", "Dennis", "Jerry",
  "Tyler", "Aaron", "Jose", "Henry", "Adam", "Douglas", "Nathan", "Zachary", "Kyle", "Noah",
  "Ethan", "Jeremy", "Walter", "Christian", "Keith", "Roger", "Terry", "Austin", "Sean", "Gerald",
  "Carl", "Harold", "Dylan", "Arthur", "Lawrence", "Jordan", "Jesse", "Bryan", "Billy", "Bruce",
  "Gabriel", "Joe", "Logan", "Alan", "Juan", "Wayne", "Roy", "Ralph", "Randy", "Vincent",
  "Emma", "Olivia", "Sophia", "Isabella", "Charlotte", "Amelia", "Mia", "Harper", "Evelyn", "Abigail",
  "Emily", "Elizabeth", "Mila", "Ella", "Avery", "Sofia", "Camila", "Aria", "Scarlett", "Victoria",
  "Madison", "Luna", "Grace", "Chloe", "Penelope", "Layla", "Riley", "Zoey", "Nora", "Lily",
  "Eleanor", "Hannah", "Lillian", "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Zoe", "Leah",
  "Hazel", "Violet", "Aurora", "Savannah", "Audrey", "Brooklyn", "Bella", "Claire", "Skylar", "Lucy",
  "Paisley", "Everly", "Anna", "Caroline", "Nova", "Genesis", "Aaliyah", "Kennedy", "Kinsley", "Allison",
  "Maya", "Sarah", "Madelyn", "Adeline", "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice",
  "Samantha", "Hailey", "Eva", "Emilia", "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity",
  // Additional names
  "Lucas", "Mason", "Evelyn", "Harper", "Ella", "Aria", "Liam", "Noah", "Oliver", "Elijah",
  "William", "James", "Benjamin", "Lucas", "Henry", "Alexander", "Mason", "Michael", "Ethan", "Daniel",
  "Matthew", "Aiden", "Joseph", "David", "Jackson", "Sebastian", "Carter", "Wyatt", "Jayden", "John",
  "Owen", "Dylan", "Luke", "Grayson", "Levi", "Isaac", "Gabriel", "Julian", "Mateo", "Anthony",
  "Jaxon", "Lincoln", "Joshua", "Christopher", "Andrew", "Theodore", "Caleb", "Ryan", "Asher", "Nathan",
  "Thomas", "Leo", "Isaiah", "Charles", "Josiah", "Hudson", "Christian", "Hunter", "Connor", "Eli",
  "Jonathan", "Aaron", "Landon", "Adrian", "Tyler", "Kevin", "Parker", "Colton", "Jordan", "Ian",
  "Natalie", "Sophia", "Olivia", "Emma", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "Emily",
  "Isabella", "Mia", "Ava", "Camila", "Gianna", "Ella", "Aria", "Luna", "Layla", "Zoe",
  "Chloe", "Victoria", "Penelope", "Riley", "Lily", "Nora", "Hannah", "Aubrey", "Stella", "Savannah",
  "Audrey", "Brooklyn", "Leah", "Bella", "Skylar", "Lucy", "Paisley", "Everly", "Anna", "Caroline",
  "Nova", "Genesis", "Aaliyah", "Kennedy", "Kinsley", "Allison", "Maya", "Sarah", "Madelyn", "Adeline",
  "Alexa", "Ariana", "Elena", "Gabriella", "Naomi", "Alice", "Samantha", "Hailey", "Eva", "Emilia",
  "Autumn", "Quinn", "Nevaeh", "Piper", "Ruby", "Serenity", "Willow", "Ivy", "Clara", "Vivian",
  "Aurora", "Reese", "Lillian", "Addison", "Aubrey", "Ellie", "Stella", "Natalie", "Zoe", "Leah"
];

const US_CITIES = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego",
  "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte", "San Francisco",
  "Indianapolis", "Seattle", "Denver", "Washington", "Boston", "El Paso", "Nashville", "Detroit",
  "Oklahoma City", "Portland", "Las Vegas", "Memphis", "Louisville", "Baltimore", "Milwaukee", "Albuquerque",
  "Tucson", "Fresno", "Sacramento", "Kansas City", "Mesa", "Atlanta", "Omaha", "Colorado Springs",
  "Raleigh", "Virginia Beach", "Miami", "Oakland", "Minneapolis", "Tulsa", "Cleveland", "Wichita",
  "Arlington", "Tampa", "New Orleans", "Honolulu", "Orlando", "Cincinnati", "St. Louis", "Pittsburgh",
  "Greensboro", "Lincoln", "Plano", "Anchorage", "Durham", "Boise", "Tempe", "Irvine", "Riverside",
  "Newark", "Fort Wayne", "Lexington", "Stockton", "Henderson", "Saint Paul", "St. Petersburg", "Jersey City",
  "Chula Vista", "Norfolk", "Orlando", "Chandler", "Laredo", "Madison", "Durham", "Lubbock", "Winston-Salem",
  "Garland", "Glendale", "Hialeah", "Reno", "Chesapeake", "Gilbert", "Baton Rouge", "Irving", "Scottsdale",
  "North Las Vegas", "Fremont", "Boise", "Richmond", "San Bernardino", "Birmingham", "Spokane", "Rochester"
];

const ACTIONS = [
  "Registered for FREE training",
  "Became Member",
  "Choose website service",
  "Joined the webclass",
  "Signed up for webinar",
  "Registered for FREE webclass",
  "Became a member",
  "Selected website package",
  "Registered for training",
  "Joined the program"
];

type NotificationData = {
  name: string;
  city: string;
  action: string;
  minutesAgo: number;
  type: 'person' | 'registration';
  totalRegistrations?: number;
};

/**
 * Generate a large dummy dataset of notifications
 * Only person notifications (no registration count)
 */
const generateNotificationDataset = (totalRegistrations: number): NotificationData[] => {
  const dataset: NotificationData[] = [];
  
  // Generate person notifications only
  for (let i = 0; i < 200; i++) {
    const name = AMERICAN_FIRST_NAMES[Math.floor(Math.random() * AMERICAN_FIRST_NAMES.length)];
    const city = US_CITIES[Math.floor(Math.random() * US_CITIES.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    
    // More varied timestamps: 1-5 minutes (40%), 5-60 minutes (30%), 1-6 hours (20%), 6-24 hours (10%)
    const rand = Math.random();
    let minutesAgo: number;
    if (rand < 0.4) {
      // 1-5 minutes ago
      minutesAgo = Math.floor(Math.random() * 5) + 1;
    } else if (rand < 0.7) {
      // 5-60 minutes ago
      minutesAgo = Math.floor(Math.random() * 55) + 5;
    } else if (rand < 0.9) {
      // 1-6 hours ago
      minutesAgo = Math.floor(Math.random() * 300) + 60;
    } else {
      // 6-24 hours ago
      minutesAgo = Math.floor(Math.random() * 1080) + 360;
    }
    
    dataset.push({ name, city, action, minutesAgo, type: 'person' });
  }
  
  // Shuffle the array randomly
  for (let i = dataset.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataset[i], dataset[j]] = [dataset[j], dataset[i]];
  }
  
  // Sort by most recent first
  return dataset.sort((a, b) => a.minutesAgo - b.minutesAgo);
};

/**
 * Format time ago (e.g., "2 hours ago", "5 minutes ago")
 */
const formatTimeAgo = (minutesAgo: number): string => {
  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60) return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutesAgo / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "day" : "days"} ago`;
};

/**
 * Notification Popup Component
 */
function NotificationPopup() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [dataset, setDataset] = useState<NotificationData[]>([]);

  // Only show on webinar page
  const isWebinarPage = pathname === '/webinar';

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Random total between 200 and 700
    const registrations = Math.floor(Math.random() * 501) + 200;
    setTotalRegistrations(registrations);
    // Generate dataset with registration count notifications included
    setDataset(generateNotificationDataset(registrations));
  }, []);

  useEffect(() => {
    if (!mounted || dataset.length === 0 || !isWebinarPage) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      // Show notification for 3 seconds
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        
        // After fade out animation (300ms), wait 3 seconds, then show next
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % dataset.length);
          setIsVisible(true);
          scheduleNext(); // Schedule the next notification
        }, 3000 + 300); // 3 seconds wait + 300ms fade out
      }, 3000); // Show for 3 seconds
    };
    
    scheduleNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mounted, dataset.length, isWebinarPage]);

  // Don't render until mounted on client or if not on webinar page
  if (!mounted || dataset.length === 0 || !isWebinarPage) {
    return null;
  }

  const notification = dataset[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50" style={{ maxWidth: "320px" }}>
      {/* Individual Notification */}
      <div
        className={`transition-all duration-500 ease-out ${
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        }`}
      >
        {notification.type === 'registration' ? (
          // Registration Count Notification
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">
              <span className="text-blue-600 dark:text-blue-400">{notification.totalRegistrations?.toLocaleString()}</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">people registered</span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimeAgo(notification.minutesAgo)}
              </span>
              {/* Verified Badge */}
              <div className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                  verified by Proof
                </span>
              </div>
            </div>
          </div>
        ) : (
          // Person Notification
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start gap-3">
              {/* Map/Location Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {notification.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    from {notification.city}
                  </span>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                  {notification.action}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(notification.minutesAgo)}
                  </span>
                  {/* Verified Badge */}
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                      verified by Proof
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Countdown hook: next scheduled webinar (every 20 minutes from 9 AM to 12 AM PST) from current time.
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
    return allSessions[0] || new Date(now.getTime() + 20 * 60 * 1000); // Fallback: 20 minutes from now
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
 */
const WEBINAR_ID_MAP: Record<string, string> = {
  "9:0": process.env.NEXT_PUBLIC_WEBINAR_ID_9_00 || "85345478550",
  "9:20": process.env.NEXT_PUBLIC_WEBINAR_ID_9_20 || "84025714942",
  "9:40": process.env.NEXT_PUBLIC_WEBINAR_ID_9_40 || "88069720130",
  "10:0": process.env.NEXT_PUBLIC_WEBINAR_ID_10_00 || "83407669064",
  "10:20": process.env.NEXT_PUBLIC_WEBINAR_ID_10_20 || "87147336148",
  "10:40": process.env.NEXT_PUBLIC_WEBINAR_ID_10_40 || "85247127947",
  "11:0": process.env.NEXT_PUBLIC_WEBINAR_ID_11_00 || "89594830823",
  "11:20": process.env.NEXT_PUBLIC_WEBINAR_ID_11_20 || "82978557986",
  "11:40": process.env.NEXT_PUBLIC_WEBINAR_ID_11_40 || "88590684526",
  "12:0": process.env.NEXT_PUBLIC_WEBINAR_ID_12_00 || "82820883271",
  "12:20": process.env.NEXT_PUBLIC_WEBINAR_ID_12_20 || "86790401487",
  "12:40": process.env.NEXT_PUBLIC_WEBINAR_ID_12_40 || "81397341406",
  "13:0": process.env.NEXT_PUBLIC_WEBINAR_ID_13_00 || "88431434222",
  "13:20": process.env.NEXT_PUBLIC_WEBINAR_ID_13_20 || "82736752329",
  "13:40": process.env.NEXT_PUBLIC_WEBINAR_ID_13_40 || "88516407451",
  "14:0": process.env.NEXT_PUBLIC_WEBINAR_ID_14_00 || "85009970371",
  "14:20": process.env.NEXT_PUBLIC_WEBINAR_ID_14_20 || "81687485195",
  "14:40": process.env.NEXT_PUBLIC_WEBINAR_ID_14_40 || "88004203092",
  "15:0": process.env.NEXT_PUBLIC_WEBINAR_ID_15_00 || "82602140461",
  "15:20": process.env.NEXT_PUBLIC_WEBINAR_ID_15_20 || "84565337034",
  "15:40": process.env.NEXT_PUBLIC_WEBINAR_ID_15_40 || "81055148799",
  "16:0": process.env.NEXT_PUBLIC_WEBINAR_ID_16_00 || "82712967074",
  "16:20": process.env.NEXT_PUBLIC_WEBINAR_ID_16_20 || "83402332029",
  "16:40": process.env.NEXT_PUBLIC_WEBINAR_ID_16_40 || "89184864298",
  "17:0": process.env.NEXT_PUBLIC_WEBINAR_ID_17_00 || "89004632115",
  "17:20": process.env.NEXT_PUBLIC_WEBINAR_ID_17_20 || "82414041370",
  "17:40": process.env.NEXT_PUBLIC_WEBINAR_ID_17_40 || "81100579049",
  "18:0": process.env.NEXT_PUBLIC_WEBINAR_ID_18_00 || "84754397951",
  "18:20": process.env.NEXT_PUBLIC_WEBINAR_ID_18_20 || "83709383501",
  "18:40": process.env.NEXT_PUBLIC_WEBINAR_ID_18_40 || "87324155325",
  "19:0": process.env.NEXT_PUBLIC_WEBINAR_ID_19_00 || "84323907773",
  "19:20": process.env.NEXT_PUBLIC_WEBINAR_ID_19_20 || "87488320536",
  "19:40": process.env.NEXT_PUBLIC_WEBINAR_ID_19_40 || "84436856616",
  "20:0": process.env.NEXT_PUBLIC_WEBINAR_ID_20_00 || "83351902482",
  "20:20": process.env.NEXT_PUBLIC_WEBINAR_ID_20_20 || "81579764439",
  "20:40": process.env.NEXT_PUBLIC_WEBINAR_ID_20_40 || "84010459642",
  "21:0": process.env.NEXT_PUBLIC_WEBINAR_ID_21_00 || "88014118083",
  "21:20": process.env.NEXT_PUBLIC_WEBINAR_ID_21_20 || "84741812359",
  "21:40": process.env.NEXT_PUBLIC_WEBINAR_ID_21_40 || "84509036766",
  "22:0": process.env.NEXT_PUBLIC_WEBINAR_ID_22_00 || "88357985730",
  "22:20": process.env.NEXT_PUBLIC_WEBINAR_ID_22_20 || "81461797359",
  "22:40": process.env.NEXT_PUBLIC_WEBINAR_ID_22_40 || "85661956630",
  "23:0": process.env.NEXT_PUBLIC_WEBINAR_ID_23_00 || "83724542857",
  "23:20": process.env.NEXT_PUBLIC_WEBINAR_ID_23_20 || "86553620476",
  "23:40": process.env.NEXT_PUBLIC_WEBINAR_ID_23_40 || "87637581703",
  "0:0": process.env.NEXT_PUBLIC_WEBINAR_ID_0_00 || "81368819394",
};

/**
 * Base templates for all daily webinar slots (every 20 minutes from 9 AM to 12 AM).
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

  // Iterate day-by-day to gather all upcoming slots
  const cursor = new Date(now);
  const maxDays = 7; // Look ahead up to 7 days

  for (let day = 0; day < maxDays; day++) {
    for (const template of webinarTemplates) {
      const occurrence = new Date(cursor);
      occurrence.setHours(template.hour, template.minute, 0, 0);

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
  const [formData, setFormData] = useState<FormState>({ ...initialFormState });
  // Show more sessions in dropdown (e.g., next 20 sessions)
  const [sessions, setSessions] = useState<WebinarSession[]>(() => buildUpcomingSessions(20));
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
  const sessionTimezoneLabel = "PST";

  const resetFormState = useCallback(() => {
    setFormData({ ...initialFormState });
    setTouched({ email: false, first_name: false, last_name: false, session: false });
    const refreshedSessions = buildUpcomingSessions(20);
    setSessions(refreshedSessions);
    setSelectedSessionKey(refreshedSessions[0]?.key || "");
    setError(null);
  }, []);

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
      <section className="relative overflow-hidden py-5 md:py-10 text-white dark:text-white">
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
              <div className="relative w-full max-w-[420px]">
                <div 
                  className="relative w-full h-[700px] border-2 overflow-hidden"
                  style={{ 
                    borderColor: "#d4af37",
                    backgroundColor: "#f3f4f6"
                  }}
                >
                  <Image
                    src={"/images/webinar/paul_webclass.webp"}
                    alt="Speaker"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
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

        {/* Social Proof Notification Popup */}
        <NotificationPopup />
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
                  src={"/images/logo/logo_roadmap.webp"} 
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
