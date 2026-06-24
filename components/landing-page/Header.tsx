"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("About Us");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 z-10 relative">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10">
            <Image
              src={"/logo.svg"}
              alt="Bora-land logo"
              width={"400"}
              height={"400"}
            />
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setActiveLink(link.label)}
              className={`text-sm tracking-wide h-auto px-4 py-2 cursor-pointer transition-colors ${
                activeLink === link.label
                  ? "bg-[#F3DC8E] rounded-xl text-black"
                  : "text-gray-800 hover:text-gray-900"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button className="group text-sm tracking-wide px-5 py-3 h-auto rounded-xl bg-[#2C2C2C] text-[#F3DC8E] cursor-pointer inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
          Contact Us Now
          <ArrowUpRight
            size={15}
            className="text-[#8B7355] group-hover:animate-bounce-once"
          />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
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
        <div className="relative flex-1 mx-0">
          {/* Gradient top fade */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-white to-transparent z-10 pointer-events-none" />

          {/* Construction site image (bottom layer) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/main-background-image.jpg"
              fill
              className="object-cover"
              alt="Bola land main background-image"
              priority
            />
          </div>

          {/* Bottom bar with floating elements */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-between px-10 z-20">
            {/* Engineer badge */}
            <Button className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 h-auto hover:bg-white/20 shadow-2xl shadow-black/10 transition-all duration-300">
              <Avatar className="size-8">
                <AvatarFallback className="bg-[#8B7355] text-transparent">
                  <Image
                    src={"/eclipse-image.png"}
                    width={30}
                    height={30}
                    alt="Alt image"
                  />
                </AvatarFallback>
              </Avatar>
              <span className="text-[#F3DC8E] text-sm font-bold">
                Eng. Bisa Hubert
              </span>
            </Button>

            {/* Scroll arrow */}
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-[#F3DC8E] backdrop-blur-sm bg-white transition-colors animate-bounce"
            >
              <ArrowDown size={20} className="text-[#F3DC8E] font-bold" />
            </Button>
            {/* Portfolio badge */}
            <Button className="flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 h-auto hover:bg-white/20 shadow-2xl shadow-black/10 transition-all duration-300">
              <span className="text-[#F3DC8E] text-sm font-bold">
                Portfolio
              </span>
              <ArrowUpRight size={15} className="text-[#8B7355]" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
