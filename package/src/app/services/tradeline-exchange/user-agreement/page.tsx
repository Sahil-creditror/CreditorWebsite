import type { Metadata } from "next";
import UserAgreementClient from "./UserAgreementClient";

export const metadata: Metadata = {
  title: "User Agreement | Tradeline Exchange | Creditor Academy",
  description: "Review the user agreement governing your use of the Tradeline Exchange marketplace.",
  keywords: "tradeline exchange user agreement, tradeline terms of service",
};

export default function UserAgreementPage() {
  return <UserAgreementClient />;
}
