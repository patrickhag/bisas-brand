import { desc } from "drizzle-orm";

import {
  contactMessages,
  consultationRequests,
  newsletterSubscribers,
} from "@/db/schema";
import { db } from "@/lib/db";
import InquiriesDashboard from "@/components/inquiries/InquiriesDashboard";
import type {
  Inquiry,
  NewsletterSubscriber,
} from "@/components/inquiries/types";

function getInitials(email: string) {
  const [name = ""] = email.split("@");
  const parts = name.split(/[._-]/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase() || "CR";
}

function getTimeLabel(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.floor(diffMs / 60000));

  if (minutes < 60) return `${minutes} MIN AGO`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "HOUR" : "HOURS"} AGO`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "YESTERDAY";
  if (days < 14) return `${days} DAYS AGO`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function InquiriesPage() {
  const [
    allConsultationRequests,
    allContactMessages,
    allNewsletterSubscribers,
  ] = await Promise.all([
    db
      .select()
      .from(consultationRequests)
      .orderBy(desc(consultationRequests.createdAt)),
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)),
    db
      .select()
      .from(newsletterSubscribers)
      .orderBy(desc(newsletterSubscribers.createdAt)),
  ]);

  const consultationInquiries: Inquiry[] = allConsultationRequests.map(
    (request, index) => ({
      initials: getInitials(request.email),
      name: request.email.split("@")[0] || "Consultation Request",
      company: request.consultationType,
      subject: `Consultation request — ${request.consultationType}`,
      preview: request.message,
      email: request.email,
      id: `CONS-${String(allConsultationRequests.length - index).padStart(3, "0")}`,
      time: getTimeLabel(request.createdAt),
      tab: "Consultations",
    }),
  );

  const contactInquiries: Inquiry[] = allContactMessages.map(
    (message, index) => ({
      initials: getInitials(message.email),
      name: message.email.split("@")[0] || "Contact Message",
      company: "Contact form",
      subject: "Contact message",
      preview: message.message,
      email: message.email,
      id: `CNT-${String(allContactMessages.length - index).padStart(3, "0")}`,
      time: getTimeLabel(message.createdAt),
      tab: "Contacts",
    }),
  );

  const serializedNewsletterSubscribers: NewsletterSubscriber[] =
    allNewsletterSubscribers.map((subscriber) => ({
      ...subscriber,
      createdAt: subscriber.createdAt.toISOString(),
    }));

  return (
    <div className="p-5 sm:p-8 lg:p-10">
      <div className="mb-8">
        <div>
          <p className="mb-2 font-mono text-[11px] text-[#7A6F69]">→ INBOX</p>

          <h1 className="font-mono text-4xl font-bold leading-none text-[#2C2C2C] sm:text-5xl">
            Inquiries
          </h1>

          <p className="mt-3 text-sm text-[#7A6F69]">
            New messages from consultation requests and contact forms.
          </p>
        </div>
      </div>

      <InquiriesDashboard
        consultationInquiries={consultationInquiries}
        contactInquiries={contactInquiries}
        newsletterSubscribers={serializedNewsletterSubscribers}
      />
    </div>
  );
}
