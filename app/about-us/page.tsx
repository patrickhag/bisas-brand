function FounderSection() {
  return (
    <section className="relative bg-[#2B2B2B] px-8 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* top heading */}
        <div className="flex justify-center items-center gap-8 mb-20">
          {/* badge */}
          <button className="flex items-center gap-2 rounded-full bg-[#E4CC72] px-8 py-4 text-[#2B2B2B]">
            Founder
            <span>↗</span>
          </button>

          {/* title */}
          <h2 className="font-mono text-[56px] text-[#3B3B3B]">
            The Leadership
          </h2>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT IMAGE CARD */}
          <div className="relative rounded-[24px] bg-[#343434] min-h-[480px] overflow-hidden">
            {/* founder image */}
            <img
              src="/founder.png"
              alt="Founder"
              className="absolute bottom-0 right-0 h-[110%] object-contain"
            />

            {/* overlay text */}
            <div className="absolute bottom-12 left-12">
              <h3 className="text-[48px] font-medium leading-none">
                <span className="text-[#E4CC72]">Founder’</span>{" "}
                <span className="text-white underline">Message</span>
              </h3>

              {/* name pill */}
              <div className="mt-8 flex items-center gap-3 rounded-full border border-[#666] bg-[#454545]/80 px-4 py-2 w-fit">
                {/* avatar */}
                <img
                  src="/founder.png"
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />

                <span className="text-[#E4CC72] text-2xl">
                  Eng. Bisa Hubert
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h3 className="text-[56px] font-mono text-[#3B3B3B]">
              Founder’ Message
            </h3>

            <div className="mt-10 space-y-8 text-[#6D6D6D] text-[22px] leading-relaxed">
              <p>
                Boraland is led by a civil engineer and project manager with
                over six years of experience in construction supervision,
                project delivery, and client representation.
              </p>

              <p>
                As Principal Engineer, the role is to protect client investments
                by enforcing quality standards, managing risk, and coordinating
                all technical and contractual aspects of construction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutIntroSection() {
  return (
    <section className="bg-white px-8 py-20 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <div className="flex justify-center">
          <h1 className="text-center">
            <span className="text-[90px] md:text-[120px] font-semibold text-[#2B2B2B] tracking-[-0.04em]">
              About{" "}
            </span>

            <span className="font-mono text-[90px] md:text-[120px] text-[#2B2B2B] tracking-[-0.04em]">
              Boraland
            </span>
          </h1>
        </div>

        {/* text */}
        <div className="mt-10 max-w-5xl">
          <p className="text-[28px] leading-tight font-medium text-[#1F1F1F]">
            Most clients building in Rwanda are not in Rwanda. They are in
            London, in Houston, in Dubai, running businesses and raising
            families while trying to build something back home.
          </p>

          <p className="mt-8 text-[28px] leading-tight font-medium text-[#1F1F1F]">
            Boraland exists for exactly that situation. We are your engineer-led
            representative on the ground, overseeing construction, controlling
            costs, enforcing quality, and making sure nothing moves without your
            knowledge and approval.
          </p>
        </div>

        {/* divider */}
        <div className="mt-14 flex justify-center">
          <div className="h-px w-full max-w-3xl bg-[#DADADA]" />
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button className="flex overflow-hidden rounded-full border border-[#E4CC72]">
            <div className="bg-[#E4CC72] px-10 py-5 text-lg text-[#2B2B2B]">
              Request a Consultation
            </div>

            <div className="flex items-center justify-center bg-[#2B2B2B] px-8 text-[#E4CC72]">
              ↗
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

/* MAIN PAGE */
export default function AboutPage() {
  return (
    <>
      <AboutIntroSection />
      <FounderSection />
    </>
  );
}
