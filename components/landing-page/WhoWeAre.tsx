import { ArrowDown, ArrowDownRight } from "lucide-react";
import { RedirectButton } from "../RedirectButton";
import { geistSans } from "@/lib/utils";
import Link from "next/link";

export default function whoWeAreSection() {
  return (
    <section
      id="who-we-are"
      className="relative isolate min-h-screen bg-[#2C2C2C] overflow-hidden flex items-center justify-center px-6"
    >
      {/* Background watermark */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(/images/bisas-watermark-bg.png)",
          backgroundSize: "min(82vw, 980px) auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top button */}
        <div className="-mt-6 sm:-mt-8">
          <RedirectButton text="What we do" IconType={ArrowDownRight} />
        </div>
        <div className={`${geistSans.className} mt-5`}>
          {/* Main heading */}
          <h2 className="max-w-4xl text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap text-white">
            We Represent Property Owners,
            <br />
            <span className="text-gray-300">We Protect Investments.</span>
          </h2>
        </div>

        {/* Paragraph 1 */}
        <p className="mt-14 max-w-4xl text-base leading-relaxed text-gray-300 md:text-lg">
          You have invested in land, in a dream, in Rwanda’s future. But you are
          not there every day.{" "}
          <span className="whitespace-nowrap font-semibold text-[#D8C07A]">
            We are.
          </span>
        </p>

        {/* Paragraph 2 */}
        <p className="mt-10 text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl">
          Boraland is your professional representative on the ground. We manage
          contractors, control costs, enforce quality, and report to you at
          every stage. No surprises. No shortcuts. Just your project, done
          right.
        </p>

        {/* Paragraph 3 */}
        <p className="mt-10 text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl">
          Our role is to make construction{" "}
          <span className="font-semibold text-[#D8C07A]">
            predictable, transparent, and professionally managed,
          </span>{" "}
          especially for clients who cannot be present full-time.
        </p>
      </div>

      {/* Bottom arrow */}
      <Link
        href="#services-overview"
        aria-label="Scroll to services overview"
        className="absolute bottom-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-[#D8C07A] text-[#D8C07A] backdrop-blur-xl transition hover:bg-[#D8C07A]/10 sm:bottom-8"
      >
        <ArrowDown />
      </Link>
    </section>
  );
}
