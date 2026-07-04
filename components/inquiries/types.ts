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
  tab: "Services" | "Reachouts" | "Contacts";
  status: "new" | "read" | "replied";
};

// ─── Service Types ──────────────────────────────

export type ServiceItem = {
  id: string;
  name: string;
  image: string | null;
  description: string;
};

// ─── Status helpers ─────────────────────────────

export const statusConfig: Record<
  Inquiry["status"],
  { label: string; bg: string; text: string }
> = {
  new: { label: "New", bg: "bg-[#F5F0D6]", text: "text-[#9C7D00]" },
  read: { label: "Read", bg: "bg-gray-100", text: "text-gray-500" },
  replied: { label: "Replied", bg: "bg-green-50", text: "text-green-700" },
};

// ─── Inquiry Data ───────────────────────────────

export const inquiries: Inquiry[] = [
  {
    initials: "ES",
    name: "Eline Storm",
    company: "Storm + Co Architects",
    subject: "Collaboration on cultural pavilion",
    preview:
      "Hi — we're scoping a public pavilion for the harbourfront and would love to discuss a possible joint submission...",
    email: "eline@stormco.dk",
    id: "INQ-018",
    time: "10 MIN AGO",
    tab: "Services",
    status: "new",
  },
  {
    initials: "MV",
    name: "Marcus Vandel",
    company: "Vandel Properties",
    subject: "Residence in Oslo — initial consultation",
    preview:
      "We've acquired a plot in Holmenkollen and are looking to start a residential project this autumn...",
    email: "marcus@vandel.no",
    id: "INQ-017",
    time: "2 HOURS AGO",
    tab: "Services",
    status: "new",
  },
  {
    initials: "JR",
    name: "Julia Ravn",
    company: "Ravn Interiors",
    subject: "Retail fit-out for Aarhus flagship",
    preview:
      "We're planning a 300sqm flagship store in Aarhus and need a full-service architectural partner for the fit-out...",
    email: "julia@ravninterior.dk",
    id: "INQ-019",
    time: "30 MIN AGO",
    tab: "Services",
    status: "read",
  },
  {
    initials: "TN",
    name: "Thomas Nørgaard",
    company: "Nordic Spaces",
    subject: "Hotel lobby redesign — scope & estimate",
    preview:
      "We're refreshing our Copenhagen hotel lobby and would like to get a preliminary scope and budget from your team...",
    email: "thomas@nordicspaces.com",
    id: "INQ-020",
    time: "1 DAY AGO",
    tab: "Services",
    status: "replied",
  },
  {
    initials: "SL",
    name: "Sophia Larsen",
    company: "Independent",
    subject: "Press inquiry — Atrium Tower feature",
    preview:
      "Writing on behalf of Dezeen for an upcoming feature on commercial timber structures...",
    email: "sophia@laproton.me",
    id: "INQ-016",
    time: "YESTERDAY",
    tab: "Reachouts",
    status: "new",
  },
  {
    initials: "PK",
    name: "Peder Krogh",
    company: "Arkitektforeningen",
    subject: "Conference speaker invitation",
    preview:
      "We'd like to invite Boraland to present your latest work at the Annual Danish Architecture Conference in May...",
    email: "peder@arkitektforeningen.dk",
    id: "INQ-021",
    time: "3 DAYS AGO",
    tab: "Reachouts",
    status: "new",
  },
  {
    initials: "LB",
    name: "Lene Bjerregaard",
    company: "Bygningsstyrelsen",
    subject: "Tender — public school refurbishment",
    preview:
      "We're issuing a public tender for the refurbishment of three primary schools in the Greater Copenhagen area...",
    email: "lene@bygst.dk",
    id: "INQ-022",
    time: "1 WEEK AGO",
    tab: "Reachouts",
    status: "read",
  },
  {
    initials: "AM",
    name: "Astrid Mikkelsen",
    company: "Kulturhavn Aarhus",
    subject: "Partnership proposal — harbourfront installation",
    preview:
      "Reaching out about a potential collaboration on a temporary art installation along the Aarhus harbourfront this summer...",
    email: "astrid@kulturhavn.dk",
    id: "INQ-023",
    time: "2 WEEKS AGO",
    tab: "Reachouts",
    status: "replied",
  },
  {
    initials: "MH",
    name: "Mette Hviid",
    company: "Private",
    subject: "Residential extension — initial enquiry",
    preview:
      "Hello, we're considering extending our home in Frederiksberg and would like to arrange an initial consultation...",
    email: "mette.hviid@gmail.com",
    id: "CNT-001",
    time: "1 HOUR AGO",
    tab: "Contacts",
    status: "new",
  },
  {
    initials: "KL",
    name: "Kasper Lind",
    company: "Lind Ejendomme",
    subject: "Commercial property consultation",
    preview:
      "We've acquired a commercial property in Ørestad and are looking for an architect to assess its potential...",
    email: "kasper@lindejendomme.dk",
    id: "CNT-002",
    time: "4 HOURS AGO",
    tab: "Contacts",
    status: "read",
  },
  {
    initials: "SN",
    name: "Sofie Nielsen",
    company: "Private",
    subject: "Summer house renovation",
    preview:
      "We own a summer cottage in Tisvildeleje and would like to discuss a renovation project with your team...",
    email: "sofie.nielsen@mail.dk",
    id: "CNT-003",
    time: "5 DAYS AGO",
    tab: "Contacts",
    status: "new",
  },
];
