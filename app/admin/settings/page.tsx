"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadTerms() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/site-settings/terms");
        if (!response.ok) {
          throw new Error("Failed to load terms and conditions");
        }

        const data = await response.json();
        if (isMounted) {
          setTermsAndConditions(String(data.termsAndConditions ?? ""));
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load terms and conditions",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTerms();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/site-settings/terms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ termsAndConditions }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save terms and conditions");
      }

      setSuccess("Terms and conditions saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F2EC] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div className="mb-10">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-gray-500">
          → Workspace
        </p>

        <h1 className="font-mono text-5xl font-bold text-[#2C2C2C] sm:text-6xl">
          Settings
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500">
          Manage the legal text shown in the public footer.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="rounded-3xl border border-[#E8E0D9] bg-white p-5 sm:p-6 lg:p-8"
      >
        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-gray-500">
            Terms and Conditions
          </label>
          <textarea
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
            rows={16}
            placeholder="Add your terms and conditions here..."
            className="min-h-[320px] w-full rounded-2xl border border-gray-200 bg-[#F9F9F9] px-4 py-4 font-mono text-sm leading-6 text-[#2C2C2C] outline-none transition-colors placeholder:text-gray-400 focus:border-[#E4CC72]"
            disabled={isLoading || isSaving}
          />
        </div>

        {error && (
          <p className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || isSaving}
            className="flex items-center gap-2 rounded-full bg-[#E4CC72] px-6 py-3 text-sm font-medium text-[#2C2C2C] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
