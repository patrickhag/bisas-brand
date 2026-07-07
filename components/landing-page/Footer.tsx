import { Mail, Phone, AtSign } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="px-8 py-12 md:px-16 md:py-20">
      {/* Big floating card */}
      <div className="mx-auto max-w-7xl border border-[#f2f2f2] rounded-[28px] px-10 py-12 md:px-14 md:py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href={"/"}>
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-12 w-12 object-contain"
                />
              </Link>

              <span className="text-xl font-semibold text-[#2B2B2B]">
                BORALAND
              </span>
            </div>

            <p className="max-w-sm text-[17px] leading-relaxed text-[#555]">
              Boraland is your eyes, your voice, and your standard on every
              project, every step of the way.
            </p>

            {/* Subscribe */}
            <div className="pt-12">
              <div className="flex w-full max-w-105  items-center rounded-full border border-[#D8D2BF] bg-[#E8E5DB] p-1">
                <div className="flex flex-1 items-center gap-3 px-4">
                  <Mail className="h-5 w-5 text-[#444]" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-transparent outline-none placeholder:text-[#555]"
                  />
                </div>

                <button className="rounded-full bg-[#2B2B2B] px-6 py-3 text-[#E5CC74] transition hover:opacity-90">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="md:pl-20">
            <h3 className="mb-6 text-xl font-semibold text-[#2B2B2B]">
              Company
            </h3>

            <div className="space-y-5 text-lg text-[#333]">
              <a href="#" className="block hover:opacity-70">
                Service Overview
              </a>

              <a href="#" className="block hover:opacity-70">
                Why Choose Us?
              </a>

              <a href="#" className="block hover:opacity-70">
                Who We Work With
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-[#2B2B2B]">
              Contact
            </h3>

            <div className="space-y-5 text-lg">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#E5CC74]" />
                <span className="text-[#333]">+(250) 788 815 978</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#E5CC74]" />
                <span className="text-[#333]">boralandltd@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <AtSign className="h-5 w-5 text-[#E5CC74]" />
                <span className="text-[#333]">Norrsken Kigali House</span>
              </div>
            </div>
          </div>
        </div>

        {/* Socials */}

        {/* Socials */}
        <div className="mt-14 flex flex-wrap gap-8 md:justify-end">
          {/* Facebook */}
          <a href="#" className="flex items-center gap-2 text-[#333] group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
            </svg>

            <span>boraland_co</span>
          </a>

          {/* Instagram */}
          <a href="#" className="flex items-center gap-2 text-[#333] group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.75-3a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17.75 6.5z" />
            </svg>

            <span>boraland_co</span>
          </a>

          {/* LinkedIn */}
          <a href="#" className="flex items-center gap-2 text-[#333] group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-8 w-8 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5zM3 9h4v12H3zm7 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.46c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.89V21h-4z" />
            </svg>

            <span>boraland_co</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#DDD] pt-8 text-sm md:flex-row md:justify-between">
          <p className="text-[#555]">
            Copyright © {year}{" "}
            <span className="font-semibold text-[#2B2B2B]">Boraland.</span> All
            rights reserved.
          </p>

          <a href="#" className="text-[#555] hover:opacity-70">
            Terms and Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
