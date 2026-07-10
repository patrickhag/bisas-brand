import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { RedirectButton } from "../RedirectButton";

const reasons = [
  {
    text: "Every decision is made by a qualified engineer, not a sales rep.",
    muted: false,
  },
  {
    text: "You get weekly photo and cost reports. No chasing for updates.",
    muted: true,
  },
  {
    text: "One person is responsible. You always know who to call.",
    muted: false,
  },
  {
    text: "We have managed projects for clients in Europe, North America, and the Gulf.",
    muted: true,
  },
  {
    text: "We do not cut corners. We document everything.",
    muted: false,
  },
];

export default function WhyClientsChooseSection() {
  return (
    <section
      id="why-choose-us"
      className="bg-white px-6 py-16 md:px-10 lg:py-20"
    >
      <div className="mx-auto max-w-7xl border-b border-[#E1E1E1] pb-12">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
          <RedirectButton text="WHY BORALAND" IconType={ArrowDownRight} />

          <h2 className="text-center font-mono text-[34px] leading-none text-[#2B2B2B] md:text-[42px]">
            Why Clients <span className="text-[#777777]">Choose Boraland</span>
          </h2>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="relative min-h-[360px] md:min-h-[390px]">
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-[#292929]" />

            <Image
              src="/images/bamboo-tree-house.png"
              alt="Bamboo tree house"
              width={627}
              height={489}
              className="absolute -right-10 -top-12 z-10 w-[86%] max-w-none object-contain md:-right-16 md:-top-16 md:w-[92%]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={false}
            />

            <div className="absolute inset-0 z-20 overflow-hidden rounded-xl bg-gradient-to-r from-black/80 via-black/45 to-black/5" />

            <div className="absolute bottom-8 left-8 z-30 max-w-[440px] md:left-14">
              <h3 className="text-[28px] font-semibold leading-tight text-white md:text-[32px]">
                <span className="text-[#F2D879]">Just Talk to Us & </span>
                <span className="underline decoration-white decoration-2 underline-offset-4">
                  Track Your Project,
                </span>{" "}
                <span className="text-[#F2D879]">In-Real-Time</span>{" "}
                <span className="underline decoration-white decoration-2 underline-offset-4">
                  From Experts.
                </span>
              </h3>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#3B392B]/90 py-2 pl-2 pr-4 text-xs font-medium text-white backdrop-blur-md">
                <span className="flex size-10 items-center justify-center rounded-full bg-white">
                  <Image
                    src="/logo.svg"
                    alt="Boraland logo"
                    width={28}
                    height={28}
                  />
                </span>
                Boraland
              </div>
            </div>
          </div>

          <div className="border-y border-[#DDDDDD] py-4">
            <ul className="space-y-9">
              {reasons.map((reason) => (
                <li
                  key={reason.text}
                  className="grid grid-cols-[26px_1fr] gap-7"
                >
                  <span
                    className={`mt-2 h-1.5 w-6 ${
                      reason.muted ? "bg-[#777777]" : "bg-[#2B2B2B]"
                    }`}
                  />
                  <p
                    className={`max-w-[430px] text-[22px] font-semibold leading-[0.95] ${
                      reason.muted ? "text-[#777777]" : "text-[#2B2B2B]"
                    }`}
                  >
                    {reason.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
