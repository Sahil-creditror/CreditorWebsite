// src/app/layout.js
import "@/styles/tradeline/globals.css";
import Navbar from "@/app/services_page/components/Navbar";
import Footer from "@/app/components/layout/footer/index";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // Define a CSS variable for easy access
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Specify desired weights
});

export const metadata = {
  title: "Tradeline Exchange | Creditor Academy",
  description: "Buy and sell seasoned tradelines to strengthen credit profiles with a secure and compliant process.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className={`${inter.variable} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
    </div>
  );
}
