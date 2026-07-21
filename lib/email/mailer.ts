import "server-only";

import { Resend } from "resend";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be configured.`);
  }

  return value;
}

export function getResendClient() {
  return new Resend(getRequiredEnv("RESEND_API_KEY"));
}

export function getSenderAddress() {
  return getRequiredEnv("EMAIL_FROM");
}

export function getNotificationRecipient() {
  return getRequiredEnv("EMAIL_NOTIFICATION_TO");
}
