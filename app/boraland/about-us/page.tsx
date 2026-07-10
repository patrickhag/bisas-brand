import AboutIntroSection from "@/components/about-page/AboutIntroSection";
import ApproachSection from "@/components/about-page/ApproachSection";
import FounderSection from "@/components/about-page/FounderSection";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About Boraland",
  description:
    "Learn how Boraland protects property investments through engineer-led oversight, client representation, and disciplined project management.",
  path: "/boraland/about-us",
});

export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />
      <FounderSection />
      <ApproachSection />
      <SeriousProjectsSection />
    </>
  );
}
