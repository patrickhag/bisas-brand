import { MoveRight, Minus } from "lucide-react";

export default function SecondServiceSection() {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* TOP SECTION */}
        <div className="flex flex-col items-center">
          {/* badge */}
          <div className="mb-8 flex items-center gap-2 rounded-full bg-[#3A3A3A] px-6 py-3 text-sm font-medium text-white">
            <MoveRight size={15} />
            <span>2nd Service</span>
          </div>

          {/* heading */}
          <div className="text-center">
            <h2 className="text-[42px] leading-tight md:text-[56px]">
              <span className="block text-[#2C2C2C]">Pre-Construction</span>

              <span className="text-[#2C2C2C]">Advisory </span>

              <span className="text-[#FED95C]">& Feasibility</span>
            </h2>

            {/* description */}
            <p className="mx-auto mt-6 max-w-3xl text-[16px] leading-relaxed text-[#2C2C2C]">
              Before any commitment is made, we assess your budget, review
              feasibility, and map out a construction strategy. You make
              decisions with full information, not assumptions.
            </p>
          </div>
        </div>

        {/* divider */}
        <div className="mt-14 h-px w-full bg-[#555555]" />

        {/* INCLUDES SECTION */}
        <div className="grid grid-cols-1 gap-12 py-10 md:grid-cols-2">
          {/* left */}
          <div className="flex items-start gap-6">
            <Minus size={40} strokeWidth={3} className="mt-2 text-white" />

            <h3 className="text-[32px] text-[#2C2C2C] font-semibold">
              Includes
            </h3>
          </div>

          {/* right */}
          <div>
            <ul className="space-y-2 text-[18px] text-[#2C2C2C]">
              <li>• Budget realism assessment</li>
              <li>• Technical feasibility review</li>
              <li>• Construction strategy</li>
              <li>• Risk and cost exposure analysis</li>
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-[#555555]" />

        {/* CTA */}
        <div className="flex justify-center py-8">
          <button className="flex items-center overflow-hidden rounded-full border border-[#555] bg-[#3A3A3A]">
            {/* left */}
            <span className="px-8 py-4 text-[16px] text-white">
              All projects begin with this step
            </span>

            {/* right circle */}
            <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#4A4A4A]">
              <MoveRight size={16} className="text-white" />
            </div>
          </button>
        </div>

        {/* bottom divider */}
        <div className="h-px w-full bg-[#555555]" />
      </div>
    </section>
  );
}
