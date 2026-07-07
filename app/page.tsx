import WhoWeAre from "@/components/landing-page/WhoWeAre";
import HeaderSection from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import ServicesSection from "@/components/landing-page/ServiceCard";
import GallerySection from "@/components/landing-page/GallerySection";
import AudienceSection from "@/components/landing-page/AudienceSection";
import WhyClientsChooseSection from "@/components/landing-page/WhyClientsChooseSection";
import Footer from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <div className="font-mono">
      <HeaderSection />
      <HeroSection />
      <WhoWeAre />
      <ServicesSection />
      <GallerySection />
      <AudienceSection />
      <WhyClientsChooseSection />
      <Footer />
    </div>
  );
}
