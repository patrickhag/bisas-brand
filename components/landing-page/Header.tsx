"use client";

import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Home,
  Images,
  Menu,
  MessageSquare,
  ScrollText,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/boraland/about-us", icon: ScrollText },
  {
    label: "Our Services",
    href: "/boraland/our-services",
    icon: BriefcaseBusiness,
  },
  { label: "Portfolio", href: "/boraland/portfolio", icon: Images },
  { label: "Process", href: "/boraland/process", icon: MessageSquare },
] satisfies Array<{ label: string; href: string; icon: LucideIcon }>;

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

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        data-site-header
        className={`sticky top-0 z-50 hidden bg-white/80 px-8 py-4 backdrop-blur-xl transition-transform duration-300 lg:block ${
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
          </div>
        </div>
      </nav>

      <nav
        data-site-header
        className={`sticky top-0 z-50 flex items-center justify-between bg-white/45 px-4 py-4 shadow-[0_12px_40px_rgba(18,18,18,0.08),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl backdrop-saturate-150 lg:hidden ${roboto.className}`}
        aria-label="Mobile navigation"
      >
        <Link
          className="block size-10"
          href={"/"}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={"/logo.svg"}
            alt="Bora-land logo"
            width={40}
            height={40}
          />
        </Link>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/40 text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl transition-colors hover:bg-white/55"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu size={23} strokeWidth={2.2} />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] h-dvh w-[min(21rem,calc(100vw-2rem))] border-l border-white/55 bg-white/35 px-5 py-5 shadow-[-22px_0_60px_rgba(18,18,18,0.18),inset_1px_0_0_rgba(255,255,255,0.55)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-300 lg:hidden ${roboto.className} ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between">
          <Link
            className="block size-10"
            href={"/"}
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src={"/logo.svg"}
              alt="Bora-land logo"
              width={40}
              height={40}
            />
          </Link>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-white/60 bg-white/35 text-[#2C2C2C] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-colors hover:bg-white/50"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={21} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-10 grid gap-3">
          {navLinks.map((link) => (
            <MobileSidebarLink
              key={link.label}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={pathname === link.href}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2C2C2C]/90 px-4 py-3 text-sm font-medium tracking-wide text-[#F3DC8E] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-opacity hover:opacity-90"
          onClick={() => {
            setMenuOpen(false);
            router.push("/boraland/contact-us");
          }}
        >
          Contact Us Now
          <ArrowUpRight size={16} className="text-[#F3DC8E]" />
        </button>
      </aside>
    </>
  );
}

function MobileSidebarLink({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium tracking-wide shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition-colors ${
        active
          ? "border-[#F3DC8E]/65 bg-[#F7E7AE]/65 text-[#2C2C2C]"
          : "border-white/45 bg-white/25 text-[#50535D] hover:bg-white/45 hover:text-[#2C2C2C]"
      }`}
    >
      <Icon size={20} strokeWidth={2.15} />
      <span>{label}</span>
    </Link>
  );
}
