"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import {
  Search,
  Calendar,
  ArrowUpRight,
  Layers,
  Clock,
  Sparkles
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const BLOG_POSTS = [
  {
    id: 1,
    title: "Building a Recession-Resistant Business: 5 Core Strategies",
    description:
      "Frameworks used by modern enterprises to protect capital, improve resilience and create scalable systems.",
    category: "Business Strategy",
    date: "June 19, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    featured: true
  },
  {
    id: 2,
    title: "The Architecture Behind Financial Freedom",
    description:
      "How entrepreneurs are designing asset ecosystems beyond traditional income models.",
    category: "Finance",
    date: "June 18, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    title: "Increasing Business Valuation Before Exit",
    description:
      "Operational improvements and strategic positioning that increase enterprise value.",
    category: "Exit Strategy",
    date: "June 15, 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    title: "Understanding Protective Business Structures",
    description:
      "Exploring modern frameworks for ownership, risk management and organization.",
    category: "Legal",
    date: "June 10, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80"
  }
];

const CATEGORIES = ["All", "Business Strategy", "Finance", "Exit Strategy", "Legal"];

export default function BlogsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory = category === "All" || post.category === category;
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  const featured = useMemo(() => BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0], []);

  return (
    <main className={`${poppins.className} min-h-screen bg-[#FAFAFA] text-neutral-900 pb-18 overflow-x-hidden selection:bg-neutral-900 selection:text-white`}>
      {/* HEADER HERO */}
      <section
        className="
    relative
    overflow-hidden
    bg-gradient-to-br
    from-[#456ad1]
    via-[#29479b]
    to-[#273a86]
    pt-34
    pb-24
    px-6
    md:px-20
  "
      >
        {/* Gradient Glow */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-start max-w-4xl">

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="
        text-4xl
        sm:text-6xl
        font-semibold
        tracking-tight
        leading-tight
        text-white
      "
          >
            The Creditor{" "}
            <span className="text-yellow-400 font-light">
              Journal
            </span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="
        mt-5
        text-slate-200
        text-base
        md:text-lg
        leading-relaxed
        max-w-2xl
      "
          >
            Strategic insights into enterprise growth, wealth protection,
            asset architecture, and the evolving frameworks shaping modern
            businesses.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="
        mt-8
        flex
        items-center
        gap-3
        text-sm
        text-yellow-300
        uppercase
        tracking-[0.25em]
      "
          >
            Knowledge • Strategy • Protection
          </motion.div>

        </div>
      </section>

      {/* FILTER CONTROL BAR */}
      <section className="max-w-6xl mx-auto px-6 my-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-neutral-200/80">
          {/* Tabs */}
          <div className="flex gap-1 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${category === item
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Clean Input Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-neutral-400" size={14} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journals..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-neutral-200 focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 text-neutral-800 placeholder-neutral-400 text-xs outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* FEATURED INSIGHT */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        {category === "All" && !search && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="group grid lg:grid-cols-12 rounded-2xl overflow-hidden bg-white border border-neutral-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]"
          >
            <div className="relative lg:col-span-7 min-h-[300px] lg:min-h-[400px] bg-neutral-50 overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out grayscale-[15%]"
              />
            </div>

            <div className="p-8 md:p-10 lg:col-span-5 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                  <Layers size={11} />
                  <span>{featured.category}</span>
                </div>

                <h2 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900 mt-3 leading-snug">
                  {featured.title}
                </h2>

                <p className="mt-3.5 text-neutral-500 text-xs md:text-sm leading-relaxed font-normal">
                  {featured.description}
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-neutral-100 flex items-center justify-between text-[11px] font-medium text-neutral-400">
                <span className="flex items-center gap-1">
                  <Calendar size={12} className="text-neutral-300" />
                  {featured.date}
                </span>

                <span className="text-neutral-900 font-semibold flex items-center gap-0.5 group-hover:text-blue-600 transition-colors">
                  Read Journal <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* CORE CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts
              .filter((p) => !p.featured || search || category !== "All")
              .map((post) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden border border-neutral-200/60 hover:border-neutral-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] transition-all duration-300"
                >
                  <div>
                    <div className="h-48 overflow-hidden bg-neutral-100 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        <span>{post.category}</span>
                        <span className="text-neutral-400 flex items-center gap-1 normal-case font-normal">
                          <Clock size={11} />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mt-3 text-base font-medium text-neutral-900 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                        {post.title}
                      </h3>

                      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-[11px] font-medium text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {post.date}
                      </span>

                      <span className="text-neutral-900 font-semibold flex items-center gap-0.5 group-hover:text-blue-600 transition-colors">
                        View <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 border border-dashed border-neutral-200 rounded-xl bg-white"
          >
            <p className="text-neutral-400 text-xs">No records found matching your active criteria.</p>
          </motion.div>
        )}
      </section>
    </main>
  );
}