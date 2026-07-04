import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { CallToButton } from "./CallToAction";

export default function SeriousProjectsSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#2f2f2f] flex items-center justify-center px-6">
      {/* Background Shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-175 h-175 opacity-10">
          <div className="absolute inset-0 border-40 border-gray-400 rotate-20 skew-y-12" />
          <div className="absolute inset-30 border-30 border-gray-400 rotate-20 skew-y-12" />
        </div>
      </div>

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

        <CallToButton ctaLabel="Request a Consultation" />
      </div>
    </section>
  );
}
