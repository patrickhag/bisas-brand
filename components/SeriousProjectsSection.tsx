import Image from "next/image";

import { CallToButton } from "./CallToAction";

export default function SeriousProjectsSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f2f2f] flex items-center justify-center px-6">
      <Image
        src="/images/bisas-watermark-bg.png"
        alt=""
        aria-hidden="true"
        width={760}
        height={760}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[min(82vw,760px)] -translate-x-1/2 -translate-y-1/2 opacity-10"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">
        <p className="text-gray-100 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto">
          Boraland is an engineer-led construction and project management firm
          based in Rwanda. We act as your professional representative on the
          ground, overseeing every contractor, controlling every cost, and
          enforcing the quality standards your investment deserves. You stay
          informed. We stay accountable.
        </p>

        <h1 className="mt-14 text-4xl md:text-6xl font-semibold tracking-tight text-gray-200">
          Serious Projects Begin With Clarity.
        </h1>

        <CallToButton
          ctaHref="/boraland/request-consultation"
          ctaLabel="Request a Consultation"
        />
      </div>
    </section>
  );
}
