"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/boraland/about-us" },
  { label: "Our Services", href: "/boraland/our-services" },
  { label: "Portfolio", href: "/boraland/portfolio" },
  { label: "Process", href: "/boraland/process" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY.current;

      if (scrollingUp && !visible) {
        setVisible(true);
      } else if (!scrollingUp && currentScrollY > 50 && visible) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 px-4 py-4 backdrop-blur-xl transition-transform duration-300 sm:px-6 lg:px-8 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${roboto.className}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link className="block size-10" href={"/"}>
            <Image
              src={"/logo.svg"}
              alt="Bora-land logo"
              width={40}
              height={40}
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`h-auto cursor-pointer px-4 py-2 text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "rounded-xl bg-[#F3DC8E] text-black"
                  : "text-gray-800 hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CTA Button */}
          <button
            className="group hidden h-auto cursor-pointer items-center gap-1.5 rounded-xl bg-[#2C2C2C] px-5 py-3 text-sm tracking-wide text-[#F3DC8E] transition-opacity hover:opacity-80 sm:inline-flex"
            onClick={() => router.push("/boraland/contact-us")}
          >
            Contact Us Now
            <ArrowUpRight
              size={15}
              className="text-[#8B7355] group-hover:animate-bounce-once"
            />
          </button>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#2C2C2C] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 grid gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm tracking-wide transition-colors ${
                pathname === link.href
                  ? "bg-[#F3DC8E] text-black"
                  : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2C2C2C] px-4 py-3 text-sm tracking-wide text-[#F3DC8E]"
            onClick={() => {
              setMenuOpen(false);
              router.push("/boraland/contact-us");
            }}
          >
            Contact Us Now
            <ArrowUpRight size={15} className="text-[#8B7355]" />
          </button>
        </div>
      )}
    </nav>
  );
}
