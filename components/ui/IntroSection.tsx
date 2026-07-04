import { ArrowUpRight } from "lucide-react";
import { CallToButton } from "../CallToAction";

type IntroSectionProps = {
  titlePrefix: string;
  titleHighlight: string;
  paragraphs: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function IntroSection({
  titlePrefix,
  titleHighlight,
  paragraphs,
  ctaLabel,
  ctaHref,
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

        {/* divider & CTA */}
        {ctaLabel && (
          <>
            <div className="mt-14 flex justify-center">
              <div className="h-px w-full max-w-3xl bg-[#DADADA]" />
            </div>

            <CallToButton ctaHref={ctaHref} ctaLabel={ctaLabel} />
          </>
        )}
      </div>
    </section>
  );
}
