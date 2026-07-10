"use client";

import InquiryCardView from "@/components/inquiries/InquiryCardView";
import NewsletterPanel from "@/components/inquiries/NewsletterPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inquiry, NewsletterSubscriber } from "./types";

type InquiriesDashboardProps = {
  consultationInquiries: Inquiry[];
  contactInquiries: Inquiry[];
  newsletterSubscribers: NewsletterSubscriber[];
};

export default function InquiriesDashboard({
  consultationInquiries,
  contactInquiries,
  newsletterSubscribers,
}: InquiriesDashboardProps) {
  return (
    <Tabs defaultValue="Consultations">
      <TabsList>
        {[
          { key: "Consultations", count: consultationInquiries.length },
          { key: "Contacts", count: contactInquiries.length },
          { key: "Newsletter", count: newsletterSubscribers.length },
        ].map(({ key, count }) => (
          <TabsTrigger key={key} value={key}>
            {key} <span className="ml-1 text-xs opacity-60">{count}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="Consultations">
        <InquiryCardView inquiries={consultationInquiries} />
      </TabsContent>

      <TabsContent value="Contacts">
        <InquiryCardView inquiries={contactInquiries} />
      </TabsContent>

      <TabsContent value="Newsletter">
        <NewsletterPanel initialSubscribers={newsletterSubscribers} />
      </TabsContent>
    </Tabs>
  );
}
