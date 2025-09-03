import { NextResponse } from "next/server";

const avatarList = [
    {
        image: "/images/avatar/avatar_1.jpg",
        title: "Sarah Johnson"
    },
    {
        image: "/images/avatar/avatar_2.jpg",
        title: "Olivia Miller"
    },
    {
        image: "/images/avatar/avatar_3.jpg",
        title: "Sophia Roberts"
    },
    {
        image: "/images/avatar/avatar_4.jpg",
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
            image: "/images/home/services/services_1.webp",
            heading: " 1. Orientation to the Private Path",
            descp: "Meet Coach Paulmicheal and discover what Creditor Academy stands for Understand your journey through the Roadmap Series to private living"
        },
        {
            id: 2,
            image: "/images/home/services/services_2.webp",
            heading: "2. Become Private & New SOV 101",
            descp: "Get an introduction to the SOV 101 and Become Private courses Access the official readiness checklist and scorecard system to assess your eligibility with a counsellor"
        },
        {
            id: 3,
            image: "/images/home/services/services_3.webp",
            heading: "3. Operate Private",
            descp: "Get introduced to the key principles of the Operate Private course and what it empowers you to do. Access the official readiness checklist and scorecard with guidance from a counsellor.Explore the complete course catalogue to see what each lesson will cover."
        },
        {
            id: 4,
            image: "/images/home/services/services_4.webp",
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
            image: "/images/home/team/team-img-1.png",
            name: "Martha Finley",
            position: "Creative Director",
            socialLinks: [
                {
                    icon: "/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "/images/home/team/team-img-2.png",
            name: "Floyd Miles",
            position: "Marketing Strategist",
            socialLinks: [
                {
                    icon: "/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "/images/home/team/team-img-3.png",
            name: "Glenna Snyder",
            position: "Lead Designer",
            socialLinks: [
                {
                    icon: "/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "/images/socialIcon/linkedin.svg",
                    link: "https://linkedin.com"
                }
            ]
        },
        {
            image: "/images/home/team/team-img-4.png",
            name: "Albert Flores",
            position: "UX/UI Developer",
            socialLinks: [
                {
                    icon: "/images/socialIcon/twitter.svg",
                    link: "https://twitter.com"
                },
                {
                    icon: "/images/socialIcon/Be.svg",
                    link: "https://www.behance.net/"
                },
                {
                    icon: "/images/socialIcon/linkedin.svg",
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
            coverImage: "/images/pricing/Cover-1.png", // Optional
            link: "/services_page/website-service",
            
        },
        {
            // planName: "Scale",
            tag: "Paul Michael's",
            planPrice: "Live Class",
            // cancelPrice: "$2,199",
            planDescp: "Perfect for growing brands needing more customization and flexibility.",
            planIncludes: ["Join our interactive live classes every Tuesday & Thursday","Interactive Sessions","Hands-on learning","Session Replays"],
            coverImage: "/images/pricing/Cover-2.jpg", // Optional
            link: "/services_page/live-class",
        },
        {
            // planName: "Elevate", 
            tag: "Private Merchant",   
            planPrice: "Private Merchant Processing",
            planDescp: "Best suited for established businesses wanting a fully tailored experience.",
            planIncludes: ["Tailored payment solutions","Empower your business","Customized experience","Seamless Payment Solutions"],
            coverImage: "/images/pricing/Cover-3.jpg" ,// Optional
            link: "/service-page/private-merchant"
        },
    ],
    partnerLogo: [
        { light: "/images/logo/creditorlogo.png", dark: "/images/logo/creditorlogo.png" },
        { light: "/images/logo/creditorlogoblack.png", dark: "/images/logo/creditorlogowhite.png" },
        { light: "/images/logo/creditorlogo.png", dark: "/images/logo/creditorlogo.png" },
        { light: "/images/logo/creditorlogoblack.png", dark: "/images/logo/creditorlogowhite.png" },
        { light: "/images/logo/creditorlogo.png", dark: "/images/logo/creditorlogo.png" },
        { light: "/images/logo/creditorlogoblack.png", dark: "/images/logo/creditorlogowhite.png" },
      ],
};

const pricingData2 = {
    data: [
        {
            planName: "Starter Plan",
            tag:"Basic",
            planPrice: "$100",
            cancelPrice: "$500",
            planDescp: "Ideal for startups and small businesses taking their first steps online.",
            planIncludes: ["Competitive research & insights","Wireframing and prototyping","Basic tracking setup (Google Analytics, etc.)","Standard contact form integration"],
            coverImage: "/images/pricing/Cover-1.png", // Optional,
            // payLink: ""
        },
        {
            planName: "Cadillac Plan",
            tag: "Advance",
            planPrice: "$1000",
            cancelPrice: "$2,199",
            planDescp: "Perfect for growing brands needing more customization and flexibility.",
            planIncludes: ["Everything in the Launch Plan","Custom design for up to 10 pages","Seamless social media integration","SEO enhancements for key pages"],
            coverImage: "/images/pricing/Cover-2.jpg", // Optional
            // payLink: ""
        },
    ],
};
const faqData = {
    data: [
        {
            faq_que: "What is Creditor Academy?",
            faq_ans: "Creditor Academy is a premier learning platform that empowers individuals with knowledge in credit, finance, and legal strategies. Our courses are designed to help you build, protect, and leverage your credit and financial profile."
        },
        {
            faq_que: "Who can join Creditor Academy?",
            faq_ans: "Our programs are designed for professionals, entrepreneurs, and individuals seeking to improve their credit understanding, financial literacy, and legal empowerment. No prior experience is required."
        },
        {
            faq_que: "How are the courses delivered?",
            faq_ans: "All courses are delivered online through an immersive learning portal. You’ll get access to video lessons, downloadable resources, live Q&A sessions, and step-by-step guidance."
        },
        {
            faq_que: "What’s the cost of enrollment?",
            faq_ans: "We offer multiple enrollment options depending on the program. You can choose from one-time payments or flexible installment plans. Detailed pricing is available on our enrollment page."
        },
        {
            faq_que: "Do you provide ongoing support after enrollment?",
            faq_ans: "Yes. Learners receive lifetime access to course materials, community forums, and regular updates. Premium members also get access to mentorship sessions and personalized guidance."
        }
    ]
};

const contactData = {
    keypoint:["Always-On Customer Support","Service Across the Globe"],
    managerProfile:{
        image:"/images/avatar/avatar_1.jpg",
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