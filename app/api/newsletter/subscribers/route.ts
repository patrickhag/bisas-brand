import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { newsletterSubscribers } from "@/db/schema";
import { db } from "@/lib/db";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Enter a valid email address" },
        { status: 400 },
      );
    }

    const existingSubscriber = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existingSubscriber[0]) {
      return NextResponse.json(
        {
          alreadySubscribed: true,
          newsletterSubscriber: existingSubscriber[0],
        },
        { status: 200 },
      );
    }

    const [newsletterSubscriber] = await db
      .insert(newsletterSubscribers)
      .values({ email })
      .returning();

    return NextResponse.json({ newsletterSubscriber }, { status: 201 });
  } catch (error) {
    console.error("Failed to create newsletter subscriber:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.createdAt));

    return NextResponse.json({ newsletterSubscribers: subscribers });
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletter subscribers" },
      { status: 500 },
    );
  }
}
