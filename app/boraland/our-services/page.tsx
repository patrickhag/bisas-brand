import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import SecondServiceSection from "@/components/services-page/SecondServiceDetail";
import ServiceDetailSection from "@/components/services-page/ServiceDetail";
import ThirdServiceSection from "@/components/services-page/ThirdServiceDetail";
import WhatWeDoSection from "@/components/services-page/WhatWeDo";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Our Services",
  description:
    "Explore Boraland's client representation, pre-construction advisory, and design-build services for serious construction projects in Rwanda.",
  path: "/boraland/our-services",
});

export default function ServicesPage() {
  return (
    <>
      <WhatWeDoSection />
      <ServiceDetailSection />
      <SecondServiceSection />
      <ThirdServiceSection />
      <SeriousProjectsSection />
    </>
  );
}
