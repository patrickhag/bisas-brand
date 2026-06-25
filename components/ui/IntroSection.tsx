import { ArrowUpRight } from "lucide-react";

type IntroSectionProps = {
  titlePrefix: string;
  titleHighlight: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref?: string;
};

export default function IntroSection({
  titlePrefix,
  titleHighlight,
  paragraphs,
  ctaLabel,
  ctaHref = "#",
}: IntroSectionProps) {
  return (
    <section className="bg-white px-8 py-16 md:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1>
            <span className="text-[64px] md:text-[84px] font-semibold text-[#2B2B2B]">
              {titlePrefix}
            </span>

            <span className="text-[64px] md:text-[84px] text-[#2C2C2C]">
              {titleHighlight}
            </span>
          </h1>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className={
                index > 0
                  ? "mt-6 text-[18px] md:text-[21px] leading-relaxed text-[#222]"
                  : "text-[18px] md:text-[21px] leading-relaxed text-[#222]"
              }
            >
              {text}
            </p>
          ))}
        </div>

        {/* divider */}
        <div className="mt-14 flex justify-center">
          <div className="h-px w-full max-w-3xl bg-[#DADADA]" />
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href={ctaHref}
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
      </div>
    </section>
  );
}
