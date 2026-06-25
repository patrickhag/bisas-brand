import IntroSection from "@/components/ui/IntroSection";

export default function AboutIntroSection() {
  return (
    <IntroSection
      titlePrefix="About "
      titleHighlight="Boraland"
      paragraphs={[
        "Most clients building in Rwanda are not in Rwanda. They are in London, in Houston, in Dubai, running businesses and raising families while trying to build something back home.",
        "Boraland exists for exactly that situation. We are your engineer-led representative on the ground, overseeing construction, controlling costs, enforcing quality, and making sure nothing moves without your knowledge and approval.",
      ]}
      ctaLabel="Request a Consultation"
    />
  );
}
