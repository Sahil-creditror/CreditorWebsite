import { PrivateMerchant } from './privatemerchant'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Merchant | Creditor Academy",
};

export default function PrivateMerchantPage() {
  return <PrivateMerchant />;
}