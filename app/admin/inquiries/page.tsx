"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServicesTable from "@/components/inquiries/ServicesTable";
import InquiryCardView from "@/components/inquiries/InquiryCardView";
import { inquiries, ServiceItem } from "@/components/inquiries/types";

// ─── Component ──────────────────────────────────

export default function InquiriesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services);
      }
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const servicesInquiries = inquiries.filter((i) => i.tab === "Services");
  const reachoutsInquiries = inquiries.filter((i) => i.tab === "Reachouts");
  const contactsInquiries = inquiries.filter((i) => i.tab === "Contacts");

  return (
    <div className="p-10">
      {/* header */}
      <div className="mb-8">
        <div>
          <p className="font-mono text-[11px] text-[#7A6F69] mb-2">→ INBOX</p>

          <h1 className="font-mono text-5xl font-bold text-[#2C2C2C] leading-none">
            Inquiries
          </h1>

          <p className="mt-3 text-sm text-[#7A6F69]">
            New messages from the contact form, tenders, and press.
          </p>
        </div>
      </div>

      {/* tabs */}
      <Tabs defaultValue="Services">
        <TabsList>
          {[
            { key: "Services", count: servicesInquiries.length },
            { key: "Reachouts", count: reachoutsInquiries.length },
            { key: "Contacts", count: contactsInquiries.length },
          ].map(({ key, count }) => (
            <TabsTrigger key={key} value={key}>
              {key}{" "}
              <span className="ml-1 text-xs opacity-60">{count}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Services">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-2 text-[#6A6A6A]">
                <Loader2 size={18} className="animate-spin" />
                <span className="font-mono text-sm">
                  Loading services...
                </span>
              </div>
            </div>
          ) : (
            <ServicesTable services={services} onRefresh={fetchServices} />
          )}
        </TabsContent>

        <TabsContent value="Reachouts">
          <InquiryCardView inquiries={reachoutsInquiries} />
        </TabsContent>

        <TabsContent value="Contacts">
          <InquiryCardView inquiries={contactsInquiries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
