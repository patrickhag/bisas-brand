"use client";

import InquiryCardView from "@/components/inquiries/InquiryCardView";
import NewsletterPanel from "@/components/inquiries/NewsletterPanel";
import ServicesPanel from "@/components/inquiries/ServicesPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inquiry, NewsletterSubscriber, ServiceItem } from "./types";

type InquiriesDashboardProps = {
  consultationInquiries: Inquiry[];
  contactInquiries: Inquiry[];
  newsletterSubscribers: NewsletterSubscriber[];
  services: ServiceItem[];
};

export default function InquiriesDashboard({
  consultationInquiries,
  contactInquiries,
  newsletterSubscribers,
  services,
}: InquiriesDashboardProps) {
  return (
    <Tabs defaultValue="Services">
      <TabsList>
        {[
          { key: "Services", count: services.length },
          { key: "Consultations", count: consultationInquiries.length },
          { key: "Contacts", count: contactInquiries.length },
          { key: "Newsletter", count: newsletterSubscribers.length },
        ].map(({ key, count }) => (
          <TabsTrigger key={key} value={key}>
            {key} <span className="ml-1 text-xs opacity-60">{count}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="Services">
        <ServicesPanel initialServices={services} />
      </TabsContent>

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
