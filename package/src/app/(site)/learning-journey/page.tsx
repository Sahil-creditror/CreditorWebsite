import { Metadata } from "next";
import LearningJourney from "@/app/components/learning-journey";

export const metadata: Metadata = {
  title: "Your Learning Journey | Creditor Academy",
  description:
    "Follow the Creditor Academy learning path — from Masterclass Membership through Become Private, Operate Private, and Financial Freedom to Certified Private Operator.",
};

export default function LearningJourneyPage() {
  return <LearningJourney />;
}
