import type { Metadata } from "next";
import CertsClient from "./CertsClient";

export const metadata: Metadata = {
  title: "Verify Your Certifications | Creditor Academy",
  description: "View and verify certifications earned by graduates of Creditor Academy's Become Private, Operate Private and Financial Freedom programs.",
  keywords: "creditor academy certification, verify certificate, course completion certificate, become private, operate private, financial freedom, creditor academy",
};

export default function CertsPage() {
  return <CertsClient />;
}
