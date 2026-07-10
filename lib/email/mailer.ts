import "server-only";

import nodemailer from "nodemailer";

function getEmailCredentials() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASSWORD must be configured.");
  }

  return { pass, user };
}

export function getMailerTransport() {
  const { pass, user } = getEmailCredentials();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      pass,
      user,
    },
  });
}

export function getSenderAddress() {
  const { user } = getEmailCredentials();
  return `"Boraland" <${user}>`;
}

export function getNotificationRecipient() {
  const { user } = getEmailCredentials();
  return user;
}
