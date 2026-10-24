import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export type PageSeoEntry = {
  title: string;
  description: string;
  keywords?: string[];
};

const DEFAULT_KEYWORDS = [
  "creditor academy",
  "business trust course",
  "asset protection",
  "private wealth strategies",
  "business credit",
  "financial freedom",
  "become private",
  "operate private",
  "masterclass membership",
];

const PAGE_SEO: Record<string, PageSeoEntry> = {
  "/": {
    title: "Creditor Academy | Business Trust & Asset Protection | Creditor Academy",
    description:
      "Learn business trusts, asset protection, business credit and private wealth strategies in the Creditor Academy Masterclass. Join a free webinar today.",
    keywords: [
      "creditor academy",
      "business trust course",
      "asset protection",
      "private wealth strategies",
      "business credit",
      "credit repair",
      "private membership association",
      "financial freedom",
      "masterclass membership",
    ],
  },
  "/about-us": {
    title: "About Creditor Academy | Our Mission & Instructor | Creditor Academy",
    description:
      "Meet Creditor Academy and founder PaulMichael Rowland. Our mission: make business trusts, asset protection and private wealth education accessible.",
    keywords: [
      "about creditor academy",
      "paulmichael rowland",
      "financial education",
      "asset protection education",
      "our mission",
      "creditor academy",
    ],
  },
  "/about": {
    title: "About Creditor Academy | Our Story & Mission | Creditor Academy",
    description:
      "Discover the story behind Creditor Academy and how our Masterclass helps students learn business trusts, asset protection and private wealth strategies.",
    keywords: ["about creditor academy", "creditor academy story", "financial education company", "creditor academy"],
  },
  "/Blogs": {
    title: "Creditor Academy Blog | Trusts, Credit & Wealth Insights | Creditor Academy",
    description:
      "Read Creditor Academy articles on business trusts, asset protection, business credit and private wealth strategies. Practical tips from our team.",
    keywords: [
      "creditor academy blog",
      "business trust articles",
      "asset protection tips",
      "business credit blog",
      "wealth building articles",
      "creditor academy",
    ],
  },
  "/become-private": {
    title: "Become Private Course Catalog | Creditor Academy",
    description:
      "Explore Become Private: status correction principles, essential lawful documents and the first steps toward financial sovereignty with Creditor Academy.",
    keywords: [
      "become private",
      "status correction",
      "lawful documents",
      "financial sovereignty",
      "private status course",
      "creditor academy",
    ],
  },
  "/become-private/book-smart": {
    title: "Become Private Book Smart Lessons | Creditor Academy",
    description:
      "Study the Become Private fundamentals in the Book Smart track: lessons on status correction, lawful documents and private status.",
    keywords: ["become private", "book smart lessons", "status correction", "lawful documents", "private status", "creditor academy"],
  },
  "/become-private/street-smart": {
    title: "Become Private Street Smart Training | Creditor Academy",
    description:
      "Apply Become Private lessons with step-by-step, real-world training in the Street Smart track from Creditor Academy.",
    keywords: ["become private", "street smart training", "practical training", "private status", "creditor academy"],
  },
  "/become-private/sov-101": {
    title: "Sovereignty 101 Course | Creditor Academy",
    description:
      "Explore the Sovereignty 101 course: private status and sovereignty basics. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["sovereignty 101", "financial sovereignty", "become private", "private status", "lawful identity", "creditor academy"],
  },
  "/become-private/sov-101/book-smart": {
    title: "Sovereignty 101 Book Smart Lessons | Creditor Academy",
    description:
      "Study private status and sovereignty basics in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: [
      "sovereignty 101",
      "financial sovereignty",
      "become private",
      "private status",
      "lawful identity",
      "book smart lessons",
      "creditor academy",
    ],
  },
  "/become-private/sov-101/street-smart": {
    title: "Sovereignty 101 Street Smart Training | Creditor Academy",
    description:
      "Put private status and sovereignty basics into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: [
      "sovereignty 101",
      "financial sovereignty",
      "become private",
      "private status",
      "lawful identity",
      "street smart training",
      "creditor academy",
    ],
  },
  "/become-private/spc": {
    title: "SPC Course Course | Creditor Academy",
    description:
      "Explore the SPC Course course: the SPC program within the Become Private catalog. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["spc course", "become private", "private status course", "creditor academy courses", "creditor academy"],
  },
  "/become-private/spc/book-smart": {
    title: "SPC Course Book Smart Lessons | Creditor Academy",
    description:
      "Study the SPC program within the Become Private catalog in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["spc course", "become private", "private status course", "creditor academy courses", "book smart lessons", "creditor academy"],
  },
  "/become-private/spc/street-smart": {
    title: "SPC Course Street Smart Training | Creditor Academy",
    description:
      "Put the SPC program within the Become Private catalog into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["spc course", "become private", "private status course", "creditor academy courses", "street smart training", "creditor academy"],
  },
  "/become-private/status-correction": {
    title: "Status Correction Course | Creditor Academy",
    description:
      "Explore the Status Correction course: status correction and lawful documents. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["status correction", "become private", "lawful documents", "status correction course", "creditor academy"],
  },
  "/become-private/status-correction/book-smart": {
    title: "Status Correction Book Smart Lessons | Creditor Academy",
    description:
      "Study status correction and lawful documents in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["status correction", "become private", "lawful documents", "status correction course", "book smart lessons", "creditor academy"],
  },
  "/become-private/status-correction/street-smart": {
    title: "Status Correction Street Smart Training | Creditor Academy",
    description:
      "Put status correction and lawful documents into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["status correction", "become private", "lawful documents", "status correction course", "street smart training", "creditor academy"],
  },
  "/become-wonder": {
    title: "Become Private | Creditor Academy",
    description:
      "Start your Become Private journey with Creditor Academy: learn status correction, lawful documents and the foundations of financial sovereignty.",
    keywords: ["become private", "creditor academy", "financial sovereignty", "private status", "creditor academy"],
  },
  "/become": {
    title: "Become Private Program | Creditor Academy",
    description:
      "Begin the Become Private program: learn the foundations of private status and financial sovereignty with Creditor Academy's Masterclass.",
    keywords: ["become private program", "financial sovereignty", "private status course", "creditor academy"],
  },
  "/bootcamp": {
    title: "Creditor Academy Bootcamp | Intensive Wealth Training | Creditor Academy",
    description:
      "Join the Creditor Academy bootcamp for intensive, hands-on training in business trusts, asset protection and private business credit.",
    keywords: ["creditor academy bootcamp", "business trust bootcamp", "asset protection training", "intensive financial course", "creditor academy"],
  },
  "/contact": {
    title: "Contact Creditor Academy | Talk to Our Team | Creditor Academy",
    description:
      "Questions about courses or membership? Contact the Creditor Academy team by email, phone or message. Open 9 AM to 5 PM EST, Monday to Friday.",
    keywords: ["contact creditor academy", "creditor academy support", "creditor academy phone", "creditor academy email", "creditor academy"],
  },
  "/course-tnc": {
    title: "Course Terms & Conditions | Creditor Academy",
    description:
      "Read the Creditor Academy course terms and conditions covering enrollment, access, payments and student responsibilities.",
    keywords: ["course terms and conditions", "creditor academy terms", "course enrollment terms", "creditor academy"],
  },
  "/documentation": {
    title: "Documentation & Guides | Creditor Academy",
    description:
      "Find Creditor Academy documentation, guides and reference material to help you get the most from your courses and membership.",
    keywords: ["creditor academy documentation", "course guides", "student resources", "help center", "creditor academy"],
  },
  "/ebooks": {
    title: "Free eBooks on Trusts & Asset Protection | Creditor Academy",
    description:
      "Download Creditor Academy eBooks on business trusts, asset protection, business credit and private wealth strategies.",
    keywords: ["creditor academy ebooks", "business trust ebook", "asset protection ebook", "wealth building ebook", "creditor academy"],
  },
  "/enterprise-tnc": {
    title: "Enterprise Terms & Conditions | Creditor Academy",
    description:
      "Review the Creditor Academy enterprise terms and conditions that apply to business and team accounts and services.",
    keywords: ["enterprise terms and conditions", "creditor academy enterprise", "business account terms", "creditor academy"],
  },
  "/event-registration": {
    title: "Event Registration | Creditor Academy",
    description:
      "Register for upcoming Creditor Academy events and live trainings. Reserve your seat and learn from founder PaulMichael Rowland.",
    keywords: ["creditor academy events", "event registration", "live training", "financial education events", "creditor academy"],
  },
  "/financial-freedom": {
    title: "Financial Freedom Course Catalog | Creditor Academy",
    description:
      "Master capital and credit: private business credit, personal credit repair and funding strategies in the Financial Freedom catalog.",
    keywords: ["financial freedom course", "business credit", "personal credit repair", "credit card stacking", "funding strategies", "creditor academy"],
  },
  "/financial-freedom/book-smart": {
    title: "Financial Freedom Book Smart Lessons | Creditor Academy",
    description:
      "Study financial freedom fundamentals in the Book Smart track: business credit, funding and credit repair lessons from Creditor Academy.",
    keywords: ["financial freedom", "business credit", "credit repair", "funding", "book smart lessons", "creditor academy"],
  },
  "/financial-freedom/street-smart": {
    title: "Financial Freedom Street Smart Training | Creditor Academy",
    description:
      "Apply credit and funding strategies with step-by-step, real-world training in the Financial Freedom Street Smart track.",
    keywords: ["financial freedom", "street smart training", "business credit", "credit repair", "creditor academy"],
  },
  "/financial-freedom/business-credit": {
    title: "Business Credit Course | Creditor Academy",
    description:
      "Explore the Business Credit course: building private business credit and funding. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["business credit course", "build business credit", "business funding", "financial freedom", "creditor academy"],
  },
  "/financial-freedom/business-credit/book-smart": {
    title: "Business Credit Book Smart Lessons | Creditor Academy",
    description:
      "Study building private business credit and funding in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["business credit course", "build business credit", "business funding", "financial freedom", "book smart lessons", "creditor academy"],
  },
  "/financial-freedom/business-credit/street-smart": {
    title: "Business Credit Street Smart Training | Creditor Academy",
    description:
      "Put building private business credit and funding into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["business credit course", "build business credit", "business funding", "financial freedom", "street smart training", "creditor academy"],
  },
  "/financial-freedom/business-credit-pma": {
    title: "Business Credit PMA Course | Creditor Academy",
    description:
      "Explore the Business Credit PMA course: business credit for PMAs. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["business credit pma", "private membership association credit", "business funding", "financial freedom", "creditor academy"],
  },
  "/financial-freedom/business-credit-pma/book-smart": {
    title: "Business Credit PMA Book Smart Lessons | Creditor Academy",
    description:
      "Study business credit for PMAs in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["business credit pma", "private membership association credit", "business funding", "financial freedom", "book smart lessons", "creditor academy"],
  },
  "/financial-freedom/business-credit-pma/street-smart": {
    title: "Business Credit PMA Street Smart Training | Creditor Academy",
    description:
      "Put business credit for PMAs into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["business credit pma", "private membership association credit", "business funding", "financial freedom", "street smart training", "creditor academy"],
  },
  "/financial-freedom/remedy-now": {
    title: "Remedy Now Course | Creditor Academy",
    description:
      "Explore the Remedy Now course: personal credit repair and practical remedies. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["remedy now", "credit repair course", "personal credit repair", "financial freedom", "creditor academy"],
  },
  "/financial-freedom/remedy-now/book-smart": {
    title: "Remedy Now Book Smart Lessons | Creditor Academy",
    description:
      "Study personal credit repair and practical remedies in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["remedy now", "credit repair course", "personal credit repair", "financial freedom", "book smart lessons", "creditor academy"],
  },
  "/financial-freedom/remedy-now/street-smart": {
    title: "Remedy Now Street Smart Training | Creditor Academy",
    description:
      "Put personal credit repair and practical remedies into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["remedy now", "credit repair course", "personal credit repair", "financial freedom", "street smart training", "creditor academy"],
  },
  "/learning-journey": {
    title: "Your Learning Journey | Creditor Academy Roadmap",
    description:
      "Follow the Creditor Academy learning journey from Become Private to Operate Private to Financial Freedom. See each step of the roadmap.",
    keywords: ["learning journey", "creditor academy roadmap", "course roadmap", "financial education path", "creditor academy"],
  },
  "/master-class": {
    title: "Creditor Academy Masterclass | 3-Step Program | Creditor Academy",
    description:
      "Join the Creditor Academy Masterclass: a 3-step program on business trusts, asset protection and private wealth. Learn live and on demand.",
    keywords: ["creditor academy masterclass", "business trust masterclass", "asset protection masterclass", "private wealth program", "creditor academy"],
  },
  "/master-class/book-smart": {
    title: "Masterclass Book Smart Lessons | Creditor Academy",
    description:
      "Study the Creditor Academy Masterclass in the Book Smart track: structured lessons on trusts, asset protection and private wealth.",
    keywords: ["masterclass lessons", "book smart", "business trusts", "asset protection", "private wealth", "creditor academy"],
  },
  "/master-class/street-smart": {
    title: "Masterclass Street Smart Training | Creditor Academy",
    description:
      "Apply the Masterclass with step-by-step, real-world training in the Street Smart track from Creditor Academy.",
    keywords: ["masterclass", "street smart training", "practical training", "private wealth", "creditor academy"],
  },
  "/master-class/step-1": {
    title: "Masterclass Step 1 Course | Creditor Academy",
    description:
      "Explore the Masterclass Step 1 course: the first step of the Creditor Academy Masterclass. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["masterclass step 1", "creditor academy masterclass", "financial education", "private wealth", "creditor academy"],
  },
  "/master-class/step-1/book-smart": {
    title: "Masterclass Step 1 Book Smart Lessons | Creditor Academy",
    description:
      "Study the first step of the Creditor Academy Masterclass in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["masterclass step 1", "creditor academy masterclass", "financial education", "private wealth", "book smart lessons", "creditor academy"],
  },
  "/master-class/step-1/street-smart": {
    title: "Masterclass Step 1 Street Smart Training | Creditor Academy",
    description:
      "Put the first step of the Creditor Academy Masterclass into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["masterclass step 1", "creditor academy masterclass", "financial education", "private wealth", "street smart training", "creditor academy"],
  },
  "/master-class/step-2": {
    title: "Masterclass Step 2 Course | Creditor Academy",
    description:
      "Explore the Masterclass Step 2 course: the second step of the Creditor Academy Masterclass. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["masterclass step 2", "creditor academy masterclass", "financial education", "private wealth", "creditor academy"],
  },
  "/master-class/step-2/book-smart": {
    title: "Masterclass Step 2 Book Smart Lessons | Creditor Academy",
    description:
      "Study the second step of the Creditor Academy Masterclass in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["masterclass step 2", "creditor academy masterclass", "financial education", "private wealth", "book smart lessons", "creditor academy"],
  },
  "/master-class/step-2/street-smart": {
    title: "Masterclass Step 2 Street Smart Training | Creditor Academy",
    description:
      "Put the second step of the Creditor Academy Masterclass into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["masterclass step 2", "creditor academy masterclass", "financial education", "private wealth", "street smart training", "creditor academy"],
  },
  "/master-class/step-3": {
    title: "Masterclass Step 3 Course | Creditor Academy",
    description:
      "Explore the Masterclass Step 3 course: the third step of the Creditor Academy Masterclass. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["masterclass step 3", "creditor academy masterclass", "financial education", "private wealth", "creditor academy"],
  },
  "/master-class/step-3/book-smart": {
    title: "Masterclass Step 3 Book Smart Lessons | Creditor Academy",
    description:
      "Study the third step of the Creditor Academy Masterclass in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["masterclass step 3", "creditor academy masterclass", "financial education", "private wealth", "book smart lessons", "creditor academy"],
  },
  "/master-class/step-3/street-smart": {
    title: "Masterclass Step 3 Street Smart Training | Creditor Academy",
    description:
      "Put the third step of the Creditor Academy Masterclass into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["masterclass step 3", "creditor academy masterclass", "financial education", "private wealth", "street smart training", "creditor academy"],
  },
  "/masterclass-membership": {
    title: "Masterclass Membership | Join Creditor Academy | Creditor Academy",
    description:
      "Become a Creditor Academy member: unlock premium courses, daily live masterclasses and a private community focused on financial freedom.",
    keywords: ["masterclass membership", "creditor academy membership", "join creditor academy", "online financial courses", "creditor academy"],
  },
  "/membership": {
    title: "Creditor Academy Membership | Courses & Community | Creditor Academy",
    description:
      "Join the Creditor Academy membership for premium courses, daily live classes and a community of members building private wealth.",
    keywords: ["creditor academy membership", "financial education membership", "live masterclass", "member community", "creditor academy"],
  },
  "/operate-private": {
    title: "Operate Private Course Catalog | Creditor Academy",
    description:
      "Build and protect wealth with Operate Private: unincorporated business trusts, Private Membership Associations and family legacy planning.",
    keywords: ["operate private", "business trusts", "private membership association", "asset protection", "legacy planning", "creditor academy"],
  },
  "/operate-private/book-smart": {
    title: "Operate Private Book Smart Lessons | Creditor Academy",
    description:
      "Study Operate Private fundamentals in the Book Smart track: business trusts, PMAs, real estate and family legacy planning.",
    keywords: ["operate private", "book smart lessons", "business trusts", "private membership association", "legacy planning", "creditor academy"],
  },
  "/operate-private/street-smart": {
    title: "Operate Private Street Smart Training | Creditor Academy",
    description:
      "Apply Operate Private strategies with step-by-step, real-world training in the Street Smart track from Creditor Academy.",
    keywords: ["operate private", "street smart training", "business trust", "pma", "real estate", "creditor academy"],
  },
  "/operate-private/business-trust": {
    title: "Business Trust Course | Creditor Academy",
    description:
      "Explore the Business Trust course: unincorporated business trusts and asset protection. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["business trust course", "unincorporated business trust", "asset protection", "operate private", "creditor academy"],
  },
  "/operate-private/business-trust/book-smart": {
    title: "Business Trust Book Smart Lessons | Creditor Academy",
    description:
      "Study unincorporated business trusts and asset protection in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["business trust course", "unincorporated business trust", "asset protection", "operate private", "book smart lessons", "creditor academy"],
  },
  "/operate-private/business-trust/street-smart": {
    title: "Business Trust Street Smart Training | Creditor Academy",
    description:
      "Put unincorporated business trusts and asset protection into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["business trust course", "unincorporated business trust", "asset protection", "operate private", "street smart training", "creditor academy"],
  },
  "/operate-private/pma": {
    title: "PMA Formation Course | Creditor Academy",
    description:
      "Explore the PMA Formation course: forming and running a PMA. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["private membership association", "pma course", "pma formation", "operate private", "creditor academy"],
  },
  "/operate-private/pma/book-smart": {
    title: "PMA Formation Book Smart Lessons | Creditor Academy",
    description:
      "Study forming and running a PMA in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["private membership association", "pma course", "pma formation", "operate private", "book smart lessons", "creditor academy"],
  },
  "/operate-private/pma/street-smart": {
    title: "PMA Formation Street Smart Training | Creditor Academy",
    description:
      "Put forming and running a PMA into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["private membership association", "pma course", "pma formation", "operate private", "street smart training", "creditor academy"],
  },
  "/operate-private/real-estate": {
    title: "Private Real Estate Course | Creditor Academy",
    description:
      "Explore the Private Real Estate course: holding and managing real estate privately. Part of the Creditor Academy catalog. View lessons and enroll.",
    keywords: ["private real estate", "real estate trust", "asset protection", "operate private", "creditor academy"],
  },
  "/operate-private/real-estate/book-smart": {
    title: "Private Real Estate Book Smart Lessons | Creditor Academy",
    description:
      "Study holding and managing real estate privately in the Book Smart track: structured lessons, key concepts and guides from Creditor Academy.",
    keywords: ["private real estate", "real estate trust", "asset protection", "operate private", "book smart lessons", "creditor academy"],
  },
  "/operate-private/real-estate/street-smart": {
    title: "Private Real Estate Street Smart Training | Creditor Academy",
    description:
      "Put holding and managing real estate privately into practice in the Street Smart track: step-by-step, real-world training from Creditor Academy.",
    keywords: ["private real estate", "real estate trust", "asset protection", "operate private", "street smart training", "creditor academy"],
  },
  "/operate-wonder": {
    title: "Operate Private | Creditor Academy",
    description:
      "Learn to operate privately: build and manage business trusts and Private Membership Associations with Creditor Academy.",
    keywords: ["operate private", "business trust", "private membership association", "creditor academy"],
  },
  "/operate": {
    title: "Operate Private Program | Creditor Academy",
    description:
      "Begin the Operate Private program: business trusts, PMAs and asset protection strategies taught by Creditor Academy.",
    keywords: ["operate private program", "business trusts", "pma", "asset protection", "creditor academy"],
  },
  "/pmaform": {
    title: "PMA Form | Creditor Academy",
    description:
      "Complete the Creditor Academy Private Membership Association (PMA) form to begin your submission with our team.",
    keywords: ["pma form", "private membership association form", "creditor academy pma", "creditor academy"],
  },
  "/pma-submissions": {
    title: "PMA Submissions | Creditor Academy",
    description:
      "Track and manage your Private Membership Association (PMA) submissions with Creditor Academy.",
    keywords: ["pma submissions", "private membership association", "creditor academy"],
  },
  "/privacy-policy": {
    title: "Privacy Policy | Creditor Academy",
    description:
      "Read the Creditor Academy privacy policy to learn how we collect, use and protect your personal information.",
    keywords: ["privacy policy", "creditor academy privacy", "data protection", "creditor academy"],
  },
  "/private-wonder": {
    title: "Private | Creditor Academy",
    description:
      "Explore the private education tracks at Creditor Academy: Become Private, Operate Private and Financial Freedom.",
    keywords: ["private education", "creditor academy", "become private", "operate private", "creditor academy"],
  },
  "/private": {
    title: "Private Education Tracks | Creditor Academy",
    description:
      "Explore Creditor Academy's private education tracks to learn status, trusts, asset protection and business credit.",
    keywords: ["private education", "creditor academy courses", "financial education tracks", "creditor academy"],
  },
  "/projects": {
    title: "Course Projects | Creditor Academy",
    description:
      "Browse Creditor Academy projects and course tracks on business trusts, asset protection and financial freedom.",
    keywords: ["creditor academy projects", "course tracks", "financial freedom courses", "creditor academy"],
  },
  "/projects-wonder": {
    title: "Course Projects | Creditor Academy",
    description:
      "Browse Creditor Academy course projects covering status, trusts, asset protection and business credit.",
    keywords: ["creditor academy projects", "course projects", "financial education", "creditor academy"],
  },
  "/return-refund": {
    title: "Return & Refund Policy | Creditor Academy",
    description:
      "Review the Creditor Academy return and refund policy for courses, memberships and services before you purchase.",
    keywords: ["refund policy", "return policy", "creditor academy refunds", "creditor academy"],
  },
  "/services": {
    title: "Services | Creditor Academy",
    description:
      "Explore Creditor Academy services: course catalogs, live classes, private merchant solutions, website services and the Tradeline Exchange.",
    keywords: ["creditor academy services", "course catalog", "live class", "website services", "tradeline exchange", "creditor academy"],
  },
  "/services/course-cataloges": {
    title: "Course Catalog | Creditor Academy Programs",
    description:
      "Browse the Creditor Academy course catalog: Become Private, Operate Private and Financial Freedom programs with full syllabi.",
    keywords: ["creditor academy course catalog", "financial courses", "business trust courses", "online wealth courses", "creditor academy"],
  },
  "/services/course-cataloges/become-private": {
    title: "Become Private Syllabus | Creditor Academy",
    description:
      "View the Become Private syllabus: status correction principles, essential lawful documents and the path to financial sovereignty.",
    keywords: ["become private syllabus", "status correction", "lawful documents", "course syllabus", "creditor academy"],
  },
  "/services/course-cataloges/financial-freedom": {
    title: "Financial Freedom Syllabus | Creditor Academy",
    description:
      "View the Financial Freedom syllabus: private business credit, personal credit repair and credit card stacking strategies.",
    keywords: ["financial freedom syllabus", "business credit", "credit repair", "credit card stacking", "creditor academy"],
  },
  "/services/course-cataloges/operate-private": {
    title: "Operate Private Syllabus | Creditor Academy",
    description:
      "View the Operate Private syllabus: unincorporated business trusts, Private Membership Associations and family legacy planning.",
    keywords: ["operate private syllabus", "business trusts", "private membership association", "legacy planning", "creditor academy"],
  },
  "/services/live-class": {
    title: "Live Classes | Creditor Academy",
    description:
      "Attend daily live classes with Creditor Academy: ask questions and learn business trusts, asset protection and credit in real time.",
    keywords: ["live class", "creditor academy live classes", "online financial classes", "daily masterclass", "creditor academy"],
  },
  "/services/private-merchant": {
    title: "Private Merchant Services | Creditor Academy",
    description:
      "Set up private merchant solutions with Creditor Academy to accept payments and run your private business with confidence.",
    keywords: ["private merchant services", "merchant account", "accept payments", "private business", "creditor academy"],
  },
  "/services/website-service": {
    title: "Website Services for Your Business | Creditor Academy",
    description:
      "Get professional website services from Creditor Academy: design and build a site for your private business or association.",
    keywords: ["website services", "business website design", "private business website", "creditor academy"],
  },
  "/certs": {
    title: "Certificates & Credentials | Creditor Academy",
    description:
      "View and verify Creditor Academy course certificates and credentials earned by students.",
    keywords: ["creditor academy certificates", "course certificates", "verify certificate", "creditor academy"],
  },
  "/services/tradeline-exchange": {
    title: "Tradeline Exchange | Buy & Sell Tradelines Online | Creditor Academy",
    description:
      "Buy and sell tradelines on the Creditor Academy Tradeline Exchange, a secure marketplace with guides, a guarantee and support.",
    keywords: ["tradeline exchange", "buy tradelines", "sell tradelines", "tradeline marketplace", "tradeline broker", "creditor academy"],
  },
  "/services/tradeline-exchange/about": {
    title: "About the Tradeline Exchange | Creditor Academy",
    description:
      "Learn about the Creditor Academy Tradeline Exchange, a marketplace connecting tradeline buyers and sellers.",
    keywords: ["tradeline exchange", "about tradeline exchange", "tradeline marketplace", "creditor academy"],
  },
  "/services/tradeline-exchange/brokers": {
    title: "Tradeline Brokers | Creditor Academy Exchange",
    description:
      "Become or find a tradeline broker on the Creditor Academy Tradeline Exchange. Learn how brokers work with buyers and sellers.",
    keywords: ["tradeline brokers", "become a tradeline broker", "tradeline exchange", "broker program", "creditor academy"],
  },
  "/services/tradeline-exchange/buy-tradelines": {
    title: "Buy Tradelines | Creditor Academy Exchange",
    description:
      "Browse and buy tradelines on the Creditor Academy Tradeline Exchange. Compare options and add them to your cart.",
    keywords: ["buy tradelines", "tradelines for sale", "authorized user tradelines", "tradeline exchange", "creditor academy"],
  },
  "/services/tradeline-exchange/cart": {
    title: "Your Cart | Tradeline Exchange | Creditor Academy",
    description:
      "Review the tradelines in your cart before checkout on the Creditor Academy Tradeline Exchange.",
    keywords: ["tradeline cart", "shopping cart", "creditor academy"],
  },
  "/services/tradeline-exchange/checkout": {
    title: "Checkout | Tradeline Exchange | Creditor Academy",
    description:
      "Complete your tradeline purchase securely at checkout on the Creditor Academy Tradeline Exchange.",
    keywords: ["tradeline checkout", "secure checkout", "creditor academy"],
  },
  "/services/tradeline-exchange/contact": {
    title: "Contact the Tradeline Exchange | Creditor Academy",
    description:
      "Contact the Creditor Academy Tradeline Exchange team with questions about buying, selling or an existing order.",
    keywords: ["tradeline exchange contact", "tradeline support", "order help", "creditor academy"],
  },
  "/services/tradeline-exchange/features": {
    title: "Tradeline Exchange Features | Creditor Academy",
    description:
      "Explore Tradeline Exchange features: a secure marketplace, clear listings, order tracking and support for buyers and sellers.",
    keywords: ["tradeline exchange features", "tradeline marketplace", "buy and sell tradelines", "creditor academy"],
  },
  "/services/tradeline-exchange/my-account": {
    title: "My Account | Tradeline Exchange | Creditor Academy",
    description:
      "Sign in to manage your Tradeline Exchange orders, listings and account details.",
    keywords: ["tradeline account", "my account", "order history", "creditor academy"],
  },
  "/services/tradeline-exchange/resources": {
    title: "Tradeline Resources | Creditor Academy Exchange",
    description:
      "Access Tradeline Exchange resources: buyer's guide, FAQs, calculator, how to order and how to report non-posting.",
    keywords: ["tradeline resources", "tradeline guides", "tradeline faqs", "tradeline calculator", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/buyers-guide": {
    title: "Tradeline Buyer's Guide | Creditor Academy",
    description:
      "Read the buyer's guide to tradelines: how they work, what to look for and how to order with confidence.",
    keywords: ["tradeline buyers guide", "how to buy tradelines", "tradeline tips", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/guarantee": {
    title: "Tradeline Guarantee | Creditor Academy Exchange",
    description:
      "See the Tradeline Exchange guarantee and what protections apply to your tradeline orders.",
    keywords: ["tradeline guarantee", "tradeline money back guarantee", "order protection", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/calculator": {
    title: "Tradeline Calculator | Creditor Academy Exchange",
    description:
      "Use the tradeline calculator to estimate costs and plan your order on the Creditor Academy Tradeline Exchange.",
    keywords: ["tradeline calculator", "tradeline cost calculator", "credit tools", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/faqs": {
    title: "Tradeline FAQs | Creditor Academy Exchange",
    description:
      "Find answers to common questions about buying, selling and posting tradelines on the Creditor Academy Tradeline Exchange.",
    keywords: ["tradeline faqs", "tradeline questions", "how tradelines work", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/how-to-order": {
    title: "How to Order Tradelines | Creditor Academy",
    description:
      "Follow the step-by-step guide to ordering tradelines on the Creditor Academy Tradeline Exchange, from selection to checkout.",
    keywords: ["how to order tradelines", "tradeline ordering guide", "tradeline checkout steps", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/knowledge": {
    title: "Tradeline Knowledge Base | Creditor Academy",
    description:
      "Browse the Tradeline Exchange knowledge base: articles and answers on tradelines, credit and ordering.",
    keywords: ["tradeline knowledge base", "tradeline articles", "credit education", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/report-non-posting": {
    title: "Report a Non-Posting Tradeline | Creditor Academy",
    description:
      "Did a tradeline not post? Report non-posting to the Creditor Academy Tradeline Exchange team and learn the next steps.",
    keywords: ["report non-posting tradeline", "tradeline not posting", "tradeline support", "creditor academy"],
  },
  "/services/tradeline-exchange/resources/what-is-tradeline": {
    title: "What Is a Tradeline? | Creditor Academy Exchange",
    description:
      "Learn what a tradeline is, how tradelines appear on credit reports and what to know before you buy one.",
    keywords: ["what is a tradeline", "tradeline meaning", "tradelines explained", "credit report tradeline", "creditor academy"],
  },
  "/services/tradeline-exchange/user-agreement": {
    title: "User Agreement | Tradeline Exchange | Creditor Academy",
    description:
      "Read the Tradeline Exchange user agreement covering buyer and seller responsibilities and marketplace rules.",
    keywords: ["tradeline user agreement", "marketplace terms", "tradeline exchange terms", "creditor academy"],
  },
  "/services/tradeline-exchange/sell-tradelines": {
    title: "Sell Tradelines | Creditor Academy Exchange",
    description:
      "List and sell tradelines on the Creditor Academy Tradeline Exchange and reach buyers through a secure marketplace.",
    keywords: ["sell tradelines", "list tradelines", "tradeline seller", "tradeline exchange", "creditor academy"],
  },
  "/webinar": {
    title: "Free Webinar: Become & Operate Private | Creditor Academy",
    description:
      "Join the free Creditor Academy webinar: learn the framework for business trusts, asset protection and financial sovereignty.",
    keywords: ["free webinar", "become and operate private", "creditor academy webinar", "financial sovereignty webinar", "creditor academy"],
  },
  "/webinar-registration": {
    title: "Free Webinar Registration | Creditor Academy",
    description:
      "Reserve your seat for the free Creditor Academy webinar on business trusts, asset protection and private wealth strategies.",
    keywords: ["webinar registration", "free webinar", "creditor academy webinar", "asset protection webinar", "creditor academy"],
  },
  "/workshop": {
    title: "Creditor Academy Workshop | Hands-On Training | Creditor Academy",
    description:
      "Join a Creditor Academy workshop for hands-on training in business trusts, asset protection and private business credit.",
    keywords: ["creditor academy workshop", "business trust workshop", "asset protection workshop", "financial workshop", "creditor academy"],
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | Creditor Academy",
    description:
      "Read the Creditor Academy terms and conditions governing use of our website, courses, memberships and services.",
    keywords: ["terms and conditions", "creditor academy terms", "website terms", "creditor academy"],
  },
  "/tncmasterclass": {
    title: "Masterclass Terms & Conditions | Creditor Academy",
    description:
      "Review the terms and conditions that apply to the Creditor Academy Masterclass, including access, payments and conduct.",
    keywords: ["masterclass terms", "creditor academy masterclass terms", "membership terms", "creditor academy"],
  },
  "/webinar-recording": {
    title: "Free Webinar Recording | Creditor Academy",
    description:
      "Watch the free Creditor Academy webinar recording: learn the framework for business trusts, asset protection and financial sovereignty.",
    keywords: ["webinar recording", "free webinar replay", "creditor academy webinar", "financial sovereignty training", "creditor academy"],
  },
  "/squeeze": {
    title: "Free Training | Creditor Academy",
    description:
      "Get free training from Creditor Academy on business trusts, asset protection and private wealth. Enter your details to access it.",
    keywords: ["free training", "creditor academy free webinar", "asset protection training", "creditor academy"],
  },
};

function normalizePath(path: string): string {
  if (!path || path === "") return "/";

  const normalized = path.trim();
  const withSlash = normalized.startsWith("/") ? normalized : `/${normalized}`;
  return withSlash === "/" ? "/" : withSlash.replace(/\/+$/, "");
}

export function pageMetadata(path: string, overrides: Partial<Metadata> = {}): Metadata {
  const normalizedPath = normalizePath(path);
  const pageEntry = PAGE_SEO[normalizedPath] ?? PAGE_SEO[normalizedPath.replace(/\/$/, "")] ?? {
    title: "Creditor Academy | Business Trust & Asset Protection",
    description:
      "Learn business trusts, asset protection, business credit and private wealth strategies with Creditor Academy.",
    keywords: DEFAULT_KEYWORDS,
  };

  const canonical = `${siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`;
  const title = pageEntry.title;
  const description = pageEntry.description;
  const keywords = pageEntry.keywords ?? DEFAULT_KEYWORDS;

  const baseMetadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Creditor Academy",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@creditoracademy",
    },
  };

  return {
    ...baseMetadata,
    ...overrides,
    openGraph: {
      ...baseMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...overrides.twitter,
    },
  };
}

export default pageMetadata;
