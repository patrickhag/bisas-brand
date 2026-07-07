"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const glassBadgeClass =
    "flex items-center justify-center gap-3 h-12 rounded-full border border-white/15 bg-black/45 px-4 shadow-2xl shadow-black/25 backdrop-blur-2xl ring-1 ring-white/10 transition-colors hover:bg-black/60 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.2),0_18px_40px_rgba(0,0,0,0.25)]";

  return (
    <section className="flex-1 flex flex-col relative overflow-hidden min-h-[calc(100vh-80px)]">
      {/* Headline */}
      <div className="text-center pt-16 pb-6 px-8 relative z-10">
        <h1 className="text-6xl md:text-7xl leading-tight tracking-tight">
          <span className="text-gray-500 font-light">Your Property In </span>
          <span className="text-[#2C2C2C] font-bold">Rwanda</span>
        </h1>
        <h2 className="mt-3 text-2xl md:text-3xl tracking-tight text-gray-500">
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
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[90%] max-w-5xl h-3/4 z-0">
          <Image
            src="/images/main-background.png"
            fill
            className="object-cover rounded-t-2xl"
            alt="Bola land main background-image"
            priority
          />
        </div>

        {/* Bottom bar with floating elements */}
        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-10 z-20">
          {/* Engineer badge */}
          <button className={glassBadgeClass}>
            <Image
              src={"/eclipse-image.png"}
              width={30}
              height={30}
              alt="Alt image"
              className="rounded-full bg-[#F3DC8E] text-transparent"
            />
            <span className="text-[#F3DC8E] text-sm font-bold">
              Eng. Bisa Hubert
            </span>
          </button>

          {/* Scroll arrow */}
          <button className="flex justify-center items-center w-12 h-12 backdrop-blur-xl border border-[#e2b82d] rounded-full transition-colors animate-bounce">
            <ArrowDown size={20} className="text-[#e2b82d] font-extrabold" />
          </button>
          {/* Portfolio badge */}
          <button className={glassBadgeClass}>
            <span className="text-[#F3DC8E] text-sm font-bold">Portfolio</span>
            <ArrowUpRight size={15} className="text-[#e2b82d]" />
          </button>
        </div>
      </div>
    </section>
  );
}
