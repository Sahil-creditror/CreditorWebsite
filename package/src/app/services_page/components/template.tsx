import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, easeOut } from "framer-motion";

type ServiceCard = {
  id: string;
  title: string;
  image: string; // path in /public/images/...
  gradient: string; // tailwind gradient classes
};

const SERVICES: ServiceCard[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    image: "/images/services/template/digital.webp",
    gradient: "from-slate-800/80 via-slate-700/70 to-slate-900/80",
  },
  {
    id: "music-studio",
    title: "Music & Studio",
    image: "/images/services/template/music.webp",
    gradient: "from-gray-800/80 via-gray-700/70 to-gray-900/80",
  },
  {
    id: "health-care",
    title: "Health Care",
    image: "/images/services/template/health.webp",
    gradient: "from-zinc-800/80 via-zinc-700/70 to-zinc-900/80",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    image: "/images/services/template/estate.webp",
    gradient: "from-neutral-800/80 via-neutral-700/70 to-neutral-900/80",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    image: "/images/services/template/business.webp",
    gradient: "from-stone-800/80 via-stone-700/70 to-stone-900/80",
  },
  {
    id: "e-commerce",
    title: "E‑Commerce",
    image: "/images/services/template/ecommerce.webp",
    gradient: "from-slate-900/80 via-gray-800/70 to-slate-800/80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

// Inner content animations: slide up items when card becomes visible
const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const contentItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export default function WebsiteCreationSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white dark:from-[#060617] dark:to-[#071024]">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
            Amazingly websites that convert — tailored for your industry
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Choose a starter layout to launch fast, or go premium with our Cadillac Template — each service card
            shows a live preview and industry‑specific visuals. Fully responsive, animated, and performance focused.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((s) => (
            <motion.article
              key={s.id}
              variants={cardVariants}
              className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={s.image}
                  alt={`${s.title} preview`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center filter brightness-75"
                  priority={false}
                />

                {/* Simple gradient overlay */}
                <div
                  aria-hidden
                  className={`absolute inset-0 bg-gradient-to-tr ${s.gradient} opacity-80`}
                />

              </div>

              {/* Card content */}
              <motion.div
                variants={contentContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative p-6 sm:p-8 h-56 flex flex-col justify-between"
              >
                <motion.div variants={contentItemVariants}>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white drop-shadow-lg">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/90 max-w-prose drop-shadow">Designed for {s.title.toLowerCase()} businesses — modern layout, speed optimized, and easy to edit.</p>
                </motion.div>

                <motion.div variants={contentItemVariants} className="flex gap-3 items-center">
                  {s.id !== "e-commerce" && (
                    <Link
                      href={
                        s.id === "digital-marketing"
                          ? "https://rccreditor.github.io/DigiMarketSimple/"
                          : s.id === "music-studio"
                          ? "https://ankitcreditor.github.io/EchoVerse/"
                          : s.id === "health-care"
                          ? "https://prernacreditor.github.io/Healthcare/"
                          : s.id === "real-estate"
                          ? "https://prernacreditor.github.io/Real-estate-new/"
                          : s.id === "business-consulting"
                          ? "https://ankitcreditor.github.io/ConsultXpert/"
                          : `/templates/starter/${s.id}`
                      }
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/90 text-slate-900 text-sm font-medium shadow hover:scale-105 transform transition-transform duration-200"
                      aria-label={`View Starter Template for ${s.title}`}
                    >
                      View Starter Template
                    </Link>
                  )}

                  <Link
                    href={
                      s.id === "digital-marketing"
                        ? "https://digital99-nloo.vercel.app/"
                        : s.id === "music-studio"
                        ? "https://princliv.github.io/RhythmicVibe/"
                        : s.id === "health-care"
                        ? "https://healthtemplate-1-93zk.vercel.app/"
                        : s.id === "real-estate"
                        ? "https://prernacreditor.github.io/Real-Estate/"
                        : s.id === "business-consulting"
                        ? "https://prernamishra29.github.io/Illuminant/"
                        : s.id === "e-commerce"
                        ? "https://prernacreditor.github.io/E_Commerce"
                        : `/templates/cadillac/${s.id}`
                    }
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-white/40 text-white text-sm font-semibold backdrop-blur-sm hover:scale-105 transform transition-transform duration-200"
                    aria-label={`View Cadillac Template for ${s.title}`}
                  >
                    View Cadillac Template
                  </Link>
                  
                </motion.div>
              </motion.div>

              {/* Hover accent */}
              <div className="absolute -bottom-8 right-6 w-28 h-28 rounded-full bg-white/10 blur-2xl opacity-0 transform rotate-12 transition-all duration-500 pointer-events-none group-hover:opacity-100"></div>

              {/* subtle hover overlay effect */}
              <style jsx>{`
                article:hover img { transform: scale(1.05); }
                article img { transition: transform 700ms cubic-bezier(.2,.9,.3,1); }
              `}</style>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-700 dark:text-slate-300">Want these templates customised? </p>
          <Link
            href="/contact"
            className="inline-block mt-4 rounded-full px-6 py-3 bg-slate-900 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Request a custom build
          </Link>
        </div>
      </div>
    </section>
  );
}
