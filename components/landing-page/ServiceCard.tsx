"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, MoveDownRight, Loader2 } from "lucide-react";
import Image from "next/image";

type DbService = {
  id: string;
  name: string;
  image: string | null;
  description: string;
};

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

  return (
    <div
      className={`flex flex-col ${
        style.featured ? "-translate-y-7.5" : "translate-y-10"
      }`}
    >
      {/* Image card */}
      <div
        className={`relative w-82.5 h-63.75 ${style.bg} flex items-center justify-center`}
      >
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2D2D2D] text-[#D9C06E] flex items-center justify-center text-lg">
          <ArrowUpRight />
        </button>

        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            className="max-w-60 object-contain"
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
        <h3 className="text-[22px] font-semibold text-[#2D2D2D]">
          {service.name}
        </h3>

        <p className="mt-2 text-[16px] italic text-[#3F3F3F] max-w-[320px]">
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState<DbService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data.services);
        }
      } catch {
        // silently fail — show empty state
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

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
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2 text-[#6A6A6A]">
              <Loader2 size={18} className="animate-spin" />
              <span className="font-mono text-sm">Loading services...</span>
            </div>
          </div>
        ) : services.length === 0 ? (
          <p className="text-center text-[#7B7B7B] font-mono text-sm">
            No services available yet.
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
