import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import WebinarRegistrationClient from "./WebinarRegistrationClient";

export const metadata: Metadata = pageMetadata("/webinar-registration");

export default function WebinarRegistrationPage() {
  return <WebinarRegistrationClient />;
}
