"use client";

import LearningPathHub from "@/app/components/learning-paths/hub";
import { getCoursePath } from "@/app/components/learning-paths/data";

export default function MasterClassHub() {
  return <LearningPathHub course={getCoursePath("master-class")} />;
}
