// src/app/services/tradeline-exchange/layout.tsx
import Navbar from "@/app/components/layout/header/index";
import Footer from "@/app/components/layout/footer/index";

import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange");

export default function TradelineLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
    </div>
  );
}

