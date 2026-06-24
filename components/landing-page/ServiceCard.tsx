import { ArrowUpRight, MoveDownRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Client Representation",
    description:
      "Professional on-ground oversight for clients building in Rwanda, including diaspora investors.",
    image: "/images/house-1.png",
    bg: "bg-[#F2F2F2]",
  },
  {
    title: "Pre-Construction Advisory",
    description:
      "Feasibility and planning services that bring clarity before major financial commitments.",
    image: "/images/house-2.png",
    bg: "bg-[#E8E9D8]",
    featured: true,
  },
  {
    title: "Design & Build",
    description:
      "End-to-end construction for a limited number of premium projects with defined scope and budgets.",
    image: "/images/house-3.png",
    bg: "bg-[#DCEBE4]",
  },
];

type Service = {
  title: string;
  description: string;
  image: string;
  bg: string;
  featured?: boolean;
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      className={`flex flex-col ${
        service.featured ? "-translate-y-7.5" : "translate-y-10"
      }`}
    >
      {/* Image card */}
      <div
        className={`relative w-82.5 h-63.75 ${service.bg} flex items-center justify-center`}
      >
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2D2D2D] text-[#D9C06E] flex items-center justify-center text-lg">
          <ArrowUpRight />
        </button>

        <Image
          src={service.image}
          alt={service.title}
          className="max-w-60 object-contain"
          width={240}
          height={157}
        />
      </div>

      {/* Text */}
      <div className="mt-5">
        <h3 className="text-[22px] font-semibold text-[#2D2D2D]">
          {service.title}
        </h3>

        <p className="mt-2 text-[16px] italic text-[#3F3F3F] max-w-[320px]">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-[#ECECEC] min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top heading */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
          <button className="px-8 py-4 rounded-full bg-[#D9C06E] text-[#2D2D2D] text-sm font-medium flex items-center gap-2">
            Services Overview
            <MoveDownRight size={15} />
          </button>

          <div className="text-center md:text-left">
            <h2 className="text-[48px] leading-none text-[#2D2D2D]">
              Explore Works
            </h2>

            <h2 className="text-[48px] leading-none text-[#7B7B7B]">
              Our Services
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
