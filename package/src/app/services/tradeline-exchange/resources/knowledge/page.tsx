import type { Metadata } from "next";
import KnowledgeClient from "./KnowledgeClient";

export const metadata: Metadata = {
  title: "Tradeline Knowledge Base | Creditor Academy",
  description: "Explore Tradeline Exchange's knowledge base to learn how authorized user tradelines work and how they affect your credit.",
  keywords: "tradeline knowledge base, tradeline education, authorized user tradelines explained, creditor academy",
};

export default function KnowledgePage() {
  return <KnowledgeClient />;
}
