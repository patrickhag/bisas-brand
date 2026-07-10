"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function TermsAndConditionsModal() {
  const [open, setOpen] = useState(false);
  const [terms, setTerms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open || terms) {
      return;
    }

    let isMounted = true;

    async function loadTerms() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/site-settings/terms");
        if (!response.ok) {
          throw new Error("Failed to load terms and conditions");
        }

        const data = await response.json();
        if (isMounted) {
          setTerms(String(data.termsAndConditions ?? ""));
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
  }, [open, terms]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-[#555] transition hover:opacity-70 cursor-pointer"
      >
        Terms and Conditions
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="flex max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  Legal
                </p>
                <h2
                  id="terms-title"
                  className="font-mono text-2xl font-semibold text-[#2C2C2C]"
                >
                  Terms and Conditions
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                aria-label="Close terms and conditions"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {isLoading ? (
                <p className="text-sm text-gray-500">Loading terms...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : terms ? (
                <div className="whitespace-pre-wrap text-sm leading-7 text-[#333]">
                  {terms}
                </div>
              ) : (
                <p className="text-sm leading-7 text-gray-500">
                  Terms and conditions have not been added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
