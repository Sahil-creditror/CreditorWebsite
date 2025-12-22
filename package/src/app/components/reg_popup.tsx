"use client";

import { useEffect, useState } from "react";

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
  type: 'person';
};

/**
 * Generate a well-distributed dataset with varied times
 * Ensures each notification has a different time range
 */
const generateNotificationDataset = (): NotificationData[] => {
  const dataset: NotificationData[] = [];
  
  // Create time buckets to ensure variety
  const timeBuckets = [
    // Recent (1-5 minutes) - 30%
    ...Array(60).fill(null).map(() => ({ min: 1, max: 5 })),
    // Recent (5-15 minutes) - 25%
    ...Array(50).fill(null).map(() => ({ min: 5, max: 15 })),
    // Recent (15-30 minutes) - 20%
    ...Array(40).fill(null).map(() => ({ min: 15, max: 30 })),
    // Recent (30-60 minutes) - 15%
    ...Array(30).fill(null).map(() => ({ min: 30, max: 60 })),
    // Hours (1-3 hours) - 5%
    ...Array(10).fill(null).map(() => ({ min: 60, max: 180 })),
    // Hours (3-6 hours) - 3%
    ...Array(6).fill(null).map(() => ({ min: 180, max: 360 })),
    // Hours (6-12 hours) - 1%
    ...Array(2).fill(null).map(() => ({ min: 360, max: 720 })),
    // Days (1-2 days) - 1%
    ...Array(2).fill(null).map(() => ({ min: 1440, max: 2880 })),
  ];
  
  // Shuffle time buckets
  for (let i = timeBuckets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [timeBuckets[i], timeBuckets[j]] = [timeBuckets[j], timeBuckets[i]];
  }
  
  // Generate notifications with distributed times
  for (let i = 0; i < 200; i++) {
    const name = AMERICAN_FIRST_NAMES[Math.floor(Math.random() * AMERICAN_FIRST_NAMES.length)];
    const city = US_CITIES[Math.floor(Math.random() * US_CITIES.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    
    // Get time from bucket
    const bucket = timeBuckets[i % timeBuckets.length];
    const minutesAgo = Math.floor(Math.random() * (bucket.max - bucket.min + 1)) + bucket.min;
    
    dataset.push({ name, city, action, minutesAgo, type: 'person' });
  }
  
  // Final shuffle to randomize order completely
  for (let i = dataset.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataset[i], dataset[j]] = [dataset[j], dataset[i]];
  }
  
  return dataset;
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
 * Registration Notification Popup Component
 * Shows on all pages with varied notification times
 */
export default function RegPopup() {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dataset, setDataset] = useState<NotificationData[]>([]);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Generate dataset with varied times
    setDataset(generateNotificationDataset());
  }, []);

  useEffect(() => {
    if (!mounted || dataset.length === 0) return;
    
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
  }, [mounted, dataset.length]);

  // Don't render until mounted on client
  if (!mounted || dataset.length === 0) {
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
        {/* Person Notification */}
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
      </div>
    </div>
  );
}

