import { geistSans } from "@/lib/utils";
import { ArrowDownRight } from "lucide-react";

export function ProjectHeader() {
  return (
    <div className="bg-[#F9F9F9] px-5 py-8 sm:px-8 lg:px-18 lg:py-10">
      <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-3">
        {/* left badge */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 text-sm font-medium text-[#2B2B2B]">
            <span>Our Portfolio</span>
            <ArrowDownRight size={15} />
          </div>
        </div>

        {/* center title */}
        <div>
          <h2
            className={`text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap ${geistSans.className}`}
          >
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
