export interface WebinarConfig {
  id: string; // Selection key, e.g. "become-private"
  name: string; // Display name
  hours: number[]; // Active PST hours in the 24-hour daily rotation
  videoFileId: string; // Google Drive Video ID for "In a Hurry?" recordings
  recordingRoute: string; // Dedicated route path
  description: string;
  themeColor: string; // Hex or tailwind color info
  accentColor: string;
}

export const WEBINARS: WebinarConfig[] = [
  {
    id: "become-private",
    name: "Become Private",
    hours: [9, 12, 15, 18, 21, 0, 3],
    videoFileId: process.env.NEXT_PUBLIC_VIDEO_BECOME_PRIVATE || "1sF-wv4jAOGyzXxAxyQyAy3OkcKx31v5C",
    recordingRoute: "/webinar-recording/become-private",
    description: "Reclaim your status and exit the public system.",
    themeColor: "#2563eb", // Blue
    accentColor: "#f5a623",
  },
  {
    id: "operate-private",
    name: "Operate Private",
    hours: [10, 13, 16, 19, 22, 1],
    videoFileId: process.env.NEXT_PUBLIC_VIDEO_OPERATE_PRIVATE || "16amloPkyMzG5E5jlEzMvRiChk2TnUI3R",
    recordingRoute: "/webinar-recording/operate-private",
    description: "Build wealth and privacy through private business structures.",
    themeColor: "#0f172a", // Slate/Dark Blue
    accentColor: "#f5a623",
  },
  {
    id: "financial-freedom",
    name: "Financial Freedom",
    hours: [11, 14, 17, 20, 23, 2],
    videoFileId: process.env.NEXT_PUBLIC_VIDEO_FINANCIAL_FREEDOM || "189tBsfzVc7q3Xa-I16ZQ_mHmwZqW1U9K",
    recordingRoute: "/webinar-recording/financial-freedom",
    description: "Master sovereign wealth and build assets outside the traditional system.",
    themeColor: "#047857", // Green
    accentColor: "#10b981",
  },
];

/**
 * Returns the active webinar config for a given hour PST (0-23).
 * Returns null if the hour is outside the active 9:00 AM - 3:00 AM window.
 */
export function getWebinarForHour(hour: number): WebinarConfig | null {
  if (hour < 0 || hour > 23) return null;
  
  // Inactive hours are 4 AM, 5 AM, 6 AM, 7 AM, 8 AM.
  if (hour >= 4 && hour <= 8) return null;

  // Offset from 9:00 AM PST:
  // H = 9..23 -> H - 9
  // H = 0..3 -> H + 15
  const offset = hour >= 9 ? hour - 9 : hour + 15;
  const index = offset % 3;
  return WEBINARS[index] || null;
}

/**
 * Returns the hourly schedule (24h PST format) for a given course ID.
 */
export function getCourseHours(courseId: string): number[] {
  const course = WEBINARS.find((w) => w.id === courseId);
  return course ? course.hours : [];
}
