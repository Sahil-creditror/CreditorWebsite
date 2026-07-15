"use client";

import { useParams } from "next/navigation";
import WebinarRecordingView from "@/app/components/webclass/recording";

export default function CourseRecordingPage() {
  const params = useParams();
  const courseId = typeof params?.course === "string" ? params.course : undefined;

  return <WebinarRecordingView courseId={courseId} />;
}
