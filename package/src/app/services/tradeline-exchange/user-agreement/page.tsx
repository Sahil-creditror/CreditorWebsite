import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import UserAgreementClient from "./UserAgreementClient";

export const metadata: Metadata = pageMetadata("/services/tradeline-exchange/user-agreement");

export default function UserAgreementPage() {
  return <UserAgreementClient />;
}
