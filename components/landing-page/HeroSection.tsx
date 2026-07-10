"use client";

import { geistSans } from "@/lib/utils";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const glassBadgeClass =
    "flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 shadow-2xl shadow-black/25 backdrop-blur-2xl ring-1 ring-white/10 transition-colors hover:bg-black/60 sm:min-h-12 sm:gap-3 sm:px-4 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2),0_18px_40px_rgba(0,0,0,0.25)] cursor-pointer";

  return (
    <section className="relative flex min-h-[calc(100svh-72px)] flex-1 flex-col overflow-hidden">
      {/* Headline */}
      <div
        className={`relative z-10 px-5 pb-6 pt-10 text-center sm:px-8 sm:pt-14 lg:pt-16 ${geistSans.className}`}
      >
        <h1 className="text-[42px] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="text-gray-500 font-light">Your Property In </span>
          <span className="text-[#2C2C2C] font-bold">Rwanda</span>
        </h1>
        <h2 className="mx-auto mt-3 max-w-3xl text-xl tracking-tight text-gray-500 sm:text-2xl md:text-3xl">
          <span className="text-gray-800 font-bold">Protected</span>{" "}
          <span className="font-normal">
            By Engineers Who Are Actually There.
          </span>
        </h2>
      </div>

      {/* Construction Image with gradient overlay */}
      <div
        className="relative flex-1 mx-0"
        style={{
          background:
            "linear-gradient(to bottom, #f4f4f4 0%, #c8c8c8 45%, #b5b5b5 72%, transparent 100%)",
        }}
      >
        {/* Construction site image (bottom layer) */}
        <div className="absolute bottom-0 left-1/2 z-0 h-[68%] w-[94%] max-w-5xl -translate-x-1/2 sm:h-3/4 sm:w-[90%]">
          <Image
            src="/images/main-background.png"
            fill
            className="object-cover rounded-t-2xl"
            alt="Bola land main background-image"
            priority
          />
        </div>

        {/* Bottom bar with floating elements */}
        <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-between gap-3 px-4 sm:bottom-6 sm:px-8 lg:px-10">
          {/* Engineer badge */}
          <button className={glassBadgeClass}>
            <Image
              src={"/images/co-founder.png"}
              width={28}
              height={28}
              alt="Alt image"
              className="rounded-full bg-[#F3DC8E] text-transparent"
            />
            <span className="text-xs font-bold text-[#F3DC8E] sm:text-sm">
              Eng. Bisa Hubert
            </span>
          </button>

          {/* Scroll arrow */}
          <button className="flex size-11 shrink-0 animate-bounce items-center justify-center rounded-full border border-[#e2b82d] backdrop-blur-xl transition-colors sm:size-12">
            <ArrowDown size={20} className="text-[#e2b82d] font-extrabold" />
          </button>
          {/* Portfolio badge */}
          <Link href={"/boraland/portfolio"}>
            <button className={glassBadgeClass}>
              <span className="text-xs font-bold text-[#F3DC8E] sm:text-sm">
                Portfolio
              </span>
              <ArrowUpRight size={15} className="text-[#e2b82d]" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
