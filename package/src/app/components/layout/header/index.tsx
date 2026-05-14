"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import MenuList from "./MenuList";
import Link from "next/link";
import ThemeToggler from "./ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "../logo";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<{ user: any } | null>(null);
  const [menuData, setMenuData] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const isHomePage = pathname === "/";
    const threshold = isHomePage ? 450 : 350; // Higher threshold for home page hero
    setSticky(window.scrollY >= threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
    setUser(null);
    // Redirect to tradeline main page
    router.push("/services_page/tradeline-exchange");
  };

  // Close menu with animation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsClosing(true);
        setTimeout(() => {
          setMenuOpen(false);
          setIsClosing(false);
        }, 300);
      }
    };

    const fetchData = async () => {
      try {
        // Skip when running from file:// where fetch will fail
        if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
          return;
        }
        const res = await fetch("/api/layout-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMenuData(data?.MenuData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-t-4 border-primary transition-all duration-500 ease-in-out before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0 before:bg-primary before:transition-all before:duration-500 before:ease-in-out ${sticky ? "before:h-full" : "before:h-0"
        }`}
    >
      <div className="container">
        <nav
          className={`relative flex items-center justify-between ${sticky ? "py-5" : "py-7"
            }`}
        >
          <div className="flex items-center gap-4 lg:gap-6">
            <Logo sticky={sticky} />

            {/* Navigation Links - Only visible on large screens */}
            <nav className="hidden lg:flex items-center gap-2 sm:gap-3">
              <Link
                href="/services_page/website-service"
                className={`flex justify-center items-center gap-2 text-xs sm:text-sm font-bold rounded-lg py-1.5 px-4 transition-colors ${sticky
                  ? "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  : "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  }`}
              >
                Website Service
              </Link>
              {/* <Link
                href="/services_page/tradeline-exchange"
                className={`flex justify-center items-center gap-2 text-xs sm:text-sm font-bold rounded-lg py-1.5 px-4 transition-colors ${sticky
                  ? "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  : "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  }`}
              >
                Tradeline Exchange
              </Link> */}
              <Link
                href="/services_page/private-merchant"
                className={`flex justify-center items-center gap-2 text-xs sm:text-sm font-bold rounded-lg py-1.5 px-4 transition-colors ${sticky
                  ? "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  : "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  }`}
              >
                Private Merchant
              </Link>
              <Link
                href="/courses"
                className={`flex justify-center items-center gap-2 text-xs sm:text-sm font-bold rounded-lg py-1.5 px-4 transition-colors ${sticky
                  ? "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  : "bg-white text-primary hover:bg-secondary hover:text-white dark:bg-white dark:text-primary dark:hover:bg-secondary dark:hover:text-white"
                  }`}
              >
                Courses
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+14254009246"
              className={`hidden md:flex items-center gap-2 text-sm font-bold transition-colors 
                ${sticky ? "text-white hover:text-secondary" : "text-white hover:text-blue-500"}
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.27.19 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2z" />
              </svg>
              <span>(425-400-9246)</span>
            </a>
            <div className="flex items-center gap-2 sm:gap-3">
              {/*
                <Link
                  href="/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex justify-center items-center gap-2 text-sm sm:text-base font-bold rounded-full py-1.5 px-4 transition-colors
                    ${sticky
                      ? "bg-gray text-white hover:bg-secondary hover:text-white"
                      : "bg-secondary text-white hover:bg-secondary/90"}
                  `}
                >
                  Sign Up
                </Link>
              */}
              <Link
                href="https://lmsathena.com/login"
                className={`flex justify-center items-center gap-2 text-sm sm:text-base font-bold rounded-full py-1.5 px-4 transition-colors
                  ${sticky
                    ? "bg-white text-secondary hover:bg-secondary hover:text-white dark:bg-white dark:text-secondary dark:hover:bg-secondary dark:hover:text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"}
                `}
              >
                Sign In
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggler />
            </div>

            {/* Mobile Phone Icon */}
            <a href="tel:+14254009246" className="md:hidden p-2 text-white hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.27.19 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2z" />
              </svg>
            </a>

            {/* Menu Toggle */}
            <div className="relative flex items-center">
              {!menuOpen ? (
                <button onClick={() => setMenuOpen(true)}>
                  <Image
                    src={
                      sticky
                        ? "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883675/creditor-website-assets/images/Icon/menu-button-sticky.svg"
                        : "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883677/creditor-website-assets/images/Icon/menu-button.svg"
                    }
                    alt="icon"
                    width={35}
                    height={35}
                    className="cursor-pointer"
                  />
                </button>
              ) : (
                <div
                  ref={menuRef}
                  className={`fixed sm:absolute top-0 sm:-top-5 right-0 sm:right-0 
                    w-full sm:min-w-80 sm:max-w-sm 
                    h-screen sm:h-auto 
                    flex flex-col gap-5 bg-white dark:bg-twilliteblack 
                    p-6 sm:rounded-3xl shadow-lg transition-all duration-300 ease-in-out z-40
                    ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
                >
                  {/* Header inside menu */}
                  <div className="flex items-center justify-between pb-5 border-b border-secondary/15 dark:border-white/15">
                    <p className="text-secondary dark:text-white text-lg sm:text-base">
                      Menu
                    </p>
                    <div
                      onClick={() => setMenuOpen(false)}
                      className="p-2 cursor-pointer"
                    >
                      <Image
                        src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883673/creditor-website-assets/images/Icon/close-icon.svg"
                        alt="icon"
                        width={16}
                        height={16}
                        className="dark:hidden"
                      />
                      <Image
                        src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883671/creditor-website-assets/images/Icon/close-icon-dark.svg"
                        alt="icon"
                        width={16}
                        height={16}
                        className="hidden dark:block"
                      />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="overflow-y-auto sm:overflow-visible flex-1 sm:flex-none">
                    <ul className="flex flex-col gap-2 pb-4">
                      {menuData?.map((menuItem: any, index: any) => (
                        <MenuList
                          key={index}
                          item={menuItem}
                          closeMenu={() => setMenuOpen(false)}
                        />
                      ))}
                    </ul>

                    {user?.user || session?.user ? (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleSignOut()}
                          className="flex justify-center items-center cursor-pointer gap-2 text-secondary hover:text-white dark:border dark:border-primary dark:hover:text-white bg-primary dark:hover:bg-transparent dark:hover:border dark:hover:border-white hover:bg-secondary text-base sm:text-xl font-bold rounded-full py-2 px-4 transition-all duration-300 ease-in-out"
                        >
                          Sign Out
                          <Icon
                            icon="solar:logout-outline"
                            width="22"
                            height="22"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Footer inside menu */}
                  <div className="pt-4 sm:pt-0">
                    <Link
                      href="tel:+1-425-400-9246"
                      className="block text-sm sm:text-base text-secondary/60 dark:text-white/60 hover:text-secondary dark:hover:text-white"
                    >
                      +1-425-400-9246
                    </Link>
                    <Link href="mailto:creditoracademy.com">
                      <h4 className="text-sm sm:text-base">
                        creditoracademy.com
                      </h4>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
