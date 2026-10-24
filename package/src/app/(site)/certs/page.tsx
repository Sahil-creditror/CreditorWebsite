import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import CertsClient from "./CertsClient";

export const metadata: Metadata = pageMetadata("/certs");

export default function CertsPage() {
  return <CertsClient />;
}
