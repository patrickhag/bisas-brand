import IntroSection from "@/components/ui/IntroSection";

export default function WhatWeDoSection() {
  return (
    <IntroSection
      titlePrefix="Our "
      titleHighlight="Services"
      paragraphs={[
        "Boraland provides structured construction services designed to reduce risk, protect capital, and  deliver predictable outcomes.",
      ]}
      ctaLabel="Request for a Service"
    />
  );
}
