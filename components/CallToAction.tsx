import { ArrowUpRight } from "lucide-react";

export const CallToButton = ({
  ctaHref,
  ctaLabel,
}: {
  ctaHref?: string;
  ctaLabel: string;
}) => {
  return (
    <div className="mt-10 flex justify-center">
      <a
        href={ctaHref ?? "/boraland/request-consultation"}
        className="group flex overflow-hidden rounded-full border border-[#E4CC72] cursor-pointer no-underline"
      >
        <div className="bg-[#E4CC72] px-10 py-5 text-lg text-[#2B2B2B]">
          {ctaLabel}
        </div>

        <div className="flex items-center justify-center bg-[#2B2B2B] px-8 text-[#E4CC72]">
          <ArrowUpRight
            size={20}
            className="text-[#8B7355] group-hover:animate-bounce-once"
          />
        </div>
      </a>
    </div>
  );
};
