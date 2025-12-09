"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import dynamic from "next/dynamic";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ScrollToTop from "../components/scroll-to-top";

const ThanksgivingPopup = dynamic(() => import("../components/home/Thanksgiving"), {
  ssr: false,
});

export default function ClientLayoutShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [is404, setIs404] = useState(false);
  const [thanksgivingKey, setThanksgivingKey] = useState(0);
  const [hasShownModal, setHasShownModal] = useState(true); // Default to true, will be set by useEffect

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.protocol === "file:") {
      setIs404(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(pathname, { method: "HEAD" });
        setIs404(res.status === 404);
      } catch {
        setIs404(false);
      }
    })();
  }, [pathname]);

  // Check if modal has been shown in this session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const modalShown = sessionStorage.getItem("thanksgiving_modal_shown");
      if (!modalShown) {
        setHasShownModal(false);
        sessionStorage.setItem("thanksgiving_modal_shown", "true");
      }
    }
  }, []);

  const excludedRoutes = [
    "/signin",
    "/signup",
    "/forgot-password",
    "/documentation",
    "/become-wonder",
    "/operate-wonder",
    "/private-wonder",
    "/projects-wonder",
  ];
  const hideLayout = excludedRoutes.includes(pathname) || is404;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
        {!hideLayout && <Header />}
        {children}
        {!hideLayout && <Footer />}
        <ScrollToTop />
        
        {/* Thanksgiving Modal - Auto-opens after 5 seconds only once per session */}
         <ThanksgivingPopup 
          key={thanksgivingKey} 
          delayMs={thanksgivingKey > 0 ? 0 : 5000} 
          disableAutoOpen={thanksgivingKey === 0 && hasShownModal}
        />

        {/* Floating Offer Icon Button */}
        <motion.button
          onClick={() => setThanksgivingKey(prev => prev + 1)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 right-6 md:right-8 z-[9998] bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white p-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group"
          aria-label="View Thanksgiving Offers"
        >
          <Gift className="h-6 w-6 animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center text-[10px] font-bold">🔥</span>
          </span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            Thanksgiving Offers
          </span>
        </motion.button>
      </ThemeProvider>
    </SessionProvider>
  );
}


