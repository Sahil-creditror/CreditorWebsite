"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
const ThanksgivingPopup = dynamic(() => import("../components/home/Thanksgiving"), {
  ssr: false,
});

const RegPopup = dynamic(() => import("../components/reg_popup"), {
  ssr: false,
});

const FloatingButtons = dynamic(() => import("../components/floating-buttons"), {
  ssr: false,
});

const FloatingVideoChatbot = dynamic(() => import("../components/chatbot/FloatingMiniChatbot"), {
  ssr: false,
});

export function ClientLayoutShell({ children }: PropsWithChildren) {
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
    "https://lmsathena.com/login",
    "/forgot-password",
    "/documentation",
    "/become-wonder",
    "/operate-wonder",
    "/private-wonder",
    "/projects-wonder",
  ];
  const hideHeader =
    excludedRoutes.includes(pathname) ||
    pathname.startsWith("/services_page/tradeline-exchange") ||
    is404;
  const hideFooter =
    excludedRoutes.includes(pathname) ||
    pathname === "/signup" ||
    pathname.startsWith("/services_page/tradeline-exchange") ||
    is404;

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
        {!hideHeader && <Header />}
        {children}
        {!hideFooter && <Footer />}

        {/* Floating Buttons: Special Offer, Contact Form, Scroll to Top */}
        <FloatingButtons onSpecialOfferClick={() => setThanksgivingKey(prev => prev + 1)} />

        {/* Landing page video chatbot */}
        {pathname === "/" && <FloatingVideoChatbot />}

        {/* Thanksgiving Modal - Auto-opens after 5 seconds */}
        <ThanksgivingPopup
          delayMs={5000}
          disableAutoOpen={false}
          manualTrigger={thanksgivingKey}
        />

        {/* Registration Notification Popup - Shows on all pages */}
        <RegPopup />
      </ThemeProvider>
    </SessionProvider>
  );
}


