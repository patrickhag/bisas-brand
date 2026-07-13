"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ServiceItem } from "@/components/inquiries/types";

const cardStyles = [
  { bg: "bg-[#F2F2F2]", featured: false },
  { bg: "bg-[#E8E9D8]", featured: true },
  { bg: "bg-[#DCEBE4]", featured: false },
];

function getServiceSectionId(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ServiceOverviewCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const style = cardStyles[index % cardStyles.length];
  const router = useRouter();
  const [isIconAnimating, setIsIconAnimating] = useState(false);

  const handleServiceClick = () => {
    setIsIconAnimating(true);

    window.setTimeout(() => {
      router.push(
        `/boraland/our-services#${getServiceSectionId(service.name)}`,
      );
    }, 220);
  };

  return (
    <button
      type="button"
      onClick={handleServiceClick}
      className={`group flex w-full max-w-[390px] cursor-pointer flex-col text-left sm:max-w-[330px] ${
        style.featured ? "lg:-translate-y-7.5" : "lg:translate-y-10"
      }`}
    >
      <div
        className={`relative flex aspect-[390/300] w-full items-center justify-center sm:aspect-[330/255] ${style.bg}`}
      >
        <span className="absolute right-5 top-5 flex size-12 items-center justify-center rounded-full bg-[#2D2D2D] text-lg text-[#D9C06E] transition-transform duration-300 group-hover:scale-110 sm:right-4 sm:top-4 sm:size-10">
          <ArrowUpRight
            className={isIconAnimating ? "animate-service-icon-shot" : ""}
          />
        </span>

        {service.image ? (
          <Image
            src={service.image}
            alt={service.name}
            className={`w-[76%] max-w-72 object-contain transition-transform duration-300 ease-out group-hover:scale-110 sm:w-[72%] sm:max-w-60 ${
              isIconAnimating ? "scale-110" : ""
            }`}
            width={288}
            height={188}
          />
        ) : (
          <span className="text-7xl font-bold text-[#2D2D2D]/20 sm:text-6xl">
            {service.name.charAt(0)}
          </span>
        )}
      </div>

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
