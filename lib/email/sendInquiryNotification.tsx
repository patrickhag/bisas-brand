import "server-only";

import { render } from "@react-email/render";

import {
  InquiryNotificationEmail,
  type InquiryNotificationEmailProps,
} from "@/emails/InquiryNotificationEmail";
import {
  getMailerTransport,
  getNotificationRecipient,
  getSenderAddress,
} from "@/lib/email/mailer";

type SendInquiryNotificationInput = Omit<
  InquiryNotificationEmailProps,
  "submittedAt"
> & {
  submittedAt?: Date;
  to?: string;
};

function formatSubmittedAt(date: Date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Kigali",
  }).format(date);
}

function getPlainTextMessage({
  consultationType,
  email,
  inquiryType,
  message,
  submittedAt,
}: InquiryNotificationEmailProps) {
  return [
    `New ${inquiryType}`,
    "",
    `From: ${email}`,
    consultationType ? `Consultation type: ${consultationType}` : null,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendInquiryNotificationEmail(
  input: SendInquiryNotificationInput,
) {
  const submittedAt = formatSubmittedAt(input.submittedAt ?? new Date());
  const emailProps = {
    ...input,
    submittedAt,
  };
  const subject = `New ${input.inquiryType} from ${input.email}`;
  const html = await render(<InquiryNotificationEmail {...emailProps} />);
  const text = getPlainTextMessage(emailProps);
  const transport = getMailerTransport();

  const result = await transport.sendMail({
    from: getSenderAddress(),
    html,
    replyTo: input.email,
    subject,
    text,
    to: input.to ?? getNotificationRecipient(),
  });

  return { id: result.messageId, skipped: false };
}
