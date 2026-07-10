"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RedirectButton } from "../RedirectButton";
import { geistSans } from "@/lib/utils";

type DbService = {
  id: string;
  name: string;
  image: string | null;
  description: string;
  sectionId: string;
};

const services = [
  {
    id: "asdf123",
    name: "Client Representation",
    description:
      "Professional on-ground oversight for clients building in Rwanda, including diaspora investors.",
    image: "/images/house-1.png",
    sectionId: "client-representation",
    bg: "bg-[#F2F2F2]",
  },
  {
    id: "asdf124",
    name: "Pre-Construction Advisory",
    description:
      "Feasibility and planning services that bring clarity before major financial commitments.",
    image: "/images/house-2.png",
    sectionId: "pre-construction-advisory",
    bg: "bg-[#E8E9D8]",
    featured: true,
  },
  {
    id: "asdf125",
    name: "Design & Build",
    description:
      "End-to-end construction for a limited number of premium projects with defined scope and budgets.",
    image: "/images/house-3.png",
    sectionId: "design-build",
    bg: "bg-[#DCEBE4]",
  },
];

const cardStyles = [
  { bg: "bg-[#F2F2F2]", featured: false },
  { bg: "bg-[#E8E9D8]", featured: true },
  { bg: "bg-[#DCEBE4]", featured: false },
];

function ServiceCard({
  service,
  index,
}: {
  service: DbService;
  index: number;
}) {
  const style = cardStyles[index % cardStyles.length];
  const router = useRouter();
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  const handleServiceClick = () => {
    setIsIconAnimating(true);

    window.setTimeout(() => {
      router.push(`/boraland/our-services#${service.sectionId}`);
    }, 220);
  };

  return (
    <button
      type="button"
      onClick={handleServiceClick}
      className={`group flex w-full max-w-[330px] cursor-pointer flex-col text-left ${
        style.featured ? "lg:-translate-y-7.5" : "lg:translate-y-10"
      }`}
    >
      {/* Image card */}
      <div
        className={`relative flex aspect-[330/255] w-full items-center justify-center ${style.bg}`}
      >
        <span className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2D2D2D] text-[#D9C06E] flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110">
          <ArrowUpRight
            className={isIconAnimating ? "animate-service-icon-shot" : ""}
          />
        </span>

        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            className={`w-[72%] max-w-60 object-contain transition-transform duration-300 ease-out group-hover:scale-110 ${
              isIconAnimating ? "scale-110" : ""
            }`}
            width={240}
            height={157}
          />
        ) : (
          <span className="text-6xl font-bold text-[#2D2D2D]/20">
            {service.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-[#2D2D2D] sm:text-[22px]">
          {service.name}
        </h3>

        <p className="mt-2 max-w-[320px] text-[16px] italic text-[#3F3F3F]">
          {service.description}
        </p>
      </div>
    </button>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services-overview"
      className="min-h-screen bg-[#ECECEC] px-5 py-16 sm:px-6 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top heading */}
        <div className="mb-14 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:mb-20">
          <RedirectButton
            text={"Services Overview"}
            IconType={ArrowDownRight}
          />

          <div className={`text-center md:text-left ${geistSans.className}`}>
            <h2 className="text-[36px] leading-none text-[#2D2D2D] sm:text-[48px]">
              Explore Works
            </h2>

            <h2 className="text-[36px] leading-none text-[#7B7B7B] sm:text-[48px]">
              Our Services
            </h2>
          </div>
        </div>

        {/* Cards */}

        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
