import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { siteSettings } from "@/db/schema";
import { db } from "@/lib/db";

const TERMS_KEY = "termsAndConditions";

export async function GET() {
  try {
    const settings = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, TERMS_KEY))
      .limit(1);

    return NextResponse.json({
      termsAndConditions: settings[0]?.value ?? "",
    });
  } catch (error) {
    console.error("Failed to fetch terms and conditions:", error);
    return NextResponse.json(
      { error: "Failed to fetch terms and conditions" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const value = String(body.termsAndConditions ?? "").trim();

    const [existing] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, TERMS_KEY))
      .limit(1);

    const [setting] = existing
      ? await db
          .update(siteSettings)
          .set({ value, updatedAt: new Date() })
          .where(eq(siteSettings.key, TERMS_KEY))
          .returning()
      : await db
          .insert(siteSettings)
          .values({ key: TERMS_KEY, value })
          .returning();

    return NextResponse.json({ siteSetting: setting });
  } catch (error) {
    console.error("Failed to save terms and conditions:", error);
    return NextResponse.json(
      { error: "Failed to save terms and conditions" },
      { status: 500 },
    );
  }
}
