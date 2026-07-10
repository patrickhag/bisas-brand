import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { newsletterSubscribers } from "@/db/schema";
import { sendNewsletterEmail } from "@/lib/email/sendNewsletterEmail";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 },
      );
    }

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .orderBy(asc(newsletterSubscribers.createdAt));

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: "There are no newsletter subscribers yet" },
        { status: 400 },
      );
    }

    const sendResults = await Promise.allSettled(
      subscribers.map((subscriber) =>
        sendNewsletterEmail({
          message,
          subject,
          to: subscriber.email,
        }),
      ),
    );

    const failed = sendResults.filter((result) => result.status === "rejected");

    if (failed.length > 0) {
      console.error("Failed to send some newsletter emails:", failed);
    }

    return NextResponse.json({
      failed: failed.length,
      sent: sendResults.length - failed.length,
      total: subscribers.length,
    });
  } catch (error) {
    console.error("Failed to send newsletter:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send newsletter",
      },
      { status: 500 },
    );
  }
}
