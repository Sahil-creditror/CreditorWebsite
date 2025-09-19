"use client";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Script from "next/script";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import ScrollToTop from "./components/scroll-to-top";
import PreloaderWrapper from "./preloader"; // ⬅️ your preloader component

const manrope = Manrope({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [is404, setIs404] = useState(false);

  useEffect(() => {
    // Skip when running from file:// where fetch will fail
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
      setIs404(false);
      return;
    }
    (async () => {
      try {
        const res = await fetch(pathname, { method: "HEAD" });
        setIs404(res.status === 404);
      } catch {
        // Network failure (e.g., not running a dev server). Assume not 404.
        setIs404(false);
      }
    })();
  }, [pathname]);

  const excludedRoutes = ["/signin", "/signup", "/forgot-password","/documentation", "/become-wonder", "/operate-wonder", "/private-wonder", "/projects-wonder"];
  const hideLayout = excludedRoutes.includes(pathname) || is404;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        {/* Microsoft Clarity Analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "td1bkz5bto");
            `,
          }}
        />
        <SessionProvider>
          <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
            {!hideLayout && <Header />}
            
            {/* ✅ Wrap children with Preloader */}
            <PreloaderWrapper>
              {children}
            </PreloaderWrapper>

            {!hideLayout && <Footer />}
            <ScrollToTop />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
