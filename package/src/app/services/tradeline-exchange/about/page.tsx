import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/about");

export default function AboutPage() {
  return <AboutClient />;
}
