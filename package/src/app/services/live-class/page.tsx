import { Liveclass } from "./Live"
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";

export const metadata: Metadata = pageMetadata("/services/live-class");

export default function LiveClass() {
  return <Liveclass />;
}