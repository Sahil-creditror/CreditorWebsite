export const BECOME_PRIVATE_PATH = "/services/course-cataloges/become-private";
export const OPERATE_PRIVATE_PATH = "/services/course-cataloges/operate-private";
export const FINANCIAL_FREEDOM_PATH = "/services/course-cataloges/financial-freedom";
export const FINANCIAL_FREEDOM_HUB_PATH = "/financial-freedom";
export const COURSES_PAGE_PATH = "/services";

/** Learning Journey hubs */
export const MASTER_CLASS_PATH = "/master-class";
export const BECOME_PRIVATE_HUB_PATH = "/become-private";
export const OPERATE_PRIVATE_HUB_PATH = "/operate-private";

export const BOOK_SMART_PATH = "/master-class/book-smart";
export const STREET_SMART_PATH = "/master-class/street-smart";

export const COURSE_LINKS = [
  {
    title: "Become Private",
    href: BECOME_PRIVATE_PATH,
    subtitle: "Reclaim Your Lawful Identity",
  },
  {
    title: "Operate Private",
    href: OPERATE_PRIVATE_PATH,
    subtitle: "Asset Protection & Business",
  },
  {
    title: "Financial Freedom",
    href: FINANCIAL_FREEDOM_PATH,
    subtitle: "200k with Vendors, Banks & Credit Unions",
  },
] as const;
