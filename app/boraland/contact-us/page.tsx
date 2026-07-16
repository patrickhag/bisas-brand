import ContactSection from "@/components/contact-us-page/ContactUsSection";
import IntroSection from "@/components/ui/IntroSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Boraland",
  description:
    "Contact Boraland for construction oversight, consultation requests, and project representation in Rwanda.",
  path: "/boraland/contact-us",
});

export default function ContactUsPage() {
  return (
    <>
      <IntroSection
        titlePrefix="Contact "
        titleHighlight="Boraland"
        paragraphs={[
          "For project inquiries, please reach out using the details below.",
        ]}
      />
      <ContactSection />
    </>
  );
}
