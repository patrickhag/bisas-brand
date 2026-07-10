import { Roboto } from "next/font/google";
import WhoWeAre from "@/components/landing-page/WhoWeAre";
import HeaderSection from "@/components/landing-page/Header";
import HeroSection from "@/components/landing-page/HeroSection";
import ServicesSection from "@/components/landing-page/ServiceCard";
import GallerySection from "@/components/landing-page/GallerySection";
import AudienceSection from "@/components/landing-page/AudienceSection";
import WhyClientsChooseSection from "@/components/landing-page/WhyClientsChooseSection";
import Footer from "@/components/landing-page/Footer";
import { createPageMetadata } from "@/lib/seo";

const roboto = Roboto({
  variable: "--page-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata = createPageMetadata({
  title: "Construction Oversight in Rwanda",
  description:
    "Engineer-led construction oversight and client representation in Rwanda for diaspora owners, executives, and investors.",
  path: "/",
});

export default function Home() {
  return (
    <div className={roboto.className}>
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
