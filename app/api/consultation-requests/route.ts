import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

import { consultationRequests } from "@/db/schema";
import { sendInquiryNotificationEmail } from "@/lib/email/sendInquiryNotification";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim();
    const consultationType = String(body.consultationType ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!email || !consultationType || !message) {
      return NextResponse.json(
        { error: "Email, consultation type, and message are required" },
        { status: 400 },
      );
    }

    const [consultationRequest] = await db
      .insert(consultationRequests)
      .values({
        email,
        consultationType,
        message,
      })
      .returning();

    try {
      await sendInquiryNotificationEmail({
        consultationType,
        email,
        inquiryType: "Consultation Request",
        message,
        submittedAt: consultationRequest.createdAt,
      });
    } catch (emailError) {
      console.error("Failed to send consultation request email:", emailError);
    }

    return NextResponse.json({ consultationRequest }, { status: 201 });
  } catch (error) {
    console.error("Failed to create consultation request:", error);
    return NextResponse.json(
      { error: "Failed to create consultation request" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const requests = await db
      .select()
      .from(consultationRequests)
      .orderBy(desc(consultationRequests.createdAt));

    return NextResponse.json({ consultationRequests: requests });
  } catch (error) {
    console.error("Failed to fetch consultation requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation requests" },
      { status: 500 },
    );
  }
}
