import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { projects } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      images,
      category,
      status,
      tags,
      description,
      cost,
      address,
      isFeatured,
    } = body;

    if (!name || !category) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 },
      );
    }

    if (isFeatured) {
      await db.update(projects).set({ isFeatured: false });
    }

    const [project] = await db
      .insert(projects)
      .values({
        name,
        images: images || [],
        category,
        status: status || "draft",
        tags: tags || [],
        description: description || "",
        cost: cost || "",
        address: address || "",
        isFeatured: Boolean(isFeatured),
      })
      .returning();

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json({ projects: allProjects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
