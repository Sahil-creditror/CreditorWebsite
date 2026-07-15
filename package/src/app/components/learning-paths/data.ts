export type TrackId = "book-smart" | "street-smart";

export type CourseId =
  | "master-class"
  | "become-private"
  | "operate-private"
  | "financial-freedom";

export type ModuleItem = {
  id: number;
  title: string;
  /** Live or recorded session count shown beside lessons */
  sessions: number;
  lessons: number;
};

export type TrackCurriculum = {
  modules: number;
  lessons: number;
  items: ModuleItem[];
};

export type CoursePath = {
  id: CourseId;
  title: string;
  description: string;
  icon: "graduation" | "scale" | "landmark" | "gem";
  hubPath: string;
  bookSmartPath: string;
  streetSmartPath: string;
  bookSmart: TrackCurriculum;
  streetSmart: TrackCurriculum;
};

export const TRACK_ABOUT = {
  "book-smart": {
    label: "Book Smart",
    subtitle: "Live Lessons",
    badge: "Live",
    modeLabel: "live",
    about:
      "What is Book Smart? It is the live-lesson path. You learn with instructors in real time — ask questions, get feedback, and follow a structured weekly schedule.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883452/creditor-website-assets/images/courses/become/trainingnew.webp",
  },
  "street-smart": {
    label: "Street Smart",
    subtitle: "Recorded Lectures",
    badge: "On-Demand",
    modeLabel: "recorded",
    about:
      "What is Street Smart? It is the recorded-lecture path. Study on your own time, replay any module, and master strategies whenever it fits your schedule.",
    image:
      "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883414/creditor-website-assets/images/courses/become/learning.webp",
  },
} as const;

export const COURSE_PATHS: Record<CourseId, CoursePath> = {
  "master-class": {
    id: "master-class",
    title: "Master Class",
    description:
      "Build sovereignty, business trusts, credit systems, and private financial infrastructure.",
    icon: "graduation",
    hubPath: "/master-class",
    bookSmartPath: "/master-class/book-smart",
    streetSmartPath: "/master-class/street-smart",
    bookSmart: {
      modules: 3,
      lessons: 26,
      items: [
        { id: 1, title: "Step 1", sessions: 17, lessons: 17 },
        { id: 2, title: "Step 2", sessions: 5, lessons: 5 },
        { id: 3, title: "Step 3", sessions: 4, lessons: 4 },
      ],
    },
    streetSmart: {
      modules: 3,
      lessons: 26,
      items: [
        { id: 1, title: "Step 1", sessions: 17, lessons: 17 },
        { id: 2, title: "Step 2", sessions: 5, lessons: 5 },
        { id: 3, title: "Step 3", sessions: 4, lessons: 4 },
      ],
    },
  },

  "become-private": {
    id: "become-private",
    title: "Become Private + SOV 101",
    description:
      "Master sovereignty principles, secured party creditor status, and political status correction.",
    icon: "scale",
    hubPath: "/become-private",
    bookSmartPath: "/become-private/book-smart",
    streetSmartPath: "/become-private/street-smart",
    bookSmart: {
      modules: 3,
      lessons: 127,
      items: [
        { id: 1, title: "SOV 101", sessions: 1, lessons: 43 },
        {
          id: 2,
          title: "Become Private – SPC (Secured Party Creditor)",
          sessions: 15,
          lessons: 44,
        },
        {
          id: 3,
          title: "Become Private – Status Correction",
          sessions: 13,
          lessons: 40,
        },
      ],
    },
    streetSmart: {
      modules: 3,
      lessons: 74,
      items: [
        { id: 1, title: "SOV 101", sessions: 7, lessons: 30 },
        {
          id: 2,
          title: "Become Private – SPC (Secured Party Creditor)",
          sessions: 32,
          lessons: 32,
        },
        {
          id: 3,
          title: "Become Private – Status Correction",
          sessions: 12,
          lessons: 12,
        },
      ],
    },
  },

  "operate-private": {
    id: "operate-private",
    title: "Operate Private",
    description:
      "Operate trusts, PMAs, and real estate structures at a professional level with full legal footing.",
    icon: "landmark",
    hubPath: "/operate-private",
    bookSmartPath: "/operate-private/book-smart",
    streetSmartPath: "/operate-private/street-smart",
    bookSmart: {
      modules: 3,
      lessons: 124,
      items: [
        { id: 1, title: "Business Trust", sessions: 16, lessons: 40 },
        {
          id: 2,
          title: "PMA (Private Membership Association)",
          sessions: 10,
          lessons: 44,
        },
        {
          id: 3,
          title: "Real Estate Through Trusts",
          sessions: 5,
          lessons: 40,
        },
      ],
    },
    streetSmart: {
      modules: 3,
      lessons: 32,
      items: [
        { id: 1, title: "Business Trust", sessions: 20, lessons: 20 },
        {
          id: 2,
          title: "PMA (Private Membership Association)",
          sessions: 9,
          lessons: 9,
        },
        {
          id: 3,
          title: "Real Estate Through Trusts",
          sessions: 3,
          lessons: 3,
        },
      ],
    },
  },

  "financial-freedom": {
    id: "financial-freedom",
    title: "Financial Freedom",
    description:
      "Court remedies, business credit mastery, and PMA-based financial independence.",
    icon: "gem",
    hubPath: "/financial-freedom",
    bookSmartPath: "/financial-freedom/book-smart",
    streetSmartPath: "/financial-freedom/street-smart",
    bookSmart: {
      modules: 3,
      lessons: 107,
      items: [
        { id: 1, title: "I Want Remedy Now", sessions: 13, lessons: 27 },
        {
          id: 2,
          title: "Financial Freedom – Business Credit",
          sessions: 19,
          lessons: 40,
        },
        { id: 3, title: "Business Credit (PMA)", sessions: 3, lessons: 40 },
      ],
    },
    streetSmart: {
      modules: 3,
      lessons: 71,
      items: [
        { id: 1, title: "I Want Remedy Now", sessions: 25, lessons: 25 },
        {
          id: 2,
          title: "Financial Freedom – Business Credit",
          sessions: 29,
          lessons: 29,
        },
        { id: 3, title: "Business Credit (PMA)", sessions: 17, lessons: 17 },
      ],
    },
  },
};

export function getCoursePath(id: CourseId): CoursePath {
  return COURSE_PATHS[id];
}

export function getTrackCurriculum(course: CoursePath, track: TrackId) {
  return track === "book-smart" ? course.bookSmart : course.streetSmart;
}
