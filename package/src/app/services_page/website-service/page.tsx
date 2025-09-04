// app/services_page/website-service/page.tsx
import { Website } from './Website';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Creation | Creditor Academy",
};


export default function WebsiteServicePage() {
  return <Website />;
}
