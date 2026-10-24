import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/contact");

export default function ContactPage() {
  return <ContactClient />;
}
