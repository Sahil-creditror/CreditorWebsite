import { Metadata } from "next";
import { pageMetadata } from "@/lib/pageSeo";
import LearningJourney from "@/app/components/learning-journey";

export const metadata: Metadata = pageMetadata("/learning-journey");

export default function LearningJourneyPage() {
  return <LearningJourney />;
}
