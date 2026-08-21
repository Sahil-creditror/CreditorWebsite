import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Tradeline Exchange | Creditor Academy",
  description: "Learn about Tradeline Exchange, Creditor Academy's marketplace for buying and selling verified authorized user tradelines.",
  keywords: "about tradeline exchange, tradeline exchange company, creditor academy",
};

export default function AboutPage() {
  return <AboutClient />;
}
