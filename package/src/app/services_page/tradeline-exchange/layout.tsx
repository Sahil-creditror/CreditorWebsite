// src/app/services_page/tradeline-exchange/layout.tsx
import Navbar from "@/app/components/layout/header/index";
import Footer from "@/app/components/layout/footer/index";

export const metadata = {
  title: "Tradeline Exchange | Creditor Academy",
  description: "Buy and sell seasoned tradelines to strengthen credit profiles with a secure and compliant process.",
};

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
