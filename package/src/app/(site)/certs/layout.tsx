import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificate | Creditor",
};

export default function CertsLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return children as React.ReactElement;
}


