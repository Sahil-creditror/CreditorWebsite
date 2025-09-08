import { Liveclass } from "./Live"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Class | Creditor Academy",
};

export default function LiveClass() {
  return <Liveclass />;
}