"use client";

import { useCallback, useState } from "react";
import type { FieldErrors, Resolver } from "react-hook-form";
import { z } from "zod/v4";

export const requestConsultationSchema = z.object({
  email: z.email("Enter a valid email address."),
  consultationType: z.string().min(1, "Choose a consultation type."),
  message: z
    .string()
    .trim()
    .min(10, "Brief description must be at least 10 characters."),
});

export type RequestConsultationFormValues = z.infer<
  typeof requestConsultationSchema
>;

export const requestConsultationResolver: Resolver<
  RequestConsultationFormValues
> = async (values) => {
  const result = requestConsultationSchema.safeParse(values);

  if (result.success) {
    return {
      errors: {},
      values: result.data,
    };
  }

  const errors: FieldErrors<RequestConsultationFormValues> = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof RequestConsultationFormValues;

    if (field) {
      errors[field] = {
        message: issue.message,
        type: issue.code,
      };
    }
  }

  return {
    errors,
    values: {},
  };
};

type UseRequestConsultationOptions = {
  onSuccess?: () => void;
};

export function useRequestConsultation({
  onSuccess,
}: UseRequestConsultationOptions = {}) {
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendRequest = useCallback(
    async (values: RequestConsultationFormValues) => {
      setStatusMessage("");
      setErrorMessage("");
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/consultation-requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to submit consultation request",
          );
        }

        setStatusMessage("Your request has been submitted.");
        onSuccess?.();
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to submit consultation request",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSuccess],
  );

  const resetMessages = useCallback(() => {
    setStatusMessage("");
    setErrorMessage("");
  }, []);

  return {
    errorMessage,
    isSubmitting,
    resetMessages,
    sendRequest,
    statusMessage,
  };
}
