import "server-only";

import { render } from "@react-email/render";

import { NewsletterEmail } from "@/emails/NewsletterEmail";
import { getMailerTransport, getSenderAddress } from "@/lib/email/mailer";

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
  const transport = getMailerTransport();

  const result = await transport.sendMail({
    from: getSenderAddress(),
    html,
    subject,
    text: message,
    to,
  });

  return result.messageId;
}
