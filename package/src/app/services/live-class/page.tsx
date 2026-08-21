import { Liveclass } from "./Live"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us Live on YouTube | Creditor Academy",
  description: "Join live, instructor-led classes on business trusts, credit building and private wealth strategies with Creditor Academy.",
  keywords: "live classes, instructor led training, live credit coaching, youtube, become private, operate private, financial freedom, creditor academy",
};

export default function LiveClass() {
  return <Liveclass />;
}