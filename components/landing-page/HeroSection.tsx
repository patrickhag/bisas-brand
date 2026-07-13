"use client";

import { geistSans } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative -mt-px flex min-h-[calc(100svh-72px)] flex-1 flex-col overflow-hidden bg-white pt-px">
      {/* Headline */}
      <div
        className={`relative z-10 px-5 pb-6 pt-10 text-center sm:px-8 sm:pt-14 lg:pt-16 ${geistSans.className}`}
      >
        <h1 className="text-4xl leading-[1.05] tracking-tight min-[390px]:text-[42px] sm:text-6xl lg:text-7xl">
          <span className="text-[#8A8A8A] font-light">Your Property In </span>
          <span className="text-[#2C2C2C] font-bold">Rwanda</span>
        </h1>
        <h2 className="mx-auto mt-3 max-w-3xl text-xl tracking-tight text-[#2C2C2C] sm:text-2xl md:text-3xl">
          <span className="font-bold">Protected</span>{" "}
          <span className="text-[#8A8A8A]">
            By Engineers Who Are Actually There.
          </span>
        </h2>
      </div>

      {/* Hero background cover photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-background-cover-photo.jpg"
          alt="Boraland hero background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* Construction site image behind the headline */}
      <div className="absolute bottom-0 left-1/2 z-[5] h-[68%] w-[94%] max-w-5xl -translate-x-1/2 sm:h-3/4 sm:w-[90%]">
        <Image
          src="/images/main-background.png"
          fill
          className="rounded-t-2xl object-cover object-center"
          alt="Bola land main background-image"
          priority
        />
      </div>

      {/* Construction Image with floating overlay */}
      <div className="z-10 mx-0 flex-1">
        {/* Bottom bar with floating elements */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-end px-3 sm:bottom-6 sm:px-8 lg:px-10 mb-3">
          {/* Scroll arrow */}
          <button
            aria-label="Scroll to the next section"
            className="absolute left-1/2 flex size-11 -translate-x-1/2 animate-bounce items-center justify-center rounded-full border border-[#e2b82d] backdrop-blur-xl transition-colors sm:size-12"
          >
            <ArrowDown size={20} className="text-[#e2b82d] font-extrabold" />
          </button>
        </div>
      </div>
    </section>
  );
}
