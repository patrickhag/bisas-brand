"use client";

import { useState } from "react";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-[#E4CC72]" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-mono uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <input
        defaultValue={value}
        className="w-full rounded-xl border border-[#EFE8E1] bg-[#FAF5F0] px-4 py-3 text-sm outline-none"
      />
    </div>
  );
}

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 overflow-hidden rounded-3xl border border-[#E8E0D9] bg-white">
      {/* left section */}
      <div className="col-span-3 border-r border-[#EEE6DE] p-6">
        <h3 className="font-mono text-2xl font-semibold text-[#2C2C2C]">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>

      {/* right section */}
      <div className="col-span-9 p-6">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [acceptInquiry, setAcceptInquiry] = useState(true);
  const [showDrafts, setShowDrafts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F2EC] px-10 py-10">
      {/* header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
            → Workspace
          </p>

          <h1 className="font-mono text-6xl font-bold text-[#2C2C2C]">
            Settings
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
            Profile, studio details, and how your portfolio behaves publicly.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* profile */}
        <SettingsCard title="Profile" description="Public-facing identity.">
          <div className="space-y-5">
            <Field label="Display Name" value="Adam Borg" />
            <Field label="Email" value="admin@boraland.co" />
            <Field label="Role" value="Principal Architect" />
          </div>
        </SettingsCard>

        {/* studio */}
        <SettingsCard
          title="Studio"
          description="Shown on the portfolio site footer."
        >
          <div className="space-y-5">
            <Field label="Studio Name" value="Boraland" />
            <Field label="Location" value="Kigali, Rwanda" />
            <Field
              label="Tagline"
              value="Structured construction services designed to reduce risk."
            />
          </div>
        </SettingsCard>

        {/* portfolio */}
        <SettingsCard
          title="Portfolio"
          description="Behavior of your public site."
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C]">
                  Accept new inquiries
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Show the contact form on your live site.
                </p>
              </div>

              <Toggle
                enabled={acceptInquiry}
                onChange={() => setAcceptInquiry(!acceptInquiry)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C]">
                  Show draft projects to me
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Drafts remain hidden from visitors.
                </p>
              </div>

              <Toggle
                enabled={showDrafts}
                onChange={() => setShowDrafts(!showDrafts)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2C2C2C]">
                  Weekly email digest
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Summary of inquiries and views every Monday.
                </p>
              </div>

              <Toggle
                enabled={weeklyDigest}
                onChange={() => setWeeklyDigest(!weeklyDigest)}
              />
            </div>
          </div>
        </SettingsCard>
      </div>

      {/* footer buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button className="rounded-full border border-[#DDD5CF] bg-white px-6 py-3 text-sm text-[#2C2C2C]">
          Discard
        </button>

        <button className="rounded-full bg-[#E4CC72] px-6 py-3 text-sm font-medium text-[#2C2C2C]">
          Save Changes
        </button>
      </div>
    </div>
  );
}
