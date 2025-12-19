"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

export default function WebclassSection() {
  const { hours, minutes, seconds } = useCountdown();

  const format = (value: number) => value.toString().padStart(2, "0");

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
                    src={"/images/webinar/paul_formal.webp"}
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

              {/* CTA Button - Link to /webinar */}
              <div className="mb-4">
                <a
                  href="/webinar"
                  className="inline-flex items-center justify-center font-bold text-base md:text-lg px-8 py-4 rounded-lg shadow-lg transition-colors bg-[#FFC107] hover:bg-[#FFD700] text-gray-900"
                  style={{ 
                    fontFamily: "Arial, sans-serif",
                    boxShadow: "0 8px 20px rgba(255, 193, 7, 0.4)"
                  }}
                >
                  Register For The Webclass Now!
                </a>
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
    </>
  );
}
