import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { contactMessages } from "@/db/schema";
import { db } from "@/lib/db";
import { sendInquiryNotificationEmail } from "@/lib/email/sendInquiryNotification";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 },
      );
    }

    const [contactMessage] = await db
      .insert(contactMessages)
      .values({
        email,
        message,
      })
      .returning();

    try {
      await sendInquiryNotificationEmail({
        email,
        inquiryType: "Contact Message",
        message,
        submittedAt: contactMessage.createdAt,
      });
    } catch (emailError) {
      console.error("Failed to send contact message email:", emailError);
    }

    return NextResponse.json({ contactMessage }, { status: 201 });
  } catch (error) {
    console.error("Failed to create contact message:", error);
    return NextResponse.json(
      { error: "Failed to create contact message" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));

    return NextResponse.json({ contactMessages: messages });
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 },
    );
  }
}
