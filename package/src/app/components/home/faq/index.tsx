"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordian";
import { HelpCircle, Search, Sparkles, Loader2 } from "lucide-react";

/**
 * Enhanced FAQ Section
 * - Animated gradient background with soft blobs + subtle grid
 * - Smooth entrance animations (staggered)
 * - Micro-interactions on accordion items (hover lift, glow ring)
 * - Filter/Search with fuzzy-ish includes
 * - Loading skeleton + graceful empty/error states
 * - Accessible and responsive
 */

export default function Faq() {
  const [faqData, setFaqData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // fetch data with AbortController for cleanup
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/page-data", { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFaqData(data?.faqData);
        setError(null);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error("Error fetching FAQ:", err);
          setError("We couldn't load FAQs right now. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  const faqs: Array<{ faq_que: string; faq_ans: string }> = useMemo(() => {
    const list = Array.isArray(faqData?.data) ? faqData.data : [];
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter((item: any) =>
      (item?.faq_que || "").toLowerCase().includes(q) ||
      (item?.faq_ans || "").toLowerCase().includes(q)
    );
  }, [faqData, query]);

  // --- Framer Motion Variants ---
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  const card: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 110, damping: 16 },
    },
    hover: {
      y: -4,
      scale: 1.01,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-grey dark:bg-darkblack py-20 md:py-24">
      {/* Animated Background Layer */}
      <AnimatedBackground />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="relative z-10"
      >
        <div className="container">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col xl:flex-row items-start gap-8 mb-12"
          >
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <span className="bg-primary text-white dark:text-secondary py-1.5 px-2.5 text-base font-medium rounded-full shadow-sm shadow-black/10 dark:shadow-white/5">
                09
              </span>
              <div className="h-px w-16 bg-black/10 dark:bg-white/10" />
              <p className="section-bedge py-1.5 px-4 rounded-full flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> FAQs
              </p>
            </div>

            <div className="flex-1 max-w-2xl">
              <h2 className="max-w-3xl tracking-tight">Frequently asked questions</h2>
              <p className="mt-3 max-w-2xl text-secondary/70 dark:text-white/70">
                Discover how we tailor our solutions to meet unique needs, delivering impactful
                strategies, personalized branding, and exceptional customer experiences.
              </p>
            </div>
          </motion.div>

          {/* Search + Meta
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10"
          >
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/60" />
              <input
                aria-label="Search FAQs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur border border-black/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition"
              />
            </div>
            <div className="text-sm text-secondary/70 dark:text-white/60">
              {loading ? "Loading…" : `${faqs.length} ${faqs.length === 1 ? "result" : "results"}`}
            </div>
          </motion.div> */}

          {/* Content */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 text-red-600 dark:text-red-400 bg-red-50/70 dark:bg-red-400/10 border border-red-200/70 dark:border-red-400/20 rounded-xl p-4"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              <p>{error}</p>
            </motion.div>
          ) : faqs.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="rounded-2xl p-8 bg-white/70 dark:bg-white/5 backdrop-blur border border-black/5 dark:border-white/10"
            >
              <p className="text-secondary/70 dark:text-white/70">
                No questions match your search. Try different keywords.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-end">
              <Accordion
                type="single"
                collapsible
                className="flex flex-col 2xl:max-w-5xl w-full"
              >
                {faqs.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={card}
                    whileHover="hover"
                    className="group relative rounded-2xl mb-3"
                  >
                    {/* Glow ring on hover */}
                    <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300" style={{
                      background:
                        "radial-gradient(60% 60% at 30% 30%, rgba(99,102,241,0.25), transparent 60%), radial-gradient(50% 60% at 70% 70%, rgba(99,102,241,0.18), transparent 60%)",
                      filter: "blur(12px)",
                    }} />

                    <div className="relative rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur">
                      <AccordionItem value={`item-${index}`}>
                        <AccordionTrigger className="px-5 sm:px-6 py-4">
                          <div className="flex items-start gap-3 sm:gap-4 text-left">
                            <div className="mt-0.5 shrink-0">
                              <HelpCircle className="h-5 w-5 text-primary/80" />
                            </div>
                            <h4 className="leading-tight">
                              {item?.faq_que}
                            </h4>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 sm:px-6 pb-5 -mt-1">
                          <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", stiffness: 140, damping: 18 }}
                            className="text-secondary/80 dark:text-white/75 leading-relaxed"
                          >
                            {item?.faq_ans}
                          </motion.p>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function LoadingSkeleton() {
  const placeholders = Array.from({ length: 5 });
  return (
    <div className="2xl:max-w-5xl w-full">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className="rounded-2xl mb-3 border border-black/5 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur overflow-hidden"
        >
          <div className="animate-pulse p-5 sm:p-6">
            <div className="h-4 w-3/4 bg-black/10 dark:bg-white/10 rounded mb-3" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="mt-4 h-3 w-1/2 bg-black/5 dark:bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** AnimatedBackground
 * Two softly moving gradient blobs + a subtle dotted grid
 */
function AnimatedBackground() {
  const blobTransition = {
    duration: 16,
    repeat: Infinity, // <-- just use Infinity
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
      {/* Subtle grid with radial mask */}
      <div
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundPosition: "0 0, 12px 12px",
          backgroundSize: "24px 24px",
          color: "#6b7280", // gray-500 dots; ignored in dark via opacity
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 40%, rgba(0,0,0,1), transparent 75%)",
          maskImage:
            "radial-gradient(70% 60% at 50% 40%, rgba(0,0,0,1), transparent 75%)",
        }}
      />

      {/* Gradient Blob A */}
      <motion.div
        initial={{ x: -120, y: -60, scale: 1 }}
        animate={{ x: 40, y: 0, scale: 1.08 }}
        transition={blobTransition}
        className="absolute -top-24 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99, 172, 241, 0.35), transparent)",
        }}
      />

      {/* Gradient Blob B */}
      <motion.div
        initial={{ x: 120, y: 40, scale: 1 }}
        animate={{ x: -40, y: 0, scale: 1.04 }}
        transition={{ ...blobTransition, duration: 20 }}
        className="absolute -bottom-32 -right-24 w-[46rem] h-[46rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99, 156, 241, 0.28), transparent)",
        }}
      />

      {/* Vignette edge for depth */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow:
            "inset 0 0 120px rgba(0,0,0,0.06), inset 0 0 260px rgba(0,0,0,0.04)",
        }}
      />
    </div>
  );
}
