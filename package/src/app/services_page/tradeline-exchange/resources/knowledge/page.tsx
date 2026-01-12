// @ts-nocheck
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react";

const categories = [
  { id: 1, name: "Credit Basics", slug: "credit basics", count: 0 },
  { id: 2, name: "Tradelines", slug: "tradelines", count: 0 },
  { id: 3, name: "Credit Repair", slug: "credit repair", count: 0 },
  { id: 4, name: "Credit Cards", slug: "credit cards", count: 0 },
  { id: 5, name: "Personal Finance", slug: "personal finance", count: 0 },
  { id: 6, name: "Loans", slug: "loans", count: 0 },
  { id: 7, name: "Legal & Ethical", slug: "legal & ethical", count: 0 },
  { id: 8, name: "Business Credit", slug: "business credit", count: 0 },
];

const posts = [
  {
    id: 1,
    title: "Is a Balance Transfer Worth It? How to Know if It’s Right for You",
    desc: "Balance transfers can help escape high interest, but only if you avoid new debt and fees.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Mar 12, 2025",
    category: "Credit Repair",
    readTime: "6 min",
    views: "33",
    link: "/blog/is-a-balance-transfer-worth-it",
    author: "Ellen Johnson",
  },
  {
    id: 2,
    title: "Saving for a Big Purchase",
    desc: "Use windfalls and extra income streams to strengthen your finances before big buys.",
    image: "/images/courses/become/document.webp",
    date: "Mar 08, 2025",
    category: "Personal Finance",
    readTime: "5 min",
    views: "8",
    link: "/blog/saving-for-a-big-purchase",
    author: "Sarah Sharkey",
  },
  {
    id: 3,
    title: "Credit Myth Busting: The Opt-Out Myth",
    desc: "Why the opt-out myth doesn’t fix credit — and what actually does.",
    image: "/images/courses/become/PBCnew.webp",
    date: "Mar 03, 2025",
    category: "Credit Basics",
    readTime: "4 min",
    views: "21",
    link: "/blog/credit-opt-out-myth",
    author: "Ellen Johnson",
  },
  {
    id: 4,
    title: "Reasons Why You May Not Have a Credit Score",
    desc: "Credit invisibility affects millions — here’s why it happens and how to get scored.",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=1200&h=800&fit=crop",
    date: "Feb 26, 2025",
    category: "Credit Basics",
    readTime: "6 min",
    views: "25",
    link: "/blog/reasons-no-credit-score",
    author: "Ellen Johnson",
  },
  {
    id: 5,
    title: "2025 Car Shopping Secrets Unlocked",
    desc: "Smart tactics to secure better pricing, financing, and timing on your next vehicle.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Feb 20, 2025",
    category: "Personal Finance",
    readTime: "7 min",
    views: "25",
    link: "/blog/2025-car-shopping-secrets",
    author: "Amy Marshall",
  },
  {
    id: 6,
    title: "Credit Card Credit Building—2025 Best Cards",
    desc: "Our picks for the best credit-building cards this year and how to use them wisely.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Jan 30, 2025",
    category: "Credit Cards",
    readTime: "8 min",
    views: "23",
    link: "/blog/best-credit-building-cards-2025",
    author: "Sarah Sharkey",
  },
  {
    id: 7,
    title: "How to Protect Your Finances as a Pet Parent",
    desc: "Budgeting for vet bills, insurance, and everyday pet costs without stress.",
    image: "/images/courses/become/Finance.webp",
    date: "Jan 27, 2025",
    category: "Personal Finance",
    readTime: "5 min",
    views: "5",
    link: "/blog/pet-parent-finances",
    author: "Sarah Sharkey",
  },
  {
    id: 8,
    title: "How to Improve Your Credit Score in 2025",
    desc: "Practical, current-year steps to raise your score in uncertain times.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    date: "Jan 26, 2025",
    category: "Credit Repair",
    readTime: "6 min",
    views: "20",
    link: "/blog/improve-credit-score-2025",
    author: "Sarah Sharkey",
  },
  {
    id: 9,
    title: "How to Deal With Holiday Debt",
    desc: "A step-by-step plan to pay down seasonal balances without hurting your score.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Jan 18, 2025",
    category: "Credit Repair",
    readTime: "5 min",
    views: "5",
    link: "/blog/how-to-deal-with-holiday-debt",
    author: "Sarah Sharkey",
  },
  {
    id: 10,
    title: "How to Use Credit Cards Responsibly Without Debt",
    desc: "Avoid interest and fees while still benefiting from rewards and protections.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Jan 12, 2025",
    category: "Credit Cards",
    readTime: "6 min",
    views: "16",
    link: "/blog/use-credit-cards-responsibly",
    author: "Ellen Johnson",
  },
  {
    id: 11,
    title: "How to Improve Your Finances in 2025",
    desc: "Small, practical changes to hit savings goals faster this year.",
    image: "/images/courses/become/Finance.webp",
    date: "Jan 09, 2025",
    category: "Personal Finance",
    readTime: "5 min",
    views: "12",
    link: "/blog/improve-finances-2025",
    author: "Sarah Sharkey",
  },
  {
    id: 12,
    title: "Debit vs. Credit Cards: Which Is Better?",
    desc: "Side-by-side comparison to choose the right payment tool for you.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Dec 22, 2024",
    category: "Credit Cards",
    readTime: "4 min",
    views: "16",
    link: "/blog/debit-vs-credit-cards",
    author: "Ellen Johnson",
  },
  {
    id: 13,
    title: "What Is Buy Now Pay Later and How Does It Affect Your Credit?",
    desc: "Understand BNPL benefits, risks, and credit score impacts.",
    image: "/images/courses/become/PBCnew.webp",
    date: "Dec 19, 2024",
    category: "Personal Finance",
    readTime: "6 min",
    views: "9",
    link: "/blog/buy-now-pay-later-credit",
    author: "Sarah Sharkey",
  },
  {
    id: 14,
    title: "How Are Authorized User Tradelines Considered?",
    desc: "Expert insight on how AU tradelines can help or hurt your score.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Dec 15, 2024",
    category: "Tradelines",
    readTime: "7 min",
    views: "23",
    link: "/blog/authorized-user-tradelines-scoring",
    author: "John Ulzheimer",
  },
  {
    id: 15,
    title: "The Top 3 Credit Myths That Won’t Go Away",
    desc: "Debunking persistent myths so you can build credit the right way.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Nov 21, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "15",
    link: "/blog/top-credit-myths",
    author: "Ellen Johnson",
  },
  {
    id: 16,
    title: "4 More Master Money Habits for Wealth",
    desc: "Advanced money skills to keep wealth growing over time.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Nov 15, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "13",
    link: "/blog/master-money-habits",
    author: "Moriah Chace",
  },
  {
    id: 17,
    title: "Four Best First Money Habits to Master",
    desc: "Foundational habits to stop money leaks and build savings.",
    image: "/images/home/services/master.webp",
    date: "Nov 05, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "9",
    link: "/blog/best-first-money-habits",
    author: "Moriah Chace",
  },
  {
    id: 18,
    title: "Insider’s Guide to Buying Credit Repair",
    desc: "How to vet credit repair services and spot red flags.",
    image: "/images/courses/become/PBCnew.webp",
    date: "Nov 03, 2024",
    category: "Credit Repair",
    readTime: "8 min",
    views: "7",
    link: "/blog/insiders-guide-credit-repair",
    author: "Sarah Sharkey",
  },
  {
    id: 19,
    title: "Why Did My Credit Score Go Down?",
    desc: "Common triggers that drop scores and how to recover quickly.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Oct 27, 2024",
    category: "Credit Repair",
    readTime: "6 min",
    views: "21",
    link: "/blog/why-did-my-score-drop",
    author: "Ellen Johnson",
  },
  {
    id: 20,
    title: "How to Protect Your Credit Score With Irregular Income",
    desc: "Strategies to smooth cash flow and avoid missed payments.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Oct 24, 2024",
    category: "Personal Finance",
    readTime: "6 min",
    views: "6",
    link: "/blog/protect-score-irregular-income",
    author: "Sarah Sharkey",
  },
  {
    id: 21,
    title: "Mortgages 101—What Home Buyers Need to Know",
    desc: "Core concepts, ratios, and prep steps before you apply.",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=1200&h=800&fit=crop",
    date: "Oct 18, 2024",
    category: "Loans",
    readTime: "7 min",
    views: "6",
    link: "/blog/mortgages-101",
    author: "Sarah Sharkey",
  },
  {
    id: 22,
    title: "Unlock the Power of Home Equity Loans",
    desc: "How to use home equity responsibly and avoid common pitfalls.",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=1200&h=800&fit=crop",
    date: "Oct 07, 2024",
    category: "Loans",
    readTime: "6 min",
    views: "7",
    link: "/blog/home-equity-loans-guide",
    author: "Sarah Sharkey",
  },
  {
    id: 23,
    title: "How to Grow a Thin Credit File",
    desc: "Tactics to establish depth and diversity for better approvals.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Sep 30, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "11",
    link: "/blog/grow-thin-credit-file",
    author: "Sarah Sharkey",
  },
  {
    id: 24,
    title: "Line of Credit—Expectations & Realities",
    desc: "When lines of credit make sense and how to avoid fee traps.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Sep 27, 2024",
    category: "Loans",
    readTime: "5 min",
    views: "9",
    link: "/blog/line-of-credit-guide",
    author: "Sarah Sharkey",
  },
  {
    id: 25,
    title: "Debt Consolidation vs. Credit Card Refinancing",
    desc: "Compare options to escape high-interest debt faster.",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&h=800&fit=crop",
    date: "Sep 08, 2024",
    category: "Credit Repair",
    readTime: "6 min",
    views: "11",
    link: "/blog/debt-consolidation-vs-refinancing",
    author: "Sarah Sharkey",
  },
  {
    id: 26,
    title: "Renters’ Rights—What You Need to Know",
    desc: "Key protections and steps if disputes arise with landlords.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    date: "Sep 06, 2024",
    category: "Legal & Ethical",
    readTime: "5 min",
    views: "8",
    link: "/blog/renters-rights-guide",
    author: "Sarah Sharkey",
  },
  {
    id: 27,
    title: "Back to School: Pay for College Without Loans",
    desc: "Scholarships, work-study, and planning to minimize borrowing.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop",
    date: "Aug 23, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "9",
    link: "/blog/pay-for-college-without-loans",
    author: "Sarah Sharkey",
  },
  {
    id: 28,
    title: "Credit Card Mistakes to Avoid",
    desc: "Common pitfalls that hurt scores and how to prevent them.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Aug 07, 2024",
    category: "Credit Cards",
    readTime: "5 min",
    views: "12",
    link: "/blog/credit-card-mistakes",
    author: "Sarah Sharkey",
  },
  {
    id: 29,
    title: "Feelings in Finance—Your Empowerment Guide",
    desc: "Connect emotions to money decisions to build wealth habits.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Aug 05, 2024",
    category: "Personal Finance",
    readTime: "6 min",
    views: "10",
    link: "/blog/feelings-in-finance",
    author: "Moriah Chace",
  },
  {
    id: 30,
    title: "What Is Bankruptcy and How Does It Impact Your Credit?",
    desc: "What to expect before, during, and after filing for bankruptcy.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Jul 28, 2024",
    category: "Credit Repair",
    readTime: "8 min",
    views: "10",
    link: "/blog/what-is-bankruptcy",
    author: "Sarah Sharkey",
  },
  {
    id: 31,
    title: "Healing from Financial Trauma",
    desc: "Fixing your emotional relationship with money so habits can stick.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Jul 26, 2024",
    category: "Personal Finance",
    readTime: "6 min",
    views: "9",
    link: "/blog/healing-financial-trauma",
    author: "Moriah Chace",
  },
  {
    id: 32,
    title: "Can Inquiry Bumpage and Choppage Help Your Credit?",
    desc: "An expert look at inquiry removal tactics and what really works.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Jul 17, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "23",
    link: "/blog/inquiry-bumpage-choppage",
    author: "Ellen Johnson",
  },
  {
    id: 33,
    title: "Financial Identity Theft Protection Guide",
    desc: "Steps to protect your credit, banking, and personal data from theft.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Jul 11, 2024",
    category: "Legal & Ethical",
    readTime: "6 min",
    views: "9",
    link: "/blog/financial-identity-theft-protection",
    author: "Moriah Chace",
  },
  {
    id: 34,
    title: "Is Renting Better Than Owning—for You?",
    desc: "Compare renting vs. owning based on costs, flexibility, and goals.",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=1200&h=800&fit=crop",
    date: "Jul 11, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "6",
    link: "/blog/is-renting-better-than-owning",
    author: "Sarah Sharkey",
  },
  {
    id: 35,
    title: "Date of Last Activity: What It Means",
    desc: "Understand DLA on credit reports and why myths about it persist.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Jun 27, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "17",
    link: "/blog/date-of-last-activity-explained",
    author: "Ellen Johnson",
  },
  {
    id: 36,
    title: "Americans Are Taking Out More Personal Loans",
    desc: "What rising personal loan use means for budgets and credit health.",
    image: "https://images.unsplash.com/photo-1503389152951-9f343605f61e?w=1200&h=800&fit=crop",
    date: "Jun 21, 2024",
    category: "Loans",
    readTime: "5 min",
    views: "6",
    link: "/blog/personal-loans-trends-2024",
    author: "Sarah Sharkey",
  },
  {
    id: 37,
    title: "Credit Mix: Do You Need to Care?",
    desc: "How account diversity factors into your score and when it matters.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Jun 06, 2024",
    category: "Credit Basics",
    readTime: "4 min",
    views: "24",
    link: "/blog/credit-mix-importance",
    author: "Ellen Johnson",
  },
  {
    id: 38,
    title: "What Is a Derogatory Item on Your Credit Report?",
    desc: "Major vs. minor derogatories, timelines, and what you can do.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "May 30, 2024",
    category: "Credit Repair",
    readTime: "6 min",
    views: "25",
    link: "/blog/derogatory-items-explained",
    author: "Ellen Johnson",
  },
  {
    id: 39,
    title: "How to Use a Windfall to Improve Your Finances",
    desc: "Prioritize debt, savings, and goals when unexpected money arrives.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "May 20, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "7",
    link: "/blog/use-windfall-smartly",
    author: "Sarah Sharkey",
  },
  {
    id: 40,
    title: "Money Myths That Could Hurt Your Finances",
    desc: "Debunked myths about income, debt, investing, credit, and advisors.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "May 20, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "6",
    link: "/blog/money-myths-debunked",
    author: "Sarah Sharkey",
  },
  {
    id: 41,
    title: "Start Making Good Money Moves by Destroying Limiting Beliefs",
    desc: "Identify and replace harmful money narratives to move forward.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "May 03, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "6",
    link: "/blog/destroy-limiting-money-beliefs",
    author: "Moriah Chace",
  },
  {
    id: 40,
    title: "Money Myths Debunked",
    desc: "Common money myths that can derail your finances and what to do instead.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "May 10, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "6",
    link: "/blog/money-myths-debunked",
    author: "Sarah Sharkey",
  },
  {
    id: 41,
    title: "Destroy Limiting Money Beliefs",
    desc: "Replace limiting beliefs to start making stronger financial moves.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "May 03, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "7",
    link: "/blog/limiting-money-beliefs",
    author: "Moriah Chace",
  },
  {
    id: 42,
    title: "How to Avoid a Growing Credit Card Balance",
    desc: "Practical steps to stop balances from snowballing with high APRs.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Apr 22, 2024",
    category: "Credit Cards",
    readTime: "5 min",
    views: "6",
    link: "/blog/avoid-growing-credit-card-balance",
    author: "Sarah Sharkey",
  },
  {
    id: 43,
    title: "What Is a Credit-builder Loan and How Does It Work?",
    desc: "How credit-builder loans can help establish history and scores.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Apr 08, 2024",
    category: "Loans",
    readTime: "6 min",
    views: "9",
    link: "/blog/credit-builder-loan-guide",
    author: "Sarah Sharkey",
  },
  {
    id: 44,
    title: "VantageScore vs. FICO Score: What’s the Difference?",
    desc: "Key differences between scoring models and which lenders use.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Apr 07, 2024",
    category: "Credit Basics",
    readTime: "6 min",
    views: "30",
    link: "/blog/vantagescore-vs-fico",
    author: "Ellen Johnson",
  },
  {
    id: 45,
    title: "How to Be Your Own Best Budget Planner",
    desc: "Budgeting without overwhelm—simple steps to stay consistent.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Apr 01, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "5",
    link: "/blog/be-your-own-budget-planner",
    author: "Moriah Chace",
  },
  {
    id: 46,
    title: "What Does It Mean to Be Credit Invisible?",
    desc: "Who lacks scores, why it matters, and how to become scoreable.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Mar 24, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "23",
    link: "/blog/what-is-credit-invisible",
    author: "Ellen Johnson",
  },
  {
    id: 47,
    title: "Snowball vs. Avalanche: Best Way to Pay Off Debt?",
    desc: "Compare the two leading payoff methods to see which fits you.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Mar 19, 2024",
    category: "Credit Repair",
    readTime: "6 min",
    views: "18",
    link: "/blog/snowball-vs-avalanche",
    author: "Ellen Johnson",
  },
  {
    id: 48,
    title: "Homeless Prevention Financial Guide",
    desc: "Practical money moves to lower homelessness risk and stay housed.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Mar 15, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "5",
    link: "/blog/homeless-prevention-finance-guide",
    author: "Moriah Chace",
  },
  {
    id: 46,
    title: "What Does It Mean to Be Credit Invisible?",
    desc: "Why some consumers lack scores and how to become credit visible.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Mar 24, 2024",
    category: "Credit Basics",
    readTime: "5 min",
    views: "23",
    link: "/blog/what-is-credit-invisible",
    author: "Ellen Johnson",
  },
  {
    id: 47,
    title: "Snowball vs. Avalanche: Best Way to Pay Off Debt?",
    desc: "Compare the two popular payoff methods to see which fits you.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Mar 19, 2024",
    category: "Credit Repair",
    readTime: "6 min",
    views: "18",
    link: "/blog/snowball-vs-avalanche",
    author: "Ellen Johnson",
  },
  {
    id: 48,
    title: "Homeless Prevention Financial Guide",
    desc: "Money guidance to avoid housing instability and plan ahead.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Mar 15, 2024",
    category: "Personal Finance",
    readTime: "7 min",
    views: "5",
    link: "/blog/homeless-prevention-finance-guide",
    author: "Moriah Chace",
  },
  {
    id: 49,
    title: "Things Everyone Should Know About Credit Cards",
    desc: "Core credit card best practices for rewards and score building.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Mar 11, 2024",
    category: "Credit Cards",
    readTime: "5 min",
    views: "27",
    link: "/blog/credit-card-essentials",
    author: "Ellen Johnson",
  },
  {
    id: 50,
    title: "See Your FICO Score for Free—Here’s How",
    desc: "Legit ways to access FICO scores without hurting your credit.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Mar 04, 2024",
    category: "Credit Basics",
    readTime: "4 min",
    views: "25",
    link: "/blog/free-fico-score",
    author: "Ellen Johnson",
  },
  {
    id: 51,
    title: "Complete Guide to Opening an Unsecured Credit Card",
    desc: "How unsecured cards work, what to compare, and how to apply wisely.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Mar 04, 2024",
    category: "Credit Cards",
    readTime: "6 min",
    views: "5",
    link: "/blog/open-unsecured-credit-card",
    author: "Sarah Sharkey",
  },
  {
    id: 52,
    title: "Use Your Tax Refund to Get Ahead",
    desc: "Smart ways to deploy a refund toward bills, debt, savings, or investing.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Feb 25, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "8",
    link: "/blog/use-tax-refund-to-get-ahead",
    author: "Sarah Sharkey",
  },
  {
    id: 53,
    title: "How to Prepare Your Finances for Student Loan Payments",
    desc: "Steps to restart payments, pick plans, budget, and boost income.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop",
    date: "Feb 23, 2024",
    category: "Loans",
    readTime: "6 min",
    views: "4",
    link: "/blog/prepare-for-student-loan-payments",
    author: "Sarah Sharkey",
  },
  {
    id: 54,
    title: "What to Do if You Can’t Afford Your Car Payment",
    desc: "Options to avoid default and protect your credit when payments strain your budget.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Feb 09, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "4",
    link: "/blog/cant-afford-car-payment",
    author: "Sarah Sharkey",
  },
  {
    id: 55,
    title: "Will These Strategies Help You Get More Credit Score Points?",
    desc: "Which “hacks” actually move scores and which are myths.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Feb 04, 2024",
    category: "Credit Repair",
    readTime: "5 min",
    views: "22",
    link: "/blog/get-more-credit-score-points",
    author: "Ellen Johnson",
  },
  {
    id: 56,
    title: "When You Should NOT Be an Authorized User",
    desc: "Scenarios where adding AU accounts can backfire on your credit.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Jan 21, 2024",
    category: "Tradelines",
    readTime: "6 min",
    views: "21",
    link: "/blog/when-not-to-be-authorized-user",
    author: "Ellen Johnson",
  },
  {
    id: 57,
    title: "Complete Guide to Opening a Secured Credit Card",
    desc: "How secured cards work, what to compare, and how to apply.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Jan 18, 2024",
    category: "Credit Cards",
    readTime: "6 min",
    views: "5",
    link: "/blog/open-secured-credit-card",
    author: "Sarah Sharkey",
  },
  {
    id: 57,
    title: "Complete Guide to Opening a Secured Credit Card",
    desc: "How secured cards work, deposits, and how to graduate to unsecured.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Jan 18, 2024",
    category: "Credit Cards",
    readTime: "6 min",
    views: "5",
    link: "/blog/open-secured-credit-card",
    author: "Sarah Sharkey",
  },
  {
    id: 58,
    title: "Are Credit Sweeps Legal or Will They Get You in Trouble?",
    desc: "Why credit sweep promises are risky and how to avoid scams.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Jan 15, 2024",
    category: "Credit Repair",
    readTime: "5 min",
    views: "24",
    link: "/blog/are-credit-sweeps-legal",
    author: "Ellen Johnson",
  },
  {
    id: 59,
    title: "Best Rated Credit Cards for Bad Credit in 2024",
    desc: "Top card options if your score is low—and how to use them wisely.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Jan 10, 2024",
    category: "Credit Cards",
    readTime: "7 min",
    views: "10",
    link: "/blog/best-cards-for-bad-credit-2024",
    author: "Sam Hawrylack",
  },
  {
    id: 60,
    title: "Financial Myths to Ignore",
    desc: "Myths that can derail your budget and how to stay focused on facts.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Jan 05, 2024",
    category: "Personal Finance",
    readTime: "5 min",
    views: "6",
    link: "/blog/financial-myths-to-ignore",
    author: "Sarah Sharkey",
  },
  {
    id: 61,
    title: "Buying Tradelines: How to Choose the Best Tradeline Company",
    desc: "What to look for and watch out for when selecting a tradeline provider.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Dec 30, 2023",
    category: "Tradelines",
    readTime: "6 min",
    views: "26",
    link: "/blog/choose-best-tradeline-company",
    author: "Tradeline Supply Company, LLC",
  },
  {
    id: 62,
    title: "Should You Trust AI Financial Advice?",
    desc: "Where AI can help, where it falls short, and how to use it responsibly.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Dec 22, 2023",
    category: "Personal Finance",
    readTime: "5 min",
    views: "6",
    link: "/blog/should-you-trust-ai-financial-advice",
    author: "Sarah Sharkey",
  },
  {
    id: 63,
    title: "Building Credit With Revolving & Open Credit Accounts",
    desc: "How to leverage revolving and open accounts to strengthen your score.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Dec 15, 2023",
    category: "Credit Basics",
    readTime: "6 min",
    views: "7",
    link: "/blog/building-credit-revolving-open-accounts",
    author: "Sarah Sharkey",
  },
  {
    id: 64,
    title: "Easy Credit Hacks That Will Actually Get You Results",
    desc: "Actionable, compliant credit moves that can show quicker improvements.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Dec 07, 2023",
    category: "Credit Repair",
    readTime: "5 min",
    views: "40",
    link: "/blog/easy-credit-hacks-that-work",
    author: "Ellen Johnson",
  },
  {
    id: 65,
    title: "Do Tradelines Still Work in 2024?",
    desc: "Effectiveness of tradelines today and how long the impact may last.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Dec 06, 2023",
    category: "Tradelines",
    readTime: "6 min",
    views: "53",
    link: "/blog/do-tradelines-still-work-2024",
    author: "Tradeline Supply Company, LLC",
  },
  {
    id: 66,
    title: "How to Grow Your Savings Rate",
    desc: "Tactics to steadily increase savings percentage without burnout.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Dec 01, 2023",
    category: "Personal Finance",
    readTime: "5 min",
    views: "4",
    link: "/blog/how-to-grow-your-savings-rate",
    author: "Sarah Sharkey",
  },
  {
    id: 67,
    title: "How a Rapid Rescore Can Boost Your Credit Score Fast",
    desc: "When rapid rescoring makes sense and what it can (and can’t) fix.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Nov 19, 2023",
    category: "Credit Repair",
    readTime: "5 min",
    views: "26",
    link: "/blog/rapid-rescore-guide",
    author: "Ellen Johnson",
  },
  {
    id: 68,
    title: "Top Credit-building Tips for Generation Z",
    desc: "Starter strategies for Gen Z to build strong credit early.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Nov 17, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "4",
    link: "/blog/credit-building-tips-gen-z",
    author: "Sarah Sharkey",
  },
  {
    id: 69,
    title: "How to Remove Derogatory Entries From Your Credit Report",
    desc: "Steps to address derogatories and improve your credit standing.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Nov 10, 2023",
    category: "Credit Repair",
    readTime: "6 min",
    views: "14",
    link: "/blog/remove-derogatory-entries",
    author: "Ellen Johnson",
  },
  {
    id: 70,
    title: "How to Lower Financial Stress",
    desc: "Practical ways to reduce money stress and regain control.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Nov 03, 2023",
    category: "Personal Finance",
    readTime: "5 min",
    views: "4",
    link: "/blog/how-to-lower-financial-stress",
    author: "Sarah Sharkey",
  },
  {
    id: 71,
    title: "Negative Items That Can Stay on Your Credit Forever",
    desc: "The rare derogatories that may not fall off and how to handle them.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Oct 30, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "14",
    link: "/blog/negative-items-that-can-stay-forever",
    author: "Ellen Johnson",
  },
  {
    id: 72,
    title: "How to Avoid Credit Card Debt",
    desc: "Habits and tactics to steer clear of high-interest card balances.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Oct 27, 2023",
    category: "Credit Cards",
    readTime: "5 min",
    views: "2",
    link: "/blog/how-to-avoid-credit-card-debt",
    author: "Sarah Sharkey",
  },
  {
    id: 73,
    title: "Is There Such a Thing as Too Much Credit?",
    desc: "Examining whether high limits, many accounts, or debt can hurt you.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Oct 19, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "11",
    link: "/blog/is-there-too-much-credit",
    author: "Ellen Johnson",
  },
  {
    id: 74,
    title: "How to Overcome Financial Trauma",
    desc: "Tools to process past money harm and build healthier habits.",
    image: "https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?w=1200&h=800&fit=crop",
    date: "Oct 18, 2023",
    category: "Personal Finance",
    readTime: "6 min",
    views: "4",
    link: "/blog/how-to-overcome-financial-trauma",
    author: "Moriah Chace",
  },
  {
    id: 75,
    title: "What Is a Good Credit Score? 7 Must-know Essentials",
    desc: "Key score ranges, why they matter, and how to improve them.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Oct 10, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "3",
    link: "/blog/what-is-a-good-credit-score",
    author: "Moriah Chace",
  },
  {
    id: 76,
    title: "Credit Reports: What You Need to Know",
    desc: "Understand reports, why they matter, and how to read them.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Oct 05, 2023",
    category: "Credit Basics",
    readTime: "6 min",
    views: "21",
    link: "/blog/credit-reports-what-to-know",
    author: "Ellen Johnson",
  },
  {
    id: 77,
    title: "Derogatory Credit Marks—Grow From Bad to Great Credit",
    desc: "How to recover from derogatories and rebuild a strong profile.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Sep 29, 2023",
    category: "Credit Repair",
    readTime: "6 min",
    views: "1",
    link: "/blog/derogatory-credit-marks",
    author: "Sarah Sharkey",
  },
  {
    id: 78,
    title: "What Are Credit Scores?",
    desc: "Why scores exist, how they’re calculated, and how to improve them.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Sep 25, 2023",
    category: "Credit Basics",
    readTime: "6 min",
    views: "42",
    link: "/blog/what-are-credit-scores",
    author: "Ellen Johnson",
  },
  {
    id: 79,
    title: "A Guide to Credit Card Fees and How to Avoid Them",
    desc: "Common fees, how they’re triggered, and ways to steer clear.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Sep 21, 2023",
    category: "Credit Cards",
    readTime: "5 min",
    views: "1",
    link: "/blog/guide-to-credit-card-fees",
    author: "Sarah Sharkey",
  },
  {
    id: 80,
    title: "What Is Bad Credit and How Can It Affect You?",
    desc: "Defining bad credit, its impact, and ways to fix it.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Sep 16, 2023",
    category: "Credit Repair",
    readTime: "6 min",
    views: "23",
    link: "/blog/what-is-bad-credit",
    author: "Ellen Johnson",
  },
  {
    id: 81,
    title: "Secured vs. Unsecured Debt: Pros and Cons",
    desc: "Understand risks and benefits of secured versus unsecured credit.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&h=800&fit=crop",
    date: "Sep 14, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "11",
    link: "/blog/secured-vs-unsecured-debt",
    author: "Ellen Johnson",
  },
  {
    id: 82,
    title: "Are Credit Inquiries Really Killing Your Credit?",
    desc: "Hard vs. soft inquiries and their true impact on scores.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Sep 10, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "20",
    link: "/blog/are-credit-inquiries-killing-your-credit",
    author: "Ellen Johnson",
  },
  {
    id: 83,
    title: "Credit-Builder Loans: Can They Help You?",
    desc: "When credit-builder loans make sense and how to use them well.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Sep 08, 2023",
    category: "Credit Repair",
    readTime: "6 min",
    views: "19",
    link: "/blog/credit-builder-loans-can-they-help",
    author: "Ellen Johnson",
  },
  {
    id: 84,
    title: "How Do Tradelines Work?",
    desc: "A primer on tradelines, how they function, and potential impacts.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Sep 07, 2023",
    category: "Tradelines",
    readTime: "7 min",
    views: "24",
    link: "/blog/how-do-tradelines-work",
    author: "Tradeline Supply Company, LLC",
  },
  {
    id: 85,
    title: "FICO Resilience Index: Should You Be Worried?",
    desc: "What the FRI measures and how it could affect lending decisions.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Aug 30, 2023",
    category: "Credit Basics",
    readTime: "5 min",
    views: "11",
    link: "/blog/fico-resilience-index",
    author: "Ellen Johnson",
  },
  {
    id: 86,
    title: "How to Reach Your Savings Goals",
    desc: "SMART strategies to plan and hit savings milestones.",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1200&h=800&fit=crop",
    date: "Aug 25, 2023",
    category: "Personal Finance",
    readTime: "5 min",
    views: "2",
    link: "/blog/how-to-reach-savings-goals",
    author: "Sarah Sharkey",
  },
  {
    id: 87,
    title: "How to Build Credit with Secured Credit Cards",
    desc: "Using secured cards to establish or rebuild credit the right way.",
    image: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=1200&h=800&fit=crop",
    date: "Aug 18, 2023",
    category: "Credit Cards",
    readTime: "5 min",
    views: "2",
    link: "/blog/build-credit-with-secured-cards",
    author: "Sarah Sharkey",
  },
  {
    id: 88,
    title: "Bad Credit Car Loans—What to Do & Why",
    desc: "Navigating auto financing with poor credit and improving odds.",
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop",
    date: "Aug 10, 2023",
    category: "Loans",
    readTime: "6 min",
    views: "7",
    link: "/blog/bad-credit-car-loans",
    author: "Sarah Sharkey",
  },
  {
    id: 89,
    title: "How to Fix the Most Common Credit Report Errors",
    desc: "Identify and dispute frequent credit report mistakes effectively.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=800&fit=crop",
    date: "Aug 03, 2023",
    category: "Credit Repair",
    readTime: "5 min",
    views: "16",
    link: "/blog/fix-common-credit-report-errors",
    author: "Ellen Johnson",
  },
  {
    id: 90,
    title: "Buying Primary Tradelines: Fact, Fiction, or Fraud?",
    desc: "Why purchasing “primary” tradelines is risky and may not help.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop",
    date: "Aug 02, 2023",
    category: "Tradelines",
    readTime: "6 min",
    views: "12",
    link: "/blog/buying-primary-tradelines",
    author: "Tradeline Supply Company, LLC",
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // Display 9 cards per page; page count will expand as needed
  const postsPerPage = 9;
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const filteredPosts = posts.filter(
    (post) =>
      (activeCategory === "all" || post.category.toLowerCase() === activeCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Enforce a maximum of 8 pages with 9 cards each; cap the list accordingly
  const maxPages = 8;
  const cappedPosts = filteredPosts.slice(0, maxPages * postsPerPage);

  const totalPages = Math.min(maxPages, Math.ceil(cappedPosts.length / postsPerPage));
  const paginatedPosts = cappedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  return (
    <div className="min-h-screen bg-white text-slate-900 pt-24">
      {/* Hero */}
      <section id="hero" className="bg-gradient-to-br from-sky-50 via-white to-blue-50 border-b border-sky-100">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center space-y-6 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-white border border-sky-100 text-sky-700 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.22em]"
          >
            <div className="w-2 h-2 bg-sky-500 rounded-full" />
            Knowledge Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black leading-tight"
          >
            Credit Education & Resources
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Articles, guides, and updates to help you understand tradelines, credit scores, and responsible credit building.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Search & Filters */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-1 min-w-[240px] max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400 text-slate-800 placeholder:text-slate-500"
                />
              </div>
            <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${activeCategory === "all"
                  ? "bg-sky-600 text-white border-sky-600 shadow"
                  : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
                  }`}
              >
                All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${activeCategory === cat.slug
                    ? "bg-sky-600 text-white border-sky-600 shadow"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-300"
                    }`}
                >
                  {cat.name}
                  </button>
                ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                >
                <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                    className="object-cover"
                    />
                  <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                    </span>
                      <span>•</span>
                    <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>
                  <h3 className="text-lg font-semibold leading-tight">{post.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {post.desc}
                    </p>
                  {post.id === 1 || post.id === 3 || post.id === 4 || post.id === 5 || post.id === 6 || post.id === 7 || post.id === 8 || post.id === 9 || post.id === 10 || post.id === 11 || post.id === 12 || post.id === 13 || post.id === 14 || post.id === 15 || post.id === 16 || post.id === 17 || post.id === 18 || post.id === 19 || post.id === 20 || post.id === 21 || post.id === 22 || post.id === 23 || post.id === 24 || post.id === 25 || post.id === 26 || post.id === 27 || post.id === 28 || post.id === 29 || post.id === 30 || post.id === 31 || post.id === 32 || post.id === 33 || post.id === 34 || post.id === 35 || post.id === 36 || post.id === 37 || post.id === 38 || post.id === 39 || post.id === 40 || post.id === 41 || post.id === 42 || post.id === 43 || post.id === 44 || post.id === 45 || post.id === 46 || post.id === 47 || post.id === 48 || post.id === 49 || post.id === 50 || post.id === 51 || post.id === 52 || post.id === 53 || post.id === 54 || post.id === 55 || post.id === 56 || post.id === 57 ? (
                    <button
                      onClick={() => setSelectedPost(post.id)}
                      className="inline-flex items-center gap-2 text-sky-700 font-semibold hover:gap-3 transition"
                    >
                      Read more
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={post.link}
                      className="inline-flex items-center gap-2 text-sky-700 font-semibold hover:gap-3 transition"
                    >
                      Read more
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>

      {/* Side modals for detailed read */}
      {selectedPost === 1 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 12, 2025 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Is a Balance Transfer Worth It? How to Know if It’s Right for You</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Balance transfers move debt from a higher-interest card to one with a lower or 0% promo APR. They can save significant interest, but only if you avoid fees, late payments, and new spending.</p>
              <p><strong>What is a balance transfer?</strong> It’s paying one card with another, usually one offering a 0% intro APR. Banks profit via transfer fees (often 3–5%), interchange on new spend, and when balances linger after the promo or late/penalty APR kicks in.</p>
              <p><strong>Good balance transfer cards</strong> typically pair 0% intro APR for 12–18 months, low/0% transfer fees, and no annual fee. Rewards are secondary—focus on paying off the transferred balance, not new purchases.</p>
              <p><strong>How it works:</strong> Apply or accept a promo, provide the account to pay, keep paying the old card until the transfer posts, then pay the new card on time every month.</p>
              <p><strong>Fees and limits:</strong> Transfer fees add to the balance and count toward the credit limit. Know the card’s balance-transfer-specific limit and leave room for the fee.</p>
              <p><strong>Pros:</strong> Lower/0% interest during promo, simpler payoff plan, possible utilization improvements (if opening a new line).</p>
              <p><strong>Cons/risks:</strong> Fees, retroactive/deferred interest on some offers, penalty APR if late, temptation to spend on the new or old card, and potential hit to average account age/hard inquiry.</p>
              <p><strong>When it can help:</strong> You can pay off (or mostly pay off) within the intro window, total debt is manageable (often &lt;$15k), and you won’t add new debt.</p>
              <p><strong>When it may not help:</strong> Very low existing APR, very small balance (fees outweigh savings), or spending isn’t under control.</p>
              <p><strong>Steps to make it work:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pick a card with long 0% intro APR, low fee, no annual fee; avoid deferred interest terms.</li>
                <li>Do the math: interest saved minus fees; plan payments to finish before promo ends.</li>
                <li>Automate payments—never be 60 days late.</li>
                <li>Don’t spend on the transfer card (or the cleared card); focus on payoff.</li>
                <li>If needed, consider one follow-up transfer—but don’t serially roll balances without payoff.</li>
              </ul>
              <p><strong>Credit impact:</strong> Opening a new card can improve utilization but adds an inquiry and lowers age. Transfers between existing cards mainly help by smoothing individual utilization, not overall.</p>
              <p><strong>Bottom line:</strong> A balance transfer is worth it when the fee plus any residual interest is less than what you’d otherwise pay, and when you have a realistic, disciplined payoff plan.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 3 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 03, 2025 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Credit Myth Busting: The Opt-Out Myth</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>The “opt-out” myth claims that removing yourself from prescreened credit offers raises your credit score. It does not. Prescreening generates only soft inquiries, and soft inquiries never affect credit scores.</p>
              <p><strong>What are prescreened offers?</strong> Card issuers buy lists from bureaus that match criteria (e.g., score range, no recent bankruptcies). They mail you “preapproved” offers. This is legal and common.</p>
              <p><strong>Do prescreened offers add inquiries?</strong> Yes—soft inquiries only. Soft inquiries do not impact scores and are visible mainly to you; scoring models ignore them.</p>
              <p><strong>Opting out:</strong> You can remove yourself from lists for free at <a href="https://www.optoutprescreen.com" className="text-sky-700 underline" target="_blank" rel="noreferrer">optoutprescreen.com</a> (5-year or permanent options). Opting out will not raise your score; it just stops mailers.</p>
              <p><strong>Soft vs. hard inquiries:</strong> Hard inquiries follow credit applications and can trim a few points temporarily. Soft inquiries (prescreen, employer checks, some landlord checks) do not affect scores.</p>
              <p><strong>Why the myth is wrong:</strong> Credit scores don’t factor prescreen soft pulls, and they don’t know if you opted out. Therefore, opting out cannot move your score.</p>
              <p><strong>Scam warning:</strong> Ignore anyone charging to “opt you out to boost scores.” Opting out is free, fast, and unrelated to score changes.</p>
              <p><strong>Bottom line:</strong> Opt out if you want less mail or fewer offers shared, not to improve your credit score. Soft inquiries from prescreening are score-neutral.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 4 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 26, 2025 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Reasons Why You May Not Have a Credit Score</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Millions are “credit invisible” and can’t generate a score. Scoring models need minimum data to produce a number; without it, lenders receive a failure code instead of a score.</p>
              <p><strong>FICO minimum criteria:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>At least one undisputed tradeline (an account, not a collection or public record).</li>
                <li>That tradeline is at least six months old.</li>
                <li>Recent activity reported within the last six months.</li>
                <li>You are not flagged as deceased.</li>
              </ul>
              <p><strong>VantageScore minimum criteria:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Not listed as deceased.</li>
                <li>Typically 1–2 months of history with any bureau (easier to qualify than FICO).</li>
              </ul>
              <p><strong>Why you might have no score:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No open, undisputed accounts reporting.</li>
                <li>Accounts too new (less than 6 months for FICO).</li>
                <li>No recent updates in the last 6 months.</li>
                <li>Data errors such as “deceased” flags.</li>
              </ul>
              <p><strong>What lenders see:</strong> Instead of a score, they get a reject/failure code indicating insufficient data or unmet criteria.</p>
              <p><strong>How to become scoreable:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Open a starter account (secured card, credit-builder loan, or AU on a well-managed card).</li>
                <li>Keep it active with small charges and on-time payments.</li>
                <li>Allow time: 1–2 months for VantageScore, ~6 months for FICO.</li>
              </ul>
              <p><strong>Note:</strong> Tradelines can sometimes lower scores; results aren’t guaranteed. Always manage new accounts responsibly.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 5 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 20, 2025 • Amy Marshall</p>
                <h2 className="text-xl font-bold text-slate-900">2025 Car Shopping Secrets Unlocked</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Tips for getting the best deal on a new car in 2025—even with less-than-perfect credit—and avoiding costly missteps.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Bad credit? Still possible.</strong> Look at bad-credit finance specialists or in-house financing; compare multiple offers.</li>
                <li><strong>Expand your search.</strong> Check multiple dealers and regions; act quickly on good listings.</li>
                <li><strong>Order your vehicle.</strong> Configure online and send to your chosen dealer to avoid on-lot pressure.</li>
                <li><strong>Consider new vs. used.</strong> New = full history and latest safety tech; weigh against budget.</li>
                <li><strong>Home delivery.</strong> Many dealers deliver; it’s convenient and often free.</li>
                <li><strong>High-volume dealers.</strong> They may have better pricing and access to incentives—ask about rebates.</li>
                <li><strong>Don’t trust every online price.</strong> Watch for missing fees; verify in writing.</li>
                <li><strong>Read the fine print.</strong> Spot add-ons, dealer fees, and financing terms before signing.</li>
                <li><strong>Call many dealers.</strong> Use competing quotes to negotiate.</li>
                <li><strong>Be flexible on color/options.</strong> Flexibility helps secure better pricing/availability.</li>
                <li><strong>Independent inspection.</strong> Even on “new,” inspect a used or in-transit unit if possible.</li>
                <li><strong>Shop the loan.</strong> Get pre-approval; compare bank/CU/online rates.</li>
                <li><strong>Walk away power.</strong> Be ready to leave if terms don’t fit.</li>
                <li><strong>Set your budget first.</strong> Don’t let the salesperson anchor your number.</li>
                <li><strong>Check OEM rebates/incentives.</strong> Stack eligible offers.</li>
                <li><strong>Due diligence.</strong> Research safety, reliability, total cost of ownership.</li>
                <li><strong>Test drive thoroughly.</strong> Braking, handling, comfort, tech, visibility.</li>
                <li><strong>Timing helps.</strong> Year-end or model-change periods can improve deals.</li>
                <li><strong>Skip unnecessary add-ons.</strong> Extras can balloon the price; add later if needed.</li>
              </ul>
              <p className="text-xs text-slate-500">Disclosure: This article may contain affiliate links.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 6 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 30, 2025 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Credit Card Credit Building—2025 Best Cards for Credit Building</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>How to use credit cards responsibly to build (or rebuild) credit in 2025, plus top picks by scenario. Disclosure: may include affiliate links.</p>
              <p><strong>Before you apply:</strong> Be honest about your budget. Cards help only if you pay on time and in full. If not, start with smaller steps first.</p>
              <p><strong>Top 2025 picks (by need):</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Credit invisible:</strong> Credit Builder Secured Card — deposit-based, reports to bureaus; Discover It Secured — $0 annual fee, cash back, min $200 deposit.</li>
                <li><strong>Beginning/student:</strong> Discover It Student Cash Back — $0 fee, rotating 5% categories (up to quarterly caps), 1% everywhere else.</li>
                <li><strong>Buying a car soon:</strong> Chase Freedom Unlimited — 1.5% cash back; if a dealer allows partial card payment, you may offset costs.</li>
                <li><strong>Prepping for a home loan:</strong> Petal 2 — no annual fee or deposit; considers cashflow, limits $300–$10k, up to 1.5% cash back.</li>
                <li><strong>Building business credit:</strong> Bank of America Secured Business — $0 fee, secured line $200–$5k, 1.5% cash back.</li>
                <li><strong>Post-bankruptcy rebuild:</strong> OpenSky Secured Visa — no credit check, $200–$3k deposit, $35 fee; Citi Secured Mastercard — $0 fee, $200+ deposit.</li>
                <li><strong>Great-credit rewards “side gig”:</strong> Chase Sapphire Preferred — welcome bonus, strong travel partners, but $95 fee and needs good credit.</li>
              </ul>
              <p><strong>Key habits to build credit:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pay on time, every time (auto-pay helps).</li>
                <li>Keep utilization low; aim under ~10–20% of limit.</li>
                <li>Avoid new debt you can’t clear each month.</li>
                <li>Let accounts age; don’t close good, no-fee lines.</li>
              </ul>
              <p><strong>Security deposits (secured cards):</strong> Typical range $200–$500 to set the limit; some offer higher. Aim for a limit that keeps utilization low.</p>
              <p><strong>Students/first-timers:</strong> Start small, use for a recurring bill, auto-pay in full, and track rotating categories if applicable.</p>
              <p><strong>Auto purchase angle:</strong> Not all dealers accept large card amounts; ask first. Never carry the promo balance past intro periods.</p>
              <p><strong>Mortgage prep:</strong> Focus on spotless payment history and low utilization months before applying; avoid new hard pulls close to mortgage apps.</p>
              <p><strong>Business credit:</strong> Keep business spend separate, pay in full, and watch reporting to business bureaus if applicable.</p>
              <p><strong>Post-bankruptcy:</strong> Choose low/known fees, pay on time, and plan to graduate to unsecured after 6–12 months of perfect history.</p>
              <p><strong>Bottom line:</strong> Choose the card that fits your stage (invisible, rebuild, student, car/home goal, business, rewards). Use it lightly, pay in full, and let time + clean history raise your score.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 7 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 27, 2025 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Protect Your Finances as a Pet Parent</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Pet ownership brings joy—and real costs. Upfront and ongoing expenses (vet care, emergencies, food, grooming, supplies, training, insurance, boarding, housing impacts) can run into thousands yearly. Without a plan, surprise bills can trigger high-interest debt.</p>
              <p><strong>Key risks/cost drivers:</strong> Routine and emergency vet care, quality food, grooming, supplies, training, insurance premiums, boarding, and housing changes (fees, larger space).</p>
              <p><strong>Protect your finances:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Be realistic before adopting:</strong> Budget for breed/size, health risks, lifespan, grooming, food, housing, and travel/boarding needs.</li>
                <li><strong>Build a pet emergency fund:</strong> Save monthly in a dedicated bucket; size it to your pet’s age/health risks.</li>
                <li><strong>Preventive care:</strong> Regular exams, vaccines, preventives (flea/tick/heartworm), good diet, exercise, dental/grooming to avoid bigger bills.</li>
                <li><strong>Consider pet insurance:</strong> Compare coverage, exclusions, deductibles, and reimbursements; enroll early to avoid pre-existing condition exclusions.</li>
                <li><strong>Seek savings:</strong> Buy in bulk, use generics/store brands, track sales/loyalty, DIY basic grooming, subscription deals for staples.</li>
                <li><strong>Protect from harm:</strong> Pet-proof home, secure outdoors, ID tags/microchip, training/recall to prevent accidents and costs.</li>
              </ul>
              <p><strong>If a surprise bill hits:</strong> Prioritize needs, ask vets about payment plans or lower-cost options, avoid high-interest debt when possible.</p>
              <p className="text-xs text-slate-500">Disclosure: This article may contain affiliate links.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 8 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 26, 2025 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Improve Your Credit Score in 2025</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>A stronger score can cut borrowing costs, open approvals, improve rental chances, and even help in job searches—especially with higher rates in 2025.</p>
              <p><strong>Why build your score:</strong> Lower APRs and total interest, better loan program access, smoother renting (lower deposits), and potential employer checks.</p>
              <p><strong>Habits to raise scores:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check your scores regularly (soft pulls don’t hurt); know ranges: Poor 300–579, Fair 580–669, Good 670–739, Very Good 740–799, Excellent 800–850.</li>
                <li>Review credit reports; dispute errors that drag scores down.</li>
                <li>Payment history is king—pay on time, every time (35% of FICO). Communicate with lenders if trouble arises.</li>
                <li>Use autopay for at least minimums; still review statements for errors.</li>
                <li>Keep utilization low—aim under ~10–20%, never max cards.</li>
                <li>Build a budget and monitor spend to avoid late payments and high balances.</li>
                <li>Save monthly; an emergency fund prevents debt spikes after surprises.</li>
                <li>Add positive data: open well-managed primary accounts or become an authorized user on a responsibly managed card.</li>
                <li>Consider a credit-builder loan to add installment history; pay on time.</li>
              </ul>
              <p><strong>Bottom line:</strong> Small, consistent moves—on-time payments, low utilization, clean reports, and steady savings—compound into better scores and cheaper credit.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 9 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 18, 2025 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Deal With Holiday Debt</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Holiday fun can leave a post-season balance. Average holiday debt can top $1,000, and many didn’t plan for it. Here’s how to clear it and prevent a repeat.</p>
              <p><strong>What is holiday debt?</strong> Seasonal borrowing for gifts, travel, decor, and events—often on high-APR cards or personal loans.</p>
              <p><strong>Payoff steps:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Take stock:</strong> List every balance, rate, and minimum.</li>
                <li><strong>Trim temporarily:</strong> Cut non-essentials (subscriptions, dining out) and redirect to debt.</li>
                <li><strong>Pick a method:</strong> Snowball (smallest first for momentum) or Avalanche (highest APR first to save interest). Stick to one plan.</li>
                <li><strong>Consider consolidation:</strong> If it lowers rate and you won’t re-run card balances. Beware of adding new debt on cleared cards.</li>
                <li><strong>Reset habits:</strong> Differentiate wants vs. needs; try a no-spend sprint to break impulses.</li>
                <li><strong>Boost income:</strong> Side gigs (freelance, gigs, selling) dedicated fully to payoff.</li>
              </ul>
              <p><strong>Avoid it next year:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Start a holiday sinking fund early; automate monthly saves.</li>
                <li>Make a detailed budget (gifts, travel, decor) and add a buffer.</li>
                <li>Set boundaries; propose spending limits or creative exchanges.</li>
                <li>Don’t compete with social media—focus on time, not price tags.</li>
              </ul>
              <p><strong>FAQs:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><em>Recover from holiday spending?</em> Inventory balances, tighten budget, pay down, then pre-save for next season.</li>
                <li><em>Do people go into debt?</em> Yes—over a third do each year.</li>
                <li><em>Manage card debt while shopping?</em> Set a strict budget; if overwhelmed, consider consolidation but avoid recharging cards.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 10 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 12, 2025 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">How to Use Credit Cards Responsibly Without Going Into Debt</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit cards aren’t the enemy—interest is. Used wisely, they’re a free, protected payment tool that can earn rewards without debt.</p>
              <p><strong>APR? Ignore it—if you pay in full.</strong> High APR only matters if you carry a balance. Paying in full each month makes APR irrelevant.</p>
              <p><strong>Golden rule:</strong> Charge only what you can pay in full every month. Treat cards like cash with buyer protections.</p>
              <p><strong>Keep utilization low:</strong> Stay well below your limit (ideally &lt;10–20%). Before big loans (mortgage/auto), avoid high statement balances to protect your score and rate.</p>
              <p><strong>Never skip a payment:</strong> “Skip-a-payment” promos = interest + bigger next bill. Always pay by the due date; automate at least the minimum, then pay in full.</p>
              <p><strong>Practical tips:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Autopay full balance; set alerts to review charges.</li>
                <li>Use one card for routine spend; track it like a checking account.</li>
                <li>Avoid impulse buys; if cash isn’t on hand, skip it.</li>
                <li>Consider no-fee cards unless rewards outweigh an annual fee.</li>
              </ul>
              <p><strong>Bottom line:</strong> Pay in full, on time, with low utilization. Do that, and credit cards become a safe, rewarding tool—not a debt trap.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 11 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 09, 2025 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Improve Your Finances in 2025</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Smart money choices can lower stress, break paycheck-to-paycheck cycles, and add flexibility. Here’s a roadmap to level up your finances in 2025.</p>
              <p><strong>Start with a snapshot:</strong> Check cash flow (income – expenses) and net worth (assets – liabilities). Aim for positive cash flow and a rising net worth.</p>
              <p><strong>Evaluate debt:</strong> List balances and rates. Pick a payoff plan—Snowball (smallest first for motivation) or Avalanche (highest APR first to save interest)—and stick to it.</p>
              <p><strong>Inspect spending:</strong> Track transactions; cut what doesn’t matter. Cancel unused subs, rein in takeout, and avoid leaks.</p>
              <p><strong>Set and use a budget:</strong> Include essentials and goals (emergency fund, retirement, sinking funds). Add a buffer for surprises and course-correct when needed.</p>
              <p><strong>Create savings goals:</strong> Define targets (emergency fund, home, holidays). Break them into monthly amounts and automate transfers.</p>
              <p><strong>Get creative to hit goals:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cut extra expenses (dining out, subs, even housing/transport if needed—even temporarily).</li>
                <li>Boost income with side gigs (44% of Americans have one). Channel the extra straight to goals or debt.</li>
              </ul>
              <p><strong>Work on credit:</strong> On-time payments (35% of FICO) first. Keep utilization low, fix report errors, and avoid overspending.</p>
              <p><strong>Why it matters:</strong> Better stability, lower stress (money worries hit 72% of Americans), cheaper borrowing, and more options.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 12 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Dec 22, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Debit vs. Credit Cards: Which Is the Better Way to Pay?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit expert John Ulzheimer breaks down debit vs. credit across fraud, credit building, buying power, usability, and budget control.</p>
              <p><strong>How they work:</strong> Debit pulls from your bank account instantly; credit borrows from the issuer and can revolve (if you choose).</p>
              <p><strong>Fraud protection:</strong> Debit steals your cash and can be harder to recover; credit is the issuer’s money, protected by FCBA ($50 max liability) and network $0 liability policies—stronger protection.</p>
              <p><strong>Credit building:</strong> Credit cards report to bureaus (age, history, utilization). Debit never builds credit.</p>
              <p><strong>Buying power:</strong> Debit limited to account balance; credit limited by your credit limit, often higher.</p>
              <p><strong>Usability:</strong> Rentals, hotels, travel holds often prefer/require credit; holds on debit can freeze your funds.</p>
              <p><strong>Budget control:</strong> Debit can help restrain spending if you overspend with credit. Credit offers more flexibility but requires discipline.</p>
              <p><strong>Bottom line:</strong> Choose based on your priorities. Credit wins on fraud protection, credit building, buying power, and travel usability. Debit can help if you need tighter budget guardrails. Always pay credit cards in full to avoid interest.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 13 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Dec 19, 2024</p>
                <h2 className="text-xl font-bold text-slate-900">Buy Now, Pay Later: Credit Impact Guide</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>BNPL splits purchases into short-term installments, sometimes at 0%—but credit impacts vary by provider and how you use it.</p>
              <p><strong>Credit checks:</strong> Some BNPLs use hard pulls, which can ding scores a few points.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Hard/soft mixed:</strong> Affirm (soft for Pay-in-4; hard for longer terms), PayPal (soft for Pay in 4; hard for PayPal Credit), Klarna (soft for Pay in 4/Pay in 30; hard for monthly financing).</li>
                <li><strong>No hard pull:</strong> Afterpay, Zip (may use credit-related info), Sezzle.</li>
              </ul>
              <p><strong>Reporting to bureaus:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Reports (some/all):</strong> Affirm reports most non–Pay-in-4 loans to Experian; Sezzle can report to TransUnion if you opt into Sezzle Up; Klarna may report late payments on monthly financing.</li>
                <li><strong>Doesn’t report positives (may report negatives):</strong> Zip may report late/default; PayPal Pay in 4 may report if unpaid.</li>
                <li><strong>Doesn’t report:</strong> Afterpay for Pay in 4; Klarna for Pay in 4/Pay in 30.</li>
              </ul>
              <p><strong>How BNPL can help:</strong> If reported, on-time payments (35% of score) can help. Easier approvals can add tradelines for thin files.</p>
              <p><strong>How BNPL can hurt:</strong> Missed payments reported = score drop; multiple short-term accounts can lower average age (15% of score); repeated hard pulls reduce scores; overspending risk grows.</p>
              <p><strong>Is BNPL smart for you?</strong> Good for spreading costs at 0% if you’re disciplined. But it can tempt overspending and clutter your credit with short-term accounts. Always read terms: check for hard pulls and whether payments are reported. If protecting credit, choose non-reporting/no-hard-pull options; if building credit, pick a provider that reports and pay on time.</p>
              <p><strong>Tip:</strong> Saving ahead is safest—use BNPL only when you’re sure payments fit your budget and you’ve confirmed the credit impact.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 14 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Dec 15, 2024 • John Ulzheimer</p>
                <h2 className="text-xl font-bold text-slate-900">How Are Authorized User Tradelines Considered?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Authorized user (AU) tradelines are scored. If the card reports to your file, scoring systems consider its age, limit, balance, and payment history—just like if you were the primary.</p>
              <p><strong>Why AUs matter:</strong> Positive AUs can add history, improve utilization, and strengthen payment mix. Negative AUs (lates, high utilization) can hurt you.</p>
              <p><strong>How scoring treats AUs:</strong> All mainstream models count AUs. Past abuse (piggybacking) led to dampening logic, but AUs remain in scope.</p>
              <p><strong>Benefits when the account is healthy:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Older account can raise average age.</li>
                <li>Clean payment history helps payment mix.</li>
                <li>Low balance vs. limit can improve utilization.</li>
              </ul>
              <p><strong>Risks:</strong> Late payments or high balances on the AU card will likely weigh on your scores. Avoid attaching to mismanaged accounts.</p>
              <p><strong>Best practice:</strong> Choose only well-managed cards (on-time, low utilization, long history). If the account degrades, remove yourself.</p>
              <p className="text-xs text-slate-500">Disclaimer: Views are the author’s and not necessarily those of Tradeline Exchange.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 15 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Nov 21, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">The Top 3 Credit Myths That Won’t Go Away</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit expert John Ulzheimer busts three persistent myths that still mislead consumers.</p>
              <p><strong>Myth 1: Revolving utilization = 30% of your score.</strong> Utilization is important but it’s only part of the “amounts owed” category. That 30% weight includes total debt, debts by type, number of accounts with balances, and installment utilization. Revolving utilization alone is worth less than 30%.</p>
              <p><strong>Myth 2: Closing an old card erases its age.</strong> Closed cards continue to age and count toward average age while on file. But closing removes the available limit, which can worsen utilization.</p>
              <p><strong>Myth 3: Employers can see your credit scores.</strong> Employers can pull a version of your credit report (with consent) but not your scores. Reports provided to employers differ from lender versions and do not include scores.</p>
              <p className="text-xs text-slate-500">Disclaimer: Views are the author’s and not necessarily those of Tradeline Exchange.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 16 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Nov 15, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">4 More Master Money Habits for Wealth</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Advance your money game with four cognitive skills: multitasking goals, working memory, category formation, and pattern recognition—plus an emergency fund foundation.</p>
              <p><strong>Multiple simultaneous attention:</strong> Balance several goals (e.g., retirement + home) without spreading too thin. Start with 1–2 goals; ensure an emergency fund (3–6 months, ideally up to 12) before branching out.</p>
              <p><strong>Working memory:</strong> Keep your plan in mind to avoid impulse spend. Write the plan, review daily, track spending, and use “I’ll think about it” to realign budget before buying.</p>
              <p><strong>Category formation:</strong> Organize money into clear buckets (groceries, bills, investments, debt; short vs. long term). Adjust categories as goals change; purposeful buckets make rerouting funds harder.</p>
              <p><strong>Pattern recognition:</strong> Spot trends in your spend (e.g., mood spending), market habits, and savings progress. Avoid analysis paralysis—align patterns to your goals and change behaviors accordingly.</p>
              <p><strong>FAQs / setup tips:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Track spending ~3 months, then budget with visuals (charts/apps).</li>
                <li>Build emergency fund first; then retirement (401(k)/IRA), then short-term goals.</li>
                <li>Use side income or cuts to fuel goals; build habits gradually to avoid burnout.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 17 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Nov 05, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">Four Best First Money Habits to Master</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Reframe “I’m bad with money” by building four core cognitive money habits: sustained attention, response inhibition, faster processing, and cognitive flexibility.</p>
              <p><strong>Sustained attention:</strong> Spend focused time with your money—track, manage, and grow. Weekly check-ins curb bloated spending and keep big goals (e.g., $6k/year) on track. An accountability buddy helps.</p>
              <p><strong>Response inhibition:</strong> Resist marketing/FOMO. Use a 24-hour rule for carts, budget a “fun money” bucket, and reroute impulses to savings.</p>
              <p><strong>Processing speed:</strong> Start small (budget first), then debt, saving, investing—one at a time. Money is a new language; go in small chunks until it clicks.</p>
              <p><strong>Cognitive flexibility:</strong> Change your money mindset (“I’m learning to be better with money”), pivot categories/goals when life changes, and align budgets to current priorities.</p>
              <p><strong>FAQs:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Money skills: commit, practice, and seek accountability (money groups).</li>
                <li>Fun spending: common 50/30/20 guide, but adjust to your reality; cover needs and savings first.</li>
                <li>Balance short vs. long-term: build habits sequentially—focus on one goal, then layer the next once stable.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 18 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Nov 03, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Insider’s Guide to Buying Credit Repair</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Unbiased look at whether you need credit repair, when to DIY, how to choose a legit firm, and how to spot scams.</p>
              <p className="text-xs text-slate-500">Disclosure: Tradeline Exchange is not affiliated with companies mentioned. Informational only—no endorsement or compensation.</p>
              <p><strong>Do you need credit repair?</strong> Yes, if errors or fraud appear on reports. No, if reports are accurate—even if scores are low.</p>
              <p><strong>DIY steps:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pull free reports (AnnualCreditReport.com); dispute errors with Equifax/Experian/TransUnion.</li>
                <li>Make on-time payments (35% of FICO); contact lenders if struggling.</li>
                <li>Use a debt payoff plan (Snowball or Avalanche) to lower balances.</li>
              </ul>
              <p><strong>Why hire a company?</strong> Saves time on heavy/fraud disputes; brings process expertise. Consider cost vs. your bandwidth.</p>
              <p><strong>Legit companies do:</strong> Review reports, dispute inaccuracies, may monitor for fraud. They won’t dispute accurate, negative data.</p>
              <p><strong>5 traits of good firms:</strong> Realistic promises; clear upfront pricing; detailed contract; strong third-party reviews; money-back guarantees (when offered).</p>
              <p><strong>Scam red flags:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upfront fees before work (illegal).</li>
                <li>Ongoing fees without clear value.</li>
                <li>Promises to remove accurate data or “everything negative.”</li>
                <li>Bad reviews; pressure tactics.</li>
                <li>CPN pitches or identity-theft filing schemes.</li>
              </ul>
              <p><strong>DIY dispute links:</strong> Equifax, Experian, TransUnion portals—be ready with documentation; responses may take days/weeks.</p>
              <p><strong>Costs:</strong> Typical services run ~$30–$200/month for several months; DIY is free.</p>
              <p><strong>Fastest improvement:</strong> Combine accurate dispute removal with paying down debt and perfect payment history.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 19 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Oct 27, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Why Did My Credit Score Go Down?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Common reasons scores drop—and what to check—spanning new accounts, utilization, lates, inquiries, closures, fraud, and more.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>New accounts / reduced age:</strong> Fresh tradelines (including thin AU cards) cut average age (15% of score; tied to payment history).</li>
                <li><strong>Higher balances/utilization:</strong> Bigger balances or not paying in full raises utilization (~30% weight). Pay early, pay often, raise limits, or transfer balances.</li>
                <li><strong>New loans & inquiries:</strong> Hard pulls cost up to ~5 pts each; new credit ≈10% weight. Approvals or denials both post inquiries.</li>
                <li><strong>Lates:</strong> 30/60/90-day lates crush scores (payment history 35%). One 30-day can drop 60–110 pts; 90-day is major derog.</li>
                <li><strong>Collections/charge-offs/major derogs:</strong> These severely hurt scores.</li>
                <li><strong>Multiple apps:</strong> Clustered card applications = multiple inquiries; riskier profile.</li>
                <li><strong>Closed cards / limit cuts:</strong> Lowers available credit → higher utilization; closed cards can also hit mix.</li>
                <li><strong>Fraud/unauthorized activity:</strong> Unknown accounts/charges, merged files, or double-reported collections; dispute fast.</li>
                <li><strong>Partial or missed minimums:</strong> Paying less than minimum can still become a late after 30 days.</li>
                <li><strong>Inactivity closures:</strong> Issuers may close unused cards—use them periodically.</li>
                <li><strong>Paid-off installment loan:</strong> May ding mix once it closes if few accounts remain.</li>
                <li><strong>AU/joint risk:</strong> If the primary goes delinquent or runs high utilization, it hurts you; remove yourself if needed.</li>
                <li><strong>Bankruptcy:</strong> Major negative impact.</li>
              </ul>
              <p><strong>Less common:</strong> Bucket shifts after a collection deletion, file merges, unauthorized inquiries, or credit-limit reductions.</p>
              <p><strong>What to do:</strong> Pull reports, verify inquiries/accounts, dispute errors/fraud, pay on time, lower utilization, avoid rapid-fire apps, and keep healthy cards open/used lightly.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 20 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Oct 24, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Protect Your Credit Score With an Irregular Income</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Irregular income itself isn’t scored, but missed payments and high utilization from lean months can drag scores. Here’s how to shield them.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Budget for variability:</strong> Average past income, subtract taxes, and keep fixed costs low. Use high months to build a buffer.</li>
                <li><strong>Live below your means:</strong> Base essentials on a conservative monthly number to save during good months for lean ones.</li>
                <li><strong>Emergency fund:</strong> Aim for 3–6 months (or more) to cover slow periods and keep payments on time.</li>
                <li><strong>Protect utilization:</strong> Avoid riding balances; pay early/often, raise limits, or use balance transfers if needed. Target &lt;20% (ideally &lt;10%).</li>
                <li><strong>Lower debt burden:</strong> Use snowball or avalanche during strong months to cut mandatory payments.</li>
                <li><strong>Stay current:</strong> On-time payments are 35% of FICO. If timing is tough, ask lenders for due-date moves or hardship options.</li>
              </ul>
              <p><strong>Build the budget:</strong> Compute average net income, list fixed and annualized costs, set realistic variable spend, track via app/pen & paper, and flex when income dips (cut discretionary first). Always fund a buffer line item.</p>
              <p><strong>Improving scores on variable income:</strong> Keep on-time streaks, trim debt, and consider credit repair only for genuine report errors (DIY via bureau disputes or with a reputable firm).</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 21 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Oct 18, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Mortgages 101—What Home Buyers Need to Know</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Key concepts for first-time buyers: loan types, rates, credit, prep steps, and long-term planning.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Mortgage basics:</strong> Fixed vs. adjustable rates; terms typically 15/20/30 years; down payment plus closing costs.</li>
                <li><strong>Get ready early:</strong> Build credit, save for down payment/closing, and learn loan options well before shopping.</li>
                <li><strong>Buy vs. rent:</strong> Rent = flexibility/no equity; buy makes sense with stable income, longer stay, and affordable payment.</li>
                <li><strong>Prep checklist:</strong> Check credit, reduce debt, save down payment, budget for PITI+HOA/maintenance, shop lenders, get pre-approved, gather docs.</li>
                <li><strong>Loan types:</strong> FHA (low down, lenient credit), VA (no down for eligible), USDA (rural, low/no down), Conventional (flexible, good credit).</li>
                <li><strong>Rates:</strong> Driven by markets/Fed; your rate depends on credit, LTV, product. Higher rates shrink budget; lower rates expand it.</li>
                <li><strong>Credit for mortgages:</strong> FICO focus; 620+ common minimum. Good 670–739, Very Good 740–799, Excellent 800+ unlock best terms.</li>
                <li><strong>Assistance:</strong> First-time buyer programs may help with down payment/closing.</li>
                <li><strong>Plan long term:</strong> Budget for taxes, insurance, maintenance, PMI if low down; keep an emergency fund; consider extra payments if you want to pay off early.</li>
              </ul>
              <p><strong>FAQs:</strong> 33% rule is a common housing-cost guideline; 20% down is not required, but smaller downs mean larger loans and possibly PMI.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 22 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Oct 07, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Unlock the Power of Home Equity Loans—Essential Guide</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>How home equity loans/HELOCs work, how to use them, who they fit, and alternatives.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Basics:</strong> Equity = value minus mortgage. Using equity as collateral creates a second mortgage; missed payments risk foreclosure.</li>
                <li><strong>Home equity loan:</strong> Lump sum, fixed rate, fixed payments—predictable budgeting.</li>
                <li><strong>HELOC:</strong> Revolving line, variable rates, redraw as you repay; great for phased/ongoing costs but less predictable.</li>
                <li><strong>Common uses:</strong> Renovations, debt consolidation, education, emergencies, major purchases, events, energy upgrades, portfolio building.</li>
                <li><strong>Calculator tips:</strong> Estimate value and balance, check credit; calculators (e.g., Bankrate) show potential borrow amount/payment. Lenders won’t lend 100% of equity.</li>
                <li><strong>Good fit:</strong> Solid equity, stable finances, prefer predictability, understand the collateral risk.</li>
                <li><strong>Not ideal:</strong> Unstable income, poor credit (costly rates), or small/short-term needs.</li>
                <li><strong>HELOC fit:</strong> Renovations/ongoing expenses; <strong>not</strong> for overspenders, unstable finances, or those wary of using the home as collateral.</li>
                <li><strong>Alternatives:</strong> Personal loans, cards (small/short-term), cash-out refi, family loans, or savings.</li>
                <li><strong>Credit for HE loans:</strong> Many lenders want 620+; better scores unlock better rates.</li>
                <li><strong>Best practices:</strong> Improve credit first; borrow only what you need (or choose a HELOC for flexibility); always pay on time to protect your home.</li>
              </ul>
              <p><strong>Bottom line:</strong> Equity can be powerful, but it puts your home on the line. Choose carefully and borrow prudently.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 23 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Sep 30, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Grow a Thin Credit File</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Thin files (few accounts/no recent activity) make lenders cautious, but they’re easier to fix than bad credit.</p>
              <p><strong>Why thin:</strong> New to credit/younger, new to the U.S., or cash-only/light credit use.</p>
              <p><strong>Impacts:</strong> Harder to get mortgages, auto loans, cards, apartments, and can mean higher deposits/rates.</p>
              <p><strong>Build it out:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Open a <strong>secured credit card</strong> that reports to all three bureaus; pay on time and keep utilization low.</li>
                <li>Use a <strong>credit-builder loan</strong>; pay monthly, get principal back at term end while reporting positive history.</li>
                <li><strong>Add alternative data</strong>: services like Experian Boost (utilities/phone/streaming) or rent-reporting tools.</li>
                <li><strong>Consider a cosigner</strong> for major loans to access better terms while you build history.</li>
              </ul>
              <p><strong>Key habits:</strong> Always pay on time, keep balances low, and ensure chosen products report to all bureaus.</p>
              <p><strong>Bottom line:</strong> Thin is better than bad—add well-managed tradelines, report positive data, and your file and scores will grow.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 24 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Sep 27, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Line of Credit—Essential Guide to Expectations &amp; Realities</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>What LOCs are, how they work, how to qualify, pitfalls, and how they compare with cards/installment loans.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Definition:</strong> Revolving credit up to a limit; draw as needed, repay, and redraw. Interest only on what you use.</li>
                <li><strong>Key parts:</strong> Credit limit, principal, interest (fixed or variable), draw vs. repayment periods, minimums, collateral (if secured).</li>
                <li><strong>Types:</strong> Secured (e.g., HELOC) may allow lower scores/ better terms; unsecured usually needs stronger credit.</li>
                <li><strong>Credit needs:</strong> Requirements vary; HELOCs often 620+; unsecured LOCs often 700+. Higher scores = better limits/rates.</li>
                <li><strong>Qualifying tips:</strong> Consider secured options, raise scores, pay down debt, compare lenders, keep income steady.</li>
                <li><strong>How to apply:</strong> Check scores, review finances, pick LOC type, research lenders, apply with income/assets/liabilities info.</li>
                <li><strong>Pitfalls:</strong> Overborrowing, revolving debt traps, high utilization hurting scores, collateral risk (HELOC = home), variable rates that can rise.</li>
                <li><strong>LOC vs. card:</strong> Cards suit smaller daily spend and rewards but higher APRs; LOCs better for larger/ongoing needs with potentially lower rates.</li>
                <li><strong>LOC vs. installment loan:</strong> Loans give lump sum + fixed payments (good for defined costs); LOCs fit flexible/recurring needs.</li>
                <li><strong>Use well:</strong> Borrow only what you need, pay on time, watch rate changes, and repay quickly to avoid long-term debt.</li>
                <li><strong>If denied:</strong> Improve scores, lower debts, and reapply later; consider other products if needed.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 25 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Sep 08, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Debt Consolidation vs. Credit Card Refinancing: Which Is Right for You?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Compare consolidation loans (installment) vs. card refinancing (balance transfers) to attack high-interest debt and utilization.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Debt consolidation:</strong> Take an installment loan (personal or secured like home equity) to pay cards; one fixed payment, fixed end date, often lower APR than cards. Secured options carry collateral risk.</li>
                <li><strong>Credit card refinancing:</strong> Transfer balances to a lower/0% promo APR card (fees 3–5%, possible annual fee); save interest during promo, but rate jumps after.</li>
                <li><strong>Payments:</strong> Loans = fixed payments/end date; transfers = flexible payments but risk dragging debt out.</li>
                <li><strong>Credit needs:</strong> Balance transfers usually need good/excellent scores; loans can be available to lower scores (better terms with higher scores).</li>
                <li><strong>Collateral:</strong> Loans can be secured (cheaper) or unsecured; transfers never need collateral.</li>
                <li><strong>Costs:</strong> Loans may have origination/prepay fees; transfers have transfer fees and post-promo APR hikes.</li>
                <li><strong>Pros consolidation:</strong> Lower APR potential, fixed rate, simplified single payment.</li>
                <li><strong>Cons consolidation:</strong> Upfront costs, collateral risk if secured.</li>
                <li><strong>Pros refinancing:</strong> 0% intro APR window, flexible payments.</li>
                <li><strong>Cons refinancing:</strong> Looming rate spike, transfer/annual fees, easy to pay too slowly.</li>
                <li><strong>Choose based on:</strong> Credit score, realistic payoff timeline (≤12 months favors 0% transfer), budget flexibility (loans need fixed payment), and comfort with collateral.</li>
                <li><strong>If blocked by low score:</strong> Improve credit (on-time pay, lower utilization, dispute errors) before applying.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 26 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Sep 06, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Essential Guide to Renters’ Rights—What You Need to Know</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p className="text-xs text-slate-500">Disclaimer: General info only, not legal advice. Consult an attorney for legal questions.</p>
              <p>Key rights for tenants: lease types, fair selection, credit reporting options, deposits, habitability, rent hikes, and eviction basics.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Agreements:</strong> Month-to-month = flexibility; fixed-term = stability but less flexibility/penalties for early exit.</li>
                <li><strong>Fair housing:</strong> Landlords can screen on credit/income/evictions/refs; cannot discriminate on protected classes.</li>
                <li><strong>Credit for rent:</strong> Rent not auto-reported—use services (e.g., Experian RentBureau) to build history.</li>
                <li><strong>Security deposits:</strong> State limits, holding rules, and deadlines to return with itemized deductions (e.g., CA: 2x/3x rent caps, 21 days to return with receipts).</li>
                <li><strong>Habitability:</strong> Right to livable conditions (heat, water, electricity, safety). If not, options can include notice/repair requests, withhold/repair-and-deduct (where allowed), calling inspectors, or moving out—check local law.</li>
                <li><strong>Rent increases:</strong> Rules vary; some areas have caps (e.g., CA TPA 5%+CPI up to 10%), notice requirements (often 30+ days), and some local rent control.</li>
                <li><strong>Eviction:</strong> At-fault (nonpayment/violations) vs. no-fault (owner move-in, remodel, etc.). Process usually needs notice + court order. ERA/rent relief may help.</li>
                <li><strong>Entry/visitation:</strong> Landlords typically must give notice (often 24–48 hrs) for non-emergencies.</li>
                <li><strong>Resolving issues:</strong> Start with written requests; document with photos; if unresolved, consider tenant orgs/legal aid or attorneys. Nonprofit/government programs (HUD, local) can assist.</li>
              </ul>
              <p><strong>If rights violated:</strong> Notify landlord in writing; seek local legal aid/tenant clinics if unresolved.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 27 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Aug 23, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Back to School: How to Pay for College Without Loans</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>College costs have surged; avoiding loans can free future budgets. Combine lower-cost schools, free money, work, and strict budgeting to minimize or eliminate borrowing.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Choose affordable paths:</strong> In-state publics, community college transfer, tuition exchange programs; compare public vs. private costs.</li>
                <li><strong>Earn credits early:</strong> AP/dual-credit to skip gen-eds and graduate faster.</li>
                <li><strong>Scholarships & grants:</strong> Apply widely (national + local); FAFSA early for grant eligibility; reapply yearly.</li>
                <li><strong>Housing savings:</strong> Consider R.A. roles, roommates off-campus, living at home if possible.</li>
                <li><strong>Work support:</strong> Tuition-reimbursement employers (e.g., major retailers/brands), work-study, campus jobs, flexible side hustles, and summer jobs to build a cash buffer.</li>
                <li><strong>Budget discipline:</strong> Prioritize needs over wants; align friends/roommates with similar spending goals.</li>
              </ul>
              <p><strong>Bottom line:</strong> Even partial reductions in borrowing matter—every dollar avoided lowers post-grad payments and stress.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 28 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Aug 07, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Credit Card Mistakes to Avoid</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Common credit card pitfalls that drain budgets and scores—and how to sidestep them.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Spending past what you can pay off:</strong> Don’t treat the limit as a target; match spending to cash on hand.</li>
                <li><strong>No budget:</strong> Build “fun money” into a plan so splurges don’t become debt.</li>
                <li><strong>Chasing rewards/overspending:</strong> Rewards never beat interest; only charge what you’d buy anyway.</li>
                <li><strong>Ignoring rewards:</strong> Redeem what you earn—cash back or travel—without extra spend.</li>
                <li><strong>Not asking for higher limits (if disciplined):</strong> Higher limits can lower utilization; avoid if it tempts overspending.</li>
                <li><strong>Late payments:</strong> Payment history is 35% of FICO. Set autopay/reminders to avoid fees and 7-year negatives.</li>
                <li><strong>Paying only minimums:</strong> Interest stretches payoff for years. Pay in full when possible; otherwise pay as much as you can.</li>
                <li><strong>Wrong card choice:</strong> Align cards to your credit tier/goals (starter, secured, rewards, etc.).</li>
                <li><strong>Carrying balances on purpose:</strong> Utilization, not carried balances, drives scores—interest is wasted money.</li>
                <li><strong>Cash advances:</strong> Immediate interest + fees; avoid unless truly urgent.</li>
                <li><strong>Closing cards rashly:</strong> Can raise utilization; weigh annual fee vs. score impact.</li>
                <li><strong>Not reviewing statements:</strong> Check monthly for fraud/errors and dispute fast.</li>
              </ul>
              <p><strong>If you slipped:</strong> Pay on time, pay down balances, budget, and address any report inaccuracies (DIY disputes or reputable help). Avoid new debt while repairing.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 29 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Aug 05, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">Feelings in Finance—Your Empowerment Guide</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Money isn’t just math—it’s mindset. Reframe money stories, start with tiny wins, and build habits that stick.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Start small:</strong> Build confidence with tiny goals (e.g., $20/month saved via automation). Avoid over-saving that busts bills.</li>
                <li><strong>Long-term goals:</strong> Turn dreams into monthly targets; adjust timeline or income (side hustles) to fit your budget.</li>
                <li><strong>Track triggers:</strong> Spot emotional spending; swap lower-cost comforts; budget “fun” to prevent burnout.</li>
                <li><strong>Gamify:</strong> Redirect impulse spends into a goal pot (trip/spa) to satisfy the urge and fund rewards.</li>
                <li><strong>Find your rhythm:</strong> Experiment with budgeting styles (zero-based, 50/30/20, envelopes) until one clicks.</li>
                <li><strong>Flexibility:</strong> Keep a small monthly buffer for life’s hiccups; let goals evolve as life changes.</li>
                <li><strong>Mindset shift:</strong> Anyone can learn money skills. Practice, seek accountability (money groups), and prioritize progress over perfection.</li>
              </ul>
              <p><strong>FAQs:</strong> Common 50/30/20 is a guide—adapt to your reality. Balance short- vs. long-term by stacking habits one goal at a time.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 30 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jul 28, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">What Is Bankruptcy and How Does It Impact Your Credit?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Bankruptcy offers relief but severely dents credit and lingers for years. Know the trade-offs and how to rebuild.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Chapter 7:</strong> Liquidates non-exempt assets; remaining eligible debts discharged. Requires means test; stays on report 10 years.</li>
                <li><strong>Chapter 13:</strong> 3–5 year repayment plan; some remaining debt may be discharged; stays 7 years.</li>
                <li><strong>Score impact:</strong> Big drops (often 130–240 pts depending on starting score). Financing gets harder and pricier.</li>
                <li><strong>Long tail:</strong> Public record persists; higher rates likely; home/auto approvals harder until rebuilt.</li>
                <li><strong>Rebuild steps:</strong> Check reports (AnnualCreditReport.com) for errors; pay on time; keep utilization low; consider credit-builder loans or secured cards; add alternative data (e.g., Experian Boost).</li>
                <li><strong>New credit tips:</strong> Small limits, low balances, never miss payments; avoid carrying balances by choice.</li>
                <li><strong>Credit repair:</strong> Dispute inaccuracies; reputable help if many errors—can’t remove accurate bankruptcy.</li>
              </ul>
              <p><strong>Bottom line:</strong> Bankruptcy is a reset, not the end. With disciplined on-time payments and low utilization, scores can recover over time even while the record remains.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 31 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jul 26, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">Fixing Your Emotional Relationship with Money</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Emotions and money are intertwined. Healing financial trauma and reframing money narratives can improve decisions, credit, and peace of mind.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Notice emotions:</strong> Spending can be dopamine-driven; “I’m bad with money” is often an emotional story, not fact.</li>
                <li><strong>Emotions → credit:</strong> Stress spending, ignoring creditors, or “it doesn’t matter” thinking can lead to debt and score damage.</li>
                <li><strong>Track triggers:</strong> Journal purchases and feelings to spot patterns and unhelpful money narratives.</li>
                <li><strong>Healing steps (per financial therapist insight):</strong> Talk (community/coach/therapist), education (money + personal triggers), self-care (sleep, food, movement, rest), boundaries (“I” statements; practice saying no), and reduce money shame (self-forgiveness, positive mantras).</li>
                <li><strong>Budget + safeguards:</strong> If not ready for solo cards, consider AU status. Use budgets to prevent “I’m broke anyway” spirals.</li>
                <li><strong>Flex goals:</strong> Narratives can change—adapt goals and safety plans as life shifts.</li>
              </ul>
              <p><strong>Bottom line:</strong> Address feelings first; better money choices and credit health follow.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 32 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jul 17, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Can Inquiry “Bumpage” and “Choppage” Help Your Credit?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Inquiry “bumpage”/“choppage” claims are hype. Inquiries are a small factor; focus on bigger score drivers.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Score weight:</strong> New credit (incl. inquiries) ≈10% of FICO; payment history 35%, debt/utilization 30%, age 15%, mix 10%.</li>
                <li><strong>Bumpage theory:</strong> Idea that adding soft pulls “bumps” old hards off. No reliable evidence it works.</li>
                <li><strong>Choppage theory:</strong> Supposed removal of soft pulls so hards get bumped—also unproven.</li>
                <li><strong>Expert view:</strong> No reason to believe bumpage/choppage are real or effective.</li>
                <li><strong>Better plays:</strong> Dispute inaccurate derogatories; pay on time; keep utilization low; limit accounts with balances; let accounts age.</li>
                <li><strong>Perspective:</strong> Even deleting all inquiries would move scores only slightly compared to improving major factors.</li>
              </ul>
              <p><strong>Bottom line:</strong> Skip bumpage/choppage. Use proven habits—on-time payments, low utilization, clean/accurate reports, and patience.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 33 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jul 11, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">People’s Guide to Financial Identity Theft Protection</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>How identity theft happens, what to do if you’re hit, and practical ways to prevent it.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>What thieves use:</strong> Trash-diving, malware, hacked devices, RFID skimming, social engineering.</li>
                <li><strong>Warning signs:</strong> Missing bills, odd statements, denial notices, unknown accounts/charges, collector calls.</li>
                <li><strong>If you’re a victim:</strong> Contact affected banks/companies; place fraud alert via a bureau; change all passwords; file police report; report to FTC; review reports and dispute/close fraudulent accounts; audit bank/CC statements.</li>
                <li><strong>Fraud alert vs. freeze:</strong> Alert (1 year, renewable; one bureau notifies others). Freeze blocks new credit; lift temporarily if needed; set at all bureaus individually.</li>
                <li><strong>CPN warning:</strong> Often stolen or fake SSNs; using one can be identity fraud and a federal crime.</li>
                <li><strong>Prevention tips:</strong> Freeze credit, collect mail daily, monitor statements, shred sensitive docs, unique 15+ char passwords with manager, annual credit checks, antivirus, 2FA, wipe devices before donating, opt out/shred prescreened offers.</li>
                <li><strong>Insurance:</strong> Often covers remediation, not losses, and has deductibles. Strong hygiene (freezes, 2FA, passwords) is usually better value.</li>
              </ul>
              <p><strong>FAQs:</strong> Identity theft is common (~15M victims/year). Fraud alerts last 90 days then extended alerts up to 7 years. Theft = new accounts; fraud = misuse of existing. Penalties vary by state; jail/fines possible.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 34 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jul 11, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Is Renting Better Than Owning—for You?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Weigh renting vs. owning: costs, flexibility, equity, taxes, credit, and lifestyle fit.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Renting benefits:</strong> Predictable lease payments; sometimes cheaper; utilities may be included; no maintenance/taxes; easier relocation; lighter credit hurdles.</li>
                <li><strong>Renting drawbacks:</strong> No equity/tax perks; rent may rise annually; lease limits personalization; rent not always reported; future costs uncertain.</li>
                <li><strong>Best for renters:</strong> Need location flexibility; unsure of long-term needs; very high-cost markets; rebuilding credit; prefer non-real-estate investing; avoid repair risk.</li>
                <li><strong>Owning benefits:</strong> Build equity and credit; potential appreciation; eventual no-mortgage payment; control over space; access to equity via HE/HELOC.</li>
                <li><strong>Owning obstacles:</strong> Down payment and closing costs; interest and insurance (PMI possible); taxes/utilities/maintenance; requires solid credit and manageable debt.</li>
                <li><strong>Best for buyers:</strong> Plan to stay 5–7+ years; strong finances and emergency fund; good credit; comfortable with upkeep; want real estate in portfolio.</li>
              </ul>
              <p><strong>Takeaway:</strong> Renting isn’t “throwing money away”—it buys flexibility and lower risk. Owning can build equity but adds upfront costs and ongoing responsibilities. Choose based on time horizon, market, credit, savings, and lifestyle.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 35 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jun 27, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Date of Last Activity (DLA): What Is It and Does It Really Matter?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>DLA = most recent reported activity on an account, but it is legacy data shown only on consumer disclosures—not on the Metro 2 reports lenders use.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Why you see it:</strong> Consumer-facing “disclosures” include DLA; lender-facing reports do not.</li>
                <li><strong>Myths:</strong> DLAs aren’t a scoring factor because they’re not on real reports used for scores.</li>
                <li><strong>Metro 2 reality:</strong> CRRG/Metro 2 doesn’t have DLA fields; lenders don’t receive them.</li>
                <li><strong>When it matters:</strong> Possibly relevant for legal issues (e.g., statute of limitations on collections), but not for credit scores.</li>
              </ul>
              <p><strong>Bottom line:</strong> DLAs don’t impact your credit scores; focus on on-time payments, low utilization, and accurate reports instead.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 36 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jun 21, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Americans Are Taking Out More Personal Loans: What You Need to Know</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Personal loan balances and borrowers are rising. Understand why, how to borrow wisely, and alternatives.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Trends:</strong> Balances up to $245B (Q1 2023); avg balance ~$11.8k (Q1 2024); 23.5M borrowers.</li>
                <li><strong>Why up?</strong> Inflation squeezing budgets; cards at ~24.8% vs. personal loans ~12.35%; post-pandemic consumption.</li>
                <li><strong>Getting a loan:</strong> Check credit (670+ helps); compare rates/fees; apply with docs (ID, SSN, income, bank info); funds can arrive in days.</li>
                <li><strong>Borrow better:</strong> Shop multiple offers—small rate differences cost hundreds. Borrow only for needs with a payoff plan.</li>
                <li><strong>Avoid if possible:</strong> Reassess the expense; cut spending; boost income; save first for non-urgent wants.</li>
                <li><strong>Alternatives:</strong> HE loan/HELOC (homeowners, lower rates but home at risk); low-rate promo cards (plan for end of promo); family loans (mind relationships); or skip/ delay purchase.</li>
                <li><strong>If denied:</strong> Likely credit or income—work on on-time payments, lower utilization, and accurate reports before reapplying.</li>
              </ul>
              <p><strong>Bottom line:</strong> Personal loans are useful but add a fixed payment. Compare, borrow sparingly, and consider fixes to cash flow before adding debt.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 37 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jun 27, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Credit Mix: What It Is and Why It Matters</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit mix (about 10% of FICO) = variety of account types you manage well. Small factor, but helps, especially with thin files.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Types:</strong> Revolving (cards, lines of credit), charge cards, service credit (utilities/phone—usually reported only if in collections, though alt-data models may use them), and installment (auto, mortgage, student, personal, credit-builder, home equity loans).</li>
                <li><strong>Revolving vs. installment:</strong> Revolving weighs more because it drives utilization (big score factor). Installment still shows payment history and depth.</li>
                <li><strong>Good mix baseline:</strong> At least one revolving and one installment account in good standing. High scorers often have multiple cards and a couple of loans over time.</li>
                <li><strong>Too many accounts?</strong> More isn’t always better; excessive accounts/hard pulls can hurt. Avoid opening just for “mix.”</li>
                <li><strong>Risky account types:</strong> Consumer finance/furniture loans or some motorcycle loans can signal higher risk. Payday/title loans typically don’t report unless sent to collections.</li>
                <li><strong>Authorized user option:</strong> AU status can add a revolving account without a new primary card.</li>
              </ul>
              <p><strong>Bottom line:</strong> Mix helps, but payment history, utilization, and age matter far more. Aim for balanced, well-managed accounts rather than chasing a “perfect” mix.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 38 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published May 30, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">What Is a Derogatory Item on Your Credit Report?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Derogatory items are negative marks (minor or major) that hurt scores and can linger for years. Know types, impact, and mitigation.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Minor derogs:</strong> 30–60 day lates that are cured. Avoid getting reported by paying before 30 days past due.</li>
                <li><strong>Major derogs:</strong> 90+ day lates, charge-offs, collections, judgments, repos, foreclosures, settlements/short sales, public records (mainly bankruptcy now), and bankruptcies (Ch7 up to 10 years; Ch13 ~7 years).</li>
                <li><strong>Impact:</strong> Varies by profile; fresh derogs can tank scores, especially on thin/clean files. Older derogs hurt less over time.</li>
                <li><strong>Scoring differences:</strong> Paid collections ignored by FICO 9/Vantage 3+/4; FICO 8 still counts most collections; small &lt;$100 collections often ignored by FICO 8/9.</li>
                <li><strong>Paying lates:</strong> Paying brings current but doesn’t delete the mark; still better than remaining delinquent.</li>
                <li><strong>Aging off:</strong> Most derogs fall off after ~7 years from DOFD; bankruptcies up to 10 years.</li>
                <li><strong>Fix inaccuracies:</strong> Dispute wrong data with bureaus and furnishers; accurate derogs must stay.</li>
                <li><strong>Prevention:</strong> Autopay/reminders; contact lenders for hardship options; monitor reports to catch errors early.</li>
                <li><strong>Letters of explanation:</strong> May be needed for mortgages—be truthful, concise, and document circumstances.</li>
              </ul>
              <p><strong>Bottom line:</strong> Avoid derogs whenever possible; if they happen, get current, dispute inaccuracies, and build strong positive history to offset until they age off.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 39 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published May 20, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Use a Windfall to Improve Your Finances</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Turn unexpected cash into lasting gains: prioritize debt, safety nets, and long-term growth—then enjoy a slice guilt-free.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Pay high-interest debt:</strong> Credit cards first to free cash flow and stop costly interest.</li>
                <li><strong>Build/finish emergency fund:</strong> Aim 3–6 months (or more if income is volatile/household has dependents).</li>
                <li><strong>Invest for the future:</strong> Retirement accounts or diversified investments to harness compounding.</li>
                <li><strong>Invest in yourself:</strong> Education, skills, health, or tools that boost earning power and wellbeing.</li>
                <li><strong>Fund big goals:</strong> Down payments, reliable car, education, or necessary home/medical needs.</li>
                <li><strong>Enjoy some:</strong> Reserve a modest fun slice after core steps—avoid blowing the lot.</li>
                <li><strong>Get help if needed:</strong> Fee-only fiduciary advice for large windfalls or complex choices.</li>
              </ul>
              <p><strong>Bottom line:</strong> Sequence matters—secure essentials and growth first, then celebrate responsibly.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 40 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published May 20, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Money Myths That Could Hurt Your Finances</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Common money myths can lead to costly choices. Debunk the bad advice before it hurts you.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Six figures = rich:</strong> Wealth is about net worth and surplus saving, not salary alone.</li>
                <li><strong>Pay all debt before investing:</strong> Kill high-interest debt first; low-rate debt (e.g., 3% mortgage) can coexist with investing.</li>
                <li><strong>Investing is only for the rich:</strong> Start small with index funds/low minimums; automate contributions.</li>
                <li><strong>Small savings don’t matter:</strong> Tiny, consistent amounts compound—$10–$20 weekly adds up.</li>
                <li><strong>Market = gambling:</strong> Diversified index investing differs from speculative stock-picking.</li>
                <li><strong>Retirement can wait:</strong> Time in market beats timing—start early to maximize compounding.</li>
                <li><strong>Credit cards are a trap:</strong> Used responsibly, they build credit and earn rewards; avoid carrying balances.</li>
                <li><strong>All debt is bad:</strong> High-interest debt is harmful; lower-rate/secured debt (e.g., mortgages) can be strategic.</li>
                <li><strong>Coffee cuts make you rich:</strong> Big wins come from housing/transportation/income, not just lattes.</li>
                <li><strong>All advisors are fiduciaries:</strong> Verify fee-only fiduciary status to avoid conflicted advice.</li>
              </ul>
              <p><strong>Protect yourself:</strong> Boost financial literacy, fact-check “tips,” and examine your own money beliefs before acting.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 41 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published May 03, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">Start Making Good Money Moves by Destroying Limiting Beliefs</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Limiting money beliefs keep you stuck. Find them, reframe them, and act with a plan.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>How they harm:</strong> “I’m bad with money” becomes self-fulfilling; narratives from childhood/peers drive avoidance or overspending.</li>
                <li><strong>Find them:</strong> Map comfort zones, childhood money culture, “shouldn’t/couldn’t” messages, family/peer beliefs, fears of being wrong, and outside influences.</li>
                <li><strong>Questions:</strong> What’s my money comfort zone? What beliefs keep me “safe”? What was I told as a kid? What am I subconsciously committed to? Where do I follow/avoid family and friends?</li>
                <li><strong>Fix them:</strong> Uncouple emotions; remove blind spots (learn what you avoid); rewrite your story; use realistic steps (small saving/spending shifts); talk about money; question myths.</li>
                <li><strong>Replace narratives:</strong> Examples—“Budgets are boring” → budgets tell your story; “I’m bad with money” → I’m building skills; “I’ll save later” → start now; “Partner handles money” → stay involved.</li>
                <li><strong>Plan anyway:</strong> Build a solid financial plan (budget, saving, investing) despite lingering beliefs; practice intentional, incremental changes.</li>
              </ul>
              <p><strong>Bottom line:</strong> Awareness + new narratives + small consistent actions = better money moves even when doubts linger.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 42 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Apr 22, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Avoid a Growing Credit Card Balance</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit card balances are rising with inflation and higher APRs. Here’s how to keep yours from snowballing.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Why balances grow:</strong> Higher prices, rising card rates (~20%+), and relying on minimum payments.</li>
                <li><strong>Know the math:</strong> High APR + minimums = years of payoff and thousands in extra interest.</li>
                <li><strong>Spend within payoff ability:</strong> Only charge what you can clear monthly to avoid interest.</li>
                <li><strong>Pay more than minimums:</strong> Accelerate payoff to cut time and interest dramatically.</li>
                <li><strong>Avoid cash advances:</strong> Higher rates and no grace period make them costly fast.</li>
                <li><strong>Use a budget:</strong> Prioritize needs over wants; align spending to income.</li>
                <li><strong>Build an emergency fund:</strong> Buffer surprise costs so you don’t swipe for emergencies.</li>
                <li><strong>Raise income:</strong> Side gigs, extra hours, or raises help cover expenses without debt.</li>
                <li><strong>Last resort:</strong> If overspending is chronic, consider closing or pausing cards to break the cycle.</li>
              </ul>
              <p><strong>Bottom line:</strong> Treat cards as pay-in-full tools. Control spending, pay aggressively, and shore up cash buffers to keep balances from growing.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 43 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Apr 08, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">What Is a Credit-Builder Loan and How Does It Work?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit-builder loans lock your payments into savings while reporting to bureaus—helpful if managed well, harmful if you miss payments.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>How it works:</strong> You pay monthly; principal is held in savings/CD, interest goes to lender. You get principal back at term end if you finish the loan.</li>
                <li><strong>Reporting:</strong> Lenders may report to one or all bureaus. On-time payments help; late/missed payments hurt.</li>
                <li><strong>Costs:</strong> Possible fees (app/orig/admin) plus interest. You will pay to use this tool.</li>
                <li><strong>Who it helps:</strong> Thin/no credit or rebuilding consumers who can afford steady payments.</li>
                <li><strong>Use correctly:</strong> Commit to full term; avoid early payoff if goal is payment history; beware prepayment penalties.</li>
                <li><strong>Maximize benefit:</strong> Budget first; automate on-time payments; plan how to use the lump sum (e.g., debt paydown, emergency fund) at term end.</li>
                <li><strong>Alternatives:</strong> Authorized user accounts, secured credit cards, and accurate credit repair (disputing errors) can also build credit.</li>
              </ul>
              <p><strong>Bottom line:</strong> A credit-builder loan can raise scores via payment history, but only if you avoid lates and accept the cost of interest/fees.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 44 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Apr 07, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">VantageScore vs. FICO Score: What’s the Difference?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>VantageScore and FICO use similar data but weigh factors differently and serve different audiences.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Usage:</strong> FICO is most used by lenders (especially mortgages/autos); VantageScore is common on consumer sites and some lenders.</li>
                <li><strong>Ranges:</strong> Both 300–850, but rating bands differ (e.g., “good” starts 661 for Vantage vs. 670 for FICO).</li>
                <li><strong>Weights (approx.):</strong> FICO: pay history 35%, utilization 30%, age 15%, mix 10%, new credit 10. VantageScore: pay history 40%, utilization 20%, age/type 21%, balances 11%, recent 5%, available credit 3%.</li>
                <li><strong>Inquiries:</strong> FICO groups rate-shopping for auto/mortgage/student within 14–45 days; VantageScore groups all inquiries in 14 days.</li>
                <li><strong>Collections:</strong> FICO 9/Vantage 3+/4 ignore paid collections and lessen medical impact; FICO 8 still counts paid collections but ignores balances &lt;$100; Vantage doesn’t ignore small balances.</li>
                <li><strong>Utilization:</strong> Both care; Vantage 4.0 considers trends over time.</li>
                <li><strong>Who gets scored:</strong> FICO needs 6 months history + recent activity; VantageScore can score with ~1 month of history.</li>
                <li><strong>Tri-bureau:</strong> VantageScore model is identical across bureaus; FICO versions differ per bureau.</li>
              </ul>
              <p><strong>Bottom line:</strong> Both matter. For lender decisions, expect FICO (often older versions). For monitoring/education, VantageScore is useful—good habits improve both.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 45 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Apr 01, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">How to Be Your Own Best Budget Planner</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Budgeting isn’t one-size-fits-all. Pick a method that matches your goals and attention, then tweak and track it.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Why budget:</strong> Prevent overspending, reduce stress, and build toward financial independence and flexibility.</li>
                <li><strong>Popular methods:</strong> 50/30/20 (or custom percentages), values-based overlays, zero-based, pay-yourself-first, and envelope/cash systems.</li>
                <li><strong>Choosing a method:</strong> Match to your goals and how much time/structure you want; experiment until one sticks.</li>
                <li><strong>If it’s not working:</strong> Check cash flow vs. expenses; adjust spending or try another style; change gradually for consistency.</li>
                <li><strong>Keep on track:</strong> Use apps or tools to automate tracking; schedule check-ins; align spending with values.</li>
                <li><strong>Mindset:</strong> Budgets are flexible maps, not prisons—adapt categories and percentages as life changes.</li>
              </ul>
              <p><strong>Bottom line:</strong> Any budget that you’ll actually use is the right one. Start simple, adjust over time, and stay consistent.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 46 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 24, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">What Does It Mean to Be Credit Invisible?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Nearly 45M U.S. adults lack scoreable credit—either invisible (no file) or unscorable (thin/stale file). That limits access to credit, housing, insurance, utilities, and sometimes jobs.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Who’s most affected:</strong> Younger adults; Black and Hispanic consumers; low-income and rural areas; “credit deserts” with limited traditional lenders.</li>
                <li><strong>Consequences:</strong> Denials or higher-cost credit; larger deposits for rentals/utilities; higher insurance premiums; reliance on high-cost alternatives (payday/pawn).</li>
                <li><strong>Why it happens:</strong> No/limited credit history; inactivity; reliance on non-reporting lenders; structural inequities.</li>
                <li><strong>Paths to visibility:</strong> Piggybacking (authorized user, joint accounts, cosigner); secured cards; credit-builder loans; starter retail cards; accurate credit repair; alternative data cautiously.</li>
                <li><strong>Authorized user boost:</strong> Can add years of history and higher limits if the account is clean and reports AUs.</li>
                <li><strong>Build primary history:</strong> Once visible, add well-managed accounts and keep on-time payments to avoid starting with derogs.</li>
                <li><strong>Inequity note:</strong> Lower-income and minority consumers face fewer piggybacking opportunities and may start with negative items—systemic barriers persist.</li>
              </ul>
              <p><strong>Bottom line:</strong> Being credit invisible is common but solvable—leverage piggybacking, secured/starter products, and flawless payment behavior to establish a scoreable file.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 47 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 19, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Snowball vs. Avalanche: What Is the Best Way to Pay Off Debt?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Two proven payoff methods: snowball (smallest balance first) and avalanche (highest rate first). Pick the one you’ll stick to.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Snowball:</strong> Pay minimums on all, then attack the smallest balance; roll freed payment to the next smallest. Pros: quick wins, motivation, higher success rate. Cons: more interest, often slower overall.</li>
                <li><strong>Avalanche:</strong> Pay minimums on all, then attack highest APR first; roll to next highest APR. Pros: less interest, faster mathematically. Cons: fewer early wins, harder to stay motivated.</li>
                <li><strong>Hybrid idea:</strong> Tackle very high-rate debts (e.g., credit cards) first, then switch to snowball for lower-rate balances.</li>
                <li><strong>Use a calculator:</strong> Compare time and interest for both methods with your balances, APRs, and payment budget.</li>
                <li><strong>Key to success:</strong> Free up cash (cut costs/earn more), avoid new debt, and automate extra payments to your target account.</li>
              </ul>
              <p><strong>Bottom line:</strong> The best method is the one you’ll follow to become debt-free—choose motivation (snowball) or efficiency (avalanche), or blend both.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 48 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 15, 2024 • Moriah Chace</p>
                <h2 className="text-xl font-bold text-slate-900">Homeless Prevention Financial Guide</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Key money strategies to reduce homelessness risk: manage housing costs, protect health, secure food, build community, and diversify income.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Housing costs:</strong> Aim for &lt;30% of income; consider vouchers/waitlists, roommates, intergenerational living to lower rent.</li>
                <li><strong>Health access:</strong> Use preventive care (Medicare/Medicaid/ACA), avoid ER when possible, get help from social workers for mental health/addiction support; seek med assistance programs.</li>
                <li><strong>Nutrition:</strong> Prioritize meal planning/prep, bulk cooking, pantry/food bank resources; cheaper whole foods over frequent fast food.</li>
                <li><strong>Community:</strong> Cultivate support networks (faith groups, nonprofits, local orgs, online groups) for housing leads and safety nets.</li>
                <li><strong>Budget & earnings:</strong> Track spending (e.g., apps), align to values, use 50/30/20 as a guide when possible; trim low-value spends and celebrate small savings wins.</li>
                <li><strong>Side income:</strong> Explore side hustles/freelancing or extra shifts to create buffer room.</li>
              </ul>
              <p><strong>Bottom line:</strong> Lower fixed costs, stay healthy, feed yourself well, lean on community, and grow income to build resilience against housing loss.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 49 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 11, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Things Everyone Should Know About Credit Cards</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit cards are powerful tools for payments and credit-building—if used responsibly. Here are the essentials.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Revolving credit:</strong> Unsecured by default; secured cards need a deposit. Pay in full to avoid interest; carrying balances triggers high APRs.</li>
                <li><strong>Interest basics:</strong> APR applies only when you revolve; cash advances/balance transfers often accrue immediately and cost more.</li>
                <li><strong>Key dates:</strong> Statement closing date (what gets reported) vs. due date (avoid lates). Know promo end dates and card expiration.</li>
                <li><strong>Payments:</strong> Minimum keeps the account current but is costly; statement balance avoids purchase interest; current balance pays off everything.</li>
                <li><strong>Fees to watch:</strong> Late fees/penalty APRs, annual fees, cash advance fees, foreign transaction fees.</li>
                <li><strong>Credit impact:</strong> Builds payment history and utilization (keep low, ideally &lt;10–20%); helps credit mix/number of accounts.</li>
                <li><strong>Reporting tip:</strong> Balances usually report on the closing date. Pay early or pause spending after payment if you want low/zero reported utilization.</li>
              </ul>
              <p><strong>Bottom line:</strong> Treat card spending as real money, pay on time, and pay in full when possible to leverage rewards and credit growth without debt.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 50 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 04, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Want to See Your FICO Score for Free? Here’s How to Do It</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Most lenders use FICO scores. You can view yours for free through several banks and sources.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Card issuers/banks:</strong> Discover (Scorecard, anyone), Bank of America, Citi (Bankcard 8, 250–900), Amex, Barclays, Wells Fargo—usually monthly updates, often Experian/TransUnion based.</li>
                <li><strong>Credit bureau:</strong> Experian offers free FICO 8 plus Experian report; Boost can add certain bill data.</li>
                <li><strong>Check local bank/CU:</strong> Some participate; ask if they offer free FICO.</li>
                <li><strong>Open Access partners:</strong> FICO lists additional lenders/counseling orgs that share scores.</li>
                <li><strong>Soft pulls only:</strong> Viewing your score yourself does not affect credit.</li>
                <li><strong>Know the version/source:</strong> Lenders may use different FICO versions/bureaus; the free one you see may differ slightly from what a lender pulls.</li>
                <li><strong>Vantage vs. FICO:</strong> VantageScores from sites like Credit Karma are educational but not the same model most lenders use.</li>
              </ul>
              <p><strong>Bottom line:</strong> Use bank/bureau programs to monitor your FICO for free, note which model/bureau you’re seeing, and remember checking is a soft inquiry.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 51 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Mar 04, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Complete Guide to Opening an Unsecured Credit Card</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Unsecured cards don’t require deposits and can offer higher limits and rewards—but approval is harder and overspending is risky.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Pros:</strong> No collateral, potentially higher limits, more rewards/perks.</li>
                <li><strong>Cons:</strong> Easier to overspend; higher APRs; lower approval odds than secured cards.</li>
                <li><strong>What to compare:</strong> APR (plan for surprises even if you aim to PIF), fees (annual, late, balance transfer, FX), rewards type (cashback/travel), and perks (credits, insurance, lounge/discounts).</li>
                <li><strong>Steps to open:</strong> Check scores/reports (fix errors); define your goal (credit, convenience, rewards); research options; apply online with income/SSN/address; lift credit freezes before applying.</li>
                <li><strong>Usage tips:</strong> Spend only what you can pay monthly; pay on time/in full to avoid interest; leverage perks; use rewards.</li>
                <li><strong>Approval factors:</strong> Score, income, DTI. Good (670+) often needed; some cards target lower scores.</li>
              </ul>
              <p><strong>Bottom line:</strong> Choose the card that fits your goals and budget, then manage it prudently to avoid high-interest debt and build credit.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 52 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 25, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Use Your Tax Refund to Get Ahead</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Turn a refund into progress: triage bills, cut debt, build savings, invest, or fund truly necessary purchases.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Caught up on bills:</strong> If behind, prioritize housing/auto first, then get one month ahead.</li>
                <li><strong>Kill debt:</strong> Apply to your chosen payoff method (snowball or avalanche) to speed freedom from interest.</li>
                <li><strong>Build savings:</strong> Boost an emergency fund in a high-yield account; aim for 3–6 months (or any buffer).</li>
                <li><strong>Invest (if ready):</strong> Once bills, high-interest debt, and emergency fund are handled, consider investing via a brokerage/retirement account.</li>
                <li><strong>Major needs:</strong> Use cash for essential big buys (e.g., car for work, appliance) to avoid new debt; shop around.</li>
                <li><strong>Avoid waste:</strong> Skip splurges that don’t align with goals; small fun is fine, but don’t burn the whole refund.</li>
              </ul>
              <p><strong>Bottom line:</strong> Match your refund to your biggest financial need—stability first, then debt, then savings/investing—so the money moves you forward.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 53 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 23, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">How to Prepare Your Finances for Student Loan Payments</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Federal payments resumed fall 2023. Get organized, choose the right plan, budget, and find income to stay current.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Confirm details:</strong> Identify your servicer, balances, due dates, and update contact info.</li>
                <li><strong>Know what you owe:</strong> Check StudentAid.gov for totals and minimums.</li>
                <li><strong>Pick a plan:</strong> Standard 10-year or income-driven options (PAYE/REPAYE/IBR/ICR); PSLF/teacher forgiveness if eligible.</li>
                <li><strong>Apply for the plan:</strong> File forms with your servicer; read fine print on forgiveness rules.</li>
                <li><strong>Budget with the payment:</strong> Adjust big expenses, set goals, and leave some room for fun to avoid burnout.</li>
                <li><strong>Autopay:</strong> Enroll to avoid missed payments and get the 0.25% rate reduction.</li>
                <li><strong>Earn more:</strong> Consider raises, new jobs, extra hours, side hustles, or selling clutter to ease the load or pay faster.</li>
              </ul>
              <p><strong>Bottom line:</strong> Staying current is easier when you know your servicer, choose the best repayment plan, automate, budget realistically, and boost income as needed.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 54 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 09, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">What to Do if You Can’t Afford Your Car Payment</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Options to handle an unaffordable auto payment and protect your finances.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Contact lender early:</strong> Ask about changing due dates or short-term deferrals before missing a payment.</li>
                <li><strong>Modify/refinance:</strong> See if your lender can extend terms; or refinance with another lender for lower payments (best if you’re not upside down).</li>
                <li><strong>Sell or trade down:</strong> Private sale yields more; trade for a cheaper car to cut payment and insurance/fuel costs.</li>
                <li><strong>Loan transfer/help:</strong> If allowed, transfer to someone qualified; or seek a temporary loan from family/friends with clear terms.</li>
                <li><strong>Boost income:</strong> Raise, overtime, side gigs, or selling items to cover payments.</li>
                <li><strong>Last resort:</strong> Voluntary surrender is better than repo but still hurts credit; avoid missing multiple payments.</li>
              </ul>
              <p><strong>Credit impact:</strong> Selling/paying off or refinancing has minimal impact; repossession or surrender is heavily negative. Act early to avoid severe damage.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 55 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Feb 04, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">Will These Strategies Help You Get More Credit Score Points?</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Credit expert John Ulzheimer debunks common “score hacks” and explains what really matters.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Paying loans early:</strong> No bonus points—installment loans are mostly neutral; paying early just reports a $0 balance.</li>
                <li><strong>Paying more than balance:</strong> Cards can’t report negative balances; overpaying still reports $0 and ties up cash.</li>
                <li><strong>Multiple payments/month:</strong> Number of payments isn’t scored, but paying before the statement close can lower reported utilization, which can help.</li>
              </ul>
              <p><strong>Bottom line:</strong> Focus on the real levers—on-time payments, low utilization, accurate reports. Skip myths about overpaying or “tricking” the system.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 56 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 21, 2024 • Ellen Johnson</p>
                <h2 className="text-xl font-bold text-slate-900">When You Should NOT Be an Authorized User</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Authorized user status can hurt or be neutral if the account is wrong for you. Avoid these cases:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Young accounts:</strong> Low age can lower your average age of accounts; pick seasoned cards instead.</li>
                <li><strong>High utilization:</strong> A maxed or heavily used card can raise your utilization and harm scores.</li>
                <li><strong>Derogatory history:</strong> Late payments or delinquencies on the card can pull your score down.</li>
                <li><strong>Already bad credit:</strong> A single AU account won’t outweigh multiple derogs or high utilization elsewhere—manage those first.</li>
                <li><strong>Doesn’t report AUs:</strong> Some issuers don’t report authorized users to all bureaus; no reporting = no benefit.</li>
              </ul>
              <p><strong>Bottom line:</strong> Choose AU accounts with age, low utilization, perfect history, and confirmed reporting—or skip it if those aren’t available.</p>
            </div>
          </div>
        </div>
      )}

      {selectedPost === 57 && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          />
          <div className="w-full sm:w-[520px] md:w-[640px] bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-sky-600 font-semibold">Published Jan 18, 2024 • Sarah Sharkey</p>
                <h2 className="text-xl font-bold text-slate-900">Complete Guide to Opening a Secured Credit Card</h2>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold px-3 py-1 rounded-full border border-slate-200"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 space-y-4 text-sm leading-6 text-slate-700">
              <p>Secured cards require a deposit but can build or rebuild credit. Here’s how to choose and use one.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Who they’re for:</strong> Thin/no credit or rebuilding borrowers who need a starter line.</li>
                <li><strong>Compare factors:</strong> Fees (annual, late, FX, cash advance), APRs, reporting to all three bureaus, deposit requirements/limits, perks, and upgrade path to unsecured.</li>
                <li><strong>Deposit & limit:</strong> Deposit usually = limit; higher limits help utilization. Pick an amount you can fund and manage.</li>
                <li><strong>Application steps:</strong> Check reports for errors, research cards, apply with SSN/ITIN, income, address; fund the deposit.</li>
                <li><strong>Use responsibly:</strong> Keep utilization low, avoid maxing out, and pay on time—ideally in full—to avoid interest and build history.</li>
                <li><strong>Monitor progress:</strong> Track scores over time; consider cards with a clear path to graduate to unsecured.</li>
              </ul>
              <p><strong>Bottom line:</strong> Pick a secured card with fair fees, full-bureau reporting, and a sensible deposit; then pay on time and keep balances low to build credit.</p>
            </div>
          </div>
        </div>
      )}

          {/* Pagination */}
          {totalPages > 1 && (
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 flex-wrap">
              <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-sky-300"
              >
              <ChevronLeft className="w-4 h-4" />
              </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-sky-600 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-sky-300"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-sky-300"
              >
              <ChevronRight className="w-4 h-4" />
              </button>
            </div>
        </section>
          )}
    </div>
  );
}