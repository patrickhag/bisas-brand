export default function FounderSection() {
  return (
    <section className="relative bg-[#f9f9f9] px-8 py-24 overflow-hidden">
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
          <div className="relative rounded-[24px] bg-[#343434] min-h-120 overflow-hidden">
            {/* founder image */}
            <img
              src="/images/co-founder.png"
              alt="Founder"
              className="absolute bottom-0 right-0 h-[110%] object-contain"
            />

            {/* overlay text */}
            <div className="absolute bottom-12 left-12">
              <h3 className="text-[48px] font-medium leading-none">
                <span className="text-[#E4CC72]">Founder’s</span>{" "}
                <span className="text-white underline">Message</span>
              </h3>

              {/* name pill */}
              <div className="mt-8 flex items-center gap-3 rounded-full border border-[#666] bg-[#454545]/80 px-4 py-2 w-fit">
                {/* avatar */}
                <img
                  src="/images/co-founder.png"
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
              Founder’s Message
            </h3>

            <div className="mt-10 space-y-8 text-[#6D6D6D] text-[18px] md:text-[21px] leading-relaxed">
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
