"use client";

import { Mail, MessageSquare, Pencil, CheckCheck } from "lucide-react";
import { Inquiry } from "./types";

// ─── Component ──────────────────────────────────

export default function InquiryCardView({
  inquiries,
}: {
  inquiries: Inquiry[];
}) {
  return (
    <div className="space-y-4">
      {inquiries.map((item) => (
        <div
          key={item.id}
          className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {/* left */}
            <div className="flex min-w-0 gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#EFE5DE] text-sm font-semibold">
                {item.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="size-2 rounded-full bg-[#F2994A]" />

                  <span className="font-semibold text-[#2C2C2C]">
                    {item.name}
                  </span>

                  <span className="text-[#7A6F69]">· {item.company}</span>
                </div>

                <h3 className="font-semibold text-base mt-2 text-[#2C2C2C]">
                  {item.subject}
                </h3>

                <p className="text-sm text-[#7A6F69] mt-2 max-w-3xl leading-relaxed">
                  {item.preview}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#7A6F69] sm:gap-5">
                  <div className="flex min-w-0 items-center gap-2">
                    <Mail size={14} />
                    <span className="truncate">{item.email}</span>
                  </div>

                  <span>{item.id}</span>
                </div>
              </div>
            </div>

            {/* right */}
            <p className="shrink-0 font-mono text-[11px] text-[#7A6F69]">
              {item.time}
            </p>
          </div>

          {/* actions */}
          <div className="mt-5 flex justify-end">
            <div className="flex gap-3 border rounded-full px-3 py-2">
              <CheckCheck size={15} />
              <MessageSquare size={15} />
              <Pencil size={15} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
