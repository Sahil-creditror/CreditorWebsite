"use client";

import React, { useState } from "react";
import {
  Search,
  ArrowRight,
  Clock3,
  BookOpen,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const categories = [
  "All",
  "Debt Recovery",
  "Credit Management",
  "Banking Compliance",
  "Recovery Training",
  "Legal Frameworks",
  "Collections Strategy",
  "NPA Recovery",
];

const blogs = [
  {
    title: "RBI Guidelines Every Debt Recovery Agent Should Know in 2026",
    category: "Banking Compliance",
    readTime: "8 people read",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Learn the latest RBI and compliance expectations for modern recovery operations and avoid regulatory risks.",
  },
  {
    title: "How AI Is Transforming Debt Collections",
    category: "Collections Strategy",
    readTime: "6 people read",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Explore predictive analytics, automated workflows, and smarter collection systems.",
  },
  {
    title: "Understanding SARFAESI Act for Recovery Professionals",
    category: "Legal Frameworks",
    readTime: "10 people read",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "A simplified legal framework guide for agents, NBFC teams, and recovery managers.",
  },
  {
    title: "Best Practices for Ethical Debt Collection",
    category: "Debt Recovery",
    readTime: "7 people read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Build customer-first collection systems while improving recovery efficiency.",
  },
  {
    title: "How Banks Reduce NPAs Through Structured Recovery Systems",
    category: "NPA Recovery",
    readTime: "9 people read",
    image:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "A breakdown of institutional recovery operations and strategic collections.",
  },
  {
    title: "7 Negotiation Mistakes Recovery Agents Should Avoid",
    category: "Recovery Training",
    readTime: "5 people read",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    excerpt:
      "Improve collection conversations with better negotiation frameworks and compliance.",
  },
];

export default function CreditorAcademyBlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic based on category buttons and real-time text input
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1A202C] antialiased">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A2540]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#102F52] to-[#1565D8]" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              <BookOpen className="mr-2 h-4 w-4" />
              Creditor Academy Knowledge Hub
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight text-white lg:text-6xl">
              Insights, Recovery Strategies & Credit Intelligence
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Expert articles, banking compliance updates, recovery frameworks,
              legal strategies, and industry intelligence for modern financial
              professionals.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex max-w-xl items-center rounded-2xl bg-white p-2 shadow-2xl focus-within:ring-2 focus-within:ring-[#1565D8]/50 transition-all">
              <Search className="ml-3 h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections, NPA recovery, legal frameworks..."
                className="w-full bg-transparent px-4 py-3 outline-none text-[#1A202C]"
              />
              <button className="rounded-xl bg-[#1565D8] px-5 py-3 font-medium text-white transition hover:bg-blue-700">
                Search
              </button>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#articles-display" 
                className="rounded-xl bg-white px-6 py-4 font-semibold text-[#0A2540] transition hover:bg-slate-100 flex items-center justify-center text-center"
              >
                Explore Articles
              </a>
              <button className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/20">
                Join Training Programs
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1554224155-cfa08c2a758f?q=80&w=1400&auto=format&fit=crop"
                alt="Finance Dashboard"
                className="rounded-2xl object-cover w-full h-auto"
              />

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <TrendingUp className="mb-3 h-8 w-8 text-[#1565D8]" />
                  <h3 className="font-bold text-[#0A2540]">Recovery Analytics</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    AI-driven collection intelligence
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <ShieldCheck className="mb-3 h-8 w-8 text-[#1565D8]" />
                  <h3 className="font-bold text-[#0A2540]">Compliance First</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    RBI & banking aligned frameworks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED BLOG */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[#1565D8]">Featured Article</p>
            <h2 className="mt-2 text-4xl font-bold text-[#0A2540]">
              Latest Recovery Insights
            </h2>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-[32px] bg-white shadow-xl lg:grid-cols-2 border border-slate-100">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1400&auto=format&fit=crop"
            alt="Featured Blog"
            className="h-full w-full object-cover min-h-[300px]"
          />

          <div className="flex flex-col justify-center p-10">
            <div className="mb-4 flex gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-[#1565D8]">
                Banking Compliance
              </span>
              <span className="rounded-full bg-slate-100 px-4 py-1 text-sm text-slate-600">
                Featured
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-tight text-[#0A2540]">
              RBI Guidelines Every Debt Recovery Agent Should Know in 2026
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Learn the latest RBI and IIBF compliance expectations for modern
              recovery operations and how agencies can avoid regulatory risks.
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                8 people read
              </div>
              <div>May 2026</div>
            </div>

            <button className="mt-8 flex w-fit items-center rounded-xl bg-[#1565D8] px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
              Read Article
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section id="articles-display" className="mx-auto max-w-7xl px-6 lg:px-8 scroll-mt-12">
        <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
          {categories.map((item) => {
            const isActive = selectedCategory === item;
            return (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#1565D8] text-white shadow-md border border-[#1565D8]"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-[#1565D8]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
            <p className="text-slate-500 font-medium text-lg">No articles match your specified criteria.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} 
              className="mt-3 text-[#1565D8] font-semibold underline hover:text-blue-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <article
                key={index}
                className="group flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="overflow-hidden h-56 w-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-[#1565D8]">
                        {blog.category}
                      </span>
                      <span className="text-sm text-slate-500">
                        {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold leading-snug text-[#0A2540] transition group-hover:text-[#1565D8]">
                      {blog.title}
                    </h3>

                    <p className="mt-4 leading-7 text-slate-600 line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7">
                  <button className="flex items-center font-semibold text-[#1565D8] hover:text-blue-700">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* INDUSTRY INSIGHTS */}
      <section className="bg-[#0A2540] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <p className="font-semibold text-[#63B3ED]">
              Recovery Industry Insights
            </p>
            {/* RESOLVED: Forced explicit text-white class to counteract global header overrides */}
            <h2 className="mt-4 text-5xl font-bold text-white">
              Banking & Recovery Intelligence
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur">
              <h3 className="text-5xl font-bold text-[#63B3ED]">68%</h3>
              <p className="mt-4 text-lg text-slate-300">
                Improvement through structured recovery workflows
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur">
              <h3 className="text-5xl font-bold text-[#63B3ED]">92%</h3>
              <p className="mt-4 text-lg text-slate-300">
                Institutions adopting compliance-first recovery systems
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-10 backdrop-blur">
              <h3 className="text-5xl font-bold text-[#63B3ED]">AI+</h3>
              <p className="mt-4 text-lg text-slate-300">
                Predictive analytics reshaping debt collection operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[#0A2540] to-[#1565D8] p-14 text-white shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                <GraduationCap className="mr-2 h-5 w-5" />
                Industry Certified Training
              </div>

              {/* RESOLVED: Forced explicit text-white class to counteract global header overrides */}
              <h2 className="text-5xl font-bold leading-tight text-white">
                Become a Certified Recovery Professional
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-200">
                Master debt recovery, banking compliance, negotiation
                strategies, and credit management through expert-led programs.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-xl bg-white px-6 py-4 font-semibold text-[#0A2540] transition hover:bg-slate-50">
                  Explore Courses
                </button>
                <button className="rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-semibold backdrop-blur transition hover:bg-white/20">
                  Get Certified
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur w-full max-w-sm">
                <PlayCircle className="mx-auto h-20 w-20 text-white cursor-pointer hover:scale-105 transition-transform" />
                <h3 className="mt-6 text-center text-2xl font-bold text-white">
                  Recovery Strategy Masterclass
                </h3>
                <p className="mt-4 text-center text-slate-200 text-sm">
                  Learn advanced collections, compliance, and negotiation
                  systems from industry professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="font-semibold text-[#1565D8]">FAQ</p>
          <h2 className="mt-3 text-5xl font-bold text-[#0A2540]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {[
            "Who should join recovery training programs?",
            "Are certifications RBI/IIBF aligned?",
            "Do you provide online learning?",
            "Are legal recovery modules included?",
          ].map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-[#0A2540] flex justify-between items-center">
                <span>{faq}</span>
                <span className="text-[#1565D8] font-light text-2xl">+</span>
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-[#0A2540] py-24 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* RESOLVED: Forced explicit text-white class to counteract global header overrides */}
          <h2 className="text-5xl font-bold leading-tight text-white">
            Ready to Advance Your Recovery & Credit Management Skills?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Join Creditor Academy and access professional recovery education,
            compliance training, and modern financial intelligence resources.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-xl bg-white px-8 py-4 font-semibold text-[#0A2540] transition hover:bg-slate-50">
              Join Creditor Academy
            </button>
            <button className="rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold backdrop-blur transition hover:bg-white/20">
              Contact Team
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}