import type { Metadata } from "next";
import SellTradelinesClient from "./SellTradelinesClient";

export const metadata: Metadata = {
  title: "Sell Tradelines | Earn Money | Creditor Academy",
  description: "Sell your authorized user tradelines and earn passive income. Learn how to list your credit lines with Tradeline Exchange.",
  keywords: "sell tradelines, list tradelines for sale, earn money selling tradelines, creditor academy",
};

export default function SellTradelinesPage() {
  return <SellTradelinesClient />;
}
