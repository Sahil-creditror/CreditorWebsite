"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Sparkles, User, ShieldCheck } from "lucide-react";

interface Book {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  author: string;
  price: string;
  badge?: string;
  link: string;
  accent: string;
  accentLight: string;
  featured?: boolean;
}

const BOOKS: Book[] = [
  {
    id: 1,
    title: "I Want Remedy Now",
    subtitle: "Conquering Credit Frauds and Funding Traps",
    description:
      "A practical financial guide that helps readers understand how credit systems work, avoid deceptive credit schemes, and take action toward financial remedy.",
    image: "/images/books/black_and_gold_financial_ebook_cover_1777024294338_cwvol7dk0z9.png",
    category: "Finance & Credit",
    author: "Paulmichael Rowland",
    price: "$49.99",
    badge: "Bestseller",
    link: "https://ebook.lmsathena.com/book/67cb4553-22cc-4b7c-b926-f88bc2e2731f",

    accent: "#2563eb", // blue-600
    accentLight: "#eff6ff",
    featured: true,
  },
  {
    id: 2,
    title: "Debt Collection Defense",
    subtitle: "A Practical Legal Guide for Consumers",
    description:
      "A practical legal guide for consumers facing debt lawsuits, collection agencies, credit reporting disputes, and court proceedings.",
    image: "/images/books/unnamed_1778759089150_j78e6lonkrf.png",
    category: "Legal Defense",
    author: "Paulmichael Rowland",
    price: "$49.99",
    badge: "Essential Guide",
    link: "https://ebook.lmsathena.com/book/24ebd042-8487-435a-a0cf-9f7bebd8e64c",
    accent: "#d97706", // amber-600
    accentLight: "#fffbeb",
  },
  {
    id: 3,
    title: "King of the Case",
    subtitle: "The Child Support Toolkit",
    description:
      "A practical legal self-help guide for individuals navigating child support enforcement and family court proceedings.",
    image: "/images/books/king_of_the_case_book_cover_1782105815041_0gufy68q3rbr.png",
    category: "Family Law",
    author: "Paulmichael Rowland",
    price: "$49.99",
    badge: "Recommended",
    link: "https://ebook.lmsathena.com/book/1312dca4-ac83-4542-93f6-2b60e1c6268e",

    accent: "#7c3aed", // violet-600
    accentLight: "#f5f3ff",
  },
];

export default function EbooksPage() {
  const featuredBook = BOOKS.find((b) => b.featured) || BOOKS[0];
  const secondaryBooks = BOOKS.filter((b) => !b.featured);

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-slate-900 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg/bgm.jpg')" }}
      />
      {/* Light overlay to keep cards readable */}
      <div className="absolute inset-0 bg-white/20 " />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
         
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Practical Guides for Financial & Legal Remedy
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Gain the actionable knowledge you need to navigate complex legal, credit, and consumer rights situations.
          </p>
        </div>

        {/* Featured Book Card (Top Hero Layout) */}
        <motion.a
          key={featuredBook.id}
          href={featuredBook.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative block bg-blue-50/70 border border-slate-200/80 hover:border-blue-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Cover Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 sm:w-56 lg:w-64 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-slate-400/30 group-hover:scale-[1.02] transition-transform duration-500 border border-slate-100">
                <Image
                  src={featuredBook.image}
                  alt={featuredBook.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 224px, 256px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20">
                    {featuredBook.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    {featuredBook.category}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {featuredBook.title}
                  </h2>
                  <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1">
                    {featuredBook.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {featuredBook.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                  <User className="w-3.5 h-3.5" />
                  <span>Written by <strong className="text-slate-800">{featuredBook.author}</strong></span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-medium">Instant Download</span>
                  <span className="text-2xl font-black text-slate-900">{featuredBook.price}</span>
                </div>
                <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/25 group-hover:gap-3 transition-all">
                  Get eBook <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Secondary Books (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryBooks.map((book, i) => (
            <motion.a
              key={book.id}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i + 1) * 0.1, duration: 0.45 }}
              className="group flex flex-col justify-between bg-white border border-slate-200/80 hover:border-slate-300 rounded-3xl p-6 shadow-md shadow-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-24 sm:w-28 aspect-[3/4] rounded-xl overflow-hidden shadow-md border border-slate-100 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  {/* Top Details */}
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        {book.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 line-clamp-1">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {book.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">{book.price}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                  View Book Details <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Guarantee Badge */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-xs pt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-medium">Secure Checkout • Instant Digital Access</span>
        </div>
      </div>
    </section>
  );
}