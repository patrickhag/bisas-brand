import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import SecondServiceSection from "@/components/services-page/SecondServiceDetail";
import ServiceDetailSection from "@/components/services-page/ServiceDetail";
import ThirdServiceSection from "@/components/services-page/ThirdServiceDetail";
import WhatWeDoSection from "@/components/services-page/WhatWeDo";

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
