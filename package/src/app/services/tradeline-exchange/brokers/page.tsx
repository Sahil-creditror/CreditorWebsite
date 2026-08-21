import type { Metadata } from "next";
import BrokersClient from "./BrokersClient";

export const metadata: Metadata = {
  title: "Tradeline Brokers: Partner & Earn | Creditor Academy",
  description: "Become a tradeline broker and earn commissions selling verified authorized user tradelines throughout the Tradeline Exchange.",
  keywords: "tradeline brokers, tradeline reseller, sell tradelines for commission, creditor academy",
};

export default function BrokersPage() {
  return <BrokersClient />;
}
