import Image from "next/image";
import {
  AtSign,
  ChevronDown,
  ImageIcon,
  MessageCircle,
  Phone,
} from "lucide-react";

const consultationTypes = [
  "Project Planning",
  "Construction Oversight",
  "Cost & Quality Review",
  "Diaspora Project Management",
];

export default function RequestConsultationPage() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-white px-6 py-16 md:px-10 lg:px-16">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#2C2C2C] via-[#BEBEBE] to-transparent" />

      <section className="relative z-10 mx-auto max-w-[1040px] rounded-[22px] border border-[#D8D8D8] bg-white px-5 py-10 shadow-[0_20px_64px_rgba(0,0,0,0.12)] md:px-10 lg:px-12">
        <div className="mb-10 flex items-center justify-center gap-3">
          <Image
            src="/logo.svg"
            alt="Boraland logo"
            width={60}
            height={60}
            className="size-14"
            priority
          />
          <span className="font-mono text-lg font-semibold uppercase text-[#2C2C2C]">
            Boraland
          </span>
        </div>

        <form className="mx-auto max-w-[920px]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2.5 block font-mono text-base text-[#2C2C2C]">
                Email
              </span>
              <input
                type="email"
                name="email"
                placeholder="Add Your Email.."
                className="h-14 w-full rounded-xl border border-[#D8D8D8] bg-white px-4 font-mono text-sm text-[#2C2C2C] outline-none transition focus:border-[#2C2C2C]"
              />
            </label>

            <label className="block">
              <span className="mb-2.5 block font-mono text-base text-[#2C2C2C]">
                Consultation Type
              </span>
              <div className="relative">
                <select
                  name="consultationType"
                  defaultValue=""
                  className="h-14 w-full appearance-none rounded-xl border border-[#D8D8D8] bg-white px-4 pr-12 font-mono text-sm text-[#2C2C2C] outline-none transition focus:border-[#2C2C2C]"
                >
                  <option value="" disabled>
                    Add Consultation Type Here.
                  </option>
                  {consultationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]"
                />
              </div>
            </label>
          </div>

          <div className="mt-3 overflow-hidden rounded-2xl border border-[#D8D8D8] bg-white">
            <div className="flex items-center gap-3 border-b border-transparent px-4 pt-3 font-mono text-sm text-[#8A8A8A]">
              <MessageCircle size={20} className="text-[#2C2C2C]" />
              <span>To: boralandltd@gmail.com</span>
            </div>
            <textarea
              name="message"
              rows={4}
              placeholder="Brief Description Here..."
              className="min-h-20 w-full resize-none bg-transparent px-4 py-3 font-mono text-sm text-[#2C2C2C] outline-none placeholder:text-[#9A9A9A]"
            />
            <div className="flex h-11 items-center border-t border-[#E2E2E2] px-4">
              <ImageIcon size={22} className="text-[#2C2C2C]" />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 h-14 w-full rounded-xl bg-[#2C2C2C] font-mono text-base text-white transition hover:bg-black"
          >
            Submit Your Request
          </button>

          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="tel:+250788815978"
              className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#D5C78A] bg-[#FFF3C9] px-5 font-mono text-base text-[#2C2C2C]"
            >
              <Phone size={22} className="text-[#77715D]" />
              +(250) 788 815 978
            </a>

            <a
              href="mailto:boralandltd@gmail.com"
              className="flex min-h-12 items-center justify-center gap-3 rounded-xl border border-[#D5C78A] bg-[#FFF3C9] px-5 font-mono text-base text-[#2C2C2C]"
            >
              <AtSign size={23} className="text-[#77715D]" />
              boralandltd@gmail.com
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
