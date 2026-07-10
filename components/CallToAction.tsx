"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { RequestConsultationModal } from "@/components/request-consultation/RequestConsultationModal";

export const CallToButton = ({
  ctaHref,
  ctaLabel,
}: {
  ctaHref?: string;
  ctaLabel: string;
}) => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const opensConsultation =
    !ctaHref || ctaHref === "/boraland/request-consultation";
  const buttonContent = (
    <>
      <div className="bg-[#E4CC72] px-5 py-4 text-sm text-[#2B2B2B] sm:px-10 sm:py-5 sm:text-lg">
        {ctaLabel}
      </div>

      <div className="flex items-center justify-center bg-[#2B2B2B] px-5 text-[#E4CC72] sm:px-8">
        <ArrowUpRight
          size={20}
          className="text-[#8B7355] group-hover:animate-bounce-once"
        />
      </div>
    </>
  );

  return (
    <>
      <div className="mt-10 flex justify-center">
        {opensConsultation ? (
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="group flex max-w-full cursor-pointer overflow-hidden rounded-full border border-[#E4CC72] no-underline"
          >
            {buttonContent}
          </button>
        ) : (
          <a
            href={ctaHref}
            className="group flex max-w-full cursor-pointer overflow-hidden rounded-full border border-[#E4CC72] no-underline"
          >
            {buttonContent}
          </a>
        )}
      </div>

      {opensConsultation && (
        <RequestConsultationModal
          open={isConsultationOpen}
          onOpenChange={setIsConsultationOpen}
        />
      )}
    </>
  );
};
