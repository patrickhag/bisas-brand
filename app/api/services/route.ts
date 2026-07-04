import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 },
      );
    }

    const [service] = await db
      .insert(services)
      .values({
        name,
        image: image || null,
        description: description || "",
      })
      .returning();

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Failed to create service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const allServices = await db.select().from(services);
    return NextResponse.json({ services: allServices });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 },
    );
  }
}
