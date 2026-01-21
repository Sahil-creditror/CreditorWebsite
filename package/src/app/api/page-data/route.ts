import { NextResponse } from "next/server";

const avatarList = [
    {
        image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883335/creditor-website-assets/images/avatar/avatar_1.jpg",
        title: "Sarah Johnson"
    },
    {
        image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883338/creditor-website-assets/images/avatar/avatar_2.jpg",
        title: "Olivia Miller"
    },
    {
        image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883340/creditor-website-assets/images/avatar/avatar_3.jpg",
        title: "Sophia Roberts"
    },
    {
        image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883342/creditor-website-assets/images/avatar/avatar_4.jpg",
        title: "Isabella Clark"
    },
];

const statsFactData = {
    number: '01',
    name: "Stats & Facts",
    heading: "Proven results that empower financial freedom.",
    description: "At Creditor Academy, we focus on transforming financial education into real-world results. Our community of learners actively eliminates debt, builds strong credit, and achieves lasting financial independence.",
    scoreData: [
        {
            number: 525,
            numberValue: 'K',
            scoreDescp: "YouTube Views"
        },
        {
            number: 1673,
            scoreDescp: "Active Learners"
        },
        {
            number: 1.27,
            numberValue: 'M',
            scoreDescp: "Total Debt Eliminated"
        },
        {
            number: 9,
            numberValue: 'K',
            scoreDescp: "YouTube Subscribers"
        },
    ]
};

const servicesData = {
    number: '05',
    name: "Free Starter Course",
    heading: "Roadmap Series",
    description: "Begin your journey with Coach Paulmicheal as you’re introduced to Creditors Academy and its mission to guide you toward private, sovereign living. This orientation walks you through the complete Roadmap Series, giving you a clear view of what’s ahead.",
    data: [
        {
            id: 1,
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883645/creditor-website-assets/images/home/services/services_1.jpg",
            heading: " 1. Orientation to the Private Path",
            descp: "Meet Coach Paulmicheal and discover what Creditor Academy stands for Understand your journey through the Roadmap Series to private living"
        },
        {
            id: 2,
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883646/creditor-website-assets/images/home/services/services_2.jpg",
            heading: "2. Become Private & New Sovereignty101",
            descp: "Get an introduction to the Sovereignty101 and Become Private courses Access the official readiness checklist and scorecard system to assess your eligibility with a counsellor"
        },
        {
            id: 3,
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883647/creditor-website-assets/images/home/services/services_3.jpg",
            heading: "3. Operate Private",
            descp: "Get introduced to the key principles of the Operate Private course and what it empowers you to do. Access the official readiness checklist and scorecard with guidance from a counsellor.Explore the complete course catalogue to see what each lesson will cover."
        },
        {
            id: 4,
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883649/creditor-website-assets/images/home/services/services_4.jpg",
            heading: "4. Senior Business credit",
            descp: "Get introduced to Business Credit building, the “I Want Remedy Now” credit repair system, and Private Merchant Processing without banks. Access the Business Credit Checklist and Private Score Readiness system to evaluate your current position."
        },
    ]
};

const testimonialData = {
    data_1: {
        preTitle: "Hear from them",
        title: "Our website redesign was flawless. They understood our vision perfectly!",
        author: "Albert Flores",
        company: "MasterCard"
    },
    data_2: {
        preTitle: "Hear from them",
        title: "From concept to execution, they delivered outstanding results. Highly recommend their expertise!",
        author: "Robert Fox",
        company: "Mitsubishi"
    },
    data_3: {
        preTitle: "Hear from them",
        title: "Super smooth process with incredible results. highly recommend!",
        author: "Jenny Wilson",
        company: "Pizza Hut"
    },
};

