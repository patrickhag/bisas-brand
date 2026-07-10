import type { CSSProperties } from "react";

export type NewsletterEmailProps = {
  message: string;
  subject: string;
};

const main = {
  backgroundColor: "#f6f6f6",
  color: "#2b2b2b",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} satisfies CSSProperties;

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5e5",
  margin: "32px auto",
  maxWidth: "640px",
  padding: "32px",
} satisfies CSSProperties;

export function NewsletterEmail({ message, subject }: NewsletterEmailProps) {
  return (
    <html>
      <body style={main}>
        <div
          style={{
            display: "none",
            maxHeight: 0,
            overflow: "hidden",
          }}
        >
          {subject}
        </div>
        <main style={container}>
          <p
            style={{
              color: "#d0af43",
              fontSize: "14px",
              fontWeight: "700",
              margin: "0 0 10px",
              textTransform: "uppercase",
            }}
          >
            Boraland
          </p>
          <h1
            style={{
              color: "#2b2b2b",
              fontSize: "28px",
              lineHeight: "1.2",
              margin: "0",
            }}
          >
            {subject}
          </h1>
          <hr style={{ borderColor: "#e5e5e5", margin: "28px 0" }} />
          <p
            style={{
              color: "#2b2b2b",
              fontSize: "16px",
              lineHeight: "1.6",
              margin: "0",
              whiteSpace: "pre-line",
            }}
          >
            {message}
          </p>
        </main>
      </body>
    </html>
  );
}
