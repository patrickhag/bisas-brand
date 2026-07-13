import { Mail, Phone, AtSign } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import NewsletterSignup from "@/components/landing-page/NewsletterSignup";
import TermsAndConditionsModal from "@/components/landing-page/TermsAndConditionsModal";

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const companyLinks = [
  { label: "Service Overview", href: "/#services-overview" },
  { label: "Why Choose Us?", href: "/#why-choose-us" },
  { label: "Who We Work With", href: "/#who-we-work-with" },
];

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className={`px-4 py-8 sm:px-6 md:px-12 md:py-14 ${poppins.className}`}>
      {/* Big floating card */}
      <div className="mx-auto max-w-7xl rounded-[22px] border border-[#f2f2f2] px-5 py-8 sm:px-7 md:rounded-[24px] md:px-10 md:py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1.25fr_0.8fr_1fr]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href={"/"}>
                <img
                  src="/logo.svg"
                  alt="logo"
                  className="h-10 w-10 object-contain"
                />
              </Link>

              <span className="text-lg font-semibold text-[#2B2B2B]">
                BORALAND
              </span>
            </div>

            <p className="max-w-sm text-[15px] leading-relaxed text-[#555]">
              Boraland is your eyes, your voice, and your standard on every
              project, every step of the way.
            </p>

            {/* Subscribe */}
            <div className="pt-8">
              <NewsletterSignup />
            </div>
          </div>

          {/* CENTER */}
          <div className="lg:pl-12 xl:pl-20">
            <h3 className="mb-5 text-lg font-semibold text-[#2B2B2B]">
              Company
            </h3>

            <div className="space-y-4 text-base text-[#333]">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-[#2B2B2B]">
              Contact
            </h3>

            <div className="space-y-4 text-base">
              <a
                href="tel:+250788815978"
                className="flex min-w-0 items-center gap-3 hover:opacity-70"
              >
                <Phone className="h-4.5 w-4.5 text-[#E5CC74]" />
                <span className="text-[#333]">+(250) 788 815 978</span>
              </a>

              <a
                href="mailto:boralandltd@gmail.com"
                className="flex items-center gap-3 hover:opacity-70"
              >
                <Mail className="h-4.5 w-4.5 text-[#E5CC74]" />
                <span className="min-w-0 break-all text-[#333]">boralandltd@gmail.com</span>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Norrsken%20Kigali%20House"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:opacity-70"
              >
                <AtSign className="h-4.5 w-4.5 text-[#E5CC74]" />
                <span className="text-[#333]">Norrsken Kigali House</span>
              </a>
            </div>
          </div>
        </div>

        {/* Socials */}
        <div className="mt-10 flex flex-col items-start gap-4 text-sm sm:flex-row sm:flex-wrap sm:gap-7 md:justify-end">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/boraland-ltd/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[#333]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5zM3 9h4v12H3zm7 0h3.83v1.71h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.15V21h-4v-5.46c0-1.3-.02-2.98-1.82-2.98-1.82 0-2.1 1.42-2.1 2.89V21h-4z" />
            </svg>

            <span>boraland_co</span>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@boraland_co"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[#333]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M16.6 5.82a5.39 5.39 0 0 1-1.39-3.57h-3.44v13.39a2.9 2.9 0 1 1-2.1-2.79V9.36a6.33 6.33 0 1 0 5.54 6.28V8.82a8.82 8.82 0 0 0 5.16 1.65V7.03a5.35 5.35 0 0 1-3.77-1.21z" />
            </svg>

            <span>boraland_co</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/boraland_co"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-[#333]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-[#E5CC74] transition group-hover:scale-105"
            >
              <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.51 5.51 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.75-3a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 17.75 6.5z" />
            </svg>

            <span>boraland_co</span>
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#DDD] pt-6 text-xs md:flex-row md:justify-between">
          <p className="min-w-0 text-[#555]">
            Copyright © {year}{" "}
            <span className="font-semibold text-[#2B2B2B]">Boraland.</span> All
            rights reserved.
          </p>

          <TermsAndConditionsModal />
        </div>
      </div>
    </footer>
  );
}
