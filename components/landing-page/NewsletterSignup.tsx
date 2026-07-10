"use client";

import { FormEvent, useState } from "react";
import { Loader2, Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setStatusMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setEmail("");
      setStatusMessage(
        data.alreadySubscribed
          ? "You are already subscribed."
          : "Thanks for subscribing.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to subscribe",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="w-full max-w-[520px]" onSubmit={handleSubmit}>
      <div className="flex min-h-16 w-full items-center rounded-full border border-[#D8D2BF] bg-[#E8E5DB] p-1.5 shadow-sm">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-5">
          <Mail className="h-5 w-5 shrink-0 text-[#444]" />
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setErrorMessage("");
              setStatusMessage("");
            }}
            required
            placeholder="Enter your email"
            className="min-w-0 flex-1 bg-transparent text-base text-[#2B2B2B] outline-none placeholder:text-[#555]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#2B2B2B] px-8 text-[#E5CC74] transition hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>

      {(statusMessage || errorMessage) && (
        <p
          className={`mt-3 text-sm ${
            errorMessage ? "text-red-600" : "text-green-700"
          }`}
        >
          {errorMessage || statusMessage}
        </p>
      )}
    </form>
  );
}
