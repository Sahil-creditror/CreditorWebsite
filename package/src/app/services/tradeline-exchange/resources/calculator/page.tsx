import type { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Tradeline Calculator: Credit Score Boost | Creditor Academy",
  description: "Use our free calculator to estimate how much an authorized user tradeline could boost your credit score.",
  keywords: "tradeline calculator, credit score boost estimator, tradeline impact calculator, creditor academy",
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
