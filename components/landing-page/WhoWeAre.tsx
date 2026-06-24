import { ArrowDown } from "lucide-react";

export default function whoWeAreSection() {
  return (
    <section className="relative min-h-screen bg-[#262626] overflow-hidden flex items-center justify-center px-6">
      {/* Background watermark */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/images/bora-land-watermark.png)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
        }}
      /> */}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top button */}
        <button className="mb-10 px-7 py-3 rounded-full bg-[#D8C07A] text-black text-sm tracking-wide font-medium uppercase flex items-center gap-2 hover:opacity-90 transition">
          What We Do
          <span>↗</span>
        </button>

        {/* Main heading */}
        <h1 className="font-mono text-white text-4xl md:text-6xl leading-tight max-w-4xl">
          We Represent Property Owners,
          <br />
          <span className="text-gray-300">We Protect Investments.</span>
        </h1>

        {/* Paragraph 1 */}
        <p className="mt-14 text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
          You have invested in land, in a dream, in Rwanda’s future. But you are
          not there every day.
          <span className="font-semibold text-[#D8C07A]"> We are.</span>
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

        {/* Bottom arrow */}
        <button className="mt-16 w-14 h-14 rounded-full border border-[#D8C07A] flex items-center justify-center text-[#D8C07A] hover:bg-[#D8C07A]/10 transition animate-bounce">
          <ArrowDown />
        </button>
      </div>
    </section>
  );
}
