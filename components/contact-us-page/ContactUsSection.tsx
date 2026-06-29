import { Mail, Phone, MessageCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactSection() {
  return (
    <section className="w-full bg-[#F9F9F9] px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <div>
            {/* heading */}
            <h2 className="mb-8 font-mono text-3xl font-medium text-[#3A3A3A] md:text-4xl">
              Get In Touch
            </h2>

            {/* form */}
            <div className="space-y-4">
              {/* consultation type + email row */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label className="mb-2 block text-xs font-medium text-[#5A5A5A]">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-xl bg-[#F4F4F4] px-4 py-3 pl-9 text-sm text-[#2C2C2C] outline-none placeholder:text-[#8A8A8A]"
                    />
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-xs font-medium text-[#5A5A5A]">
                    Consultation type
                  </label>
                  <Select>
                    <SelectTrigger className="w-full rounded-xl bg-[#F4F4F4] px-4 py-3 text-sm text-[#2C2C2C] outline-none placeholder:text-[#8A8A8A]">
                      <SelectValue placeholder="Select a consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="initial-consultation">
                        Initial Consultation
                      </SelectItem>
                      <SelectItem value="strategy-session">
                        Strategy Session
                      </SelectItem>
                      <SelectItem value="design-review">
                        Design Review
                      </SelectItem>
                      <SelectItem value="technical-audit">
                        Technical Audit
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* message */}
              <div>
                <label className="mb-2 block text-xs font-medium text-[#5A5A5A]">
                  Enter Your Message
                </label>

                <div className="relative rounded-xl bg-[#F4F4F4] p-3">
                  <textarea
                    rows={4}
                    placeholder="Compose your message here..."
                    className="w-full resize-none bg-transparent pl-6 text-sm text-[#2C2C2C] outline-none placeholder:text-[#9A9A9A]"
                  />
                  <MessageCircle
                    size={16}
                    className="absolute left-3 top-3 text-[#9A9A9A]"
                  />
                </div>
              </div>

              {/* button */}
              <button className="w-full rounded-xl bg-[#2B2B2B] py-3 text-sm font-medium text-white transition hover:opacity-90">
                Send Message
              </button>
            </div>
          </div>

          {/* bottom card */}
          <div className="mt-8 rounded-2xl border border-cyan-400 bg-[#2B2B2B] p-5">
            <p className="font-mono text-sm leading-relaxed md:text-base">
              <span className="text-[#E4CC72]">
                Engagement begins with a paid consultation.
              </span>{" "}
              <span className="text-white">
                Projects are accepted based on fit, clarity, and readiness.
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="rounded-3xl bg-[#2B2B2B] p-3">
          {/* MAP */}
          <div className="overflow-hidden rounded-2xl">
            {/* replace with actual map/image */}
            <div className="overflow-hidden rounded-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5050470011743!2d30.05741827524857!3d-1.951171898031146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5a86d814c61%3A0x7d3b83e12b1c11a9!2sNorrsken%20House%20Kigali!5e0!3m2!1sen!2srw!4v1782730676578!5m2!1sen!2srw"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E4CC72] px-4 py-3 text-[#2B2B2B]">
              <Phone size={16} />
              <span className="text-sm font-medium">+(250) 788 815 978</span>
            </div>

            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#E4CC72] px-4 py-3 text-[#2B2B2B]">
              <Mail size={16} />
              <span className="text-sm font-medium">boralandltd@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
