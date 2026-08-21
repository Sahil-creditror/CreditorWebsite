import type { Metadata } from "next";
import BuyTradelinesClient from "./BuyTradelinesClient";

export const metadata: Metadata = {
  title: "Buy Tradelines | Boost Credit Score | Creditor Academy",
  description: "Buy authorized user tradelines online to boost your credit score. Verified, high-limit tradelines with fast posting times.",
  keywords: "buy tradelines, tradelines for sale, authorized user tradelines, tradelines online, creditor academy",
};

export default function BuyTradelinesPage() {
  return <BuyTradelinesClient />;
}
