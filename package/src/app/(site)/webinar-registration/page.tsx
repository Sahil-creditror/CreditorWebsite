import type { Metadata } from "next";
import WebinarRegistrationClient from "./WebinarRegistrationClient";

export const metadata: Metadata = {
  title: "Register: Free Become Private Webinar | Creditor Academy",
  description: "Reserve your free seat in Creditor Academy's live webinar and learn the framework to become private and achieve financial sovereignty.",
  keywords: "webinar registration, free webinar signup, become private webinar, operate private, financial freedom, creditor academy",
};

export default function WebinarRegistrationPage() {
  return <WebinarRegistrationClient />;
}
