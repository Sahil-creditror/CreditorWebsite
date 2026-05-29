import { NextResponse } from "next/server";

const MenuData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "About Us",
    path: "/about-us",
    newTab: false,
  },
  {
    id: 3,
    title: "Membership",
    path: "/masterclass-membership",
    newTab: false,
  },
  {
    id: 4,
    title: "Courses",
    path: "/courses",
    newTab: false,
  },
  {
    id: 5,
    title: "Services",
    path: "/services",
    newTab: false,
  },
  {
   id: 6,
    title: "Blogs",
    path: "/blog",
    newTab: false,
  },
  
  {
    id: 7,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
  
  // {
  //   id: 8,
  //   title: "Docs",
  //   path: "/documentation",
  //   newTab: false,
  // }
];


const footerData = {
    name: "Creditor Academy",
    tagline: "Learn the Law. Know the Difference",
    info: [
        {
            icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883525/creditor-website-assets/images/footer/email-arrow.svg",
            link: "counselor@creditoracademy.com",
            href: "mailto:counselor@creditoracademy.com"
        },
        {
            icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883529/creditor-website-assets/images/footer/Location.svg",
            link: "USA",
            href: "https://maps.app.goo.gl/hpDp81fqzGt5y4bC8"
        }
    ],
    links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about-us" },
        { name: "Services", href: "/#services" },
        { name: "Membership", href: "/masterclass-membership" },
        { name: "Blog", href: "/blog" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Return & Refund", href: "/return-refund" },
        { name: "Error 404", href: "/not-found" }
    ],
    socialLinks: [
        { name: "Facebook", href: "https://www.facebook.com/" },
        { name: "Instagram", href: "https://www.instagram.com/" },
        { name: "Twitter", href: "https://x.com/" }
    ],
    copyright: "© Creditor Academy 2025"
};

export const GET = async () => {
    return NextResponse.json({
        footerData,
        MenuData
    });
};