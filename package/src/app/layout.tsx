import { Manrope } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ClientLayoutShell } from "./providers/ClientLayoutShell";
import type { Metadata } from "next";
// Root layout must be a Server Component. Client-only logic moved into ClientLayoutShell.

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap", // Optimize font loading - prevents invisible text during font load
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creditoracademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://creditor.onrender.com" />
        <link rel="dns-prefetch" href="https://creditor.onrender.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Preload critical hero resources for LCP optimization - poster image only, video loads lazily */}
        <link rel="preload" as="image" href="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883550/creditor-website-assets/images/hero/banner-1.png" fetchPriority="high" />
        <link rel="dns-prefetch" href="/video/hero-1.mp4" />
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="pH5h_UHFyDB48WepO74L0KD0hE-6UE7vSYLxpv_9vK4" />
        <meta name="google-site-verification" content="nDoDpJQvkKIVVuuxj-MbkiGSJaM6p9JhM7GFy8SSM8o" />
        {/* Google Tag Manager - Deferred to improve LCP */}
        <Script
          id="gtm-head"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TDRQ44S4');
            `,
          }}
        />
        {/* Google Ads - Deferred to improve LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17542559364"
          strategy="lazyOnload"
        />
      </head>
      <body className={manrope.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TDRQ44S4"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Microsoft Clarity Analytics - Deferred to improve LCP */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "td64021cya");
            `,
          }}
        />
        {/* Google Analytics 4 - Deferred to improve LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QMSV3WP8T5"
          strategy="lazyOnload"
        />
        <Script
          id="ga4-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QMSV3WP8T5');
            `,
          }}
        />
        {/* Google Ads - Deferred to improve LCP */}
        <Script
          id="google-ads-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17542559364');
            `,
          }}
        />
        <ClientLayoutShell>
          {children}
        </ClientLayoutShell>
      </body>
    </html>
  );
}
