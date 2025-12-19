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
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [openResources, setOpenResources] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resourcesRef = useRef(null);

  /* ---------------- PRIMARY LINKS ---------------- */
  const links = [
    { name: "HOME", path: "/services_page/tradeline-exchange" },
    { name: "BUY TRADELINES", path: "/services_page/tradeline-exchange/buy-tradelines" },
    { name: "SELL TRADELINES", path: "/services_page/tradeline-exchange/sell-tradelines" },
    // { name: "BROKERS", path: "/services_page/tradeline-exchange/brokers" },
    { name: "ABOUT", path: "/services_page/tradeline-exchange/about" },
    { name: "CONTACT", path: "/services_page/tradeline-exchange/contact" },
    { name: "MY ACCOUNT", path: "/services_page/tradeline-exchange/my-account" },
  ];

  /* ---------------- RESOURCES (CLEAN & SIMPLE) ---------------- */
  const resourceItems = [
    {
      label: "Knowledge Center",
      href: "/services_page/tradeline-exchange/resources/knowledge",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      label: "What Is a Tradeline?",
      href: "/services_page/tradeline-exchange/resources/what-is-tradeline",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Buyer’s Guide",
      href: "/services_page/tradeline-exchange/resources/buyers-guide",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "How to Order",
      href: "/services_page/tradeline-exchange/resources/how-to-order",
      icon: <PenTool className="w-4 h-4" />,
    },
    {
      label: "Calculator",
      href: "/services_page/tradeline-exchange/resources/calculator",
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      label: "FAQs",
      href: "/services_page/tradeline-exchange/resources/faqs",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      label: "Guarantee",
      href: "/services_page/tradeline-exchange/resources/guarantee",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      label: "Report an Issue",
      href: "/services_page/tradeline-exchange/resources/report-non-posting",
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  ];

  /* ---------------- SCROLL HIDE ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(!(scrollY > lastScroll && scrollY > 100));
      setLastScroll(scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  /* ---------------- CLICK OUTSIDE ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setOpenResources(false);
      }
    };
    if (openResources) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openResources]);

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-[#0F6FD3]`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <Link href="/services" className="p-2 rounded-full hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <Link href="/services_page/tradeline-exchange">
            <span className="text-white font-extrabold uppercase tracking-wide">
              Tradeline Exchange
            </span>
          </Link>
        </div>

        {/* DESKTOP */}
        <nav className="hidden lg:flex items-center gap-1 text-white text-[13px] font-semibold">
          {links.slice(0, 4).map((l) => (
            <Link key={l.name} href={l.path} className="px-3 py-2 rounded-full hover:bg-white/10">
              {l.name}
            </Link>
          ))}

          {/* RESOURCES */}
          <div
            className="relative"
            ref={resourcesRef}
            onMouseEnter={() => setOpenResources(true)}
            onMouseLeave={() => setOpenResources(false)}
          >
            <button className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-white/10">
              RESOURCES <ChevronDown size={14} />
            </button>

            {openResources && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border">
                <ul className="p-2 space-y-1">
                  {resourceItems.map((r) => (
                    <li key={r.label}>
                      <Link
                        href={r.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-50"
                      >
                        <span className="w-8 h-8 rounded-md bg-sky-50 grid place-items-center text-sky-700">
                          {r.icon}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {r.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {links.slice(4).map((l) => (
            <Link key={l.name} href={l.path} className="px-3 py-2 rounded-full hover:bg-white/10">
              {l.name}
            </Link>
          ))}
        </nav>

        {/* MOBILE */}
        <button
          className="lg:hidden p-2 rounded-md text-white hover:bg-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0F6FD3] border-t border-white/10 px-4 py-3 space-y-2">
          {[...links].map((l) => (
            <Link
              key={l.name}
              href={l.path}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-white/10 text-white font-semibold"
            >
              {l.name}
            </Link>
          ))}

          <div className="pt-2 border-t border-white/10">
            {resourceItems.map((r) => (
              <Link
                key={r.label}
                href={r.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 text-white"
              >
                {r.icon}
                <span className="font-semibold">{r.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
