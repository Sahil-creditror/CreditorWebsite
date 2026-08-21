"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import {
  Search,
  Calendar,
  ArrowUpRight,
  Layers,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { JOURNAL_POSTS } from "@/lib/journalPosts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap"
});

const CATEGORIES = ["All", "Become Private", "Operate Private", "Financial Freedom"];
const POSTS_PER_PAGE = 6;

/** Strip markdown syntax and return a plain-text excerpt from the first prose paragraph of a post */
function getContentPreview(content: string[], maxChars = 140): string {
  const plain = content
    .find((block) =>
      !block.startsWith("#") &&
      !block.startsWith("-") &&
      !block.startsWith("[TABLE]") &&
      !block.startsWith("*") &&
      block.trim().length > 40
    ) ?? "";
  const stripped = plain
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`[^`]+`/g, "")
    .trim();
  return stripped.length > maxChars ? stripped.slice(0, maxChars).trimEnd() + "…" : stripped;
}

export default function BlogsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever filter/search changes
  useEffect(() => { setPage(1); }, [category, search]);

  const filteredPosts = useMemo(() => {
    return JOURNAL_POSTS.filter((post) => {
      const matchCategory = category === "All" || post.category === category;
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [category, search]);

  const featured = useMemo(() => JOURNAL_POSTS.find((p) => p.featured) || JOURNAL_POSTS[0], []);
  const isDefaultOverview = category === "All" && !search;

  // Posts excluding featured on the default view
  const gridPosts = filteredPosts.filter((p) => !p.featured || !isDefaultOverview);

  // Pagination
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = gridPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  function goTo(p: number) {
    setPage(p);
    window.scrollTo({ top: 400, behavior: "smooth" });
  }

  // Page number range to show (max 5 buttons)
  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [page - 2, page - 1, page, page + 1, page + 2];
  }, [page, totalPages]);

  return (
    <main className={`${poppins.className} min-h-screen bg-[#FAFAFA] text-neutral-900 pb-18 overflow-x-hidden selection:bg-neutral-900 selection:text-white`}>
      {/* HEADER HERO */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#456ad1] via-[#29479b] to-[#273a86] pt-34 pb-24 px-6 md:px-20">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-start max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight text-white"
          >
            The Creditor{" "}
            <span className="text-yellow-400 font-light">Journal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl"
          >
            Strategic insights into enterprise growth, wealth protection,
            asset architecture, and the evolving frameworks shaping modern businesses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex items-center gap-3 text-sm text-yellow-300 uppercase tracking-[0.25em]"
          >
            Knowledge • Strategy • Protection
          </motion.div>
        </div>
      </section>

      {/* FILTER CONTROL BAR */}
      <section className="max-w-6xl mx-auto px-6 my-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-neutral-200/80">
          <div className="flex gap-1 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  category === item
                    ? "bg-blue-500 text-white"
                    : "text-neutral-500 hover:text-white hover:bg-blue-500"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
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

      {/* FEATURED INSIGHT — only on page 1 of the default view */}
      {isDefaultOverview && page === 1 && featured && (
        <section className="max-w-6xl mx-auto px-6 mt-12">
          <Link href={`/Blogs/${featured.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group grid lg:grid-cols-12 rounded-2xl overflow-hidden bg-white border border-neutral-200/70 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] cursor-pointer"
            >
              <div className="relative lg:col-span-7 w-full aspect-video bg-neutral-50 overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out"
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
                    {getContentPreview(featured.content, 160)}
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
          </Link>
        </section>
      )}

      {/* CORE CONTENT GRID */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <motion.div
          layout
          className={`grid gap-8 ${
            isDefaultOverview
              ? "grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence mode="popLayout">
            {paginatedPosts.map((post) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden border border-neutral-200/60 hover:border-neutral-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <Link href={`/Blogs/${post.slug}`} className="flex flex-col flex-1">
                  <div>
                    <div className="aspect-video overflow-hidden bg-neutral-100 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-contain grayscale-10 group-hover:scale-[1.02] transition-transform duration-500"
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
                      <p className="mt-2 text-xs text-neutral-500 leading-relaxed line-clamp-3">
                        {getContentPreview(post.content, 130)}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 mt-auto">
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
                </Link>
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

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14 mb-4">
            {/* Prev */}
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((n) => (
              <button
                key={n}
                onClick={() => goTo(n)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold border transition-all duration-200 ${
                  n === page
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {n}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center text-[11px] text-neutral-400 mb-10">
            Page {page} of {totalPages} — {gridPosts.length} articles
          </p>
        )}
      </section>
    </main>
  );
}