import { ArrowUpRight } from "lucide-react";

export function ProjectHeader() {
  return (
    <div className="bg-[#F9F9F9] px-18 py-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
        {/* left badge */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 text-sm font-medium text-[#2B2B2B]">
            <span>Our Portfolio</span>
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* center title */}
        <div>
          <h2 className="font-mono text-[30px] whitespace-nowrap">
            <span className="text-[#2C2C2C] font-bold">Client </span>{" "}
            <span className="text-[#E4CC72]">Representation</span>
          </h2>
        </div>

        {/* description */}
        <div>
          <p className="text-sm leading-relaxed text-[#2C2C2C]">
            We act as your professional representative on the ground, managing
            construction on your behalf and safeguarding your interests at every
            stage.
          </p>
        </div>
      </div>
    </div>
  );
}
