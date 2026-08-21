"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { Calendar, Clock, ArrowLeft, Layers } from "lucide-react";
import type { JournalPost } from "@/lib/journalPosts";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

type BlogDetailProps = {
  post: JournalPost;
};

// ── Custom styled native scrollbar via injected style ──────────────────────
function CustomScrollbar() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "blog-scrollbar-style";
    style.textContent = `
      html {
        scrollbar-width: thin;
        scrollbar-color: #2563EB #e2e8f0;
      }
      html::-webkit-scrollbar {
        width: 8px;
      }
      html::-webkit-scrollbar-track {
        background: #e2e8f0;
        border-radius: 99px;
      }
      html::-webkit-scrollbar-thumb {
        background: #2563EB;
        border-radius: 99px;
        border: 2px solid #e2e8f0;
        min-height: 40px;
      }
      html::-webkit-scrollbar-thumb:hover {
        background: #1d4ed8;
      }
      html::-webkit-scrollbar-button {
        display: block;
        height: 6px;
        background: #e2e8f0;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.getElementById("blog-scrollbar-style")?.remove();
    };
  }, []);
  return null;
}

function renderInlineText(text: string): React.ReactNode {
  // Split on both bold (**text**) and link ([text](url)) patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    // Handle [link](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-medium italic"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Handle **bold**
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-semibold text-neutral-900">
          {boldMatch[1]}
        </strong>
      );
    }

    return part;
  });
}

export default function BlogDetail({ post }: BlogDetailProps) {
  // Pre-process content to dynamically insert CTA blocks for all blogs
  const cleanContent = [...post.content].filter(block => !block.startsWith("[CTA]"));

  // Find index of "## Conclusion" heading
  const conclusionIndex = cleanContent.findIndex(
    (block) => typeof block === "string" && block.trim() === "## Conclusion"
  );

  const ctaString = "[CTA]Ready to Take the Next Step?||Join the FREE Live Webinar NOW ! |https://creditoracademy.com/webinar[/CTA]";

  // Insert Conclusion CTA
  if (conclusionIndex !== -1) {
    cleanContent.splice(conclusionIndex, 0, ctaString);
  } else {
    cleanContent.push(ctaString);
  }

  // Find middle index of the list (after Conclusion CTA is added)
  const middleIndex = Math.floor(cleanContent.length / 2);
  if (middleIndex > 0 && middleIndex < cleanContent.length) {
    cleanContent.splice(middleIndex, 0, ctaString);
  }

  return (
    <main
      className={`${poppins.className} min-h-screen bg-[#FAFAFA] text-neutral-900 pb-12 sm:pb-18 overflow-x-hidden selection:bg-neutral-900 selection:text-white`}
    >
      <CustomScrollbar />
      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#456ad1] via-[#29479b] to-[#273a86] pt-28 pb-14 sm:pt-34 sm:pb-16 px-4 sm:px-6 md:px-20">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Link
            href="/Blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to Journal
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-300 uppercase tracking-widest">
              <Layers size={11} />
              <span>{post.category}</span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-white">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-yellow-300" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-yellow-300" />
                {post.readTime} read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Landscape hero image — same aspect ratio on all screen sizes */}
      <section className="relative -mt-6 sm:-mt-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-neutral-100 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.03)]">
            <div className="relative w-full aspect-video">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* JOURNAL CONTENT BODY */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200/70 p-5 sm:p-8 md:p-12 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
        >
          {/* description hidden */}

          <div className="space-y-4 sm:space-y-6">
            {cleanContent.map((block, index) => {
              if (block.startsWith("[CTA]")) {
                const ctaParts = block
                  .replace("[CTA]", "")
                  .replace("[/CTA]", "")
                  .trim()
                  .split("|");
                const [ctaTitle, ctaDesc, btnText, btnUrl] = ctaParts;
                return (
                  <div
                    key={index}
                    className="my-6 overflow-hidden rounded-xl bg-blue-600 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between py-4 px-6 sm:py-5 sm:px-8 gap-4 border border-blue-500"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
                        {ctaTitle}
                      </h3>
                      {ctaDesc && (
                        <p className="mt-1 text-blue-100 text-xs sm:text-sm leading-relaxed">
                          {ctaDesc}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href={btnUrl || "https://creditoracademy.com/webinar"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-yellow-400 text-blue-950 font-semibold hover:bg-yellow-300 transition-all shadow-sm hover:shadow-md text-xs sm:text-sm whitespace-nowrap active:scale-95 duration-150"
                      >
                        {btnText}
                      </a>
                    </div>
                  </div>
                );
              }

              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="text-neutral-900 text-lg sm:text-xl md:text-2xl font-semibold tracking-tight pt-2"
                  >
                    {block.slice(3)}
                  </h2>
                );
              }

              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-neutral-900 text-base sm:text-lg md:text-xl font-semibold tracking-tight pt-1"
                  >
                    {block.slice(4)}
                  </h3>
                );
              }

              if (block.startsWith("- ")) {
                return (
                  <ul key={index} className="list-disc pl-5 sm:pl-6 space-y-2">
                    {block
                      .split("\n")
                      .filter((line) => line.startsWith("- "))
                      .map((line, lineIndex) => (
                        <li
                          key={lineIndex}
                          className="text-neutral-600 text-sm sm:text-base leading-relaxed"
                        >
                          {renderInlineText(line.slice(2))}
                        </li>
                      ))}
                  </ul>
                );
              }

              if (block.startsWith("[TABLE]")) {
                const rows = block
                  .replace("[TABLE]", "")
                  .replace("[/TABLE]", "")
                  .trim()
                  .split("\n")
                  .filter(Boolean)
                  .map((row) => row.split("|").map((cell) => cell.trim()));

                return (
                  <div
                    key={index}
                    className="overflow-x-auto rounded-lg border border-neutral-200"
                  >
                    <table className="w-full min-w-md text-left text-sm sm:text-base">
                      <thead>
                        <tr className="bg-neutral-50 border-b border-neutral-200">
                          {rows[0]?.map((cell, cellIndex) => (
                            <th
                              key={cellIndex}
                              className="px-4 py-3 font-semibold text-neutral-900"
                            >
                              {cell}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {rows.slice(1).map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-b border-neutral-100 last:border-b-0"
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 text-neutral-600 leading-relaxed align-top"
                              >
                                {renderInlineText(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }

              if (
                block.startsWith("*") &&
                block.endsWith("*") &&
                block.length > 2 &&
                !block.startsWith("**")
              ) {
                return (
                  <p
                    key={index}
                    className="text-neutral-600 text-sm sm:text-base leading-relaxed italic"
                  >
                    {renderInlineText(block.slice(1, -1))}
                  </p>
                );
              }

              if (block.startsWith("**") && block.endsWith("**") && block.length > 4) {
                return (
                  <p
                    key={index}
                    className="text-neutral-900 text-sm sm:text-base font-semibold leading-relaxed"
                  >
                    {block.slice(2, -2)}
                  </p>
                );
              }

              return (
                <p
                  key={index}
                  className="text-neutral-600 text-sm sm:text-base leading-relaxed"
                >
                  {renderInlineText(block)}
                </p>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 sm:mt-10 text-center px-4 sm:px-0">
          <Link
            href="/Blogs"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 text-white text-xs sm:text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
            Back to All Journals
          </Link>
        </div>
      </article>
    </main>
  );
}