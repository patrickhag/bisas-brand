import "server-only";

import { render } from "@react-email/render";

import { NewsletterEmail } from "@/emails/NewsletterEmail";
import { getResendClient, getSenderAddress } from "@/lib/email/mailer";

type SendNewsletterEmailInput = {
  message: string;
  subject: string;
  to: string;
};

export async function sendNewsletterEmail({
  message,
  subject,
  to,
}: SendNewsletterEmailInput) {
  const html = await render(
    <NewsletterEmail message={message} subject={subject} />,
  );
  const resend = getResendClient();

  const { data, error } = await resend.emails.send({
    from: getSenderAddress(),
    html,
    subject,
    text: message,
    to,
  });

  if (error) {
    throw new Error(`Resend failed to send newsletter email: ${error.message}`);
  }

  return data?.id;
}
