import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Tradeline Exchange | Creditor Academy",
  description: "Get in touch with the Tradeline Exchange team for questions about buying, selling or managing your tradelines.",
  keywords: "contact tradeline exchange, tradeline support, creditor academy",
};

export default function ContactPage() {
  return <ContactClient />;
}
