
import { getAllProjects } from "@/lib/markdown";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = getAllProjects(["title", "slug", "ScopeOfWork", "industry", "coverImage", "description","tagline"]);
  return NextResponse.json(projects);
}
