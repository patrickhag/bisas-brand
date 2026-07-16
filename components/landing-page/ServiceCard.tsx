import { ArrowDownRight } from "lucide-react";
import { RedirectButton } from "../RedirectButton";
import { geistSans } from "@/lib/utils";
import { getServices } from "@/app/actions/services";
import ServiceOverviewCard from "./ServiceOverviewCard";

export default async function ServicesSection() {
  const services = await getServices();

  return (
    <section
      id="services-overview"
      className="min-h-screen bg-[#ECECEC] px-5 py-16 sm:px-6 lg:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top heading */}
        <div className="mb-14 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8 lg:mb-20">
          <RedirectButton
            text={"Services Overview"}
            IconType={ArrowDownRight}
          />

          <div className={`text-center md:text-left ${geistSans.className}`}>
            <h2 className="text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap">
              Explore Works
              {/* className={`text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap ${geistSans.className}`} */}
            </h2>

            <h2 className="text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap text-[#7B7B7B]">
              Our Services
            </h2>
          </div>
        </div>

        {/* Cards */}

        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {services.map((service, index) => (
            <ServiceOverviewCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
