import { geistSans } from "@/lib/utils";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { RedirectButton } from "../RedirectButton";

export default function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* top heading */}
        <div className="mb-14 flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:gap-8 lg:mb-20">
          {/* badge */}
          <RedirectButton text="Founder" IconType={ArrowDownRight} />

          {/* title */}
          <h2
            className={`font-mono text-2xl leading-tight sm:text-[30px] lg:whitespace-nowrap ${geistSans.className}`}
          >
            The <span className="text-[#8A8A8A]">Leadership</span>
          </h2>
        </div>

        {/* content */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16 xl:grid-cols-[1.45fr_0.8fr]">
          {/* LEFT IMAGE CARD */}
          <div className="relative mt-8 min-h-[390px] overflow-hidden rounded-[24px] bg-[#2F2F2F] sm:mt-12 sm:min-h-[360px] md:mt-20 md:min-h-[410px] md:overflow-visible">
            {/* founder image */}
            <Image
              src="/images/co-founder.png"
              alt="Founder"
              width={487}
              height={459}
              className="absolute bottom-0 right-[-44px] z-10 h-[92%] w-auto object-contain sm:right-[-18px] sm:h-[122%] md:right-[-8px] md:h-[128%]"
              priority
            />

            {/* overlay text */}
            <div className="absolute inset-x-5 bottom-6 z-20 sm:inset-x-auto sm:bottom-8 md:bottom-10 md:left-12">
              <h3 className="max-w-56 text-2xl font-medium leading-tight sm:max-w-none sm:text-[28px] sm:leading-none md:text-[40px]">
                <span className="text-[#E4CC72]">Founder’s</span>{" "}
                <span className="text-white underline">Message</span>
              </h3>

              {/* name pill */}
              <div className="mt-6 flex w-fit max-w-[calc(100vw-4rem)] items-center gap-3 rounded-full border border-[#666] bg-[#5D5D5D]/80 px-3 py-2 backdrop-blur-sm sm:px-4">
                {/* avatar */}
                <Image
                  src="/founder-pic.png"
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />

                <span className="truncate text-base text-[#E4CC72] sm:text-xl md:text-2xl">
                  Eng. Bisa Hubert
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h3 className="font-mono text-[34px] text-[#3B3B3B] md:text-[48px]">
              Founder’ <span className="text-[#8A8A8A]">Message</span>
            </h3>

            <div className="mt-9 max-w-xl space-y-7 text-[16px] leading-relaxed text-[#3F3F3F] md:text-[18px]">
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
