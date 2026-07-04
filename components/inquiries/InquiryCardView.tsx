"use client";

import { Mail, MessageSquare, Pencil, CheckCheck } from "lucide-react";
import { Inquiry, statusConfig } from "./types";

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
          className="bg-white rounded-3xl border border-gray-200 p-5"
        >
          <div className="flex justify-between">
            {/* left */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EFE5DE] flex items-center justify-center font-semibold text-sm">
                {item.initials}
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#F2994A]" />

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

                <div className="flex gap-5 mt-4 text-xs text-[#7A6F69]">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {item.email}
                  </div>

                  <span>{item.id}</span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${statusConfig[item.status].bg} ${statusConfig[item.status].text}`}
                  >
                    {statusConfig[item.status].label}
                  </span>
                </div>
              </div>
            </div>

            {/* right */}
            <p className="text-[11px] text-[#7A6F69] font-mono">{item.time}</p>
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
