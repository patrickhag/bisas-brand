"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "About Us", href: "/boraland/about-us" },
  { label: "Our Services", href: "/boraland/our-services" },
  { label: "Portfolio", href: "/boraland/portfolio" },
  { label: "Process", href: "/boraland/process" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-8 py-5 z-10 relative bg-white">
      {/* Logo */}
      <div className="flex items-center">
        <Link className="w-10 h-10" href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="Bora-land logo"
            width={"400"}
            height={"400"}
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm tracking-wide h-auto px-4 py-2 cursor-pointer transition-colors ${
              pathname === link.href
                ? "bg-[#F3DC8E] rounded-xl text-black"
                : "text-gray-800 hover:text-gray-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA Button */}
      <button
        className="group text-sm tracking-wide px-5 py-3 h-auto rounded-xl bg-[#2C2C2C] text-[#F3DC8E] cursor-pointer inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity"
        onClick={() => router.push("/boraland/contact-us")}
      >
        Contact Us Now
        <ArrowUpRight
          size={15}
          className="text-[#8B7355] group-hover:animate-bounce-once"
        />
      </button>
    </nav>
  );
}
