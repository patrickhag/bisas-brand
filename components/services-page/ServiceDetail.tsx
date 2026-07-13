import { geistSans } from "@/lib/utils";
import { MoveRight, Minus } from "lucide-react";

export default function ServiceDetailSection() {
  return (
    <section
      id="client-representation"
      className="scroll-mt-24 bg-[#2B2B2B] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col items-center">
          {/* Service pill */}
          <div className="mb-8 flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#2B2B2B]">
            <MoveRight size={16} />
            <span>1st Service</span>
          </div>

          {/* Main heading + description */}
          <div className="max-w-3xl text-center">
            <h2
              className={`font-mono text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap ${geistSans.className}`}
            >
              <span className="text-white">Client</span>{" "}
              <span className="text-[#E4CC72]">Representation</span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#ECECEC]">
              While you are in Kigali, London, Dallas, or Dubai, we are at your
              site. We coordinate contractors, verify every payment, and make
              sure the work meets your standards. You receive regular reports.
              Your interests are never left unrepresented.
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="mt-14 h-px w-full bg-[#555555]" />

        {/* Scope Includes */}
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-12">
          {/* Left */}
          <div className="flex items-start gap-6">
            <Minus
              size={32}
              strokeWidth={3}
              className="mt-2 shrink-0 text-white md:size-10"
            />

            <h3
              className={`font-mono text-[26px] text-white md:text-[32px] ${geistSans.className}`}
            >
              Scope Includes
            </h3>
          </div>

          {/* Right */}
          <div>
            <ul className="space-y-2 text-base text-white md:text-[18px]">
              <li>• Contractor coordination</li>
              <li>• Quality control and supervision</li>
              <li>• Cost verification and tracking</li>
              <li>• Progress reporting</li>
              <li>• Risk identification and resolution</li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-[#555555]" />

        {/* Ideal For */}
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:gap-12">
          {/* Left */}
          <div className="flex items-start gap-6">
            <Minus
              size={32}
              strokeWidth={3}
              className="mt-2 shrink-0 text-white md:size-10"
            />

            <h3
              className={`font-mono text-[26px] text-white md:text-[32px] ${geistSans.className}`}
            >
              Ideal For
            </h3>
          </div>

          {/* Right */}
          <div>
            <ul className="space-y-2 text-base text-white md:text-[18px]">
              <li>• Diaspora clients</li>
              <li>• Executives and investors</li>
              <li>• Owners seeking peace of mind</li>
            </ul>
          </div>
        </div>

        {/* bottom divider */}
        <div className="h-px w-full bg-[#555555]" />
      </div>
    </section>
  );
}
