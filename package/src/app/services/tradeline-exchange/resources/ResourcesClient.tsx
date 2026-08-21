// @ts-nocheck
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";

const stats = [
  { label: "Active Users", value: "50,000+", icon: Users, color: "text-cyan-400" },
  { label: "Average Score Increase", value: "+85 pts", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Client Success Rate", value: "97%", icon: CheckCircle, color: "text-white" },
];

const categories = [
  { id: 1, name: "Credit Basics", slug: "credit-basics", count: 12 },
  { id: 2, name: "Tradelines", slug: "tradelines", count: 8 },
  { id: 3, name: "Score Repair", slug: "score-repair", count: 15 },
  { id: 4, name: "Business Credit", slug: "business-credit", count: 6 },
];

// Featured Cards — now with real images
const featuredCards = [
  {
    id: 1,
    title: "FICO Score Calculator",
    desc: "Calculate your potential score boost based on tradeline limits and age.",
    icon: TrendingUp,
    link: "/tools/fico-calculator",
    color: "from-cyan-500 to-blue-500",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Tradeline Selector",
    desc: "Find the perfect tradeline for your credit goals and budget.",
    icon: Sparkles,
    link: "/tools/tradeline-selector",
    color: "from-emerald-500 to-teal-500",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Reporting Timeline",
    desc: "Track when your tradelines will appear on all 3 bureaus.",
    icon: Calendar,
    link: "/tools/reporting-timeline",
    color: "from-purple-500 to-pink-500",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop",
  },
];

const posts = [
  {
    id: 1,
    title: "How Tradelines Boost Your Credit Score: 2025 Guide",
    desc: "Authorized user tradelines can boost FICO scores by 50-100+ points in 30-45 days through primary tradeline piggybacking.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
    date: "Dec 08, 2025",
    category: "Tradelines",
    readTime: "5 min",
    views: "2.4K",
    link: "/blog/tradelines-credit-score-boost",
  },
  {
    id: 2,
    title: "Tradeline Limits: $10K vs $50K vs $100K Comparison",
    desc: "High-limit tradelines ($25K+) show 3x greater impact on credit utilization ratios vs low-limit accounts.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop",
    date: "Dec 05, 2025",
    category: "Tradelines",
    readTime: "7 min",
    views: "1.8K",
    link: "/blog/tradeline-limits-comparison",
  },
  {
    id: 3,
    title: "Tradeline Reporting Windows: When Will It Post?",
    desc: "Primary tradelines report within 1-3 statement cycles. Learn exact timing for Experian, Equifax, TransUnion.",
    image: "https://images.unsplash.com/photo-1504868586233-c78872d1d2ce?w=1200&h=800&fit=crop",
    date: "Nov 28, 2025",
    category: "Credit Basics",
    readTime: "6 min",
    views: "3.2K",
    link: "/blog/tradeline-reporting-windows",
  },
  {
    id: 4,
    title: "Seasoned Tradelines vs New: Real Data Comparison",
    desc: "24+ month seasoned tradelines average 72-point FICO boost vs 28-point boost from new primary accounts.",
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1200&h=800&fit=crop",
    date: "Dec 02, 2025",
    category: "Score Repair",
    readTime: "8 min",
    views: "1.1K",
    link: "/blog/seasoned-vs-new-tradelines",
  },
  {
    id: 5,
    title: "Credit Mix Impact: Installment + Revolving Strategy",
    desc: "Optimal credit mix = 10% installment, 45% revolving, 45% tradelines yields highest FICO algorithm scores.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=800&fit=crop",
    date: "Nov 22, 2025",
    category: "Credit Basics",
    readTime: "4 min",
    views: "4.1K",
    link: "/blog/credit-mix-strategy",
  },
  {
    id: 6,
    title: "Business Tradelines: EIN vs SSN Funding Explained",
    desc: "Personal credit tradelines boost business scores 40% faster than direct business tradeline applications.",
    image: "https://images.unsplash.com/photo-1450101499160-c884817bc638?w=1200&h=800&fit=crop",
    date: "Dec 01, 2025",
    category: "Business Credit",
    readTime: "9 min",
    views: "892",
    link: "/blog/business-tradelines-guide",
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = posts.filter((post) =>
    (activeCategory === "all" || post.category.toLowerCase() === activeCategory) &&
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const nextPage = () => currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-24">
      {/* Dark Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 text-cyan-300 px-6 py-3 rounded-full mb-10"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
            <span className="text-sm font-medium">Updated December 2025</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight"
          >
            Credit Education
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Resources Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16 font-light leading-relaxed"
          >
            Real strategies backed by data — used by 50,000+ clients.
            <br className="hidden md:block" />
            Average result: <span className="font-bold text-cyan-400">+85 points in 45 days</span>
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 
                     hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]
                     transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-2xl">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Light Content Area */}
      <section id="tools" className="bg-gray-50 py-20 px-24">
        <div className="max-w-7xl mx-auto">
          {/* Search & Filters */}
          <div className="bg-white rounded-3xl shadow-xl p-4 mb-12 border border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 min-w-[250px] max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tradelines, FICO tips, score repair..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Category buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  All Resources
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`px-5 py-3 rounded-xl font-medium transition-all ${activeCategory === cat.slug
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {cat.name} <span className="text-xs opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>


          {/* Featured Tools — NOW WITH IMAGES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {featuredCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-200 overflow-hidden"
                >
                  {/* New: Hero Image */}
                  {/* <div className="relative h-48 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div> */}

                  {/* <div className="p-8">
                    <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{card.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{card.desc}</p>
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group-hover:gap-3 transition-all duration-300"
                    >
                      Use Tool
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div> */}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Blog Grid — Images already working, just kept your perfect styling */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchTerm}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {paginatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <span>•</span>
                      <span>{post.readTime} read</span>
                      <span>•</span>
                      <span>{post.views} views</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                      {post.desc}
                    </p>

                    <Link
                      href={post.link}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all duration-300"
                    >
                      Read Guide
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-4 rounded-xl bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-3">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-xl font-medium transition-all ${currentPage === page
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 shadow hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-4 rounded-xl bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}