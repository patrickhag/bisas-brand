// ─── Inquiry Types ─────────────────────────────

export type Inquiry = {
  initials: string;
  name: string;
  company: string;
  subject: string;
  preview: string;
  email: string;
  id: string;
  time: string;
  tab: "Services" | "Consultations" | "Reachouts" | "Contacts";
};

// ─── Newsletter Types ──────────────────────────

export type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: Date | string;
};

// ─── Service Types ──────────────────────────────

export type ServiceItem = {
  id: string;
  name: string;
  image: string | null;
  description: string;
};
