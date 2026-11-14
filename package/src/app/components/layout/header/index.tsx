"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Logo from "../logo";
import { ChevronDown, X, Menu, ArrowRight } from "lucide-react";
import {
  BECOME_PRIVATE_PATH,
  OPERATE_PRIVATE_PATH,
  FINANCIAL_FREEDOM_PATH,
} from "@/lib/coursePaths";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);

  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const courseItems = [
    {
      title: "Become Private",
      desc: "Status correction & lawful standing",
      href: "/become-private",
    },
    {
      title: "Operate Private",
      desc: "Business trusts, PMAs & asset defense",
      href: "/operate-private",
    },
    {
      title: "Financial Freedom",
      desc: "Capital, banking & private credit",
      href: "/financial-freedom",
    },
    {
      title: "All Course Catalogs",
      desc: "Browse our complete curriculum",
      href: "/services/course-cataloges",
    },
  ];

  const resourceItems = [
    {
      title: "eBook Library",
      desc: "Guides and educational books",
      href: "/ebooks",
    },
    {
      title: "Articles & Insights",
      desc: "Educational blogs and deep-dives",
      href: "/Blogs",
    },
    {
      title: "Documentation & Tools",
      desc: "Frameworks and checklists",
      href: "/documentation",
    },
  ];

  return (
    <header
      className={`fixed left-0 top-0 w-full z-50 transition-all duration-300 ${
        sticky ? "py-2 sm:py-3 px-3 sm:px-6" : "py-3 sm:py-4 px-3 sm:px-6"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 rounded-2xl ${
          sticky
            ? "max-w-7xl bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/80 px-4 sm:px-6"
            : "max-w-7xl bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-xs px-4 sm:px-6"
        }`}
      >
        <nav className="h-16 flex items-center justify-between">
          {/* BRAND LOGO */}
          <Logo sticky={true} />

          {/* DESKTOP NAVIGATION: Courses | Membership | Free Training | Resources | About */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname.startsWith("/become-private") ||
                  pathname.startsWith("/operate-private") ||
                  pathname.startsWith("/financial-freedom") ||
                  pathname.startsWith("/services/course-cataloges")
                    ? "text-primary"
                    : "text-secondary hover:text-primary hover:bg-slate-100/60"
                }`}
              >
                <span>Courses</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    coursesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {coursesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-72 z-50">
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 animate-in fade-in-50 zoom-in-95">
                    {courseItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        onClick={() => setCoursesDropdownOpen(false)}
                      >
                        <div className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Membership */}
            <Link
              href="/masterclass-membership"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/masterclass-membership"
                  ? "text-primary"
                  : "text-secondary hover:text-primary hover:bg-slate-100/60"
              }`}
            >
              Membership
            </Link>

            {/* Free Training */}
            <Link
              href="/webinar"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/webinar"
                  ? "text-primary"
                  : "text-secondary hover:text-primary hover:bg-slate-100/60"
              }`}
            >
              Free Training
            </Link>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              onMouseLeave={() => setResourcesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/ebooks" ||
                  pathname === "/Blogs" ||
                  pathname === "/documentation"
                    ? "text-primary"
                    : "text-secondary hover:text-primary hover:bg-slate-100/60"
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    resourcesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {resourcesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 z-50">
                  <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl p-2 animate-in fade-in-50 zoom-in-95">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                        onClick={() => setResourcesDropdownOpen(false)}
                      >
                        <div className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {item.desc}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about-us"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === "/about-us"
                  ? "text-primary"
                  : "text-secondary hover:text-primary hover:bg-slate-100/60"
              }`}
            >
              About
            </Link>
          </div>

          {/* RIGHT ACTION BUTTONS: Member Login (Subtle) | Start Free (Prominent) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="https://lmsathena.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-3 sm:px-4 py-2 text-sm font-semibold text-secondary hover:text-primary transition-colors rounded-xl"
            >
              Member Login
            </Link>

            <Link
              href="/webinar"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98]"
            >
              Start Free
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl text-secondary hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs lg:hidden">
          <div
            ref={menuRef}
            className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Logo sticky={true} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-secondary hover:bg-slate-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="py-6 flex flex-col gap-1">
                {/* Courses Header & Links */}
                <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Courses
                </div>
                {courseItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="my-2 border-t border-slate-100" />

                <Link
                  href="/masterclass-membership"
                  className="px-4 py-2.5 text-base font-semibold text-secondary hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Membership
                </Link>

                <Link
                  href="/webinar"
                  className="px-4 py-2.5 text-base font-semibold text-secondary hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Free Training
                </Link>

                <div className="px-3 pt-3 pb-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Resources
                </div>
                {resourceItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-sm font-semibold text-secondary hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="my-2 border-t border-slate-100" />

                <Link
                  href="/about-us"
                  className="px-4 py-2.5 text-base font-semibold text-secondary hover:text-primary hover:bg-slate-50 rounded-xl transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="https://lmsathena.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-secondary border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Member Login
              </Link>

              <Link
                href="/webinar"
                className="w-full text-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 transition-all shadow-sm"
                onClick={() => setMenuOpen(false)}
              >
                Start Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;