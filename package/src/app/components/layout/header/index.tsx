"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import Logo from "../logo";
import MenuList from "./MenuList";
import { COURSES_PAGE_PATH } from "@/lib/coursePaths";
import { WORKSHOP_PATH } from "@/lib/workshop";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);

  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuData, setMenuData] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const scroll = () => {
      setSticky(window.scrollY > 120);
    };

    window.addEventListener("scroll", scroll);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }

    fetch("/api/layout-data")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data?.MenuData || []);
      });

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    const close = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", close);
    }

    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const logout = () => {
    localStorage.removeItem("user");
    signOut();
    setUser(null);
    router.push("/services_page/tradeline-exchange");
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        sticky ? "pt-4 px-4 sm:px-6" : "pt-0 px-0"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-500 ${
          sticky
            ? "max-w-5xl bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-2xl  px-6"
            : "max-w-7xl px-4 sm:px-6 bg-transparent"
        }`}
      >
        <nav className={`${sticky ? "h-16" : "h-20"} flex items-center justify-between`}>
          {/* LOGO */}
          <Logo />

          {/* DESKTOP MENU */}
         {/* DESKTOP MENU */}
<div className="hidden lg:flex items-center gap-0.5">
  {[
    ["Home", "/"],
    ["About", "/about-us"],
  ].map(([name, url]) => (
    <Link
      key={name}
      href={url}
      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        sticky
          ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
          : "text-white hover:bg-white/10"
      }`}
    >
      {name}
    </Link>
  ))}

  {/* SERVICES DROPDOWN */}
  <div className="relative group">
    <Link
      href={COURSES_PAGE_PATH}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        sticky
          ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
          : "text-white hover:bg-white/10"
      }`}
    >
      Services
      <ChevronDown
        size={14}
        className="opacity-70 transition-transform duration-200 group-hover:rotate-180"
      />
    </Link>

    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
      {[
        ["Website Services", "/services/website-service"],
        ["Course Catalogs", "/services/course-cataloges"],
        ["Private Merchant", "/services/private-merchant"],
      ].map(([title, url]) => (
        <Link
          key={title}
          href={url}
          className="block px-4 py-3 rounded-xl text-slate-700 text-sm hover:bg-slate-50 hover:text-indigo-600"
        >
          {title}
        </Link>
      ))}
    </div>
  </div>


  {[
    ["Workshop", WORKSHOP_PATH],
    ["Webinar", "/webinar"],
    ["Contact", "/contact"],
    ["Blogs", "/Blogs"],
  ].map(([name, url]) => (
    <Link
      key={name}
      href={url}
      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        sticky
          ? "text-slate-700 hover:text-slate-950 hover:bg-slate-900/5"
          : "text-white hover:bg-white/10"
      }`}
    >
      {name}
    </Link>
  ))}
</div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <Link
              href="https://lmsathena.com/signup"
              className="hidden md:flex px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
            >
              Sign Up
            </Link>

            <Link
              href="https://lmsathena.com/login"
              className="hidden md:flex px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/10 active:scale-[0.98]"
            >
              Sign In
            </Link>

            {/* MOBILE BUTTON */}
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                sticky 
                  ? "bg-slate-100 text-slate-800 border-slate-200" 
                  : "bg-white/10 text-white border-white/5 hover:bg-white/20"
              }`}>
                ☰
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-sm animate-fade-in">
          <div
            ref={menuRef}
            className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-white border-l border-slate-100 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-slate-400 hover:text-slate-800 transition"
                >
                  ×
                </button>
              </div>

              <div className="space-y-2">
                {menuData.map((item: any, i: number) => (
                  <MenuList
                    key={i}
                    item={item}
                    closeMenu={() => setMenuOpen(false)}
                  />
                ))}
              </div>
            </div>

            {/* MOBILE FOOTER ACTIONS CONTAINER */}
            <div className="mt-8 space-y-3">
              {/* Show Auth links conditionally when no user session is present */}
              {!(user?.user || session?.user) && (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="https://lmsathena.com/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all text-center shadow-md shadow-amber-500/5"
                  >
                    Sign Up
                  </Link>

                  <Link
                    href="https://lmsathena.com/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-all text-center shadow-md shadow-indigo-600/5"
                  >
                    Sign In
                  </Link>
                </div>
              )}

              {/* Logout view state logic intact */}
              {(user?.user || session?.user) && (
                <button
                  onClick={logout}
                  className="w-full rounded-xl bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white py-3 font-bold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  Logout
                  <Icon icon="solar:logout-outline" className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};

export default Header;