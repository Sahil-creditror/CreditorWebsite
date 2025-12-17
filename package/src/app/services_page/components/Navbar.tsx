// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Menu,
  X,
  BookOpen,
  FileText,
  PenTool,
  Calculator,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openResources, setOpenResources] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resourcesRef = useRef(null);

  // primary links
  const links = [
    { name: "HOME", path: "/services_page/tradeline-exchange" },
    { name: "BUY TRADELINES", path: "/services_page/tradeline-exchange/buy-tradelines" },
    { name: "SELL TRADELINES", path: "/services_page/tradeline-exchange/sell-tradelines" },
    { name: "BROKERS", path: "/services_page/tradeline-exchange/brokers" },
    { name: "ABOUT", path: "/services_page/tradeline-exchange/about" },
    { name: "CONTACT", path: "/services_page/tradeline-exchange/contact" },
    { name: "MY ACCOUNT", path: "/services_page/tradeline-exchange/my-account" },
  ];

  // resources list (single-column)
  const resourceItems = [
    {
      label: "Knowledge Centre",
      href: "/services_page/tradeline-exchange/resources/knowledge",
      icon: <BookOpen className="w-4 h-4" />,
      desc: "Start here: walkthroughs & FAQs.",
    },
    {
      label: "What is a Tradeline?",
      href: "/services_page/tradeline-exchange/resources/what-is-tradeline",
      icon: <FileText className="w-4 h-4" />,
      desc: "Short explainer for beginners.",
    },
    {
      label: "Tradeline Buyer's Guide",
      href: "/services_page/tradeline-exchange/resources/buyers-guide",
      icon: <FileText className="w-4 h-4" />,
      desc: "How to pick the right tradeline.",
    },
    {
      label: "How to Place an Order",
      href: "/services_page/tradeline-exchange/resources/how-to-order",
      icon: <PenTool className="w-4 h-4" />,
      desc: "Step-by-step ordering process.",
    },
    {
      label: "Tradeline Calculator",
      href: "/services_page/tradeline-exchange/resources/calculator",
      icon: <Calculator className="w-4 h-4" />,
      desc: "Estimate impact & pricing.",
    },
    {
      label: "Tradeline FAQs",
      href: "/services_page/tradeline-exchange/resources/faqs",
      icon: <FileText className="w-4 h-4" />,
      desc: "Common buyer & seller questions.",
    },
    {
      label: "Our Guarantee",
      href: "/services_page/tradeline-exchange/resources/guarantee",
      icon: <ShieldCheck className="w-4 h-4" />,
      desc: "What we promise and how we protect you.",
    },
    {
      label: "Report Non-Posting",
      href: "/services_page/tradeline-exchange/resources/report-non-posting",
      icon: <AlertTriangle className="w-4 h-4" />,
      desc: "Report missing account updates quickly.",
    },
  ];

  // Hide navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > lastScroll && scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScroll(scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setOpenResources(false);
      }
    };
    if (openResources) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [openResources]);

  return (
    <header
      className={`sticky top-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-[#0F6FD3] shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Left: text logo */}
        <Link href="/services_page/tradeline-exchange" className="flex items-center shrink-0">
          <div className="flex flex-col leading-none select-none">
            <span className="text-white text-lg md:text-xl font-extrabold tracking-wide uppercase">
              Tradeline Exchange
            </span>

          </div>
        </Link>

        {/* Desktop nav (single line) */}
        <nav className="hidden lg:flex items-center gap-2 text-white text-[13px] font-semibold">
          <div className="flex items-center gap-1">
            {/* first four links */}
            {links.slice(0, 4).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="whitespace-nowrap px-2 py-2 rounded-full hover:bg-white/10 transition-colors text-[13px]"
              >
                {item.name}
              </Link>
            ))}

            {/* RESOURCES dropdown — single column list */}
            <div
              className="relative"
              ref={resourcesRef}
              onMouseEnter={() => setOpenResources(true)}
              onMouseLeave={() => setOpenResources(false)}
            >
              <button
                onClick={() => setOpenResources((v) => !v)}
                className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 rounded-full hover:bg-white/10 transition-colors text-[13px]"
                aria-expanded={openResources}
                aria-haspopup="menu"
              >
                RESOURCES
                <ChevronDown size={14} />
              </button>

              {openResources && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 z-50 overflow-hidden">
                  <div className="px-2 py-2">
                    <ul className="space-y-1">
                      {resourceItems.map((r) => (
                        <li key={r.label}>
                          <Link
                            href={r.href}
                            onClick={() => setOpenResources(false)}
                            className="flex items-start gap-3 px-3 py-2 rounded-md hover:bg-slate-50 transition"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-md bg-sky-50 grid place-items-center text-sky-700 flex-shrink-0">
                              {r.icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-slate-900">{r.label}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* remaining links */}
            {links.slice(4).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="whitespace-nowrap px-2 py-2 rounded-full hover:bg-white/10 transition-colors text-[13px]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => {
              setMobileOpen((v) => !v);
              setOpenResources(false);
            }}
            className="p-2 rounded-md text-white hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0F6FD3] text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-2">
            {/* top group */}
            {[
              { name: "HOME", path: "/services_page/tradeline-exchange" },
              { name: "BUY TRADELINES", path: "/services_page/tradeline-exchange/buy-tradelines" },
              { name: "SELL TRADELINES", path: "/services_page/tradeline-exchange/sell-tradelines" },
              { name: "BROKERS", path: "/services_page/tradeline-exchange/brokers" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-white/10 transition font-semibold text-sm"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile resources: single-column list */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-sm font-semibold px-3 py-2">RESOURCES</div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {resourceItems.map((r) => (
                  <Link
                    key={r.label}
                    href={r.href}
                    onClick={() => {
                      setMobileOpen(false);
                      setOpenResources(false);
                    }}
                    className="flex items-start gap-3 p-3 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="w-9 h-9 rounded-md bg-white/10 grid place-items-center text-white flex-shrink-0">
                      {r.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{r.label}</div>
                      <div className="text-xs text-white/80 mt-1">{r.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* remaining links */}
            {[
              { name: "ABOUT", path: "/services_page/tradeline-exchange/about" },
              { name: "CONTACT", path: "/services_page/tradeline-exchange/contact" },
              { name: "MY ACCOUNT", path: "/services_page/tradeline-exchange/my-account" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className="block py-2 px-3 rounded-md hover:bg-white/10 transition font-semibold text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
