"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import {
  AtSign,
  ImageIcon,
  Loader2,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  requestConsultationResolver,
  RequestConsultationFormValues,
  useRequestConsultation,
} from "@/components/request-consultation/useRequestConsultation";

const consultationTypes = [
  "Project Planning",
  "Construction Oversight",
  "Cost & Quality Review",
  "Diaspora Project Management",
];

type RequestConsultationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RequestConsultationModal({
  open,
  onOpenChange,
}: RequestConsultationModalProps) {
  const form = useForm<RequestConsultationFormValues>({
    resolver: requestConsultationResolver,
    defaultValues: {
      email: "",
      consultationType: "",
      message: "",
    },
  });
  const { control, formState, handleSubmit, register, reset } = form;

  const handleSuccess = useCallback(() => {
    reset();
  }, [reset]);

  const {
    errorMessage,
    isSubmitting,
    resetMessages,
    sendRequest,
    statusMessage,
  } = useRequestConsultation({ onSuccess: handleSuccess });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-consultation-title"
        aria-describedby="request-consultation-description"
        className="relative max-h-[92vh] w-full max-w-330 overflow-y-auto rounded-[24px] border border-[#D8D8D8] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-lg bg-[#2C2C2C] text-white transition-colors hover:bg-black"
          aria-label="Close consultation modal"
        >
          <X size={20} />
        </button>

        <div className="relative overflow-hidden rounded-[24px] px-4 py-12 sm:px-6 md:px-12 md:py-14 lg:px-16">
          <div className="mb-14 flex items-center justify-center gap-3">
            <Image
              src="/logo.svg"
              alt="Boraland logo"
              width={72}
              height={72}
              className="size-16"
              priority
            />
            <h2
              id="request-consultation-title"
              className="font-mono text-xl font-semibold uppercase text-[#2C2C2C]"
            >
              Boraland
            </h2>
          </div>

          <p id="request-consultation-description" className="sr-only">
            Request a Boraland consultation by sharing your email, consultation
            type, and a brief project description.
          </p>

          <form
            className="mx-auto max-w-[1120px]"
            onSubmit={handleSubmit(sendRequest)}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-3 block font-mono text-lg text-[#2C2C2C]">
                  Email
                </span>
                <Input
                  type="email"
                  placeholder="Add Your Email.."
                  className="h-16 rounded-xl border-[#D8D8D8] bg-white px-4 font-mono text-base text-[#2C2C2C] shadow-none placeholder:text-[#9A9A9A] focus-visible:border-[#2C2C2C] focus-visible:ring-[#2C2C2C]/10"
                  {...register("email", { onChange: resetMessages })}
                />
                {formState.errors.email && (
                  <span className="mt-2 block font-mono text-xs text-red-600">
                    {formState.errors.email.message}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-3 block font-mono text-lg text-[#2C2C2C]">
                  Consultation Type
                </span>
                <Controller
                  control={control}
                  name="consultationType"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        resetMessages();
                        field.onChange(value ?? "");
                      }}
                    >
                      <SelectTrigger className="h-16 min-h-16 w-full rounded-xl border-[#D8D8D8] bg-white px-4 py-0 font-mono text-base text-[#2C2C2C] shadow-none focus-visible:border-[#2C2C2C] focus-visible:ring-[#2C2C2C]/10">
                        <SelectValue placeholder="Add Consultation Type Here." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-[#D8D8D8] bg-white font-mono text-[#2C2C2C]">
                        {consultationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {formState.errors.consultationType && (
                  <span className="mt-2 block font-mono text-xs text-red-600">
                    {formState.errors.consultationType.message}
                  </span>
                )}
              </label>
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-[#D8D8D8] bg-white">
              <div className="flex items-center gap-3 px-4 pt-3 font-mono text-sm text-[#8A8A8A] sm:text-base">
                <MessageCircle size={22} className="text-[#2C2C2C]" />
                <span>To: boralandltd@gmail.com</span>
              </div>
              <Textarea
                rows={4}
                placeholder="Brief Description Here..."
                className="min-h-[92px] resize-none border-none bg-transparent px-4 py-3 font-mono text-base text-[#2C2C2C] shadow-none placeholder:text-[#9A9A9A] focus-visible:ring-0"
                {...register("message", { onChange: resetMessages })}
              />
              {formState.errors.message && (
                <span className="block px-4 pb-3 font-mono text-xs text-red-600">
                  {formState.errors.message.message}
                </span>
              )}
              <div className="flex h-12 items-center border-t border-[#E2E2E2] px-4">
                <ImageIcon size={24} className="text-[#2C2C2C]" />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 h-16 w-full rounded-xl bg-[#2C2C2C] font-mono text-lg text-white hover:bg-black"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Your Request"
              )}
            </Button>

            {(statusMessage || errorMessage) && (
              <p
                className={`mt-3 text-center font-mono text-sm ${
                  errorMessage ? "text-red-600" : "text-green-700"
                }`}
              >
                {errorMessage || statusMessage}
              </p>
            )}

            <div className="mt-5 flex flex-col items-stretch justify-center gap-4 md:flex-row md:items-center">
              <a
                href="tel:+250788815978"
                className="flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#D5C78A] bg-[#FFF3C9] px-4 font-mono text-base text-[#2C2C2C] sm:px-6 sm:text-lg"
              >
                <Phone size={24} className="text-[#77715D]" />
                +(250) 788 815 978
              </a>

              <a
                href="mailto:boralandltd@gmail.com"
                className="flex min-h-14 min-w-0 items-center justify-center gap-3 rounded-xl border border-[#D5C78A] bg-[#FFF3C9] px-4 font-mono text-base text-[#2C2C2C] sm:px-6 sm:text-lg"
              >
                <AtSign size={25} className="text-[#77715D]" />
                <span className="min-w-0 truncate">boralandltd@gmail.com</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
