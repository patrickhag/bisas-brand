import { geistSans } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative -mt-px flex min-h-[calc(100svh-72px)] flex-1 flex-col overflow-hidden bg-white pt-px">
      {/* Headline */}
      <div
        className={`absolute inset-x-0 top-36 z-10 px-5 pb-6 text-center font-[family-name:var(--font-roboto)] sm:top-40 sm:px-8 md:relative md:top-auto md:pt-14 md:font-[family-name:var(--font-geist-sans)] lg:pt-16 ${geistSans.variable}`}
      >
        <h1 className="text-[1.75rem] leading-[1.05] tracking-tight md:text-4xl lg:text-7xl">
          <span className="text-[#8A8A8A] font-light">Your Property In </span>
          <span className="text-[#2C2C2C] font-bold">Rwanda</span>
        </h1>
        <h2 className="mx-auto mt-2 max-w-[92vw] text-[clamp(1.05rem,4.25vw,1.2rem)] leading-snug tracking-tight text-[#2C2C2C] sm:mt-3 sm:max-w-4xl sm:text-3xl md:text-3xl">
          <span className="font-bold">Protected</span>{" "}
          <span className="text-[#8A8A8A]">
            By Engineers Who Are Actually There.
          </span>
        </h2>
      </div>

      {/* Construction site image behind the headline */}
      <div className="absolute bottom-0 left-1/2 z-5 h-[88%] w-[128%] max-w-none -translate-x-1/2 px-0 sm:h-[84%] sm:w-full sm:max-w-6xl sm:px-8">
        <div className="animate-hero-main-bg-float absolute inset-0">
          <Image
            src="/images/main-background-cutout.png"
            fill
            sizes="(min-width: 1280px) 1100px, (min-width: 640px) 100vw, 128vw"
            className="animate-hero-main-bg-enter object-contain object-bottom opacity-95 drop-shadow-[0_34px_42px_rgba(65,65,65,0.18)]"
            alt="Bola land main background-image"
            priority
          />
        </div>
      </div>

      {/* Hero cover photo overlay */}
      <div className="absolute inset-0 z-6 opacity-45 mix-blend-multiply">
        <Image
          src="/images/main-background-cover-photo.jpg"
          alt="Boraland hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Construction Image with floating overlay */}
      <div className="z-10 mx-0 flex-1">
        {/* Bottom bar with floating elements */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-end px-3 sm:bottom-6 sm:px-8 lg:px-10 mb-3">
          {/* Scroll arrow */}
          <a
            href="#who-we-are"
            aria-label="Scroll to the next section"
            className="absolute left-1/2 flex size-11 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-[#e2b82d] backdrop-blur-xl transition-colors sm:size-12"
          >
            <ArrowDown size={20} className="text-[#e2b82d] font-extrabold" />
          </a>
        </div>
      </div>
    </section>
  );
}
