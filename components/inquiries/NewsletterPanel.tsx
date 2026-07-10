"use client";

import { FormEvent, useState } from "react";
import { Loader2, Mail, Send } from "lucide-react";

import type { NewsletterSubscriber } from "@/components/inquiries/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type NewsletterPanelProps = {
  initialSubscribers: NewsletterSubscriber[];
};

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NewsletterPanel({
  initialSubscribers,
}: NewsletterPanelProps) {
  const [subscribers] =
    useState<NewsletterSubscriber[]>(initialSubscribers);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    setErrorMessage("");
    setStatusMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, subject }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send newsletter");
      }

      form.reset();
      setStatusMessage(
        data.failed > 0
          ? `Sent to ${data.sent} subscribers. ${data.failed} failed.`
          : `Sent to ${data.sent} subscribers.`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send newsletter",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-mono text-2xl font-bold text-[#2C2C2C]">
              Send Newsletter
            </h2>
            <p className="mt-2 text-sm text-[#7A6F69]">
              Send one message to all current newsletter subscribers.
            </p>
          </div>
          <div className="rounded-full bg-[#F5F0D6] px-4 py-2 text-sm font-semibold text-[#9C7D00]">
            {subscribers.length} subscribers
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#5A5A5A]">
              Subject
            </span>
            <Input
              name="subject"
              required
              placeholder="Newsletter subject"
              className="h-12 rounded-xl bg-[#F8F8F8]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#5A5A5A]">
              Message
            </span>
            <Textarea
              name="message"
              required
              rows={8}
              placeholder="Write the message subscribers should receive..."
              className="min-h-48 rounded-xl bg-[#F8F8F8]"
            />
          </label>

          <Button
            type="submit"
            disabled={isSending || subscribers.length === 0}
            className="h-12 w-full rounded-xl bg-[#2B2B2B] text-[#E5CC74] hover:bg-black"
          >
            {isSending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Send to Subscribers
              </>
            )}
          </Button>

          {(statusMessage || errorMessage) && (
            <p
              className={`text-center text-sm ${
                errorMessage ? "text-red-600" : "text-green-700"
              }`}
            >
              {errorMessage || statusMessage}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        <h2 className="font-mono text-2xl font-bold text-[#2C2C2C]">
          Subscribers
        </h2>

        <div className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-1">
          {subscribers.length === 0 ? (
            <p className="rounded-2xl bg-[#F8F8F8] p-4 text-sm text-[#7A6F69]">
              No newsletter subscribers yet.
            </p>
          ) : (
            subscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="rounded-2xl border border-gray-100 bg-[#F8F8F8] p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[#E4CC72] text-[#2B2B2B]">
                    <Mail className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#2B2B2B]">
                      {subscriber.email}
                    </p>
                    <p className="mt-1 text-xs text-[#7A6F69]">
                      Subscribed {formatDate(subscriber.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