const teamData = {
    number: '06',
    data: [
        {
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883656/creditor-website-assets/images/home/team/team-img-1.png",
            name: "Martha Finley",
            position: "Creative Director",
            socialLinks: [
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883917/creditor-website-assets/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883909/creditor-website-assets/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883913/creditor-website-assets/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883658/creditor-website-assets/images/home/team/team-img-2.png",
            name: "Floyd Miles",
            position: "Marketing Strategist",
            socialLinks: [
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883917/creditor-website-assets/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883909/creditor-website-assets/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883913/creditor-website-assets/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883662/creditor-website-assets/images/home/team/team-img-3.png",
            name: "Glenna Snyder",
            position: "Lead Designer",
            socialLinks: [
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883917/creditor-website-assets/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883909/creditor-website-assets/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883913/creditor-website-assets/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883664/creditor-website-assets/images/home/team/team-img-4.png",
            name: "Albert Flores",
            position: "UX/UI Developer",
            socialLinks: [
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883917/creditor-website-assets/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883909/creditor-website-assets/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883913/creditor-website-assets/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
    ]
};

const pricingData = {
    data: [
        {
            // planName: "Laurich",
            tag:"Website Launch",
            planPrice: "Website Service",
            planDescp: "Ideal for startups and small businesses taking their first steps online.",
            planIncludes: ["Custom design for up to 10 pages","Responsive and mobile-friendly layout","Fast page load and security optimizations","On-page SEO optimization for key pages"],
            coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883797/creditor-website-assets/images/pricing/Cover-1.jpg", // Optional
            link: "/services_page/website-service",
            
        },
        // {
        //     // planName: "Scale",
        //     tag: "Paul Michael's",
        //     planPrice: "Live Class",
        //     // cancelPrice: "$2,199",
        //     planDescp: "Perfect for growing brands needing more customization and flexibility.",
        //     planIncludes: ["Join our interactive live classes every Tuesday & Thursday","Interactive Sessions","Hands-on learning","Session Replays"],
        //     coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883800/creditor-website-assets/images/pricing/Cover-2.jpg", // Optional
        //     link: "/services_page/live-class",
        // },
        {
            tag: "Tradeline Exchange",
            planPrice: "Tradeline Exchange",
            planDescp: "Buy and sell seasoned tradelines to strengthen credit profiles with a secure and compliant process.",
            planIncludes: [
              "Access to verified seasoned tradelines",
              "Secure tradeline exchange platform",
              "Compliance-focused process",
              "Dedicated support and guidance"
            ],
            coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883800/creditor-website-assets/images/pricing/Cover-2.jpg", // Optional
            link: "/services_page/tradeline-exchange"
          },

        {
            // planName: "Elevate", 
            tag: "Private Merchant",   
            planPrice: "Private Merchant",
            planDescp: "Best suited for established businesses wanting a fully tailored experience.",
            planIncludes: ["Tailored payment solutions","Empower your business","Customized experience","Seamless Payment Solutions"],
            coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883811/creditor-website-assets/images/pricing/Cover-3.jpg" ,// Optional
            link: "/services_page/private-merchant"
        },
    ],
    partnerLogo: [
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png" },
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883693/creditor-website-assets/images/logo/creditorlogoblack.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png" },
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png" },
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883693/creditor-website-assets/images/logo/creditorlogoblack.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png" },
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png" },
        { light: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883693/creditor-website-assets/images/logo/creditorlogoblack.png", dark: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883695/creditor-website-assets/images/logo/creditorlogowhite.png" },
      ],
};

const pricingData2 = {
    data: [
        {
            planName: "Starter Plan",
            tag:"Basic",
            planPrice: "$99",
            cancelPrice: "$500",
            planDescp: "Ideal for startups and small businesses taking their first steps online.",
            planIncludes: ["Competitive research & insights","Wireframing and prototyping","Basic tracking setup (Google Analytics, etc.)","Standard contact form integration"],
            coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883797/creditor-website-assets/images/pricing/Cover-1.jpg",
            payLink: "https://quickclick.com/r/mq0rtcnac7tng6qnl2wk009ddrgrly"
        },
        {
            planName: "Cadillac Plan",
            tag: "Advance",
            planPrice: "$998",
            cancelPrice: "$2,199",
            planDescp: "Perfect for growing brands needing more customization and flexibility.",
            planIncludes: ["Everything in the Launch Plan","Custom design for up to 10 pages","Seamless social media integration","SEO enhancements for key pages"],
            coverImage: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883800/creditor-website-assets/images/pricing/Cover-2.jpg",
            payLink: "https://quickclick.com/r/ktwk1pon618kihkfhnfioqm9n1caap"
        },
    ],
};
const faqData = {
    data: [
        {
            faq_que: "What makes this a “Private” Merchant Account?",
            faq_ans: "It’s a full merchant account with private-friendly underwriting and bank rails, giving you autonomy and control."
        },
        {
            faq_que: "How quickly are payouts?",
            faq_ans: "Most merchants receive funds within 24–48 hours."
        },
        {
            faq_que: "Do you support international businesses?",
            faq_ans: "Yes — we process in multiple currencies with global settlement."
        },
        {
            faq_que: "Can I use this alongside my current provider?",
            faq_ans: "Yes — many merchants dual-process during transition."
        }
    ]
};

const contactData = {
    keypoint:["Always-On Customer Support","Service Across the Globe"],
    managerProfile:{
        image:"https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883335/creditor-website-assets/images/avatar/avatar_1.jpg",
        name:"Courtney Henry",
        position:"Onboarding & Success Manager"
    }
}

const aboutusStats = [
    {
        number: 45,
        postfix:"+",
        title: 'Presence in global markets',
        descp: "Expanding reach across international regions with localized expertise and worldwide impact."
    },
    {
        number: 15,
        prefix: "$",
        postfix: "M",
        title: 'In strategic investments',
        descp: "Driving growth with curated partnerships and high-performing, audience-driven initiatives."
    },
    {
        number: 158,
        postfix: "+",
        title: 'Trusted brand collaborations',
        descp: "Shaping industry conversations through innovation, creativity, and lasting influence."
    },
]

const servicesSliderData = [
    "Master class ", "Roadmap Series", "Private Business Credit","Operate Private","Sovereignity","Become Private"
]



export const GET = async () => {
    return NextResponse.json({
        avatarList,
        statsFactData,
        servicesData,
        testimonialData,
        teamData,
        pricingData,
        faqData,
        contactData,
        aboutusStats,
        servicesSliderData,
        pricingData2
    });
};