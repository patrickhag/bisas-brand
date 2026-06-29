import ContactSection from "@/components/contact-us-page/ContactUsSection";
import IntroSection from "@/components/ui/IntroSection";

export default function ContactUsPage() {
  return (
    <>
      <IntroSection
        titlePrefix="Contact "
        titleHighlight="Boraland"
        paragraphs={[
          "For serious project inquiries, please reach out using the details below.",
        ]}
      />
      <ContactSection />
    </>
  );
}
