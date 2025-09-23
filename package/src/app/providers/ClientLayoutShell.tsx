"use client";
import { PropsWithChildren, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import ScrollToTop from "../components/scroll-to-top";

export default function ClientLayoutShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [is404, setIs404] = useState(false);

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
      </ThemeProvider>
    </SessionProvider>
  );
}


