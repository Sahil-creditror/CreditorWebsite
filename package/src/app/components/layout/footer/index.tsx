"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FooterInfoItem {
  icon: string;
  link: string;
  href: string;
}

interface FooterDataState {
  tagline?: string;
  info?: FooterInfoItem[];
}

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterDataState | null>(null);

  const socials = [
    { name: 'Facebook', href: 'https://www.facebook.com/groups/1455118361753321/', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883527/creditor-website-assets/images/footer/facebook.png' },
    { name: 'X', href: 'https://x.com/CreditorAcademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883533/creditor-website-assets/images/footer/twitter.png' },
    { name: 'YouTube', href: 'https://www.youtube.com/@creditoracademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883538/creditor-website-assets/images/footer/youtube.png' },
    { name: 'Rumble', href: 'https://rumble.com/user/CreditorAcademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883531/creditor-website-assets/images/footer/rumble.png' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@creditoracademy', icon: 'https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883532/creditor-website-assets/images/footer/tiktok.png' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/layout-data');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setFooterData(data?.footerData);
      } catch (error) {
        console.error('Error fetching layout data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-secondary text-slate-400 border-t border-white/5">
      {/* Primary Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 xl:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* BRAND COLUMN (Spans 4 columns on large screens) */}
          <div className="flex flex-col gap-6 lg:col-span-4 max-w-md">
            {footerData?.tagline && (
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                {footerData.tagline}
              </h2>
            )}
            
            <div className="flex flex-col gap-3 mt-2">
              {footerData?.info?.map((value, index) => (
                <a 
                  key={index} 
                  href={value.href} 
                  className="flex items-center gap-3 group text-sm text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-200">
                    <Image 
                      src={value.icon} 
                      alt="" 
                      width={16} 
                      height={16} 
                      className="opacity-80 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                  <span className="font-medium tracking-wide truncate">{value.link}</span>
                </a>
              ))}
            </div>
          </div>

          {/* LINK GROUPS GRID (Spans 8 columns on large screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-8 gap-10 sm:gap-6">
            
            {/* COLUMN 1: POLICIES */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase">Lawful & Policies</h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { name: "Privacy Policies", href: "/privacy-policy" },
                  { name: "Terms and Condition", href: "/terms-and-conditions" },
                  { name: "Return and Refunds", href: "/return-refund" },
                  { name: "Membership Terms", href: "/signup" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-300 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: CONTACT US */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase">Contact Us</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="mailto:counselor@creditoracademy.com" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 12 4 6.01V6h16zM4 18V8.24l8 5.76 8-5.76V18H4z"/>
                    </svg>
                    <span className="truncate">counselor@creditoracademy.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+14254009246" className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors group">
                    <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.31.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.27.19 2.47.57 3.58a1 1 0 0 1-.25 1.01l-2.19 2.2z"/>
                    </svg>
                    <span>(425) 400-9246</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400 cursor-default">
                    <svg className="w-4 h-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm.5-9.59V6h-2v7h6v-2h-4z"/>
                    </svg>
                    <span>9:00 AM to 5:00 PM EST</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: SOCIAL LINKS */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase">Social Links</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Follow us on social media to stay updated with our latest news and offerings.
              </p>
              <ul className="flex flex-row flex-wrap gap-2 mt-1">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-200 group rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 hover:bg-white/10 hover:border-white/20"
                      aria-label={s.name}
                    >
                      <Image 
                        src={s.icon} 
                        alt="" 
                        width={16} 
                        height={16} 
                        loading="lazy" 
                        className="opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" 
                      />
                      <span className="text-xs font-medium tracking-wide">{s.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="border-t border-white/5 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Creditor Academy. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;