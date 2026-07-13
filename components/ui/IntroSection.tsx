import { geistSans } from "@/lib/utils";
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
    <section className="bg-white px-5 py-12 sm:px-8 md:px-16 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className={`text-center ${geistSans.className}`}>
          <h1 className="leading-none">
            <span className="text-[42px] font-semibold text-[#2B2B2B] sm:text-[56px] md:text-[84px]">
              {titlePrefix}
            </span>

            <span className="text-[42px] text-[#8A8A8A] sm:text-[56px] md:text-[84px]">
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
                  ? "mt-6 text-base leading-relaxed text-[#222] md:text-[21px]"
                  : "text-base leading-relaxed text-[#222] md:text-[21px]"
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
