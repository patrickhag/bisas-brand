import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, image, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 },
      );
    }

    const [updated] = await db
      .update(services)
      .set({
        name,
        image: image || null,
        description: description || "",
      })
      .where(eq(services.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ service: updated });
  } catch (error) {
    console.error("Failed to update service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ service: deleted });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 },
    );
  }
}
