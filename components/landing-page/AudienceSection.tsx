"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { RequestConsultationModal } from "@/components/request-consultation/RequestConsultationModal";
import { RedirectButton } from "../RedirectButton";

const audiences = [
  {
    title: "Diaspora Property Owners",
    image: "/images/person-1.png",
  },
  {
    title: "Executives And Professionals",
    image: "/images/person-2.png",
  },
  {
    title: "Real Estate Investors",
    image: "/images/person-3.png",
  },
  {
    title: "Serious Clients With Defined Budgets",
    image: "/images/person-4.png",
  },
];

type TAudience = {
  title: string;
  image: string;
};

function AudienceCard({ item }: { item: TAudience }) {
  return (
    <div className="relative h-[300px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-linear-to-b from-[#4a4a4a] to-[#1a1a1a] sm:h-82.5">
      {/* image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* content */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-[#E6CF7A] text-[20px] leading-tight font-medium">
          {item.title}
        </h3>

        <div className="mt-4 w-full h-0.5 bg-white/80 rounded-full" />
      </div>
    </div>
  );
}

export default function AudienceSection() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <section
        id="who-we-work-with"
        className="relative min-h-screen overflow-hidden bg-[#2B2B2B] px-5 py-16 sm:px-8 lg:py-20"
      >
        {/* Background watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-[0.05]"
        >
          <img
            src="/images/bisas-audience-watermark.png"
            alt=""
            className="w-[min(175px,70vw)] sm:w-175"
          />
        </div>

        {/* content wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* top section */}
          <div className="flex flex-col items-center">
            {/* badge */}
            <RedirectButton text="Expertise" IconType={ArrowDownRight} />

            {/* heading */}
            <div className="mt-8 text-center">
              <h2 className="font-mono text-[38px] leading-none text-white sm:text-[54px]">
                Who Do We
              </h2>

              <h2 className="font-mono text-[38px] leading-none text-[#9B9B9B] sm:text-[54px]">
                Work With?
              </h2>
            </div>
          </div>

          {/* cards */}
          <div className="mt-14 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:mt-20 xl:grid-cols-4">
            {audiences.map((item, index) => (
              <AudienceCard key={index} item={item} />
            ))}
          </div>

          {/* bottom text */}
          <div className="mt-20 flex flex-col items-center">
            <h3 className="font-mono text-center text-[34px] leading-tight text-[#BDBDBD] sm:text-[48px] lg:text-[56px]">
              Serious Projects Begin With Clarity.
            </h3>

            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="group mt-10 flex cursor-pointer items-center gap-3 rounded-2xl bg-[#D9C36F] px-6 py-4 text-base text-[#2B2B2B] sm:gap-4 sm:px-10 sm:py-5 sm:text-lg"
            >
              Book a Private Strategy Call
              <ArrowUpRight
                size={15}
                className="group-hover:animate-bounce-once"
              />
            </button>
          </div>
        </div>
      </section>

      <RequestConsultationModal
        open={isConsultationOpen}
        onOpenChange={setIsConsultationOpen}
      />
    </>
  );
}
