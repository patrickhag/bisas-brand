import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const publishedProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"));

    return NextResponse.json({ projects: publishedProjects });
  } catch (error) {
    console.error("Failed to fetch published projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
