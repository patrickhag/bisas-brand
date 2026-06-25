import AboutIntroSection from "@/components/about-page/AboutIntroSection";
import ApproachSection from "@/components/about-page/ApproachSection";
import FounderSection from "@/components/about-page/FounderSection";
import SeriousProjectsSection from "@/components/SeriousProjectsSection";
import Footer from "@/components/landing-page/Footer";

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
